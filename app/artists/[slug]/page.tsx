import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ArtworkCard from "@/components/ArtworkCard";
import StoryCard from "@/components/StoryCard";
import { artists, getArtist, stories, worksBy } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = getArtist((await params).slug);
  return artist ? { title: artist.name, description: artist.line } : {};
}

export default async function ArtistPage({ params }: Props) {
  const artist = getArtist((await params).slug);
  if (!artist) notFound();
  const works = worksBy(artist.slug);
  const story = stories.find((s) => s.artistSlug === artist.slug);

  return (
    <>
      <section className="shell grid gap-12 pt-36 pb-24 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-20 md:pt-44">
        <div className="mx-auto w-full max-w-sm animate-rise overflow-hidden rounded-full">
          <Image
            src={artist.image}
            alt={artist.imageAlt}
            width={900}
            height={900}
            priority
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <p className="label animate-rise">
            {artist.place} · {artist.medium}
          </p>
          <h1 className="mt-5 animate-rise font-serif text-6xl leading-[0.95] font-light text-bone [animation-delay:100ms] sm:text-8xl">
            {artist.name}
          </h1>
          <p className="mt-8 animate-rise font-serif text-2xl text-ember italic [animation-delay:200ms]">
            {artist.line}
          </p>
          <div className="mt-8 max-w-xl space-y-5 leading-8 text-bone/75">
            {artist.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="shell border-t border-bone/10 py-24">
        <p className="label mb-12">Works</p>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <Reveal key={w.slug} delay={i * 120}>
              <ArtworkCard artwork={w} />
            </Reveal>
          ))}
        </div>
      </section>

      {story ? (
        <section className="border-t border-bone/10 bg-soil py-24">
          <div className="shell">
            <p className="label mb-10">Their story</p>
            <StoryCard story={story} />
          </div>
        </section>
      ) : null}
    </>
  );
}
