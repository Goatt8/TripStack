'use client';

import { useEffect, useState } from 'react';

import { BASKET_GUIDEBOOK_EVENT_NAME, readBasketGuidebookIds } from '@/features/basket/guidebookBasket';

function PaperIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 3.5h7l3 3V20.5H7z" />
      <path d="M14 3.5v4h4" />
      <path d="M9.5 12h5" />
      <path d="M9.5 15h5" />
    </svg>
  );
}

export function HeaderPrintButton() {
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    setBasketCount(readBasketGuidebookIds().length);

    function syncBasketCount(event: Event) {
      setBasketCount(((event as CustomEvent<number[]>).detail ?? readBasketGuidebookIds()).length);
    }

    window.addEventListener(BASKET_GUIDEBOOK_EVENT_NAME, syncBasketCount);
    return () => window.removeEventListener(BASKET_GUIDEBOOK_EVENT_NAME, syncBasketCount);
  }, []);

  return (
    <button className="header-print-button" type="button" aria-label={`담아둔 가이드북 ${basketCount}개 인쇄하기`}>
      <PaperIcon />
      <span>{basketCount}</span>
    </button>
  );
}
