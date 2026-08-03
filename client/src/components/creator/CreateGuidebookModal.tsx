'use client';

import { useState, type DragEvent, type PointerEvent } from 'react';

import type { GuidebookRoutePoint } from '@/types';

type CreateGuidebookModalProps = {
  onCreate: (guidebook: CreateGuidebookDraft) => void;
  onClose: () => void;
};

export type CreateGuidebookDraft = {
  country: string;
  region: string;
  coverImageUrl: string;
  mapImageUrl: string;
  routePoints: GuidebookRoutePoint[];
  blocks: CreateGuidebookBlockDraft[];
  title: string;
};

export type CreateGuidebookBlockDraft = {
  id: number;
  imageName: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  content: string;
};

const locationOptions = [
  { country: '이탈리아', city: '로마', mapImageUrl: '/images/map/로마-map.jpeg' },
  { country: '프랑스', city: '파리', mapImageUrl: '/images/map/파리-map.jpeg' },
  { country: '일본', city: '오사카', mapImageUrl: '/images/map/오사카-map.jpeg' },
  { country: '브라질', city: '아마존', mapImageUrl: '/images/map/아마존-map.jpeg' },
];

const initialRoutePoints: GuidebookRoutePoint[] = [
  { id: 1, pointOrder: 1, title: '', x: 22, y: 32 },
  { id: 2, pointOrder: 2, title: '', x: 42, y: 24 },
  { id: 3, pointOrder: 3, title: '', x: 58, y: 46 },
  { id: 4, pointOrder: 4, title: '', x: 35, y: 66 },
  { id: 5, pointOrder: 5, title: '', x: 72, y: 62 },
];

