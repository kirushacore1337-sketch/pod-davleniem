const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");

export type LeadPayload = {
  name: string;
  phone: string;
  service: string;
  car?: string;
  wheelSize?: string;
  preferredDate?: string;
  preferredTime?: string;
  comment?: string;
};

export async function sendLead(payload: LeadPayload) {
  if (!API_BASE) {
    throw new Error("Не настроен адрес API. Укажи VITE_API_BASE_URL в GitHub Actions или .env.");
  }
  const response = await fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку.");
  return result as { ok: boolean; id: number };
}

export async function adminRequest<T>(path: string, token: string, init: RequestInit = {}): Promise<T> {
  if (!API_BASE) throw new Error("Не настроен API.");
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers || {})
    }
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Ошибка запроса.");
  return result as T;
}
