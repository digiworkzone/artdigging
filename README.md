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

## Before launch

- `lib/site.ts` has a placeholder contact email.
- `app/api/subscribe/route.ts` needs a mailing-list provider to actually store sign-ups.
