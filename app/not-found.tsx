import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col items-start justify-center pt-20">
      <p className="label">404</p>
      <h1 className="mt-6 font-serif text-6xl font-light text-bone sm:text-8xl">
        Nothing buried here.
      </h1>
      <Link href="/" className="link-line mt-12">
        Keep digging <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
