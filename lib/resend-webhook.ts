import { createHmac, timingSafeEqual } from "node:crypto";

// Verifies a Resend webhook. Resend signs webhooks the Svix way:
//   signature = base64(HMAC-SHA256(key, `${svix-id}.${svix-timestamp}.${rawBody}`))
// where key is the base64 part of RESEND_WEBHOOK_SECRET after "whsec_".
// The svix-signature header holds one or more space-separated "v1,<sig>" values.

const TOLERANCE_SECONDS = 5 * 60;

export function verifyResendWebhook(rawBody: string, headers: Headers, secret: string, now = Date.now()) {
  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatures = headers.get("svix-signature");
  if (!id || !timestamp || !signatures) return false;

  // Reject old or future-dated deliveries (replay protection).
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(now / 1000 - ts) > TOLERANCE_SECONDS) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${rawBody}`).digest();

  return signatures.split(" ").some((entry) => {
    const [version, sig] = entry.split(",");
    if (version !== "v1" || !sig) return false;
    const given = Buffer.from(sig, "base64");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
