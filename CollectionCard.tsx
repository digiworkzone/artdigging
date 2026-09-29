import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/types";

export default function CollectionCard({
  collection,
  worksCount,
}: {
  collection: Collection;
  worksCount: number;
}) {
  return (
    <article className="group grid overflow-hidden border border-charcoal/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/collections/${collection.slug}`}
        aria-label={`Explore ${collection.title}`}
      >
        <Image
          src={collection.image}
          alt={collection.imageAlt}
          width={1000}
          height={688}
          className="aspect-[16/11] w-full object-cover"
        />
      </Link>
      <div className="p-6">
        <p className="eyebrow">{worksCount} works</p>
        <h3 className="mt-2 font-serif text-3xl text-charcoal">
          <Link href={`/collections/${collection.slug}`}>
            {collection.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm font-semibold text-clay">
          {collection.theme}
        </p>
        <p className="mt-4 text-sm leading-6 text-stone-700">
          {collection.description}
        </p>
        <Link
          className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-charcoal"
          href={`/collections/${collection.slug}`}
        >
          Explore Collection
        </Link>
      </div>
    </article>
  );
}
