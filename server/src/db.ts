import Database from 'better-sqlite3';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { randomBytes, scryptSync } from 'node:crypto';

function loadLocalEnvironment() {
  const envPath = resolve(process.cwd(), '../.env');

  if (!existsSync(envPath)) {
    return;
  }

  readFileSync(envPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .forEach((line) => {
      const separatorIndex = line.indexOf('=');
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
}

loadLocalEnvironment();

const databasePath = process.env.DATABASE_PATH ?? '../data/tripstack.db';
mkdirSync(dirname(resolve(databasePath)), { recursive: true });
export const db = new Database(databasePath);

db.pragma('foreign_keys = ON');

function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');

  return `${salt}:${hash}`;
}

const demoPasswordHash = createPasswordHash('tripstack1234');

function hasColumn(tableName: string, columnName: string) {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as { name: string }[];

  return columns.some((column) => column.name === columnName);
}

type SeedGuidebook = {
  creatorId: number;
  title: string;
  country: string;
  region: string;
  coverImageUrl: string;
  mapImageUrl: string;
  mapCenterLat: number;
  mapCenterLon: number;
  printCount: number;
  price: number;
  blockCount: number;
};

type SeedLocationPreset = {
  country: string;
  city: string;
  mapCenterLat: number;
  mapCenterLon: number;
  fallbackMapImageUrl: string;
  sortOrder: number;
};

const seedGuidebooks: SeedGuidebook[] = [
  { creatorId: 1, title: '이탈리아 인생 여행지', country: '이탈리아', region: '로마', coverImageUrl: '/images/guidebooks/user1-1.jpeg', mapImageUrl: '/images/map/로마-map.jpeg', mapCenterLat: 41.9028, mapCenterLon: 12.4964, printCount: 1432000, price: 1480, blockCount: 4 },
  { creatorId: 2, title: '스위스 인터라켄에서 일어난 일', country: '스위스', region: '인터라켄', coverImageUrl: '/images/guidebooks/user2-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 46.6863, mapCenterLon: 7.8632, printCount: 928000, price: 1500, blockCount: 4 },
  { creatorId: 3, title: '오키나와 드라이브 코스', country: '일본', region: '오키나와', coverImageUrl: '/images/guidebooks/user3-1.jpeg', mapImageUrl: '/images/map/오사카-map.jpeg', mapCenterLat: 26.2124, mapCenterLon: 127.6792, printCount: 814000, price: 1280, blockCount: 4 },
  { creatorId: 4, title: '태국 푸켓에서 수영하기', country: '태국', region: '푸켓', coverImageUrl: '/images/guidebooks/user4-1.jpeg', mapImageUrl: '/images/map/아마존-map.jpeg', mapCenterLat: 7.8804, mapCenterLon: 98.3923, printCount: 672000, price: 1280, blockCount: 5 },
  { creatorId: 5, title: '사진으로 따라가는 사파리 여행', country: '마다가스카르', region: '안타나나리보', coverImageUrl: '/images/guidebooks/user5-1.jpeg', mapImageUrl: '/images/map/아마존-map.jpeg', mapCenterLat: -18.8792, mapCenterLon: 47.5079, printCount: 5340, price: 16800, blockCount: 4 },
  { creatorId: 6, title: '스위스에서 기차여행', country: '스위스', region: '제네바', coverImageUrl: '/images/guidebooks/user6-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 46.2044, mapCenterLon: 6.1432, printCount: 421000, price: 1380, blockCount: 3 },
  { creatorId: 7, title: '여름 계곡 추천 서울근교', country: '대한민국', region: '강릉', coverImageUrl: '/images/guidebooks/user7-1.jpeg', mapImageUrl: '/images/map/오사카-map.jpeg', mapCenterLat: 37.7519, mapCenterLon: 128.8761, printCount: 318000, price: 2800, blockCount: 4 },
  { creatorId: 8, title: '수박이와 가는 프랑스', country: '프랑스', region: '파리', coverImageUrl: '/images/guidebooks/user8-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 48.8566, mapCenterLon: 2.3522, printCount: 28700000, price: 1280, blockCount: 6 },
  { creatorId: 9, title: '캐나다 호수 vlog', country: '캐나다', region: '밴쿠버', coverImageUrl: '/images/guidebooks/user9-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 49.2827, mapCenterLon: -123.1207, printCount: 245000, price: 1180, blockCount: 6 },
  { creatorId: 10, title: '크리스마스를 즐기려면', country: '덴마크', region: '코펜하겐', coverImageUrl: '/images/guidebooks/user10-1.jpeg', mapImageUrl: '/images/map/로마-map.jpeg', mapCenterLat: 55.6761, mapCenterLon: 12.5683, printCount: 218000, price: 1380, blockCount: 6 },
  { creatorId: 11, title: '저장해두고 보는 오사카 여행', country: '일본', region: '오사카', coverImageUrl: '/images/guidebooks/user11-1.jpeg', mapImageUrl: '/images/map/오사카-map.jpeg', mapCenterLat: 34.6937, mapCenterLon: 135.5023, printCount: 1960000, price: 1280, blockCount: 6 },
  { creatorId: 12, title: '아마존 추천 여행코스', country: '브라질', region: '마나우스', coverImageUrl: '/images/guidebooks/user12-1.jpeg', mapImageUrl: '/images/map/아마존-map.jpeg', mapCenterLat: -3.119, mapCenterLon: -60.0217, printCount: 17200000, price: 1680, blockCount: 6 },
];

export const seedLocationPresets: SeedLocationPreset[] = [
  // 포폴용 지원 도시 목록입니다. 필요한 도시만 이 배열에 추가하면 생성 모달에 노출됩니다.
  { country: '대한민국', city: '서울', mapCenterLat: 37.5665, mapCenterLon: 126.978, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 1 },
  { country: '대한민국', city: '부산', mapCenterLat: 35.1796, mapCenterLon: 129.0756, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 2 },
  { country: '대한민국', city: '제주', mapCenterLat: 33.4996, mapCenterLon: 126.5312, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 3 },
  { country: '대한민국', city: '강릉', mapCenterLat: 37.7519, mapCenterLon: 128.8761, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 4 },
  { country: '일본', city: '도쿄', mapCenterLat: 35.6762, mapCenterLon: 139.6503, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 1 },
  { country: '일본', city: '오사카', mapCenterLat: 34.6937, mapCenterLon: 135.5023, fallbackMapImageUrl: '/images/map/오사카-map.jpeg', sortOrder: 2 },
  { country: '일본', city: '교토', mapCenterLat: 35.0116, mapCenterLon: 135.7681, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 3 },
  { country: '일본', city: '오키나와', mapCenterLat: 26.2124, mapCenterLon: 127.6792, fallbackMapImageUrl: '/images/map/오사카-map.jpeg', sortOrder: 4 },
  { country: '프랑스', city: '파리', mapCenterLat: 48.8566, mapCenterLon: 2.3522, fallbackMapImageUrl: '/images/map/파리-map.jpeg', sortOrder: 1 },
  { country: '프랑스', city: '니스', mapCenterLat: 43.7102, mapCenterLon: 7.262, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 2 },
  { country: '프랑스', city: '리옹', mapCenterLat: 45.764, mapCenterLon: 4.8357, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 3 },
  { country: '이탈리아', city: '로마', mapCenterLat: 41.9028, mapCenterLon: 12.4964, fallbackMapImageUrl: '/images/map/로마-map.jpeg', sortOrder: 1 },
  { country: '이탈리아', city: '피렌체', mapCenterLat: 43.7696, mapCenterLon: 11.2558, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 2 },
  { country: '이탈리아', city: '베네치아', mapCenterLat: 45.4408, mapCenterLon: 12.3155, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 3 },
  { country: '스위스', city: '인터라켄', mapCenterLat: 46.6863, mapCenterLon: 7.8632, fallbackMapImageUrl: '/images/map/파리-map.jpeg', sortOrder: 1 },
  { country: '스위스', city: '제네바', mapCenterLat: 46.2044, mapCenterLon: 6.1432, fallbackMapImageUrl: '/images/map/파리-map.jpeg', sortOrder: 2 },
  { country: '브라질', city: '마나우스', mapCenterLat: -3.119, mapCenterLon: -60.0217, fallbackMapImageUrl: '/images/map/아마존-map.jpeg', sortOrder: 1 },
  { country: '브라질', city: '리우데자네이루', mapCenterLat: -22.9068, mapCenterLon: -43.1729, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 2 },
  { country: '캐나다', city: '밴쿠버', mapCenterLat: 49.2827, mapCenterLon: -123.1207, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 1 },
  { country: '태국', city: '푸켓', mapCenterLat: 7.8804, mapCenterLon: 98.3923, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 1 },
  { country: '덴마크', city: '코펜하겐', mapCenterLat: 55.6761, mapCenterLon: 12.5683, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 1 },
  { country: '마다가스카르', city: '안타나나리보', mapCenterLat: -18.8792, mapCenterLon: 47.5079, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 1 },
];

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login_id TEXT NOT NULL DEFAULT '',
      username TEXT NOT NULL,
      email TEXT NOT NULL DEFAULT '',
      password_hash TEXT NOT NULL DEFAULT '',
      display_name TEXT NOT NULL DEFAULT '',
      bio TEXT NOT NULL DEFAULT '',
      profile_image_url TEXT NOT NULL DEFAULT '',
      avatar_url TEXT NOT NULL DEFAULT '',
      follower_count INTEGER NOT NULL DEFAULT 0,
      is_admin INTEGER NOT NULL DEFAULT 0,
      trust_score INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS guidebooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      creator_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      country TEXT NOT NULL DEFAULT '',
      region TEXT NOT NULL,
      cover_image_url TEXT NOT NULL,
      map_image_url TEXT NOT NULL DEFAULT '',
      map_center_lat REAL,
      map_center_lon REAL,
      print_count INTEGER NOT NULL DEFAULT 0,
      price INTEGER NOT NULL DEFAULT 12800,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS location_presets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      city TEXT NOT NULL,
      map_center_lat REAL NOT NULL,
      map_center_lon REAL NOT NULL,
      fallback_map_image_url TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      UNIQUE(country, city)
    );

    CREATE TABLE IF NOT EXISTS guidebook_route_points (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guidebook_id INTEGER NOT NULL,
      point_order INTEGER NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      x REAL NOT NULL,
      y REAL NOT NULL,
      FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS guidebook_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guidebook_id INTEGER NOT NULL,
      step_order INTEGER NOT NULL,
      place_name TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT NOT NULL,
      FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS custom_prints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      consumer_id INTEGER NOT NULL,
      guidebook_id INTEGER NOT NULL,
      selected_layout_type TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (consumer_id) REFERENCES users(id),
      FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id)
    );

    CREATE TABLE IF NOT EXISTS print_cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      guidebook_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, guidebook_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      consumer_id INTEGER NOT NULL,
      guidebook_id INTEGER NOT NULL,
      custom_print_id INTEGER,
      quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
      total_price INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL CHECK(status IN ('pending', 'producing', 'shipping', 'completed')) DEFAULT 'pending',
      shipping_memo TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (consumer_id) REFERENCES users(id),
      FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id),
      FOREIGN KEY (custom_print_id) REFERENCES custom_prints(id)
    );
  `);

  const userColumns = db.prepare('PRAGMA table_info(users)').all() as { name: string }[];

  if (!userColumns.some((column) => column.name === 'login_id')) {
    db.prepare("ALTER TABLE users ADD COLUMN login_id TEXT NOT NULL DEFAULT ''").run();
  }

  if (!userColumns.some((column) => column.name === 'email')) {
    db.prepare("ALTER TABLE users ADD COLUMN email TEXT NOT NULL DEFAULT ''").run();
  }

  if (!userColumns.some((column) => column.name === 'password_hash')) {
    db.prepare("ALTER TABLE users ADD COLUMN password_hash TEXT NOT NULL DEFAULT ''").run();
  }

  if (!userColumns.some((column) => column.name === 'display_name')) {
    db.prepare("ALTER TABLE users ADD COLUMN display_name TEXT NOT NULL DEFAULT ''").run();
  }

  if (!userColumns.some((column) => column.name === 'profile_image_url')) {
    db.prepare("ALTER TABLE users ADD COLUMN profile_image_url TEXT NOT NULL DEFAULT ''").run();
  }

  if (!userColumns.some((column) => column.name === 'updated_at')) {
    db.prepare("ALTER TABLE users ADD COLUMN updated_at TEXT NOT NULL DEFAULT ''").run();
  }

  if (!userColumns.some((column) => column.name === 'is_admin')) {
    db.prepare("ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0").run();
  }

  db.prepare(`
    UPDATE users
    SET login_id = CASE WHEN login_id = '' THEN username ELSE login_id END,
        email = CASE WHEN email = '' THEN lower(replace(username, ' ', '')) || '@tripstack.local' ELSE email END,
        password_hash = CASE WHEN password_hash = '' THEN @passwordHash ELSE password_hash END,
        display_name = CASE WHEN display_name = '' THEN username ELSE display_name END,
        profile_image_url = CASE WHEN profile_image_url = '' THEN avatar_url ELSE profile_image_url END,
        is_admin = CASE WHEN username = '수박이' THEN 0 ELSE is_admin END,
        updated_at = CASE WHEN updated_at = '' THEN created_at ELSE updated_at END
  `).run({ passwordHash: demoPasswordHash });

  const guidebookColumns = db.prepare('PRAGMA table_info(guidebooks)').all() as { name: string }[];

  if (!guidebookColumns.some((column) => column.name === 'country')) {
    db.prepare("ALTER TABLE guidebooks ADD COLUMN country TEXT NOT NULL DEFAULT ''").run();
  }

  if (!guidebookColumns.some((column) => column.name === 'map_image_url')) {
    db.prepare("ALTER TABLE guidebooks ADD COLUMN map_image_url TEXT NOT NULL DEFAULT ''").run();
  }

  if (!guidebookColumns.some((column) => column.name === 'map_center_lat')) {
    db.prepare('ALTER TABLE guidebooks ADD COLUMN map_center_lat REAL').run();
  }

  if (!guidebookColumns.some((column) => column.name === 'map_center_lon')) {
    db.prepare('ALTER TABLE guidebooks ADD COLUMN map_center_lon REAL').run();
  }

  if (!guidebookColumns.some((column) => column.name === 'price')) {
    db.prepare('ALTER TABLE guidebooks ADD COLUMN price INTEGER NOT NULL DEFAULT 12800').run();
  }

  const orderColumns = db.prepare('PRAGMA table_info(orders)').all() as { name: string }[];

  if (!orderColumns.some((column) => column.name === 'quantity')) {
    db.prepare('ALTER TABLE orders ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1').run();
  }

  if (!orderColumns.some((column) => column.name === 'total_price')) {
    db.prepare('ALTER TABLE orders ADD COLUMN total_price INTEGER NOT NULL DEFAULT 0').run();
  }

  migrateOrderStatusConstraint();

  seedGuidebookMetadata();
  seedLocationPresetData();

  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get() as { count: number };

  if (userCount.count === 0) {
    seedDatabase();
  }

  seedDemoSalesOrders();
}

function seedLocationPresetData() {
  const upsertLocationPreset = db.prepare(`
    INSERT INTO location_presets (
      country,
      city,
      map_center_lat,
      map_center_lon,
      fallback_map_image_url,
      sort_order
    )
    VALUES (
      @country,
      @city,
      @mapCenterLat,
      @mapCenterLon,
      @fallbackMapImageUrl,
      @sortOrder
    )
    ON CONFLICT(country, city) DO UPDATE SET
      map_center_lat = excluded.map_center_lat,
      map_center_lon = excluded.map_center_lon,
      fallback_map_image_url = excluded.fallback_map_image_url,
      sort_order = excluded.sort_order
  `);

  seedLocationPresets.forEach((locationPreset) => {
    upsertLocationPreset.run(locationPreset);
  });
}

function seedGuidebookMetadata() {
  const updateGuidebook = db.prepare(`
    UPDATE guidebooks
    SET country = @country,
        region = @region,
        price = @price,
        map_center_lat = @mapCenterLat,
        map_center_lon = @mapCenterLon
    WHERE title = @title
  `);

  seedGuidebooks.forEach(({ country, mapCenterLat, mapCenterLon, price, region, title }) => {
    updateGuidebook.run({ country, mapCenterLat, mapCenterLon, price, region, title });
  });
}

function migrateOrderStatusConstraint() {
  const ordersTable = db.prepare(`
    SELECT sql
    FROM sqlite_master
    WHERE type = 'table'
      AND name = 'orders'
  `).get() as { sql: string } | undefined;

  if (!ordersTable || ordersTable.sql.includes("'producing'")) {
    return;
  }

  db.exec(`
    PRAGMA foreign_keys = OFF;

    CREATE TABLE orders_next (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      consumer_id INTEGER NOT NULL,
      guidebook_id INTEGER NOT NULL,
      custom_print_id INTEGER,
      quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
      total_price INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL CHECK(status IN ('pending', 'producing', 'shipping', 'completed')) DEFAULT 'pending',
      shipping_memo TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (consumer_id) REFERENCES users(id),
      FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id),
      FOREIGN KEY (custom_print_id) REFERENCES custom_prints(id)
    );

    INSERT INTO orders_next (
      id,
      consumer_id,
      guidebook_id,
      custom_print_id,
      quantity,
      total_price,
      status,
      shipping_memo,
      created_at
    )
    SELECT
      id,
      consumer_id,
      guidebook_id,
      custom_print_id,
      quantity,
      total_price,
      CASE WHEN status = 'processing' THEN 'producing' ELSE status END,
      shipping_memo,
      created_at
    FROM orders;

    DROP TABLE orders;
    ALTER TABLE orders_next RENAME TO orders;

    PRAGMA foreign_keys = ON;
  `);
}

function seedDemoSalesOrders() {
  const guidebook = db.prepare(`
    SELECT id, price
    FROM guidebooks
    WHERE creator_id = 8
      AND title = '수박이와 가는 프랑스'
  `).get() as { id: number; price: number } | undefined;

  if (!guidebook) {
    return;
  }

  const consumerSeeds = [
    { username: 'traveler.min', quantity: 2, status: 'pending', memo: 'demo-sales-order-1' },
    { username: 'slow.route', quantity: 1, status: 'producing', memo: 'demo-sales-order-2' },
    { username: 'paper.user', quantity: 4, status: 'completed', memo: 'demo-sales-order-3' },
  ];

  const findUser = db.prepare('SELECT id FROM users WHERE username = ?');
  const insertUser = hasColumn('users', 'role')
    ? db.prepare(`
      INSERT INTO users (login_id, username, role, email, password_hash, display_name, bio, profile_image_url, avatar_url, follower_count, is_admin, trust_score)
      VALUES (@username, @username, 'consumer', @email, @passwordHash, @username, 'TripStack 인쇄 주문 데모 사용자입니다.', '', '', 0, 0, 0)
    `)
    : db.prepare(`
      INSERT INTO users (login_id, username, email, password_hash, display_name, bio, profile_image_url, avatar_url, follower_count, is_admin, trust_score)
      VALUES (@username, @username, @email, @passwordHash, @username, 'TripStack 인쇄 주문 데모 사용자입니다.', '', '', 0, 0, 0)
    `);
  const findOrder = db.prepare('SELECT id FROM orders WHERE shipping_memo = ?');
  const insertCustomPrint = db.prepare(`
    INSERT INTO custom_prints (consumer_id, guidebook_id, selected_layout_type)
    VALUES (@consumerId, @guidebookId, '기본 인쇄형')
  `);
  const insertOrder = db.prepare(`
    INSERT INTO orders (consumer_id, guidebook_id, custom_print_id, quantity, total_price, status, shipping_memo)
    VALUES (@consumerId, @guidebookId, @customPrintId, @quantity, @totalPrice, @status, @shippingMemo)
  `);

  consumerSeeds.forEach((seed) => {
    if (findOrder.get(seed.memo)) {
      return;
    }

    const existingUser = findUser.get(seed.username) as { id: number } | undefined;
    const consumerId = existingUser?.id ?? Number(insertUser.run({
      email: `${seed.username}@tripstack.local`,
      passwordHash: demoPasswordHash,
      username: seed.username,
    }).lastInsertRowid);
    const customPrint = insertCustomPrint.run({ consumerId, guidebookId: guidebook.id });

    insertOrder.run({
      consumerId,
      customPrintId: customPrint.lastInsertRowid,
      guidebookId: guidebook.id,
      quantity: seed.quantity,
      shippingMemo: seed.memo,
      status: seed.status,
      totalPrice: guidebook.price * seed.quantity,
    });
  });
}

function seedDatabase() {
  const insertUser = hasColumn('users', 'role')
    ? db.prepare(`
      INSERT INTO users (login_id, username, role, email, password_hash, display_name, bio, profile_image_url, avatar_url, follower_count, is_admin, trust_score)
      VALUES (@loginId, @username, @role, @email, @passwordHash, @username, @bio, @avatarUrl, @avatarUrl, @followerCount, @isAdmin, @trustScore)
    `)
    : db.prepare(`
      INSERT INTO users (login_id, username, email, password_hash, display_name, bio, profile_image_url, avatar_url, follower_count, is_admin, trust_score)
      VALUES (@loginId, @username, @email, @passwordHash, @username, @bio, @avatarUrl, @avatarUrl, @followerCount, @isAdmin, @trustScore)
    `);

  const creators = [
    {
      username: 'normadTraveler',
      bio: '감도 높은 공간과 일상 동선을 영상에서 가이드북으로 정리합니다.',
      avatarUrl: '/images/users/user1.jpeg',
      followerCount: 184000,
      trustScore: 96,
    },
    {
      username: '트래블리',
      bio: '카페, 식당, 머무는 장소를 짧고 선명한 큐레이션으로 기록합니다.',
      avatarUrl: '/images/users/user2.jpeg',
      followerCount: 163000,
      trustScore: 94,
    },
    {
      username: '섭튜브',
      bio: '도시 산책 중 발견한 장면과 루트를 콘텐츠형 가이드로 만듭니다.',
      avatarUrl: '/images/users/user3.jpeg',
      followerCount: 128000,
      trustScore: 92,
    },
    {
      username: 'officialTravler',
      bio: '숙소와 주변 동선을 한 번에 훑을 수 있는 스택을 만듭니다.',
      avatarUrl: '/images/users/user4.jpeg',
      followerCount: 118000,
      trustScore: 91,
    },
    {
      username: 'Lee튜브',
      bio: '사진 분위기와 이동 순서를 함께 보는 감성 여행 기록자입니다.',
      avatarUrl: '/images/users/user5.jpeg',
      followerCount: 970000,
      trustScore: 90,
    },
    {
      username: 'matthew',
      bio: '짧은 영상 속 장소 정보를 저장하기 쉬운 카드형 가이드로 바꿉니다.',
      avatarUrl: '/images/users/user6.jpeg',
      followerCount: 860000,
      trustScore: 88,
    },
    {
      username: '기묘한 여행',
      bio: '주말에 바로 따라가기 좋은 코스와 체크포인트를 큐레이션합니다.',
      avatarUrl: '/images/users/user7.jpeg',
      followerCount: 740000,
      trustScore: 87,
    },
    {
      username: '수박이',
      bio: '일상 속 장면을 오래 저장할 수 있는 라이프스타일 가이드로 엮습니다.',
      avatarUrl: '/images/users/user8.jpeg',
      followerCount: 9200000,
      trustScore: 86,
    },
    {
      username: '여행가 솔',
      bio: '편안한 장소, 조명, 소품이 만드는 분위기를 세밀하게 기록합니다.',
      avatarUrl: '/images/users/user9.jpeg',
      followerCount: 620000,
      trustScore: 85,
    },
    {
      username: 'dailyRoad',
      bio: '반복해서 보고 싶은 영상 장면을 주제별 스택으로 정리합니다.',
      avatarUrl: '/images/users/user10.jpeg',
      followerCount: 580000,
      trustScore: 84,
    },
    {
      username: '백수 냥',
      bio: '여행 전 저장해두기 좋은 장소와 이동 동선을 짧은 스택으로 정리합니다.',
      avatarUrl: '/images/users/user11.jpeg',
      followerCount: 1120000,
      trustScore: 83,
    },
    {
      username: '호돌과 나',
      bio: '천천히 둘러보기 좋은 자연, 카페, 숙소 장면을 가이드북으로 엮습니다.',
      avatarUrl: '/images/users/user12.jpeg',
      followerCount: 2304000,
      trustScore: 82,
    },
  ];

  creators.forEach((creator) => {
    insertUser.run({
      ...creator,
      email: `${creator.username.replace(/\s/g, '').toLowerCase()}@tripstack.local`,
      loginId: creator.username,
      passwordHash: demoPasswordHash,
      role: 'creator',
      isAdmin: 0,
    });
  });

  const consumerId = Number(insertUser.run({
    username: 'traveler.min',
    email: 'traveler.min@tripstack.local',
    loginId: 'traveler.min',
    passwordHash: demoPasswordHash,
    role: 'consumer',
    bio: '저장해둔 콘텐츠를 여행 전에 빠르게 다시 확인하는 사용자입니다.',
    avatarUrl: '',
    followerCount: 0,
    trustScore: 0,
  }).lastInsertRowid);

  const insertGuidebook = db.prepare(`
    INSERT INTO guidebooks (creator_id, title, country, region, cover_image_url, map_image_url, map_center_lat, map_center_lon, print_count, price)
    VALUES (@creatorId, @title, @country, @region, @coverImageUrl, @mapImageUrl, @mapCenterLat, @mapCenterLon, @printCount, @price)
  `);

  const guidebookIds = seedGuidebooks.map((guidebook) => {
    const { blockCount: _blockCount, ...guidebookRow } = guidebook;
    return Number(insertGuidebook.run(guidebookRow).lastInsertRowid);
  });

  const insertBlock = db.prepare(`
    INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
    VALUES (@guidebookId, @stepOrder, @placeName, @content, @imageUrl)
  `);

  const insertRoutePoint = db.prepare(`
    INSERT INTO guidebook_route_points (guidebook_id, point_order, title, x, y)
    VALUES (@guidebookId, @pointOrder, @title, @x, @y)
  `);

  seedGuidebooks.forEach((guidebook, guidebookIndex) => {
    for (let stepOrder = 1; stepOrder <= guidebook.blockCount; stepOrder += 1) {
      insertBlock.run({
        guidebookId: guidebookIds[guidebookIndex],
        stepOrder,
        placeName: `${guidebook.title} #${stepOrder}`,
        content: '이 여행지는 현지의 분위기를 가장 잘 느낄 수 있는 대표적인 여행 스팟입니다. 주변 골목과 상점도 함께 둘러보며 여유롭게 이동하는 것을 추천합니다. 방문 시간에 따라 풍경이 달라지므로 오전과 해 질 무렵 모두 색다른 매력을 경험할 수 있습니다.',
        imageUrl: `/images/guidebooks/user${guidebook.creatorId}-${stepOrder}.jpeg`,
      });
    }

    [
      { title: `${guidebook.region} 시작점`, x: 22, y: 32 },
      { title: '대표 명소', x: 42, y: 24 },
      { title: '식당/카페', x: 58, y: 46 },
      { title: '이동 포인트', x: 35, y: 66 },
      { title: '마무리 지점', x: 72, y: 62 },
    ].forEach((point, pointIndex) => {
      insertRoutePoint.run({
        guidebookId: guidebookIds[guidebookIndex],
        pointOrder: pointIndex + 1,
        ...point,
      });
    });
  });

  const customPrint = db.prepare(`
    INSERT INTO custom_prints (consumer_id, guidebook_id, selected_layout_type)
    VALUES (@consumerId, @guidebookId, 'photo-b5')
  `).run({
    consumerId,
    guidebookId: guidebookIds[0],
  });

  db.prepare(`
    INSERT INTO orders (consumer_id, guidebook_id, custom_print_id, status, shipping_memo)
    VALUES (@consumerId, @guidebookId, @customPrintId, 'producing', '저장한 콘텐츠를 종이 가이드북처럼 훑어보기 위한 데모 주문')
  `).run({
    consumerId,
    guidebookId: guidebookIds[0],
    customPrintId: customPrint.lastInsertRowid,
  });
}
