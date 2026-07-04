import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { Badge, Container } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { modules, moduleCategories } from "@/lib/modules";

export const metadata: Metadata = {
  title: "Features — Every module of the dental practice OS",
  description:
    "Explore every DentalOS module: AI receptionist, scheduling, clinical records, insurance automation, billing, imaging, analytics, and more — one integrated platform.",
  alternates: { canonical: "/features" },
};

export default function FeaturesIndex() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44">
          <div className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_20%,black,transparent)]" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[54rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400/20 to-ai-400/20 blur-3xl" />
          <Container className="relative text-center">
            <Reveal>
              <Badge>Platform overview</Badge>
              <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:leading-[1.1]">
                One platform. <span className="gradient-text">Every module</span> your practice runs on.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--ink-2)]">
                Thirteen deeply integrated modules sharing one patient record, one calendar, and one AI engine. Explore
                each one — or see them working together in a demo.
              </p>
            </Reveal>
          </Container>
        </section>

        {moduleCategories.map((cat) => {
          const items = modules.filter((m) => m.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="py-10">
              <Container>
                <Reveal>
                  <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-[var(--ink-muted)]">{cat}</h2>
                </Reveal>
                <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ slug, name, icon: Icon, tagline, ai }) => (
                    <StaggerItem key={slug} className="h-full">
                      <Link href={`/features/${slug}`} className="block h-full">
                        <SpotlightCard className="group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                          <div className="flex items-start justify-between">
                            <span
                              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                ai
                                  ? "bg-gradient-to-br from-brand-500 to-ai-500 text-white"
                                  : "bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300"
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
                          <h3 className="mt-4 text-lg font-semibold">{name}</h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-2)]">{tagline}</p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                            Explore {name}
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </SpotlightCard>
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Container>
            </section>
          );
        })}

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
