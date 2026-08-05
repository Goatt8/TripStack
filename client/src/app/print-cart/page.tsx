'use client';

import { Suspense } from 'react';

import { AppHeader } from '@/components/common/AppHeader';
import { TopTabBar } from '@/components/common/TopTabBar';
import { GuidebookPrintCart } from '@/components/print/GuidebookPrintCart';

export default function PrintCartPage() {
  return (
    <main className="app-shell">
      <AppHeader compact title="가이드북 인쇄 장바구니" />
      <TopTabBar mode="cart" />
      <Suspense fallback={<p className="empty-state">주문목록을 불러오는 중입니다.</p>}>
        <GuidebookPrintCart />
      </Suspense>
    </main>
  );
}
