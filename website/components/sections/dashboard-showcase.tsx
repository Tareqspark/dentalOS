"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlarmClock,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/reveal";
import { RevenueChart, Sparkline, UtilizationBars } from "../charts/charts";

const kpis = [
  {
    icon: CircleDollarSign,
    label: "Production MTD",
    value: "$186,240",
    delta: "+12.4%",
    up: true,
    trend: [5, 6, 6, 8, 7, 9, 11],
  },
  {
    icon: Users,
    label: "New patients",
    value: "47",
    delta: "+8 vs last month",
    up: true,
    trend: [4, 5, 7, 6, 8, 9, 10],
  },
  {
    icon: FileCheck2,
    label: "Claims pending",
    value: "$23,180",
    delta: "-18% aging",
    up: true,
    trend: [10, 9, 9, 8, 7, 6, 5],
  },
  {
    icon: AlarmClock,
    label: "No-show rate",
    value: "2.1%",
    delta: "-3.2 pts",
    up: true,
    trend: [11, 9, 8, 7, 5, 4, 4],
  },
];

const insights = [
  "Thursday PM is 22% under-booked — recall blast queued for 38 overdue hygiene patients.",
  "Delta Dental reimbursements trail contract by $14/claim on D2740. Review fee schedule.",
  "3 high-value treatment plans ($9,400) unaccepted for 14+ days — follow-ups scheduled.",
];

const tasks = [
  { label: "Verify insurance — 12 patients (tomorrow)", done: true },
  { label: "Call lab: crown for J. Alvarez due Thu", done: false },
  { label: "Review 2 flagged claim denials", done: false },
];

const activity = [
  { text: "AI booked new patient consult — Marcus T.", time: "2m", accent: true },
  { text: "Payment received $340 — text-to-pay", time: "9m" },
  { text: "ERA auto-posted — $4,120 (14 claims)", time: "26m" },
  { text: "Recall SMS batch sent — 52 patients", time: "1h" },
];

export function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32">
      <div className="pointer-events-none absolute -left-52 top-40 h-96 w-96 rounded-full bg-ai-400/15 blur-3xl" />
      <Container>
        <SectionHeading
          badge={<Badge>Command center</Badge>}
          title="The whole practice on one screen. Live."
          subtitle="Production, chairs, claims, and patient flow — updating in real time, with AI telling you what to do about it."
        />

        <Reveal>
          <div className="card mx-auto max-w-6xl rounded-3xl p-5 shadow-premium-lg sm:p-7">
            {/* KPI row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map(({ icon: Icon, label, value, delta, up, trend }) => (
                <div key={label} className="rounded-2xl border border-[var(--hairline)] p-4 transition-shadow hover:shadow-premium">
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300">
                      <Icon size={15} />
                    </span>
                    <Sparkline values={trend} />
                  </div>
                  <p className="mt-3 text-xs text-[var(--ink-muted)]">{label}</p>
                  <p className="text-xl font-bold tracking-tight">{value}</p>
                  <p
                    className={`mt-1 flex items-center gap-1 text-xs font-semibold ${
                      up ? "text-[var(--good)]" : "text-rose-600"
                    }`}
                  >
                    {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {delta}
                  </p>
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <div className="rounded-2xl border border-[var(--hairline)] p-5">
                <RevenueChart />
              </div>

              <div className="rounded-2xl border border-ai-200/70 bg-gradient-to-b from-ai-100/40 to-transparent p-5 dark:border-ai-800/50 dark:from-ai-900/20">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles size={15} className="text-ai-600 dark:text-ai-400" />
                  AI Insights
                </p>
                <ul className="mt-4 space-y-3.5">
                  {insights.map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                      className="rounded-xl bg-[var(--surface)] p-3 text-xs leading-relaxed text-[var(--ink-2)] shadow-premium"
                    >
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--hairline)] p-5">
                <UtilizationBars />
              </div>

              <div className="rounded-2xl border border-[var(--hairline)] p-5">
                <p className="mb-3 text-xs font-medium text-[var(--ink-muted)]">Tasks</p>
                <ul className="space-y-3">
                  {tasks.map((t) => (
                    <li key={t.label} className="flex items-start gap-2.5 text-xs leading-relaxed">
                      <CheckCircle2
                        size={15}
                        className={`mt-px shrink-0 ${t.done ? "text-[var(--good)]" : "text-[var(--ink-muted)]"}`}
                      />
                      <span className={t.done ? "text-[var(--ink-muted)] line-through" : "text-[var(--ink-2)]"}>
                        {t.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--hairline)] p-5">
                <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-[var(--ink-muted)]">
                  <Activity size={13} /> Recent activity
                </p>
                <ul className="space-y-3">
                  {activity.map((a) => (
                    <li key={a.text} className="flex items-start justify-between gap-2 text-xs">
                      <span className={`leading-relaxed ${a.accent ? "font-medium text-[var(--ink)]" : "text-[var(--ink-2)]"}`}>
                        {a.text}
                      </span>
                      <span className="shrink-0 text-[var(--ink-muted)]">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
