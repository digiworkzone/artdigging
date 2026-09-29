import Link from "next/link";

export default function SectionHeader({
  label,
  title,
  href,
  action,
}: {
  label?: string;
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {label ? <p className="label">{label}</p> : null}
        <h2 className="mt-3 font-serif text-4xl text-bone sm:text-5xl">{title}</h2>
      </div>
      {href && action ? (
        <Link href={href} className="link-line">
          {action} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
