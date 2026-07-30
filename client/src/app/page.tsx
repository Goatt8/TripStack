'use client';

import { AppHeader } from '@/components/common/AppHeader';
import { ConsumerGuidebookFeed } from '@/components/consumer/ConsumerGuidebookFeed';
import { searchKeywords } from '@/features/guidebook/constants';
import { useGuidebookCatalog } from '@/features/guidebook/hooks/useGuidebookCatalog';

export default function HomePage() {
  const catalog = useGuidebookCatalog();

  return (
    <main className="app-shell">
      <AppHeader compact title="여행자 가이드북 마켓" />
      {catalog.error && <p className="error-message">{catalog.error}</p>}
      {catalog.loading ? (
        <p className="empty-state">가이드북 데이터를 불러오는 중입니다.</p>
      ) : (
        <ConsumerGuidebookFeed
          blocks={catalog.blocks}
          creators={catalog.creators}
          guidebooks={catalog.guidebooks}
          searchQuery={catalog.searchQuery}
          searchKeywords={searchKeywords}
          selectedGuidebook={catalog.selectedGuidebook}
          selectedKeyword={catalog.selectedKeyword}
          onGuidebookSelect={catalog.setSelectedGuidebook}
          onSearchSubmit={catalog.submitSearch}
        />
      )}
    </main>
  );
}
