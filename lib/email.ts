import { site } from "@/lib/site";

// Sends email through Resend's REST API (no SDK). Server-only: never import
// this from a client component.
//
// Every email goes out from ONE identity, RESEND_FROM
// ("Art Digging <news@hello.artdigging.com>"), which is also the Reply-To, so
// replies land back at news@ and are forwarded to SUPPORT_GMAIL by
// /api/email/inbound. The streams below (newsletter, proposal votes, support,
// inbound forwards) stay separate through their own functions, templates and
// Resend "category" tags.

const siteUrl = () => process.env.SITE_URL ?? "https://artdigging.com";

/** The one Art Digging address, taken from RESEND_FROM. */
export const DEFAULT_SENDER = "news@hello.artdigging.com";

/** "Name <a@b.c>" or "a@b.c"  →  "a@b.c" (lower-case). */
export function addressOf(value: string) {
  const match = value.match(/<([^<>\s]+@[^<>\s]+)>/);
  return (match ? match[1] : value).trim().toLowerCase();
}

export function senderAddress() {
  return addressOf(process.env.RESEND_FROM || DEFAULT_SENDER);
}

/** Where support messages and inbound mail are forwarded. */
const supportInbox = () => process.env.SUPPORT_GMAIL || process.env.SUPPORT_EMAIL || site.contactEmail;

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
}

type Category = "newsletter_welcome" | "proposal_vote_confirmation" | "support_message" | "inbound_forward";

async function send(category: Category, payload: Record<string, unknown>, idempotencyKey?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      reply_to: senderAddress(),
      tags: [{ name: "category", value: category }],
      ...payload,
    }),
  });
  if (!res.ok) throw new Error(`Resend error: ${res.status} ${await res.text()}`);
}

export const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** The dark Art Digging frame shared by the outgoing templates. */
function frame(rows: string, footer: string) {
  const url = siteUrl();
  return `<!doctype html>
<html><body style="margin:0;background:#0b0a09;color:#ebe4d8;font-family:Georgia,'Times New Roman',serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0a09"><tr><td align="center" style="padding:56px 24px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
<tr><td style="font:11px/1 Helvetica,Arial,sans-serif;letter-spacing:4px;text-transform:uppercase;color:#8f877b">Art Digging</td></tr>
${rows}
<tr><td style="padding-top:48px;border-bottom:1px solid #2a2622"></td></tr>
<tr><td style="padding-top:20px;font:12px/1.7 Helvetica,Arial,sans-serif;color:#8f877b"><a href="${url}" style="color:#8f877b">artdigging.com</a> · <a href="${site.instagram}" style="color:#8f877b">Instagram ${site.instagramHandle}</a><br>${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

// ── Newsletter ───────────────────────────────────────────────────────────────

export async function sendWelcome(to: string, name?: string) {
  const url = siteUrl();
  const headline = name ? `You're on the list, ${name}.` : "You're on the list.";
  await send("newsletter_welcome", {
    to,
    subject: "You're on the list",
    text: [
      headline,
      "",
      "Every work holds a story.",
      "",
      "We'll write when we find something: new digs, stories from beneath, and previews before anyone else.",
      "",
      `In the meantime, start with our first dig, Refuge in Community: ${url}/curatorial/refuge-in-community`,
      "",
      "Art Digging",
      `${url} · Instagram ${site.instagramHandle}`,
      "",
      "Didn't sign up, or want to leave? Just reply to this email and we'll remove you.",
    ].join("\n"),
    html: frame(
      `<tr><td style="padding-top:28px;font-size:40px;line-height:1.1;font-weight:300;color:#ebe4d8">${escape(headline)}</td></tr>
<tr><td style="padding-top:20px;font-size:22px;line-height:1.4;font-style:italic;color:#c8743a">Every work holds a story.</td></tr>
<tr><td style="padding-top:28px;font:15px/1.7 Helvetica,Arial,sans-serif;color:#b9b2a6">We'll write when we find something: new digs, stories from beneath, and previews before anyone else.</td></tr>
<tr><td style="padding-top:32px"><a href="${url}/curatorial/refuge-in-community" style="display:inline-block;border:1px solid #4a443d;padding:14px 22px;font:12px/1 Helvetica,Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#ebe4d8;text-decoration:none">Start with Dig 001</a></td></tr>`,
      "Didn't sign up, or want to leave? Just reply to this email and we'll remove you.",
    ),
  });
}

// ── Proposal votes ───────────────────────────────────────────────────────────

