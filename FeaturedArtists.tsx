import ArtistCard from "@/components/ArtistCard";
import SectionHeader from "@/components/SectionHeader";
import { artists } from "@/lib/data";

export default function FeaturedArtists() {
  return (
    <section className="section bg-white">
      <SectionHeader
        eyebrow="Artist discovery"
        title="Meet artists with practices worth following"
        description="Each profile brings together biography, practice notes, recognition, and featured works."
        href="/artists"
        action="Browse artists"
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {artists.map((artist) => (
          <ArtistCard artist={artist} key={artist.slug} />
        ))}
      </div>
    </section>
  );
}
