import cors from 'cors';
import express, { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { db, initializeDatabase } from './db.js';

initializeDatabase();

type UserRow = {
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

type GuidebookRow = {
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

type GeoapifyGeocodeResponse = {
  results?: Array<{
    lat?: number;
    lon?: number;
    result_type?: string;
  }>;
};

type PrintCartItemRow = {
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

type CreateGuidebookBody = {
  creatorId?: number;
  title?: string;
  country?: string;
  region?: string;
  coverImageUrl?: string;
  mapImageUrl?: string;
  mapCenterLat?: number | null;
  mapCenterLon?: number | null;
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
  blocks?: Array<{
    placeName?: string;
    content?: string;
    imageUrl?: string;
  }>;
};

type AdminUpdateUserBody = {
  displayName?: string;
  email?: string;
  isAdmin?: boolean;
  profileImageUrl?: string;
};

const app = express();
const port = Number(process.env.PORT ?? 4000);
const adminSignupCode = process.env.ADMIN_SIGNUP_CODE ?? 'tripstack-admin';
const geoapifyApiKey = process.env.GEOAPIFY_API_KEY ?? process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY ?? '';
const jwtSecret = process.env.JWT_SECRET ?? 'tripstack-local-jwt-secret';
const mapLanguage = 'en';
const mapPreviewHeight = '675';
const mapPreviewStyle = 'klokantech-basic';
const mapPreviewWidth = '900';
const mapPreviewZoom = '11';

type AuthTokenPayload = {
  userId: number;
};

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

function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');

  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedPasswordHash: string) {
  const [salt, hash] = storedPasswordHash.split(':');

  if (!salt || !hash) {
    return false;
  }

  const inputHash = scryptSync(password, salt, 64);
  const savedHash = Buffer.from(hash, 'hex');

  return savedHash.length === inputHash.length && timingSafeEqual(savedHash, inputHash);
}

function serializeUser(row: UserRow) {
  return {
    ...row,
    isAdmin: Boolean(row.isAdmin),
    username: row.displayName || row.username,
    avatarUrl: row.profileImageUrl || row.avatarUrl,
  };
}

function createAccessToken(userId: number) {
  return jwt.sign({ userId } satisfies AuthTokenPayload, jwtSecret, {
    expiresIn: '2h',
  });
}

function getBearerToken(request: Request) {
  const authorization = request.header('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }

  return authorization.slice('Bearer '.length).trim();
}

function getRequestUser(request: Request) {
  const token = getBearerToken(request);

  if (!token) {
    return null;
  }

  let payload: AuthTokenPayload;

  try {
    payload = jwt.verify(token, jwtSecret) as AuthTokenPayload;
  } catch {
    return null;
  }

  const userId = payload.userId;

  if (!Number.isInteger(userId)) {
    return null;
  }

  const user = db.prepare(`
    SELECT
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
    FROM users
    WHERE id = ?
  `).get(userId) as UserRow | undefined;

  return user ? serializeUser(user) : null;
}

function requireAdminUser(request: Request, response: Response) {
  const currentUser = getRequestUser(request);

  if (!currentUser) {
    response.status(401).json({ message: '로그인이 필요합니다.' });
    return null;
  }

  if (!currentUser.isAdmin) {
    response.status(403).json({ message: '관리자 권한이 필요합니다.' });
    return null;
  }

  return currentUser;
}

function hasColumn(tableName: string, columnName: string) {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as { name: string }[];

  return columns.some((column) => column.name === columnName);
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

function getPrintCartItems(userId: number) {
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

function getUserRows() {
  const rows = db.prepare(`
    SELECT
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
    FROM users
    ORDER BY follower_count DESC
  `).all() as UserRow[];

  return rows.map(serializeUser);
}

function getGuidebookRows(region: string | null = null) {
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

function getOrderRows() {
  return db.prepare(`
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
    ORDER BY orders.created_at DESC
  `).all();
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'tripstack-api' });
});

app.get('/api/maps/preview', async (request, response) => {
  const country = typeof request.query.country === 'string' ? request.query.country : '';
  const region = typeof request.query.region === 'string' ? request.query.region : '';
  const fallbackMapImageUrl = typeof request.query.fallbackMapImageUrl === 'string'
    ? request.query.fallbackMapImageUrl
    : '';
  const fallbackLat = Number(request.query.fallbackLat);
  const fallbackLon = Number(request.query.fallbackLon);

  if (!country || !region) {
    response.status(400).json({ message: 'country and region are required.' });
    return;
  }

  if (!geoapifyApiKey) {
    response.json({
      country,
      mapCenterLat: Number.isFinite(fallbackLat) ? fallbackLat : null,
      mapCenterLon: Number.isFinite(fallbackLon) ? fallbackLon : null,
      mapImageUrl: fallbackMapImageUrl,
      provider: 'local',
      region,
    });
    return;
  }

  try {
    const geocodeUrl = new URL('https://api.geoapify.com/v1/geocode/search');
    geocodeUrl.searchParams.set('apiKey', geoapifyApiKey);
    geocodeUrl.searchParams.set('format', 'json');
    geocodeUrl.searchParams.set('lang', mapLanguage);
    geocodeUrl.searchParams.set('limit', '1');
    geocodeUrl.searchParams.set('text', `${region}, ${country}`);
    geocodeUrl.searchParams.set('type', 'city');

    const geocodeResponse = await fetch(geocodeUrl);

    if (!geocodeResponse.ok) {
      throw new Error(`Geoapify geocode failed: ${geocodeResponse.status}`);
    }

    const geocodeData = await geocodeResponse.json() as GeoapifyGeocodeResponse;
    const firstResult = geocodeData.results?.[0];
    const mapCenterLat = typeof firstResult?.lat === 'number'
      ? firstResult.lat
      : Number.isFinite(fallbackLat) ? fallbackLat : null;
    const mapCenterLon = typeof firstResult?.lon === 'number'
      ? firstResult.lon
      : Number.isFinite(fallbackLon) ? fallbackLon : null;

    if (typeof mapCenterLat !== 'number' || typeof mapCenterLon !== 'number') {
      response.json({
        country,
        mapCenterLat,
        mapCenterLon,
        mapImageUrl: fallbackMapImageUrl,
        provider: 'local',
        region,
      });
      return;
    }

    const staticMapUrl = new URL('https://maps.geoapify.com/v1/staticmap');
    staticMapUrl.searchParams.set('apiKey', geoapifyApiKey);
    staticMapUrl.searchParams.set('center', `lonlat:${mapCenterLon},${mapCenterLat}`);
    staticMapUrl.searchParams.set('height', mapPreviewHeight);
    staticMapUrl.searchParams.set('lang', mapLanguage);
    staticMapUrl.searchParams.set('marker', `lonlat:${mapCenterLon},${mapCenterLat};color:blue;size:medium`);
    staticMapUrl.searchParams.set('style', mapPreviewStyle);
    staticMapUrl.searchParams.set('width', mapPreviewWidth);
    staticMapUrl.searchParams.set('zoom', mapPreviewZoom);

    response.json({
      country,
      mapCenterLat,
      mapCenterLon,
      mapImageUrl: staticMapUrl.toString(),
      provider: 'geoapify',
      region,
    });
  } catch {
    response.json({
      country,
      mapCenterLat: Number.isFinite(fallbackLat) ? fallbackLat : null,
      mapCenterLon: Number.isFinite(fallbackLon) ? fallbackLon : null,
      mapImageUrl: fallbackMapImageUrl,
      provider: 'local',
      region,
    });
  }
});

app.get('/api/maps/cities', (request, response) => {
  const country = typeof request.query.country === 'string' ? request.query.country : '';

  if (!country) {
    response.status(400).json({ message: 'country is required.' });
    return;
  }

  const rows = db.prepare(`
    SELECT
      country,
      city,
      fallback_map_image_url AS mapImageUrl,
      map_center_lat AS mapCenterLat,
      map_center_lon AS mapCenterLon
    FROM location_presets
    WHERE country = ?
    ORDER BY sort_order ASC, city ASC
  `).all(country);

  response.json(rows);
});

app.get('/api/users', (request, response) => {
  response.json(uniqueBy(getUserRows(), (row) => `${row.username}-${row.avatarUrl}`));
});

app.post('/api/auth/signup', (request, response) => {
  const { adminCode, displayName, email, loginId, password, profileImageUrl } = request.body as {
    adminCode?: string;
    displayName?: string;
    email?: string;
    loginId?: string;
    password?: string;
    profileImageUrl?: string;
  };

  const normalizedLoginId = loginId?.trim();
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedDisplayName = displayName?.trim();
  const normalizedAdminCode = adminCode?.trim();

  if (!normalizedLoginId || !normalizedEmail || !normalizedDisplayName || !password) {
    response.status(400).json({ message: 'loginId, email, displayName, and password are required.' });
    return;
  }

  const existingUser = db.prepare(`
    SELECT id
    FROM users
    WHERE login_id = @loginId
       OR lower(email) = @email
  `).get({ email: normalizedEmail, loginId: normalizedLoginId });

  if (existingUser) {
    response.status(409).json({ message: '이미 사용 중인 아이디 또는 이메일입니다.' });
    return;
  }

  if (normalizedAdminCode && normalizedAdminCode !== adminSignupCode) {
    response.status(403).json({ message: '관리자 코드가 일치하지 않습니다.' });
    return;
  }

  const isAdmin = normalizedAdminCode === adminSignupCode ? 1 : 0;

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

  const result = insertUser.run({
    displayName: normalizedDisplayName,
    email: normalizedEmail,
    loginId: normalizedLoginId,
    passwordHash: createPasswordHash(password),
    profileImageUrl: profileImageUrl?.trim() || '',
    isAdmin,
  });

  const user = db.prepare(`
    SELECT
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
    FROM users
    WHERE id = ?
  `).get(result.lastInsertRowid) as UserRow;

  response.status(201).json({
    token: createAccessToken(user.id),
    user: serializeUser(user),
  });
});

app.post('/api/auth/login', (request, response) => {
  const { loginId, password } = request.body as { loginId?: string; password?: string };
  const normalizedLoginId = loginId?.trim();

  if (!normalizedLoginId || !password) {
    response.status(400).json({ message: 'loginId and password are required.' });
    return;
  }

  const user = db.prepare(`
    SELECT
      id,
      login_id AS loginId,
      username,
      email,
      password_hash AS passwordHash,
      display_name AS displayName,
      bio,
      profile_image_url AS profileImageUrl,
      avatar_url AS avatarUrl,
      follower_count AS followerCount,
      is_admin AS isAdmin,
      trust_score AS trustScore,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM users
    WHERE login_id = ?
  `).get(normalizedLoginId) as (UserRow & { passwordHash: string }) | undefined;

  if (!user) {
    response.status(404).json({ message: '존재하지 않는 계정입니다.' });
    return;
  }

  if (!verifyPassword(password, user.passwordHash)) {
    response.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    return;
  }

  const { passwordHash: _passwordHash, ...safeUser } = user;
  response.json({
    token: createAccessToken(user.id),
    user: serializeUser(safeUser),
  });
});

app.patch('/api/users/:id/profile', (request, response) => {
  const userId = Number(request.params.id);
  const { displayName, profileImageUrl } = request.body as {
    displayName?: string;
    profileImageUrl?: string;
  };

  const normalizedDisplayName = displayName?.trim();

  if (!Number.isInteger(userId) || !normalizedDisplayName) {
    response.status(400).json({ message: 'userId and displayName are required.' });
    return;
  }

  const result = db.prepare(`
    UPDATE users
    SET username = @displayName,
        display_name = @displayName,
        profile_image_url = @profileImageUrl,
        avatar_url = @profileImageUrl,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = @userId
  `).run({
    displayName: normalizedDisplayName,
    profileImageUrl: profileImageUrl?.trim() || '',
    userId,
  });

  if (result.changes === 0) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  const user = db.prepare(`
    SELECT
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
    FROM users
    WHERE id = ?
  `).get(userId) as UserRow;

  response.json(serializeUser(user));
});

app.patch('/api/users/:id/account', (request, response) => {
  const userId = Number(request.params.id);
  const { currentPassword, email, newPassword } = request.body as {
    currentPassword?: string;
    email?: string;
    newPassword?: string;
  };

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedNewPassword = newPassword?.trim();

  if (!Number.isInteger(userId) || !normalizedEmail) {
    response.status(400).json({ message: 'userId and email are required.' });
    return;
  }

  const currentUser = db.prepare(`
    SELECT password_hash AS passwordHash
    FROM users
    WHERE id = ?
  `).get(userId) as { passwordHash: string } | undefined;

  if (!currentUser) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  if (normalizedNewPassword) {
    if (!currentPassword || !verifyPassword(currentPassword, currentUser.passwordHash)) {
      response.status(401).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
      return;
    }
  }

  const existingEmailOwner = db.prepare(`
    SELECT id
    FROM users
    WHERE lower(email) = @email
      AND id != @userId
  `).get({ email: normalizedEmail, userId });

  if (existingEmailOwner) {
    response.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
    return;
  }

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
    email: normalizedEmail,
    passwordHash: normalizedNewPassword ? createPasswordHash(normalizedNewPassword) : null,
    userId,
  });

  const user = db.prepare(`
    SELECT
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
    FROM users
    WHERE id = ?
  `).get(userId) as UserRow;

  response.json(serializeUser(user));
});

app.patch('/api/admin/users/:id', (request, response) => {
  if (!requireAdminUser(request, response)) {
    return;
  }

  const userId = Number(request.params.id);
  const { displayName, email, isAdmin, profileImageUrl } = request.body as AdminUpdateUserBody;
  const normalizedDisplayName = displayName?.trim();
  const normalizedEmail = email?.trim().toLowerCase();

  if (!Number.isInteger(userId) || !normalizedDisplayName || !normalizedEmail || typeof isAdmin !== 'boolean') {
    response.status(400).json({ message: 'userId, displayName, email, and isAdmin are required.' });
    return;
  }

  const existingEmailOwner = db.prepare(`
    SELECT id
    FROM users
    WHERE lower(email) = @email
      AND id != @userId
  `).get({ email: normalizedEmail, userId });

  if (existingEmailOwner) {
    response.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
    return;
  }

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
    displayName: normalizedDisplayName,
    email: normalizedEmail,
    isAdmin: isAdmin ? 1 : 0,
    profileImageUrl: profileImageUrl?.trim() || '',
    userId,
  });

  if (result.changes === 0) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  const user = db.prepare(`
    SELECT
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
    FROM users
    WHERE id = ?
  `).get(userId) as UserRow;

  response.json(serializeUser(user));
});

