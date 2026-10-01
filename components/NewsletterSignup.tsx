"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "joined" | "exists" | "error";
type SupportStatus = "closed" | "open" | "sending" | "sent" | "error";

const fieldClass =
  "min-h-12 w-full border-b border-bone/25 bg-transparent px-1 text-bone placeholder:text-dust/60 focus:border-ember focus:outline-none";
const buttonClass =
  "min-h-12 border border-bone/25 px-6 text-xs tracking-[0.25em] text-bone uppercase transition-colors hover:border-ember hover:text-ember disabled:opacity-50";

// Hidden from people; bots that fill every field give themselves away.
function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );
}

async function post(url: string, data: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, json };
}

export default function NewsletterSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [support, setSupport] = useState<SupportStatus>("closed");

  async function onJoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const { json } = await post("/api/subscribe", {
        email,
        name,
        website: form.get("website"),
        page: window.location.pathname,
      });
      if (json.status === "joined" || json.status === "exists") {
        setStatus(json.status);
      } else {
        setError(json.error ?? "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  async function onSupport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSupport("sending");
    try {
      const { ok } = await post("/api/support", {
        email,
        message: form.get("message"),
        website: form.get("website"),
      });
      setSupport(ok ? "sent" : "error");
    } catch {
      setSupport("error");
    }
  }

  return (
    <section id="join" className="shell scroll-mt-24 py-32 sm:py-44">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-5xl leading-tight font-light text-bone sm:text-7xl">
          Be there when the next one <span className="text-ember italic">surfaces.</span>
        </h2>

        {status === "joined" ? (
          <p className="mt-12 font-serif text-2xl text-dust italic">
            You&apos;re on the list. Check your inbox for a welcome from us.
          </p>
        ) : status === "exists" ? (
          <div className="mx-auto mt-12 max-w-md">
            <p className="font-serif text-2xl text-bone">This email is already on the list.</p>
            {support === "sent" ? (
              <p className="mt-6 font-serif text-xl text-dust italic">
                Message sent. We&apos;ll get back to you at {email}.
              </p>
            ) : support === "closed" ? (
              <p className="mt-4 text-dust">
                Not getting our emails, or need something else?{" "}
                <button
                  type="button"
                  onClick={() => setSupport("open")}
                  className="text-bone underline decoration-bone/30 underline-offset-4 hover:text-ember"
                >
                  Send us a message
                </button>
              </p>
            ) : (
              <form onSubmit={onSupport} className="relative mt-8 grid gap-4 text-left">
                <Honeypot />
                <label htmlFor="support-message" className="label">
                  Your message · we&apos;ll reply to {email}
                </label>
                <textarea
                  id="support-message"
                  name="message"
                  required
                  minLength={2}
                  maxLength={2000}
                  rows={4}
                  className={`${fieldClass} resize-y py-3`}
                  placeholder="How can we help?"
                />
                <button type="submit" disabled={support === "sending"} className={`${buttonClass} justify-self-end`}>
                  {support === "sending" ? "…" : "Send"}
                </button>
                {support === "error" ? (
                  <p className="text-sm text-ember">That didn&apos;t go through. Try again?</p>
                ) : null}
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={onJoin} className="relative mx-auto mt-12 flex max-w-xl flex-col gap-4 sm:flex-row">
            <Honeypot />
            <label htmlFor="join-name" className="sr-only">
              First name
            </label>
            <input
              id="join-name"
              name="name"
              type="text"
              autoComplete="given-name"
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              className={`${fieldClass} sm:w-44 sm:flex-none`}
            />
            <label htmlFor="join-email" className="sr-only">
              Email address
            </label>
            <input
              id="join-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="your@email.com"
              className={`${fieldClass} flex-1`}
            />
            <button type="submit" disabled={status === "sending"} className={buttonClass}>
              {status === "sending" ? "…" : "Join"}
            </button>
          </form>
        )}

        {status === "error" ? (
          <p className="mt-4 text-sm text-ember">{error || "That didn't go through. Try again?"}</p>
        ) : null}
      </div>
    </section>
  );
}
