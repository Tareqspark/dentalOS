import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { Accordion } from "@/components/ui/accordion";
import { Badge, Button, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getModule, modules } from "@/lib/modules";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) return {};
  return {
    title: `${mod.name} for Dental Practices`,
    description: mod.metaDescription,
    alternates: { canonical: `/features/${mod.slug}` },
    openGraph: { title: `DentalOS ${mod.name}`, description: mod.metaDescription },
  };
}

export default async function ModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const Icon = mod.icon;
  const related = mod.related.map(getModule).filter(Boolean);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dentalos.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.dentalos.com/features" },
      { "@type": "ListItem", position: 3, name: mod.name, item: `https://www.dentalos.com/features/${mod.slug}` },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mod.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, faqJsonLd]) }}
      />
      <Nav />
      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_55%_at_50%_25%,black,transparent)]" />
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400/20 via-ai-400/15 to-brand-300/20 blur-3xl" />

          <Container className="relative">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-[var(--ink-muted)]">
                <Link href="/" className="transition-colors hover:text-[var(--ink)]">Home</Link>
                <ChevronRight size={14} />
                <Link href="/features" className="transition-colors hover:text-[var(--ink)]">Features</Link>
                <ChevronRight size={14} />
                <span className="font-medium text-[var(--ink)]">{mod.name}</span>
              </nav>

              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      mod.ai
                        ? "bg-gradient-to-br from-brand-500 to-ai-500 text-white shadow-glow-ai"
                        : "bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300"
                    }`}
                  >
                    <Icon size={26} />
                  </span>
                  <Badge>{mod.category}</Badge>
                  {mod.ai && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-ai-200 bg-ai-100/60 px-3 py-1 text-xs font-semibold text-ai-700 dark:border-ai-800 dark:bg-ai-900/40 dark:text-ai-300">
                      <Sparkles size={12} /> Powered by the DentalOS AI engine
                    </span>
                  )}
                </div>

                <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                  {mod.tagline}
                </h1>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-[var(--ink-2)]">{mod.description}</p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/#contact" variant="ai" size="lg">
                    Book Demo
                  </Button>
                  <Button href="/#pricing" variant="secondary" size="lg">
                    See Pricing
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.15}>
              <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                {mod.stats.map((s) => (
                  <div key={s.label} className="card rounded-2xl px-6 py-5">
                    <dd className="gradient-text text-3xl font-bold tracking-tight">{s.value}</dd>
                    <dt className="mt-1 text-sm text-[var(--ink-2)]">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>

        {/* Capabilities */}
        <section className="bg-[var(--surface)] py-20 md:py-28">
          <Container>
            <SectionHeading
              badge={<Badge>Capabilities</Badge>}
              title={`Everything inside ${mod.name}`}
              subtitle="Built in — not an add-on, not an integration, not an upsell."
            />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mod.capabilities.map(({ icon: CapIcon, title, description }) => (
                <StaggerItem key={title} className="h-full">
                  <SpotlightCard className="h-full p-6 transition-shadow duration-300 hover:shadow-premium">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300">
                      <CapIcon size={20} />
                    </span>
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{description}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* How it works */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading badge={<Badge>How it works</Badge>} title={`${mod.name} in four steps`} />
            <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {mod.steps.map((s, i) => (
                <StaggerItem key={s.title} className="h-full">
                  <div className="card relative h-full rounded-2xl p-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-ai-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{s.description}</p>
                    {i < mod.steps.length - 1 && (
                      <ArrowRight
                        size={18}
                        className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[var(--ink-muted)] lg:block"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--surface)] py-20 md:py-28">
          <Container>
            <SectionHeading badge={<Badge>FAQ</Badge>} title={`Common questions about ${mod.name}`} />
            <Reveal className="mx-auto max-w-3xl">
              <Accordion items={mod.faqs} />
            </Reveal>
          </Container>
        </section>

        {/* Related modules */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading
              badge={<Badge>Works better together</Badge>}
              title="Modules that pair with this one"
              subtitle="Every module shares the same patient record and AI engine — value compounds as you use more."
            />
            <Stagger className="grid gap-5 sm:grid-cols-3">
              {related.map((r) => {
                if (!r) return null;
                const RIcon = r.icon;
                return (
                  <StaggerItem key={r.slug} className="h-full">
                    <Link href={`/features/${r.slug}`} className="block h-full">
                      <SpotlightCard className="group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                            r.ai
                              ? "bg-gradient-to-br from-brand-500 to-ai-500 text-white"
                              : "bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300"
                          }`}
                        >
                          <RIcon size={20} />
                        </span>
                        <h3 className="mt-4 font-semibold">{r.name}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-2)]">{r.tagline}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                          Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </SpotlightCard>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Container>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
