import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/types";
import { getArtist } from "@/lib/data";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const artist = getArtist(artwork.artistSlug);

  return (
    <Link href={`/artworks/${artwork.slug}`} className="group block">
      <div className="relative overflow-hidden bg-soil">
        <Image
          src={artwork.image}
          alt={artwork.imageAlt}
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.04] group-hover:opacity-40"
        />
        {/* The buried story surfaces on hover. */}
        <p className="absolute inset-x-6 bottom-6 translate-y-3 font-serif text-2xl leading-snug text-bone italic opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          {artwork.hook}
        </p>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl text-bone">{artwork.title}</h3>
        <span className="shrink-0 text-xs text-dust">{artwork.year}</span>
      </div>
      {artist ? <p className="mt-1 text-sm text-dust">{artist.name}</p> : null}
    </Link>
  );
}
