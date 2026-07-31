'use client';

import { useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import type { User } from '@/types';

type CreatorRailProps = {
  creators: User[];
};

function formatCompactCount(count: number) {
  if (count >= 10000) {
    return `${Math.floor(count / 10000)}만`;
  }

  return count.toLocaleString();
}

export function CreatorRail({ creators }: CreatorRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isActive: false,
    isMoved: false,
    scrollLeft: 0,
    startX: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  if (creators.length === 0) {
    return null;
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    dragState.current = {
      isActive: true,
      isMoved: false,
      scrollLeft: rail.scrollLeft,
      startX: event.clientX,
    };
    rail.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;

    if (!rail || !dragState.current.isActive) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;

    if (Math.abs(distance) > 4) {
      dragState.current.isMoved = true;
    }

    rail.scrollLeft = dragState.current.scrollLeft - distance;
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;

    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    dragState.current.isActive = false;
    setIsDragging(false);
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!dragState.current.isMoved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragState.current.isMoved = false;
  }

  return (
    <section className="creator-rail-section" aria-label="인기 크리에이터">
      <div
        className={isDragging ? 'creator-rail dragging' : 'creator-rail'}
        ref={railRef}
        onClickCapture={handleClickCapture}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}>
        {creators.map((creator) => (
          <button className="creator-bubble" key={creator.id} type="button">
            <img src={creator.avatarUrl} alt={`${creator.username} profile`} />
            <strong>{creator.username}</strong>
            <span>{formatCompactCount(creator.followerCount)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
