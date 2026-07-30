import type { Guidebook } from '@/types';

type GuidebookFeedProps = {
  guidebooks: Guidebook[];
  selectedGuidebook: Guidebook | null;
  onGuidebookSelect: (guidebook: Guidebook) => void;
};

export function GuidebookFeed({ guidebooks, selectedGuidebook, onGuidebookSelect }: GuidebookFeedProps) {
  return (
    <section className="thumbnail-feed-section">
      <div className="section-heading">
        <div>
          <h2>추천 가이드북</h2>
          <p>썸네일을 중심으로 제목과 크리에이터 신뢰 정보를 빠르게 비교합니다.</p>
        </div>
      </div>

      <div className="thumbnail-feed-grid">
        {guidebooks.map((guidebook) => (
          <button
            className={`thumbnail-feed-card ${selectedGuidebook?.id === guidebook.id ? 'active' : ''}`}
            key={guidebook.id}
            type="button"
            onClick={() => onGuidebookSelect(guidebook)}>
            <img src={guidebook.coverImageUrl} alt={`${guidebook.title} cover`} />
            <div>
              <strong>{guidebook.title}</strong>
              <p>{guidebook.creatorName} · {guidebook.region} · 팔로워 {guidebook.followerCount.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
