'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { AppHeader } from '@/components/common/AppHeader';
import { CreatorStudioFeed } from '@/components/creator/CreatorStudioFeed';
import { useAccountStore } from '@/features/account/accountStore';
import { useGuidebookCatalog } from '@/features/guidebook/hooks/useGuidebookCatalog';

export default function CreatorProfilePage() {
  const router = useRouter();
  const params = useParams<{ creatorId: string }>();
  const currentUser = useAccountStore((state) => state.currentUser);
  const loadCurrentUser = useAccountStore((state) => state.loadCurrentUser);
  const { creators, error, guidebooks, loading } = useGuidebookCatalog();
  const viewedCreatorId = Number(params.creatorId);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }
  }, [currentUser, router]);

  return (
    <main className="app-shell">
      <AppHeader compact title="크리에이터 프로필" />
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="empty-state">크리에이터 데이터를 불러오는 중입니다.</p>
      ) : (
        <CreatorStudioFeed creators={creators} guidebooks={guidebooks} viewedCreatorId={viewedCreatorId} />
      )}
    </main>
  );
}
