import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import CollectionRow from "@/components/CollectionRow";
import { collections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Works grouped by what lies beneath them.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageIntro label="Collections" title="Layers" line="Works grouped by what lies beneath them." />
      <section className="shell pb-32">
        <div className="border-b border-bone/10">
          {collections.map((collection, i) => (
            <CollectionRow key={collection.slug} collection={collection} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
