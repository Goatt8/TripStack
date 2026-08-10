'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { useAccountStore } from '@/features/account/accountStore';
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
  const router = useRouter();
  const currentUser = useAccountStore((state) => state.currentUser);
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
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;

    if (!rail || !dragState.current.isActive) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;

    if (Math.abs(distance) > 12) {
      dragState.current.isMoved = true;
      setIsDragging(true);
    }

    rail.scrollLeft = dragState.current.scrollLeft - distance;
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;

    dragState.current.isActive = false;
    setIsDragging(false);
  }

  function openCreator(creator: User) {
    if (dragState.current.isMoved) {
      return;
    }

    const href = creator.id === currentUser?.id ? '/creator' : `/creator/${creator.id}`;
    router.push(href);
  }

  return (
    <section className="creator-rail-section" aria-label="인기 크리에이터">
      <div
        className={isDragging ? 'creator-rail dragging' : 'creator-rail'}
        ref={railRef}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}>
        {creators.map((creator) => (
          <button className="creator-bubble" key={creator.id} type="button" onClick={() => openCreator(creator)}>
            <img src={creator.avatarUrl} alt={`${creator.username} profile`} />
            <strong>{creator.username}</strong>
            <span>{formatCompactCount(creator.followerCount)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
