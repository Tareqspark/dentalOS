# PRODUCT.md — DentalOS

The product definition for **DentalOS**: what we're building, for whom, how it's engineered, and where it's going.
Companion documents: [CLAUDE.md](CLAUDE.md) (module & feature catalog) and [feature.md](feature.md) (implementation-level specification).

---

## 1. Vision

**Every independent dental practice deserves the operational intelligence of a large group — without the overhead.**

DentalOS is a cloud-based, AI-first operating system for dental practices. It replaces the fragmented stack of PMS, phones, billing, insurance tools, marketing software, and spreadsheets with one integrated platform where AI does the repetitive work: answering calls, filling chairs, drafting clinical notes, filing claims, and surfacing the decisions that grow the business.

**North star:** a practice running on DentalOS should need *zero* manual work between "patient wants an appointment" and "payment collected" — humans intervene by choice, not necessity.

---

## 2. Target Customers

| Segment | Description | Priority |
|---|---|---|
| **Independent GP practices** | 1–5 providers, 1 location, US-based. Owner-operated, drowning in admin. | **Primary** |
| **Small dental groups** | 2–10 locations, centralizing operations, outgrowing legacy PMS. | Secondary |
| **Startups / de novo practices** | New practices choosing their first software — no migration friction. | Secondary |
| **Specialists** (ortho, perio, OS, pedo) | Need referral management and specialty workflows. | Later |
| **DSOs** | Enterprise, white-label, API-driven. | Later (Enterprise plan) |

**Buyer personas:** the practice owner (buys on revenue growth and time saved), the office manager (buys on daily workflow sanity), the associate dentist (influences on clinical UX).

---

## 3. Problems Solved

1. **Missed calls = lost patients.** ~35% of practice calls go unanswered; each is a patient calling a competitor. → 24/7 AI receptionist + missed-call recovery.
2. **Empty chairs.** No-shows and late cancellations with no fast refill mechanism. → prediction, automated confirmations, AI waitlist backfill.
3. **Insurance drag.** Hours per week on eligibility calls, claim submission, denials, and posting. → end-to-end RCM automation (eligibility → scrubbed claims → auto-posted ERAs → denial queues).
4. **Documentation burden.** Providers charting at night. → AI-drafted SOAP notes from dictation/ambient audio, signed by the provider.
5. **Revenue leakage.** Unscheduled treatment, underpaid claims, aging AR, missed recalls. → detection, alerts, and automated outreach.
6. **Fragmented software.** 5–8 disconnected tools, double data entry, no single source of truth. → one platform, one patient record, one login.
7. **Flying blind.** Owners see last month's numbers, not today's. → real-time dashboards, daily AI briefing, forecasting.

---

## 4. Core Modules

Full catalog in [CLAUDE.md](CLAUDE.md); specs in [feature.md](feature.md). Grouped by domain:

- **Front office:** Dashboard · Patient Management (CRM) · Scheduling & Online Booking · AI Receptionist · Patient Check-In & Smart Intake · Real-Time Patient Flow Board
- **Clinical:** Electronic Dental Records (odontogram, perio, notes) · Digital Imaging (DICOM) · Treatment Planning · AI Clinical Assistant · e-Prescribing · Teledentistry · Sterilization Tracking · Lab Case Management
- **Revenue cycle:** Insurance Management (eligibility, claims, ERA) · Billing & Payments · Fee Schedule Management · Membership Plans
- **Growth:** Patient Communication · Recall Management · Reputation Management · Marketing CRM · Loyalty & Rewards · Referral Management
- **Operations:** Staff Management · Inventory · Multi-Location · Analytics & Reports · AI Business Assistant
- **Platform:** Unified AI Engine · Patient Portal · Mobile Apps · Workflow Automation Builder · Public API/Webhooks · Compliance & Security

---

## 5. User Roles

RBAC with `module:action` permissions; system roles below are editable per tenant.

| Role | Scope |
|---|---|
| Practice Owner / Admin | Full tenant access, settings, billing |
| Office Manager | All operations, limited settings |
| Dentist (Provider) | Clinical modules, own schedule, patient records |
| Hygienist | Clinical (scoped), perio charting, own schedule |
| Dental Assistant | Chairside support, imaging, limited clinical write |
| Front Desk | Scheduling, patients, check-in, payments, communication |
| Billing Specialist | Claims, AR, ledger, financial reports |
| Marketing Staff | CRM, campaigns, reputation |
| Patient | Own records via portal/app only |
| Super Admin (platform) | Cross-tenant support, feature flags — internal |

---

