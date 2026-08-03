import { request } from '@/services/apiClient';
import type { Guidebook, GuidebookBlock, GuidebookRoutePoint, Order, User } from '@/types';

export type CreateGuidebookPayload = {
  creatorId: number;
  title: string;
  country: string;
  region: string;
  coverImageUrl: string;
  mapImageUrl: string;
  routePoints: Array<Pick<GuidebookRoutePoint, 'pointOrder' | 'title' | 'x' | 'y'>>;
  block: {
    placeName: string;
    content: string;
    imageUrl: string;
  };
};

export type CreateGuidebookResponse = {
  guidebook: Guidebook;
  blocks: GuidebookBlock[];
};

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
  createGuidebook(payload: CreateGuidebookPayload) {
    return request<CreateGuidebookResponse>('/guidebooks', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
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
