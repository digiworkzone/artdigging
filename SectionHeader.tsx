import Link from "next/link";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  action?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-10 flex w-full max-w-6xl flex-col gap-5 px-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
      <div className="max-w-3xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
            {description}
          </p>
        ) : null}
      </div>
      {href && action ? (
        <Link className="text-link self-start lg:self-auto" href={href}>
          {action}
        </Link>
      ) : null}
    </div>
  );
}
