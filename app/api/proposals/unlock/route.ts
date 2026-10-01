import { NextResponse } from "next/server";
import { getProposal } from "@/lib/proposals";
import { accessToken, codeFor, codeMatches, cookieName } from "@/lib/proposal-access";
import { rateLimited } from "@/lib/guard";

export async function POST(request: Request) {
  if (rateLimited(request, 8)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : "";
  const code = typeof body?.code === "string" ? body.code.slice(0, 64) : "";

  if (!getProposal(slug) || !codeMatches(slug, code)) {
    return NextResponse.json({ ok: false, error: "That code doesn't open this one." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName(slug), accessToken(slug, codeFor(slug)!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
  return res;
}
