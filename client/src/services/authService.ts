import { request } from '@/services/apiClient';
import type { User } from '@/types';

export type LoginPayload = {
  loginId: string;
  password: string;
};

export type SignupPayload = {
  adminCode?: string;
  loginId: string;
  displayName: string;
  email: string;
  password: string;
  profileImageUrl?: string;
};

export type UpdateProfilePayload = {
  displayName: string;
  profileImageUrl?: string;
};

export type UpdateAccountPayload = {
  currentPassword?: string;
  email: string;
  newPassword?: string;
};

export const authService = {
  login(payload: LoginPayload) {
    return request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  signup(payload: SignupPayload) {
    return request<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  updateProfile(userId: number, payload: UpdateProfilePayload) {
    return request<User>(`/users/${userId}/profile`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  updateAccount(userId: number, payload: UpdateAccountPayload) {
    return request<User>(`/users/${userId}/account`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
};
