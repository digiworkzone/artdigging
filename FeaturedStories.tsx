import SectionHeader from "@/components/SectionHeader";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/lib/data";

export default function FeaturedStories() {
  return (
    <section className="section bg-white">
      <SectionHeader
        eyebrow="Editorial"
        title="Stories that make discovery more human"
        description="Read artist profiles, collector notes, exhibition reflections, and market context for African art."
        href="/stories"
        action="Read stories"
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
        {stories.slice(0, 3).map((story) => (
          <StoryCard story={story} key={story.slug} />
        ))}
      </div>
    </section>
  );
}
