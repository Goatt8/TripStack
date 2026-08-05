'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { Guidebook } from '@/types';

type GuidebookSearchBarProps = {
  guidebooks: Guidebook[];
  searchQuery: string;
  onSearchSubmit: (query: string, keyword: string) => void;
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" r="5.75" />
      <path d="m15 15 5 5" />
    </svg>
  );
}

export function GuidebookSearchBar({
  guidebooks,
  searchQuery,
  onSearchSubmit,
}: GuidebookSearchBarProps) {
  const searchShellRef = useRef<HTMLDivElement>(null);
  const [draftQuery, setDraftQuery] = useState(searchQuery);
  const [activePanel, setActivePanel] = useState<'text' | null>(null);

  useEffect(() => {
    setDraftQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!searchShellRef.current?.contains(event.target as Node)) {
        setActivePanel(null);
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const suggestions = useMemo(() => {
    const keyword = draftQuery.trim().toLowerCase();
    const candidates = guidebooks.flatMap((guidebook) => {
      const city = guidebook.region;
      const country = guidebook.country;

      return [
        {
          id: `city-${guidebook.region}`,
          label: city,
          description: `${country} · ${guidebook.title}`,
        },
        {
          id: `country-${guidebook.region}`,
          label: country,
          description: `${city} 포함 여행 가이드북`,
        },
        {
          id: `guidebook-${guidebook.id}`,
          label: guidebook.title,
          description: `${guidebook.creatorName} · ${city} · ${guidebook.printCount.toLocaleString()}회 인쇄`,
        },
      ].filter((item) => item.label);
    });

    const uniqueCandidates = Array.from(new Map(candidates.map((item) => [item.label, item])).values());

    if (!keyword) {
      return uniqueCandidates.slice(0, 5);
    }

    return uniqueCandidates
      .filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(keyword))
      .slice(0, 6);
  }, [draftQuery, guidebooks]);

  function submitSearch() {
    const normalizedQuery = draftQuery.trim();

    if (!normalizedQuery) {
      setDraftQuery('');
      onSearchSubmit('', 'all');
      setActivePanel(null);
      return;
    }

    onSearchSubmit(normalizedQuery, 'all');
    setActivePanel(null);
  }

  function clearQuery() {
    setDraftQuery('');
    onSearchSubmit('', 'all');
    setActivePanel(null);
  }

  return (
    <section className="search-hero compact-search-hero">
      <div className="search-copy centered-copy">
        <p>여행지를 검색해주세요.</p>
      </div>

      <div className="trip-search-shell" ref={searchShellRef}>
        <div className="trip-search-bar keyword-search-bar" role="search">
          <label className={`trip-search-segment text-segment ${activePanel === 'text' ? 'active' : ''}`}>
            <input
              value={draftQuery}
              onChange={(event) => {
                const nextQuery = event.target.value;
                setDraftQuery(nextQuery);
                setActivePanel('text');

                if (nextQuery.trim().length === 0) {
                  onSearchSubmit('', 'all');
                }
              }}
              onFocus={() => setActivePanel('text')}
              placeholder="도시, 국가 검색"
            />
            {draftQuery && (
              <button className="search-clear-button" type="button" aria-label="검색어 지우기" onClick={clearQuery}>
                ×
              </button>
            )}
          </label>

          <button className="trip-search-button" type="button" onClick={submitSearch}>
            <SearchIcon />
            검색
          </button>
        </div>

        {activePanel === 'text' && (
          <div className="search-popover text-popover keyword-suggestion-popover">
            {suggestions.length === 0 ? (
              <p className="empty-state">검색어와 맞는 여행지가 없습니다.</p>
            ) : (
              suggestions.map((suggestion) => (
                <button
                  className="suggestion-row"
                  key={suggestion.id}
                  type="button"
                  onClick={() => {
                    setDraftQuery(suggestion.label);
                    setActivePanel(null);
                    onSearchSubmit(suggestion.label, 'all');
                  }}>
                  <span>⌖</span>
                  <div>
                    <strong>{suggestion.label}</strong>
                    <p>{suggestion.description}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
