'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { usePrintCartStore } from '@/features/basket/printCartStore';

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
  const basketCount = usePrintCartStore((state) => state.guidebookIds.length);
  const loadCart = usePrintCartStore((state) => state.loadCart);

  useEffect(() => {
    void loadCart();
  }, [loadCart]);

  return (
    <Link className="header-print-button" href="/print-cart" aria-label={`담아둔 가이드북 ${basketCount}개 인쇄하기`}>
      <PaperIcon />
      <span>{basketCount}</span>
    </Link>
  );
}
