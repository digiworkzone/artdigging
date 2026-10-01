"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GlimpseImage = {
  src: string;
  alt: string;
  credit: string;
  width: number;
  height: number;
};

// A small image seen through a narrow gap, like a door left ajar. It stays
// dark and colourless, and opens a little when it scrolls into view or is
// hovered or focused.
export default function Glimpse({
  image,
  align = "left",
}: {
  image: GlimpseImage;
  align?: "left" | "right";
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      tabIndex={0}
      className={cn(
        "group shell flex flex-col gap-3 py-16 outline-none",
        align === "right" ? "items-end text-right" : "items-start",
      )}
    >
      <div
        className={cn(
          "relative h-56 overflow-hidden bg-soil transition-[width] duration-[1.6s] ease-out sm:h-64",
          seen ? "w-28 sm:w-36" : "w-3",
          "group-hover:w-60 group-focus-visible:w-60 sm:group-hover:w-80 sm:group-focus-visible:w-80",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="320px"
          className="object-cover brightness-[0.55] grayscale transition duration-[1.6s] group-hover:brightness-90 group-hover:grayscale-0 group-focus-visible:brightness-90 group-focus-visible:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]" />
      </div>
      <figcaption className="max-w-60 text-[10px] tracking-[0.2em] text-dust/70 uppercase opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100">
        {image.credit}
      </figcaption>
    </figure>
  );
}
