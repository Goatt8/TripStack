const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
const AUTH_TOKEN_STORAGE_KEY = 'tripstack.authToken';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function getAuthToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');

  const token = getAuthToken();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const fallbackMessage = `Request failed: ${response.status}`;

    try {
      const errorBody = await response.json() as { message?: string };
      throw new ApiError(response.status, errorBody.message || fallbackMessage);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(response.status, fallbackMessage);
    }
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
