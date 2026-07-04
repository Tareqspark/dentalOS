"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/reveal";
import { workflow } from "@/lib/data";

export function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          badge={<Badge>How it works</Badge>}
          title="From first call to next recall — on autopilot."
          subtitle="One patient journey, seven steps, zero dropped balls. Here's a day in the life of a DentalOS practice."
        />

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* animated spine */}
          <div className="absolute bottom-4 left-[22px] top-4 w-px bg-[var(--grid-line)] sm:left-1/2" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-brand-500 to-ai-500"
              style={{ scaleY: reduced ? 1 : lineScale }}
            />
          </div>

          <ol className="space-y-10">
            {workflow.map((w, i) => (
              <li key={w.step} className="relative">
                <Reveal delay={0.05}>
                  <div
                    className={`flex items-start gap-6 pl-14 sm:w-1/2 sm:pl-0 ${
                      i % 2 === 0
                        ? "sm:pr-12 sm:text-right"
                        : "sm:ml-auto sm:flex-row-reverse sm:pl-12 sm:text-left"
                    }`}
                  >
                    <div className="flex-1">
                      <span className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400">
                        STEP {w.step}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold">{w.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-2)]">{w.description}</p>
                    </div>
                  </div>
                  {/* node */}
                  <span
                    className="absolute left-[13px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-500 bg-[var(--page)] sm:left-1/2 sm:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
