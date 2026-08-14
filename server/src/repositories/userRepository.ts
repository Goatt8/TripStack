import { db } from '../db.js';

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

function hasColumn(tableName: string, columnName: string) {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as { name: string }[];

  return columns.some((column) => column.name === columnName);
}

export function serializeUser(row: UserRow) {
  return {
    ...row,
    isAdmin: Boolean(row.isAdmin),
    username: row.displayName || row.username,
    avatarUrl: row.profileImageUrl || row.avatarUrl,
  };
}

export function findUserById(userId: number) {
  return db.prepare(`
    SELECT ${userSelectColumns}
    FROM users
    WHERE id = ?
  `).get(userId) as UserRow | undefined;
}

export function getUserRows() {
  const rows = db.prepare(`
    SELECT ${userSelectColumns}
    FROM users
    ORDER BY follower_count DESC
  `).all() as UserRow[];

  return rows.map(serializeUser);
}

export function findExistingUserByLoginIdOrEmail(loginId: string, email: string) {
  return db.prepare(`
    SELECT id
    FROM users
    WHERE login_id = @loginId
       OR lower(email) = @email
  `).get({ email, loginId }) as { id: number } | undefined;
}

export function createUser(input: CreateUserInput) {
  const insertUser = hasColumn('users', 'role')
    ? db.prepare(`
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
      VALUES (
        @loginId,
        @displayName,
        'consumer',
        @email,
        @passwordHash,
        @displayName,
        '',
        @profileImageUrl,
        @profileImageUrl,
        0,
        @isAdmin,
        0
      )
    `)
    : db.prepare(`
      INSERT INTO users (
        login_id,
        username,
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
      VALUES (
        @loginId,
        @displayName,
        @email,
        @passwordHash,
        @displayName,
        '',
        @profileImageUrl,
        @profileImageUrl,
        0,
        @isAdmin,
        0
      )
    `);

  return Number(insertUser.run(input).lastInsertRowid);
}

export function findUserByLoginIdWithPassword(loginId: string) {
  return db.prepare(`
    SELECT
      ${userSelectColumns},
      password_hash AS passwordHash
    FROM users
    WHERE login_id = ?
  `).get(loginId) as UserWithPasswordHashRow | undefined;
}

export function updateUserProfile(userId: number, displayName: string, profileImageUrl: string) {
  const result = db.prepare(`
    UPDATE users
    SET username = @displayName,
        display_name = @displayName,
        profile_image_url = @profileImageUrl,
        avatar_url = @profileImageUrl,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = @userId
  `).run({
    displayName,
    profileImageUrl,
    userId,
  });

  return result.changes;
}

export function findUserPasswordHashById(userId: number) {
  return db.prepare(`
    SELECT password_hash AS passwordHash
    FROM users
    WHERE id = ?
  `).get(userId) as { passwordHash: string } | undefined;
}

export function findUserIdByEmailExcept(email: string, userId: number) {
  return db.prepare(`
    SELECT id
    FROM users
    WHERE lower(email) = @email
      AND id != @userId
  `).get({ email, userId }) as { id: number } | undefined;
}

export function updateUserAccount(userId: number, email: string, passwordHash: string | null) {
  db.prepare(`
    UPDATE users
    SET email = @email,
        password_hash = CASE
          WHEN @passwordHash IS NULL THEN password_hash
          ELSE @passwordHash
        END,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = @userId
  `).run({
    email,
    passwordHash,
    userId,
  });
}

export function updateAdminUser(input: UpdateAdminUserInput) {
  const result = db.prepare(`
    UPDATE users
    SET username = @displayName,
        display_name = @displayName,
        email = @email,
        is_admin = @isAdmin,
        profile_image_url = @profileImageUrl,
        avatar_url = @profileImageUrl,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = @userId
  `).run({
    ...input,
    isAdmin: input.isAdmin ? 1 : 0,
  });

  return result.changes;
}

export function getUserDependencyCount(userId: number) {
  const result = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM guidebooks WHERE creator_id = @userId) +
      (SELECT COUNT(*) FROM orders WHERE consumer_id = @userId) +
      (SELECT COUNT(*) FROM guidebooks
        JOIN orders ON orders.guidebook_id = guidebooks.id
        WHERE guidebooks.creator_id = @userId
      ) AS count
  `).get({ userId }) as { count: number };

  return result.count;
}

export function deleteUserById(userId: number) {
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(userId);

  return result.changes;
}
