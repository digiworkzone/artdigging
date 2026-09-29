import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { exhibitions, getExhibition } from "@/lib/exhibitions";
import VideoEmbed from "@/components/VideoEmbed";
import ExhibitionLinks from "@/components/ExhibitionLinks";
import { stories } from "@/lib/stories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return exhibitions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ex = getExhibition((await params).slug);
  return ex
    ? { title: ex.title, description: `${ex.line} Curated by ${ex.curatedBy}, in collaboration with ${ex.alongside.name}.` }
    : {};
}

export default async function ExhibitionPage({ params }: Props) {
  const ex = getExhibition((await params).slug);
  if (!ex) notFound();
  const story = stories.find((s) => s.exhibitionSlug === ex.slug && s.chapters);

  const record = [
    { term: "Format", value: ex.format },
    { term: "Site", value: `${ex.site}, ${ex.address}` },
    { term: "Period", value: ex.period },
    ...ex.events.map((e) => ({ term: e.name, value: `${e.date}, ${e.time}` })),
    { term: "Curated by", value: ex.curatedBy },
    { term: "Presented with", value: ex.presentedWith },
    {
      term: "In collaboration with",
      value: `${ex.alongside.name}: ${ex.alongside.theme}, ${ex.alongside.site}, ${ex.alongside.period}`,
    },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_60%,rgba(200,116,58,0.18),transparent_55%)]" />
        <div className="shell grid min-h-[100svh] items-center gap-14 pt-32 pb-20 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <p className="label animate-rise">Curatorial · Dig {ex.number}</p>
            <h1 className="mt-6 animate-rise font-serif text-6xl leading-[0.9] font-light text-bone [animation-delay:120ms] sm:text-8xl lg:text-9xl">
              {ex.title}
            </h1>
            <p className="mt-8 animate-rise font-serif text-2xl text-ember italic [animation-delay:260ms] sm:text-3xl">
              {ex.line}
            </p>
          </div>
          {/* Found at the site: the partnership poster. */}
          <figure className="animate-rise [animation-delay:400ms] lg:justify-self-end">
            <Image
              src={ex.poster}
              alt={ex.posterAlt}
              width={1080}
              height={1080}
              priority
              className="w-full max-w-md rotate-2 shadow-2xl shadow-black/70"
            />
            <figcaption className="label mt-6">Found at the site · Partnership poster</figcaption>
          </figure>
        </div>
      </section>

      {/* The dig record: where, when, and who dug. */}
      <section className="shell py-24">
        <p className="label mb-10">Dig record</p>
        <dl className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {record.map((r) => (
            <div key={r.term} className="bg-void p-6">
              <dt className="label">{r.term}</dt>
              <dd className="mt-3 leading-6 text-bone">{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell py-24">
        <div className="mx-auto max-w-2xl space-y-6 text-lg leading-8 text-bone/75">
          {ex.statement.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-24 sm:py-36">
        <div className="mx-auto max-w-4xl space-y-10">
          {ex.questions.map((q, i) => (
            <Reveal key={q} delay={i * 150}>
              <p
                className={`font-serif text-4xl leading-tight font-light sm:text-6xl ${
                  i === ex.questions.length - 1 ? "text-ember italic" : "text-bone"
                }`}
              >
                {q}
              </p>
            </Reveal>
          ))}
          {story ? (
            <Reveal>
              <Link href={`/stories/${story.slug}`} className="link-line pt-6">
                Read the story: {story.title} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          ) : null}
        </div>
      </section>

      {ex.video ? (
        <section id="watch" className="shell scroll-mt-24 py-24">
          <p className="label mb-4">Watch</p>
          <p className="mb-12 font-serif text-xl text-dust italic">Step inside the dig.</p>
          <Reveal>
            <VideoEmbed youtubeId={ex.video.youtubeId} start={ex.video.start} title={`${ex.title}: video`} />
          </Reveal>
        </section>
      ) : null}

      {/* Each artist is a layer in the dig; their pieces sit inside it. */}
      <section id="finds" className="shell scroll-mt-24 py-24">
        <p className="label mb-4">The finds</p>
        <p className="mb-14 font-serif text-xl text-dust italic">
          {ex.artists.length} artists, {ex.artists.reduce((n, a) => n + a.works.length, 0)} works, one ground.
        </p>
        <div className="border-b border-bone/10">
          {ex.artists.map((artist, i) => (
            <div key={artist.slug} id={artist.slug} className="scroll-mt-24 border-t border-bone/10 py-16">
              <Reveal className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
                <Image
                  src={artist.portrait}
                  alt={`Portrait of ${artist.name}`}
                  width={400}
                  height={400}
                  className="size-28 rounded-full object-cover grayscale sm:size-36"
                />
                <div>
                  <p className="font-serif text-lg text-dust">0{i + 1}</p>
                  <h2 className="mt-1 font-serif text-4xl text-bone sm:text-6xl">{artist.name}</h2>
                  <div className="mt-6 max-w-2xl space-y-4 leading-7 text-bone/70">
                    {artist.bio.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
              <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2">
                {artist.works.map((w, j) => (
                  <Reveal key={w.slug} delay={j * 120}>
                    <figure id={w.slug} className="scroll-mt-24">
                      <Image
                        src={w.image}
                        alt={`${w.title} by ${artist.name}`}
                        width={w.width}
                        height={w.height}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="w-full bg-soil shadow-2xl shadow-black/50"
                      />
                      <figcaption className="mt-6">
                        <p className="font-serif text-3xl text-bone">{w.title}</p>
                        <p className="mt-1 text-sm text-dust">
                          {w.year} · {w.medium} · {w.dimensions}
                        </p>
                        <p className="mt-4 max-w-lg font-serif text-lg leading-snug text-bone/70 italic">{w.note}</p>
                        <a
                          href={`mailto:${ex.enquiriesEmail}?subject=${encodeURIComponent(`Enquiry: ${w.title} by ${artist.name}`)}`}
                          className="mt-5 inline-flex text-xs tracking-[0.2em] text-dust uppercase transition-colors hover:text-ember"
                        >
                          Price on request · Enquire
                        </a>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pt-12 pb-32">
        <ExhibitionLinks exhibition={ex} instagram />
      </section>
    </>
  );
}
