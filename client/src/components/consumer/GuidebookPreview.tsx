import type { Guidebook, GuidebookBlock, LayoutOption } from '@/types';

type GuidebookPreviewProps = {
  blocks: GuidebookBlock[];
  layouts: LayoutOption[];
  message: string;
  selectedGuidebook: Guidebook | null;
  selectedLayout: string;
  onCreateOrder: () => void;
  onLayoutChange: (layout: string) => void;
};

export function GuidebookPreview({
  blocks,
  layouts,
  message,
  selectedGuidebook,
  selectedLayout,
  onCreateOrder,
  onLayoutChange,
}: GuidebookPreviewProps) {
  return (
    <div className="section-card guide-preview">
      {selectedGuidebook ? (
        <>
          <div className="section-heading">
            <h2>{selectedGuidebook.title}</h2>
            <p>{selectedGuidebook.printCount.toLocaleString()}회 인쇄된 지역 가이드북</p>
          </div>
          <div className="block-list">
            {blocks.map((block) => (
              <article className="content-block" key={block.id}>
                <span>Page {block.stepOrder}</span>
                <h3>{block.placeName}</h3>
                <p>{block.content}</p>
              </article>
            ))}
          </div>
          <div className="layout-list">
            {layouts.map((layout) => (
              <button
                className={selectedLayout === layout.id ? 'layout-card selected' : 'layout-card'}
                key={layout.id}
                onClick={() => onLayoutChange(layout.id)}>
                <strong>{layout.label}</strong>
                <span>{layout.description}</span>
              </button>
            ))}
          </div>
          <button className="primary-button" onClick={onCreateOrder}>이 가이드북 인쇄 주문</button>
          {message && <p className="success-message">{message}</p>}
        </>
      ) : (
        <p className="empty-state">선택 가능한 가이드북이 없습니다.</p>
      )}
    </div>
  );
}
