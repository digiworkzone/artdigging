import Image from "next/image";
import Link from "next/link";
import type { Exhibition } from "@/lib/exhibitions";

export default function ExhibitionFeature({ exhibition }: { exhibition: Exhibition }) {
  return (
    <Link
      href={`/curatorial/${exhibition.slug}`}
      className="group grid items-center gap-14 md:grid-cols-[1.2fr_1fr] md:gap-20"
    >
      <div>
        <p className="label">Curatorial · Dig {exhibition.number}</p>
        <h2 className="mt-5 font-serif text-6xl leading-[0.92] font-light text-bone transition-colors group-hover:text-ember sm:text-8xl">
          {exhibition.title}
        </h2>
        <p className="mt-6 max-w-md font-serif text-2xl text-dust italic">{exhibition.line}</p>
        <div className="mt-10 flex flex-col gap-2 text-xs tracking-[0.2em] text-dust uppercase">
          <span>Curated by {exhibition.curatedBy}</span>
          <span>With {exhibition.presentedWith} · {exhibition.alongside.name}</span>
          <span>{exhibition.period}</span>
        </div>
      </div>
      <Image
        src={exhibition.poster}
        alt={exhibition.posterAlt}
        width={1080}
        height={1080}
        className="w-full max-w-md -rotate-2 shadow-2xl shadow-black/70 transition duration-700 group-hover:rotate-0 md:justify-self-end"
      />
    </Link>
  );
}
