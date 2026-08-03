import cors from 'cors';
import express from 'express';
import { db, initializeDatabase } from './db.js';

initializeDatabase();

type UserRow = {
  id: number;
  username: string;
  role: string;
  bio: string;
  avatarUrl: string;
  followerCount: number;
  trustScore: number;
  createdAt: string;
};

type GuidebookRow = {
  id: number;
  creatorId: number;
  creatorName: string;
  title: string;
  country: string;
  region: string;
  coverImageUrl: string;
  mapImageUrl: string;
  printCount: number;
  followerCount: number;
  trustScore: number;
  blockCount: number;
  rankInRegion: number;
};

type RoutePointRow = {
  id: number;
  guidebookId: number;
  pointOrder: number;
  title: string;
  x: number;
  y: number;
};

type GuidebookBlockRow = {
  id: number;
  guidebookId: number;
  stepOrder: number;
  placeName: string;
  content: string;
  imageUrl: string;
};

type CreateGuidebookBody = {
  creatorId?: number;
  title?: string;
  country?: string;
  region?: string;
  coverImageUrl?: string;
  mapImageUrl?: string;
  routePoints?: Array<{
    pointOrder?: number;
    title?: string;
    x?: number;
    y?: number;
  }>;
  block?: {
    placeName?: string;
    content?: string;
    imageUrl?: string;
  };
};

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

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

function getGuidebookById(guidebookId: number) {
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
      guidebooks.print_count AS printCount,
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

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'tripstack-api' });
});

app.get('/api/users', (request, response) => {
  const role = request.query.role;
  const rows = db.prepare(`
    SELECT
      id,
      username,
      role,
      bio,
      avatar_url AS avatarUrl,
      follower_count AS followerCount,
      trust_score AS trustScore,
      created_at AS createdAt
    FROM users
    WHERE @role IS NULL OR role = @role
    ORDER BY follower_count DESC
  `).all({ role: typeof role === 'string' ? role : null }) as UserRow[];

  response.json(uniqueBy(rows, (row) => `${row.username}-${row.avatarUrl}`));
});

app.get('/api/guidebooks', (request, response) => {
  const region = request.query.region;
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
      guidebooks.print_count AS printCount,
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
  `).all({ region: typeof region === 'string' ? region : null }) as GuidebookRow[];

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

  response.json(guidebooks.map((row) => ({
    ...row,
    routePoints: routePoints.filter((point) => point.guidebookId === row.id),
  })));
});

app.get('/api/guidebooks/:id/blocks', (request, response) => {
  const rows = db.prepare(`
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
  `).all(request.params.id);

  response.json(rows);
});

app.post('/api/guidebooks', (request, response) => {
  const {
    block,
    country,
    coverImageUrl,
    creatorId,
    mapImageUrl,
    region,
    routePoints,
    title,
  } = request.body as CreateGuidebookBody;

  if (!creatorId || !title || !country || !region || !coverImageUrl || !mapImageUrl) {
    response.status(400).json({
      message: 'creatorId, title, country, region, coverImageUrl, mapImageUrl are required.',
    });
    return;
  }

  const creator = db.prepare('SELECT id FROM users WHERE id = ? AND role = ?').get(creatorId, 'creator');

  if (!creator) {
    response.status(404).json({ message: 'Creator not found.' });
    return;
  }

  const transaction = db.transaction(() => {
    const createdGuidebook = db.prepare(`
      INSERT INTO guidebooks (creator_id, title, country, region, cover_image_url, map_image_url, print_count)
      VALUES (@creatorId, @title, @country, @region, @coverImageUrl, @mapImageUrl, 0)
    `).run({
      creatorId,
      title,
      country,
      region,
      coverImageUrl,
      mapImageUrl,
    });

    const guidebookId = Number(createdGuidebook.lastInsertRowid);

    db.prepare(`
      INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
      VALUES (@guidebookId, 1, @placeName, @content, @imageUrl)
    `).run({
      guidebookId,
      placeName: block?.placeName?.trim() || `${region} 주요 장면`,
      content: block?.content?.trim() || '생성 모달에서 입력한 가이드북 상세 설명입니다.',
      imageUrl: block?.imageUrl?.trim() || coverImageUrl,
    });

    const insertRoutePoint = db.prepare(`
      INSERT INTO guidebook_route_points (guidebook_id, point_order, title, x, y)
      VALUES (@guidebookId, @pointOrder, @title, @x, @y)
    `);

    (routePoints && routePoints.length > 0 ? routePoints : [
      { pointOrder: 1, title: `${region} 시작점`, x: 24, y: 32 },
      { pointOrder: 2, title: `${region} 도착점`, x: 66, y: 58 },
    ]).forEach((point, index) => {
      insertRoutePoint.run({
        guidebookId,
        pointOrder: point.pointOrder ?? index + 1,
        title: point.title?.trim() || `위치 포인트 ${index + 1}`,
        x: typeof point.x === 'number' ? point.x : 50,
        y: typeof point.y === 'number' ? point.y : 50,
      });
    });

    return guidebookId;
  });

  const guidebookId = transaction();
  const guidebook = getGuidebookById(guidebookId);
  const blocks = db.prepare(`
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

  response.status(201).json({ guidebook, blocks });
});

