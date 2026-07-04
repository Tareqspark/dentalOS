import {
  Bot,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileCheck2,
  Smile,
  Mic,
  Megaphone,
  BarChart3,
  ScanLine,
  Boxes,
  Smartphone,
  BrainCircuit,
  PhoneMissed,
  FileWarning,
  CalendarX2,
  PhoneCall,
  Files,
  Coins,
  Unplug,
  type LucideIcon,
} from "lucide-react";

/* ---------------- Features ---------------- */

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  ai?: boolean;
};

export const features: Feature[] = [
  {
    icon: Bot,
    title: "AI Receptionist",
    description:
      "Answers every call 24/7, books appointments, and recovers missed calls — so the front desk never loses a patient again.",
    ai: true,
  },
  {
    icon: CalendarClock,
    title: "Smart Scheduling",
    description:
      "Drag-and-drop calendar with double-book prevention, waitlist automation, and AI backfill that refills cancellations in minutes.",
  },
  {
    icon: ClipboardList,
    title: "Electronic Dental Records",
    description:
      "Interactive odontogram, perio charting, and locked clinical notes — chairside-fast on an iPad.",
  },
  {
    icon: FileCheck2,
    title: "Insurance Automation",
    description:
      "Real-time eligibility, claim scrubbing, batch submission, and auto-posted ERAs. Denials become a work queue, not a pile.",
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    description:
      "Text-to-pay links, card on file, payment plans with auto-dunning, and statements that collect themselves.",
  },
  {
    icon: Smile,
    title: "Patient Portal",
    description:
      "Online booking, forms, e-signatures, X-rays, and payments — everything patients ask for, self-serve.",
  },
  {
    icon: Mic,
    title: "AI Clinical Notes",
    description:
      "Dictate or record the visit; get a structured SOAP note with CDT codes drafted for your signature.",
    ai: true,
  },
  {
    icon: Megaphone,
    title: "Marketing CRM",
    description:
      "Capture leads from your website and ads, nurture them automatically, and track every dollar back to production.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Production, collections, AR aging, and provider scorecards — live, drillable, and exportable.",
  },
  {
    icon: ScanLine,
    title: "Digital Imaging",
    description:
      "X-rays, pano, and CBCT in one DICOM-ready viewer with annotation, comparison, and AI-flagged findings.",
  },
  {
    icon: Boxes,
    title: "Inventory",
    description:
      "Barcode scanning, low-stock alerts, and one-click purchase orders. Never run out mid-procedure.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "A dentist app for schedule and notes on the go, and a patient app for booking, bills, and messages.",
  },
  {
    icon: BrainCircuit,
    title: "Business Intelligence",
    description:
      "A daily executive briefing, revenue forecasts, and no-show predictions — your practice, explained.",
    ai: true,
  },
];

/* ---------------- Problems ---------------- */

export type Problem = {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
};

export const problems: Problem[] = [
  {
    icon: Files,
    title: "Insurance paperwork",
    description: "Hours lost to eligibility calls, claim forms, and chasing EOBs across payer portals.",
    stat: "14 hrs/week on insurance admin",
  },
  {
    icon: CalendarX2,
    title: "No-shows & cancellations",
    description: "Empty chairs you paid staff and rent for, with no system to refill them fast.",
    stat: "$200+ lost per empty slot",
  },
  {
    icon: PhoneMissed,
    title: "Missed calls",
    description: "Every unanswered ring during lunch, after hours, or a busy morning is a patient calling a competitor.",
    stat: "~35% of calls go unanswered",
  },
  {
    icon: PhoneCall,
    title: "Phone interruptions",
    description: "Front desk juggling check-ins, checkout, and a ringing phone — all at once, all day.",
    stat: "60+ interruptions daily",
  },
  {
    icon: Coins,
    title: "Revenue leakage",
    description: "Unbilled procedures, underpaid claims, aging AR, and unscheduled treatment quietly draining production.",
    stat: "9% of production never collected",
  },
  {
    icon: Unplug,
    title: "Disconnected software",
    description: "A PMS here, imaging there, reminders somewhere else — nothing talks, everything is re-typed.",
    stat: "6+ tools that don't sync",
  },
];

/* ---------------- Workflow ---------------- */

export const workflow = [
  {
    step: "01",
    title: "Patient books online",
    description: "Real-time slots on your website, Google profile, or patient app — confirmed instantly, synced to the chair.",
  },
  {
    step: "02",
    title: "AI receptionist answers",
    description: "Calls answered on the first ring, 24/7. Booking, rescheduling, triage, and FAQs handled conversationally.",
  },
  {
    step: "03",
    title: "Insurance verified automatically",
    description: "Eligibility checked before the visit. Benefits, deductibles, and estimates ready at check-in.",
  },
  {
    step: "04",
    title: "Dentist treats the patient",
    description: "Charting, imaging, and AI-drafted clinical notes keep the provider chairside, not at a keyboard.",
  },
  {
    step: "05",
    title: "Claims submitted same day",
    description: "Procedures become scrubbed, attachment-complete claims automatically — no Friday claim pile.",
  },
  {
    step: "06",
    title: "Payment collected",
    description: "ERAs auto-post, patients get text-to-pay for their portion, and payment plans run themselves.",
  },
  {
    step: "07",
    title: "Recall automated",
    description: "Hygiene recalls, reactivation, and review requests fire on schedule. The chair fills itself again.",
  },
];

