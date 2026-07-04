import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Stagger, StaggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";
import { problems } from "@/lib/data";

/** Maps pain-point cards to their dedicated solution pages. */
const slugByTitle: Record<string, string> = {
  "Insurance paperwork": "insurance-paperwork",
  "No-shows & cancellations": "no-shows",
  "Missed calls": "missed-calls",
  "Phone interruptions": "phone-interruptions",
  "Revenue leakage": "revenue-leakage",
  "Disconnected software": "disconnected-software",
};

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
          subtitle="Independent practices lose thousands of dollars a month — not to bad clinical work, but to missed calls, empty chairs, claim denials, and software that doesn't talk to itself. Click any problem to see exactly how we solve it."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map(({ icon: Icon, title, description, stat }) => (
            <StaggerItem key={title} className="h-full">
              <Link href={`/solutions/${slugByTitle[title] ?? ""}`} className="block h-full">
                <SpotlightCard className="group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-2)]">{description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-rose-600/80 dark:text-rose-400/80">
                    {stat}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-brand-400">
                    See how we solve it
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </SpotlightCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
