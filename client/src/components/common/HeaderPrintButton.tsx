'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useAccountStore } from '@/features/account/accountStore';
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

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 4v10" />
      <path d="m8 10 4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  );
}

function PaperListIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 3.5h7l3 3V20.5H7z" />
      <path d="M14 3.5v4h4" />
      <path d="M9.5 11h5" />
      <path d="M9.5 14h5" />
      <path d="M9.5 17h3.5" />
    </svg>
  );
}

export function HeaderPrintButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentUser = useAccountStore((state) => state.currentUser);
  const loadCurrentUser = useAccountStore((state) => state.loadCurrentUser);
  const basketCount = usePrintCartStore((state) => state.guidebookIds.length);
  const loadCart = usePrintCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      void loadCart();
    }
  }, [currentUser, loadCart]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div className="header-print-menu" ref={menuRef}>
      <button
        className="header-print-button"
        type="button"
        aria-label={`주문목록 열기, 담아둔 가이드북 ${basketCount}개`}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((previous) => !previous)}>
        <PaperIcon />
        <span>{basketCount}</span>
      </button>

      {isMenuOpen && (
        <div className="header-print-dropdown" role="menu">
          <Link href="/print-cart?view=order" role="menuitem" onClick={() => setIsMenuOpen(false)}>
            <DownloadIcon />
            <span>인쇄하기</span>
          </Link>
          <Link href="/print-cart?view=sales" role="menuitem" onClick={() => setIsMenuOpen(false)}>
            <PaperListIcon />
            <span>판매목록</span>
          </Link>
        </div>
      )}
    </div>
  );
}
