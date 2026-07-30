import type { LayoutOption, RegionOption } from '@/types';

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
