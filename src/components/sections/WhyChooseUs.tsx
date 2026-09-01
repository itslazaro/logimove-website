import { BadgeDollarSign, MessageCircle, Navigation, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    Icon: MessageCircle,
    title: "Answers in minutes on WhatsApp",
    text: "Talk to a real logistics specialist the moment you reach out — no ticket queues.",
  },
  {
    Icon: ShieldCheck,
    title: "Licensed customs expertise",
    text: "Certified brokers handle documentation and compliance so nothing gets held at the border.",
  },
  {
    Icon: Navigation,
    title: "Live tracking on every leg",
    text: "Follow your cargo from pickup to delivery with real-time status across all modes.",
  },
  {
    Icon: BadgeDollarSign,
    title: "Transparent, competitive pricing",
    text: "Clear quotes with no hidden fees. You know the full cost before you commit.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why LogiMove"
              title="A logistics partner you can actually rely on"
              description="We built our processes around the two things shippers care about most: speed and certainty."
            />

            <ul className="space-y-6">
              {reasons.map(({ Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.06}>
                  <li className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon aria-hidden className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink-900">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.15}>
            <div className="relative rounded-3xl bg-ink-900 p-8 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-500/25 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm text-gray-100/70">LM-88214</p>
                  <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-900">
                    In transit
                  </span>
                </div>

                <div className="mt-8 flex items-center gap-3 text-sm">
                  <span className="font-semibold">Shanghai</span>
                  <span aria-hidden className="flex-1 border-t-2 border-dashed border-white/20" />
                  <span className="font-semibold">Los Angeles</span>
                </div>

                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[72%] rounded-full bg-brand-500" />
                </div>
                <p className="mt-2 text-xs text-gray-100/60">Ocean FCL · 20&apos; container · ETA 6 days</p>

                <div className="mt-8 flex items-center justify-between rounded-2xl bg-white/5 p-4">
                  <div>
                    <p className="text-xs text-gray-100/60">Current location</p>
                    <p className="mt-0.5 font-semibold">Port of Long Beach</p>
                  </div>
                  <Truck aria-hidden className="size-8 text-brand-400" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
