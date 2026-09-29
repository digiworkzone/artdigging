import CollectionCard from "@/components/CollectionCard";
import SectionHeader from "@/components/SectionHeader";
import { collections } from "@/lib/data";

export default function FeaturedCollections() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Curated entry points"
        title="Collections shaped around story, material, and place"
        description="Explore focused edits that help collectors understand what connects the works beyond the wall."
        href="/collections"
        action="View all collections"
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-2 lg:px-8">
        {collections.slice(0, 4).map((collection) => (
          <CollectionCard
            collection={collection}
            key={collection.slug}
            worksCount={collection.artworkSlugs.length}
          />
        ))}
      </div>
    </section>
  );
}
