'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type TopTabBarProps = {
  mode: 'home' | 'creator' | 'cart';
  isSearchOpen?: boolean;
  isInterestOpen?: boolean;
  interestCount?: number;
  searchContent?: ReactNode;
  onHomeClick?: () => void;
  onSearchToggle?: () => void;
  onInterestToggle?: () => void;
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

function PeopleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 19c1-4.2 10-4.2 11 0" />
      <circle cx="16.5" cy="9" r="2.75" />
      <path d="M13.5 18.5c1.3-2.9 6.2-2.9 7 0" />
    </svg>
  );
}

export function TopTabBar({
  mode,
  isSearchOpen = false,
  isInterestOpen = false,
  interestCount = 0,
  searchContent,
  onHomeClick,
  onSearchToggle,
  onInterestToggle,
}: TopTabBarProps) {
  const isHomeMode = mode === 'home';
  const isCreatorMode = mode === 'creator';
  const navClassName = [
    'consumer-feed-tabs',
    isCreatorMode ? 'creator-top-tabs' : '',
    mode === 'cart' ? 'cart-top-tabs' : '',
    isHomeMode && isSearchOpen ? 'search-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navClassName} aria-label={isHomeMode ? '컨슈머 주요 탭' : '주요 화면 이동'}>
      <Link
        className={isHomeMode && !isSearchOpen ? 'consumer-feed-tab active' : 'consumer-feed-tab'}
        href="/"
        aria-label="홈"
        onClick={onHomeClick}>
        <HomeIcon />
      </Link>
      <Link className={isCreatorMode ? 'consumer-feed-tab active' : 'consumer-feed-tab'} href="/creator" aria-label="마이페이지">
        <UserIcon />
      </Link>

      {isHomeMode ? (
        <>
          <button
            className={isSearchOpen ? 'consumer-feed-tab active' : 'consumer-feed-tab'}
            type="button"
            aria-label="검색"
            onClick={onSearchToggle}>
            <SearchIcon />
          </button>

          <div className="consumer-feed-search">{isSearchOpen && searchContent}</div>
        </>
      ) : isCreatorMode ? (
        <>
          <button
            className={isInterestOpen ? 'consumer-feed-tab active' : 'consumer-feed-tab'}
            type="button"
          aria-label="관심 크리에이터"
          onClick={onInterestToggle}>
          <PeopleIcon />
          {interestCount > 0 && <span className="tab-count-badge">{interestCount}</span>}
        </button>
        </>
      ) : null}
    </nav>
  );
}
