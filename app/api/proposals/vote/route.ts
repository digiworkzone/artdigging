import { NextResponse, type NextRequest } from "next/server";
import { getProposal } from "@/lib/proposals";
import { cookieName, hasAccess } from "@/lib/proposal-access";
import { appendRow, readRows, sheetsConfigured } from "@/lib/sheets";
import { EMAIL, cleanName, normaliseEmail, rateLimited } from "@/lib/guard";
import { emailConfigured, sendProposalVoteConfirmation } from "@/lib/email";

// Sheet tab "Poll": Date | Proposal | Vote | Name | Email
const TAB = "Poll";
const voteCookie = (slug: string) => `vote_${slug}`;

async function tally(slug: string) {
  const rows = await readRows(TAB, "B", "C");
  const counts = { yes: 0, no: 0 };
  for (const [proposal, vote] of rows) {
    if (proposal === slug && (vote === "yes" || vote === "no")) counts[vote]++;
  }
  return counts;
}

function checkAccess(request: NextRequest, slug: string) {
  return getProposal(slug) && hasAccess(slug, request.cookies.get(cookieName(slug))?.value);
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  if (!checkAccess(request, slug)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!sheetsConfigured()) return NextResponse.json({ ok: false }, { status: 503 });
  try {
    return NextResponse.json({ ok: true, counts: await tally(slug) });
  } catch (err) {
    console.error("vote: tally failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : "";
  const vote = body?.vote === "yes" || body?.vote === "no" ? body.vote : null;

  if (!checkAccess(request, slug)) {
    return NextResponse.json({ ok: false, error: "Open the proposal with its code first." }, { status: 401 });
  }
  if (!vote) return NextResponse.json({ ok: false, error: "Choose yes or no." }, { status: 400 });

  const already = request.cookies.get(voteCookie(slug))?.value;
  if (already === "yes" || already === "no") {
    return NextResponse.json({ ok: false, error: "You've already voted.", vote: already }, { status: 409 });
  }
  if (rateLimited(request, 5)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const anonymous = body?.anonymous === true;
  const name = anonymous ? "" : cleanName(body?.name);
  if (!anonymous && !name) {
    return NextResponse.json({ ok: false, error: "Add your name, or vote anonymously." }, { status: 400 });
  }
  // Optional, for a confirmation email. Anonymous votes never carry one.
  const email = anonymous ? "" : normaliseEmail(body?.email);
  if (email && (!EMAIL.test(email) || email.length > 254)) {
    return NextResponse.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }
  if (!sheetsConfigured()) {
    return NextResponse.json({ ok: false, error: "Voting isn't available yet." }, { status: 503 });
  }

  try {
    await appendRow(TAB, [new Date().toISOString(), slug, vote, name || "Anonymous", email]);
    const [counts] = await Promise.all([tally(slug), confirm(email, slug, vote, name)]);
    const res = NextResponse.json({ ok: true, vote, counts, confirmed: Boolean(email) });
    res.cookies.set(voteCookie(slug), vote, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  } catch (err) {
    console.error("vote: sheet write failed", err);
    return NextResponse.json({ ok: false, error: "Your vote didn't go through. Try again?" }, { status: 500 });
  }
}

async function confirm(email: string, slug: string, vote: "yes" | "no", name: string) {
  if (!email) return;
  if (!emailConfigured()) {
    console.warn("vote: Resend env vars are missing, confirmation not sent");
    return;
  }
  // The vote is saved; a failed confirmation shouldn't undo it.
  try {
    await sendProposalVoteConfirmation(email, { proposalTitle: getProposal(slug)!.title, vote, name: name || undefined });
  } catch (err) {
    console.error("vote: confirmation email failed", err);
  }
}
