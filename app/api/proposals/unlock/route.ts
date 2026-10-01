import { NextResponse } from "next/server";
import { getProposal, proposals } from "@/lib/proposals";
import { accessToken, codeFor, codeMatches, cookieName } from "@/lib/proposal-access";
import { rateLimited } from "@/lib/guard";

export async function POST(request: Request) {
  if (rateLimited(request, 8)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.slice(0, 64) : "";
  // With a slug, check that proposal; without one (the front page), find the
  // proposal this code belongs to.
  const slug =
    typeof body?.slug === "string"
      ? body.slug
      : (proposals.find((p) => codeMatches(p.slug, code))?.slug ?? "");

  if (!getProposal(slug) || !codeMatches(slug, code)) {
    const error = body?.slug ? "That code doesn't open this one." : "That code doesn't open anything here.";
    return NextResponse.json({ ok: false, error }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, slug });
  res.cookies.set(cookieName(slug), accessToken(slug, codeFor(slug)!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
  return res;
}
