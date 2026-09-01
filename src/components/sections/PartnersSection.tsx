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
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((partner, index) => (
            <Reveal key={partner.id} delay={index * 0.05}>
              <li className="flex flex-col items-center gap-1 text-center">
                <span className="font-display text-lg font-bold text-gray-400 transition-colors hover:text-ink-900">
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
