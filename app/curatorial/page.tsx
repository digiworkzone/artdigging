import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { exhibitions } from "@/lib/exhibitions";

export const metadata: Metadata = {
  title: "Curatorial",
  description: "Exhibitions curated by Art Digging.",
};

export default function CuratorialPage() {
  return (
    <>
      <PageIntro label="Curatorial" title="Digs" line="Exhibitions we have curated. Each one a site where we went looking." />
      <section className="shell pb-32">
        <div className="border-b border-bone/10">
          {exhibitions.map((ex) => (
            <Link
              key={ex.slug}
              href={`/curatorial/${ex.slug}`}
              className="group relative isolate grid gap-4 overflow-hidden border-t border-bone/10 py-12 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-10"
            >
              <Image
                src={ex.image}
                alt=""
                width={1600}
                height={1000}
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-30"
              />
              <span className="font-serif text-lg text-dust">Dig {ex.number}</span>
              <div>
                <h2 className="font-serif text-5xl text-bone transition-colors group-hover:text-ember sm:text-7xl">
                  {ex.title}
                </h2>
                <p className="mt-3 text-sm text-dust">
                  With {ex.presentedWith} · In collaboration with {ex.alongside.name}
                </p>
              </div>
              <span className="text-xs tracking-[0.2em] text-dust uppercase">{ex.period}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
