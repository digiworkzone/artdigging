import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ArtworkCard from "@/components/ArtworkCard";
import { getArtist, getStory, stories, worksBy } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = getStory((await params).slug);
  return story ? { title: story.title, description: story.excerpt } : {};
}

export default async function StoryPage({ params }: Props) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  const artist = getArtist(story.artistSlug);
  const works = worksBy(story.artistSlug);

  return (
    <>
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden">
        <Image src={story.image} alt={story.imageAlt} fill priority className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/60 to-void/30" />
        <div className="shell pb-16">
          <p className="label animate-rise">
            {story.kind} · {formatDate(story.publishedAt)}
          </p>
          <h1 className="mt-5 max-w-4xl animate-rise font-serif text-6xl leading-[0.95] font-light text-bone [animation-delay:100ms] sm:text-8xl">
            {story.title}
          </h1>
        </div>
      </section>

      <article className="shell py-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-serif text-2xl leading-snug text-ember italic">{story.excerpt}</p>
          <div className="mt-12 space-y-7 text-lg leading-8 text-bone/80">
            {story.body.map((p) => (
              <Reveal key={p}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          {artist ? (
            <Link href={`/artists/${artist.slug}`} className="link-line mt-16">
              {artist.name} <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
      </article>

      {works.length ? (
        <section className="shell border-t border-bone/10 py-24">
          <p className="label mb-12">The works</p>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w) => (
              <ArtworkCard key={w.slug} artwork={w} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
