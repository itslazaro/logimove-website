import type { Metadata } from "next";
import { MessageCircleQuestion } from "lucide-react";
import { faqs } from "@/content/faqs";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about shipping, customs, tracking, and billing with LogiMove Logistics.",
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Badge>FAQ</Badge>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
              Frequently asked questions
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Can&apos;t find what you&apos;re looking for? Reach out on WhatsApp and our team
              will get back to you promptly.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {faqs.map((category, catIndex) => (
              <Reveal key={category.id} delay={catIndex * 0.06}>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <MessageCircleQuestion aria-hidden className="size-5" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-ink-900">
                      {category.name}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem
                        key={`${category.id}-${itemIndex}`}
                        question={item.question}
                        answer={item.answer}
                        defaultOpen={catIndex === 0 && itemIndex === 0}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
