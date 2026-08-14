'use client';

import { useEffect, useMemo, useState } from 'react';

import { guidebookKeywordMap, layouts } from '@/features/guidebook/constants';
import { guidebookService } from '@/services/guidebookService';
import type { Guidebook, GuidebookBlock, User } from '@/types';

function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const seenKeys = new Set<string>();

  return items.filter((item) => {
    const key = getKey(item);

    if (seenKeys.has(key)) {
      return false;
    }

    seenKeys.add(key);
    return true;
  });
}

export function useGuidebookCatalog() {
  const [creators, setCreators] = useState<User[]>([]);
  const [guidebooks, setGuidebooks] = useState<Guidebook[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState('all');
  const [selectedGuidebook, setSelectedGuidebook] = useState<Guidebook | null>(null);
  const [blocks, setBlocks] = useState<GuidebookBlock[]>([]);
  const [selectedLayout, setSelectedLayout] = useState(layouts[0].id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        setError('');
        const creatorData = await guidebookService.getCreators();
        setCreators(uniqueBy(creatorData, (creator) => `${creator.username}-${creator.avatarUrl}`));
      } catch {
        setError('초기 데이터를 불러오지 못했습니다. API 서버 상태를 확인해 주세요.');
      } finally {
        setLoading(false);
      }
    }

    void loadInitialData();
  }, []);

  useEffect(() => {
    async function loadGuidebooks() {
      try {
        setError('');
        const data = await guidebookService.getGuidebooks();
        const uniqueGuidebooks = uniqueBy(data, (guidebook) => [
          guidebook.creatorId,
          guidebook.title,
          guidebook.country,
          guidebook.region,
          guidebook.coverImageUrl,
        ].join('|'));
        setGuidebooks(uniqueGuidebooks);
        setSelectedGuidebook((previous) => {
          if (previous && uniqueGuidebooks.some((item) => item.id === previous.id)) {
            return previous;
          }

          return uniqueGuidebooks[0] ?? null;
        });
      } catch {
        setError('가이드북 목록을 불러오지 못했습니다.');
      }
    }

    void loadGuidebooks();
  }, []);

  useEffect(() => {
    if (!selectedGuidebook) {
      setBlocks([]);
      return;
    }

    const guidebookId = selectedGuidebook.id;

    async function loadBlocks() {
      try {
        setBlocks(await guidebookService.getGuidebookBlocks(guidebookId));
      } catch {
        setError('가이드북 상세 블록을 불러오지 못했습니다.');
      }
    }

    void loadBlocks();
  }, [selectedGuidebook]);

  const filteredGuidebooks = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return guidebooks.filter((guidebook) => {
      const searchableText = [
        guidebook.title,
        guidebook.country,
        guidebook.region,
        guidebook.creatorName,
      ].join(' ').toLowerCase();
      const matchesText = !keyword || searchableText.includes(keyword);
      const matchesKeyword = selectedKeyword === 'all' || guidebookKeywordMap[guidebook.region]?.includes(selectedKeyword);

      return matchesText && matchesKeyword;
    });
  }, [guidebooks, searchQuery, selectedKeyword]);

  useEffect(() => {
    setSelectedGuidebook((previous) => {
      if (previous && filteredGuidebooks.some((item) => item.id === previous.id)) {
        return previous;
      }

      return filteredGuidebooks[0] ?? null;
    });
  }, [filteredGuidebooks]);

  const topGuidebook = filteredGuidebooks[0];
  const totalPrintCount = useMemo(
    () => guidebooks.reduce((sum, guidebook) => sum + guidebook.printCount, 0),
    [guidebooks],
  );

  function submitSearch(query: string, keyword: string) {
    setSearchQuery(query);
    setSelectedKeyword(keyword);
  }

  return {
    blocks,
    creators,
    error,
    guidebooks: filteredGuidebooks,
    loading,
    searchQuery,
    selectedGuidebook,
    selectedLayout,
    selectedKeyword,
    setSearchQuery,
    setSelectedGuidebook,
    submitSearch,
    setSelectedKeyword,
    setSelectedLayout,
    topGuidebook,
    totalPrintCount,
  };
}
