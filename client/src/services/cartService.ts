import { currentAccount } from '@/features/account/currentAccount';
import { request } from '@/services/apiClient';
import type { PrintCartItem } from '@/types';

const currentUserId = currentAccount.creatorId;

export const cartService = {
  getItems() {
    return request<PrintCartItem[]>(`/print-cart?userId=${currentUserId}`);
  },
  addItem(guidebookId: number) {
    return request<PrintCartItem>('/print-cart', {
      method: 'POST',
      body: JSON.stringify({
        userId: currentUserId,
        guidebookId,
        quantity: 1,
      }),
    });
  },
  updateQuantity(guidebookId: number, quantity: number) {
    return request<PrintCartItem>(`/print-cart/${guidebookId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: currentUserId,
        quantity,
      }),
    });
  },
  removeItem(guidebookId: number) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}/print-cart/${guidebookId}?userId=${currentUserId}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
    });
  },
};
