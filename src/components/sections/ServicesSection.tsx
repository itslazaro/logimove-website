import Link from "next/link";
import { ArrowRight, Plane, ShieldCheck, Ship, Truck, Warehouse } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesSection() {
  return (
    <section className="bg-white py-20 sm:py-28" id="services">
      <Container>
        <Reveal>
          <div className="mb-12 md:mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Our services
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-500">
              Air, ocean, road, warehousing, and customs — one team across every leg of your
              shipment.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Air Freight — large feature card */}
          <Reveal className="md:col-span-8" delay={0}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300 md:flex-row">
              <div className="flex flex-col justify-between p-8 md:w-1/2">
                <div>
                  <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Plane aria-hidden className="size-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink-900">Air Freight</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    When time matters, we secure space on the next available flight and manage the
                    move door-to-door. Suited to high-value and perishable cargo.
                  </p>
                </div>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600"
                >
                  Explore Air Services
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
              <div className="h-64 overflow-hidden md:h-auto md:w-1/2">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="Air cargo pallet being loaded into a jet."
                  style={{ backgroundImage: "url('/images/logistics/air-card.jpg')" }}
                />
              </div>
            </article>
          </Reveal>

          {/* Ocean Freight — dark image card */}
          <Reveal className="md:col-span-4" delay={0.06}>
            <article className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-xl bg-ink-800 shadow-sm">
              <div
                className="absolute inset-0 h-full w-full bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105"
                data-alt="Stacked shipping containers at a port."
                style={{ backgroundImage: "url('/images/logistics/ocean.jpg')" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-ink-900/90"
              />
              <div className="relative z-20 flex flex-col p-8">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-brand-400 backdrop-blur-md">
                  <Ship aria-hidden className="size-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Ocean Freight</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  Full and shared containers on the busiest sea routes, with fixed sailing schedules
                  and tracking from gate to gate.
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 transition-colors hover:text-white"
                >
                  View Routes
                  <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </div>
            </article>
          </Reveal>

          {/* Road Transport — white card */}
          <Reveal className="md:col-span-4" delay={0.12}>
            <article className="group flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-colors hover:border-gray-300">
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-ink-900">
                  <Truck aria-hidden className="size-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">Road Transport</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  Border-crossing FTL and LTL trucking with GPS tracking and delivery windows you can
                  plan around.
                </p>
              </div>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600"
              >
                View Network
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </article>
          </Reveal>

          {/* Customs Brokerage — white card */}
          <Reveal className="md:col-span-4" delay={0.18}>
            <article className="group flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-colors hover:border-gray-300">
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-ink-900">
                  <ShieldCheck aria-hidden className="size-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">Customs Brokerage</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  Licensed brokers file your documentation, duties, and compliance, so cargo clears
                  at every border.
                </p>
              </div>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600"
              >
                Learn More
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </article>
          </Reveal>

          {/* Smart Warehousing — orange feature card */}
          <Reveal className="md:col-span-4" delay={0.24}>
            <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-brand-700 bg-brand-600 p-8 shadow-sm">
              <Warehouse
                aria-hidden
                className="absolute -right-4 -top-4 size-32 text-white/20"
                strokeWidth={1}
              />
              <div className="relative z-10 mt-4">
                <h3 className="font-display text-xl font-bold text-white">Smart Warehousing</h3>
                <p className="mt-3 text-sm text-brand-100">
                  Bonded and general storage, inventory management, and picking, packing, and
                  distribution under one roof.
                </p>
              </div>
              <Link
                href="/services"
                className="relative z-10 mt-6 w-max rounded-full bg-white px-4 py-2 text-sm font-bold text-ink-900 transition-colors hover:bg-gray-50"
              >
                Facility Map
              </Link>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}