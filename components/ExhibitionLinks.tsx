import type { Exhibition } from "@/lib/exhibitions";
import { site } from "@/lib/site";

export default function ExhibitionLinks({
  exhibition,
  instagram = false,
}: {
  exhibition: Exhibition;
  instagram?: boolean;
}) {
  const links = instagram
    ? [...exhibition.links, { label: site.instagramHandle, url: site.instagram }]
    : exhibition.links;

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-12">
      {links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="link-line">
          {l.label} <span aria-hidden>↗</span>
        </a>
      ))}
    </div>
  );
}
