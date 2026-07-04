import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Stagger, StaggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";
import { problems } from "@/lib/data";

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32" id="solutions">
      <Container>
        <SectionHeading
          badge={<Badge>The problem</Badge>}
          title={
            <>
              Great dentistry is being buried <br className="hidden md:block" />
              under terrible admin.
            </>
          }
          subtitle="Independent practices lose thousands of dollars a month — not to bad clinical work, but to missed calls, empty chairs, claim denials, and software that doesn't talk to itself."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map(({ icon: Icon, title, description, stat }) => (
            <StaggerItem key={title}>
              <SpotlightCard className="h-full p-6 transition-shadow duration-300 hover:shadow-premium">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-rose-600/80 dark:text-rose-400/80">
                  {stat}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
