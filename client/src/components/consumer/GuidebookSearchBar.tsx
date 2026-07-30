'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { Guidebook, SearchKeywordOption } from '@/types';

type GuidebookSearchBarProps = {
  guidebooks: Guidebook[];
  searchKeywords: SearchKeywordOption[];
  searchQuery: string;
  selectedKeyword: string;
  onSearchSubmit: (query: string, keyword: string) => void;
};

const regionLabels: Record<string, string> = {
  seoul: '서울',
  gyeongju: '경주',
  jeju: '제주',
  roma: '로마',
  bangkok: '방콕',
};

const countryLabels: Record<string, string> = {
  seoul: '대한민국',
  gyeongju: '대한민국',
  jeju: '대한민국',
  roma: '이탈리아',
  bangkok: '태국',
};

export function GuidebookSearchBar({
  guidebooks,
  searchKeywords,
  searchQuery,
  selectedKeyword,
  onSearchSubmit,
}: GuidebookSearchBarProps) {
  const searchShellRef = useRef<HTMLDivElement>(null);
  const [draftQuery, setDraftQuery] = useState(searchQuery);
  const [draftKeyword, setDraftKeyword] = useState(selectedKeyword);
  const [activePanel, setActivePanel] = useState<'text' | 'keyword' | null>(null);

  useEffect(() => {
    setDraftQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setDraftKeyword(selectedKeyword);
  }, [selectedKeyword]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!searchShellRef.current?.contains(event.target as Node)) {
        setActivePanel(null);
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const selectedKeywordLabel = searchKeywords.find((keyword) => keyword.id === draftKeyword)?.label ?? '키워드 검색';

  const suggestions = useMemo(() => {
    const keyword = draftQuery.trim().toLowerCase();
    const candidates = guidebooks.flatMap((guidebook) => {
      const city = regionLabels[guidebook.region] ?? guidebook.region;
      const country = countryLabels[guidebook.region] ?? '';

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
    onSearchSubmit(draftQuery, draftKeyword);
    setActivePanel(null);
  }

  function clearQuery() {
    setDraftQuery('');
    setActivePanel('text');
  }

  return (
    <section className="search-hero compact-search-hero">
      <div className="search-copy centered-copy">
        <p className="eyebrow">Guidebook Market</p>
        <h2>어떤 여행을 찾고 있나요?</h2>
        <p>도시와 국가를 검색하거나 카테고리를 선택해 인쇄할 여행 가이드북을 찾아보세요.</p>
      </div>

      <div className="trip-search-shell" ref={searchShellRef}>
        <div className="trip-search-bar keyword-search-bar" role="search">
          <label className={`trip-search-segment text-segment ${activePanel === 'text' ? 'active' : ''}`}>
            <input
              value={draftQuery}
              onChange={(event) => {
                setDraftQuery(event.target.value);
                setActivePanel('text');
              }}
              onFocus={() => setActivePanel('text')}
              placeholder="도시, 국가 검색"
            />
            {draftQuery && <b onClick={clearQuery}>×</b>}
          </label>

          <button
            className={`trip-search-segment keyword-placeholder-segment ${activePanel === 'keyword' ? 'active' : ''}`}
            type="button"
            onClick={() => setActivePanel(activePanel === 'keyword' ? null : 'keyword')}>
            <strong>{draftKeyword === 'all' ? '카테고리 검색' : selectedKeywordLabel}</strong>
          </button>

          <button className="trip-search-button" type="button" onClick={submitSearch}>
            <span>⌕</span>
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

        {activePanel === 'keyword' && (
          <div className="search-popover keyword-popover">
            <div className="keyword-option-grid">
              {searchKeywords.map((keyword) => (
                <button
                  className={draftKeyword === keyword.id ? 'selected' : ''}
                  key={keyword.id}
                  type="button"
                  onClick={() => {
                    setDraftKeyword(keyword.id);
                    setActivePanel(null);
                  }}>
                  {keyword.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
