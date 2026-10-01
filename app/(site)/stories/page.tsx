import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Stories",
  description: "What we found when we went looking.",
};

export default function StoriesPage() {
  return (
    <>
      <PageIntro label="Stories" title="From beneath" line="What we found when we went looking." />
      <section className="shell pb-32">
        <div className="border-b border-bone/10">
          {stories.map((story) => (
            <Reveal key={story.slug} className="border-t border-bone/10 py-14">
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
