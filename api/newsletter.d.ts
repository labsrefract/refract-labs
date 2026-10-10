export function validateSubscribe(body: unknown): { email: string; spam: boolean; error: string };

export function addSubscriber(options: {
  apiKey: string;
  email: string;
  segmentId?: string;
}): Promise<{ ok: true } | { ok: false; status: number; detail: string }>;
