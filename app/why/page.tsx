import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Why",
  description:
    "Life and art share a deep, reflective connection, where each continuously shapes and mirrors the other.",
};

// One half of Sam's line, with its reflection beneath it.
function Mirrored({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <p className="font-serif text-5xl leading-tight font-light text-bone sm:text-7xl lg:text-8xl">
        {children}
      </p>
      <p
        aria-hidden
        className="pointer-events-none mt-1 -scale-y-100 font-serif text-5xl leading-tight font-light text-bone/25 select-none [mask-image:linear-gradient(to_top,black,transparent_60%)] sm:text-7xl lg:text-8xl"
      >
        {children}
      </p>
    </div>
  );
}

export default function WhyPage() {
  return (
    <>
      <section className="shell flex min-h-[90svh] flex-col justify-center pt-40 pb-24">
        <p className="label animate-rise">Why</p>
        <h1 className="mt-8 max-w-5xl animate-rise font-serif text-5xl leading-[1.05] font-light text-bone [animation-delay:120ms] sm:text-7xl">
          Life and art share a deep, reflective connection, where each
          continuously <span className="text-ember italic">shapes</span> and{" "}
          <span className="text-ember italic">mirrors</span> the other.
        </h1>
      </section>

      {/* The founder's line, as a mirror: art becomes we, we becomes art. */}
      <section className="relative overflow-hidden border-y border-bone/10 bg-soil py-32 sm:py-44">
        <div className="shell">
          <Reveal>
            <Mirrored>
              If <span className="text-ember italic">art</span> is,
              <br />
              then <span className="italic">we</span> are.
            </Mirrored>
          </Reveal>

          <div className="relative my-16 flex items-center gap-6 sm:my-24">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bone/30" />
            <Logo className="h-10 w-auto text-ember" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bone/30" />
          </div>

          <Reveal delay={200} className="text-right">
            <Mirrored>
              And if <span className="italic">we</span> are,
              <br />
              then <span className="text-ember italic">art</span> must be.
            </Mirrored>
          </Reveal>

          <Reveal delay={400} className="mt-20 text-right">
            <p className="font-serif text-2xl text-bone">Sam</p>
            <p className="label mt-2">Founder, Art Digging</p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-32 text-center">
        <Reveal>
          <p className="mx-auto max-w-3xl font-serif text-3xl leading-snug font-light text-dust sm:text-4xl">
            That is why we dig: every work holds a story, and every story holds{" "}
            <span className="text-bone italic">us</span>.
          </p>
          <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <Link href="/curatorial" className="link-line">
              See what we&apos;ve dug up <span aria-hidden>→</span>
            </Link>
            <Link href="/stories" className="link-line">
              Read the stories <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
