import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks, getArtist, getArtwork, worksBy } from "@/lib/data";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = getArtwork((await params).slug);
  return artwork ? { title: artwork.title, description: artwork.hook } : {};
}

export default async function ArtworkPage({ params }: Props) {
  const artwork = getArtwork((await params).slug);
  if (!artwork) notFound();
  const artist = getArtist(artwork.artistSlug);
  const more = worksBy(artwork.artistSlug).filter((a) => a.slug !== artwork.slug);
  const subject = encodeURIComponent(`Inquiry: ${artwork.title}`);

  return (
    <>
      <article className="shell grid gap-12 pt-28 pb-32 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pt-36">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Image
            src={artwork.image}
            alt={artwork.imageAlt}
            width={800}
            height={1000}
            priority
            className="aspect-[4/5] w-full animate-rise object-cover"
          />
        </div>

        <div className="lg:pt-12">
          <p className="label animate-rise">{artwork.availability}</p>
          <h1 className="mt-5 animate-rise font-serif text-5xl leading-[0.95] font-light text-bone [animation-delay:100ms] sm:text-7xl">
            {artwork.title}
          </h1>
          {artist ? (
            <Link
              href={`/artists/${artist.slug}`}
              className="mt-4 inline-block animate-rise text-dust transition-colors [animation-delay:200ms] hover:text-ember"
            >
              {artist.name}
            </Link>
          ) : null}

          <p className="mt-14 animate-rise font-serif text-3xl leading-snug text-ember italic [animation-delay:300ms]">
            {artwork.hook}
          </p>

          <div className="mt-10 space-y-6 text-lg leading-8 text-bone/80">
            {artwork.story.map((p) => (
              <Reveal key={p}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-bone/10 pt-8 text-sm">
            <div>
              <dt className="label">Year</dt>
              <dd className="mt-2 text-bone">{artwork.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="label">Medium</dt>
              <dd className="mt-2 text-bone">{artwork.medium}</dd>
            </div>
            <div className="col-span-3">
              <dt className="label">Size</dt>
              <dd className="mt-2 text-bone">{artwork.dimensions}</dd>
            </div>
          </dl>

          <a
            href={`mailto:${site.contactEmail}?subject=${subject}`}
            className="mt-12 inline-flex border border-bone/25 px-8 py-4 text-xs tracking-[0.25em] text-bone uppercase transition-colors hover:border-ember hover:text-ember"
          >
            Ask about this work
          </a>
        </div>
      </article>

      {more.length && artist ? (
        <section className="shell border-t border-bone/10 py-24">
          <p className="label mb-12">More from {artist.name}</p>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
