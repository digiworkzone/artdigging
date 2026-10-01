import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import StoryCard from "@/components/StoryCard";
import ExhibitionFeature from "@/components/ExhibitionFeature";
import NewsletterSignup from "@/components/NewsletterSignup";
import ExhibitionLinks from "@/components/ExhibitionLinks";
import { exhibitions } from "@/lib/exhibitions";
import { stories } from "@/lib/stories";
import Link from "next/link";

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

      <section id="dig" className="shell scroll-mt-24 pb-32 sm:pb-48">
        <Reveal>
          <ExhibitionFeature exhibition={exhibitions[0]} />
        </Reveal>
        <Reveal className="mt-16 border-t border-bone/10 pt-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-12">
            <Link href={`/curatorial/${exhibitions[0].slug}#watch`} className="link-line">
              Watch <span aria-hidden>▶</span>
            </Link>
            <Link href={`/curatorial/${exhibitions[0].slug}#finds`} className="link-line">
              See the works <span aria-hidden>→</span>
            </Link>
            <ExhibitionLinks exhibition={exhibitions[0]} />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-bone/10 bg-soil py-32">
        <div className="shell">
          <div className="mb-14 flex items-end justify-between gap-6">
            <p className="label">Stories</p>
            <Link href="/stories" className="link-line whitespace-nowrap">
              All stories <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="space-y-20">
            {stories.slice(0, 3).map((story) => (
              <Reveal key={story.slug}>
                <StoryCard story={story} showImage={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
