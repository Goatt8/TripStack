import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { mysqlPool } from '../database/mysql.js';

export type GuidebookRow = {
  id: number;
  creatorId: number;
  creatorName: string;
  title: string;
  country: string;
  region: string;
  coverImageUrl: string;
  mapImageUrl: string;
  mapCenterLat: number | null;
  mapCenterLon: number | null;
  printCount: number;
  price: number;
  followerCount: number;
  trustScore: number;
  blockCount: number;
  rankInRegion: number;
};

export type RoutePointRow = {
  id: number;
  guidebookId: number;
  pointOrder: number;
  title: string;
  x: number;
  y: number;
};

export type GuidebookBlockRow = {
  id: number;
  guidebookId: number;
  stepOrder: number;
  placeName: string;
  content: string;
  imageUrl: string;
};

export type GuidebookRoutePointInput = {
  pointOrder?: number;
  title?: string;
  x?: number;
  y?: number;
};

export type GuidebookBlockInput = {
  placeName?: string;
  content?: string;
  imageUrl?: string;
};

type SaveGuidebookInput = {
  blocks?: GuidebookBlockInput[];
  block?: GuidebookBlockInput;
  country: string;
  coverImageUrl: string;
  creatorId: number;
  mapImageUrl: string;
  mapCenterLat?: number | null;
  mapCenterLon?: number | null;
  region: string;
  routePoints?: GuidebookRoutePointInput[];
  title: string;
};

type UpdateGuidebookInput = Omit<SaveGuidebookInput, 'block' | 'creatorId'> & {
  guidebookId: number;
};

function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const seenKeys = new Set<string>();

  return items.filter((item) => {
    const key = getKey(item);

    if (seenKeys.has(key)) {
      return false;
    }

    seenKeys.add(key);
    return true;
  });
}

export async function getGuidebookById(guidebookId: number) {
  const [guidebookRows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      guidebooks.id,
      guidebooks.creator_id AS creatorId,
      users.username AS creatorName,
      guidebooks.title,
      guidebooks.country,
      guidebooks.region,
      guidebooks.cover_image_url AS coverImageUrl,
      guidebooks.map_image_url AS mapImageUrl,
      guidebooks.map_center_lat AS mapCenterLat,
      guidebooks.map_center_lon AS mapCenterLon,
      guidebooks.print_count AS printCount,
      guidebooks.price,
      users.follower_count AS followerCount,
      users.trust_score AS trustScore,
      COUNT(guidebook_blocks.id) AS blockCount,
      RANK() OVER (PARTITION BY guidebooks.country, guidebooks.region ORDER BY guidebooks.print_count DESC) AS rankInRegion
    FROM guidebooks
    JOIN users ON users.id = guidebooks.creator_id
    LEFT JOIN guidebook_blocks ON guidebook_blocks.guidebook_id = guidebooks.id
    WHERE guidebooks.id = ?
    GROUP BY guidebooks.id
  `, [guidebookId]);
  const guidebook = guidebookRows[0] as GuidebookRow | undefined;

  if (!guidebook) {
    return null;
  }

  const [routePointRows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      id,
      guidebook_id AS guidebookId,
      point_order AS pointOrder,
      title,
      x,
      y
    FROM guidebook_route_points
    WHERE guidebook_id = ?
    ORDER BY point_order ASC
  `, [guidebookId]);

  return {
    ...guidebook,
    routePoints: routePointRows as RoutePointRow[],
  };
}

export async function getGuidebookRows(region: string | null = null) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      guidebooks.id,
      guidebooks.creator_id AS creatorId,
      users.username AS creatorName,
      guidebooks.title,
      guidebooks.country,
      guidebooks.region,
      guidebooks.cover_image_url AS coverImageUrl,
      guidebooks.map_image_url AS mapImageUrl,
      guidebooks.map_center_lat AS mapCenterLat,
      guidebooks.map_center_lon AS mapCenterLon,
      guidebooks.print_count AS printCount,
      guidebooks.price,
      users.follower_count AS followerCount,
      users.trust_score AS trustScore,
      COUNT(guidebook_blocks.id) AS blockCount,
      RANK() OVER (PARTITION BY guidebooks.country, guidebooks.region ORDER BY guidebooks.print_count DESC) AS rankInRegion
    FROM guidebooks
    JOIN users ON users.id = guidebooks.creator_id
    LEFT JOIN guidebook_blocks ON guidebook_blocks.guidebook_id = guidebooks.id
    WHERE ? IS NULL OR guidebooks.region = ?
    GROUP BY guidebooks.id
    ORDER BY guidebooks.print_count DESC, users.trust_score DESC
  `, [region, region]);

  const [routePoints] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      id,
      guidebook_id AS guidebookId,
      point_order AS pointOrder,
      title,
      x,
      y
    FROM guidebook_route_points
    ORDER BY point_order ASC
  `);

  const guidebooks = uniqueBy(rows as GuidebookRow[], (row) => [
    row.creatorId,
    row.title,
    row.country,
    row.region,
    row.coverImageUrl,
  ].join('|'));

  return guidebooks.map((row) => ({
    ...row,
    routePoints: (routePoints as RoutePointRow[]).filter((point) => point.guidebookId === row.id),
  }));
}