/* ---------------- Testimonials ---------------- */

export type Testimonial = {
  name: string;
  role: string;
  practice: string;
  quote: string;
  metric: string;
  initials: string;
  hue: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Practice Owner",
    practice: "Lakeside Family Dental — Austin, TX",
    quote:
      "The AI receptionist booked 62 appointments in its first month — most of them after hours. That's revenue we simply never had access to before.",
    metric: "+$18k monthly production",
    initials: "SM",
    hue: "from-brand-400 to-brand-600",
  },
  {
    name: "Dr. James Okafor",
    role: "Dentist & Owner",
    practice: "Bright Smile Studio — Denver, CO",
    quote:
      "I sign my notes before I leave the operatory now. AI drafts the SOAP note from my dictation and it's 95% there every time.",
    metric: "90 min saved per day",
    initials: "JO",
    hue: "from-ai-400 to-ai-600",
  },
  {
    name: "Melissa Grant",
    role: "Office Manager",
    practice: "Grant & Rowe Dentistry — Nashville, TN",
    quote:
      "Claims used to take us two days a week. Now they're scrubbed and submitted the same day, and ERAs post themselves. Our AR over 90 days dropped by half.",
    metric: "-52% AR over 90 days",
    initials: "MG",
    hue: "from-emerald-400 to-emerald-600",
  },
  {
    name: "Dr. Priya Raman",
    role: "Practice Owner",
    practice: "Cedar Park Dental — Portland, OR",
    quote:
      "Cancellation backfill is magic. A patient cancels, the waitlist gets texted, and the slot is refilled before I've even seen the gap.",
    metric: "94% schedule fill rate",
    initials: "PR",
    hue: "from-brand-500 to-ai-500",
  },
  {
    name: "Tony Delgado",
    role: "Office Manager",
    practice: "Harborview Dental Group — San Diego, CA",
    quote:
      "We replaced five subscriptions with one login. Reminders, reviews, payments, marketing — my team finally works out of a single system.",
    metric: "5 tools replaced",
    initials: "TD",
    hue: "from-amber-400 to-orange-500",
  },
  {
    name: "Dr. Emily Chen",
    role: "Dentist & Owner",
    practice: "Willow Dental Care — Chicago, IL",
    quote:
      "The morning huddle screen changed how we run the day. Unscheduled treatment, balances due, lab cases — it's all just there.",
    metric: "+31% treatment acceptance",
    initials: "EC",
    hue: "from-rose-400 to-rose-600",
  },
];

/* ---------------- Stats ---------------- */

export const stats = [
  { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 },
  { value: 10, suffix: "M+", label: "Appointments managed", decimals: 0 },
  { value: 95, suffix: "%", label: "Less manual front-desk work", decimals: 0 },
  { value: 40, suffix: "%", label: "Faster collections", decimals: 0 },
];

/* ---------------- Pricing ---------------- */

export type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  highlight?: boolean;
  cta: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "For solo practices getting off paper and legacy software.",
    monthly: 349,
    annual: 289,
    cta: "Start free trial",
    features: [
      "1 location · up to 3 providers",
      "Scheduling & online booking",
      "Patient records & charting",
      "Billing, payments & text-to-pay",
      "Appointment reminders (SMS + email)",
      "Patient portal",
      "Standard reports",
      "Email & chat support",
    ],
  },
  {
    name: "Professional",
    tagline: "The full AI-powered operating system for growing practices.",
    monthly: 649,
    annual: 539,
    highlight: true,
    cta: "Start free trial",
    features: [
      "Everything in Starter",
      "AI Receptionist (24/7 voice + chat)",
      "AI clinical notes & auto-coding",
      "Insurance automation (eligibility, claims, ERA)",
      "Recall & reactivation automation",
      "Reputation & review management",
      "Marketing CRM & campaigns",
      "Analytics & daily AI briefing",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For dental groups and DSOs running multiple locations.",
    monthly: 0,
    annual: 0,
    cta: "Contact sales",
    features: [
      "Everything in Professional",
      "Unlimited locations & providers",
      "Centralized scheduling & reporting",
      "White-label patient experience",
      "Custom integrations & API access",
      "SSO & advanced security controls",
      "Dedicated success manager",
      "Custom onboarding & data migration",
    ],
  },
];

export const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: "Providers included", values: ["Up to 3", "Up to 10", "Unlimited"] },
  { label: "Locations", values: ["1", "Up to 3", "Unlimited"] },
  { label: "Online booking & reminders", values: ["✓", "✓", "✓"] },
  { label: "AI Receptionist", values: ["—", "✓", "✓"] },
  { label: "AI clinical notes", values: ["—", "✓", "✓"] },
  { label: "Insurance automation", values: ["Claims only", "Full RCM", "Full RCM"] },
  { label: "Marketing CRM", values: ["—", "✓", "✓ + call tracking"] },
  { label: "Analytics", values: ["Standard", "Advanced + AI briefing", "Custom + benchmarking"] },
  { label: "API & webhooks", values: ["—", "Read access", "Full access"] },
  { label: "Support", values: ["Email & chat", "Priority", "Dedicated manager"] },
];

