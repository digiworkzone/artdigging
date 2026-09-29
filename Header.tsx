import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/artworks", label: "Artworks" },
  { href: "/artists", label: "Artists" },
  { href: "/stories", label: "Stories" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link className="group flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center bg-charcoal text-lg font-semibold text-cream">
            AD
          </span>
          <span>
            <span className="block font-serif text-2xl leading-none text-charcoal">
              Art Digging
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 sm:block">
              African art discovery
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium text-stone-700 transition hover:text-charcoal"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            className="text-sm font-semibold text-stone-700 hover:text-charcoal"
            href="/login"
          >
            Login
          </Link>
          <Link className="btn btn-primary px-5 py-3 text-sm" href="/register">
            Join
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary
            aria-label="Open navigation menu"
            className="flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-1.5 border border-charcoal/15 bg-white"
          >
            <span className="h-0.5 w-5 bg-charcoal" />
            <span className="h-0.5 w-5 bg-charcoal" />
            <span className="h-0.5 w-5 bg-charcoal" />
          </summary>
          <div className="absolute right-0 top-14 w-[min(88vw,22rem)] border border-charcoal/10 bg-white p-4 shadow-xl">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  className="px-3 py-3 text-sm font-medium text-stone-700 hover:bg-beige hover:text-charcoal"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="px-3 py-3 text-sm font-medium text-stone-700 hover:bg-beige hover:text-charcoal"
                href="/login"
              >
                Login
              </Link>
              <Link className="btn btn-primary mt-3 justify-center" href="/register">
                Join the Community
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
