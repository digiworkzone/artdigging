import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/types";

export default function CollectionRow({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-6 overflow-hidden border-t border-bone/10 py-10 sm:gap-10"
    >
      <Image
        src={collection.image}
        alt=""
        width={800}
        height={1000}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-25"
      />
      <span className="font-serif text-lg text-dust">0{index + 1}</span>
      <div>
        <h3 className="font-serif text-4xl text-bone transition-colors group-hover:text-ember sm:text-6xl">
          {collection.title}
        </h3>
        <p className="mt-2 text-sm text-dust">{collection.line}</p>
      </div>
      <span className="text-xs tracking-[0.2em] text-dust uppercase">
        {collection.artworkSlugs.length} works
      </span>
    </Link>
  );
}
