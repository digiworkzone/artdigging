import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { exhibitions, getExhibition } from "@/lib/exhibitions";
import { site } from "@/lib/site";

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

  const record = [
    { term: "Site", value: ex.site },
    { term: "Period", value: ex.period },
    { term: "Curated by", value: ex.curatedBy },
    { term: "Presented with", value: ex.presentedWith },
    {
      term: "In collaboration with",
      value: `${ex.alongside.name}: ${ex.alongside.theme}, ${ex.alongside.site}, ${ex.alongside.period}`,
    },
  ];

  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <Image src={ex.image} alt="" fill priority className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/40 to-void/80" />
        <div className="shell pb-20 sm:pb-28">
          <p className="label animate-rise">Curatorial · Dig {ex.number}</p>
          <h1 className="mt-6 max-w-5xl animate-rise font-serif text-6xl leading-[0.9] font-light text-bone [animation-delay:120ms] sm:text-8xl lg:text-9xl">
            {ex.title}
          </h1>
          <p className="mt-8 animate-rise font-serif text-2xl text-ember italic [animation-delay:260ms] sm:text-3xl">
            {ex.line}
          </p>
        </div>
      </section>

      {/* The dig record: where, when, and who dug. */}
      <section className="shell py-24">
        <p className="label mb-10">Dig record</p>
        <dl className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-5">
          {record.map((r) => (
            <div key={r.term} className="bg-void p-6">
              <dt className="label">{r.term}</dt>
              <dd className="mt-3 leading-6 text-bone">{r.value}</dd>
            </div>
          ))}
        </dl>
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
        </div>
      </section>

      <section className="shell pb-24">
        <div className="mx-auto max-w-2xl space-y-6 text-lg leading-8 text-bone/75">
          {ex.statement.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Each artist is a layer in the dig; their pieces sit inside it. */}
      <section className="shell py-24">
        <p className="label mb-4">The finds</p>
        <p className="mb-14 font-serif text-xl text-dust italic">
          {ex.artists.length} artists, one ground.
        </p>
        <div className="border-b border-bone/10">
          {ex.artists.map((artist, i) => (
            <div key={artist.name} className="border-t border-bone/10 py-10">
              <Reveal className="grid grid-cols-[auto_1fr] items-baseline gap-6 sm:gap-10">
                <span className="font-serif text-lg text-dust">0{i + 1}</span>
                <h2 className="font-serif text-4xl text-bone sm:text-6xl">{artist.name}</h2>
              </Reveal>
              {artist.works.length ? (
                <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {artist.works.map((w) => (
                    <figure key={w.title}>
                      {w.image ? (
                        <Image
                          src={w.image}
                          alt={w.imageAlt ?? `${w.title} by ${artist.name}`}
                          width={800}
                          height={1000}
                          className="aspect-[4/5] w-full bg-soil object-cover"
                        />
                      ) : null}
                      <figcaption className="mt-4">
                        <p className="font-serif text-2xl text-bone">{w.title}</p>
                        <p className="mt-1 text-sm text-dust">
                          {[w.year, w.medium, w.dimensions].filter(Boolean).join(" · ")}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="shell flex flex-col gap-6 pt-12 pb-32 sm:flex-row sm:gap-12">
        {ex.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="link-line">
            {l.label} <span aria-hidden>↗</span>
          </a>
        ))}
        <a href={site.instagram} target="_blank" rel="noreferrer" className="link-line">
          {site.instagramHandle} <span aria-hidden>↗</span>
        </a>
      </section>
    </>
  );
}
