import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <div className="overflow-hidden rounded-full bg-soil">
        <Image
          src={artist.image}
          alt={artist.imageAlt}
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-110 group-hover:rotate-6"
        />
      </div>
      <h3 className="mt-6 text-center font-serif text-2xl text-bone">{artist.name}</h3>
      <p className="mt-1 text-center text-xs tracking-[0.2em] text-dust uppercase">
        {artist.place}
      </p>
    </Link>
  );
}
