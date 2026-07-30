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
    <section className="section-card thumbnail-preview-section">
      {selectedGuidebook ? (
        <>
          <div className="thumbnail-preview-main">
            <img src={selectedGuidebook.coverImageUrl} alt={`${selectedGuidebook.title} cover`} />
            <div>
              <span className="rank-badge">#{selectedGuidebook.rankInRegion} {selectedGuidebook.region}</span>
              <h2>{selectedGuidebook.title}</h2>
              <p>{selectedGuidebook.creatorName} · {selectedGuidebook.printCount.toLocaleString()}회 인쇄 · 신뢰도 {selectedGuidebook.trustScore}</p>
            </div>
          </div>

          <div className="thumbnail-block-list">
            {blocks.map((block) => (
              <article className="thumbnail-info-row" key={block.id}>
                <img src={selectedGuidebook.coverImageUrl} alt="guidebook block" />
                <div>
                  <strong>{block.placeName}</strong>
                  <p>Page {block.stepOrder} · {block.content}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="layout-list compact-layout-list">
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
    </section>
  );
}