export async function sendProposalVoteConfirmation(
  to: string,
  { proposalTitle, vote, name }: { proposalTitle: string; vote: "yes" | "no"; name?: string },
) {
  const greeting = name ? `Thank you, ${name}.` : "Thank you.";
  const said = vote === "yes" ? "You voted yes." : "You voted no.";
  const line =
    vote === "yes"
      ? "We'll keep you posted as the proposal moves forward."
      : "Every honest answer shapes what we build. We'll keep you posted on where it goes.";
  await send("proposal_vote_confirmation", {
    to,
    subject: `Your vote on ${proposalTitle}`,
    text: [
      greeting,
      "",
      `${said} Your vote on "${proposalTitle}" has been counted.`,
      "",
      line,
      "",
      "Questions? Just reply to this email.",
      "",
      "Art Digging",
      siteUrl(),
    ].join("\n"),
    html: frame(
      `<tr><td style="padding-top:28px;font-size:36px;line-height:1.15;font-weight:300;color:#ebe4d8">${escape(greeting)}</td></tr>
<tr><td style="padding-top:20px;font-size:22px;line-height:1.4;font-style:italic;color:#c8743a">${escape(said)}</td></tr>
<tr><td style="padding-top:28px;font:15px/1.7 Helvetica,Arial,sans-serif;color:#b9b2a6">Your vote on <em>${escape(proposalTitle)}</em> has been counted. ${escape(line)}</td></tr>`,
      "You're getting this because you asked for a confirmation when you voted. Questions? Just reply.",
    ),
  });
}

// ── Support form ─────────────────────────────────────────────────────────────

export async function sendSupportMessage(from: string, message: string) {
  await send("support_message", {
    to: supportInbox(),
    reply_to: from,
    subject: `Support message from ${from}`,
    text: `From: ${from}\n\n${message}`,
    html: `<p><strong>From:</strong> ${escape(from)}</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
  });
}

// ── Inbound mail to news@ ────────────────────────────────────────────────────

export type InboundEmail = {
  id: string;
  from: string;
  to: string[];
  cc: string[];
  subject: string;
  date: string;
  text: string;
  html: string;
  attachments: string[];
};

/** Rough HTML → text, used only when an email arrives without a text part. */
function htmlToText(html: string) {
  return html
    .replace(/<(script|style|head)[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h[1-6]|blockquote)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** The original's <body> contents, without anything executable. */
function safeBody(html: string) {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return body
    .replace(/<(script|style|iframe|object|embed|form)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|iframe|object|embed|link|meta)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

/**
 * Forwards a received email to SUPPORT_GMAIL. Sent from news@ with Reply-To set
 * to the original sender, so pressing Reply in Gmail answers them directly.
 * The Resend email id is used as the idempotency key, so webhook retries
 * don't produce duplicate forwards.
 */
export async function forwardInboundEmail(email: InboundEmail) {
  const sender = addressOf(email.from);
  const text = email.text.trim() || htmlToText(email.html) || "(no message body)";
  const details: [string, string][] = [
    ["From", email.from],
    ["To", email.to.join(", ")],
    ...(email.cc.length ? ([["Cc", email.cc.join(", ")]] as [string, string][]) : []),
    ["Date", email.date],
    ["Subject", email.subject || "(no subject)"],
    ...(email.attachments.length ? ([["Attachments", email.attachments.join(", ")]] as [string, string][]) : []),
  ];

  await send(
    "inbound_forward",
    {
      to: supportInbox(),
      reply_to: sender,
      subject: email.subject || "(no subject)",
      text: [
        `---------- Received at ${senderAddress()} ----------`,
        ...details.map(([k, v]) => `${k}: ${v}`),
        "",
        text,
        "",
        "----------",
        `Reply to this email to answer ${sender} directly.`,
      ].join("\n"),
      html: `<div style="font:13px/1.6 Helvetica,Arial,sans-serif;color:#555;border-left:3px solid #c8743a;padding:8px 14px;margin-bottom:20px;background:#f7f5f2">
<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8f877b;margin-bottom:6px">Received at ${escape(senderAddress())}</div>
${details.map(([k, v]) => `<div><strong style="color:#222">${k}:</strong> ${escape(v)}</div>`).join("\n")}
<div style="margin-top:6px;color:#8f877b">Reply to this email to answer ${escape(sender)} directly.</div>
</div>
${email.html ? safeBody(email.html) : `<div style="white-space:pre-wrap;font:14px/1.6 Helvetica,Arial,sans-serif">${escape(text)}</div>`}`,
    },
    `inbound-forward/${email.id}`,
  );
}
