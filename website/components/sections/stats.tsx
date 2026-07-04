"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Container } from "../ui/primitives";
import { stats } from "@/lib/data";

function Counter({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = value.toFixed(decimals);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduced]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      <Container className="relative">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="gradient-text text-4xl font-bold tracking-tight md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </dd>
              <dt className="mt-2 text-sm font-medium text-[var(--ink-2)]">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-center text-sm text-[var(--ink-muted)]">
          Trusted by thousands of practices, from single-chair startups to 20-location groups.
        </p>
      </Container>
    </section>
  );
}
