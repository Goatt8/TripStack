import { request } from '@/services/apiClient';
import type { Guidebook, GuidebookBlock, Order, User } from '@/types';

export const guidebookService = {
  getCreators() {
    return request<User[]>('/users?role=creator');
  },
  getGuidebooks(region?: string) {
    const query = region && region !== 'all' ? `?region=${encodeURIComponent(region)}` : '';
    return request<Guidebook[]>(`/guidebooks${query}`);
  },
  getGuidebookBlocks(guidebookId: number) {
    return request<GuidebookBlock[]>(`/guidebooks/${guidebookId}/blocks`);
  },
  getOrders() {
    return request<Order[]>('/orders');
  },
  createOrder(payload: { consumerId: number; guidebookId: number; selectedLayoutType: string; shippingMemo: string }) {
    return request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  updateOrderStatus(orderId: number, status: Order['status']) {
    return request<Order>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};
