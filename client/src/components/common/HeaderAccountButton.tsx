'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { AccountEditModal } from '@/components/profile/AccountEditModal';
import { ProfileEditModal } from '@/components/profile/ProfileEditModal';
import { useAccountStore } from '@/features/account/accountStore';
import { usePrintCartStore } from '@/features/basket/printCartStore';

function SlashMenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 6h10" />
      <path d="M7 12h10" />
      <path d="M7 18h10" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
      <path d="M8 5v14" />
      <path d="M16 5v14" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function HeaderAccountButton() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountEditOpen, setIsAccountEditOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentUser = useAccountStore((state) => state.currentUser);
  const loadCurrentUser = useAccountStore((state) => state.loadCurrentUser);
  const logout = useAccountStore((state) => state.logout);
  const resetCart = usePrintCartStore((state) => state.resetLocal);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsAccountEditOpen(false);
        setIsProfileEditOpen(false);
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  if (!currentUser) {
    return null;
  }

  function openProfileEdit() {
    setIsMenuOpen(false);
    setIsProfileEditOpen(true);
  }

  function openAccountEdit() {
    setIsMenuOpen(false);
    setIsAccountEditOpen(true);
  }

  function openAdminPage() {
    setIsMenuOpen(false);
    router.push('/admin');
  }

  function handleLogout() {
    logout();
    resetCart();
    setIsMenuOpen(false);
    router.push('/login');
  }

  return (
    <>
      <div className="header-account-menu" ref={menuRef}>
        <button
          className="header-account-button"
          type="button"
          aria-label="계정 메뉴 열기"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}>
          <SlashMenuIcon />
        </button>

        {isMenuOpen && (
          <div className="header-account-dropdown" role="menu">
            <button type="button" role="menuitem" onClick={openProfileEdit}>
              <EditIcon />
              <span>프로필편집</span>
            </button>
            <button type="button" role="menuitem" onClick={openAccountEdit}>
              <EditIcon />
              <span>회원정보수정</span>
            </button>
            {currentUser.isAdmin && (
              <button type="button" role="menuitem" onClick={openAdminPage}>
                <AdminIcon />
                <span>관리자페이지</span>
              </button>
            )}
            <button type="button" role="menuitem" onClick={handleLogout}>
              <LogoutIcon />
              <span>로그아웃</span>
            </button>
          </div>
        )}
      </div>

      {isProfileEditOpen && (
        <ProfileEditModal onClose={() => setIsProfileEditOpen(false)} />
      )}

      {isAccountEditOpen && (
        <AccountEditModal onClose={() => setIsAccountEditOpen(false)} />
      )}
    </>
  );
}
