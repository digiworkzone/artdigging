import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/types";
import { cn } from "@/lib/utils";

const availabilityStyles: Record<Artwork["availability"], string> = {
  Available: "border-olive/30 bg-olive/10 text-olive",
  "Inquiry Only": "border-gold/40 bg-gold/10 text-charcoal",
  "Coming Soon": "border-clay/30 bg-clay/10 text-clay",
};

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-charcoal/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/artworks/${artwork.slug}`} aria-label={`View ${artwork.title}`}>
        <Image
          src={artwork.image}
          alt={artwork.imageAlt}
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl text-charcoal">
              <Link href={`/artworks/${artwork.slug}`}>{artwork.title}</Link>
            </h3>
            <Link
              className="mt-1 block text-sm text-stone-600 hover:text-charcoal"
              href={`/artists/${artwork.artistSlug}`}
            >
              {artwork.artist}
            </Link>
          </div>
          <span
            className={cn(
              "shrink-0 border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
              availabilityStyles[artwork.availability],
            )}
          >
            {artwork.availability}
          </span>
        </div>
        <dl className="grid gap-2 text-sm text-stone-600">
          <div className="flex justify-between gap-4 border-t border-stone-200 pt-3">
            <dt>Year</dt>
            <dd className="text-charcoal">{artwork.year}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Medium</dt>
            <dd className="max-w-[70%] text-right text-charcoal">
              {artwork.medium}
            </dd>
          </div>
        </dl>
        <Link
          className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-clay"
          href={`/artworks/${artwork.slug}`}
        >
          View Artwork
        </Link>
      </div>
    </article>
  );
}
