import { ArrowRight, Gauge } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Background photo, faded into the surface on the left for text legibility. */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center opacity-30"
          data-alt="A modern logistics hub viewed from above at dawn, with orange shipping container accents."
          style={{ backgroundImage: "url('/images/logistics/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
      </div>

      <Container className="relative z-10 grid grid-cols-1 items-center gap-8 py-24 sm:py-28 lg:grid-cols-12 lg:gap-6 lg:py-32">
        <div className="flex flex-col items-start gap-8 lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-100 px-4 py-2 shadow-sm">
              <span className="size-2 animate-pulse rounded-full bg-brand-600" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-800">
                Global Logistics Partner
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-800 text-balance sm:text-6xl">
              Fast.
              <br />
              Global.
              <br />
              <span className="text-brand-600">Trusted.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-lg leading-relaxed text-gray-500">
              Air, ocean, and road freight handled start to finish — with licensed customs
              brokerage, live tracking, and a team that answers on WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-2 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button href="/contact" size="lg">
                Get a Quote
                <ArrowRight aria-hidden className="size-5" />
              </Button>
              <Button href="/services" size="lg" variant="secondary">
                Explore Our Services
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Bento hero graphic */}
        <Reveal delay={0.3} className="hidden lg:block lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            <figure className="group relative col-span-2 h-48 overflow-hidden rounded-xl shadow-sm">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                data-alt="A sleek cargo plane in flight over a bright sky."
                style={{ backgroundImage: "url('/images/logistics/air.jpg')" }}
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-bold text-ink-800 backdrop-blur-sm">
                Air Freight
              </figcaption>
            </figure>

            <figure className="group relative h-48 overflow-hidden rounded-xl shadow-sm">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                data-alt="A cargo ship navigating calm seas with orange container accents."
                style={{ backgroundImage: "url('/images/logistics/ocean.jpg')" }}
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-bold text-ink-800 backdrop-blur-sm">
                Ocean
              </figcaption>
            </figure>

            <div className="relative flex h-48 flex-col justify-between overflow-hidden rounded-xl border border-ink-700 bg-ink-800 p-6 shadow-sm">
              <div
                aria-hidden
                className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-brand-600),_transparent)]"
              />
              <Gauge aria-hidden className="relative z-10 size-9 text-brand-400" />
              <div className="relative z-10">
                <div className="font-display text-2xl font-semibold text-white">99.8%</div>
                <div className="text-xs text-gray-400">On-Time Delivery</div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}