import { request } from '@/services/apiClient';
import type { PrintCartItem } from '@/types';

export const cartService = {
  getItems(userId: number) {
    return request<PrintCartItem[]>(`/print-cart?userId=${userId}`);
  },
  clearItems(userId: number) {
    return request<void>(`/print-cart?userId=${userId}`, {
      method: 'DELETE',
    });
  },
  addItem(userId: number, guidebookId: number) {
    return request<PrintCartItem>('/print-cart', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        guidebookId,
        quantity: 1,
      }),
    });
  },
  updateQuantity(userId: number, guidebookId: number, quantity: number) {
    return request<PrintCartItem>(`/print-cart/${guidebookId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId,
        quantity,
      }),
    });
  },
  removeItem(userId: number, guidebookId: number) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}/print-cart/${guidebookId}?userId=${userId}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
    });
  },
};
