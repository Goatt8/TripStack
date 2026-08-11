import { request } from '@/services/apiClient';
import type { Guidebook, Order, User } from '@/types';

export type AdminUpdateUserPayload = {
  displayName: string;
  email: string;
  isAdmin: boolean;
  profileImageUrl?: string;
};

export const adminService = {
  getUsers() {
    return request<User[]>('/admin/users');
  },
  getGuidebooks() {
    return request<Guidebook[]>('/admin/guidebooks');
  },
  getOrders() {
    return request<Order[]>('/admin/orders');
  },
  updateUser(userId: number, payload: AdminUpdateUserPayload) {
    return request<User>(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  deleteUser(userId: number) {
    return request<void>(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  },
  updateOrderStatus(orderId: number, status: Order['status']) {
    return request<Order>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};
