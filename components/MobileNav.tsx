"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex size-11 flex-col items-end justify-center gap-1.5"
      >
        <span className={`h-px w-6 bg-bone transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
        <span className={`h-px bg-bone transition ${open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"}`} />
      </button>
      {open ? (
        <nav
          aria-label="Mobile"
          className="fixed inset-x-0 top-20 grid gap-1 border-t border-bone/10 bg-void/95 px-5 py-8 backdrop-blur"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 font-serif text-3xl text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#join"
            onClick={() => setOpen(false)}
            className="mt-4 py-3 text-sm tracking-[0.25em] text-ember uppercase"
          >
            Join
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
