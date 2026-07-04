import Link from "next/link";
import { Linkedin, Twitter, Youtube, Facebook } from "lucide-react";
import { Container } from "../ui/primitives";
import { Logo } from "../logo";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "All Features", href: "/features" },
      { label: "AI Receptionist", href: "/features/ai-receptionist" },
      { label: "Scheduling", href: "/features/smart-scheduling" },
      { label: "Clinical Records", href: "/features/dental-records" },
      { label: "Insurance", href: "/features/insurance-automation" },
      { label: "Billing", href: "/features/billing-payments" },
      { label: "Analytics", href: "/features/analytics-reports" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "AI Clinical Notes", href: "/features/ai-clinical-notes" },
      { label: "Patient Portal", href: "/features/patient-portal" },
      { label: "Digital Imaging", href: "/features/digital-imaging" },
      { label: "Marketing CRM", href: "/features/marketing-crm" },
      { label: "Inventory", href: "/features/inventory" },
      { label: "Mobile Apps", href: "/features/mobile-apps" },
      { label: "Business Intelligence", href: "/features/business-intelligence" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Switching Guide", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Contact", href: "/#contact" },
      { label: "System Status", href: "#" },
    ],
  },
];

const socials = [
  { icon: Twitter, label: "Twitter / X" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
  { icon: Facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--surface)] pb-10 pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-2)]">
              The AI-powered operating system for independent dental practices. One platform for scheduling, clinical,
              billing, insurance, and growth.
            </p>
            {/* Newsletter */}
            <form className="mt-6 flex max-w-sm gap-2" action="#" method="post">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Work email"
                className="w-full rounded-full border border-[var(--hairline)] bg-[var(--page)] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--ink-muted)] focus:border-brand-400"
              />
              <button
                type="submit"
                className="btn-sheen shrink-0 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--ink-2)] transition-all hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--hairline)] pt-8 text-sm text-[var(--ink-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} DentalOS, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-[var(--ink)]">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-[var(--ink)]">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-[var(--ink)]">
              HIPAA
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
