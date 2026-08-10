import { request } from '@/services/apiClient';
import type { User } from '@/types';

export type AdminUpdateUserPayload = {
  displayName: string;
  email: string;
  isAdmin: boolean;
  profileImageUrl?: string;
};

export const adminService = {
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
};