function createEmptyDetailBlock(): CreateGuidebookBlockDraft {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    imageName: '',
    imageUrl: '',
    title: '',
    subtitle: '',
    content: '',
  };
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function CreateGuidebookModal({ onClose, onCreate }: CreateGuidebookModalProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[1]);
  const [activePointId, setActivePointId] = useState<number | null>(null);
  const [detailBlocks, setDetailBlocks] = useState<CreateGuidebookBlockDraft[]>([createEmptyDetailBlock()]);
  const [validationMessage, setValidationMessage] = useState('');
  const [routePoints, setRoutePoints] = useState(initialRoutePoints);

  function addRoutePoint() {
    setRoutePoints((previous) => {
      const nextOrder = previous.length + 1;

      return [
        ...previous,
        {
          id: Date.now(),
          pointOrder: nextOrder,
          title: '',
          x: 18 + (previous.length * 13) % 64,
          y: 28 + (previous.length * 17) % 48,
        },
      ];
    });
  }

  function removeLastRoutePoint() {
    setRoutePoints((previous) => previous.slice(0, -1).map((point, index) => ({ ...point, pointOrder: index + 1 })));
  }

  function readVideo() {
    setDetailBlocks((previous) => previous.map((block, index) => (
      index === 0
        ? {
            ...block,
            content: '영상에서 분석된 장소 설명이 이 영역에 임시로 들어갑니다. 이동 순서, 장소 분위기, 다시 확인해야 할 포인트를 바탕으로 인쇄용 가이드 문장을 구성합니다.',
          }
        : block
    )));
  }

  function moveActivePoint(event: PointerEvent<HTMLDivElement>) {
    if (activePointId === null) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = clampPercent(((event.clientX - rect.left) / rect.width) * 100);
    const y = clampPercent(((event.clientY - rect.top) / rect.height) * 100);

    setRoutePoints((previous) => previous.map((point) => (point.id === activePointId ? { ...point, x, y } : point)));
  }

  function updateDetailBlock(blockId: number, updates: Partial<CreateGuidebookBlockDraft>) {
    setValidationMessage('');
    setDetailBlocks((previous) => previous.map((block) => (
      block.id === blockId ? { ...block, ...updates } : block
    )));
  }

  function addDetailBlock() {
    setDetailBlocks((previous) => [...previous, createEmptyDetailBlock()]);
  }

  function removeDetailBlock(blockId: number) {
    setDetailBlocks((previous) => previous.length === 1 ? previous : previous.filter((block) => block.id !== blockId));
  }

  function handleImageDrop(event: DragEvent<HTMLLabelElement>, blockId: number) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      updateDetailBlock(blockId, {
        imageName: file.name,
        imageUrl: URL.createObjectURL(file),
      });
    }
  }

  function handleImageSelect(blockId: number, file?: File) {
    updateDetailBlock(blockId, {
      imageName: file?.name ?? '',
      imageUrl: file ? URL.createObjectURL(file) : '',
    });
  }

  function createGuidebook() {
    const hasEmptyRequiredField = detailBlocks.some((block) => (
      block.title.trim().length === 0
      || block.subtitle.trim().length === 0
      || block.content.trim().length === 0
    ));

    if (hasEmptyRequiredField) {
      setValidationMessage('제목과 내용을 입력해주세요');
      return;
    }

    const normalizedBlocks = detailBlocks.map((block, index) => ({
      ...block,
      title: block.title.trim(),
      subtitle: block.subtitle.trim(),
      content: block.content.trim(),
      imageUrl: block.imageUrl || `/images/guidebooks/user8-${Math.min(index + 1, 6)}.jpeg`,
    }));
    const title = normalizedBlocks[0]?.title || `${selectedLocation.city} 새 가이드북`;

    onCreate({
      country: selectedLocation.country,
      region: selectedLocation.city,
      coverImageUrl: normalizedBlocks[0]?.imageUrl || '/images/guidebooks/user8-1.jpeg',
      mapImageUrl: selectedLocation.mapImageUrl,
      routePoints: routePoints.map((point, index) => ({
        ...point,
        pointOrder: index + 1,
        title: point.title.trim() || `위치 포인트 ${index + 1}`,
      })),
      title,
      blocks: normalizedBlocks,
    });
  }

  return (
    <div className="create-guidebook-layer" role="presentation" onMouseDown={onClose}>
      <section
        className="create-guidebook-modal"
        aria-label="가이드북 생성"
        onMouseDown={(event) => event.stopPropagation()}>
        <header className="create-guidebook-header">
          <div>
            <span>Create guidebook</span>
            <h2>가이드북 생성</h2>
            <p>영상 링크와 위치 정보를 먼저 정리합니다.</p>
          </div>
          <button type="button" aria-label="가이드북 생성 닫기" onClick={onClose}>
            ×
          </button>
        </header>

        <div className="create-guidebook-body">
          <div className="create-guidebook-control-group full">
            <span>영상 링크</span>
            <div className="create-guidebook-link-row">
              <input
                type="url"
                placeholder="유튜브 링크 첨부"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
              />
              <button type="button" onClick={readVideo}>읽기</button>
            </div>
          </div>

          <div className="create-guidebook-control-group compact">
            <span>지역 · 도시</span>
            <div className="create-guidebook-location-row">
              <label>
                <select
                  value={selectedLocation.country}
                  onChange={(event) => {
                    const nextLocation = locationOptions.find((option) => option.country === event.target.value) ?? locationOptions[0];
                    setSelectedLocation(nextLocation);
                  }}>
                  {[...new Set(locationOptions.map((option) => option.country))].map((country) => (
                    <option value={country} key={country}>{country}</option>
                  ))}
                </select>
              </label>
              <label>
                <select
                  value={selectedLocation.city}
                  onChange={(event) => {
                    const nextLocation = locationOptions.find((option) => option.city === event.target.value) ?? selectedLocation;
                    setSelectedLocation(nextLocation);
                  }}>
                  {locationOptions
                    .filter((option) => option.country === selectedLocation.country)
                    .map((option) => (
                      <option value={option.city} key={option.city}>{option.city}</option>
                    ))}
                </select>
              </label>
            </div>
          </div>

          <div className="create-guidebook-map-wrap">
            <div>
              <strong>{selectedLocation.city}</strong>
              <p>{selectedLocation.country} 기준으로 가이드북 맵이 구성됩니다.</p>
            </div>
            <div
              className="create-guidebook-map"
              onPointerMove={moveActivePoint}
              onPointerUp={() => setActivePointId(null)}
              onPointerLeave={() => setActivePointId(null)}>
              <img src={selectedLocation.mapImageUrl} alt={`${selectedLocation.city} 지도`} />
              <svg className="create-guidebook-route-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={routePoints.map((point) => `${point.x},${point.y}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
              {routePoints.map((point, index) => (
                <button
                  className={activePointId === point.id ? 'create-guidebook-route-point active' : 'create-guidebook-route-point'}
                  key={point.id}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  type="button"
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setActivePointId(point.id);
                  }}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="create-guidebook-category-section compact">
            <div className="create-guidebook-fieldset-title">
              <strong>위치 포인트</strong>
              <div>
                <button type="button" onClick={addRoutePoint}>+</button>
                <button type="button" aria-label="마지막 위치 포인트 삭제" onClick={removeLastRoutePoint} disabled={routePoints.length === 0}>
                  -
                </button>
              </div>
            </div>
            <div className="create-guidebook-category-row">
              {routePoints.map((point, index) => (
                <div className="create-guidebook-route-input" key={point.id}>
                  <input
                    type="text"
                    placeholder="위치 포인트"
                    value={point.title}
                    onChange={(event) => {
                      setRoutePoints((previous) => previous.map((item) => (
                        item.id === point.id ? { ...item, title: event.target.value } : item
                      )));
                    }}
                    aria-label={`${index + 1}번 위치 포인트`}
                  />
                </div>
              ))}
            </div>
          </div>

          <section className="create-guidebook-detail-section">
            <div className="create-guidebook-fieldset-title">
              <strong>사진과 내용</strong>
              <button type="button" onClick={addDetailBlock}>+</button>
            </div>

            {detailBlocks.map((block, index) => (
              <article className="create-guidebook-detail-block" key={block.id}>
                <div className="create-guidebook-detail-block-title">
                  <span>Block {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeDetailBlock(block.id)}
                    disabled={detailBlocks.length === 1}>
                    삭제
                  </button>
                </div>

                <label
                  className="create-guidebook-image-drop"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleImageDrop(event, block.id)}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageSelect(block.id, event.target.files?.[0])}
                  />
                  <strong>{block.imageName || '사진을 드래그하거나 클릭해서 첨부'}</strong>
                  <span>가이드북 상세 페이지에 들어갈 장면</span>
                </label>

                <label className="create-guidebook-text-field">
                  <span>타이틀</span>
                  <input
                    type="text"
                    placeholder="장소 또는 장면 타이틀"
                    value={block.title}
                    onChange={(event) => updateDetailBlock(block.id, { title: event.target.value })}
                  />
                </label>

                <label className="create-guidebook-text-field">
                  <span>서브타이틀 · 위치</span>
                  <input
                    type="text"
                    placeholder="지역, 위치, 이동 포인트"
                    value={block.subtitle}
                    onChange={(event) => updateDetailBlock(block.id, { subtitle: event.target.value })}
                  />
                </label>

                <label className="create-guidebook-text-field">
                  <span>내용</span>
                  <textarea
                    placeholder="읽기 버튼을 누르면 분석된 내용이 임시로 들어옵니다."
                    value={block.content}
                    onChange={(event) => updateDetailBlock(block.id, { content: event.target.value })}
                  />
                </label>
              </article>
            ))}
          </section>
        </div>

        <footer className="create-guidebook-footer">
          {validationMessage && <p role="alert">{validationMessage}</p>}
          <div>
            <button type="button" onClick={onClose}>취소</button>
            <button type="button" className="primary" onClick={createGuidebook}>생성</button>
          </div>
        </footer>
      </section>
    </div>
  );
}
