'use client';

import { useEffect } from 'react';

import { AppHeader } from '@/components/common/AppHeader';
import { TopTabBar } from '@/components/common/TopTabBar';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useAccountStore } from '@/features/account/accountStore';

export default function AdminPage() {
  const currentUser = useAccountStore((state) => state.currentUser);
  const loadCurrentUser = useAccountStore((state) => state.loadCurrentUser);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  return (
    <main className="app-shell">
      <AppHeader compact showAccountMenu title="관리자페이지" />
      <TopTabBar mode="cart" />
      {!currentUser ? (
        <p className="error-message">로그인이 필요합니다.</p>
      ) : currentUser.isAdmin ? (
        <AdminDashboard />
      ) : (
        <p className="error-message">관리자 권한이 있는 계정만 접근할 수 있습니다.</p>
      )}
    </main>
  );
}
