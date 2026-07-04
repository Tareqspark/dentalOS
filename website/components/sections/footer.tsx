import Link from "next/link";
import { Linkedin, Twitter, Youtube, Facebook } from "lucide-react";
import { Container } from "../ui/primitives";
import { Logo } from "../logo";

const columns = [
  {
    title: "Product",
    links: ["AI Receptionist", "Scheduling", "Clinical Records", "Insurance", "Billing", "Analytics"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Partners", "Contact"],
  },
  {
    title: "Resources",
    links: ["Blog", "Help Center", "Webinars", "API Docs", "Switching Guide"],
  },
  {
    title: "Support",
    links: ["Live Chat", "System Status", "Training", "Community"],
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
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
                      >
                        {l}
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
