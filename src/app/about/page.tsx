import type { Metadata } from "next";
import { Compass, Globe2, HeartHandshake, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { StatsSection } from "@/components/sections/StatsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about LogiMove — our story, our values, and the team behind reliable international logistics.",
};

const values = [
  {
    Icon: Globe2,
    title: "Global reach, local care",
    text: "We move freight across 120+ countries while keeping the personal service of a dedicated partner.",
  },
  {
    Icon: ShieldCheck,
    title: "Reliability first",
    text: "Every shipment is tracked, every promise measured. Our 98% on-time rate is earned, not claimed.",
  },
  {
    Icon: HeartHandshake,
    title: "Partnership over transactions",
    text: "We act as an extension of your supply chain — transparent, responsive, and long-term minded.",
  },
  {
    Icon: Compass,
    title: "Continuous improvement",
    text: "We invest in technology and training to make your logistics faster and simpler every year.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Badge>About LogiMove</Badge>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
              From a small brokerage to a full-service freight partner
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              LogiMove was founded to make international shipping simpler for growing businesses.
              What started as a small freight brokerage has grown into a full-service logistics
              provider — but we&apos;ve never lost the responsiveness our first customers relied on.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-gray-500">
              Today we move air, ocean, and road freight across the world&apos;s busiest trade lanes,
              backed by licensed customs brokerage, warehousing, and a team that answers on
              WhatsApp — because that&apos;s how modern shippers want to talk.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="What we stand for"
            description="Four principles guide every shipment we move and every conversation we have."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon aria-hidden className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatsSection />
      <CtaSection />
    </>
  );
}
