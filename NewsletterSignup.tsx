export default function NewsletterSignup() {
  return (
    <section className="section bg-beige">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
            Receive collector previews and original artist stories
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-stone-700">
            A thoughtful note for collectors, galleries, artists, and art
            lovers who want early access without the noise.
          </p>
        </div>
        <form className="grid gap-3 bg-white p-5 shadow-soft sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            className="min-h-12 border border-charcoal/15 px-4 text-sm outline-none focus:border-charcoal"
            id="newsletter-email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
          <button className="btn btn-primary justify-center" type="button">
            Join Preview List
          </button>
        </form>
      </div>
    </section>
  );
}
