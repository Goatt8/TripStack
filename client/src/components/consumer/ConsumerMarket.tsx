import { CreatorRail } from '@/components/consumer/CreatorRail';
import { GuidebookCategorySections } from '@/components/consumer/GuidebookCategorySections';
import { GuidebookPreview } from '@/components/consumer/GuidebookPreview';
import { GuidebookSearchBar } from '@/components/consumer/GuidebookSearchBar';
import type { Guidebook, GuidebookBlock, LayoutOption, SearchKeywordOption, User } from '@/types';

type ConsumerMarketProps = {
  blocks: GuidebookBlock[];
  creators: User[];
  guidebooks: Guidebook[];
  layouts: LayoutOption[];
  message: string;
  searchKeywords: SearchKeywordOption[];
  searchQuery: string;
  selectedGuidebook: Guidebook | null;
  selectedKeyword: string;
  selectedLayout: string;
  onCreateOrder: () => void;
  onGuidebookSelect: (guidebook: Guidebook) => void;
  onLayoutChange: (layout: string) => void;
  onSearchSubmit: (query: string, keyword: string) => void;
};

export function ConsumerMarket(props: ConsumerMarketProps) {
  return (
    <>
      <GuidebookSearchBar
        guidebooks={props.guidebooks}
        searchKeywords={props.searchKeywords}
        searchQuery={props.searchQuery}
        selectedKeyword={props.selectedKeyword}
        onSearchSubmit={props.onSearchSubmit}
      />

      <CreatorRail creators={props.creators} />

      <GuidebookCategorySections
        guidebooks={props.guidebooks}
        keywords={props.searchKeywords}
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
    </>
  );
}
