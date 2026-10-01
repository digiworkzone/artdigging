import { NextResponse } from "next/server";
import { appendRow, readColumn, sheetsConfigured } from "@/lib/sheets";
import { emailConfigured, sendWelcome } from "@/lib/email";
import { EMAIL, cleanName, normaliseEmail, rateLimited } from "@/lib/guard";

// Sheet tab "Subscribers": Email | Joined | Page | Name
const TAB = "Subscribers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Honeypot: a hidden field real visitors never fill in.
  if (body?.website) return NextResponse.json({ status: "joined" });

  if (rateLimited(request)) {
    return NextResponse.json({ status: "error", error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const email = normaliseEmail(body?.email);
  const name = cleanName(body?.name);
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ status: "error", error: "Invalid email" }, { status: 400 });
  }

  if (!sheetsConfigured()) {
    console.error("subscribe: Google Sheets env vars are missing");
    return NextResponse.json({ status: "error", error: "Sign-up is not available yet." }, { status: 503 });
  }

  try {
    const existing = await readColumn(TAB, "A");
    if (existing.some((e) => e.trim().toLowerCase() === email)) {
      return NextResponse.json({ status: "exists" });
    }

    const page = typeof body?.page === "string" ? body.page.slice(0, 200) : "";
    await appendRow(TAB, [email, new Date().toISOString(), page, name]);
  } catch (err) {
    console.error("subscribe: sheet write failed", err);
    return NextResponse.json({ status: "error", error: "Could not save your email." }, { status: 500 });
  }

  // They're saved; a failed welcome email shouldn't undo the sign-up.
  if (emailConfigured()) {
    try {
      await sendWelcome(email, name || undefined);
    } catch (err) {
      console.error("subscribe: welcome email failed", err);
    }
  } else {
    console.warn("subscribe: Resend env vars are missing, welcome email not sent");
  }

  return NextResponse.json({ status: "joined" });
}
