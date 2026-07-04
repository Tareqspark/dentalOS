import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  DatabaseBackup,
  FileSearch,
  Fingerprint,
  GlobeLock,
  KeyRound,
  Lock,
  MonitorSmartphone,
  ServerCog,
  ShieldCheck,
  Siren,
  UserCog,
  FileDown,
} from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { Badge, Button, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export const metadata: Metadata = {
  title: "Security & HIPAA Compliance",
  description:
    "How DentalOS protects patient data: HIPAA compliance with BAA, AES-256 encryption, role-based access, immutable audit logs, automatic backups, and enterprise controls.",
  alternates: { canonical: "/security" },
};

const pillars = [
  {
    id: "hipaa",
    icon: ShieldCheck,
    title: "HIPAA Compliance",
    description:
      "A Business Associate Agreement is included with every practice — not an enterprise upsell. The platform is built around minimum-necessary access: staff see only what their role requires, every PHI access is logged, and patient rights (record export, amendment requests) have first-class workflows.",
    points: ["BAA signed with every practice", "Minimum-necessary RBAC by design", "Patient record export & amendment workflows", "Annual third-party compliance audits"],
  },
  {
    id: "encryption",
    icon: Lock,
    title: "Encryption Everywhere",
    description:
      "All traffic is TLS 1.2+; all data at rest is AES-256 encrypted, including database, documents, and imaging. The most sensitive fields — SSNs, payment tokens — get an additional layer of field-level encryption with keys held in a hardware-backed vault.",
    points: ["TLS 1.2+ in transit, AES-256 at rest", "Field-level encryption for SSN & payment data", "Keys in a hardware-backed secrets vault", "Encrypted backups, encrypted replicas"],
  },
  {
    id: "access",
    icon: UserCog,
    title: "Role-Based Access Control",
    description:
      "Permissions are granular — module by module, action by action. A front desk role can take payments without seeing clinical notes; a hygienist can chart perio without touching the ledger. Roles are editable per practice, and every permission change is itself audit-logged.",
    points: ["Granular module:action permissions", "Custom roles per practice", "Permission changes require elevated rights", "Break-the-glass access reporting"],
  },
  {
    id: "backups",
    icon: DatabaseBackup,
    title: "Automatic Backups & Disaster Recovery",
    description:
      "Continuous, encrypted, cross-region backups with point-in-time recovery — your data survives anything, including us having a bad day. Recovery objectives are engineering commitments, not aspirations: 4-hour RTO, 15-minute RPO, with restore drills run on a schedule.",
    points: ["Continuous point-in-time recovery", "Cross-region replication", "RTO ≤ 4h / RPO ≤ 15min targets", "Scheduled restore drills"],
  },
  {
    id: "audit",
    icon: FileSearch,
    title: "Immutable Audit Logs",
    description:
      "Every view, edit, export, login, and permission change is written to an append-only, hash-chained audit log that cannot be altered — by anyone, including us. Admins get a searchable audit UI; compliance officers get exports.",
    points: ["Append-only, hash-chained log", "PHI views logged, not just edits", "Searchable admin audit console", "Export for compliance reviews"],
  },
  {
    id: "enterprise",
    icon: KeyRound,
    title: "Enterprise Controls",
    description:
      "MFA can be enforced practice-wide, sessions time out on inactivity, and admins can see and revoke every active device and session. Groups get SSO, IP allowlisting, and centralized security policy across locations.",
    points: ["Enforceable MFA (TOTP + SMS fallback)", "Configurable session timeouts", "Device & session management", "SSO and IP allowlisting for groups"],
  },
];

const practices = [
  { icon: ServerCog, title: "Hardened infrastructure", text: "Isolated tenant data with row-level security, least-privilege service accounts, and infrastructure as code — reviewed, versioned, and auditable." },
  { icon: Siren, title: "Incident response", text: "24/7 monitoring, defined breach-notification runbooks that meet HIPAA timelines, and a status page that tells the truth." },
  { icon: Fingerprint, title: "Secure development", text: "OWASP-aligned SDLC, dependency scanning, tenant-isolation tests in CI, and independent penetration tests before major releases." },
  { icon: GlobeLock, title: "Data residency", text: "All PHI stored and processed in US data centers. No offshore processing of patient data, period." },
  { icon: MonitorSmartphone, title: "Endpoint safety", text: "Biometric login on mobile apps, automatic screen locks, and remote session revocation when a device walks away." },
  { icon: FileDown, title: "Your data, portable", text: "Full export of records, ledgers, documents, and images in standard formats at any time. No hostage-taking, no export fees." },
];

export default function SecurityPage() {
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
                <span className="font-medium text-[var(--ink)]">Security</span>
              </nav>
              <div className="max-w-3xl">
                <Badge>Security & compliance</Badge>
                <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:leading-[1.1]">
                  Patient data protected like it's <span className="gradient-text">your license on the line.</span>
                </h1>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-[var(--ink-2)]">
                  Because it is. HIPAA isn't a checkbox at DentalOS — it's the architecture. Every layer of the
                  platform was designed for healthcare data from the first line of code, and every claim below is an
                  engineering commitment, not marketing.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/#contact" variant="ai" size="lg">Talk to our security team</Button>
                  <Button href="/#faq" variant="secondary" size="lg">Compliance FAQ</Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Six pillars, expanded */}
        <section className="bg-[var(--surface)] py-20 md:py-28">
          <Container>
            <SectionHeading
              badge={<Badge>The six pillars</Badge>}
              title="What protects your practice, in detail"
            />
            <div className="grid gap-6 lg:grid-cols-2">
              {pillars.map(({ id, icon: Icon, title, description, points }, i) => (
                <Reveal key={id} delay={Math.min(i * 0.05, 0.2)}>
                  <SpotlightCard id={id} className="h-full p-8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300">
                      <Icon size={22} />
                    </span>
                    <h2 className="mt-5 text-xl font-bold">{title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{description}</p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs font-medium text-[var(--ink-2)]">
                          <ShieldCheck size={14} className="mt-px shrink-0 text-emerald-600 dark:text-emerald-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Operating practices */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading
              badge={<Badge>How we operate</Badge>}
              title="Security is a practice, not a page"
              subtitle="The everyday engineering discipline behind the guarantees above."
            />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {practices.map(({ icon: Icon, title, text }) => (
                <StaggerItem key={title} className="h-full">
                  <div className="card h-full rounded-2xl p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