export async function getGuidebookBlocks(guidebookId: number | string) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      id,
      guidebook_id AS guidebookId,
      step_order AS stepOrder,
      place_name AS placeName,
      content,
      image_url AS imageUrl
    FROM guidebook_blocks
    WHERE guidebook_id = ?
    ORDER BY step_order ASC
  `, [guidebookId]);

  return rows as GuidebookBlockRow[];
}

export async function findGuidebookOwner(guidebookId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(
    'SELECT id, creator_id AS creatorId FROM guidebooks WHERE id = ?',
    [guidebookId],
  );

  return rows[0] as { creatorId: number; id: number } | undefined;
}

export async function createGuidebook(input: SaveGuidebookInput) {
  const connection = await mysqlPool.getConnection();

  try {
    await connection.beginTransaction();
    const [createdGuidebook] = await connection.execute<ResultSetHeader>(`
      INSERT INTO guidebooks (creator_id, title, country, region, cover_image_url, map_image_url, map_center_lat, map_center_lon, print_count, price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 12800)
    `, [
      input.creatorId,
      input.title,
      input.country,
      input.region,
      input.coverImageUrl,
      input.mapImageUrl,
      typeof input.mapCenterLat === 'number' ? input.mapCenterLat : null,
      typeof input.mapCenterLon === 'number' ? input.mapCenterLon : null,
    ]);

    await replaceGuidebookDetails(connection, {
      blocks: input.blocks && input.blocks.length > 0 ? input.blocks : input.block ? [input.block] : [],
      coverImageUrl: input.coverImageUrl,
      defaultContent: '생성 모달에서 입력한 가이드북 상세 설명입니다.',
      guidebookId: createdGuidebook.insertId,
      region: input.region,
      routePoints: input.routePoints,
    });

    await connection.commit();
    return createdGuidebook.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateGuidebook(input: UpdateGuidebookInput) {
  const connection = await mysqlPool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute(`
      UPDATE guidebooks
      SET title = ?,
          country = ?,
          region = ?,
          cover_image_url = ?,
          map_image_url = ?,
          map_center_lat = ?,
          map_center_lon = ?
      WHERE id = ?
    `, [
      input.title,
      input.country,
      input.region,
      input.coverImageUrl,
      input.mapImageUrl,
      typeof input.mapCenterLat === 'number' ? input.mapCenterLat : null,
      typeof input.mapCenterLon === 'number' ? input.mapCenterLon : null,
      input.guidebookId,
    ]);

    await connection.execute('DELETE FROM guidebook_blocks WHERE guidebook_id = ?', [input.guidebookId]);
    await connection.execute('DELETE FROM guidebook_route_points WHERE guidebook_id = ?', [input.guidebookId]);

    await replaceGuidebookDetails(connection, {
      blocks: input.blocks ?? [],
      coverImageUrl: input.coverImageUrl,
      defaultContent: '수정 모달에서 입력한 가이드북 상세 설명입니다.',
      guidebookId: input.guidebookId,
      region: input.region,
      routePoints: input.routePoints,
    });

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function deleteGuidebookWithDependencies(guidebookId: number) {
  const connection = await mysqlPool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM orders WHERE guidebook_id = ?', [guidebookId]);
    await connection.execute('DELETE FROM custom_prints WHERE guidebook_id = ?', [guidebookId]);
    await connection.execute('DELETE FROM print_cart_items WHERE guidebook_id = ?', [guidebookId]);
    await connection.execute('DELETE FROM guidebooks WHERE id = ?', [guidebookId]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function replaceGuidebookDetails(
  connection: Pick<typeof mysqlPool, 'execute'>,
  input: {
    blocks: GuidebookBlockInput[];
    coverImageUrl: string;
    defaultContent: string;
    guidebookId: number;
    region: string;
    routePoints?: GuidebookRoutePointInput[];
  },
) {
  const normalizedBlocks = input.blocks.length > 0 ? input.blocks : [
    {
      placeName: `${input.region} 주요 장면`,
      content: input.defaultContent,
      imageUrl: input.coverImageUrl,
    },
  ];

  for (const [index, item] of normalizedBlocks.entries()) {
    await connection.execute(`
      INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
      VALUES (?, ?, ?, ?, ?)
    `, [
      input.guidebookId,
      index + 1,
      item.placeName?.trim() || `${input.region} 주요 장면 ${index + 1}`,
      item.content?.trim() || input.defaultContent,
      item.imageUrl?.trim() || input.coverImageUrl,
    ]);
  }

  const routePoints = input.routePoints && input.routePoints.length > 0 ? input.routePoints : [
    { pointOrder: 1, title: '포인트 1', x: 24, y: 32 },
    { pointOrder: 2, title: '포인트 2', x: 66, y: 58 },
  ];

  for (const [index, point] of routePoints.entries()) {
    await connection.execute(`
      INSERT INTO guidebook_route_points (guidebook_id, point_order, title, x, y)
      VALUES (?, ?, ?, ?, ?)
    `, [
      input.guidebookId,
      point.pointOrder ?? index + 1,
      point.title?.trim() || `포인트 ${index + 1}`,
      typeof point.x === 'number' ? point.x : 50,
      typeof point.y === 'number' ? point.y : 50,
    ]);
  }
}
