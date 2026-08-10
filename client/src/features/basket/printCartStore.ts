import { create } from 'zustand';

import { useAccountStore } from '@/features/account/accountStore';
import { cartService } from '@/services/cartService';
import type { PrintCartItem } from '@/types';

type PrintCartStore = {
  error: string;
  guidebookIds: number[];
  items: PrintCartItem[];
  loading: boolean;
  addGuidebook: (guidebookId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  removeGuidebook: (guidebookId: number) => Promise<void>;
  resetLocal: () => void;
  updateQuantity: (guidebookId: number, quantity: number) => Promise<void>;
};

function getGuidebookIds(items: PrintCartItem[]) {
  return items.map((item) => item.guidebookId);
}

function getCurrentUserId() {
  return useAccountStore.getState().currentUser?.id ?? null;
}

export const usePrintCartStore = create<PrintCartStore>((set, get) => ({
  error: '',
  guidebookIds: [],
  items: [],
  loading: false,

  async loadCart() {
    const userId = getCurrentUserId();

    if (!userId) {
      set({ error: '', guidebookIds: [], items: [], loading: false });
      return;
    }

    try {
      set({ error: '', loading: true });
      const items = await cartService.getItems(userId);
      set({ guidebookIds: getGuidebookIds(items), items });
    } catch {
      set({ error: '담아둔 가이드북 정보를 불러오지 못했습니다.', guidebookIds: [], items: [] });
    } finally {
      set({ loading: false });
    }
  },

  async addGuidebook(guidebookId) {
    const userId = getCurrentUserId();

    if (!userId) {
      set({ error: '로그인이 필요합니다.' });
      return;
    }

    set({ error: '' });
    await cartService.addItem(userId, guidebookId);
    await get().loadCart();
  },

  async clearCart() {
    const userId = getCurrentUserId();

    if (!userId) {
      set({ error: '로그인이 필요합니다.' });
      return;
    }

    set({ error: '' });
    await cartService.clearItems(userId);
    set({ guidebookIds: [], items: [] });
  },

  async removeGuidebook(guidebookId) {
    const userId = getCurrentUserId();

    if (!userId) {
      set({ error: '로그인이 필요합니다.' });
      return;
    }

    set({ error: '' });
    await cartService.removeItem(userId, guidebookId);
    const items = get().items.filter((item) => item.guidebookId !== guidebookId);
    set({ guidebookIds: getGuidebookIds(items), items });
  },

  resetLocal() {
    set({ error: '', guidebookIds: [], items: [], loading: false });
  },

  async updateQuantity(guidebookId, quantity) {
    const userId = getCurrentUserId();

    if (!userId) {
      set({ error: '로그인이 필요합니다.' });
      return;
    }

    const previousItems = get().items;
    const nextQuantity = Math.max(1, quantity);
    const optimisticItems = previousItems.map((item) => (
      item.guidebookId === guidebookId ? { ...item, quantity: nextQuantity } : item
    ));

    set({ error: '', items: optimisticItems });

    try {
      const updated = await cartService.updateQuantity(userId, guidebookId, nextQuantity);
      const items = get().items.map((item) => (
        item.guidebookId === guidebookId ? updated : item
      ));
      set({ guidebookIds: getGuidebookIds(items), items });
    } catch {
      set({ error: '수량을 저장하지 못했습니다.', items: previousItems });
    }
  },
}));
