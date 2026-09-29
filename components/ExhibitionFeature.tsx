import Image from "next/image";
import Link from "next/link";
import type { Exhibition } from "@/lib/exhibitions";

export default function ExhibitionFeature({ exhibition }: { exhibition: Exhibition }) {
  return (
    <Link
      href={`/curatorial/${exhibition.slug}`}
      className="group relative isolate flex min-h-[80svh] items-end overflow-hidden"
    >
      <Image
        src={exhibition.image}
        alt=""
        fill
        className="-z-10 object-cover transition duration-[2s] ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/50 to-void/80" />
      <div className="shell pb-16 sm:pb-24">
        <p className="label">Curatorial · Dig {exhibition.number}</p>
        <h2 className="mt-5 font-serif text-6xl leading-[0.92] font-light text-bone transition-colors group-hover:text-ember sm:text-8xl">
          {exhibition.title}
        </h2>
        <p className="mt-6 max-w-xl font-serif text-2xl text-dust italic">{exhibition.line}</p>
        <div className="mt-10 flex flex-col gap-2 text-xs tracking-[0.2em] text-dust uppercase sm:flex-row sm:gap-8">
          <span>Curated by {exhibition.curatedBy}</span>
          <span>With {exhibition.alongside.name}</span>
          <span>{exhibition.period}</span>
        </div>
      </div>
    </Link>
  );
}
