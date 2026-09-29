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
              className="group grid gap-6 border-t border-bone/10 py-12 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-10"
            >
              <span className="font-serif text-lg text-dust">Dig {ex.number}</span>
              <div>
                <h2 className="font-serif text-5xl text-bone transition-colors group-hover:text-ember sm:text-7xl">
                  {ex.title}
                </h2>
                <p className="mt-3 text-sm text-dust">
                  {ex.period} · With {ex.presentedWith} · In collaboration with {ex.alongside.name}
                </p>
              </div>
              <Image
                src={ex.poster}
                alt=""
                width={1080}
                height={1080}
                className="w-28 rotate-3 shadow-xl shadow-black/60 transition duration-700 group-hover:rotate-0 sm:w-36"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
