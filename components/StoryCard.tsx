import Link from "next/link";
import Image from "next/image";
import type { Story } from "@/lib/stories";
import { formatDate } from "@/lib/utils";

export default function StoryCard({
  story,
  showImage = true,
}: {
  story: Story;
  showImage?: boolean;
}) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-16"
    >
      <div>
        <p className="label">
          {story.kind} · {formatDate(story.publishedAt)}
        </p>
        <h3 className="mt-4 font-serif text-4xl leading-tight text-bone transition-colors group-hover:text-ember sm:text-6xl">
          {story.title}
        </h3>
        <p className="mt-4 max-w-md font-serif text-xl text-dust italic">{story.excerpt}</p>
      </div>
      {showImage && story.image ? (
        <Image
          src={story.image}
          alt={story.imageAlt ?? ""}
          width={1080}
          height={1080}
          className="w-40 rotate-2 shadow-2xl shadow-black/60 transition duration-700 group-hover:rotate-0 sm:w-56"
        />
      ) : null}
    </Link>
  );
}
