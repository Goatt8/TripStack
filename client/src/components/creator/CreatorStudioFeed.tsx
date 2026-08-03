'use client';

import { useEffect, useState } from 'react';

import { TopTabBar } from '@/components/common/TopTabBar';
import { CreateGuidebookModal, type CreateGuidebookDraft } from '@/components/creator/CreateGuidebookModal';
import { GuidebookPrintDetailModal } from '@/components/guidebook/GuidebookPrintDetailModal';
import { currentAccount } from '@/features/account/currentAccount';
import { BASKET_GUIDEBOOK_EVENT_NAME, readBasketGuidebookIds } from '@/features/basket/guidebookBasket';
import {
  addDeletedGuidebookId,
  addHiddenGuidebookId,
  readDeletedGuidebookIds,
  readHiddenGuidebookIds,
} from '@/features/creator/creatorGuidebookManage';
import {
  INTERESTED_CREATOR_EVENT_NAME,
  readInterestedCreatorIds,
  toggleInterestedCreatorId,
} from '@/features/interest/creatorInterest';
import { guidebookService } from '@/services/guidebookService';
import type { Guidebook, GuidebookBlock, User } from '@/types';

type CreatorStudioFeedProps = {
  creators: User[];
  guidebooks: Guidebook[];
  viewedCreatorId?: number;
};

function formatCompactCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.5 8.9c0 5.3-8.5 10-8.5 10s-8.5-4.7-8.5-10A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.5 2.9Z" />
    </svg>
  );
}

