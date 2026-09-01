import { Boxes, FileText, MessageCircle, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    Icon: MessageCircle,
    title: "Reach out",
    text: "Message us on WhatsApp with your route and cargo details — it takes under two minutes.",
  },
  {
    Icon: FileText,
    title: "Get your quote",
    text: "Receive a transparent, tailored quote within hours, with all costs stated up front.",
  },
  {
    Icon: Boxes,
    title: "We handle the rest",
    text: "Book, document, and clear customs while we keep you updated at every stage.",
  },
  {
    Icon: Navigation,
    title: "Track to delivery",
    text: "Follow real-time shipment status until your cargo arrives, safe and on time.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From quote to delivery in four simple steps"
          description="Message us on WhatsApp, get a quote the same day, and we handle everything from booking to delivery."
        />

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <li className="relative">
                <div className="flex items-center gap-4">
                  <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-ink-900">
                    <Icon aria-hidden className="size-6" />
                    <span className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-ink-900 font-mono text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </span>
                  {index < steps.length - 1 ? (
                    <span aria-hidden className="hidden h-px flex-1 bg-brand-200 lg:block" />
                  ) : null}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
