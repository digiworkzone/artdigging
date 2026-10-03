import { createSign } from "node:crypto";

// Minimal Google Sheets client using a service account (no SDK).
// Needs GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID.
// The sheet must be shared with the service account email as an Editor.

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

let cached: { token: string; expires: number } | null = null;

function config() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Accepts the key with or without surrounding quotes, and with literal "\n"s.
  const key = process.env.GOOGLE_PRIVATE_KEY?.trim()
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!email || !key || !sheetId) return null;
  return { email, key, sheetId };
}

export function sheetsConfigured() {
  return config() !== null;
}

async function accessToken() {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const cfg = config();
  if (!cfg) throw new Error("Google Sheets is not configured");

  const now = Math.floor(Date.now() / 1000);
  const encode = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: cfg.email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(cfg.key).toString("base64url");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Google auth failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: data.access_token, expires: Date.now() + data.expires_in * 1000 };
  return cached.token;
}

async function sheetsFetch(path: string, init?: RequestInit) {
  const cfg = config();
  if (!cfg) throw new Error("Google Sheets is not configured");
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cfg.sheetId}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) throw new Error(`Google Sheets error: ${res.status} ${await res.text()}`);
  return res.json();
}

/** Reads one column, e.g. column("Subscribers", "A"). */
export async function readColumn(tab: string, col: string): Promise<string[]> {
  const range = encodeURIComponent(`${tab}!${col}:${col}`);
  const data = (await sheetsFetch(`values/${range}`)) as { values?: string[][] };
  return (data.values ?? []).map((row) => row[0] ?? "");
}

/** Appends one row. RAW input, so nothing a visitor types is run as a formula. */
export async function appendRow(tab: string, row: string[]) {
  const range = encodeURIComponent(`${tab}!A1`);
  await sheetsFetch(`values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [row] }),
  });
}

/** Reads a block of columns, e.g. readRows("Votes", "B", "C"). */
export async function readRows(tab: string, from: string, to: string): Promise<string[][]> {
  const range = encodeURIComponent(`${tab}!${from}:${to}`);
  const data = (await sheetsFetch(`values/${range}`)) as { values?: string[][] };
  return data.values ?? [];
}
