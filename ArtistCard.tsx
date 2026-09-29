import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <article className="group grid h-full overflow-hidden border border-charcoal/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/artists/${artist.slug}`} aria-label={`View ${artist.name}`}>
        <Image
          src={artist.image}
          alt={artist.portraitAlt}
          width={900}
          height={720}
          className="aspect-[5/4] w-full object-cover"
        />
      </Link>
      <div className="flex flex-col p-5">
        <p className="eyebrow">
          {artist.location}, {artist.country}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-charcoal">
          <Link href={`/artists/${artist.slug}`}>{artist.name}</Link>
        </h3>
        <p className="mt-2 text-sm font-medium text-clay">{artist.medium}</p>
        <p className="mt-4 flex-1 text-sm leading-6 text-stone-700">
          {artist.summary}
        </p>
        <Link
          className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal"
          href={`/artists/${artist.slug}`}
        >
          View Artist Story
        </Link>
      </div>
    </article>
  );
}
