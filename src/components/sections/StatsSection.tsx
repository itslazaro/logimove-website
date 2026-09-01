import { stats } from "@/content/stats";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";

export function StatsSection() {
  return (
    <section className="bg-ink-900 py-16 sm:py-20">
      <Container>
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08}>
              <div className="text-center">
                <StatCounter {...stat} onDark />
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
