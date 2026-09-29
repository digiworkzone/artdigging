import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stories",
  description: "What we found when we went looking.",
};

export default function StoriesPage() {
  return (
    <>
      <PageIntro label="Stories" title="From beneath" line="What we found when we went looking." />
      <section className="shell space-y-24 pb-32">
        {stories.map((story) => (
          <Reveal key={story.slug}>
            <StoryCard story={story} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
