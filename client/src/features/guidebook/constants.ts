import type { LayoutOption, LocationCountryOption, RegionOption, SearchKeywordOption } from '@/types';

export const regions: RegionOption[] = [
  { id: 'all', label: '전체' },
  { id: '로마', label: '로마' },
  { id: '인터라켄', label: '인터라켄' },
  { id: '오키나와', label: '오키나와' },
  { id: '푸켓', label: '푸켓' },
  { id: '파리', label: '파리' },
  { id: '오사카', label: '오사카' },
  { id: '마나우스', label: '마나우스' },
];

export const layouts: LayoutOption[] = [
  { id: 'compact-a5', label: 'A5 컴팩트', description: '동선과 핵심 팁을 빠르게 훑는 소형 가이드' },
  { id: 'photo-b5', label: 'B5 포토북', description: '사진 비중을 높인 감성 여행 기록형' },
  { id: 'route-map', label: '동선 중심', description: '장소 순서와 이동 팁을 우선 배치' },
];

export const locationCategories: LocationCountryOption[] = [
  {
    id: 'korea',
    label: '대한민국',
    cities: [
      { id: '강릉', label: '강릉', description: '계곡, 숲길, 서울 근교 여름 코스' },
    ],
  },
  {
    id: 'italy',
    label: '이탈리아',
    cities: [
      { id: '로마', label: '로마', description: '광장, 골목, 클래식 여행지 중심 동선' },
    ],
  },
  {
    id: 'japan',
    label: '일본',
    cities: [
      { id: '오사카', label: '오사카', description: '저장해두고 보기 좋은 도심 여행' },
      { id: '오키나와', label: '오키나와', description: '해안 드라이브와 휴양 코스' },
    ],
  },
  {
    id: 'france',
    label: '프랑스',
    cities: [
      { id: '파리', label: '파리', description: '도시 산책과 클래식 명소 중심 가이드' },
    ],
  },
  {
    id: 'brazil',
    label: '브라질',
    cities: [
      { id: '마나우스', label: '마나우스', description: '아마존 여행의 거점 도시 코스' },
    ],
  },
];

export const searchKeywords: SearchKeywordOption[] = [
  { id: 'all', label: '전체' },
  { id: 'summer', label: '여름' },
  { id: 'winter', label: '겨울' },
  { id: 'weather', label: '날씨 좋은 날' },
  { id: 'city', label: '도시' },
  { id: 'resort', label: '휴양지' },
  { id: 'cafe', label: '카페' },
  { id: 'walk', label: '산책' },
];

export const guidebookKeywordMap: Record<string, string[]> = {
  seoul: ['city', 'cafe', 'walk', 'weather'],
  gyeongju: ['city', 'walk', 'winter', 'weather'],
  jeju: ['summer', 'resort', 'cafe', 'weather'],
  roma: ['city', 'walk', 'winter', 'weather'],
  bangkok: ['summer', 'city', 'resort', 'weather'],
  마나우스: ['summer', 'resort', 'weather'],
  강릉: ['summer', 'resort', 'walk', 'weather'],
  안타나나리보: ['summer', 'resort', 'weather'],
  오키나와: ['summer', 'resort', 'weather'],
  인터라켄: ['winter', 'resort', 'walk', 'weather'],
  코펜하겐: ['winter', 'city', 'walk'],
  로마: ['city', 'walk', 'winter', 'weather'],
  푸켓: ['summer', 'resort', 'weather'],
  밴쿠버: ['summer', 'resort', 'walk', 'weather'],
  오사카: ['city', 'cafe', 'walk', 'weather'],
  제네바: ['winter', 'city', 'walk', 'weather'],
  파리: ['city', 'cafe', 'walk', 'weather'],
};
