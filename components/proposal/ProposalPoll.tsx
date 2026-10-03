"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Vote = "yes" | "no";
type Counts = { yes: number; no: number };

const OPTIONS: { value: Vote; label: string }[] = [
  { value: "yes", label: "Yes, open the door" },
  { value: "no", label: "Not for me" },
];

export default function ProposalPoll({ slug, initialVote }: { slug: string; initialVote?: Vote }) {
  const [choice, setChoice] = useState<Vote | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [voted, setVoted] = useState<Vote | null>(initialVote ?? null);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  // Returning voters see the current tally.
  useEffect(() => {
    if (!initialVote) return;
    fetch(`/api/proposals/vote?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((j) => j.ok && setCounts(j.counts))
      .catch(() => {});
  }, [initialVote, slug]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!choice) return;
    setStatus("sending");
    const res = await fetch("/api/proposals/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, vote: choice, name, email: anonymous ? "" : email, anonymous }),
    }).catch(() => null);
    const json = await res?.json().catch(() => ({}));
    if (res?.ok) {
      setVoted(json.vote);
      setCounts(json.counts);
      setConfirmed(Boolean(json.confirmed));
      return;
    }
    if (json?.vote) {
      setVoted(json.vote);
      return;
    }
    setError(json?.error ?? "Your vote didn't go through. Try again?");
    setStatus("error");
  }

  if (voted) {
    const total = counts ? counts.yes + counts.no : 0;
    return (
      <div className="max-w-xl">
        <p className="font-serif text-2xl text-bone">
          {voted === "yes" ? "You said yes. Thank you." : "Thank you for being honest."}
        </p>
        {confirmed ? <p className="mt-3 text-sm text-dust">A confirmation is on its way to your inbox.</p> : null}
        {counts && total > 0 ? (
          <div className="mt-8 space-y-4">
            {OPTIONS.map((o) => {
              const pct = Math.round((counts[o.value] / total) * 100);
              return (
                <div key={o.value}>
                  <div className="flex justify-between text-xs tracking-[0.2em] text-dust uppercase">
                    <span>{o.label}</span>
                    <span>
                      {counts[o.value]} · {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1 bg-bone/10">
                    <div
                      className={cn("h-full transition-[width] duration-1000", o.value === "yes" ? "bg-[var(--accent)]" : "bg-dust")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-dust">
              {total} {total === 1 ? "vote" : "votes"} so far
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <fieldset>
        <legend className="text-[11px] font-medium tracking-[0.3em] text-[var(--accent)] uppercase">
          Should this happen?
        </legend>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {OPTIONS.map((o) => (
            <label
              key={o.value}
              className={cn(
                "flex min-h-14 cursor-pointer items-center justify-center border px-6 text-xs tracking-[0.25em] uppercase transition-colors",
                choice === o.value
                  ? o.value === "yes"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-void"
                    : "border-bone bg-bone text-void"
                  : "border-bone/25 text-bone hover:border-bone/60",
              )}
            >
              <input
                type="radio"
                name="vote"
                value={o.value}
                checked={choice === o.value}
                onChange={() => setChoice(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="sr-only">Your name</span>
          <input
            type="text"
            value={anonymous ? "" : name}
            onChange={(e) => setName(e.target.value)}
            disabled={anonymous}
            required={!anonymous}
            maxLength={60}
            autoComplete="name"
            placeholder={anonymous ? "Voting anonymously" : "Your name"}
            className="min-h-12 w-full border-b border-bone/25 bg-transparent px-1 text-bone placeholder:text-dust/60 focus:border-[var(--accent)] focus:outline-none disabled:opacity-50"
          />
        </label>
        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm text-dust">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          Vote anonymously
        </label>
      </div>

      {anonymous ? null : (
        <label className="mt-4 block">
          <span className="sr-only">Email for a confirmation (optional)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={254}
            autoComplete="email"
            placeholder="Email for a confirmation (optional)"
            className="min-h-12 w-full border-b border-bone/25 bg-transparent px-1 text-bone placeholder:text-dust/60 focus:border-[var(--accent)] focus:outline-none"
          />
        </label>
      )}

      <button
        type="submit"
        disabled={!choice || status === "sending"}
        className="mt-8 min-h-12 border border-bone/25 px-8 text-xs tracking-[0.25em] text-bone uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? "…" : "Cast your vote"}
      </button>
      <p aria-live="polite" className="mt-4 min-h-5 text-sm text-ember">
        {status === "error" ? error : ""}
      </p>
    </form>
  );
}
