import type { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = { title: "Proposals" };

// The subdomain root. Proposals are never listed; each has its own link.
export default function ProposalsIndex() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <Logo className="h-16 w-auto text-bone" />
      <h1 className="mt-10 font-serif text-5xl font-light text-bone">Proposals</h1>
      <p className="mt-4 max-w-sm font-serif text-xl text-dust italic">
        Each proposal has its own link and code. Use the ones you were sent.
      </p>
      <a href="https://artdigging.com" className="link-line mt-12">
        artdigging.com <span aria-hidden>→</span>
      </a>
    </main>
  );
}
