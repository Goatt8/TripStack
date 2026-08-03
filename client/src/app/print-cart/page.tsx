'use client';

import { AppHeader } from '@/components/common/AppHeader';
import { GuidebookPrintCart } from '@/components/print/GuidebookPrintCart';

export default function PrintCartPage() {
  return (
    <main className="app-shell">
      <AppHeader compact title="가이드북 인쇄 장바구니" />
      <GuidebookPrintCart />
    </main>
  );
}
