import { db } from '../db.js';

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

export function getGuidebookById(guidebookId: number) {
  const guidebook = db.prepare(`
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
  `).get(guidebookId) as GuidebookRow | undefined;

  if (!guidebook) {
    return null;
  }

  const routePoints = db.prepare(`
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
  `).all(guidebookId) as RoutePointRow[];

  return {
    ...guidebook,
    routePoints,
  };
}

export function getGuidebookRows(region: string | null = null) {
  const rows = db.prepare(`
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
    WHERE @region IS NULL OR guidebooks.region = @region
    GROUP BY guidebooks.id
    ORDER BY guidebooks.print_count DESC, users.trust_score DESC
  `).all({ region }) as GuidebookRow[];

  const routePoints = db.prepare(`
    SELECT
      id,
      guidebook_id AS guidebookId,
      point_order AS pointOrder,
      title,
      x,
      y
    FROM guidebook_route_points
    ORDER BY point_order ASC
  `).all() as RoutePointRow[];

  const guidebooks = uniqueBy(rows, (row) => [
    row.creatorId,
    row.title,
    row.country,
    row.region,
    row.coverImageUrl,
  ].join('|'));

  return guidebooks.map((row) => ({
    ...row,
    routePoints: routePoints.filter((point) => point.guidebookId === row.id),
  }));
}

export function getGuidebookBlocks(guidebookId: number | string) {
  return db.prepare(`
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
  `).all(guidebookId) as GuidebookBlockRow[];
}

export function findGuidebookOwner(guidebookId: number) {
  return db.prepare('SELECT id, creator_id AS creatorId FROM guidebooks WHERE id = ?').get(guidebookId) as {
    creatorId: number;
    id: number;
  } | undefined;
}

export function createGuidebook(input: SaveGuidebookInput) {
  return db.transaction(() => {
    const createdGuidebook = db.prepare(`
      INSERT INTO guidebooks (creator_id, title, country, region, cover_image_url, map_image_url, map_center_lat, map_center_lon, print_count, price)
      VALUES (@creatorId, @title, @country, @region, @coverImageUrl, @mapImageUrl, @mapCenterLat, @mapCenterLon, 0, 12800)
    `).run({
      creatorId: input.creatorId,
      title: input.title,
      country: input.country,
      region: input.region,
      coverImageUrl: input.coverImageUrl,
      mapImageUrl: input.mapImageUrl,
      mapCenterLat: typeof input.mapCenterLat === 'number' ? input.mapCenterLat : null,
      mapCenterLon: typeof input.mapCenterLon === 'number' ? input.mapCenterLon : null,
    });

    const guidebookId = Number(createdGuidebook.lastInsertRowid);
    replaceGuidebookDetails({
      blocks: input.blocks && input.blocks.length > 0 ? input.blocks : input.block ? [input.block] : [],
      coverImageUrl: input.coverImageUrl,
      defaultContent: '생성 모달에서 입력한 가이드북 상세 설명입니다.',
      guidebookId,
      region: input.region,
      routePoints: input.routePoints,
    });

    return guidebookId;
  })();
}

export function updateGuidebook(input: UpdateGuidebookInput) {
  db.transaction(() => {
    db.prepare(`
      UPDATE guidebooks
      SET title = @title,
          country = @country,
          region = @region,
          cover_image_url = @coverImageUrl,
          map_image_url = @mapImageUrl,
          map_center_lat = @mapCenterLat,
          map_center_lon = @mapCenterLon
      WHERE id = @guidebookId
    `).run({
      country: input.country,
      coverImageUrl: input.coverImageUrl,
      guidebookId: input.guidebookId,
      mapImageUrl: input.mapImageUrl,
      mapCenterLat: typeof input.mapCenterLat === 'number' ? input.mapCenterLat : null,
      mapCenterLon: typeof input.mapCenterLon === 'number' ? input.mapCenterLon : null,
      region: input.region,
      title: input.title,
    });

    db.prepare('DELETE FROM guidebook_blocks WHERE guidebook_id = ?').run(input.guidebookId);
    db.prepare('DELETE FROM guidebook_route_points WHERE guidebook_id = ?').run(input.guidebookId);

    replaceGuidebookDetails({
      blocks: input.blocks ?? [],
      coverImageUrl: input.coverImageUrl,
      defaultContent: '수정 모달에서 입력한 가이드북 상세 설명입니다.',
      guidebookId: input.guidebookId,
      region: input.region,
      routePoints: input.routePoints,
    });
  })();
}

export function deleteGuidebookWithDependencies(guidebookId: number) {
  db.transaction(() => {
    db.prepare('DELETE FROM orders WHERE guidebook_id = ?').run(guidebookId);
    db.prepare('DELETE FROM custom_prints WHERE guidebook_id = ?').run(guidebookId);
    db.prepare('DELETE FROM print_cart_items WHERE guidebook_id = ?').run(guidebookId);
    db.prepare('DELETE FROM guidebooks WHERE id = ?').run(guidebookId);
  })();
}

function replaceGuidebookDetails(input: {
  blocks: GuidebookBlockInput[];
  coverImageUrl: string;
  defaultContent: string;
  guidebookId: number;
  region: string;
  routePoints?: GuidebookRoutePointInput[];
}) {
  const normalizedBlocks = input.blocks.length > 0 ? input.blocks : [
    {
      placeName: `${input.region} 주요 장면`,
      content: input.defaultContent,
      imageUrl: input.coverImageUrl,
    },
  ];
  const insertBlock = db.prepare(`
    INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
    VALUES (@guidebookId, @stepOrder, @placeName, @content, @imageUrl)
  `);

  normalizedBlocks.forEach((item, index) => {
    insertBlock.run({
      guidebookId: input.guidebookId,
      stepOrder: index + 1,
      placeName: item.placeName?.trim() || `${input.region} 주요 장면 ${index + 1}`,
      content: item.content?.trim() || input.defaultContent,
      imageUrl: item.imageUrl?.trim() || input.coverImageUrl,
    });
  });

  const insertRoutePoint = db.prepare(`
    INSERT INTO guidebook_route_points (guidebook_id, point_order, title, x, y)
    VALUES (@guidebookId, @pointOrder, @title, @x, @y)
  `);

  (input.routePoints && input.routePoints.length > 0 ? input.routePoints : [
    { pointOrder: 1, title: '포인트 1', x: 24, y: 32 },
    { pointOrder: 2, title: '포인트 2', x: 66, y: 58 },
  ]).forEach((point, index) => {
    insertRoutePoint.run({
      guidebookId: input.guidebookId,
      pointOrder: point.pointOrder ?? index + 1,
      title: point.title?.trim() || `포인트 ${index + 1}`,
      x: typeof point.x === 'number' ? point.x : 50,
      y: typeof point.y === 'number' ? point.y : 50,
    });
  });
}
