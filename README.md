# Art Digging

> Every work holds a story. We dig it up.

Contemporary African art, unearthed with the stories buried inside it.
Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                 routes: home, works, artists, stories, collections (+ detail pages)
app/api/subscribe    email sign-up endpoint (validates only; not stored yet)
components/          UI
lib/data.ts          all content: artists, artworks, stories, collections
lib/site.ts          site name, tagline, contact email
scripts/generate-art.mjs   regenerates placeholder art in public/images (`npm run art`)
```

## Before launch

- The artists, works and stories in `lib/data.ts` are **fictional placeholders**. Replace them with real, consented content and real artwork images.
- `lib/site.ts` has a placeholder contact email.
- `app/api/subscribe/route.ts` needs a mailing-list provider to actually store sign-ups.
