import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Works",
  description: "Original works, each with the story beneath it.",
};

export default function ArtworksPage() {
  return (
    <>
      <PageIntro label="Works" title="Unearthed" line="Hover a work. The story is underneath." />
      <section className="shell pb-32">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork, i) => (
            <Reveal key={artwork.slug} delay={(i % 3) * 120}>
              <ArtworkCard artwork={artwork} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
