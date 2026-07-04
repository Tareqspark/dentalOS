"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  CalendarClock,
  FileText,
  LineChart,
  Mic,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Container } from "../ui/primitives";
import { Reveal, Stagger, StaggerItem } from "../ui/reveal";

const capabilities = [
  { icon: Mic, title: "Voice AI", description: "Natural phone conversations that book, reschedule, and triage." },
  { icon: Bot, title: "AI Receptionist", description: "Every call answered on the first ring, 24/7/365." },
  { icon: FileText, title: "AI Documentation", description: "SOAP notes and CDT codes drafted from the visit itself." },
  { icon: BrainCircuit, title: "Clinical Assistant", description: "Risk flags, drug interactions, and treatment suggestions." },
  { icon: TrendingUp, title: "Revenue AI", description: "Underpaid claims caught, unscheduled treatment surfaced." },
  { icon: LineChart, title: "Predictive Analytics", description: "No-shows and cancellations predicted before they happen." },
  { icon: CalendarClock, title: "Smart Scheduling", description: "Cancellations refilled from the waitlist automatically." },
  { icon: Sparkles, title: "Business Intelligence", description: "A daily briefing that reads your practice for you." },
];

/** Concentric animated orb representing the AI engine. */
function AIOrb() {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-ai-400/40"
          style={{ inset: i * 22 }}
          animate={reduced ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}
      <motion.span
        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-ai-600 text-white shadow-glow-ai"
        animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={30} />
      </motion.span>
    </div>
  );
}

export function AISection() {
  return (
    <section id="ai" className="relative overflow-hidden py-24 md:py-32">
      {/* Deep gradient panel */}
      <div className="absolute inset-x-0 inset-y-8 mx-auto max-w-[96rem] rounded-[2.5rem] bg-gradient-to-b from-[#0e1230] via-[#141543] to-[#0e1230] sm:inset-x-4" />
      <div className="bg-dots absolute inset-y-8 inset-x-0 mx-auto max-w-[96rem] rounded-[2.5rem] opacity-20 sm:inset-x-4" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-ai-500/25 blur-3xl" />

      <Container className="relative text-white">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-ai-400/40 bg-ai-500/15 px-4 py-1.5 text-xs font-semibold text-ai-200">
              <Sparkles size={13} /> One AI engine. Every workflow.
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              An AI workforce that never <br className="hidden md:block" />
              calls in sick.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              DentalOS is built on a unified AI platform — not chatbot widgets bolted onto old software. The same
              engine that answers your phones writes your notes, watches your revenue, and fills your schedule.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <AIOrb />
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-ai-400/50 hover:bg-white/10">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/80 to-ai-500/80 text-white">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* AI receptionist chat demo */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live call · 8:47 PM — after hours
            </p>
            <div className="space-y-3.5 text-sm">
              <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-white/85">
                Hi, I broke a crown tonight — can I get in tomorrow morning?
              </div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-brand-600 to-ai-600 px-4 py-2.5">
                I'm sorry to hear that! I can get you in with Dr. Mitchell tomorrow at 9:40 AM for an emergency crown
                evaluation. You're covered — your Delta Dental plan is active. Shall I book it?
              </div>
              <div className="max-w-[60%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-white/85">
                Yes please, that's perfect.
              </div>
              <div className="ml-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-br-md bg-gradient-to-r from-brand-600 to-ai-600 px-4 py-2.5">
                Done! You'll get a text confirmation shortly. Feel better soon. 🦷
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
