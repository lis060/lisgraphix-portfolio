const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({ ok: false, message: 'Invalid response' }));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data as T;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
}

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  preferredDate: string;
  notes?: string;
}

export async function postContact(data: ContactPayload): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function postBooking(data: BookingPayload): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>('/booking', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
