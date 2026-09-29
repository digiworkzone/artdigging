import Link from "next/link";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-bone/10">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div className="flex items-end gap-5">
          <Link href="/" aria-label="Art Digging, home" className="text-bone transition-colors hover:text-ember">
            <Logo className="h-14 w-auto" />
          </Link>
          <div>
            <p className="font-serif text-3xl text-bone">Art Digging</p>
            <p className="mt-1 font-serif text-lg text-dust italic">{site.tagline}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-dust md:items-end">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-bone">
            Instagram {site.instagramHandle}
          </a>
          <a href={`mailto:${site.contactEmail}`} className="transition-colors hover:text-bone">
            {site.contactEmail}
          </a>
          <p className="text-xs">© {new Date().getFullYear()} Art Digging</p>
        </div>
      </div>
    </footer>
  );
}
