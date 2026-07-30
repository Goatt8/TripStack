import type { LayoutOption, LocationCountryOption, RegionOption, SearchKeywordOption } from '@/types';

export const regions: RegionOption[] = [
  { id: 'all', label: '전체' },
  { id: 'seoul', label: '서울' },
  { id: 'gyeongju', label: '경주' },
  { id: 'jeju', label: '제주' },
  { id: 'roma', label: '로마' },
  { id: 'bangkok', label: '방콕' },
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
      { id: 'seoul', label: '서울', description: '성수, 종로, 한남, 강남 중심 도시 가이드' },
      { id: 'jeju', label: '제주', description: '동쪽 카페, 해안도로, 조용한 숙소 큐레이션' },
      { id: 'gyeongju', label: '경주', description: '황리단길, 야간 산책, 역사 여행 루트' },
    ],
  },
  {
    id: 'italy',
    label: '이탈리아',
    cities: [
      { id: 'roma', label: '로마', description: '라치오주, 미술관, 광장, 골목 동선' },
    ],
  },
  {
    id: 'thailand',
    label: '태국',
    cities: [
      { id: 'bangkok', label: '방콕', description: '시장, 루프탑, 야간 동선 중심 가이드' },
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
};
