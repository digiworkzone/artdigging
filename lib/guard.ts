// Shared input checks for the public form endpoints.

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

// Best-effort rate limit per IP. Serverless instances don't share memory,
// so this slows down bursts rather than guaranteeing a hard cap.
const hits = new Map<string, number[]>();

export function rateLimited(request: Request, limit = 5, windowMs = 10 * 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

/** Optional first name: trimmed, single-line, no markup, at most 60 characters. */
export function cleanName(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}
