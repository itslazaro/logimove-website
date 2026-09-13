import type { Metadata } from "next";
import Image from "next/image";
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
    "Air freight, ocean freight (FCL & LCL), road transport, warehousing, and customs clearance: full-service international logistics.",
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
      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/logistics/services-hero.jpg"
            alt="An aerial view of a container port with cranes loading a cargo ship."
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/85 to-gray-50/40" />
        </div>
        <LayoutContainer className="relative z-10">
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
                  <article className="grid gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm md:grid-cols-4">
                    <div className="relative h-48 md:col-span-1 md:h-full md:min-h-[220px]">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-7 md:col-span-1 md:p-9 md:pl-0">
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
                    <div className="p-7 pt-0 md:col-span-2 md:p-9 md:pl-0">
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