app.delete('/api/admin/users/:id', (request, response) => {
  if (!requireAdminUser(request, response)) {
    return;
  }

  const userId = Number(request.params.id);

  if (!Number.isInteger(userId)) {
    response.status(400).json({ message: 'Valid userId is required.' });
    return;
  }

  const dependencyCount = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM guidebooks WHERE creator_id = @userId) +
      (SELECT COUNT(*) FROM orders WHERE consumer_id = @userId) +
      (SELECT COUNT(*) FROM guidebooks
        JOIN orders ON orders.guidebook_id = guidebooks.id
        WHERE guidebooks.creator_id = @userId
      ) AS count
  `).get({ userId }) as { count: number };

  if (dependencyCount.count > 0) {
    response.status(409).json({ message: '연결된 가이드북 또는 주문이 있는 계정은 삭제할 수 없습니다.' });
    return;
  }

  const result = db.prepare('DELETE FROM users WHERE id = ?').run(userId);

  if (result.changes === 0) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  response.status(204).send();
});

app.get('/api/admin/users', (request, response) => {
  if (!requireAdminUser(request, response)) {
    return;
  }

  response.json(getUserRows());
});

app.get('/api/admin/guidebooks', (request, response) => {
  if (!requireAdminUser(request, response)) {
    return;
  }

  response.json(getGuidebookRows());
});

app.get('/api/admin/orders', (request, response) => {
  if (!requireAdminUser(request, response)) {
    return;
  }

  response.json(getOrderRows());
});

app.get('/api/guidebooks', (request, response) => {
  const region = request.query.region;

  response.json(getGuidebookRows(typeof region === 'string' ? region : null));
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

app.get('/api/print-cart', (request, response) => {
  const userId = Number(request.query.userId);

  if (!Number.isInteger(userId)) {
    response.status(400).json({ message: 'userId is required.' });
    return;
  }

  response.json(getPrintCartItems(userId));
});

app.delete('/api/print-cart', (request, response) => {
  const userId = Number(request.query.userId);

  if (!Number.isInteger(userId)) {
    response.status(400).json({ message: 'userId is required.' });
    return;
  }

  db.prepare('DELETE FROM print_cart_items WHERE user_id = ?').run(userId);
  response.status(204).send();
});

app.post('/api/print-cart', (request, response) => {
  const { guidebookId, quantity, userId } = request.body as {
    guidebookId?: number;
    quantity?: number;
    userId?: number;
  };

  if (!userId || !guidebookId) {
    response.status(400).json({ message: 'userId and guidebookId are required.' });
    return;
  }

  const guidebook = db.prepare('SELECT id FROM guidebooks WHERE id = ?').get(guidebookId);

  if (!guidebook) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  db.prepare(`
    INSERT INTO print_cart_items (user_id, guidebook_id, quantity)
    VALUES (@userId, @guidebookId, @quantity)
    ON CONFLICT(user_id, guidebook_id) DO UPDATE SET
      updated_at = CURRENT_TIMESTAMP
  `).run({
    userId,
    guidebookId,
    quantity: Math.max(1, quantity ?? 1),
  });

  response.status(201).json(getPrintCartItems(userId).find((item) => item.guidebookId === guidebookId));
});

app.patch('/api/print-cart/:guidebookId', (request, response) => {
  const guidebookId = Number(request.params.guidebookId);
  const { quantity, userId } = request.body as { quantity?: number; userId?: number };

  if (!userId || !Number.isInteger(guidebookId) || !quantity || quantity < 1) {
    response.status(400).json({ message: 'userId, guidebookId, and positive quantity are required.' });
    return;
  }

  db.prepare(`
    UPDATE print_cart_items
    SET quantity = @quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = @userId
      AND guidebook_id = @guidebookId
  `).run({ userId, guidebookId, quantity });

  const updated = getPrintCartItems(userId).find((item) => item.guidebookId === guidebookId);

  if (!updated) {
    response.status(404).json({ message: 'Print cart item not found.' });
    return;
  }

  response.json(updated);
});

app.delete('/api/print-cart/:guidebookId', (request, response) => {
  const guidebookId = Number(request.params.guidebookId);
  const userId = Number(request.query.userId);

  if (!Number.isInteger(userId) || !Number.isInteger(guidebookId)) {
    response.status(400).json({ message: 'userId and guidebookId are required.' });
    return;
  }

  db.prepare(`
    DELETE FROM print_cart_items
    WHERE user_id = ?
      AND guidebook_id = ?
  `).run(userId, guidebookId);

  response.status(204).send();
});

app.post('/api/guidebooks', (request, response) => {
  const {
    block,
    blocks,
    country,
    coverImageUrl,
    creatorId,
    mapImageUrl,
    mapCenterLat,
    mapCenterLon,
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

  const creator = db.prepare('SELECT id FROM users WHERE id = ?').get(creatorId);

  if (!creator) {
    response.status(404).json({ message: 'Creator not found.' });
    return;
  }

  const transaction = db.transaction(() => {
    const createdGuidebook = db.prepare(`
      INSERT INTO guidebooks (creator_id, title, country, region, cover_image_url, map_image_url, map_center_lat, map_center_lon, print_count, price)
      VALUES (@creatorId, @title, @country, @region, @coverImageUrl, @mapImageUrl, @mapCenterLat, @mapCenterLon, 0, 12800)
    `).run({
      creatorId,
      title,
      country,
      region,
      coverImageUrl,
      mapImageUrl,
      mapCenterLat: typeof mapCenterLat === 'number' ? mapCenterLat : null,
      mapCenterLon: typeof mapCenterLon === 'number' ? mapCenterLon : null,
    });

    const guidebookId = Number(createdGuidebook.lastInsertRowid);

    const blockInputs = blocks && blocks.length > 0 ? blocks : block ? [block] : [];
    const normalizedBlocks = blockInputs.length > 0 ? blockInputs : [
      {
        placeName: `${region} 주요 장면`,
        content: '생성 모달에서 입력한 가이드북 상세 설명입니다.',
        imageUrl: coverImageUrl,
      },
    ];
    const insertBlock = db.prepare(`
      INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
      VALUES (@guidebookId, @stepOrder, @placeName, @content, @imageUrl)
    `);

    normalizedBlocks.forEach((item, index) => {
      insertBlock.run({
        guidebookId,
        stepOrder: index + 1,
        placeName: item.placeName?.trim() || `${region} 주요 장면 ${index + 1}`,
        content: item.content?.trim() || '생성 모달에서 입력한 가이드북 상세 설명입니다.',
        imageUrl: item.imageUrl?.trim() || coverImageUrl,
      });
    });

    const insertRoutePoint = db.prepare(`
      INSERT INTO guidebook_route_points (guidebook_id, point_order, title, x, y)
      VALUES (@guidebookId, @pointOrder, @title, @x, @y)
    `);

    (routePoints && routePoints.length > 0 ? routePoints : [
      { pointOrder: 1, title: '포인트 1', x: 24, y: 32 },
      { pointOrder: 2, title: '포인트 2', x: 66, y: 58 },
    ]).forEach((point, index) => {
      insertRoutePoint.run({
        guidebookId,
        pointOrder: point.pointOrder ?? index + 1,
        title: point.title?.trim() || `포인트 ${index + 1}`,
        x: typeof point.x === 'number' ? point.x : 50,
        y: typeof point.y === 'number' ? point.y : 50,
      });
    });

    return guidebookId;
  });

  const guidebookId = transaction();
  const guidebook = getGuidebookById(guidebookId);
  const createdBlocks = db.prepare(`
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

  response.status(201).json({ guidebook, blocks: createdBlocks });
});

