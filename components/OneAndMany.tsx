"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

export type ResolvedChapter = {
  question: string;
  one: string;
  many: string;
  work: { title: string; year: number; image: string; width: number; height: number; note: string };
  artist: string;
};

type Mode = "one" | "many";

// A story read twice: every chapter swaps between the individual ("I")
// and the collective ("We") reading of the same work.
export default function OneAndMany({ chapters }: { chapters: ResolvedChapter[] }) {
  const [mode, setMode] = useState<Mode>("one");
  const top = useRef<HTMLDivElement>(null);

  return (
    <div ref={top} className="scroll-mt-20">
      <div className="sticky top-20 z-40 flex justify-center py-6">
        <div
          role="radiogroup"
          aria-label="Read as"
          className="flex items-center gap-1 border border-bone/15 bg-void/90 p-1 backdrop-blur"
        >
          <span className="label px-3">Read as</span>
          {(["one", "many"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "min-w-16 px-5 py-2 font-serif text-2xl transition-colors",
                mode === m ? (m === "one" ? "bg-bone text-void" : "bg-ember text-void") : "text-dust hover:text-bone",
              )}
            >
              {m === "one" ? "I" : "We"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-40 py-24 sm:space-y-56">
        {chapters.map((c, i) => (
          <section key={c.question} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <Image
                src={c.work.image}
                alt={`${c.work.title} by ${c.artist}`}
                width={c.work.width}
                height={c.work.height}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full shadow-2xl shadow-black/60"
              />
            </Reveal>

            <Reveal delay={150}>
              <p className="label">
                {String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight font-light text-dust sm:text-4xl">
                {c.question}
              </h2>

              {/* Both readings stay in the page; only one is shown at a time. */}
              <div className="relative mt-10 grid">
                <p
                  aria-hidden={mode !== "one"}
                  className={cn(
                    "col-start-1 row-start-1 font-serif text-4xl leading-tight text-bone transition-all duration-700 sm:text-5xl",
                    mode === "one" ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                  )}
                >
                  {c.one}
                </p>
                <p
                  aria-hidden={mode !== "many"}
                  className={cn(
                    "col-start-1 row-start-1 font-serif text-4xl leading-tight text-ember italic transition-all duration-700 sm:text-5xl",
                    mode === "many" ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                  )}
                >
                  {c.many}
                </p>
              </div>

              <blockquote className="mt-12 border-l border-bone/15 pl-6">
                <p className="text-sm leading-7 text-dust">{c.work.note}</p>
                <footer className="mt-3 text-xs tracking-[0.2em] text-bone/70 uppercase">
                  {c.artist} · <span className="italic normal-case">{c.work.title}</span>, {c.work.year}
                </footer>
              </blockquote>
            </Reveal>
          </section>
        ))}
      </div>

      <div className="flex justify-center pb-8">
        <button
          type="button"
          onClick={() => {
            setMode(mode === "one" ? "many" : "one");
            top.current?.scrollIntoView({ behavior: "smooth" });
          }}
          className="link-line"
        >
          Now read it again as {mode === "one" ? "We" : "I"} <span aria-hidden>↑</span>
        </button>
      </div>
    </div>
  );
}
