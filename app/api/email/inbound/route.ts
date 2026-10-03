import { NextResponse } from "next/server";
import { Resend, type WebhookEventPayload } from "resend";
import { addressOf, emailConfigured, forwardInboundEmail, senderAddress } from "@/lib/email";

// Resend "email.received" webhook. Mail addressed to news@hello.artdigging.com
// is fetched in full from Resend and forwarded to SUPPORT_GMAIL.
//
// Status codes matter: a non-2xx makes Resend retry, so we only return one when
// a retry could help (Resend or our send failed). Mail we deliberately skip
// gets 200.

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret || !emailConfigured()) {
    console.error("inbound: RESEND_WEBHOOK_SECRET or Resend env vars are missing");
    return NextResponse.json({ ok: false }, { status: 503 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  // The signature covers the exact bytes, so verify the raw body before parsing.
  const raw = await request.text();
  let event: WebhookEventPayload;
  try {
    event = resend.webhooks.verify({
      payload: raw,
      headers: {
        id: request.headers.get("svix-id") ?? "",
        timestamp: request.headers.get("svix-timestamp") ?? "",
        signature: request.headers.get("svix-signature") ?? "",
      },
      webhookSecret: secret,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }
  if (event.type !== "email.received") return NextResponse.json({ ok: true, skipped: "event type" });

  const data = event.data;
  const id = data.email_id;
  if (!id) return NextResponse.json({ ok: true, skipped: "no email id" });

  const inbox = senderAddress();
  const recipients = [...(data.to ?? []), ...(data.cc ?? []), ...(data.bcc ?? [])].map(addressOf);
  if (!recipients.includes(inbox)) return NextResponse.json({ ok: true, skipped: "not for news@" });

  // Never forward our own mail back to ourselves.
  if (data.from && addressOf(data.from) === inbox) return NextResponse.json({ ok: true, skipped: "loop" });

  try {
    const { data: full, error } = await resend.emails.receiving.get(id);
    if (error || !full) throw new Error(`Resend receiving.get error: ${JSON.stringify(error)}`);

    const from = full.from || data.from;
    if (!from) return NextResponse.json({ ok: true, skipped: "no sender" });

    await forwardInboundEmail({
      id,
      from,
      to: full.to ?? data.to ?? [],
      cc: full.cc ?? data.cc ?? [],
      subject: full.subject ?? data.subject ?? "",
      date: full.created_at ?? data.created_at,
      text: full.text ?? "",
      html: full.html ?? "",
      attachments: (full.attachments ?? []).map((a) => a.filename || "attachment"),
    });
    return NextResponse.json({ ok: true, forwarded: id });
  } catch (err) {
    console.error("inbound: forward failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
