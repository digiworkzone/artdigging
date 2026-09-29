import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-charcoal/10 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8">
        <div>
          <p className="eyebrow">Art marketplace / Editorial / Community</p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.95] text-charcoal sm:text-6xl lg:text-7xl">
            Discover African Art Through Stories, Artists, and Curated
            Collections
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">
            Art Digging connects collectors, galleries, artists, and art lovers
            with original African art, authentic artist stories, and emerging
            creative voices.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="btn btn-primary" href="/artworks">
              Explore the Art
            </Link>
            <Link className="btn btn-secondary" href="/community">
              Join the Community
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-[0.88fr_1.12fr] sm:items-end">
            <Image
              src="/images/hero-gallery-left.svg"
              alt="Layered placeholder artwork in a warm gallery setting"
              width={900}
              height={1125}
              priority
              className="aspect-[4/5] w-full border border-charcoal/10 object-cover shadow-soft"
            />
            <div className="grid gap-4">
              <Image
                src="/images/hero-gallery-right.svg"
                alt="Curated African art placeholder wall with sculptural forms"
                width={1000}
                height={800}
                priority
                className="aspect-[5/4] w-full border border-charcoal/10 object-cover shadow-soft"
              />
              <div className="border border-charcoal/10 bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
                  Collector note
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-700">
                  Each preview connects the work to artist context, material
                  story, and collection fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
