import { db } from '../db.js';

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

export function getPrintCartItems(userId: number) {
  return db.prepare(`
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
  `).all(userId) as PrintCartItemRow[];
}

export function clearPrintCart(userId: number) {
  db.prepare('DELETE FROM print_cart_items WHERE user_id = ?').run(userId);
}

export function findGuidebookForPrintCart(guidebookId: number) {
  return db.prepare('SELECT id FROM guidebooks WHERE id = ?').get(guidebookId) as { id: number } | undefined;
}

export function upsertPrintCartItem(userId: number, guidebookId: number, quantity: number) {
  db.prepare(`
    INSERT INTO print_cart_items (user_id, guidebook_id, quantity)
    VALUES (@userId, @guidebookId, @quantity)
    ON CONFLICT(user_id, guidebook_id) DO UPDATE SET
      updated_at = CURRENT_TIMESTAMP
  `).run({
    userId,
    guidebookId,
    quantity,
  });
}

export function updatePrintCartItemQuantity(userId: number, guidebookId: number, quantity: number) {
  db.prepare(`
    UPDATE print_cart_items
    SET quantity = @quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = @userId
      AND guidebook_id = @guidebookId
  `).run({ userId, guidebookId, quantity });
}

export function deletePrintCartItem(userId: number, guidebookId: number) {
  db.prepare(`
    DELETE FROM print_cart_items
    WHERE user_id = ?
      AND guidebook_id = ?
  `).run(userId, guidebookId);
}
