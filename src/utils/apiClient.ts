import { SUPABASE_ANON_KEY, SUPABASE_URL } from './supabase/env';
import { getAccessToken } from './supabase/auth';

export const API_BASE_URL = SUPABASE_URL
  ? `${SUPABASE_URL}/functions/v1/make-server-d880a0b3`
  : '';

export type ApiRequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown;
  headers?: HeadersInit;
};

export async function apiFetch(
  endpoint: string,
  options: ApiRequestOptions = {},
  config: { authRequired?: boolean } = {},
) {
  if (!API_BASE_URL) {
    throw new Error('Supabase API base URL is not configured');
  }
  const { authRequired = false } = config;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  if (authRequired) {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    headers.set('Authorization', `Bearer ${token}`);
  } else if (SUPABASE_ANON_KEY) {
    headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  return response;
}

export async function apiJson<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {},
  config: { authRequired?: boolean } = {},
): Promise<T> {
  const response = await apiFetch(endpoint, options, config);
  if (!response.ok) {
    const text = await response.text();
    let payload: any = text;
    try {
      payload = JSON.parse(text);
    } catch {
      // keep text
    }
    const message = payload?.error || payload?.message || response.statusText;
    throw new Error(message);
  }
  return response.json();
}
