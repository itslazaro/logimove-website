import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand-500/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-brand-700/25 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
                Ready to move your next shipment?
              </h2>
              <p className="mt-4 text-lg text-gray-100/70">
                Get a quote in minutes — just message us on WhatsApp and tell us where your cargo
                needs to go.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Get a Quote
                  <ArrowRight aria-hidden className="size-5" />
                </Button>
                <Button href="/contact#faq" size="lg" variant="secondary" className="border-white/25 bg-white/5 text-white hover:bg-white hover:text-ink-900">
                  Read the FAQ
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
