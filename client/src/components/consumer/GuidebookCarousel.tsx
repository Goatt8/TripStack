import type { Guidebook } from '@/types';

type GuidebookCarouselProps = {
  guidebooks: Guidebook[];
  selectedGuidebook: Guidebook | null;
  onGuidebookSelect: (guidebook: Guidebook) => void;
};

export function GuidebookCarousel({ guidebooks, selectedGuidebook, onGuidebookSelect }: GuidebookCarouselProps) {
  return (
    <section className="carousel-section">
      <div className="section-heading">
        <div>
          <h2>Best 큐레이션 가이드북</h2>
          <p>사진, 크리에이터 정보, 인쇄 수를 보고 원하는 가이드북을 선택하세요.</p>
        </div>
        <span>{guidebooks.length}개</span>
      </div>

      {guidebooks.length === 0 ? (
        <p className="empty-state">검색 조건에 맞는 가이드북이 없습니다.</p>
      ) : (
        <div className="guidebook-rail" aria-label="가이드북 가로 목록">
          {guidebooks.map((guidebook) => (
            <button
              className={`guidebook-tile ${selectedGuidebook?.id === guidebook.id ? 'active' : ''}`}
              key={guidebook.id}
              onClick={() => onGuidebookSelect(guidebook)}>
              <img src={guidebook.coverImageUrl} alt={`${guidebook.title} cover`} />
              <div className="tile-body">
                <div className="tile-meta">
                  <span>#{guidebook.rankInRegion} {guidebook.region}</span>
                  <span>{guidebook.printCount.toLocaleString()} prints</span>
                </div>
                <h3>{guidebook.title}</h3>
                <p>{guidebook.creatorName} · 팔로워 {guidebook.followerCount.toLocaleString()} · 신뢰도 {guidebook.trustScore}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
