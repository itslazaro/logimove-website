import { partners } from "@/content/partners";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PartnersSection() {
  return (
    <section className="border-y border-gray-100 bg-white py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            Carrier & partner network
          </p>
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <Reveal key={partner.id} delay={index * 0.05}>
              <li className="group flex h-full flex-col items-center justify-center gap-1 rounded-xl border border-gray-100 px-3 py-5 text-center transition-colors hover:border-gray-200 hover:bg-gray-50">
                <span className="font-display text-base font-bold text-ink-700 transition-colors group-hover:text-ink-900 sm:text-lg">
                  {partner.name}
                </span>
                <span className="text-xs text-gray-400">{partner.category}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
