// ponytail: in-memory per-IP limiter — fine for a single-instance/low-traffic site,
// swap for Redis/Upstash if this ever runs multi-instance.
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > limit;
}
