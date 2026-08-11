const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
const CURRENT_USER_STORAGE_KEY = 'tripstack.currentUser';

function getCurrentUserIdHeader(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const storedUser = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);

    if (!storedUser) {
      return {};
    }

    const user = JSON.parse(storedUser) as { id?: number };
    return user.id ? { 'x-user-id': String(user.id) } : {};
  } catch {
    return {};
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');

  const currentUserHeader = getCurrentUserIdHeader();

  if (currentUserHeader['x-user-id']) {
    headers.set('x-user-id', currentUserHeader['x-user-id']);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