## 6. Pricing Strategy

**Model:** per-location monthly subscription, flat rate, everything-included (no per-module upsells). Usage pass-throughs only for SMS volume and payment processing.

| Plan | Price (mo / annual-mo) | For |
|---|---|---|
| **Starter** | $349 / $289 | Solo practices: PMS core (scheduling, records, billing, reminders, portal) |
| **Professional** ★ | $649 / $539 | The AI layer: receptionist, clinical notes, full insurance automation, marketing, analytics |
| **Enterprise** | Custom | Groups/DSOs: unlimited locations, white-label, API, SSO, dedicated success |

**Principles:**
- The AI features are the wedge — priced into Professional to drive upgrades, not sold as add-ons.
- Free data migration and onboarding on all plans (switching cost is the #1 objection).
- 30-day money-back guarantee; no long-term contracts on Starter/Professional.
- Payment processing revenue share is a meaningful second margin line — make in-platform payments the easiest path.
- Anchor against the *stack replaced* (PMS + answering service + reminders + reputation + marketing ≈ $1,500+/mo), not against legacy PMS pricing.

---

## 7. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend (app) | React + TypeScript, Next.js, TailwindCSS, TanStack Query, Zustand | Fast, typed, component-driven; PWA with offline schedule/charting |
| Marketing site | Next.js 15 (already built — [website/](website/)) | Static-rendered, SEO-first |
| Mobile | React Native (shared TS types) | One team, shared logic with web |
| Backend | Node.js (NestJS), REST + WebSocket gateway | API-first, typed end-to-end |
| Jobs/queues | BullMQ + Redis | Reminders, claims batching, AI pipelines |
| Database | PostgreSQL (RLS multi-tenancy), Redis cache | Relational integrity for ledger/clinical data |
| Object storage | S3-compatible (encrypted) | Documents, imaging, DICOM |
| AI | Anthropic Claude API via internal AI gateway; streaming STT vendor; Twilio-class CPaaS for voice/SMS | One gateway for routing, cost tracking, logging |
| Search | Postgres FTS → OpenSearch when needed | Start simple |
| Infra | Docker, IaC, CI/CD, feature flags | Zero-downtime deploys |

---

## 8. Folder Architecture

Monorepo (pnpm workspaces + Turborepo):

```
DentalOS/
├── CLAUDE.md / PRODUCT.md / feature.md     # docs
├── website/                                # marketing site (live)
├── apps/
│   ├── web/                                # main practice app (Next.js)
│   │   └── src/
│   │       ├── modules/                    # feature-first: one folder per domain
│   │       │   ├── scheduling/  {components,hooks,api,types}/
│   │       │   ├── patients/  clinical/  billing/  insurance/  ...
│   │       ├── components/                 # shared UI (design system)
│   │       └── lib/                        # api client, auth, utils
│   ├── portal/                             # patient portal
│   ├── mobile/                             # React Native (dentist + patient)
│   └── api/                                # NestJS backend
│       └── src/
│           ├── modules/                    # mirrors frontend domains
│           │   └── scheduling/ {controller,service,repository,dto,events}
│           ├── ai/                         # AI gateway (prompts/, tools/, evals/)
│           ├── common/                     # guards, tenancy, audit, rbac
│           └── jobs/                       # queue processors
├── packages/
│   ├── shared/                             # zod schemas & types shared FE/BE
│   ├── ui/                                 # design-system components
│   └── config/                             # eslint, tsconfig, tailwind presets
├── infra/                                  # IaC, docker, migrations
└── docs/                                   # ADRs, runbooks, API reference
```

**Rule:** code is organized by *domain module*, not by technical layer. A feature's UI, hooks, API routes, and tests live together.

---

## 9. Development Roadmap

Phases ship behind feature flags; each phase is usable on its own. (Detail in feature.md §Build Phases.)

| Phase | Scope | Exit criterion |
|---|---|---|
| **P1 — Core PMS** | Tenancy/auth/RBAC, patients, calendar, ledger + card payments, reminders + 2-way SMS, dashboard v1, HIPAA baseline | A practice can run its full front-office day |
| **P2 — Clinical** | Odontogram, perio, notes, imaging, treatment plans, fee schedules, e-Rx | Legacy clinical software replaced |
| **P3 — Revenue cycle** | Eligibility, claims, ERA posting, statements, payment plans, reports v1 | Claim → payment with no external tool |
| **P4 — Growth** | Online booking, patient portal, recall, reputation, check-in/intake, automations | Front office runs on autopilot |
| **P5 — AI layer** | AI gateway, receptionist, clinical assistant, business assistant, cancellation backfill, huddle | The differentiating demo |
| **P6 — Scale-out** | Multi-location, marketing CRM, inventory, staff, labs, referrals, membership, teledentistry, mobile apps, public API | Full platform / Enterprise-ready |

Working cadence: 2-week sprints, ship weekly to staging, monthly to production pilots. P1–P3 validated with 3–5 design-partner practices before general availability.

---

## 10. Coding Standards

- **TypeScript everywhere, `strict: true`.** No `any` without a comment justifying it.
- **Validation at the edge:** every API input validated with zod schemas from `packages/shared` — the same schemas type the frontend client.
- **Feature-first modules** (see §8); no cross-module imports except through a module's public `index.ts`.
- **Server components by default** in Next.js; `"use client"` only for interactivity.
- **Errors:** typed error results at boundaries; never swallow; user-facing messages never leak internals or PHI.
- **Naming:** `kebab-case` files, `PascalCase` components/types, `camelCase` functions/vars, `SCREAMING_SNAKE` env constants.
- **Testing:** unit tests required for business rules (estimation engine, ledger math, schedule conflicts are the critical suites); Playwright E2E for happy paths; no PR merges with failing CI.
- **Reviews:** every PR reviewed; migrations and permission changes require a second reviewer.
- **Lint/format:** shared ESLint + Prettier config from `packages/config`; enforced in CI, no local overrides.
- **Commits:** Conventional Commits (`feat(scheduling): …`); PRs small and single-purpose.
- **No PHI in logs, error trackers, analytics, or test fixtures.** Synthetic patients only.

---

## 11. Design System

- **Brand:** trust-blue primary (`#2a78d6` ramp) + AI-violet accent (`#6d5ce0` ramp) — already established in the marketing site; app inherits it.
- **Foundation:** Tailwind design tokens in `packages/config`; components in `packages/ui` (button, input, card, table, modal, toast, combobox, date/time pickers, calendar primitives).
- **Modes:** light + dark from day one; tokens are CSS variables so charts and components swap automatically.
- **Type:** Inter; tabular numerals for all financial/clinical figures.
- **Data-viz:** validated accessible palette (series colors as CSS vars `--series-1…n`), one axis per chart, thin marks, direct labels over legends where ≤4 series, hover tooltips standard.
- **Density:** the app is a workspace — compact tables, keyboard-first (⌘K global search, shortcuts on calendar and charting), minimal clicks for the 20 most frequent workflows (target: book appointment ≤ 3 clicks, take payment ≤ 2).
- **Accessibility:** WCAG 2.1 AA; full keyboard nav; screen-reader labels on odontogram and charts; `prefers-reduced-motion` respected.
- **Voice:** confident, plain-English microcopy; clinical precision where it matters; never cutesy in clinical/billing contexts.

---

## 12. Database Conventions

- **Multi-tenancy:** every tenant-owned table has `tenant_id uuid not null`; Postgres **row-level security** enforced in addition to application scoping. Location-scoped tables also carry `location_id`.
- **Keys:** `id uuid primary key default gen_random_uuid()`. No natural keys as PKs.
- **Naming:** `snake_case`; tables plural (`patients`, `ledger_entries`); FK columns `<singular>_id`; join tables `a_b` alphabetical.
- **Timestamps:** `created_at` / `updated_at` (`timestamptz`, UTC always) on every table; soft delete via `deleted_at` only where recovery matters (patients, documents) — hard delete is the exception and audit-logged.
- **Money:** `bigint` cents, never floats. Ledger is append-only; corrections are new adjusting entries.
- **Clinical immutability:** signed notes, submitted claims, and audit logs are append-only (addenda/resubmission lineage instead of updates).
- **Enums:** Postgres enums for closed sets that change rarely (appointment status); lookup tables for tenant-configurable sets (tags, recall types).
- **Migrations:** versioned, forward-only, reviewed; every migration reversible or explicitly marked irreversible with a rollback plan.
- **Indexes:** every FK indexed; partial indexes for hot filters (`where status = 'active'`); exclusion constraint on appointment time-ranges (provider, operatory) for double-book prevention.
- **PHI:** SSN and payment tokens field-level encrypted; PHI columns documented in a data inventory for HIPAA accounting.

## 13. API Conventions

- **REST, JSON, versioned:** `/api/v1/...`; breaking changes → new version, old supported ≥ 12 months.
- **Auth:** OAuth2/OIDC, short-lived JWT access (15 min) + refresh rotation; MFA; tenant resolved from token, never from client input.
- **Resources:** plural nouns (`/patients/:id/appointments`); actions that aren't CRUD are sub-resources (`POST /claims/:id/submit`).
- **Lists:** cursor pagination (`?cursor=&limit=`), `?sort=`, `?filter[field]=`; responses `{ data, meta }`; errors RFC-7807 style `{ type, title, detail, errors[] }`.
- **Mutations:** idempotency keys required on payments and claim submission; audit-log entry on every mutation; optimistic-locking `version` on high-contention records (appointments).
- **Real-time:** WebSocket rooms per tenant+location; event names `domain.action` (`appointment.created`, `claim.denied`) — same taxonomy as webhooks.
- **Webhooks:** HMAC-signed, retried with exponential backoff, per-tenant endpoint management UI.
- **Rate limits:** per token + per tenant; 429 with `Retry-After`.
- **Docs:** OpenAPI generated from code; the public API is the same API the frontend uses (dogfooding guarantee).

---

## 14. Future AI Roadmap

Near-term (P5, at launch):
1. **AI Receptionist** — voice + chat, booking/reschedule/triage, missed-call recovery.
2. **Clinical documentation** — dictation → signed-ready SOAP notes, auto CDT coding, chart-note discrepancy checks.
3. **Daily executive briefing** and dashboard recommendations.
4. **Cancellation backfill** and no-show prediction.

Mid-term:
5. **Denial-to-appeal automation** — AI-drafted appeals with claim context, one-click resubmission.
6. **Natural-language everything** — ⌘K queries over practice data ("unpaid Delta claims over $500"), staff chatbot for how-do-I questions.
7. **Ambient charting** — full visit captured chairside (consented), note + charting deltas proposed together.
8. **Treatment-plan presentation copilot** — patient-friendly explanations, objection handling, financing options in the room.
9. **Insurance negotiation intelligence** — payer scorecards, reimbursement benchmarking, renegotiation packets.

Long-term:
10. **Radiograph AI** (regulatory-gated) — caries/bone-loss findings as provider-reviewed overlays; FDA pathway evaluated before any diagnostic claim.
11. **Autonomous revenue agent** — works the AR and denial queues end-to-end, escalating only exceptions.
12. **Practice simulation** — "what if we add a hygienist / drop this payer / open Saturdays" scenario modeling.
13. **Cross-practice benchmarking intelligence** (anonymized, opt-in) — percentile insights and prescriptive playbooks.

**Standing guardrails:** clinical and financial AI output is always human-confirmed; every generation logged (model, prompt version, reviewer); per-tenant AI cost tracking; eval suites run in CI before any prompt/model change ships.

---

## 15. Positioning & Differentiation *(added)*

- **Against legacy PMS (Dentrix, Eaglesoft, Open Dental):** cloud-native, modern UX, AI built-in — no servers, no per-module licensing, no 2005 interface.
- **Against cloud PMS (Curve, tab32, Archy):** the AI layer is the moat — receptionist, documentation, and revenue intelligence are core architecture (one AI gateway), not integrations.
- **Against point solutions (answering services, Weave, NexHealth, Dental Intelligence):** they bolt onto a PMS; DentalOS *is* the PMS, so automation acts on the source of truth instead of syncing with it.
- **One-line pitch:** *"The last software your practice will ever switch to — and the first one that works while you sleep."*

## 16. Success Metrics *(added)*

| Level | Metric | Target |
|---|---|---|
| Business | MRR, net revenue retention | NRR > 110% |
| Adoption | Practices live, time-to-live | < 4 weeks migration |
| Retention | Logo churn | < 1%/mo after month 3 |
| Product value | AI-booked appointments per practice/mo; % claims auto-posted; no-show rate delta; hours of admin saved (measured, shown in-app) | Each surfaced on the customer's own dashboard |
| Quality | Uptime 99.9%; P95 read < 300 ms; support first response < 2 min (chat) | SLO-tracked |

Value metrics are shown **to the customer** (an in-app "DentalOS ROI" report) — retention comes from proving value monthly.

## 17. Compliance & Trust Principles *(added)*

- HIPAA is architecture, not paperwork: BAAs, minimum-necessary RBAC, immutable audit trails, encryption everywhere, breach-response runbooks.
- **The practice owns its data** — full export (records, ledgers, images) at any time, standard formats, no fees.
- AI transparency: patients are told when they're talking to AI (call disclosure per state law); providers see and sign everything AI drafts.
- SOC 2 Type II on the security roadmap before Enterprise GA; annual pen tests; tenant-isolation tests in CI.
