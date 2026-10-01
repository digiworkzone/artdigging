import type { Metadata } from "next";
import CodeGate from "@/components/proposal/CodeGate";

export const metadata: Metadata = { title: "Proposals" };

// The subdomain root. Proposals are never listed: a code opens its proposal.
export default function ProposalsIndex() {
  return <CodeGate />;
}
