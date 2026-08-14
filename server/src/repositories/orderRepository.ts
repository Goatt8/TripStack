import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { mysqlPool } from '../database/mysql.js';

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

export async function getOrderRows() {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    ${orderSelectSql}
    ORDER BY orders.created_at DESC
  `);

  return rows as OrderRow[];
}

export async function createPrintOrder(input: CreatePrintOrderInput) {
  const connection = await mysqlPool.getConnection();

  try {
    await connection.beginTransaction();

    const [guidebookRows] = await connection.execute<RowDataPacket[]>(
      'SELECT price FROM guidebooks WHERE id = ?',
      [input.guidebookId],
    );
    const guidebook = guidebookRows[0] as { price: number } | undefined;

    if (!guidebook) {
      await connection.rollback();
      return null;
    }

    const [customPrint] = await connection.execute<ResultSetHeader>(`
      INSERT INTO custom_prints (consumer_id, guidebook_id, selected_layout_type)
      VALUES (?, ?, ?)
    `, [input.consumerId, input.guidebookId, input.selectedLayoutType]);

    const [order] = await connection.execute<ResultSetHeader>(`
      INSERT INTO orders (consumer_id, guidebook_id, custom_print_id, quantity, total_price, status, shipping_memo)
      VALUES (?, ?, ?, ?, ?, 'pending', ?)
    `, [
      input.consumerId,
      input.guidebookId,
      customPrint.insertId,
      input.quantity,
      guidebook.price * input.quantity,
      input.shippingMemo,
    ]);

    await connection.execute(
      'UPDATE guidebooks SET print_count = print_count + ? WHERE id = ?',
      [input.quantity, input.guidebookId],
    );

    await connection.commit();
    return findOrderById(order.insertId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  await mysqlPool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);

  return findOrderById(orderId);
}

async function findOrderById(orderId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    ${orderSelectSql}
    WHERE orders.id = ?
  `, [orderId]);

  return rows[0] as OrderRow | undefined;
}
