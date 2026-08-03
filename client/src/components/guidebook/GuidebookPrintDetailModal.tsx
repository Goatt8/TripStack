'use client';

import { useState } from 'react';

import {
  addBasketGuidebookId,
  readBasketGuidebookIds,
  removeBasketGuidebookId,
} from '@/features/basket/guidebookBasket';
import type { Guidebook, GuidebookBlock, User } from '@/types';

type GuidebookPrintDetailModalProps = {
  blocks: GuidebookBlock[];
  canManage?: boolean;
  creator?: User;
  guidebook: Guidebook;
  onClose: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onHide?: () => void;
  showBasketAction?: boolean;
};

function formatCompactCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

export function GuidebookPrintDetailModal({
  blocks,
  canManage = false,
  creator,
  guidebook,
  onClose,
  onDelete,
  onEdit,
  onHide,
  showBasketAction = false,
}: GuidebookPrintDetailModalProps) {
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false);
  const [isBasketed, setIsBasketed] = useState(() => readBasketGuidebookIds().includes(guidebook.id));

  function toggleBasket() {
    const nextGuidebookIds = isBasketed ? removeBasketGuidebookId(guidebook.id) : addBasketGuidebookId(guidebook.id);
    setIsBasketed(nextGuidebookIds.includes(guidebook.id));
  }

  return (
    <div className="print-detail-layer" role="presentation" onMouseDown={onClose}>
      <section
        className="print-detail-view"
        aria-label={`${guidebook.title} 인쇄물 상세정보`}
        onMouseDown={(event) => event.stopPropagation()}>
        <div className="print-detail-toolbar">
          {showBasketAction && (
            <button
              className={isBasketed ? 'print-detail-basket basketed' : 'print-detail-basket'}
              type="button"
              onClick={toggleBasket}>
              {isBasketed ? '내 가이드북에서 빼기' : '내 가이드북에 담기'}
            </button>
          )}
          <button className="print-detail-print" type="button">인쇄하기</button>
          {canManage && (
            <div className="print-detail-manage">
              <button
                className="print-detail-more"
                type="button"
                aria-label="게시물 관리 메뉴"
                aria-expanded={isManageMenuOpen}
                onClick={() => setIsManageMenuOpen((previous) => !previous)}
              />
              {isManageMenuOpen && (
                <div className="print-detail-manage-menu" role="menu">
                  <button type="button" role="menuitem" onClick={onDelete} disabled={!onDelete}>게시물 삭제</button>
                  <button type="button" role="menuitem" onClick={onEdit} disabled={!onEdit}>수정</button>
                  <button type="button" role="menuitem" onClick={onHide} disabled={!onHide}>숨기기</button>
                </div>
              )}
            </div>
          )}
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

        {guidebook.mapImageUrl && guidebook.routePoints.length > 0 && (
          <section className="print-detail-route">
            <div>
              <span>Route map</span>
              <h3>{guidebook.region} 이동 동선</h3>
            </div>
            <div className="print-detail-route-map">
              <img src={guidebook.mapImageUrl} alt={`${guidebook.region} 이동 동선 지도`} />
              <svg className="print-detail-route-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={guidebook.routePoints.map((point) => `${point.x},${point.y}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
              {guidebook.routePoints.map((point) => (
                <div className="print-detail-route-point" key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%` }}>
                  <strong>{point.pointOrder}</strong>
                  {point.title && <span>{point.title}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

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