/* ---------------- Integrations ---------------- */

export const integrations = [
  { name: "Stripe", category: "Payments" },
  { name: "CareCredit", category: "Financing" },
  { name: "Change Healthcare", category: "Clearinghouse" },
  { name: "DentalXChange", category: "Claims" },
  { name: "Twilio", category: "SMS & Voice" },
  { name: "Google Calendar", category: "Calendar" },
  { name: "Outlook", category: "Calendar" },
  { name: "QuickBooks", category: "Accounting" },
  { name: "Gusto", category: "Payroll" },
  { name: "Dexis", category: "Imaging" },
  { name: "Carestream", category: "Imaging" },
  { name: "iTero", category: "Scanners" },
  { name: "Mailchimp", category: "Email" },
  { name: "Zapier", category: "Automation" },
  { name: "Google Business", category: "Reviews" },
  { name: "AWS S3", category: "Cloud storage" },
];

/* ---------------- FAQ ---------------- */

export const faqs = [
  {
    q: "How long does it take to switch from my current software?",
    a: "Most practices are live in 2–4 weeks. Our migration team converts your patient records, appointments, ledgers, and X-rays from Dentrix, Eaglesoft, Open Dental, and most other systems — and we run parallel for a week so nothing falls through the cracks.",
  },
  {
    q: "Is DentalOS HIPAA compliant?",
    a: "Yes. We sign a BAA with every practice, encrypt all data in transit and at rest, log every access to patient records, and support MFA, role-based permissions, and automatic session timeouts. Our infrastructure is audited annually.",
  },
  {
    q: "Will the AI receptionist really answer my phones?",
    a: "Yes — it answers on the first ring, 24/7, books and reschedules real appointments on your live calendar, verifies insurance participation, and triages emergencies. You choose when it answers: always, after-hours only, or as overflow when the front desk is busy. Callers can reach a human anytime.",
  },
  {
    q: "Do dentists have to review AI clinical notes?",
    a: "Always. AI drafts the note from your dictation or the recorded visit, but nothing enters the legal record until the provider reviews and signs it. Every AI draft is flagged and auditable.",
  },
  {
    q: "What does insurance automation actually cover?",
    a: "Real-time eligibility checks before every visit, benefit breakdowns, coverage estimates on treatment plans, claim scrubbing with attachment rules, batch electronic submission, status tracking, denial work queues with AI-drafted appeals, and automatic ERA posting.",
  },
  {
    q: "Can my patients book online without calling?",
    a: "Yes. Patients book from your website, Google Business Profile, or the patient app. They see real availability, get instant confirmation, and receive automated reminders they can confirm by text.",
  },
  {
    q: "Does it work on iPads and phones?",
    a: "DentalOS is fully cloud-based and responsive — chairside charting on iPad is a first-class experience. There are also native mobile apps for providers and patients.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "It's your data, full stop. You can export complete patient records, ledgers, documents, and images at any time in standard formats. No hostage-taking, no export fees.",
  },
  {
    q: "Do you support multiple locations?",
    a: "Yes. Shared patient records, centralized scheduling, per-location reporting, and consolidated dashboards are built in. Enterprise plans support unlimited locations.",
  },
  {
    q: "How does pricing work — are there hidden fees?",
    a: "One flat subscription per plan. Unlimited patients, unlimited appointments, free updates, and support included. The only variable costs are pass-through usage like SMS volume and payment processing.",
  },
  {
    q: "Is my team going to need weeks of training?",
    a: "Most front-desk teams are comfortable in a day or two. The interface is built like modern consumer software, every workflow is a few clicks, and an in-app AI assistant answers 'how do I…' questions instantly.",
  },
  {
    q: "What kind of support do you offer?",
    a: "Live chat and email on every plan, priority phone support on Professional, and a dedicated success manager on Enterprise — plus a searchable help center and weekly live training webinars.",
  },
];

/* ---------------- Security ---------------- */

export const securityItems = [
  { title: "HIPAA Compliant", description: "BAA included. Minimum-necessary access, PHI audit trails, and annual third-party audits." },
  { title: "Encrypted Everywhere", description: "TLS 1.2+ in transit, AES-256 at rest, field-level encryption for the most sensitive data." },
  { title: "Role-Based Access", description: "Granular permissions per role, per module. Front desk sees what front desk needs — nothing more." },
  { title: "Automatic Backups", description: "Continuous, encrypted, cross-region backups with point-in-time recovery." },
  { title: "Audit Logs", description: "Every view, edit, and export of patient data is logged immutably and searchable by admins." },
  { title: "Enterprise Controls", description: "MFA enforcement, session timeouts, device management, and SSO for groups." },
];
