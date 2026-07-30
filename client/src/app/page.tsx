import { RoleCard } from '@/components/common/RoleCard';

export default function Page() {
  return (
    <main className="entry-shell">
      <section className="entry-copy">
        <p className="eyebrow">TripStack</p>
        <h1>여행 콘텐츠를 인쇄 가능한 가이드북으로</h1>
        <p>크리에이터는 여행 기록을 신뢰도 있는 가이드북으로 쌓고, 소비자는 지역별 랭킹을 보고 원하는 레이아웃으로 주문합니다.</p>
      </section>
      <section className="role-grid">
        <RoleCard
          href="/creator"
          label="Creator"
          title="크리에이터 진입"
          description="프로필, 팔로워, 지역 랭킹, 인기 가이드북 성과를 확인합니다."
        />
        <RoleCard
          accent
          href="/consumer"
          label="Consumer"
          title="사용자 진입"
          description="지역별 가이드북을 비교하고 커스텀 레이아웃으로 인쇄 주문합니다."
        />
      </section>
    </main>
  );
}
