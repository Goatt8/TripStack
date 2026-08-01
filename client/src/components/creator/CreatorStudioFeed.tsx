'use client';

import { useEffect, useState } from 'react';

import { TopTabBar } from '@/components/common/TopTabBar';
import { GuidebookPrintDetailModal } from '@/components/guidebook/GuidebookPrintDetailModal';
import { currentAccount } from '@/features/account/currentAccount';
import { INTERESTED_CREATOR_EVENT_NAME, readInterestedCreatorIds } from '@/features/interest/creatorInterest';
import { guidebookService } from '@/services/guidebookService';
import type { Guidebook, GuidebookBlock, User } from '@/types';

type CreatorStudioFeedProps = {
  creators: User[];
  guidebooks: Guidebook[];
};

function formatCompactCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

export function CreatorStudioFeed({ creators, guidebooks }: CreatorStudioFeedProps) {
  const [activeTab, setActiveTab] = useState<'mine' | 'saved'>('mine');
  const [selectedGuidebook, setSelectedGuidebook] = useState<Guidebook | null>(null);
  const [selectedBlocks, setSelectedBlocks] = useState<GuidebookBlock[]>([]);
  const [isInterestPanelOpen, setIsInterestPanelOpen] = useState(false);
  const [interestedCreatorIds, setInterestedCreatorIds] = useState<number[]>([]);
  const creator = creators.find((item) => item.id === currentAccount.creatorId);

  useEffect(() => {
    setInterestedCreatorIds(readInterestedCreatorIds());

    function syncInterestedCreators(event: Event) {
      setInterestedCreatorIds((event as CustomEvent<number[]>).detail ?? readInterestedCreatorIds());
    }

    window.addEventListener(INTERESTED_CREATOR_EVENT_NAME, syncInterestedCreators);
    return () => window.removeEventListener(INTERESTED_CREATOR_EVENT_NAME, syncInterestedCreators);
  }, []);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedGuidebook(null);
        setSelectedBlocks([]);
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  if (!creator) {
    return <p className="empty-state">크리에이터 정보를 불러오는 중입니다.</p>;
  }

  const myGuidebooks = guidebooks.filter((guidebook) => guidebook.creatorId === creator.id);
  const savedGuidebooks = guidebooks.filter((guidebook) => guidebook.creatorId !== creator.id).slice(0, 12);
  const visibleGuidebooks = activeTab === 'mine' ? myGuidebooks : savedGuidebooks;
  const selectedGuidebookCreator = creators.find((item) => item.id === selectedGuidebook?.creatorId);
  const interestedCreators = creators.filter((item) => interestedCreatorIds.includes(item.id));

  async function openPrintDetail(guidebook: Guidebook) {
    setSelectedGuidebook(guidebook);
    setSelectedBlocks([]);
    setSelectedBlocks(await guidebookService.getGuidebookBlocks(guidebook.id));
  }

  function closePrintDetail() {
    setSelectedGuidebook(null);
    setSelectedBlocks([]);
  }

  return (
    <>
      <TopTabBar
        mode="creator"
        isInterestOpen={isInterestPanelOpen}
        interestCount={interestedCreators.length}
        onInterestToggle={() => setIsInterestPanelOpen((previous) => !previous)}
      />

      <div className="creator-studio-content">
        <section className="creator-profile-summary">
          <img src={creator.avatarUrl} alt={`${creator.username} profile`} />
          <div>
            <h2>{creator.username}</h2>
            <p>{creator.bio}</p>
            <div className="creator-profile-stats">
              <span>{formatCompactCount(creator.followerCount)}</span>
              <span>신뢰도 {creator.trustScore}</span>
              <span>{myGuidebooks.length} guides</span>
            </div>
          </div>
        </section>

        <section className="creator-library">
          <div className="creator-library-tabs" role="tablist" aria-label="크리에이터 가이드북 탭">
            <button
              className={activeTab === 'mine' ? 'active' : ''}
              type="button"
              role="tab"
              aria-selected={activeTab === 'mine'}
              onClick={() => setActiveTab('mine')}>
              내 가이드북
            </button>
            <button
              className={activeTab === 'saved' ? 'active' : ''}
              type="button"
              role="tab"
              aria-selected={activeTab === 'saved'}
              onClick={() => setActiveTab('saved')}>
              담아둔 가이드북
            </button>
          </div>

          <div className="creator-library-divider" />

          {visibleGuidebooks.length === 0 ? (
            <p className="empty-state">아직 표시할 가이드북이 없습니다.</p>
          ) : (
            <div className={activeTab === 'saved' ? 'creator-guidebook-grid saved-grid' : 'creator-guidebook-grid'}>
              {visibleGuidebooks.map((guidebook) => (
                <article className="creator-guidebook-card" key={guidebook.id}>
                  <button type="button" onClick={() => void openPrintDetail(guidebook)}>
                    <img src={guidebook.coverImageUrl} alt={`${guidebook.title} cover`} />
                    <div>
                      <strong>{guidebook.title}</strong>
                      <p>{guidebook.region} · {guidebook.country}</p>
                      <span>{formatCompactCount(guidebook.printCount)} 조회수</span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedGuidebook && (
        <GuidebookPrintDetailModal
          blocks={selectedBlocks}
          creator={selectedGuidebookCreator}
          guidebook={selectedGuidebook}
          onClose={closePrintDetail}
        />
      )}

      <aside className={isInterestPanelOpen ? 'interest-creator-panel open' : 'interest-creator-panel'} aria-label="관심 크리에이터">
        <div className="interest-creator-panel-header">
          <strong>관심 크리에이터</strong>
          <button type="button" aria-label="관심 크리에이터 닫기" onClick={() => setIsInterestPanelOpen(false)}>
            ×
          </button>
        </div>
        <div className="interest-creator-list">
          {interestedCreators.length === 0 ? (
            <p className="empty-state">아직 관심 크리에이터가 없습니다.</p>
          ) : (
            interestedCreators.map((item) => (
              <button className="interest-creator-row" type="button" key={item.id}>
                <img src={item.avatarUrl} alt={`${item.username} profile`} />
                <div>
                  <strong>{item.username}</strong>
                  <span>{formatCompactCount(item.followerCount)}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
