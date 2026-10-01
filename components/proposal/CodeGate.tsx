"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function CodeGate({ slug }: { slug?: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("checking");
    const res = await fetch("/api/proposals/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, code }),
    }).catch(() => null);
    if (res?.ok) {
      if (slug) {
        router.refresh();
      } else {
        // Front page: go to the proposal this code opened.
        const { slug: opened } = await res.json();
        const onSubdomain = window.location.hostname.startsWith("proposal.");
        router.push(onSubdomain ? `/${opened}` : `/proposals/${opened}`);
      }
      return;
    }
    const json = await res?.json().catch(() => ({}));
    setError(json?.error ?? "That didn't go through. Try again?");
    setStatus("error");
  }

  return (
    <main className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(200,116,58,0.18),transparent_60%)]" />
      <Logo className="h-16 w-auto animate-rise text-bone" />
      <p className="label mt-10 animate-rise [animation-delay:100ms]">A proposal from Art Digging</p>
      <h1 className="mt-6 animate-rise font-serif text-5xl font-light text-bone [animation-delay:200ms] sm:text-6xl">
        This site is closed.
      </h1>
      <p className="mt-4 animate-rise font-serif text-2xl text-dust italic [animation-delay:300ms]">
        Enter your code to dig in.
      </p>

      <form onSubmit={onSubmit} className="mt-12 flex w-full max-w-sm animate-rise flex-col gap-4 [animation-delay:400ms] sm:flex-row">
        <label htmlFor="proposal-code" className="sr-only">
          Access code
        </label>
        <input
          id="proposal-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          required
          placeholder="Access code"
          className="min-h-12 flex-1 border-b border-bone/25 bg-transparent px-1 text-center tracking-[0.3em] text-bone uppercase placeholder:tracking-normal placeholder:text-dust/60 placeholder:normal-case focus:border-ember focus:outline-none sm:text-left"
        />
        <button
          type="submit"
          disabled={status === "checking"}
          className="min-h-12 border border-bone/25 px-6 text-xs tracking-[0.25em] text-bone uppercase transition-colors hover:border-ember hover:text-ember disabled:opacity-50"
        >
          {status === "checking" ? "…" : "Open"}
        </button>
      </form>
      <p aria-live="polite" className="mt-4 min-h-6 text-sm text-ember">
        {status === "error" ? error : ""}
      </p>
    </main>
  );
}
