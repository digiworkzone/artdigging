import { NextResponse } from "next/server";
import { verifyResendWebhook } from "@/lib/resend-webhook";
import { addressOf, emailConfigured, forwardInboundEmail, senderAddress } from "@/lib/email";

// Resend "email.received" webhook. Mail addressed to news@hello.artdigging.com
// is fetched in full from Resend and forwarded to SUPPORT_GMAIL.
//
// Status codes matter: a non-2xx makes Resend retry, so we only return one when
// a retry could help (Resend or our send failed). Mail we deliberately skip
// gets 200.

export const runtime = "nodejs";

type Received = {
  from?: string;
  to?: string[] | string;
  cc?: string[] | string;
  bcc?: string[] | string;
  subject?: string;
  created_at?: string;
  text?: string | null;
  html?: string | null;
  attachments?: { filename?: string; content_type?: string; size?: number }[];
};

const list = (v: unknown) => (Array.isArray(v) ? v : typeof v === "string" && v ? [v] : []).map(String);

async function fetchReceived(id: string): Promise<Received> {
  const res = await fetch(`https://api.resend.com/emails/receiving/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend retrieve error: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret || !emailConfigured()) {
    console.error("inbound: RESEND_WEBHOOK_SECRET or Resend env vars are missing");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  // The signature covers the exact bytes, so read the raw body before parsing.
  const raw = await request.text();
  if (!verifyResendWebhook(raw, request.headers, secret)) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  let event: { type?: string; data?: Received & { email_id?: string } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (event.type !== "email.received") return NextResponse.json({ ok: true, skipped: "event type" });

  const data = event.data ?? {};
  const id = data.email_id;
  if (!id) return NextResponse.json({ ok: true, skipped: "no email id" });

  const inbox = senderAddress();
  const recipients = [...list(data.to), ...list(data.cc), ...list(data.bcc)].map(addressOf);
  if (!recipients.includes(inbox)) return NextResponse.json({ ok: true, skipped: "not for news@" });

  // Never forward our own mail back to ourselves.
  if (data.from && addressOf(data.from) === inbox) return NextResponse.json({ ok: true, skipped: "loop" });

  try {
    const full = await fetchReceived(id);
    const from = full.from || data.from || "";
    if (!from) return NextResponse.json({ ok: true, skipped: "no sender" });

    await forwardInboundEmail({
      id,
      from,
      to: list(full.to ?? data.to),
      cc: list(full.cc ?? data.cc),
      subject: full.subject ?? data.subject ?? "",
      date: full.created_at ?? data.created_at ?? new Date().toISOString(),
      text: full.text ?? "",
      html: full.html ?? "",
      attachments: (full.attachments ?? data.attachments ?? []).map((a) => a.filename || "attachment"),
    });
    return NextResponse.json({ ok: true, forwarded: id });
  } catch (err) {
    console.error("inbound: forward failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
