'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CreatorRail } from '@/components/consumer/CreatorRail';
import { GuidebookCategorySections } from '@/components/consumer/GuidebookCategorySections';
import { GuidebookSearchBar } from '@/components/consumer/GuidebookSearchBar';
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

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6.5 10.5V20h11v-9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" r="5.75" />
      <path d="m15 15 5 5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c1.5-4 12.5-4 14 0" />
    </svg>
  );
}

export function ConsumerGuidebookFeed(props: ConsumerGuidebookFeedProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const selectedCreator = props.creators.find((creator) => creator.id === props.selectedGuidebook?.creatorId);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDetailOpen(false);
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  function openGuidebookDetail(guidebook: Guidebook) {
    props.onGuidebookSelect(guidebook);
    setIsDetailOpen(true);
  }

  return (
    <>
      <nav className={isSearchOpen ? 'consumer-feed-tabs search-open' : 'consumer-feed-tabs'} aria-label="컨슈머 주요 탭">
        <Link
          className={isSearchOpen ? 'consumer-feed-tab' : 'consumer-feed-tab active'}
          href="/"
          aria-label="홈"
          onClick={() => setIsSearchOpen(false)}>
          <HomeIcon />
        </Link>
        <button
          className={isSearchOpen ? 'consumer-feed-tab active' : 'consumer-feed-tab'}
          type="button"
          aria-label="검색"
          onClick={() => setIsSearchOpen((previous) => !previous)}>
          <SearchIcon />
        </button>
        <Link className="consumer-feed-tab" href="/creator" aria-label="마이페이지">
          <UserIcon />
        </Link>

        <div className="consumer-feed-search">
          {isSearchOpen && (
            <GuidebookSearchBar
              guidebooks={props.guidebooks}
              searchKeywords={props.searchKeywords}
              searchQuery={props.searchQuery}
              selectedKeyword={props.selectedKeyword}
              onSearchSubmit={props.onSearchSubmit}
            />
          )}
        </div>
      </nav>

      <div className="consumer-feed-content">
        <CreatorRail creators={props.creators} />

        <GuidebookCategorySections
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
            <img
              className="guidebook-detail-cover"
              src={props.selectedGuidebook.coverImageUrl}
              alt={`${props.selectedGuidebook.title} cover`}
            />
            <div className="guidebook-detail-heading">
              <span>Guidebook</span>
              <h2>{props.selectedGuidebook.title}</h2>
              <div className="guidebook-detail-creator">
                {selectedCreator && <img src={selectedCreator.avatarUrl} alt={`${selectedCreator.username} profile`} />}
                <div>
                  <strong>{props.selectedGuidebook.creatorName}</strong>
                  <p>{selectedCreator?.bio ?? `신뢰도 ${props.selectedGuidebook.trustScore}의 여행 가이드 크리에이터입니다.`}</p>
                </div>
              </div>
            </div>

            <div className="guidebook-detail-scroll">
              {props.blocks.length === 0 ? (
                <p className="empty-state">가이드 내용을 불러오는 중입니다.</p>
              ) : (
                props.blocks.map((block) => (
                  <article className="guidebook-detail-block" key={block.id}>
                    <img src={block.imageUrl} alt={block.placeName} />
                    <div>
                      <span>Page {block.stepOrder}</span>
                      <h3>{block.placeName}</h3>
                      <p>{block.content}</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
