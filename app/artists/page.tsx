import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import ArtistCard from "@/components/ArtistCard";
import { artists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artists",
  description: "The hands behind the works.",
};

export default function ArtistsPage() {
  return (
    <>
      <PageIntro label="Artists" title="The hands" line="Every one of them is digging too." />
      <section className="shell pb-32">
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <Reveal key={artist.slug} delay={i * 100}>
              <ArtistCard artist={artist} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
