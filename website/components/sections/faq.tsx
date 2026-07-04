"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/reveal";
import { faqs } from "@/lib/data";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[var(--surface)] py-24 md:py-32" id="faq">
      <Container>
        <SectionHeading
          badge={<Badge>FAQ</Badge>}
          title="Questions dentists actually ask us."
          subtitle="Everything else — our team answers live chat in under two minutes."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.03, 0.2)}>
                <div className={`card overflow-hidden rounded-2xl transition-shadow ${isOpen ? "shadow-premium" : ""}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={18} className="shrink-0 text-[var(--ink-muted)]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--ink-2)]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
