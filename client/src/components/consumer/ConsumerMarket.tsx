import { MetricCard } from '@/components/common/MetricCard';
import { GuidebookPreview } from '@/components/consumer/GuidebookPreview';
import { GuidebookRankList } from '@/components/consumer/GuidebookRankList';
import { OrderStatusList } from '@/components/consumer/OrderStatusList';
import { RegionTabs } from '@/components/consumer/RegionTabs';
import type { Guidebook, GuidebookBlock, LayoutOption, Order, OrderStatus, RegionOption } from '@/types';

type ConsumerMarketProps = {
  blocks: GuidebookBlock[];
  guidebooks: Guidebook[];
  layouts: LayoutOption[];
  message: string;
  orders: Order[];
  regions: RegionOption[];
  selectedGuidebook: Guidebook | null;
  selectedLayout: string;
  selectedRegion: string;
  topGuidebook?: Guidebook;
  onCreateOrder: () => void;
  onGuidebookSelect: (guidebook: Guidebook) => void;
  onLayoutChange: (layout: string) => void;
  onRegionChange: (region: string) => void;
  onStatusChange: (order: Order, status: OrderStatus) => void;
};

export function ConsumerMarket(props: ConsumerMarketProps) {
  return (
    <>
      <section className="summary-grid">
        <MetricCard label="가이드북" value={props.guidebooks.length.toString()} />
        <MetricCard label="최고 랭킹" value={props.topGuidebook ? `#${props.topGuidebook.rankInRegion}` : '-'} />
        <MetricCard label="주문" value={props.orders.length.toString()} />
      </section>

      <RegionTabs
        regions={props.regions}
        selectedRegion={props.selectedRegion}
        onRegionChange={props.onRegionChange}
      />

      <section className="market-grid">
        <GuidebookRankList
          guidebooks={props.guidebooks}
          selectedGuidebook={props.selectedGuidebook}
          onGuidebookSelect={props.onGuidebookSelect}
        />
        <GuidebookPreview
          blocks={props.blocks}
          layouts={props.layouts}
          message={props.message}
          selectedGuidebook={props.selectedGuidebook}
          selectedLayout={props.selectedLayout}
          onCreateOrder={props.onCreateOrder}
          onLayoutChange={props.onLayoutChange}
        />
      </section>

      <OrderStatusList orders={props.orders} onStatusChange={props.onStatusChange} />
    </>
  );
}
