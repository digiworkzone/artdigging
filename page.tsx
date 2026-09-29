import type { Metadata } from "next";
import ArtistCard from "@/components/ArtistCard";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import { artists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Discover African artists through biographies, practice notes, featured works, and original stories.",
};

export default function ArtistsPage() {
  return (
    <>
      <section className="border-b border-charcoal/10 bg-cream py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow">Artist directory</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-charcoal sm:text-6xl">
            Discover artists shaping contemporary African art
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
            Browse profiles designed to help collectors understand practice,
            context, materials, and recognition.
          </p>
        </div>
      </section>
      <section className="section">
        <SectionHeader
          title="Featured artist stories"
          description="Each card opens into a fuller profile with works, recognition, and inquiry paths."
        />
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {artists.map((artist) => (
            <ArtistCard artist={artist} key={artist.slug} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
