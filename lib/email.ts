import { site } from "@/lib/site";

// Sends email through Resend's REST API (no SDK).
// Needs RESEND_API_KEY and RESEND_FROM (e.g. "Art Digging <hello@artdigging.com>"),
// whose domain must be verified in Resend.

const siteUrl = () => process.env.SITE_URL ?? "https://artdigging.com";

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
}

async function send(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: process.env.RESEND_FROM, ...payload }),
  });
  if (!res.ok) throw new Error(`Resend error: ${res.status} ${await res.text()}`);
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendWelcome(to: string) {
  const url = siteUrl();
  await send({
    to,
    reply_to: process.env.SUPPORT_EMAIL ?? site.contactEmail,
    subject: "You're on the list",
    text: [
      "You're on the list.",
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
    html: `<!doctype html>
<html><body style="margin:0;background:#0b0a09;color:#ebe4d8;font-family:Georgia,'Times New Roman',serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0a09"><tr><td align="center" style="padding:56px 24px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
<tr><td style="font:11px/1 Helvetica,Arial,sans-serif;letter-spacing:4px;text-transform:uppercase;color:#8f877b">Art Digging</td></tr>
<tr><td style="padding-top:28px;font-size:40px;line-height:1.1;font-weight:300;color:#ebe4d8">You're on the list.</td></tr>
<tr><td style="padding-top:20px;font-size:22px;line-height:1.4;font-style:italic;color:#c8743a">Every work holds a story.</td></tr>
<tr><td style="padding-top:28px;font:15px/1.7 Helvetica,Arial,sans-serif;color:#b9b2a6">We'll write when we find something: new digs, stories from beneath, and previews before anyone else.</td></tr>
<tr><td style="padding-top:32px"><a href="${url}/curatorial/refuge-in-community" style="display:inline-block;border:1px solid #4a443d;padding:14px 22px;font:12px/1 Helvetica,Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#ebe4d8;text-decoration:none">Start with Dig 001</a></td></tr>
<tr><td style="padding-top:48px;border-bottom:1px solid #2a2622"></td></tr>
<tr><td style="padding-top:20px;font:12px/1.7 Helvetica,Arial,sans-serif;color:#8f877b"><a href="${url}" style="color:#8f877b">artdigging.com</a> · <a href="${site.instagram}" style="color:#8f877b">Instagram ${site.instagramHandle}</a><br>Didn't sign up, or want to leave? Just reply to this email and we'll remove you.</td></tr>
</table></td></tr></table></body></html>`,
  });
}

export async function sendSupportMessage(from: string, message: string) {
  await send({
    to: process.env.SUPPORT_EMAIL ?? site.contactEmail,
    reply_to: from,
    subject: `Support message from ${from}`,
    text: `From: ${from}\n\n${message}`,
    html: `<p><strong>From:</strong> ${escape(from)}</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
  });
}
