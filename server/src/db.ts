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
      country TEXT NOT NULL DEFAULT '',
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

  const guidebookColumns = db.prepare('PRAGMA table_info(guidebooks)').all() as { name: string }[];

  if (!guidebookColumns.some((column) => column.name === 'country')) {
    db.prepare("ALTER TABLE guidebooks ADD COLUMN country TEXT NOT NULL DEFAULT ''").run();
  }

  db.exec(`
    DELETE FROM orders;
    DELETE FROM custom_prints;
    DELETE FROM guidebook_blocks;
    DELETE FROM guidebooks;
    DELETE FROM users;
    DELETE FROM sqlite_sequence WHERE name IN ('orders', 'custom_prints', 'guidebook_blocks', 'guidebooks', 'users');
  `);

  seedDatabase();
}

function seedDatabase() {
  const insertUser = db.prepare(`
    INSERT INTO users (username, role, bio, avatar_url, follower_count, trust_score)
    VALUES (@username, @role, @bio, @avatarUrl, @followerCount, @trustScore)
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
      role: 'creator',
    });
  });

  const consumerId = Number(insertUser.run({
    username: 'traveler.min',
    role: 'consumer',
    bio: '저장해둔 콘텐츠를 여행 전에 빠르게 다시 확인하는 사용자입니다.',
    avatarUrl: '',
    followerCount: 0,
    trustScore: 0,
  }).lastInsertRowid);

  const insertGuidebook = db.prepare(`
    INSERT INTO guidebooks (creator_id, title, country, region, cover_image_url, print_count)
    VALUES (@creatorId, @title, @country, @region, @coverImageUrl, @printCount)
  `);

  const guidebooks = [
    { creatorId: 1, title: '이탈리아 인생 여행지', country: '이탈리아', region: '로마', coverImageUrl: '/images/guidebooks/user1-1.jpeg', printCount: 1432000, blockCount: 4 },
    { creatorId: 2, title: '스위스 인터라켄에서 일어난 일', country: '스위스', region: '인터라켄', coverImageUrl: '/images/guidebooks/user2-1.jpeg', printCount: 928000, blockCount: 4 },
    { creatorId: 3, title: '오키나와 드라이브 코스', country: '일본', region: '오키나와', coverImageUrl: '/images/guidebooks/user3-1.jpeg', printCount: 814000, blockCount: 4 },
    { creatorId: 4, title: '태국 푸켓에서 수영하기', country: '태국', region: '푸켓', coverImageUrl: '/images/guidebooks/user4-1.jpeg', printCount: 672000, blockCount: 5 },
    { creatorId: 5, title: '사진으로 따라가는 사파리 여행', country: '마다가스카르', region: '안타나나리보', coverImageUrl: '/images/guidebooks/user5-1.jpeg', printCount: 534000, blockCount: 4 },
    { creatorId: 6, title: '스위스에서 기차여행', country: '스위스', region: '제네바', coverImageUrl: '/images/guidebooks/user6-1.jpeg', printCount: 421000, blockCount: 3 },
    { creatorId: 7, title: '여름 계곡 추천 서울근교', country: '대한민국', region: '강원도', coverImageUrl: '/images/guidebooks/user7-1.jpeg', printCount: 318000, blockCount: 4 },
    { creatorId: 8, title: '수박이와 가는 프랑스', country: '프랑스', region: '파리', coverImageUrl: '/images/guidebooks/user8-1.jpeg', printCount: 28700000, blockCount: 6 },
    { creatorId: 9, title: '캐나다 호수 vlog', country: '캐나다', region: '벤쿠버', coverImageUrl: '/images/guidebooks/user9-1.jpeg', printCount: 245000, blockCount: 6 },
    { creatorId: 10, title: '크리스마스를 즐기려면', country: '덴마크', region: '코펜하겐', coverImageUrl: '/images/guidebooks/user10-1.jpeg', printCount: 218000, blockCount: 6 },
    { creatorId: 11, title: '저장해두고 보는 오사카 여행', country: '일본', region: '오사카', coverImageUrl: '/images/guidebooks/user11-1.jpeg', printCount: 1960000, blockCount: 6 },
    { creatorId: 12, title: '아마존 추천 여행코스', country: '브라질', region: '아마존', coverImageUrl: '/images/guidebooks/user12-1.jpeg', printCount: 17200000, blockCount: 6 },
  ];

  const guidebookIds = guidebooks.map((guidebook) => {
    const { blockCount: _blockCount, ...guidebookRow } = guidebook;
    return Number(insertGuidebook.run(guidebookRow).lastInsertRowid);
  });

  const insertBlock = db.prepare(`
    INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
    VALUES (@guidebookId, @stepOrder, @placeName, @content, @imageUrl)
  `);

  guidebooks.forEach((guidebook, guidebookIndex) => {
    for (let stepOrder = 1; stepOrder <= guidebook.blockCount; stepOrder += 1) {
      insertBlock.run({
        guidebookId: guidebookIds[guidebookIndex],
        stepOrder,
        placeName: `${guidebook.title} #${stepOrder}`,
        content: '영상에서 눈에 띄는 장면을 캡처해 장소 분위기, 이동 순서, 다시 확인할 포인트를 한 장씩 정리했습니다.',
        imageUrl: `/images/guidebooks/user${guidebook.creatorId}-${stepOrder}.jpeg`,
      });
    }
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
    VALUES (@consumerId, @guidebookId, @customPrintId, 'processing', '저장한 콘텐츠를 종이 가이드북처럼 훑어보기 위한 데모 주문')
  `).run({
    consumerId,
    guidebookId: guidebookIds[0],
    customPrintId: customPrint.lastInsertRowid,
  });
}
