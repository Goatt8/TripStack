import { db } from '../db.js';

export type OrderRow = {
  id: number;
  consumerId: number;
  consumerName: string;
  creatorId: number;
  creatorName: string;
  guidebookId: number;
  guidebookTitle: string;
  country: string;
  region: string;
  quantity: number;
  totalPrice: number;
  selectedLayoutType: string;
  status: string;
  shippingMemo: string;
  createdAt: string;
};

type CreatePrintOrderInput = {
  consumerId: number;
  guidebookId: number;
  quantity: number;
  selectedLayoutType: string;
  shippingMemo: string;
};

const orderSelectSql = `
  SELECT
    orders.id,
    orders.consumer_id AS consumerId,
    consumers.username AS consumerName,
    guidebooks.creator_id AS creatorId,
    creators.username AS creatorName,
    orders.guidebook_id AS guidebookId,
    guidebooks.title AS guidebookTitle,
    guidebooks.country,
    guidebooks.region,
    orders.quantity,
    orders.total_price AS totalPrice,
    custom_prints.selected_layout_type AS selectedLayoutType,
    orders.status,
    orders.shipping_memo AS shippingMemo,
    orders.created_at AS createdAt
  FROM orders
  JOIN users AS consumers ON consumers.id = orders.consumer_id
  JOIN guidebooks ON guidebooks.id = orders.guidebook_id
  JOIN users AS creators ON creators.id = guidebooks.creator_id
  LEFT JOIN custom_prints ON custom_prints.id = orders.custom_print_id
`;

export function getOrderRows() {
  return db.prepare(`
    ${orderSelectSql}
    ORDER BY orders.created_at DESC
  `).all() as OrderRow[];
}

export function findGuidebookPrice(guidebookId: number) {
  return db.prepare('SELECT price FROM guidebooks WHERE id = ?').get(guidebookId) as { price: number } | undefined;
}

export function createPrintOrder(input: CreatePrintOrderInput) {
  const guidebook = findGuidebookPrice(input.guidebookId);

  if (!guidebook) {
    return null;
  }

  const orderId = db.transaction(() => {
    const customPrint = db.prepare(`
      INSERT INTO custom_prints (consumer_id, guidebook_id, selected_layout_type)
      VALUES (?, ?, ?)
    `).run(input.consumerId, input.guidebookId, input.selectedLayoutType);

    const order = db.prepare(`
      INSERT INTO orders (consumer_id, guidebook_id, custom_print_id, quantity, total_price, status, shipping_memo)
      VALUES (?, ?, ?, ?, ?, 'pending', ?)
    `).run(
      input.consumerId,
      input.guidebookId,
      customPrint.lastInsertRowid,
      input.quantity,
      guidebook.price * input.quantity,
      input.shippingMemo,
    );

    db.prepare('UPDATE guidebooks SET print_count = print_count + ? WHERE id = ?').run(input.quantity, input.guidebookId);

    return Number(order.lastInsertRowid);
  })();

  return findOrderById(orderId);
}

export function updateOrderStatus(orderId: number, status: string) {
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, orderId);

  return findOrderById(orderId);
}

function findOrderById(orderId: number) {
  return db.prepare(`
    ${orderSelectSql}
    WHERE orders.id = ?
  `).get(orderId) as OrderRow | undefined;
}
