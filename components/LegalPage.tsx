export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <article className="shell pt-40 pb-32 sm:pt-48">
      <div className="mx-auto max-w-2xl">
        <p className="label">Last updated {updated}</p>
        <h1 className="mt-6 font-serif text-6xl font-light text-bone sm:text-7xl">{title}</h1>
        <p className="mt-8 font-serif text-2xl leading-snug text-dust italic">{intro}</p>
        <div className="mt-16 space-y-14">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-serif text-3xl text-bone">
                <span className="mr-4 text-lg text-dust">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 leading-7 text-bone/75">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
