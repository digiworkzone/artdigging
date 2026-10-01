import { NextResponse } from "next/server";
import { appendRow, sheetsConfigured } from "@/lib/sheets";
import { emailConfigured, sendSupportMessage } from "@/lib/email";
import { EMAIL, normaliseEmail, rateLimited } from "@/lib/guard";

// Sheet tab "Messages": Date | Email | Message
const TAB = "Messages";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (body?.website) return NextResponse.json({ ok: true });

  if (rateLimited(request, 3)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Try again later." }, { status: 429 });
  }

  const email = normaliseEmail(body?.email);
  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 2000) : "";
  if (!EMAIL.test(email) || message.length < 2) {
    return NextResponse.json({ ok: false, error: "Please add your email and a message." }, { status: 400 });
  }

  let delivered = false;
  if (sheetsConfigured()) {
    try {
      await appendRow(TAB, [new Date().toISOString(), email, message]);
      delivered = true;
    } catch (err) {
      console.error("support: sheet write failed", err);
    }
  }
  if (emailConfigured()) {
    try {
      await sendSupportMessage(email, message);
      delivered = true;
    } catch (err) {
      console.error("support: email failed", err);
    }
  }

  return delivered
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ ok: false, error: "Could not send your message." }, { status: 500 });
}
