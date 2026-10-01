import type { Metadata } from "next";

// Proposals never appear in search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function ProposalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
