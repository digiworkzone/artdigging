import Link from "next/link";

const footerLinks = [
  { href: "/artworks", label: "Artworks" },
  { href: "/artists", label: "Artists" },
  { href: "/stories", label: "Stories" },
  { href: "/collections", label: "Collections" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Talk to us" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/15 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link className="font-serif text-3xl" href="/">
            Art Digging
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-cream/70">
            Discover African art through stories, artists, curated collections,
            and a collector community built around authentic discovery.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Explore
          </h2>
          <nav className="mt-4 grid gap-3" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                className="text-sm text-cream/75 hover:text-cream"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Collector Preview
          </h2>
          <p className="mt-4 text-sm leading-6 text-cream/70">
            Join for early collection notes, artist updates, and first access to
            curated artwork previews.
          </p>
          <Link className="mt-6 inline-flex text-sm font-semibold text-gold" href="/community">
            Join the Community
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/55">
        © 2026 Art Digging. Culture, context, and collecting in one place.
      </div>
    </footer>
  );
}
