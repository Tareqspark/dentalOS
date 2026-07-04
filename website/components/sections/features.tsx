import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Stagger, StaggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";
import { features } from "@/lib/data";

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32" id="features">
      <Container>
        <SectionHeading
          badge={<Badge>Everything included</Badge>}
          title="Thirteen tools you pay for today. One platform tomorrow."
          subtitle="Every module is built in — not bolted on. One login, one patient record, one monthly bill."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, description, ai }) => (
            <StaggerItem key={title} className="h-full">
              <SpotlightCard className="group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                      ai
                        ? "bg-gradient-to-br from-brand-500 to-ai-500 text-white"
                        : "bg-brand-50 text-brand-600 group-hover:bg-brand-100 dark:bg-brand-950/60 dark:text-brand-300"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  {ai && (
                    <span className="flex items-center gap-1 rounded-full bg-ai-100/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ai-700 dark:bg-ai-900/50 dark:text-ai-300">
                      <Sparkles size={10} /> AI
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-2)]">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-brand-400">
                  Learn more <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
