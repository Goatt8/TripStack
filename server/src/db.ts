import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const databasePath = process.env.DATABASE_PATH ?? '../data/tripstack.db';
mkdirSync(dirname(resolve(databasePath)), { recursive: true });
export const db = new Database(databasePath);

db.pragma('foreign_keys = ON');

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('creator', 'consumer')),
      bio TEXT NOT NULL DEFAULT '',
      avatar_url TEXT NOT NULL DEFAULT '',
      follower_count INTEGER NOT NULL DEFAULT 0,
      trust_score INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS guidebooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      creator_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      region TEXT NOT NULL,
      cover_image_url TEXT NOT NULL,
      print_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id)
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

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      consumer_id INTEGER NOT NULL,
      guidebook_id INTEGER NOT NULL,
      custom_print_id INTEGER,
      status TEXT NOT NULL CHECK(status IN ('pending', 'processing', 'completed')) DEFAULT 'pending',
      shipping_memo TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (consumer_id) REFERENCES users(id),
      FOREIGN KEY (guidebook_id) REFERENCES guidebooks(id),
      FOREIGN KEY (custom_print_id) REFERENCES custom_prints(id)
    );
  `);

  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get() as { count: number };
  if (userCount.count > 0) {
    return;
  }

  seedDatabase();
}

function seedDatabase() {
  const insertUser = db.prepare(`
    INSERT INTO users (username, role, bio, avatar_url, follower_count, trust_score)
    VALUES (@username, @role, @bio, @avatarUrl, @followerCount, @trustScore)
  `);

  insertUser.run({
    username: 'route.jin',
    role: 'creator',
    bio: '영상보다 오래 남는 동선 중심 여행 가이드북을 만듭니다.',
    avatarUrl: '/images/avatar-route.svg',
    followerCount: 184000,
    trustScore: 96,
  });
  insertUser.run({
    username: 'slow.jeju',
    role: 'creator',
    bio: '제주 소도시와 조용한 카페를 기록하는 로컬 큐레이터입니다.',
    avatarUrl: '/images/avatar-jeju.svg',
    followerCount: 92000,
    trustScore: 91,
  });
  insertUser.run({
    username: 'roma.note',
    role: 'creator',
    bio: '로마 골목과 미술관 동선을 하루 단위로 정리합니다.',
    avatarUrl: '/images/avatar-roma.svg',
    followerCount: 126000,
    trustScore: 94,
  });
  insertUser.run({
    username: 'traveler.min',
    role: 'consumer',
    bio: '주말 여행을 자주 떠나는 사용자입니다.',
    avatarUrl: '',
    followerCount: 0,
    trustScore: 0,
  });

  const insertGuidebook = db.prepare(`
    INSERT INTO guidebooks (creator_id, title, region, cover_image_url, print_count)
    VALUES (@creatorId, @title, @region, @coverImageUrl, @printCount)
  `);

  const guidebooks = [
    { creatorId: 1, title: '서울 성수 하루 동선', region: 'seoul', coverImageUrl: '/images/cover-seoul.svg', printCount: 1284 },
    { creatorId: 2, title: '제주 동쪽 조용한 카페 지도', region: 'jeju', coverImageUrl: '/images/cover-jeju.svg', printCount: 986 },
    { creatorId: 3, title: '로마 첫 방문자를 위한 2박 3일', region: 'roma', coverImageUrl: '/images/cover-roma.svg', printCount: 1432 },
    { creatorId: 1, title: '경주 야간 산책과 황리단길', region: 'gyeongju', coverImageUrl: '/images/cover-gyeongju.svg', printCount: 653 },
    { creatorId: 3, title: '방콕 루프탑과 시장 루트', region: 'bangkok', coverImageUrl: '/images/cover-bangkok.svg', printCount: 811 },
  ];

  guidebooks.forEach((guidebook) => insertGuidebook.run(guidebook));

  const insertBlock = db.prepare(`
    INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
    VALUES (@guidebookId, @stepOrder, @placeName, @content, @imageUrl)
  `);

  for (const guidebook of [1, 2, 3, 4, 5]) {
    insertBlock.run({ guidebookId: guidebook, stepOrder: 1, placeName: '첫 번째 스팟', content: '도착 직후 바로 이동하기 좋은 핵심 장소와 동선 팁을 정리했습니다.', imageUrl: '' });
    insertBlock.run({ guidebookId: guidebook, stepOrder: 2, placeName: '대표 카페/식당', content: '대기 시간, 추천 메뉴, 근처에서 함께 볼 장소를 짧게 기록했습니다.', imageUrl: '' });
    insertBlock.run({ guidebookId: guidebook, stepOrder: 3, placeName: '인쇄용 체크포인트', content: '종이 가이드북으로 들고 다닐 때 필요한 주소, 이동 순서, 한 줄 팁을 배치했습니다.', imageUrl: '' });
  }

  const customPrint = db.prepare(`
    INSERT INTO custom_prints (consumer_id, guidebook_id, selected_layout_type)
    VALUES (4, 3, 'photo-b5')
  `).run();

  db.prepare(`
    INSERT INTO orders (consumer_id, guidebook_id, custom_print_id, status, shipping_memo)
    VALUES (4, 3, @customPrintId, 'processing', '출국 전 확인용 샘플 주문')
  `).run({ customPrintId: customPrint.lastInsertRowid });
}
