import Link from "next/link";
import MobileNav from "@/components/MobileNav";

const navItems = [
  { href: "/artworks", label: "Works" },
  { href: "/artists", label: "Artists" },
  { href: "/stories", label: "Stories" },
  { href: "/collections", label: "Collections" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-void/90 to-transparent">
      <div className="shell flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-wide text-bone">
          Art Digging
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-[0.25em] text-dust uppercase transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="border border-bone/20 px-5 py-2.5 text-xs tracking-[0.25em] text-bone uppercase transition-colors hover:border-ember hover:text-ember"
          >
            Join
          </Link>
        </nav>

        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
