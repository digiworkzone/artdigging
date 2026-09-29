import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ArtworkCard from "@/components/ArtworkCard";
import ArtistCard from "@/components/ArtistCard";
import StoryCard from "@/components/StoryCard";
import CollectionRow from "@/components/CollectionRow";
import NewsletterSignup from "@/components/NewsletterSignup";
import { artists, artworks, collections, stories } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="shell py-32 sm:py-48">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center font-serif text-3xl leading-snug font-light text-bone sm:text-5xl">
            Beneath every surface there is a river, a harvest, a workshop, a
            name. <span className="text-dust italic">We go looking.</span>
          </p>
        </Reveal>
      </section>

      <section id="unearthed" className="shell scroll-mt-24 pb-32">
        <SectionHeader label="Unearthed" title="Recent finds" href="/artworks" action="All works" />
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.slice(0, 3).map((artwork, i) => (
            <Reveal key={artwork.slug} delay={i * 120}>
              <ArtworkCard artwork={artwork} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-bone/10 bg-soil py-32">
        <div className="shell">
          <Reveal>
            <p className="label mb-10">From beneath</p>
            <StoryCard story={stories[0]} />
          </Reveal>
        </div>
      </section>

      <section className="shell py-32">
        <SectionHeader label="The hands" title="Artists" href="/artists" action="Meet them" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <Reveal key={artist.slug} delay={i * 100}>
              <ArtistCard artist={artist} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-16">
        <SectionHeader label="Layers" title="Collections" />
        <div className="border-b border-bone/10">
          {collections.map((collection, i) => (
            <CollectionRow key={collection.slug} collection={collection} index={i} />
          ))}
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
