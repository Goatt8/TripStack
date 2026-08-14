import cors from 'cors';
import express, { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { initializeDatabase } from './db.js';
import {
  createGuidebook,
  deleteGuidebookWithDependencies,
  findGuidebookOwner,
  getGuidebookBlocks,
  getGuidebookById,
  getGuidebookRows,
  updateGuidebook,
} from './repositories/guidebookRepository.js';
import {
  createPrintOrder,
  getOrderRows,
  updateOrderStatus,
} from './repositories/orderRepository.js';
import { getLocationCities } from './repositories/locationRepository.js';
import {
  clearPrintCart,
  deletePrintCartItem,
  findGuidebookForPrintCart,
  getPrintCartItems,
  updatePrintCartItemQuantity,
  upsertPrintCartItem,
} from './repositories/printCartRepository.js';
import {
  createUser,
  deleteUserById,
  findExistingUserByLoginIdOrEmail,
  findUserById,
  findUserByLoginIdWithPassword,
  findUserIdByEmailExcept,
  findUserPasswordHashById,
  getUserDependencyCount,
  getUserRows,
  serializeUser,
  updateAdminUser,
  updateUserAccount,
  updateUserProfile,
} from './repositories/userRepository.js';

initializeDatabase();

type GeoapifyGeocodeResponse = {
  results?: Array<{
    lat?: number;
    lon?: number;
    result_type?: string;
  }>;
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
const orderStatuses = ['pending', 'producing', 'shipping', 'completed'] as const;

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

  const user = findUserById(userId);

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

function requireAuthUser(request: Request, response: Response) {
  const currentUser = getRequestUser(request);

  if (!currentUser) {
    response.status(401).json({ message: '로그인이 필요합니다.' });
    return null;
  }

  return currentUser;
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

  response.json(getLocationCities(country));
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

  const existingUser = findExistingUserByLoginIdOrEmail(normalizedLoginId, normalizedEmail);

  if (existingUser) {
    response.status(409).json({ message: '이미 사용 중인 아이디 또는 이메일입니다.' });
    return;
  }

  if (normalizedAdminCode && normalizedAdminCode !== adminSignupCode) {
    response.status(403).json({ message: '관리자 코드가 일치하지 않습니다.' });
    return;
  }

  const isAdmin = normalizedAdminCode === adminSignupCode ? 1 : 0;

  const userId = createUser({
    displayName: normalizedDisplayName,
    email: normalizedEmail,
    loginId: normalizedLoginId,
    passwordHash: createPasswordHash(password),
    profileImageUrl: profileImageUrl?.trim() || '',
    isAdmin,
  });

  const user = findUserById(userId);

  if (!user) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

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

  const user = findUserByLoginIdWithPassword(normalizedLoginId);

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

app.patch('/api/users/me/profile', (request, response) => {
  const currentUser = requireAuthUser(request, response);
  const { displayName, profileImageUrl } = request.body as {
    displayName?: string;
    profileImageUrl?: string;
  };

  const normalizedDisplayName = displayName?.trim();

  if (!currentUser) {
    return;
  }

  if (!normalizedDisplayName) {
    response.status(400).json({ message: 'displayName is required.' });
    return;
  }

  const changes = updateUserProfile(currentUser.id, normalizedDisplayName, profileImageUrl?.trim() || '');

  if (changes === 0) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  const user = findUserById(currentUser.id);

  if (!user) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  response.json(serializeUser(user));
});

app.patch('/api/users/me/account', (request, response) => {
  const authUser = requireAuthUser(request, response);
  const { currentPassword, email, newPassword } = request.body as {
    currentPassword?: string;
    email?: string;
    newPassword?: string;
  };

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedNewPassword = newPassword?.trim();

  if (!authUser) {
    return;
  }

  if (!normalizedEmail) {
    response.status(400).json({ message: 'email is required.' });
    return;
  }

  const currentUser = findUserPasswordHashById(authUser.id);

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

  const existingEmailOwner = findUserIdByEmailExcept(normalizedEmail, authUser.id);

  if (existingEmailOwner) {
    response.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
    return;
  }

  updateUserAccount(
    authUser.id,
    normalizedEmail,
    normalizedNewPassword ? createPasswordHash(normalizedNewPassword) : null,
  );

  const user = findUserById(authUser.id);

  if (!user) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

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

  const existingEmailOwner = findUserIdByEmailExcept(normalizedEmail, userId);

  if (existingEmailOwner) {
    response.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
    return;
  }

  const changes = updateAdminUser({
    displayName: normalizedDisplayName,
    email: normalizedEmail,
    isAdmin,
    profileImageUrl: profileImageUrl?.trim() || '',
    userId,
  });

  if (changes === 0) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  const user = findUserById(userId);

  if (!user) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

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

  const dependencyCount = getUserDependencyCount(userId);

  if (dependencyCount > 0) {
    response.status(409).json({ message: '연결된 가이드북 또는 주문이 있는 계정은 삭제할 수 없습니다.' });
    return;
  }

  const changes = deleteUserById(userId);

  if (changes === 0) {
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
  response.json(getGuidebookBlocks(request.params.id));
});

app.get('/api/print-cart', (request, response) => {
  const currentUser = requireAuthUser(request, response);

  if (!currentUser) {
    return;
  }

  response.json(getPrintCartItems(currentUser.id));
});

app.delete('/api/print-cart', (request, response) => {
  const currentUser = requireAuthUser(request, response);

  if (!currentUser) {
    return;
  }

  clearPrintCart(currentUser.id);
  response.status(204).send();
});

app.post('/api/print-cart', (request, response) => {
  const currentUser = requireAuthUser(request, response);
  const { guidebookId, quantity } = request.body as {
    guidebookId?: number;
    quantity?: number;
  };

  if (!currentUser) {
    return;
  }

  if (!guidebookId) {
    response.status(400).json({ message: 'guidebookId is required.' });
    return;
  }

  const guidebook = findGuidebookForPrintCart(guidebookId);

  if (!guidebook) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  upsertPrintCartItem(currentUser.id, guidebookId, Math.max(1, quantity ?? 1));

  response.status(201).json(getPrintCartItems(currentUser.id).find((item) => item.guidebookId === guidebookId));
});

app.patch('/api/print-cart/:guidebookId', (request, response) => {
  const currentUser = requireAuthUser(request, response);
  const guidebookId = Number(request.params.guidebookId);
  const { quantity } = request.body as { quantity?: number };

  if (!currentUser) {
    return;
  }

  if (!Number.isInteger(guidebookId) || !quantity || quantity < 1) {
    response.status(400).json({ message: 'guidebookId and positive quantity are required.' });
    return;
  }

  updatePrintCartItemQuantity(currentUser.id, guidebookId, quantity);

  const updated = getPrintCartItems(currentUser.id).find((item) => item.guidebookId === guidebookId);

  if (!updated) {
    response.status(404).json({ message: 'Print cart item not found.' });
    return;
  }

  response.json(updated);
});

app.delete('/api/print-cart/:guidebookId', (request, response) => {
  const currentUser = requireAuthUser(request, response);
  const guidebookId = Number(request.params.guidebookId);

  if (!currentUser) {
    return;
  }

  if (!Number.isInteger(guidebookId)) {
    response.status(400).json({ message: 'guidebookId is required.' });
    return;
  }

  deletePrintCartItem(currentUser.id, guidebookId);

  response.status(204).send();
});

app.post('/api/guidebooks', (request, response) => {
  const currentUser = requireAuthUser(request, response);
  const {
    block,
    blocks,
    country,
    coverImageUrl,
    mapImageUrl,
    mapCenterLat,
    mapCenterLon,
    region,
    routePoints,
    title,
  } = request.body as CreateGuidebookBody;

  if (!currentUser) {
    return;
  }

  if (!title || !country || !region || !coverImageUrl || !mapImageUrl) {
    response.status(400).json({
      message: 'title, country, region, coverImageUrl, mapImageUrl are required.',
    });
    return;
  }

  const guidebookId = createGuidebook({
    block,
    blocks,
    country,
    coverImageUrl,
    creatorId: currentUser.id,
    mapImageUrl,
    mapCenterLat,
    mapCenterLon,
    region,
    routePoints,
    title,
  });
  const guidebook = getGuidebookById(guidebookId);
  const createdBlocks = getGuidebookBlocks(guidebookId);

  response.status(201).json({ guidebook, blocks: createdBlocks });
});

app.patch('/api/guidebooks/:id', (request, response) => {
  const currentUser = requireAuthUser(request, response);
  const guidebookId = Number(request.params.id);
  const {
    blocks,
    country,
    coverImageUrl,
    mapImageUrl,
    mapCenterLat,
    mapCenterLon,
    region,
    routePoints,
    title,
  } = request.body as CreateGuidebookBody;

  if (!currentUser) {
    return;
  }

  if (!Number.isInteger(guidebookId)) {
    response.status(400).json({ message: 'Valid guidebook id is required.' });
    return;
  }

  if (!title || !country || !region || !coverImageUrl || !mapImageUrl) {
    response.status(400).json({
      message: 'title, country, region, coverImageUrl, mapImageUrl are required.',
    });
    return;
  }

  const guidebook = findGuidebookOwner(guidebookId);

  if (!guidebook) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  if (guidebook.creatorId !== currentUser.id) {
    response.status(403).json({ message: 'Only the guidebook creator can update this guidebook.' });
    return;
  }

  updateGuidebook({
    blocks,
    country,
    coverImageUrl,
    guidebookId,
    mapImageUrl,
    mapCenterLat,
    mapCenterLon,
    region,
    routePoints,
    title,
  });

  const updatedGuidebook = getGuidebookById(guidebookId);
  const updatedBlocks = getGuidebookBlocks(guidebookId);

  response.json({ guidebook: updatedGuidebook, blocks: updatedBlocks });
});

app.delete('/api/guidebooks/:id', (request, response) => {
  const currentUser = requireAuthUser(request, response);
  const guidebookId = Number(request.params.id);

  if (!currentUser) {
    return;
  }

  if (!Number.isInteger(guidebookId)) {
    response.status(400).json({ message: 'Valid guidebook id is required.' });
    return;
  }

  const guidebook = findGuidebookOwner(guidebookId);

  if (!guidebook) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  if (guidebook.creatorId !== currentUser.id) {
    response.status(403).json({ message: 'Only the guidebook creator can delete this guidebook.' });
    return;
  }

  deleteGuidebookWithDependencies(guidebookId);
  response.status(204).send();
});

app.get('/api/orders', (request, response) => {
  const currentUser = requireAuthUser(request, response);

  if (!currentUser) {
    return;
  }

  const orders = getOrderRows().filter((order) => (
    typeof order === 'object'
      && order !== null
      && 'creatorId' in order
      && Number(order.creatorId) === currentUser.id
  ));

  response.json(orders);
});

app.get('/api/orders/me', (request, response) => {
  const currentUser = requireAuthUser(request, response);

  if (!currentUser) {
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
  const currentUser = requireAuthUser(request, response);
  const { guidebookId, quantity, selectedLayoutType, shippingMemo } = request.body as {
    guidebookId?: number;
    quantity?: number;
    selectedLayoutType?: string;
    shippingMemo?: string;
  };

  if (!currentUser) {
    return;
  }

  if (!guidebookId || !selectedLayoutType) {
    response.status(400).json({ message: 'guidebookId and selectedLayoutType are required.' });
    return;
  }

  const created = createPrintOrder({
    consumerId: currentUser.id,
    guidebookId,
    quantity: Math.max(1, quantity ?? 1),
    selectedLayoutType,
    shippingMemo: shippingMemo ?? '',
  });

  if (!created) {
    response.status(404).json({ message: 'Guidebook not found.' });
    return;
  }

  response.status(201).json(created);
});

app.patch('/api/orders/:id/status', (request, response) => {
  if (!requireAdminUser(request, response)) {
    return;
  }

  const { status } = request.body as { status?: string };
  const nextStatus = orderStatuses.find((orderStatus) => orderStatus === status);

  if (!nextStatus) {
    response.status(400).json({ message: 'Invalid status.' });
    return;
  }

  const updated = updateOrderStatus(Number(request.params.id), nextStatus);

  response.json(updated);
});

app.listen(port, () => {
  console.log(`TripStack API running on http://localhost:${port}`);
});
