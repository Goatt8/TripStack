import type { RegionOption } from '@/types';

type RegionTabsProps = {
  regions: RegionOption[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
};

export function RegionTabs({ regions, selectedRegion, onRegionChange }: RegionTabsProps) {
  return (
    <section className="section-card">
      <div className="section-heading">
        <h2>지역 선택</h2>
        <p>에어비앤비처럼 먼저 여행 지역을 고르고, 이후 크리에이터 신뢰도로 비교합니다.</p>
      </div>
      <div className="region-tabs">
        {regions.map((region) => (
          <button
            className={selectedRegion === region.id ? 'selected' : ''}
            key={region.id}
            onClick={() => onRegionChange(region.id)}>
            {region.label}
          </button>
        ))}
      </div>
    </section>
  );
}
