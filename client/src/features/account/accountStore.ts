import { create } from 'zustand';

import type { AuthSession, User } from '@/types';

export const AUTH_TOKEN_STORAGE_KEY = 'tripstack.authToken';
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
  setAuthSession: (session: AuthSession) => void;
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
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }

    set({ currentUser: null });
  },

  setAuthSession(session) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, session.token);
      window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(session.user));
    }

    set({ currentUser: session.user });
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
