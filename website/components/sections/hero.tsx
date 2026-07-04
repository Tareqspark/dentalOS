"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, CalendarCheck2, PhoneIncoming, Sparkles, Star, TrendingUp } from "lucide-react";
import { Button, Container } from "../ui/primitives";
import { RevenueChart, Sparkline } from "../charts/charts";

function FloatingCard({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`glass absolute z-20 rounded-2xl p-3.5 shadow-premium-lg ${reduced ? "" : "animate-float"} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40" id="top">
      {/* Background: dot grid + gradient blobs */}
      <div className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400/25 via-ai-400/20 to-brand-300/25 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-ai-200 bg-ai-100/60 px-4 py-1.5 text-xs font-semibold text-ai-700 dark:border-ai-800 dark:bg-ai-900/40 dark:text-ai-300">
                <Sparkles size={13} />
                The AI-first dental practice platform
              </span>
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
            >
              Your dental practice, <br className="hidden sm:block" />
              <span className="gradient-text">run by intelligence.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--ink-2)]"
            >
              DentalOS replaces your PMS, phones, billing, and marketing stack with one platform where AI answers every
              call, fills every chair, and files every claim — so your team can focus on patients, not paperwork.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button href="#contact" variant="ai" size="lg">
                Book Demo
              </Button>
              <Button href="#pricing" variant="secondary" size="lg">
                Start Free Trial
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--ink-2)]"
            >
              <div className="flex -space-x-2.5">
                {["SM", "JO", "EC", "PR"].map((i, idx) => (
                  <span
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--page)] bg-gradient-to-br from-brand-400 to-ai-500 text-[10px] font-bold text-white"
                    style={{ zIndex: 4 - idx }}
                  >
                    {i}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1.5">
                <span className="flex text-amber-500" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <strong className="text-[var(--ink)]">4.9</strong> from 2,300+ practices
              </span>
              <span className="hidden text-[var(--ink-muted)] sm:inline">HIPAA compliant · SOC 2 audited</span>
            </motion.div>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <div className="card relative z-10 rounded-3xl p-5 shadow-premium-lg sm:p-6">
              {/* window chrome */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  Live · Practice Dashboard
                </span>
              </div>

              {/* KPI row */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Today's production", value: "$12,480", trend: [4, 6, 5, 8, 7, 10, 11] },
                  { label: "Patients today", value: "34", trend: [5, 6, 8, 7, 9, 9, 11] },
                  { label: "Fill rate", value: "94%", trend: [7, 8, 8, 9, 10, 10, 11] },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl border border-[var(--hairline)] p-3">
                    <p className="truncate text-[10px] text-[var(--ink-muted)]">{k.label}</p>
                    <p className="mt-0.5 text-base font-bold sm:text-lg">{k.value}</p>
                    <Sparkline values={k.trend} />
                  </div>
                ))}
              </div>

              <RevenueChart />
            </div>

            {/* Floating cards */}
            <FloatingCard className="-left-4 top-10 hidden w-56 sm:block" delay={0.7}>
              <div className="flex items-start gap-3">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-ai-500 text-white">
                  <Bot size={16} />
                  <span className="absolute inset-0 rounded-full bg-ai-400/50 animate-pulse-ring" />
                </span>
                <div>
                  <p className="text-xs font-semibold">AI Receptionist</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[var(--ink-2)]">
                    Booked Sarah M. — cleaning, Tue 9:30 AM
                  </p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="-right-3 top-1/3 hidden w-48 md:block animate-float-slow" delay={0.9}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  <TrendingUp size={15} />
                </span>
                <div>
                  <p className="text-xs font-semibold">Claim approved</p>
                  <p className="text-[11px] text-[var(--ink-2)]">Delta Dental · $1,240</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="-bottom-6 left-10 hidden w-60 sm:block animate-float-slow" delay={1.1}>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  <PhoneIncoming size={15} />
                </span>
                <div>
                  <p className="text-xs font-semibold">Missed call recovered</p>
                  <p className="text-[11px] leading-snug text-[var(--ink-2)]">
                    Auto-text sent · patient rebooked in 4 min
                  </p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="-bottom-4 -right-2 hidden md:block" delay={1.3}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ai-100 text-ai-700 dark:bg-ai-900/60 dark:text-ai-300">
                  <CalendarCheck2 size={15} />
                </span>
                <div>
                  <p className="text-xs font-semibold">Cancellation refilled</p>
                  <p className="text-[11px] text-[var(--ink-2)]">Waitlist · 11:00 AM slot</p>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
