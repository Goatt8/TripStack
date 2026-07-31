import { MetricCard } from '@/components/common/MetricCard';
import { currentAccount } from '@/features/account/currentAccount';
import type { Guidebook, User } from '@/types';

type CreatorDashboardProps = {
  creators: User[];
  guidebooks: Guidebook[];
  totalPrintCount: number;
};

export function CreatorDashboard({ creators, guidebooks, totalPrintCount }: CreatorDashboardProps) {
  const creator = creators.find((item) => item.id === currentAccount.creatorId);
  const creatorGuidebooks = guidebooks.filter((guidebook) => guidebook.creatorId === creator?.id);

  if (!creator) {
    return <p className="empty-state">크리에이터 정보를 불러오는 중입니다.</p>;
  }

  return (
    <>
      <section className="profile-panel">
        <img src={creator.avatarUrl} alt="creator profile" />
        <div>
          <p className="eyebrow">Creator Profile</p>
          <h2>{creator.username}</h2>
          <p>{creator.bio}</p>
        </div>
        <div className="metric-row">
          <MetricCard label="팔로워" value={creator.followerCount.toLocaleString()} />
          <MetricCard label="신뢰도" value={`${creator.trustScore}`} />
          <MetricCard label="전체 인쇄" value={totalPrintCount.toLocaleString()} />
        </div>
      </section>

      <section className="section-card">
        <div className="section-heading">
          <h2>내 가이드북 랭킹</h2>
          <p>지역별 소비량과 신뢰도 점수로 노출 우선순위를 확인합니다.</p>
        </div>
        <div className="guide-grid">
          {creatorGuidebooks.map((guidebook) => (
            <article className="guide-card" key={guidebook.id}>
              <img src={guidebook.coverImageUrl} alt="guidebook cover" />
              <div>
                <span className="rank-badge">#{guidebook.rankInRegion} {guidebook.region}</span>
                <h3>{guidebook.title}</h3>
                <p>{guidebook.printCount.toLocaleString()}회 인쇄 · {guidebook.blockCount}개 장소</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
