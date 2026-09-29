"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function NewsletterSignup() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="join" className="shell scroll-mt-24 py-32 sm:py-44">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-5xl leading-tight font-light text-bone sm:text-7xl">
          Be there when the next one <span className="text-ember italic">surfaces.</span>
        </h2>

        {status === "done" ? (
          <p className="mt-12 font-serif text-2xl text-dust italic">
            You&apos;re on the list. We&apos;ll write when we find something.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-12 flex max-w-md flex-col gap-4 sm:flex-row">
            <label htmlFor="join-email" className="sr-only">
              Email address
            </label>
            <input
              id="join-email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="min-h-12 flex-1 border-b border-bone/25 bg-transparent px-1 text-bone placeholder:text-dust/60 focus:border-ember focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-h-12 border border-bone/25 px-6 text-xs tracking-[0.25em] text-bone uppercase transition-colors hover:border-ember hover:text-ember disabled:opacity-50"
            >
              {status === "sending" ? "…" : "Join"}
            </button>
          </form>
        )}
        {status === "error" ? (
          <p className="mt-4 text-sm text-ember">That didn&apos;t go through. Try again?</p>
        ) : null}
      </div>
    </section>
  );
}
