const steps = [
  {
    title: "Discover artists and stories",
    body: "Start with artist profiles, editorial notes, and the cultural context behind each practice.",
  },
  {
    title: "Explore curated works and collections",
    body: "Browse artworks through collection themes, material stories, availability, and collector previews.",
  },
  {
    title: "Connect, inquire, collect, or follow",
    body: "Join the community, ask about a work, follow artists, and receive thoughtful collection updates.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section bg-charcoal text-cream">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow text-gold">How it works</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            A clearer way into African art
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article className="border border-cream/15 bg-cream/5 p-6" key={step.title}>
              <p className="font-serif text-5xl text-gold">0{index + 1}</p>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-cream/70">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
