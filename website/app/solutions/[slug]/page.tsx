import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { Badge, Button, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getSolution, solutions } from "@/lib/solutions";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const sol = getSolution(slug);
  if (!sol) return {};
  return {
    title: `${sol.name} — Solved`,
    description: sol.metaDescription,
    alternates: { canonical: `/solutions/${sol.slug}` },
    openGraph: { title: `DentalOS solves ${sol.name.toLowerCase()}`, description: sol.metaDescription },
  };
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sol = getSolution(slug);
  if (!sol) notFound();

  const Icon = sol.icon;

  return (
    <>
      <Nav />
      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_55%_at_50%_25%,black,transparent)]" />
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-300/20 via-brand-400/15 to-brand-300/20 blur-3xl" />

          <Container className="relative">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-[var(--ink-muted)]">
                <Link href="/" className="transition-colors hover:text-[var(--ink)]">Home</Link>
                <ChevronRight size={14} />
                <Link href="/#solutions" className="transition-colors hover:text-[var(--ink)]">Solutions</Link>
                <ChevronRight size={14} />
                <span className="font-medium text-[var(--ink)]">{sol.name}</span>
              </nav>

              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                    <Icon size={26} />
                  </span>
                  <Badge>Problem, solved</Badge>
                </div>
                <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                  {sol.headline}
                </h1>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-[var(--ink-2)]">{sol.description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/#contact" variant="ai" size="lg">Book Demo</Button>
                  <Button href="/features" variant="secondary" size="lg">Explore Features</Button>
                </div>
              </div>
            </Reveal>

            {/* Cost of the problem */}
            <Reveal delay={0.15}>
              <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                {sol.costStats.map((s) => (
                  <div key={s.label} className="card rounded-2xl px-6 py-5">
                    <dd className="text-3xl font-bold tracking-tight text-rose-600 dark:text-rose-400">{s.value}</dd>
                    <dt className="mt-1 text-sm text-[var(--ink-2)]">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>

        {/* What it looks like today */}
        <section className="bg-[var(--surface)] py-20 md:py-28">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <Reveal>
                <Badge className="!border-rose-200 !bg-rose-50 !text-rose-700 dark:!border-rose-900 dark:!bg-rose-950/40 dark:!text-rose-300">
                  Sound familiar?
                </Badge>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  What {sol.name.toLowerCase()} looks like day to day
                </h2>
                <ul className="mt-8 space-y-4">
                  {sol.painPoints.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <XCircle size={19} className="mt-0.5 shrink-0 text-rose-500" />
                      <span className="text-[var(--ink-2)]">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="card rounded-3xl bg-gradient-to-b from-emerald-50/50 to-transparent p-8 dark:from-emerald-950/20">
                  <Badge className="!border-emerald-200 !bg-emerald-50 !text-emerald-700 dark:!border-emerald-900 dark:!bg-emerald-950/40 dark:!text-emerald-300">
                    After DentalOS
                  </Badge>
                  <p className="mt-5 text-lg leading-relaxed text-[var(--ink-2)]">{sol.outcome}</p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* How DentalOS fixes it */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading
              badge={<Badge>The fix</Badge>}
              title={`How DentalOS eliminates ${sol.name.toLowerCase()}`}
              subtitle="Each fix links to the module that does the work — explore them in depth."
            />
            <Stagger className="grid gap-5 sm:grid-cols-2">
              {sol.fixes.map(({ icon: FixIcon, title, description, moduleSlug, moduleName }) => (
                <StaggerItem key={title} className="h-full">
                  <SpotlightCard className="group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <FixIcon size={20} />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-2)]">{description}</p>
                    <Link
                      href={`/features/${moduleSlug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-400"
                    >
                      Powered by {moduleName}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* Other problems */}
        <section className="bg-[var(--surface)] py-20 md:py-28">
          <Container>
            <SectionHeading badge={<Badge>More problems we solve</Badge>} title="What else is draining your practice?" />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {solutions
                .filter((s) => s.slug !== sol.slug)
                .map((s) => {
                  const SIcon = s.icon;
                  return (
                    <StaggerItem key={s.slug} className="h-full">
                      <Link href={`/solutions/${s.slug}`} className="block h-full">
                        <div className="card group flex h-full flex-col items-start rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                            <SIcon size={18} />
                          </span>
                          <h3 className="mt-3 text-sm font-semibold">{s.name}</h3>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                            See the fix <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
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
