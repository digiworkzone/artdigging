import { createHash, timingSafeEqual } from "node:crypto";

// Codes come from PROPOSAL_CODES, e.g. "trap-house-reimagined:THR2026,other:XYZ".
// Kept out of the repository so the code can change without a code change.
export function codeFor(slug: string) {
  for (const pair of (process.env.PROPOSAL_CODES ?? "").split(",")) {
    const [s, code] = pair.split(":").map((v) => v?.trim());
    if (s === slug && code) return code;
  }
  return undefined;
}

export const cookieName = (slug: string) => `proposal_${slug}`;

/** Cookie value proving the right code was entered. Changes if the code changes. */
export function accessToken(slug: string, code: string) {
  return createHash("sha256").update(`artdigging:${slug}:${code.toUpperCase()}`).digest("hex");
}

export function codeMatches(slug: string, attempt: string) {
  const code = codeFor(slug);
  if (!code) return false;
  const a = Buffer.from(attempt.trim().toUpperCase());
  const b = Buffer.from(code.toUpperCase());
  return a.length === b.length && timingSafeEqual(a, b);
}

export function hasAccess(slug: string, cookieValue: string | undefined) {
  const code = codeFor(slug);
  if (!code || !cookieValue) return false;
  const expected = Buffer.from(accessToken(slug, code));
  const given = Buffer.from(cookieValue);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
