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

## Before launch

- `lib/site.ts` has a placeholder contact email.
