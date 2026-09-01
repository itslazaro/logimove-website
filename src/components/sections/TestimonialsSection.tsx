import { Quote, Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={i < rating ? "size-4 fill-brand-500 text-brand-500" : "size-4 text-gray-200"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What our customers say"
          description="Reviews from shippers who moved freight with us."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={(index % 2) * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <Stars rating={t.rating} />
                  <Quote aria-hidden className="size-7 text-brand-100" />
                </div>
                <blockquote className="mt-4 flex-1 text-gray-600">“{t.content}”</blockquote>
                <figcaption className="mt-6 border-t border-gray-100 pt-4">
                  <p className="font-semibold text-ink-900">{t.name}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{t.position}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-700">
                    {t.service}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
