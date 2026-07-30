import type { User } from '@/types';

type CreatorRailProps = {
  creators: User[];
};

export function CreatorRail({ creators }: CreatorRailProps) {
  if (creators.length === 0) {
    return null;
  }

  return (
    <section className="creator-rail-section" aria-label="인기 크리에이터">
      <div className="creator-rail">
        {creators.map((creator) => (
          <button className="creator-bubble" key={creator.id} type="button">
            <img src={creator.avatarUrl} alt={`${creator.username} profile`} />
            <strong>{creator.username}</strong>
            <span>{creator.followerCount.toLocaleString()} 팔로워</span>
          </button>
        ))}
      </div>
    </section>
  );
}
