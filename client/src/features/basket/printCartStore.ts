import { create } from 'zustand';

import { cartService } from '@/services/cartService';
import type { PrintCartItem } from '@/types';

type PrintCartStore = {
  error: string;
  guidebookIds: number[];
  items: PrintCartItem[];
  loading: boolean;
  addGuidebook: (guidebookId: number) => Promise<void>;
  loadCart: () => Promise<void>;
  removeGuidebook: (guidebookId: number) => Promise<void>;
  updateQuantity: (guidebookId: number, quantity: number) => Promise<void>;
};

function getGuidebookIds(items: PrintCartItem[]) {
  return items.map((item) => item.guidebookId);
}

export const usePrintCartStore = create<PrintCartStore>((set, get) => ({
  error: '',
  guidebookIds: [],
  items: [],
  loading: false,

  async loadCart() {
    try {
      set({ error: '', loading: true });
      const items = await cartService.getItems();
      set({ guidebookIds: getGuidebookIds(items), items });
    } catch {
      set({ error: '담아둔 가이드북 정보를 불러오지 못했습니다.', guidebookIds: [], items: [] });
    } finally {
      set({ loading: false });
    }
  },

  async addGuidebook(guidebookId) {
    set({ error: '' });
    await cartService.addItem(guidebookId);
    await get().loadCart();
  },

  async removeGuidebook(guidebookId) {
    set({ error: '' });
    await cartService.removeItem(guidebookId);
    const items = get().items.filter((item) => item.guidebookId !== guidebookId);
    set({ guidebookIds: getGuidebookIds(items), items });
  },

  async updateQuantity(guidebookId, quantity) {
    const previousItems = get().items;
    const nextQuantity = Math.max(1, quantity);
    const optimisticItems = previousItems.map((item) => (
      item.guidebookId === guidebookId ? { ...item, quantity: nextQuantity } : item
    ));

    set({ error: '', items: optimisticItems });

    try {
      const updated = await cartService.updateQuantity(guidebookId, nextQuantity);
      const items = get().items.map((item) => (
        item.guidebookId === guidebookId ? updated : item
      ));
      set({ guidebookIds: getGuidebookIds(items), items });
    } catch {
      set({ error: '수량을 저장하지 못했습니다.', items: previousItems });
    }
  },
}));
