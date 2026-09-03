import Image from "next/image";
import { ArrowRight, Gauge } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Background photo, optimized with next/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/logistics/hero-bg.jpg"
          alt="A modern logistics hub viewed from above at dawn, with orange shipping container accents."
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
      </div>

      <Container className="relative z-10 grid grid-cols-1 items-center gap-8 py-24 sm:py-28 lg:grid-cols-12 lg:gap-6 lg:py-32">
        <div className="flex flex-col items-start gap-8 lg:col-span-7">
          <Reveal>
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
              <Image
                src="/images/logistics/air.jpg"
                alt="A sleek cargo plane in flight over a bright sky."
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-bold text-ink-800 backdrop-blur-sm">
                Air Freight
              </figcaption>
            </figure>

            <figure className="group relative h-48 overflow-hidden rounded-xl shadow-sm">
              <Image
                src="/images/logistics/ocean.jpg"
                alt="A cargo ship navigating calm seas with orange container accents."
                fill
                sizes="(max-width: 1024px) 100vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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