import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import type { Proposal, ProposalSection } from "@/lib/proposals";
import { cn } from "@/lib/utils";

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-medium tracking-[0.3em] text-[var(--accent)] uppercase">{children}</p>
);

function Section({ section }: { section: ProposalSection }) {
  switch (section.kind) {
    case "steps":
      return (
        <section className="border-y border-bone/10 bg-soil">
          <div className="shell grid gap-12 py-24 md:grid-cols-3">
            {section.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <Label>{item.label}</Label>
                <h3 className="mt-4 font-serif text-4xl text-bone">{item.title}</h3>
                <p className="mt-4 leading-7 text-dust">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "chapters":
      return (
        <section className="shell py-28">
          <Reveal>
            <Label>{section.label}</Label>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight font-light text-bone sm:text-5xl">
              {section.title}
            </h2>
          </Reveal>
          <div className="mt-16 border-b border-bone/10">
            {section.items.map((item, i) => (
              <Reveal
                key={item.title}
                className="grid gap-4 border-t border-bone/10 py-8 sm:grid-cols-[4rem_1fr_1fr] sm:gap-8"
              >
                <span className="font-serif text-4xl text-[var(--accent)]">{i + 1}</span>
                <div>
                  <h3 className="font-serif text-3xl text-bone">{item.title}</h3>
                  <p className="mt-1 text-sm text-dust">{item.subtitle}</p>
                </div>
                <p className="leading-7 text-bone/75">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "cards":
      return (
        <section className={cn(section.shaded && "border-y border-bone/10 bg-soil")}>
          <div className="shell py-28">
            <Reveal>
              <Label>{section.label}</Label>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight font-light text-bone sm:text-5xl">
                {section.title}
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {section.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 120} className="border-t border-[var(--accent)]/60 pt-6">
                  <h3 className="font-serif text-2xl text-bone">{item.title}</h3>
                  <p className="mt-3 leading-7 text-dust">{item.body}</p>
                </Reveal>
              ))}
            </div>
            {section.note ? (
              <Reveal>
                <p className="mt-14 max-w-3xl leading-7 text-bone/70">{section.note}</p>
              </Reveal>
            ) : null}
          </div>
        </section>
      );

    case "split":
      return (
        <section className="border-t border-bone/10">
          <div className="shell grid gap-12 py-28 md:grid-cols-2 md:gap-20">
            <Reveal>
              <Label>{section.label}</Label>
              <h2 className="mt-5 font-serif text-4xl leading-tight font-light text-bone sm:text-5xl">
                {section.title}
              </h2>
            </Reveal>
            <Reveal delay={150} className="space-y-5 text-lg leading-8 text-bone/75 md:pt-10">
              {section.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
        </section>
      );
  }
}

export default function ProposalView({ proposal }: { proposal: Proposal }) {
  const accent = proposal.accent ?? "#c8743a";
  const subject = encodeURIComponent(`${proposal.title}: getting involved`);

  return (
    <div style={{ "--accent": accent } as React.CSSProperties}>
      <header className="border-b border-bone/10">
        <div className="shell flex h-20 items-center justify-between gap-6">
          <a href="https://artdigging.com" className="flex items-center gap-3 text-bone" aria-label="Art Digging">
            <Logo className="h-8 w-auto" />
            <span className="hidden font-serif text-xl sm:inline">Art Digging</span>
          </a>
          <p className="text-[11px] tracking-[0.3em] text-dust uppercase">{proposal.place}</p>
        </div>
      </header>

      <section className="shell pt-24 pb-28 sm:pt-32">
        <p className="label animate-rise">
          Proposed · Dig {proposal.number} · {proposal.title}
        </p>
        <h1 className="mt-8 max-w-5xl animate-rise font-serif text-5xl leading-[1.02] font-light text-bone [animation-delay:120ms] sm:text-7xl lg:text-8xl">
          {proposal.hero.headline}
        </h1>
        <p className="mt-12 max-w-2xl animate-rise font-serif text-2xl text-bone [animation-delay:240ms] sm:text-3xl">
          {proposal.hero.lead.before}{" "}
          <span className="bg-[var(--accent)] px-2 text-void italic">{proposal.hero.lead.highlight}</span>
        </p>
        <p className="mt-6 max-w-xl animate-rise text-lg leading-8 text-dust [animation-delay:320ms]">
          {proposal.hero.body}
        </p>
      </section>

      {proposal.sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}

      <section className="border-t border-bone/10 bg-soil">
        <div className="shell py-32">
          <Reveal>
            <p className="max-w-4xl font-serif text-4xl leading-tight font-light text-bone sm:text-6xl">
              {proposal.closing}
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
            <a
              href={`mailto:${proposal.contact.email}?subject=${subject}`}
              className="inline-flex min-h-13 items-center justify-center bg-[var(--accent)] px-8 text-xs font-medium tracking-[0.25em] text-void uppercase transition-opacity hover:opacity-85"
            >
              {proposal.contact.label}
            </a>
            <span className="text-sm text-dust">{proposal.contact.line}</span>
          </Reveal>
        </div>
      </section>

      <footer className="shell flex flex-col gap-2 py-10 text-xs text-dust sm:flex-row sm:justify-between">
        <span>A proposal by Art Digging · artdigging.com</span>
        <span>Confidential. Please don&apos;t share without permission.</span>
      </footer>
    </div>
  );
}
