import Link from "next/link";

export default function EmptyStoreNotice() {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-5 sm:px-6 lg:px-8">
      <div className="border border-gold/30 bg-gold/10 p-6 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="eyebrow">Collector preview</p>
          <h2 className="mt-2 font-serif text-2xl text-charcoal">
            Curated artworks are being prepared for release.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-700">
            Join early access to receive collector previews, artist notes, and
            availability updates before public release.
          </p>
        </div>
        <Link className="btn btn-primary mt-5 md:mt-0" href="/community">
          Join Early Access
        </Link>
      </div>
    </section>
  );
}
