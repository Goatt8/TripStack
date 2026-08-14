import { request } from '@/services/apiClient';
import type { PrintCartItem } from '@/types';

export const cartService = {
  getItems() {
    return request<PrintCartItem[]>('/print-cart');
  },
  clearItems() {
    return request<void>('/print-cart', {
      method: 'DELETE',
    });
  },
  addItem(guidebookId: number) {
    return request<PrintCartItem>('/print-cart', {
      method: 'POST',
      body: JSON.stringify({
        guidebookId,
        quantity: 1,
      }),
    });
  },
  updateQuantity(guidebookId: number, quantity: number) {
    return request<PrintCartItem>(`/print-cart/${guidebookId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity,
      }),
    });
  },
  removeItem(guidebookId: number) {
    return request<void>(`/print-cart/${guidebookId}`, {
      method: 'DELETE',
    });
  },
};
