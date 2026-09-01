import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Container, Plane, ShieldCheck, Ship, Truck, Warehouse } from "lucide-react";
import { services, type Service } from "@/content/services";
import { Container as LayoutContainer } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Air freight, ocean freight (FCL & LCL), road transport, warehousing, and customs clearance — full-service international logistics.",
};

const iconMap = {
  Plane,
  Ship,
  Container,
  Truck,
  Warehouse,
  ShieldCheck,
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <LayoutContainer>
          <Reveal>
            <Badge>Our Services</Badge>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
              Complete logistics services for every shipment
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Choose the service that fits your cargo, or let our team design a multi-modal
              solution. Every service includes dedicated support on WhatsApp.
            </p>
          </Reveal>
        </LayoutContainer>
      </section>

      <section className="py-20 sm:py-28">
        <LayoutContainer>
          <div className="space-y-8">
            {services.map((service: Service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <Reveal key={service.code} delay={(index % 2) * 0.06}>
                  <article className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:grid-cols-3 md:p-9">
                    <div className="md:col-span-1">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                        <Icon aria-hidden className="size-7" />
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-bold text-ink-900">
                        {service.name}
                      </h2>
                      <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-brand-700">
                        {service.code.replace(/_/g, " · ")}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="leading-relaxed text-gray-500">{service.description}</p>
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-ink-800">
                            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
                      >
                        Request a quote
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </LayoutContainer>
      </section>

      <CtaSection />
    </>
  );
}
