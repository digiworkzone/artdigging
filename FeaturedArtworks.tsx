import ArtworkCard from "@/components/ArtworkCard";
import SectionHeader from "@/components/SectionHeader";
import { artworks } from "@/lib/data";

export default function FeaturedArtworks() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Collector preview"
        title="Original works with context attached"
        description="Preview available and inquiry-only works from emerging African artists, each connected to artist story and collection context."
        href="/artworks"
        action="Explore the art"
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {artworks.slice(0, 3).map((artwork) => (
          <ArtworkCard artwork={artwork} key={artwork.slug} />
        ))}
      </div>
    </section>
  );
}
