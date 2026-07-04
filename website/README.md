# DentalOS Marketing Website

Premium SaaS landing page for DentalOS — the AI-powered dental practice management platform.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript) — static-rendered for SEO and speed
- **Tailwind CSS 3** — design tokens for the brand (trust blue) and AI accent (violet), light + dark mode via `class` strategy
- **Framer Motion** — scroll reveals, animated charts, counters, accordion, timeline
- **Lucide** — iconography
- All graphics are hand-built inline SVG (no image assets, no external requests)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx        # metadata, OG/Twitter tags, JSON-LD, theme bootstrap, font
  page.tsx          # section composition + FAQ structured data
  globals.css       # theme CSS variables, glass/spotlight/marquee utilities
  sitemap.ts        # /sitemap.xml
  robots.ts         # /robots.txt
components/
  nav.tsx           # sticky glass nav + mobile menu
  theme-toggle.tsx  # dark mode toggle (localStorage + prefers-color-scheme)
  logo.tsx
  ui/               # Container, Button, Badge, SectionHeading, Reveal, SpotlightCard
  charts/           # SVG revenue chart, utilization bars, sparkline, donut gauge
  sections/         # hero, trust, problem, solution, features, dashboard,
                    # ai, workflow, testimonials, stats, pricing, integrations,
                    # security, faq, final-cta, footer
lib/data.ts         # all marketing copy & content (edit copy here)
```

## Notes

- **Copy lives in `lib/data.ts`** — features, testimonials, pricing, FAQs, integrations. Edit there without touching components.
- **Domain**: replace `https://www.dentalos.com` in `app/layout.tsx`, `sitemap.ts`, and `robots.ts` with the real domain before launch.
- Chart colors use the validated accessible palette via CSS custom properties (`--series-1`, `--series-2`, `--series-ai`) defined in `globals.css`, so they adapt to dark mode automatically.
- All animations respect `prefers-reduced-motion`.
- Server components by default; `"use client"` only where there's interactivity (nav, charts, pricing toggle, FAQ, hero, counters).
