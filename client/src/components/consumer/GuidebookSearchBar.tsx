'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { locationCategories } from '@/features/guidebook/constants';
import type { Guidebook, SearchKeywordOption } from '@/types';

type GuidebookSearchBarProps = {
  guidebooks: Guidebook[];
  searchKeywords: SearchKeywordOption[];
  searchQuery: string;
  selectedKeyword: string;
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
  searchKeywords,
  searchQuery,
  selectedKeyword,
  onSearchSubmit,
}: GuidebookSearchBarProps) {
  const searchShellRef = useRef<HTMLDivElement>(null);
  const [draftQuery, setDraftQuery] = useState(searchQuery);
  const [draftKeyword, setDraftKeyword] = useState(selectedKeyword);
  const [activePanel, setActivePanel] = useState<'text' | 'keyword' | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState(locationCategories[0]?.id ?? '');

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

  const selectedKeywordLabel = searchKeywords.find((keyword) => keyword.id === draftKeyword)?.label ?? '카테고리 검색';
  const selectedCountry = locationCategories.find((country) => country.id === selectedCountryId) ?? locationCategories[0];

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
    onSearchSubmit(draftQuery, draftKeyword);
    setActivePanel(null);
  }

  function clearQuery() {
    setDraftQuery('');
    setActivePanel('text');
  }

  function selectLocation(query: string) {
    setDraftQuery(query);
    setDraftKeyword('all');
    setActivePanel(null);
    onSearchSubmit(query, 'all');
  }

  return (
    <section className="search-hero compact-search-hero">
      <div className="search-copy centered-copy">
        <p>여행지와 카테고리를 선택해주세요.</p>
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
            {draftQuery && (
              <button className="search-clear-button" type="button" aria-label="검색어 지우기" onClick={clearQuery}>
                ×
              </button>
            )}
          </label>

          <button
            className={`trip-search-segment keyword-placeholder-segment ${activePanel === 'keyword' ? 'active' : ''}`}
            type="button"
            onClick={() => setActivePanel(activePanel === 'keyword' ? null : 'keyword')}>
            <strong>{draftKeyword === 'all' ? '카테고리 검색' : selectedKeywordLabel}</strong>
          </button>

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
          <div className="search-popover keyword-popover location-popover">
            <div className="location-category-list">
              <div className="location-country-tabs" role="tablist" aria-label="국가 선택">
                {locationCategories.map((country) => (
                  <button
                    className={selectedCountry?.id === country.id ? 'selected' : ''}
                    key={country.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCountry?.id === country.id}
                    onClick={() => setSelectedCountryId(country.id)}>
                    {country.label}
                  </button>
                ))}
              </div>

              {selectedCountry && (
                <section className="location-category-group">
                  <strong>{selectedCountry.label}</strong>
                  <div>
                    {selectedCountry.cities.map((city) => (
                      <button key={city.id} type="button" onClick={() => selectLocation(city.label)}>
                        <strong>{city.label}</strong>
                        <span>{city.description}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
