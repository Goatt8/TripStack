import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { mysqlPool } from '../database/mysql.js';

export type PrintCartItemRow = {
  id: number;
  userId: number;
  guidebookId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  creatorName: string;
  title: string;
  country: string;
  region: string;
  coverImageUrl: string;
  printCount: number;
  price: number;
};

export async function getPrintCartItems(userId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      print_cart_items.id,
      print_cart_items.user_id AS userId,
      print_cart_items.guidebook_id AS guidebookId,
      print_cart_items.quantity,
      print_cart_items.created_at AS createdAt,
      print_cart_items.updated_at AS updatedAt,
      guidebooks.creator_id AS creatorId,
      users.username AS creatorName,
      guidebooks.title,
      guidebooks.country,
      guidebooks.region,
      guidebooks.cover_image_url AS coverImageUrl,
      guidebooks.print_count AS printCount,
      guidebooks.price
    FROM print_cart_items
    JOIN guidebooks ON guidebooks.id = print_cart_items.guidebook_id
    JOIN users ON users.id = guidebooks.creator_id
    WHERE print_cart_items.user_id = ?
    ORDER BY print_cart_items.created_at DESC
  `, [userId]);

  return rows as PrintCartItemRow[];
}

export async function clearPrintCart(userId: number) {
  await mysqlPool.execute('DELETE FROM print_cart_items WHERE user_id = ?', [userId]);
}

export async function findGuidebookForPrintCart(guidebookId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>('SELECT id FROM guidebooks WHERE id = ?', [guidebookId]);

  return rows[0] as { id: number } | undefined;
}

export async function upsertPrintCartItem(userId: number, guidebookId: number, quantity: number) {
  await mysqlPool.execute<ResultSetHeader>(`
    INSERT INTO print_cart_items (user_id, guidebook_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      quantity = VALUES(quantity),
      updated_at = CURRENT_TIMESTAMP
  `, [userId, guidebookId, quantity]);
}

export async function updatePrintCartItemQuantity(userId: number, guidebookId: number, quantity: number) {
  await mysqlPool.execute(`
    UPDATE print_cart_items
    SET quantity = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
      AND guidebook_id = ?
  `, [quantity, userId, guidebookId]);
}

export async function deletePrintCartItem(userId: number, guidebookId: number) {
  await mysqlPool.execute(`
    DELETE FROM print_cart_items
    WHERE user_id = ?
      AND guidebook_id = ?
  `, [userId, guidebookId]);
}
