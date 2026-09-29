import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src="/images/hero.svg"
        alt=""
        fill
        priority
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/40 to-void/70" />

      <div className="shell pb-20 sm:pb-28">
        <h1 className="max-w-5xl animate-rise font-serif text-6xl leading-[0.92] font-light text-bone sm:text-8xl lg:text-9xl">
          Every work holds a story.
          <span className="mt-2 block text-ember italic">We dig it up.</span>
        </h1>
        <div className="mt-12 flex animate-rise flex-col gap-8 [animation-delay:300ms] sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-dust">
            Contemporary African art, unearthed with the stories buried inside it.
          </p>
          <a href="#unearthed" className="link-line">
            Start digging <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
