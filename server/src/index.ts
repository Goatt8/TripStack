import cors from 'cors';
import express from 'express';
import { db, initializeDatabase } from './db.js';

initializeDatabase();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

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
  `).all({ role: typeof role === 'string' ? role : null });

  response.json(rows);
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
  `).all({ region: typeof region === 'string' ? region : null });

  response.json(rows);
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
