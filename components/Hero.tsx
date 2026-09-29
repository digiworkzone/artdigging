import Logo from "@/components/Logo";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      {/* The mark, huge and half-buried, with a low ember glow beneath it. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_85%,rgba(200,116,58,0.22),transparent_55%)]" />
      <Logo className="absolute -right-[8vw] -bottom-[18vh] -z-10 h-[95vh] w-auto animate-rise text-bone/[0.05]" />

      <div className="shell pb-20 sm:pb-28">
        <h1 className="max-w-5xl animate-rise font-serif text-6xl leading-[0.92] font-light text-bone sm:text-8xl lg:text-9xl">
          Every work holds a story.
          <span className="mt-2 block text-ember italic">We dig it up.</span>
        </h1>
        <div className="mt-12 flex animate-rise flex-col gap-8 [animation-delay:300ms] sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-dust">
            Art Digging curates contemporary African art and the stories buried inside it.
          </p>
          <a href="#dig" className="link-line">
            Start digging <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
