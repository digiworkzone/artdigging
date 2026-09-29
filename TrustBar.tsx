import { trustItems } from "@/lib/data";

export default function TrustBar() {
  return (
    <section className="border-b border-charcoal/10 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {trustItems.map((item) => (
          <div
            className="border-cream/15 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-cream/85 md:border-l first:md:border-l-0"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
