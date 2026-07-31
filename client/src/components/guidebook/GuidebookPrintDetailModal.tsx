'use client';

import type { Guidebook, GuidebookBlock, User } from '@/types';

type GuidebookPrintDetailModalProps = {
  blocks: GuidebookBlock[];
  creator?: User;
  guidebook: Guidebook;
  onClose: () => void;
};

function formatCompactCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

export function GuidebookPrintDetailModal({ blocks, creator, guidebook, onClose }: GuidebookPrintDetailModalProps) {
  return (
    <div className="print-detail-layer" role="presentation" onMouseDown={onClose}>
      <section
        className="print-detail-view"
        aria-label={`${guidebook.title} 인쇄물 상세정보`}
        onMouseDown={(event) => event.stopPropagation()}>
        <div className="print-detail-toolbar">
          <button className="print-detail-print" type="button">인쇄하기</button>
          <button className="print-detail-close" type="button" aria-label="인쇄물 상세 닫기" onClick={onClose}>
            ×
          </button>
        </div>

        <header className="print-detail-summary">
          {creator && <img src={creator.avatarUrl} alt={`${creator.username} profile`} />}
          <div>
            <span>Print detail</span>
            <h2>{guidebook.title}</h2>
            <p>{guidebook.region} · {guidebook.country} · {formatCompactCount(guidebook.printCount)} 조회수</p>
            <strong>{formatCompactCount(guidebook.followerCount)} 총 인쇄판매수</strong>
          </div>
        </header>

        <div className="print-detail-blocks">
          {blocks.map((block) => (
            <article className="print-detail-block" key={block.id}>
              <img src={block.imageUrl} alt={block.placeName} />
              <div>
                <h3>{block.placeName}</h3>
                <span>Page {block.stepOrder} · {guidebook.region}</span>
                <p>{block.content}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
