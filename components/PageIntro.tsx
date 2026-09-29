export default function PageIntro({
  label,
  title,
  line,
}: {
  label: string;
  title: string;
  line?: string;
}) {
  return (
    <section className="shell pt-40 pb-20 sm:pt-48">
      <p className="label animate-rise">{label}</p>
      <h1 className="mt-6 max-w-4xl animate-rise font-serif text-6xl leading-[0.95] font-light text-bone [animation-delay:120ms] sm:text-8xl">
        {title}
      </h1>
      {line ? (
        <p className="mt-8 max-w-xl animate-rise font-serif text-xl text-dust italic [animation-delay:240ms]">
          {line}
        </p>
      ) : null}
    </section>
  );
}
