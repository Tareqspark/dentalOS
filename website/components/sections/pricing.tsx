"use client";

import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Container, SectionHeading } from "../ui/primitives";
import { Reveal, Stagger, StaggerItem } from "../ui/reveal";
import { plans, comparisonRows } from "@/lib/data";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 md:py-32" id="pricing">
      <Container>
        <SectionHeading
          badge={<Badge>Pricing</Badge>}
          title="One subscription. Everything included."
          subtitle="Unlimited patients, unlimited appointments, free updates and migration. No per-module surprises."
        />

        {/* Toggle */}
        <Reveal className="mb-12 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!annual ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"}`}>
            Monthly
          </span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual(!annual)}
            className="relative h-7 w-13 rounded-full bg-brand-600 transition-colors"
            style={{ width: 52 }}
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300"
              style={{ left: annual ? 26 : 4 }}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"}`}>
            Annual
            <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              Save ~17%
            </span>
          </span>
        </Reveal>

        {/* Cards */}
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-7 ${
                  p.highlight
                    ? "border-2 border-transparent bg-[var(--surface)] shadow-glow-ai [background:linear-gradient(var(--surface),var(--surface))_padding-box,linear-gradient(120deg,#2a78d6,#6d5ce0)_border-box]"
                    : "card"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-brand-600 to-ai-600 px-4 py-1 text-xs font-bold text-white shadow-glow-ai">
                    <Sparkles size={12} /> Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="mt-1 min-h-10 text-sm text-[var(--ink-2)]">{p.tagline}</p>
                <div className="mt-5">
                  {p.monthly === 0 ? (
                    <p className="text-4xl font-bold tracking-tight">Custom</p>
                  ) : (
                    <p className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
                        ${annual ? p.annual : p.monthly}
                      </span>
                      <span className="text-sm text-[var(--ink-muted)]">/mo per location</span>
                    </p>
                  )}
                  {p.monthly !== 0 && annual && (
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">billed annually</p>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-2)]">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href="#contact"
                  variant={p.highlight ? "ai" : "secondary"}
                  className="mt-8 w-full"
                  size="lg"
                >
                  {p.cta}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Comparison table */}
        <Reveal delay={0.1}>
          <div className="card mt-16 overflow-x-auto rounded-3xl">
            <table className="w-full min-w-[640px] text-sm">
              <caption className="sr-only">Plan feature comparison</caption>
              <thead>
                <tr className="border-b border-[var(--hairline)] text-left">
                  <th scope="col" className="px-6 py-4 font-semibold">Compare plans</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Starter</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-brand-600 dark:text-brand-400">
                    Professional
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-[var(--hairline)] last:border-0 ${i % 2 ? "bg-black/[0.015] dark:bg-white/[0.02]" : ""}`}
                  >
                    <th scope="row" className="px-6 py-3.5 text-left font-medium text-[var(--ink-2)]">
                      {row.label}
                    </th>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className={`px-6 py-3.5 ${v === "✓" ? "font-bold text-brand-600 dark:text-brand-400" : v === "—" ? "text-[var(--ink-muted)]" : "text-[var(--ink-2)]"}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-[var(--ink-muted)]">
          All plans include free data migration, onboarding, and a 30-day money-back guarantee.
        </p>
      </Container>
    </section>
  );
}
