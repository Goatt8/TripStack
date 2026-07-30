import type { Guidebook } from '@/types';

type GuidebookRankListProps = {
  guidebooks: Guidebook[];
  selectedGuidebook: Guidebook | null;
  onGuidebookSelect: (guidebook: Guidebook) => void;
};

export function GuidebookRankList({ guidebooks, selectedGuidebook, onGuidebookSelect }: GuidebookRankListProps) {
  return (
    <div className="section-card">
      <div className="section-heading">
        <h2>Best 큐레이션 가이드북</h2>
        <p>인쇄 수, 팔로워, 신뢰도 점수로 소비자가 판단할 수 있게 정렬합니다.</p>
      </div>
      <div className="rank-list">
        {guidebooks.map((guidebook) => (
          <button
            className={`rank-row ${selectedGuidebook?.id === guidebook.id ? 'active' : ''}`}
            key={guidebook.id}
            onClick={() => onGuidebookSelect(guidebook)}>
            <img src={guidebook.coverImageUrl} alt="guidebook" />
            <div>
              <span>#{guidebook.rankInRegion} · {guidebook.region}</span>
              <strong>{guidebook.title}</strong>
              <p>{guidebook.creatorName} · 팔로워 {guidebook.followerCount.toLocaleString()} · 신뢰도 {guidebook.trustScore}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
