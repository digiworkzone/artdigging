import Link from "next/link";
import Image from "next/image";
import type { Story } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group grid h-full overflow-hidden border border-charcoal/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/stories/${story.slug}`} aria-label={`Read ${story.title}`}>
        <Image
          src={story.image}
          alt={story.imageAlt}
          width={1000}
          height={625}
          className="aspect-[16/10] w-full object-cover"
        />
      </Link>
      <div className="flex flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
          {story.category} / {formatDate(story.publishedAt)}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-charcoal">
          <Link href={`/stories/${story.slug}`}>{story.title}</Link>
        </h3>
        <p className="mt-4 flex-1 text-sm leading-6 text-stone-700">
          {story.excerpt}
        </p>
        <Link
          className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal"
          href={`/stories/${story.slug}`}
        >
          Read Story
        </Link>
      </div>
    </article>
  );
}
