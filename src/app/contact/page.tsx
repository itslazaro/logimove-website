import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/config/site";
import { faqs } from "@/content/faqs";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact LogiMove on WhatsApp for a fast shipping quote. Reach our logistics team directly — no forms sitting in a queue.",
};

const contactChannels = [
  {
    Icon: MessageCircle,
    label: "WhatsApp (fastest)",
    value: site.whatsappDisplay,
    href: `https://wa.me/${site.whatsappNumber.replace(/\D/g, "")}`,
  },
  { Icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone}` },
  { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { Icon: Clock3, label: "Hours", value: "Mon–Sat · 8:00 – 20:00" },
  { Icon: MapPin, label: "Head office", value: site.address },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Badge>Contact Us</Badge>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
              Let&apos;s get your cargo moving
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Tell us where your freight needs to go and we&apos;ll get back to you with a quote —
              usually within hours. Message us on WhatsApp or use the form below.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <ul className="space-y-4">
                {contactChannels.map(({ Icon, label, value, href }) => (
                  <li
                    key={label}
                    className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon aria-hidden className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-0.5 block truncate font-medium text-ink-900 hover:text-brand-700"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-medium text-ink-900">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-3">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  Request a quote on WhatsApp
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Fill in your details and we&apos;ll open WhatsApp with a ready-to-send message.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="faq" className="border-t border-gray-100 bg-gray-50 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="Quick answers on shipping, customs, tracking, and billing. Can&apos;t find what you need? Message us on WhatsApp — we reply fast."
            />
            <div className="mt-12 space-y-12">
              {faqs.map((category, categoryIndex) => (
                <div key={category.id}>
                  <Reveal delay={categoryIndex * 0.05}>
                    <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-brand-700">
                      {category.name}
                    </h2>
                  </Reveal>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <Reveal key={item.question} delay={index * 0.04}>
                        <AccordionItem question={item.question} answer={item.answer} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
