import Link from "next/link";
import { ArrowRight, Plug } from "lucide-react";
import { Badge, Container, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/reveal";
import { integrations } from "@/lib/data";

function LogoPill({ name, category }: { name: string; category: string }) {
  return (
    <span className="card mx-2.5 inline-flex shrink-0 items-center gap-3 rounded-full py-2.5 pl-3 pr-5 shadow-premium">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-ai-100 text-brand-700 dark:from-brand-950 dark:to-ai-900 dark:text-brand-300">
        <span className="text-xs font-bold">{name.slice(0, 1)}</span>
      </span>
      <span className="text-left">
        <span className="block text-sm font-semibold leading-tight">{name}</span>
        <span className="block text-[10px] uppercase tracking-wide text-[var(--ink-muted)]">{category}</span>
      </span>
    </span>
  );
}

export function IntegrationsSection() {
  const rowA = integrations.slice(0, 8);
  const rowB = integrations.slice(8);
  return (
    <section className="overflow-hidden bg-[var(--surface)] py-24 md:py-28">
      <Container>
        <SectionHeading
          badge={
            <Badge>
              <Plug size={12} /> Integrations
            </Badge>
          }
          title="Plays perfectly with the tools you already use."
          subtitle="Payments, clearinghouses, imaging, accounting, and more — connected out of the box, with an open API for everything else."
        />
      </Container>

      <Reveal>
        <Link href="/integrations" aria-label="View all integrations" className="block">
          <div className="marquee-mask space-y-5">
            <div className="flex w-max animate-marquee">
              {[...rowA, ...rowA].map((it, i) => (
                <LogoPill key={`${it.name}-${i}`} {...it} />
              ))}
            </div>
            <div className="flex w-max animate-marquee [animation-direction:reverse] [animation-duration:48s]">
              {[...rowB, ...rowB].map((it, i) => (
                <LogoPill key={`${it.name}-${i}`} {...it} />
              ))}
            </div>
          </div>
        </Link>
      </Reveal>

      <Container>
        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-400"
            >
              View all integrations & the open API <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
