import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import CodeGate from "@/components/proposal/CodeGate";
import ProposalView from "@/components/proposal/ProposalView";
import { getProposal } from "@/lib/proposals";
import { cookieName, hasAccess } from "@/lib/proposal-access";

type Props = { params: Promise<{ slug: string }> };

async function unlocked(slug: string) {
  const jar = await cookies();
  return hasAccess(slug, jar.get(cookieName(slug))?.value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposal(slug);
  // Don't reveal the title until the code has been entered.
  if (!proposal || !(await unlocked(slug))) return { title: "A proposal" };
  return { title: proposal.title };
}

export default async function ProposalPage({ params }: Props) {
  const { slug } = await params;
  const proposal = getProposal(slug);
  if (!proposal) notFound();

  if (!(await unlocked(slug))) return <CodeGate slug={slug} />;
  const vote = (await cookies()).get(`vote_${slug}`)?.value;
  return <ProposalView proposal={proposal} vote={vote === "yes" || vote === "no" ? vote : undefined} />;
}
