'use client';

import { guidebookKeywordMap } from '@/features/guidebook/constants';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Guidebook, SearchKeywordOption, User } from '@/types';

type GuidebookCategorySectionsProps = {
  creators: User[];
  guidebooks: Guidebook[];
  keywords: SearchKeywordOption[];
  selectedGuidebook: Guidebook | null;
  onGuidebookSelect: (guidebook: Guidebook) => void;
};

function formatCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

function ScrollableGuidebookRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  function updateScrollState() {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;

    setScrollState({
      canScrollLeft: rail.scrollLeft > 2,
      canScrollRight: rail.scrollLeft < maxScrollLeft - 2,
    });
  }

  function scrollGuidebookRail(direction: 'left' | 'right') {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: rail.clientWidth * (direction === 'right' ? 0.86 : -0.86),
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    updateScrollState();

    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(rail);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div className="category-rail-shell">
      <div className="category-guide-rail" ref={railRef} onScroll={updateScrollState}>
        {children}
      </div>
      {scrollState.canScrollLeft && (
        <button
          className="category-rail-button category-rail-prev"
          type="button"
          aria-label="이전 가이드북 보기"
          onClick={() => scrollGuidebookRail('left')}>
          &lt;
        </button>
      )}
      {scrollState.canScrollRight && (
        <button
          className="category-rail-button category-rail-next"
          type="button"
          aria-label="다음 가이드북 보기"
          onClick={() => scrollGuidebookRail('right')}>
          &gt;
        </button>
      )}
    </div>
  );
}

export function GuidebookCategorySections({
  creators,
  guidebooks,
  keywords,
  selectedGuidebook,
  onGuidebookSelect,
}: GuidebookCategorySectionsProps) {
  const recommendedGuidebooks = [...guidebooks].sort((first, second) => second.printCount - first.printCount);
  const visibleSections = keywords
    .filter((keyword) => keyword.id !== 'all')
    .map((keyword) => ({
      keyword,
      guidebooks: guidebooks.filter((guidebook) => guidebookKeywordMap[guidebook.region]?.includes(keyword.id)),
    }))
    .filter((section) => section.guidebooks.length > 0);

  if (guidebooks.length === 0) {
    return <p className="empty-state">조건에 맞는 가이드북이 없습니다.</p>;
  }

  function renderGuidebookCard(guidebook: Guidebook, key: string) {
    const creator = creators.find((item) => item.id === guidebook.creatorId);
    const locationLabel = guidebook.country === guidebook.region ? guidebook.region : `${guidebook.region} · ${guidebook.country}`;

    return (
      <article
        className={selectedGuidebook?.id === guidebook.id ? 'category-guide-card active' : 'category-guide-card'}
        key={key}>
        <button className="category-guide-select" type="button" onClick={() => onGuidebookSelect(guidebook)}>
          <div className="category-guide-media">
            <img src={guidebook.coverImageUrl} alt={`${guidebook.title} thumbnail`} />
            <div className="category-guide-title-layer">
              <strong>{guidebook.title}</strong>
              <span>{locationLabel}</span>
              <em>{formatCount(guidebook.printCount)}</em>
            </div>
          </div>
          <div className="category-guide-info">
            {creator && <img className="category-guide-avatar" src={creator.avatarUrl} alt={`${creator.username} profile`} />}
            <div className="category-guide-copy">
              <div className="category-guide-main">
                <strong>{guidebook.creatorName}</strong>
              </div>
              <div className="category-guide-numbers">
                <span>{formatCount(guidebook.followerCount)}</span>
              </div>
            </div>
          </div>
        </button>
      </article>
    );
  }

  return (
    <div className="category-sections">
      <section className="category-guide-section">
        <div className="section-heading category-section-heading">
          <div>
            <h2>지금 가장 많이 담은 추천 가이드북</h2>
            <p>사용자들이 인쇄목록에 많이 담은 순서로 보여드려요.</p>
          </div>
        </div>

        <ScrollableGuidebookRail>
          {recommendedGuidebooks.map((guidebook) => renderGuidebookCard(guidebook, `recommended-${guidebook.id}`))}
        </ScrollableGuidebookRail>
      </section>

      {visibleSections.map((section) => (
        <section className="category-guide-section" key={section.keyword.id}>
          <div className="section-heading category-section-heading">
            <div>
              <h2>{section.keyword.id === 'summer' ? '인쇄 소장하기 좋은 여름 가이드북' : `${section.keyword.label} 여행 가이드`}</h2>
              <p>선택한 조건에 맞는 인기 가이드북을 둘러보세요.</p>
            </div>
          </div>

          <ScrollableGuidebookRail>
            {section.guidebooks.map((guidebook) => renderGuidebookCard(guidebook, `${section.keyword.id}-${guidebook.id}`))}
          </ScrollableGuidebookRail>
        </section>
      ))}
    </div>
  );
}
