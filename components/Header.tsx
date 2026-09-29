import Link from "next/link";
import Logo from "@/components/Logo";

const navItems = [
  { href: "/stories", label: "Stories" },
  { href: "/curatorial", label: "Curatorial" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bone/5 bg-void/80 backdrop-blur-md">
      <div className="shell flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 text-bone" aria-label="Art Digging, home">
          <Logo className="h-9 w-auto transition-colors group-hover:text-ember" />
          <span className="hidden font-serif text-2xl tracking-wide sm:inline">Art Digging</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-10">
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
            className="hidden border border-bone/20 px-5 py-2.5 text-xs tracking-[0.25em] text-bone uppercase transition-colors hover:border-ember hover:text-ember sm:inline-flex"
          >
            Join
          </Link>
        </nav>
      </div>
    </header>
  );
}
