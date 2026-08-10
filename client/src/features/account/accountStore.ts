import { create } from 'zustand';

import type { User } from '@/types';

const CURRENT_USER_STORAGE_KEY = 'tripstack.currentUser';

function readStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedUser = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) as User : null;
  } catch {
    return null;
  }
}

type AccountStore = {
  currentUser: User | null;
  loadCurrentUser: () => void;
  logout: () => void;
  setCurrentUser: (user: User) => void;
  updateCurrentUser: (user: User) => void;
};

export const useAccountStore = create<AccountStore>((set) => ({
  currentUser: readStoredUser(),

  loadCurrentUser() {
    set({ currentUser: readStoredUser() });
  },

  logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }

    set({ currentUser: null });
  },

  setCurrentUser(user) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    }

    set({ currentUser: user });
  },

  updateCurrentUser(user) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    }

    set({ currentUser: user });
  },
}));
