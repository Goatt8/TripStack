'use client';

import { AppHeader } from '@/components/common/AppHeader';
import { CreatorStudioFeed } from '@/components/creator/CreatorStudioFeed';
import { useGuidebookCatalog } from '@/features/guidebook/hooks/useGuidebookCatalog';

export default function CreatorPage() {
  const { creators, error, guidebooks, loading } = useGuidebookCatalog();

  return (
    <main className="app-shell">
      <AppHeader compact title="크리에이터 스튜디오" />
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="empty-state">크리에이터 데이터를 불러오는 중입니다.</p>
      ) : (
        <CreatorStudioFeed creators={creators} guidebooks={guidebooks} />
      )}
    </main>
  );
}
