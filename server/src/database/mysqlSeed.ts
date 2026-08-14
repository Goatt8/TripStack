import { randomBytes, scryptSync } from 'node:crypto';
import type { Pool, RowDataPacket } from 'mysql2/promise';

type SeedUser = {
  id: number;
  username: string;
  bio: string;
  avatarUrl: string;
  followerCount: number;
  trustScore: number;
};

type SeedGuidebook = {
  id: number;
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

const seedUsers: SeedUser[] = [
  { id: 1, username: 'normadTraveler', bio: '감도 높은 공간과 일상 동선을 영상에서 가이드북으로 정리합니다.', avatarUrl: '/images/users/user1.jpeg', followerCount: 184000, trustScore: 96 },
  { id: 2, username: '트래블리', bio: '카페, 식당, 머무는 장소를 짧고 선명한 큐레이션으로 기록합니다.', avatarUrl: '/images/users/user2.jpeg', followerCount: 163000, trustScore: 94 },
  { id: 3, username: '섭튜브', bio: '도시 산책 중 발견한 장면과 루트를 콘텐츠형 가이드로 만듭니다.', avatarUrl: '/images/users/user3.jpeg', followerCount: 128000, trustScore: 92 },
  { id: 4, username: 'officialTravler', bio: '숙소와 주변 동선을 한 번에 훑을 수 있는 스택을 만듭니다.', avatarUrl: '/images/users/user4.jpeg', followerCount: 118000, trustScore: 91 },
  { id: 5, username: 'Lee튜브', bio: '사진 분위기와 이동 순서를 함께 보는 감성 여행 기록자입니다.', avatarUrl: '/images/users/user5.jpeg', followerCount: 970000, trustScore: 90 },
  { id: 6, username: 'matthew', bio: '짧은 영상 속 장소 정보를 저장하기 쉬운 카드형 가이드로 바꿉니다.', avatarUrl: '/images/users/user6.jpeg', followerCount: 860000, trustScore: 88 },
  { id: 7, username: '기묘한 여행', bio: '주말에 바로 따라가기 좋은 코스와 체크포인트를 큐레이션합니다.', avatarUrl: '/images/users/user7.jpeg', followerCount: 740000, trustScore: 87 },
  { id: 8, username: '수박이', bio: '일상 속 장면을 오래 저장할 수 있는 라이프스타일 가이드로 엮습니다.', avatarUrl: '/images/users/user8.jpeg', followerCount: 9200000, trustScore: 86 },
  { id: 9, username: '여행가 솔', bio: '편안한 장소, 조명, 소품이 만드는 분위기를 세밀하게 기록합니다.', avatarUrl: '/images/users/user9.jpeg', followerCount: 620000, trustScore: 85 },
  { id: 10, username: 'dailyRoad', bio: '반복해서 보고 싶은 영상 장면을 주제별 스택으로 정리합니다.', avatarUrl: '/images/users/user10.jpeg', followerCount: 580000, trustScore: 84 },
  { id: 11, username: '백수 냥', bio: '여행 전 저장해두기 좋은 장소와 이동 동선을 짧은 스택으로 정리합니다.', avatarUrl: '/images/users/user11.jpeg', followerCount: 1120000, trustScore: 83 },
  { id: 12, username: '호돌과 나', bio: '천천히 둘러보기 좋은 자연, 카페, 숙소 장면을 가이드북으로 엮습니다.', avatarUrl: '/images/users/user12.jpeg', followerCount: 2304000, trustScore: 82 },
  { id: 13, username: 'traveler.min', bio: '저장해둔 콘텐츠를 여행 전에 빠르게 다시 확인하는 사용자입니다.', avatarUrl: '', followerCount: 0, trustScore: 0 },
];

const seedGuidebooks: SeedGuidebook[] = [
  { id: 1, creatorId: 1, title: '이탈리아 인생 여행지', country: '이탈리아', region: '로마', coverImageUrl: '/images/guidebooks/user1-1.jpeg', mapImageUrl: '/images/map/로마-map.jpeg', mapCenterLat: 41.9028, mapCenterLon: 12.4964, printCount: 1432000, price: 1480, blockCount: 4 },
  { id: 2, creatorId: 2, title: '스위스 인터라켄에서 일어난 일', country: '스위스', region: '인터라켄', coverImageUrl: '/images/guidebooks/user2-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 46.6863, mapCenterLon: 7.8632, printCount: 928000, price: 1500, blockCount: 4 },
  { id: 3, creatorId: 3, title: '오키나와 드라이브 코스', country: '일본', region: '오키나와', coverImageUrl: '/images/guidebooks/user3-1.jpeg', mapImageUrl: '/images/map/오사카-map.jpeg', mapCenterLat: 26.2124, mapCenterLon: 127.6792, printCount: 814000, price: 1280, blockCount: 4 },
  { id: 4, creatorId: 4, title: '태국 푸켓에서 수영하기', country: '태국', region: '푸켓', coverImageUrl: '/images/guidebooks/user4-1.jpeg', mapImageUrl: '/images/map/아마존-map.jpeg', mapCenterLat: 7.8804, mapCenterLon: 98.3923, printCount: 672000, price: 1280, blockCount: 5 },
  { id: 5, creatorId: 5, title: '사진으로 따라가는 사파리 여행', country: '마다가스카르', region: '안타나나리보', coverImageUrl: '/images/guidebooks/user5-1.jpeg', mapImageUrl: '/images/map/아마존-map.jpeg', mapCenterLat: -18.8792, mapCenterLon: 47.5079, printCount: 5340, price: 16800, blockCount: 4 },
  { id: 6, creatorId: 6, title: '스위스에서 기차여행', country: '스위스', region: '제네바', coverImageUrl: '/images/guidebooks/user6-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 46.2044, mapCenterLon: 6.1432, printCount: 421000, price: 1380, blockCount: 3 },
  { id: 7, creatorId: 7, title: '여름 계곡 추천 서울근교', country: '대한민국', region: '강릉', coverImageUrl: '/images/guidebooks/user7-1.jpeg', mapImageUrl: '/images/map/오사카-map.jpeg', mapCenterLat: 37.7519, mapCenterLon: 128.8761, printCount: 318000, price: 2800, blockCount: 4 },
  { id: 8, creatorId: 8, title: '수박이와 가는 프랑스', country: '프랑스', region: '파리', coverImageUrl: '/images/guidebooks/user8-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 48.8566, mapCenterLon: 2.3522, printCount: 28700000, price: 1280, blockCount: 6 },
  { id: 9, creatorId: 9, title: '캐나다 호수 vlog', country: '캐나다', region: '밴쿠버', coverImageUrl: '/images/guidebooks/user9-1.jpeg', mapImageUrl: '/images/map/파리-map.jpeg', mapCenterLat: 49.2827, mapCenterLon: -123.1207, printCount: 245000, price: 1180, blockCount: 6 },
  { id: 10, creatorId: 10, title: '크리스마스를 즐기려면', country: '덴마크', region: '코펜하겐', coverImageUrl: '/images/guidebooks/user10-1.jpeg', mapImageUrl: '/images/map/로마-map.jpeg', mapCenterLat: 55.6761, mapCenterLon: 12.5683, printCount: 218000, price: 1380, blockCount: 6 },
  { id: 11, creatorId: 11, title: '저장해두고 보는 오사카 여행', country: '일본', region: '오사카', coverImageUrl: '/images/guidebooks/user11-1.jpeg', mapImageUrl: '/images/map/오사카-map.jpeg', mapCenterLat: 34.6937, mapCenterLon: 135.5023, printCount: 1960000, price: 1280, blockCount: 6 },
  { id: 12, creatorId: 12, title: '아마존 추천 여행코스', country: '브라질', region: '마나우스', coverImageUrl: '/images/guidebooks/user12-1.jpeg', mapImageUrl: '/images/map/아마존-map.jpeg', mapCenterLat: -3.119, mapCenterLon: -60.0217, printCount: 17200000, price: 1680, blockCount: 6 },
];

const locationPresets = [
  { country: '대한민국', city: '서울', mapCenterLat: 37.5665, mapCenterLon: 126.978, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 1 },
  { country: '대한민국', city: '강릉', mapCenterLat: 37.7519, mapCenterLon: 128.8761, fallbackMapImageUrl: '/images/map/default-map.jpeg', sortOrder: 4 },
  { country: '일본', city: '오사카', mapCenterLat: 34.6937, mapCenterLon: 135.5023, fallbackMapImageUrl: '/images/map/오사카-map.jpeg', sortOrder: 2 },
  { country: '프랑스', city: '파리', mapCenterLat: 48.8566, mapCenterLon: 2.3522, fallbackMapImageUrl: '/images/map/파리-map.jpeg', sortOrder: 1 },
  { country: '이탈리아', city: '로마', mapCenterLat: 41.9028, mapCenterLon: 12.4964, fallbackMapImageUrl: '/images/map/로마-map.jpeg', sortOrder: 1 },
  { country: '스위스', city: '인터라켄', mapCenterLat: 46.6863, mapCenterLon: 7.8632, fallbackMapImageUrl: '/images/map/파리-map.jpeg', sortOrder: 1 },
];

function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');

  return `${salt}:${hash}`;
}

export async function seedMySqlDatabase(mysqlPool: Pool) {
  const [userCountRows] = await mysqlPool.execute<RowDataPacket[]>('SELECT COUNT(*) AS count FROM users');

  if (Number(userCountRows[0]?.count ?? 0) > 0) {
    return;
  }

  const passwordHash = createPasswordHash('tripstack1234');

  for (const user of seedUsers) {
    await mysqlPool.execute(`
      INSERT INTO users (id, login_id, username, role, email, password_hash, display_name, bio, profile_image_url, avatar_url, follower_count, is_admin, trust_score)
      VALUES (?, ?, ?, 'creator', ?, ?, ?, ?, ?, ?, ?, 0, ?)
    `, [
      user.id,
      user.username,
      user.username,
      `${user.username.replace(/\s/g, '').toLowerCase()}@tripstack.local`,
      passwordHash,
      user.username,
      user.bio,
      user.avatarUrl,
      user.avatarUrl,
      user.followerCount,
      user.trustScore,
    ]);
  }

  for (const guidebook of seedGuidebooks) {
    await mysqlPool.execute(`
      INSERT INTO guidebooks (id, creator_id, title, country, region, cover_image_url, map_image_url, map_center_lat, map_center_lon, print_count, price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      guidebook.id,
      guidebook.creatorId,
      guidebook.title,
      guidebook.country,
      guidebook.region,
      guidebook.coverImageUrl,
      guidebook.mapImageUrl,
      guidebook.mapCenterLat,
      guidebook.mapCenterLon,
      guidebook.printCount,
      guidebook.price,
    ]);

    for (let stepOrder = 1; stepOrder <= guidebook.blockCount; stepOrder += 1) {
      await mysqlPool.execute(`
        INSERT INTO guidebook_blocks (guidebook_id, step_order, place_name, content, image_url)
        VALUES (?, ?, ?, ?, ?)
      `, [
        guidebook.id,
        stepOrder,
        `${guidebook.title} #${stepOrder}`,
        '이 여행지는 현지의 분위기를 가장 잘 느낄 수 있는 대표적인 여행 스팟입니다. 주변 골목과 상점도 함께 둘러보며 여유롭게 이동하는 것을 추천합니다.',
        `/images/guidebooks/user${guidebook.creatorId}-${Math.min(stepOrder, 6)}.jpeg`,
      ]);
    }

    for (const [index, point] of [
      { title: `${guidebook.region} 시작점`, x: 22, y: 32 },
      { title: '대표 명소', x: 42, y: 24 },
      { title: '식당/카페', x: 58, y: 46 },
      { title: '이동 포인트', x: 35, y: 66 },
      { title: '마무리 지점', x: 72, y: 62 },
    ].entries()) {
      await mysqlPool.execute(`
        INSERT INTO guidebook_route_points (guidebook_id, point_order, title, x, y)
        VALUES (?, ?, ?, ?, ?)
      `, [guidebook.id, index + 1, point.title, point.x, point.y]);
    }
  }

  for (const preset of locationPresets) {
    await mysqlPool.execute(`
      INSERT INTO location_presets (country, city, map_center_lat, map_center_lon, fallback_map_image_url, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        map_center_lat = VALUES(map_center_lat),
        map_center_lon = VALUES(map_center_lon),
        fallback_map_image_url = VALUES(fallback_map_image_url),
        sort_order = VALUES(sort_order)
    `, [preset.country, preset.city, preset.mapCenterLat, preset.mapCenterLon, preset.fallbackMapImageUrl, preset.sortOrder]);
  }
}
