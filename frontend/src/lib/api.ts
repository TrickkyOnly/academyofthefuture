const SERVER_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const getClientApiBase = () => process.env.NEXT_PUBLIC_API_URL || '/api';

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${SERVER_API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiPost<T>(path: string, payload: unknown, token?: string): Promise<T> {
  const res = await fetch(`${getClientApiBase()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
