import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import ExhibitionLinks from "@/components/ExhibitionLinks";
import OneAndMany, { type ResolvedChapter } from "@/components/OneAndMany";
import { findWork, getExhibition } from "@/lib/exhibitions";
import { getStory, stories } from "@/lib/stories";
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
  const exhibition = story.exhibitionSlug ? getExhibition(story.exhibitionSlug) : undefined;

  const chapters: ResolvedChapter[] =
    exhibition && story.chapters
      ? story.chapters.flatMap((c) => {
          const found = findWork(exhibition, c.workSlug);
          return found ? [{ ...c, work: found.work, artist: found.artist.name }] : [];
        })
      : [];

  return (
    <article className="pt-40 pb-32 sm:pt-48">
      <header className="shell">
        <div className="mx-auto max-w-3xl">
          <p className="label animate-rise">
            {story.kind} · {formatDate(story.publishedAt)}
          </p>
          <h1 className="mt-6 animate-rise font-serif text-6xl leading-[0.95] font-light text-bone [animation-delay:120ms] sm:text-8xl">
            {story.title}
          </h1>
          <p className="mt-8 animate-rise font-serif text-2xl leading-snug text-ember italic [animation-delay:240ms]">
            {story.excerpt}
          </p>
        </div>
      </header>

      {!chapters.length && story.image ? (
        <Reveal className="shell my-16">
          <Image
            src={story.image}
            alt={story.imageAlt ?? ""}
            width={1080}
            height={1080}
            className="mx-auto w-full max-w-md shadow-2xl shadow-black/60"
          />
        </Reveal>
      ) : null}

      <div className="shell mt-16">
        <div className="mx-auto max-w-2xl space-y-7 text-lg leading-8 text-bone/80">
          {story.body.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {chapters.length ? (
        <div className="shell mt-20">
          <OneAndMany chapters={chapters} />
        </div>
      ) : null}

      {story.outro ? (
        <div className="shell mt-24">
          <div className="mx-auto max-w-3xl space-y-8">
            {story.outro.map((p, i) => (
              <Reveal key={p} delay={i * 150}>
                <p className="font-serif text-3xl leading-snug font-light text-bone sm:text-4xl">{p}</p>
              </Reveal>
            ))}
            {exhibition ? (
              <Reveal>
                <p className="pt-8 font-serif text-4xl text-ember italic sm:text-5xl">{exhibition.line}</p>
              </Reveal>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="shell mt-24">
        <div className="mx-auto max-w-3xl">
          {exhibition?.video ? (
            <Reveal>
              <p className="label mb-6">Watch</p>
              <VideoEmbed
                youtubeId={exhibition.video.youtubeId}
                start={exhibition.video.start}
                title={`${exhibition.title}: video`}
              />
            </Reveal>
          ) : null}

          {exhibition ? (
            <div className="mt-16 space-y-5">
              <Link href={`/curatorial/${exhibition.slug}`} className="link-line">
                Dig {exhibition.number}: {exhibition.title} <span aria-hidden>→</span>
              </Link>
              <ExhibitionLinks exhibition={exhibition} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
