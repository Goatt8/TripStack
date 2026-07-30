'use client';

import { AppHeader } from '@/components/common/AppHeader';
import { ConsumerMarket } from '@/components/consumer/ConsumerMarket';
import { layouts, regions } from '@/features/guidebook/constants';
import { useGuidebookCatalog } from '@/features/guidebook/hooks/useGuidebookCatalog';

export default function ConsumerPage() {
  const catalog = useGuidebookCatalog();

  return (
    <main className="app-shell">
      <AppHeader title="여행자 가이드북 마켓" />
      {catalog.error && <p className="error-message">{catalog.error}</p>}
      {catalog.loading ? (
        <p className="empty-state">가이드북 데이터를 불러오는 중입니다.</p>
      ) : (
        <ConsumerMarket
          blocks={catalog.blocks}
          guidebooks={catalog.guidebooks}
          layouts={layouts}
          message={catalog.message}
          orders={catalog.orders}
          regions={regions}
          selectedGuidebook={catalog.selectedGuidebook}
          selectedLayout={catalog.selectedLayout}
          selectedRegion={catalog.selectedRegion}
          topGuidebook={catalog.topGuidebook}
          onCreateOrder={catalog.createPrintOrder}
          onGuidebookSelect={catalog.setSelectedGuidebook}
          onLayoutChange={catalog.setSelectedLayout}
          onRegionChange={catalog.setSelectedRegion}
          onStatusChange={catalog.updateOrderStatus}
        />
      )}
    </main>
  );
}