app.get('/api/orders', (_request, response) => {
  const rows = db.prepare(`
    SELECT
      orders.id,
      orders.consumer_id AS consumerId,
      users.username AS consumerName,
      orders.guidebook_id AS guidebookId,
      guidebooks.title AS guidebookTitle,
      custom_prints.selected_layout_type AS selectedLayoutType,
      orders.status,
      orders.shipping_memo AS shippingMemo,
      orders.created_at AS createdAt
    FROM orders
    JOIN users ON users.id = orders.consumer_id
    JOIN guidebooks ON guidebooks.id = orders.guidebook_id
    LEFT JOIN custom_prints ON custom_prints.id = orders.custom_print_id
    ORDER BY orders.created_at DESC
  `).all();

  response.json(rows);
});

app.post('/api/orders', (request, response) => {
  const { consumerId, guidebookId, selectedLayoutType, shippingMemo } = request.body as {
    consumerId?: number;
    guidebookId?: number;
    selectedLayoutType?: string;
    shippingMemo?: string;
  };

  if (!consumerId || !guidebookId || !selectedLayoutType) {
    response.status(400).json({ message: 'consumerId, guidebookId, selectedLayoutType are required.' });
    return;
  }

  const transaction = db.transaction(() => {
    const customPrint = db.prepare(`
      INSERT INTO custom_prints (consumer_id, guidebook_id, selected_layout_type)
      VALUES (?, ?, ?)
    `).run(consumerId, guidebookId, selectedLayoutType);

    const order = db.prepare(`
      INSERT INTO orders (consumer_id, guidebook_id, custom_print_id, status, shipping_memo)
      VALUES (?, ?, ?, 'pending', ?)
    `).run(consumerId, guidebookId, customPrint.lastInsertRowid, shippingMemo ?? '');

    db.prepare('UPDATE guidebooks SET print_count = print_count + 1 WHERE id = ?').run(guidebookId);
    return order.lastInsertRowid;
  });

  const orderId = transaction();
  const created = db.prepare(`
    SELECT
      orders.id,
      orders.consumer_id AS consumerId,
      users.username AS consumerName,
      orders.guidebook_id AS guidebookId,
      guidebooks.title AS guidebookTitle,
      custom_prints.selected_layout_type AS selectedLayoutType,
      orders.status,
      orders.shipping_memo AS shippingMemo,
      orders.created_at AS createdAt
    FROM orders
    JOIN users ON users.id = orders.consumer_id
    JOIN guidebooks ON guidebooks.id = orders.guidebook_id
    LEFT JOIN custom_prints ON custom_prints.id = orders.custom_print_id
    WHERE orders.id = ?
  `).get(orderId);

  response.status(201).json(created);
});

app.patch('/api/orders/:id/status', (request, response) => {
  const { status } = request.body as { status?: string };

  if (!['pending', 'processing', 'completed'].includes(status ?? '')) {
    response.status(400).json({ message: 'Invalid status.' });
    return;
  }

  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, request.params.id);

  const updated = db.prepare(`
    SELECT
      orders.id,
      orders.consumer_id AS consumerId,
      users.username AS consumerName,
      orders.guidebook_id AS guidebookId,
      guidebooks.title AS guidebookTitle,
      custom_prints.selected_layout_type AS selectedLayoutType,
      orders.status,
      orders.shipping_memo AS shippingMemo,
      orders.created_at AS createdAt
    FROM orders
    JOIN users ON users.id = orders.consumer_id
    JOIN guidebooks ON guidebooks.id = orders.guidebook_id
    LEFT JOIN custom_prints ON custom_prints.id = orders.custom_print_id
    WHERE orders.id = ?
  `).get(request.params.id);

  response.json(updated);
});

app.listen(port, () => {
  console.log(`TripStack API running on http://localhost:${port}`);
});
