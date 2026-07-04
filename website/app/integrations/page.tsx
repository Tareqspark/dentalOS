import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Plug, Webhook } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { Badge, Button, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export const metadata: Metadata = {
  title: "Integrations — Connect your whole stack",
  description:
    "DentalOS integrations: payment processors, insurance clearinghouses, imaging devices, accounting, email, SMS, calendars, and an open API with webhooks and Zapier.",
  alternates: { canonical: "/integrations" },
};

const groups: {
  category: string;
  blurb: string;
  items: { name: string; text: string }[];
}[] = [
  {
    category: "Payments & Financing",
    blurb: "Money moves through DentalOS natively — cards, terminals, wallets, and patient financing.",
    items: [
      { name: "Stripe", text: "Card-present terminals, card on file, ACH, Apple Pay and Google Pay — with settlement reconciliation into the day sheet." },
      { name: "CareCredit", text: "Patient financing applications launched straight from the treatment plan, with approvals posting as payment methods." },
    ],
  },
  {
    category: "Insurance & Claims",
    blurb: "Real-time payer connectivity for the entire revenue cycle.",
    items: [
      { name: "Change Healthcare", text: "Eligibility (270/271), electronic claims (837D), status checks (276/277), and remittance (835) across thousands of payers." },
      { name: "DentalXChange", text: "Claim attachments — X-rays, perio charts, narratives — delivered electronically with the claim that needs them." },
    ],
  },
  {
    category: "Imaging & Devices",
    blurb: "Your sensors and scanners feed the chart directly.",
    items: [
      { name: "Dexis / Carestream", text: "Sensor and pano capture via the DentalOS device bridge, straight into the patient's imaging timeline." },
      { name: "iTero", text: "Intraoral scan import for treatment planning and lab prescriptions." },
      { name: "DICOM", text: "Native DICOM ingest, storage, and DICOMweb sharing for CBCT and cross-system interoperability." },
    ],
  },
  {
    category: "Communication",
    blurb: "The channels patients actually answer.",
    items: [
      { name: "Twilio", text: "Per-location numbers, two-way SMS, and the voice infrastructure behind the AI receptionist — 10DLC compliant." },
      { name: "Email (SES/Postmark)", text: "Transactional reminders and receipts on dedicated sending infrastructure with open and click tracking." },
      { name: "Google Business Profile", text: "Review monitoring, reply-from-app, and the review links that power reputation automation." },
    ],
  },
  {
    category: "Back Office",
    blurb: "Bookkeeping and payroll without re-typing.",
    items: [
      { name: "QuickBooks Online", text: "Day-sheet journal entries synced automatically — your accountant sees clean books, not screenshots." },
      { name: "Gusto / ADP", text: "Time-clock and payroll exports in the formats your payroll provider expects." },
    ],
  },
  {
    category: "Calendars & Productivity",
    blurb: "Schedules where your team already looks.",
    items: [
      { name: "Google Calendar", text: "Provider schedules fed to personal calendars — one-way, PHI-safe." },
      { name: "Outlook", text: "The same feed for Microsoft practices." },
      { name: "Zapier", text: "Connect DentalOS events to 6,000+ apps — new patient → CRM, form response → spreadsheet, whatever your workflow needs." },
    ],
  },
  {
    category: "Storage & AI",
    blurb: "The platform underneath the platform.",
    items: [
      { name: "AWS S3", text: "Encrypted, versioned document and imaging storage with optional export to your own bucket." },
      { name: "Anthropic Claude", text: "The language intelligence behind the receptionist, clinical notes, and business briefings — via our audited AI gateway." },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-44">
          <div className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_20%,black,transparent)]" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[54rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400/20 to-ai-400/20 blur-3xl" />
          <Container className="relative">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-[var(--ink-muted)]">
                <Link href="/" className="transition-colors hover:text-[var(--ink)]">Home</Link>
                <ChevronRight size={14} />
                <span className="font-medium text-[var(--ink)]">Integrations</span>
              </nav>
              <div className="max-w-3xl">
                <Badge><Plug size={12} /> Integrations</Badge>
                <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:leading-[1.1]">
                  Plays perfectly with the tools you <span className="gradient-text">already trust.</span>
                </h1>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-[var(--ink-2)]">
                  DentalOS replaces the fragmented stack — but the tools worth keeping connect natively. Payments,
                  payers, imaging hardware, accounting, and 6,000+ apps through Zapier, all speaking to one source of
                  truth.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/#contact" variant="ai" size="lg">Ask about an integration</Button>
                  <Button href="/features" variant="secondary" size="lg">Explore the platform</Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <Container>
            <div className="space-y-14">
              {groups.map((g) => (
                <div key={g.category}>
                  <Reveal>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--ink-muted)]">{g.category}</h2>
                    <p className="mt-1.5 text-sm text-[var(--ink-2)]">{g.blurb}</p>
                  </Reveal>
                  <Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((it) => (
                      <StaggerItem key={it.name} className="h-full">
                        <SpotlightCard className="h-full p-5 transition-shadow duration-300 hover:shadow-premium">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-ai-100 text-sm font-bold text-brand-700 dark:from-brand-950 dark:to-ai-900 dark:text-brand-300">
                              {it.name.slice(0, 1)}
                            </span>
                            <h3 className="font-semibold">{it.name}</h3>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{it.text}</p>
                        </SpotlightCard>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ))}
            </div>

            {/* Open API */}
            <Reveal delay={0.1}>
              <div className="card mt-16 flex flex-col items-start gap-6 rounded-3xl p-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-ai-500 text-white">
                    <Webhook size={22} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold">Open API & webhooks</h2>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[var(--ink-2)]">
                      Everything the DentalOS interface can do, the REST API can do — because it's the same API. HMAC-signed
                      webhooks stream events like <code className="rounded bg-black/5 px-1.5 py-0.5 text-xs dark:bg-white/10">appointment.created</code> and{" "}
                      <code className="rounded bg-black/5 px-1.5 py-0.5 text-xs dark:bg-white/10">claim.denied</code> to your systems in real time.
                    </p>
                  </div>
                </div>
                <Button href="/#contact" variant="secondary">Request API access</Button>
              </div>
            </Reveal>
          </Container>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
