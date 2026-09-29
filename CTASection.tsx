import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section border-t border-charcoal/10 bg-cream">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
        <p className="eyebrow">For collectors, artists, and collaborators</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
          Build a richer relationship with African art.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-700">
          Explore the works, follow the artists, read the stories, and join a
          community designed for authentic discovery.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="btn btn-primary" href="/artworks">
            Explore the Art
          </Link>
          <Link className="btn btn-secondary" href="/contact">
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