export function CreatorStudioFeed({ creators, guidebooks, viewedCreatorId = currentAccount.creatorId }: CreatorStudioFeedProps) {
  const [activeTab, setActiveTab] = useState<'mine' | 'saved'>('mine');
  const [deletedGuidebookIds, setDeletedGuidebookIds] = useState<number[]>([]);
  const [hiddenGuidebookIds, setHiddenGuidebookIds] = useState<number[]>([]);
  const [selectedGuidebook, setSelectedGuidebook] = useState<Guidebook | null>(null);
  const [selectedBlocks, setSelectedBlocks] = useState<GuidebookBlock[]>([]);
  const [isCreateGuidebookOpen, setIsCreateGuidebookOpen] = useState(false);
  const [isInterestPanelOpen, setIsInterestPanelOpen] = useState(false);
  const [basketGuidebookIds, setBasketGuidebookIds] = useState<number[]>([]);
  const [interestedCreatorIds, setInterestedCreatorIds] = useState<number[]>([]);
  const [createdGuidebooks, setCreatedGuidebooks] = useState<Guidebook[]>([]);
  const [createdGuidebookBlocks, setCreatedGuidebookBlocks] = useState<Record<number, GuidebookBlock[]>>({});
  const creator = creators.find((item) => item.id === viewedCreatorId);
  const isOwnCreator = viewedCreatorId === currentAccount.creatorId;

  useEffect(() => {
    setDeletedGuidebookIds(readDeletedGuidebookIds());
    setHiddenGuidebookIds(readHiddenGuidebookIds());
    setInterestedCreatorIds(readInterestedCreatorIds());

    function syncInterestedCreators(event: Event) {
      setInterestedCreatorIds((event as CustomEvent<number[]>).detail ?? readInterestedCreatorIds());
    }

    window.addEventListener(INTERESTED_CREATOR_EVENT_NAME, syncInterestedCreators);
    return () => window.removeEventListener(INTERESTED_CREATOR_EVENT_NAME, syncInterestedCreators);
  }, []);

  useEffect(() => {
    setBasketGuidebookIds(readBasketGuidebookIds());

    function syncBasketGuidebooks(event: Event) {
      setBasketGuidebookIds((event as CustomEvent<number[]>).detail ?? readBasketGuidebookIds());
    }

    window.addEventListener(BASKET_GUIDEBOOK_EVENT_NAME, syncBasketGuidebooks);
    return () => window.removeEventListener(BASKET_GUIDEBOOK_EVENT_NAME, syncBasketGuidebooks);
  }, []);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedGuidebook(null);
        setSelectedBlocks([]);
        setIsCreateGuidebookOpen(false);
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  if (!creator) {
    return <p className="empty-state">크리에이터 정보를 불러오는 중입니다.</p>;
  }

  const availableGuidebooks = isOwnCreator ? [...createdGuidebooks, ...guidebooks] : guidebooks;
  const creatorGuidebooks = availableGuidebooks.filter((guidebook) => {
    if (guidebook.creatorId !== creator.id) {
      return false;
    }

    if (!isOwnCreator) {
      return true;
    }

    return !deletedGuidebookIds.includes(guidebook.id) && !hiddenGuidebookIds.includes(guidebook.id);
  });
  const savedGuidebooks = isOwnCreator
    ? availableGuidebooks.filter((guidebook) => guidebook.creatorId !== creator.id && basketGuidebookIds.includes(guidebook.id))
    : [];
  const visibleGuidebooks = isOwnCreator && activeTab === 'saved' ? savedGuidebooks : creatorGuidebooks;
  const selectedGuidebookCreator = creators.find((item) => item.id === selectedGuidebook?.creatorId);
  const interestedCreators = creators.filter((item) => interestedCreatorIds.includes(item.id));
  const isViewedCreatorInterested = interestedCreatorIds.includes(creator.id);
  const visibleFollowerCount = isViewedCreatorInterested ? 1 : 0;

  async function openPrintDetail(guidebook: Guidebook) {
    setSelectedGuidebook(guidebook);
    setSelectedBlocks([]);

    if (createdGuidebookBlocks[guidebook.id]) {
      setSelectedBlocks(createdGuidebookBlocks[guidebook.id]);
      return;
    }

    setSelectedBlocks(await guidebookService.getGuidebookBlocks(guidebook.id));
  }

  function createGuidebook() {
    setIsCreateGuidebookOpen(true);
  }

  function closePrintDetail() {
    setSelectedGuidebook(null);
    setSelectedBlocks([]);
  }

  function deleteSelectedGuidebook() {
    if (!selectedGuidebook) {
      return;
    }

    setDeletedGuidebookIds(addDeletedGuidebookId(selectedGuidebook.id));
    closePrintDetail();
  }

  function editSelectedGuidebook() {
    closePrintDetail();
    setIsCreateGuidebookOpen(true);
  }

  function hideSelectedGuidebook() {
    if (!selectedGuidebook) {
      return;
    }

    setHiddenGuidebookIds(addHiddenGuidebookId(selectedGuidebook.id));
    closePrintDetail();
  }

  function toggleViewedCreatorInterest() {
    if (isOwnCreator || !creator) {
      return;
    }

    setInterestedCreatorIds(toggleInterestedCreatorId(creator.id));
  }

  async function createGuidebookFromDraft(draft: CreateGuidebookDraft) {
    if (!creator) {
      return;
    }

    const coverImageUrl = draft.coverImageUrl.startsWith('blob:') ? draft.mapImageUrl : draft.coverImageUrl;
    const created = await guidebookService.createGuidebook({
      creatorId: creator.id,
      title: draft.title,
      country: draft.country,
      region: draft.region,
      coverImageUrl,
      mapImageUrl: draft.mapImageUrl,
      routePoints: draft.routePoints.map((point) => ({
        pointOrder: point.pointOrder,
        title: point.title,
        x: point.x,
        y: point.y,
      })),
      block: {
        placeName: draft.subtitle,
        content: draft.content,
        imageUrl: coverImageUrl,
      },
    });

    setCreatedGuidebooks((previous) => [created.guidebook, ...previous]);
    setCreatedGuidebookBlocks((previous) => ({ ...previous, [created.guidebook.id]: created.blocks }));
    setActiveTab('mine');
    setIsCreateGuidebookOpen(false);
  }

  return (
    <>
      {isOwnCreator && (
        <TopTabBar
          mode="creator"
          isInterestOpen={isInterestPanelOpen}
          interestCount={interestedCreators.length}
          onInterestToggle={() => setIsInterestPanelOpen((previous) => !previous)}
        />
      )}

      <div className="creator-studio-content">
        <section className="creator-profile-summary">
          <img src={creator.avatarUrl} alt={`${creator.username} profile`} />
          <div>
            <div className="creator-profile-title-row">
              <h2>{creator.username}</h2>
              {!isOwnCreator && (
                <button
                  className={isViewedCreatorInterested ? 'creator-profile-heart active' : 'creator-profile-heart'}
                  type="button"
                  aria-label={isViewedCreatorInterested ? '관심 크리에이터 해제' : '관심 크리에이터 추가'}
                  aria-pressed={isViewedCreatorInterested}
                  onClick={toggleViewedCreatorInterest}>
                  <HeartIcon />
                </button>
              )}
            </div>
            <p>{creator.bio}</p>
            <div className="creator-profile-stats">
              <span>출판수 {formatCompactCount(creator.followerCount)}</span>
              <span>팔로워 {visibleFollowerCount}</span>
              <span>{creatorGuidebooks.length}개 가이드북</span>
            </div>
          </div>
        </section>

        <section className="creator-library">
          {isOwnCreator ? (
            <>
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
            </>
          ) : (
            <div className="creator-public-heading">
              <span>Guidebooks</span>
              <h3>{creator.username}의 가이드북</h3>
            </div>
          )}

          {activeTab === 'saved' && visibleGuidebooks.length === 0 ? (
            <p className="empty-state">아직 표시할 가이드북이 없습니다.</p>
          ) : (
            <div className="creator-guidebook-grid">
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
              {isOwnCreator && activeTab === 'mine' && (
                <article className="creator-guidebook-card creator-guidebook-create-card">
                  <button type="button" aria-label="가이드북 생성" onClick={createGuidebook}>
                    <span>+</span>
                  </button>
                </article>
              )}
            </div>
          )}
        </section>
      </div>

      {selectedGuidebook && (
        <GuidebookPrintDetailModal
          blocks={selectedBlocks}
          canManage={selectedGuidebook.creatorId === currentAccount.creatorId}
          creator={selectedGuidebookCreator}
          guidebook={selectedGuidebook}
          onClose={closePrintDetail}
          onDelete={deleteSelectedGuidebook}
          onEdit={editSelectedGuidebook}
          onHide={hideSelectedGuidebook}
          showBasketAction={selectedGuidebook.creatorId !== currentAccount.creatorId}
        />
      )}

      {isCreateGuidebookOpen && (
        <CreateGuidebookModal onClose={() => setIsCreateGuidebookOpen(false)} onCreate={(draft) => void createGuidebookFromDraft(draft)} />
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
