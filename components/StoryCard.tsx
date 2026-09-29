import Link from "next/link";
import Image from "next/image";
import type { Story } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group grid gap-6 sm:grid-cols-[0.8fr_1fr] sm:items-center sm:gap-10">
      <div className="overflow-hidden bg-soil">
        <Image
          src={story.image}
          alt={story.imageAlt}
          width={800}
          height={1000}
          className="aspect-[4/3] w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div>
        <p className="label">
          {story.kind} · {formatDate(story.publishedAt)}
        </p>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-bone transition-colors group-hover:text-ember sm:text-4xl">
          {story.title}
        </h3>
        <p className="mt-4 max-w-md leading-7 text-dust">{story.excerpt}</p>
      </div>
    </Link>
  );
}
