const WINDOW_MS = 1000 * 60 * 10;
const MAX_ATTEMPTS = 5;

type Entry = {
  count: number;
  expiresAt: number;
};

const buckets = new Map<string, Entry>();

export function checkRateLimit(identifier: string) {
  const now = Date.now();
  const current = buckets.get(identifier);

  if (!current || current.expiresAt <= now) {
    buckets.set(identifier, { count: 1, expiresAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.expiresAt - now) / 1000)
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}
