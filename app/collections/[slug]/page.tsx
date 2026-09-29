import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import ArtworkCard from "@/components/ArtworkCard";
import { collections, getCollection, worksIn } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  return collection ? { title: collection.title, description: collection.line } : {};
}

export default async function CollectionPage({ params }: Props) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const works = worksIn(collection);

  return (
    <>
      <PageIntro label={`Collection · ${works.length} works`} title={collection.title} line={collection.line} />
      <section className="shell pb-32">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 3) * 120}>
              <ArtworkCard artwork={w} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