app.patch('/api/guidebooks/:id', (request, response) => {
  const guidebookId = Number(request.params.id);
  const {
    blocks,
    country,
    coverImageUrl,
    creatorId,
    mapImageUrl,
    mapCenterLat,
    mapCenterLon,
    region,
    routePoints,
    title,
  } = request.body as CreateGuidebookBody;

  if (!Number.isInteger(guidebookId)) {
    response.status(400).json({ message: 'Valid guidebook id is required.' });
    return;
  }

  if (!creatorId || !title || !country || !region || !coverImageUrl || !mapImageUrl) {
    response.status(400).json({
      message: 'creatorId, title, country, region, coverImageUrl, mapImageUrl are required.',
    });
    return;
  }

  const guidebook = db.prepare('SELECT id, creator_id AS creatorId FROM guidebooks WHERE id = ?').get(guidebookId) as {
    creatorId: number;
    id: number;
  } | undefined;

  if (!guidebook) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  if (guidebook.creatorId !== creatorId) {
    response.status(403).json({ message: 'Only the guidebook creator can update this guidebook.' });
    return;
  }

  const transaction = db.transaction(() => {
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
      country,
      coverImageUrl,
      guidebookId,
      mapImageUrl,
      mapCenterLat: typeof mapCenterLat === 'number' ? mapCenterLat : null,
      mapCenterLon: typeof mapCenterLon === 'number' ? mapCenterLon : null,
      region,
      title,
    });

    db.prepare('DELETE FROM guidebook_blocks WHERE guidebook_id = ?').run(guidebookId);
    db.prepare('DELETE FROM guidebook_route_points WHERE guidebook_id = ?').run(guidebookId);

    const normalizedBlocks = blocks && blocks.length > 0 ? blocks : [
      {
        placeName: `${region} 주요 장면`,
        content: '수정 모달에서 입력한 가이드북 상세 설명입니다.',
        imageUrl: coverImageUrl,
      },
    ];
    const insertBlock = db.prepare(`
      INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
      VALUES (@guidebookId, @stepOrder, @placeName, @content, @imageUrl)
    `);

    normalizedBlocks.forEach((item, index) => {
      insertBlock.run({
        guidebookId,
        stepOrder: index + 1,
        placeName: item.placeName?.trim() || `${region} 주요 장면 ${index + 1}`,
        content: item.content?.trim() || '수정 모달에서 입력한 가이드북 상세 설명입니다.',
        imageUrl: item.imageUrl?.trim() || coverImageUrl,
      });
    });

    const insertRoutePoint = db.prepare(`
      INSERT INTO guidebook_route_points (guidebook_id, point_order, title, x, y)
      VALUES (@guidebookId, @pointOrder, @title, @x, @y)
    `);

    (routePoints && routePoints.length > 0 ? routePoints : [
      { pointOrder: 1, title: '포인트 1', x: 24, y: 32 },
      { pointOrder: 2, title: '포인트 2', x: 66, y: 58 },
    ]).forEach((point, index) => {
      insertRoutePoint.run({
        guidebookId,
        pointOrder: point.pointOrder ?? index + 1,
        title: point.title?.trim() || `포인트 ${index + 1}`,
        x: typeof point.x === 'number' ? point.x : 50,
        y: typeof point.y === 'number' ? point.y : 50,
      });
    });
  });

  transaction();

  const updatedGuidebook = getGuidebookById(guidebookId);
  const updatedBlocks = db.prepare(`
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

  response.json({ guidebook: updatedGuidebook, blocks: updatedBlocks });
});

app.delete('/api/guidebooks/:id', (request, response) => {
  const guidebookId = Number(request.params.id);

  if (!Number.isInteger(guidebookId)) {
    response.status(400).json({ message: 'Valid guidebook id is required.' });
    return;
  }

  const guidebook = db.prepare('SELECT id FROM guidebooks WHERE id = ?').get(guidebookId);

  if (!guidebook) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  const transaction = db.transaction(() => {
    db.prepare('DELETE FROM orders WHERE guidebook_id = ?').run(guidebookId);
    db.prepare('DELETE FROM custom_prints WHERE guidebook_id = ?').run(guidebookId);
    db.prepare('DELETE FROM print_cart_items WHERE guidebook_id = ?').run(guidebookId);
    db.prepare('DELETE FROM guidebooks WHERE id = ?').run(guidebookId);
  });

  transaction();
  response.status(204).send();
});

app.get('/api/orders', (_request, response) => {
  response.json(getOrderRows());
});

app.get('/api/orders/me', (request, response) => {
  const currentUser = getRequestUser(request);

  if (!currentUser) {
    response.status(401).json({ message: '로그인이 필요합니다.' });
    return;
  }

  response.json(getOrderRows().filter((order) => (
    typeof order === 'object'
      && order !== null
      && 'consumerId' in order
      && Number(order.consumerId) === currentUser.id
  )));
});

app.post('/api/orders', (request, response) => {
  const { consumerId, guidebookId, quantity, selectedLayoutType, shippingMemo, totalPrice } = request.body as {
    consumerId?: number;
    guidebookId?: number;
    quantity?: number;
    selectedLayoutType?: string;
    shippingMemo?: string;
    totalPrice?: number;
  };

  if (!consumerId || !guidebookId || !selectedLayoutType) {
    response.status(400).json({ message: 'consumerId, guidebookId, selectedLayoutType are required.' });
    return;
  }

  const normalizedQuantity = Math.max(1, quantity ?? 1);
  const guidebook = db.prepare('SELECT price FROM guidebooks WHERE id = ?').get(guidebookId) as { price: number } | undefined;

  if (!guidebook) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  const transaction = db.transaction(() => {
    const customPrint = db.prepare(`
      INSERT INTO custom_prints (consumer_id, guidebook_id, selected_layout_type)
      VALUES (?, ?, ?)
    `).run(consumerId, guidebookId, selectedLayoutType);

    const order = db.prepare(`
      INSERT INTO orders (consumer_id, guidebook_id, custom_print_id, quantity, total_price, status, shipping_memo)
      VALUES (?, ?, ?, ?, ?, 'pending', ?)
    `).run(
      consumerId,
      guidebookId,
      customPrint.lastInsertRowid,
      normalizedQuantity,
      totalPrice ?? guidebook.price * normalizedQuantity,
      shippingMemo ?? '',
    );

    db.prepare('UPDATE guidebooks SET print_count = print_count + ? WHERE id = ?').run(normalizedQuantity, guidebookId);
    return order.lastInsertRowid;
  });

  const orderId = transaction();
  const created = db.prepare(`
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
    WHERE orders.id = ?
  `).get(orderId);

  response.status(201).json(created);
});

app.patch('/api/orders/:id/status', (request, response) => {
  if (!requireAdminUser(request, response)) {
    return;
  }

  const { status } = request.body as { status?: string };

  if (!['pending', 'producing', 'shipping', 'completed'].includes(status ?? '')) {
    response.status(400).json({ message: 'Invalid status.' });
    return;
  }

  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, request.params.id);

  const updated = db.prepare(`
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
    WHERE orders.id = ?
  `).get(request.params.id);

  response.json(updated);
});

app.listen(port, () => {
  console.log(`TripStack API running on http://localhost:${port}`);
});
