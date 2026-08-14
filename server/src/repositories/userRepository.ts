import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { mysqlPool } from '../database/mysql.js';

export type UserRow = {
  id: number;
  loginId: string;
  username: string;
  email: string;
  displayName: string;
  bio: string;
  profileImageUrl: string;
  avatarUrl: string;
  followerCount: number;
  isAdmin: number;
  trustScore: number;
  createdAt: string;
  updatedAt: string;
};

export type UserWithPasswordHashRow = UserRow & {
  passwordHash: string;
};

type CreateUserInput = {
  displayName: string;
  email: string;
  isAdmin: number;
  loginId: string;
  passwordHash: string;
  profileImageUrl: string;
};

type UpdateAdminUserInput = {
  displayName: string;
  email: string;
  isAdmin: boolean;
  profileImageUrl: string;
  userId: number;
};

const userSelectColumns = `
  id,
  login_id AS loginId,
  username,
  email,
  display_name AS displayName,
  bio,
  profile_image_url AS profileImageUrl,
  avatar_url AS avatarUrl,
  follower_count AS followerCount,
  is_admin AS isAdmin,
  trust_score AS trustScore,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

export function serializeUser(row: UserRow) {
  return {
    ...row,
    isAdmin: Boolean(row.isAdmin),
    username: row.displayName || row.username,
    avatarUrl: row.profileImageUrl || row.avatarUrl,
  };
}

export async function findUserById(userId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT ${userSelectColumns}
    FROM users
    WHERE id = ?
  `, [userId]);

  return rows[0] as UserRow | undefined;
}

export async function getUserRows() {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT ${userSelectColumns}
    FROM users
    ORDER BY follower_count DESC
  `);

  return (rows as UserRow[]).map(serializeUser);
}

export async function findExistingUserByLoginIdOrEmail(loginId: string, email: string) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT id
    FROM users
    WHERE login_id = ?
       OR lower(email) = ?
  `, [loginId, email]);

  return rows[0] as { id: number } | undefined;
}

export async function createUser(input: CreateUserInput) {
  const [result] = await mysqlPool.execute<ResultSetHeader>(`
    INSERT INTO users (
      login_id,
      username,
      role,
      email,
      password_hash,
      display_name,
      bio,
      profile_image_url,
      avatar_url,
      follower_count,
      is_admin,
      trust_score
    )
    VALUES (?, ?, 'consumer', ?, ?, ?, '', ?, ?, 0, ?, 0)
  `, [
    input.loginId,
    input.displayName,
    input.email,
    input.passwordHash,
    input.displayName,
    input.profileImageUrl,
    input.profileImageUrl,
    input.isAdmin,
  ]);

  return result.insertId;
}

export async function findUserByLoginIdWithPassword(loginId: string) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      ${userSelectColumns},
      password_hash AS passwordHash
    FROM users
    WHERE login_id = ?
  `, [loginId]);

  return rows[0] as UserWithPasswordHashRow | undefined;
}

export async function updateUserProfile(userId: number, displayName: string, profileImageUrl: string) {
  const [result] = await mysqlPool.execute<ResultSetHeader>(`
    UPDATE users
    SET username = ?,
        display_name = ?,
        profile_image_url = ?,
        avatar_url = ?
    WHERE id = ?
  `, [displayName, displayName, profileImageUrl, profileImageUrl, userId]);

  return result.affectedRows;
}

export async function findUserPasswordHashById(userId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT password_hash AS passwordHash
    FROM users
    WHERE id = ?
  `, [userId]);

  return rows[0] as { passwordHash: string } | undefined;
}

export async function findUserIdByEmailExcept(email: string, userId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT id
    FROM users
    WHERE lower(email) = ?
      AND id != ?
  `, [email, userId]);

  return rows[0] as { id: number } | undefined;
}

export async function updateUserAccount(userId: number, email: string, passwordHash: string | null) {
  await mysqlPool.execute(`
    UPDATE users
    SET email = ?,
        password_hash = CASE
          WHEN ? IS NULL THEN password_hash
          ELSE ?
        END
    WHERE id = ?
  `, [email, passwordHash, passwordHash, userId]);
}

export async function updateAdminUser(input: UpdateAdminUserInput) {
  const [result] = await mysqlPool.execute<ResultSetHeader>(`
    UPDATE users
    SET username = ?,
        display_name = ?,
        email = ?,
        is_admin = ?,
        profile_image_url = ?,
        avatar_url = ?
    WHERE id = ?
  `, [
    input.displayName,
    input.displayName,
    input.email,
    input.isAdmin ? 1 : 0,
    input.profileImageUrl,
    input.profileImageUrl,
    input.userId,
  ]);

  return result.affectedRows;
}

export async function getUserDependencyCount(userId: number) {
  const [rows] = await mysqlPool.execute<RowDataPacket[]>(`
    SELECT
      (SELECT COUNT(*) FROM guidebooks WHERE creator_id = ?) +
      (SELECT COUNT(*) FROM orders WHERE consumer_id = ?) +
      (SELECT COUNT(*) FROM guidebooks
        JOIN orders ON orders.guidebook_id = guidebooks.id
        WHERE guidebooks.creator_id = ?
      ) AS count
  `, [userId, userId, userId]);

  return Number(rows[0]?.count ?? 0);
}

export async function deleteUserById(userId: number) {
  const [result] = await mysqlPool.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [userId]);

  return result.affectedRows;
}
