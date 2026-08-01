'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { TopTabBar } from '@/components/common/TopTabBar';
import { CreatorRail } from '@/components/consumer/CreatorRail';
import { GuidebookCategorySections } from '@/components/consumer/GuidebookCategorySections';
import { GuidebookSearchBar } from '@/components/consumer/GuidebookSearchBar';
import { GuidebookPrintDetailModal } from '@/components/guidebook/GuidebookPrintDetailModal';
import { currentAccount } from '@/features/account/currentAccount';
import {
  INTERESTED_CREATOR_EVENT_NAME,
  addInterestedCreatorId,
  readInterestedCreatorIds,
} from '@/features/interest/creatorInterest';
import type { Guidebook, GuidebookBlock, SearchKeywordOption, User } from '@/types';

type ConsumerGuidebookFeedProps = {
  blocks: GuidebookBlock[];
  creators: User[];
  guidebooks: Guidebook[];
  searchKeywords: SearchKeywordOption[];
  searchQuery: string;
  selectedGuidebook: Guidebook | null;
  selectedKeyword: string;
  onGuidebookSelect: (guidebook: Guidebook) => void;
  onSearchSubmit: (query: string, keyword: string) => void;
};

function formatCompactCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

export function ConsumerGuidebookFeed(props: ConsumerGuidebookFeedProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPrintDetailOpen, setIsPrintDetailOpen] = useState(false);
  const [interestedCreatorIds, setInterestedCreatorIds] = useState<number[]>([]);
  const selectedCreator = props.creators.find((creator) => creator.id === props.selectedGuidebook?.creatorId);
  const isSelectedCreatorInterested = selectedCreator ? interestedCreatorIds.includes(selectedCreator.id) : false;
  const isSelectedCreatorCurrentAccount = selectedCreator?.id === currentAccount.creatorId;

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (isPrintDetailOpen) {
          setIsPrintDetailOpen(false);
          return;
        }

        setIsDetailOpen(false);
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isPrintDetailOpen]);

  useEffect(() => {
    setInterestedCreatorIds(readInterestedCreatorIds());

    function syncInterestedCreators(event: Event) {
      setInterestedCreatorIds((event as CustomEvent<number[]>).detail ?? readInterestedCreatorIds());
    }

    window.addEventListener(INTERESTED_CREATOR_EVENT_NAME, syncInterestedCreators);
    return () => window.removeEventListener(INTERESTED_CREATOR_EVENT_NAME, syncInterestedCreators);
  }, []);

  function openGuidebookDetail(guidebook: Guidebook) {
    props.onGuidebookSelect(guidebook);
    setIsDetailOpen(true);
    setIsPrintDetailOpen(false);
  }

  function addSelectedCreatorToInterest() {
    if (!selectedCreator) {
      return;
    }

    if (selectedCreator.id === currentAccount.creatorId) {
      return;
    }

    setInterestedCreatorIds(addInterestedCreatorId(selectedCreator.id));
  }

  return (
    <>
      <TopTabBar
        mode="home"
        isSearchOpen={isSearchOpen}
        onHomeClick={() => setIsSearchOpen(false)}
        onSearchToggle={() => setIsSearchOpen((previous) => !previous)}
        searchContent={
          <GuidebookSearchBar
            guidebooks={props.guidebooks}
            searchKeywords={props.searchKeywords}
            searchQuery={props.searchQuery}
            selectedKeyword={props.selectedKeyword}
            onSearchSubmit={props.onSearchSubmit}
          />
        }
      />

      <div className="consumer-feed-content">
        <CreatorRail creators={props.creators} />

        <GuidebookCategorySections
          creators={props.creators}
          guidebooks={props.guidebooks}
          keywords={props.searchKeywords}
          selectedGuidebook={props.selectedGuidebook}
          onGuidebookSelect={openGuidebookDetail}
        />
      </div>

      {isDetailOpen && props.selectedGuidebook && (
        <div className="guidebook-detail-layer" role="presentation" onMouseDown={() => setIsDetailOpen(false)}>
          <aside
            className="guidebook-detail-panel"
            aria-label={`${props.selectedGuidebook.title} 상세 가이드북`}
            onMouseDown={(event) => event.stopPropagation()}>
            <button className="guidebook-detail-close" type="button" aria-label="상세 닫기" onClick={() => setIsDetailOpen(false)}>
              ×
            </button>
            <div className="guidebook-detail-hero">
              <img
                className="guidebook-detail-cover"
                src={props.selectedGuidebook.coverImageUrl}
                alt={`${props.selectedGuidebook.title} cover`}
              />
              <div className="guidebook-detail-hero-copy">
                <h2>{props.selectedGuidebook.title}</h2>
                <p>{props.selectedGuidebook.region}</p>
                <span>{formatCompactCount(props.selectedGuidebook.printCount)} 조회수</span>
              </div>
            </div>
            <div className="guidebook-detail-heading">
              <div className="guidebook-detail-creator">
                {selectedCreator && <img src={selectedCreator.avatarUrl} alt={`${selectedCreator.username} profile`} />}
                <div>
                  <strong>{props.selectedGuidebook.creatorName}</strong>
                  <p>{props.selectedGuidebook.followerCount.toLocaleString()}</p>
                </div>
              </div>
              <div className="guidebook-detail-actions">
                {isSelectedCreatorCurrentAccount ? (
                  <Link href="/creator">내 화면</Link>
                ) : (
                  <button
                    className={isSelectedCreatorInterested ? 'interested' : ''}
                    type="button"
                    onClick={addSelectedCreatorToInterest}>
                    {isSelectedCreatorInterested ? '관심중' : '관심'}
                  </button>
                )}
                <button type="button" onClick={() => setIsPrintDetailOpen(true)}>
                  상세화면
                </button>
              </div>
            </div>

            <div className="guidebook-detail-scroll">
              {props.blocks.length === 0 ? (
                <p className="empty-state">가이드 내용을 불러오는 중입니다.</p>
              ) : (
                <>
                  <section className="guidebook-detail-preview-row" aria-label="가이드북 주요 장면">
                    {props.blocks.slice(0, 3).map((block) => (
                      <article className="guidebook-detail-preview-item" key={block.id}>
                        <img src={block.imageUrl} alt={block.placeName} />
                        <div>
                          <h3>{block.placeName}</h3>
                          <p>{block.content}</p>
                        </div>
                      </article>
                    ))}
                  </section>
                </>
              )}
            </div>
          </aside>
        </div>
      )}

      {isPrintDetailOpen && props.selectedGuidebook && (
        <GuidebookPrintDetailModal
          blocks={props.blocks}
          creator={selectedCreator}
          guidebook={props.selectedGuidebook}
          onClose={() => setIsPrintDetailOpen(false)}
        />
      )}
    </>
  );
}
