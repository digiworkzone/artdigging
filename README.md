# Art Digging

> Every work holds a story. We dig it up.

Art Digging explores and curates contemporary art and the stories buried inside it.
Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                  routes: home, /stories, /curatorial (+ detail pages)
app/api/subscribe     email sign-up endpoint (validates only; not stored yet)
components/           UI (Logo.tsx is the Art Digging mark as an inline SVG)
lib/exhibitions.ts    curated exhibitions ("digs")
lib/stories.ts        stories
lib/site.ts           site name, tagline, Instagram, contact email
public/images/        real images only
```

## Adding content

- **Exhibition pieces:** in `lib/exhibitions.ts`, each artist has `works`
  (title, year, medium, dimensions, note, image + its pixel width/height).
  Images live in `public/images/curatorial/<exhibition>/`.
- **Stories:** add entries to `lib/stories.ts`. `image` is optional. A story with
  `chapters` renders as an I / We story: each chapter pairs a question and a work
  from the exhibition with two readings, `one` (I) and `many` (We).
- **New exhibition:** add another entry to `exhibitions` with the next `number`.

## Sign-ups (Google Sheets + Resend)

When someone joins, `/api/subscribe` checks the **Subscribers** tab of a Google Sheet.
If the email is new it adds a row and Resend sends the welcome email (`lib/email.ts`).
If it is already there, the visitor can send a message instead (`/api/support`), which
is saved to the **Messages** tab and emailed to `SUPPORT_EMAIL`. All variables are
listed in `.env.example`.

**Google Sheet**
1. Create a sheet with two tabs, named exactly:
   - `Subscribers` with headers `Email | Joined | Page | Name` in row 1
   - `Messages` with headers `Date | Email | Message` in row 1
   - `Votes` with headers `Date | Proposal | Vote | Name` in row 1 (proposal polls)
2. In Google Cloud Console: create a project, enable the **Google Sheets API**, then
   create a **service account** and a **JSON key** for it.
3. Share the sheet with the service account's email as **Editor**.
4. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` (the `private_key` from
   the JSON) and `GOOGLE_SHEET_ID` (from the sheet URL).

**Resend**
1. Add and verify a sending domain in Resend, e.g. `hello.artdigging.com` (it gives DNS records to add at the
   domain's DNS provider).
2. Create an API key; set `RESEND_API_KEY`, `RESEND_FROM` and `SUPPORT_EMAIL`.

Add the variables in Vercel → Settings → Environment Variables, then redeploy.
Until the Google variables are set, the form shows "Sign-up is not available yet."

## Proposals (proposal.artdigging.com)

Private, code-locked proposal pages. `proxy.ts` maps `proposal.artdigging.com/<slug>`
to `app/proposals/[slug]`. Content lives in `lib/proposals.ts`; codes live only in
the `PROPOSAL_CODES` env var (`slug:CODE,slug:CODE`), so they never touch the repo.
The page is only rendered after the code is checked on the server; an httpOnly
cookie keeps it open for 90 days, and changing a code locks everyone out again.
Proposals are `noindex` and disallowed in `robots.txt`.

The subdomain root (`proposal.artdigging.com`) also has a code box: a code alone
opens the proposal it belongs to, so codes must be unique across proposals.

Each proposal ends with a yes/no poll (`/api/proposals/vote`). Only visitors who
entered the code can vote, once per device (cookie), with a name or anonymously.
Votes go to the `Votes` tab; results are shown only after voting.

To add one: add an entry to `proposals` in `lib/proposals.ts`, add `slug:CODE` to
`PROPOSAL_CODES` in Vercel, redeploy, and send the link with the code.

## Before launch

- `lib/site.ts` has a placeholder contact email.
