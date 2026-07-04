import { CheckCircle2 } from "lucide-react";
import { Badge, Container } from "../ui/primitives";
import { Reveal } from "../ui/reveal";
import { UtilizationBars, DonutGauge } from "../charts/charts";

const pillars = [
  {
    title: "One platform, zero double entry",
    description:
      "Scheduling, records, imaging, billing, insurance, and marketing share one patient record. Enter it once; it's everywhere.",
  },
  {
    title: "AI does the repetitive work",
    description:
      "Calls answered, notes drafted, claims scrubbed, recalls sent, cancellations refilled — automatically, around the clock.",
  },
  {
    title: "You see everything in real time",
    description:
      "Production, chairs, claims, and balances update live. Decisions made on today's numbers, not last month's report.",
  },
];

export function SolutionSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Badge>The solution</Badge>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              Meet DentalOS — the operating system your practice deserved all along.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink-2)]">
              Everything your practice runs on, unified and automated by AI. Not another tool to manage — the last
              platform you'll need to switch to.
            </p>
            <ul className="mt-8 space-y-6">
              {pillars.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--ink-2)]">{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="card rounded-3xl p-6 shadow-premium-lg">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-semibold">Operations · Today</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Live
                  </span>
                </div>
                <UtilizationBars />
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--hairline)] pt-6">
                  <DonutGauge value={94} label="Schedule fill rate" />
                  <DonutGauge value={87} label="Recall response" color="var(--series-2)" />
                </div>
              </div>
              <div className="glass absolute -bottom-5 -left-4 hidden rounded-2xl px-4 py-3 shadow-premium-lg sm:block">
                <p className="text-xs font-semibold">AI Insight</p>
                <p className="mt-0.5 max-w-52 text-[11px] leading-snug text-[var(--ink-2)]">
                  Hyg 2 has 3 open slots Thursday — 12 overdue recall patients match. Outreach queued.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
