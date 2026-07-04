import {
  AlarmClock,
  ArrowLeftRight,
  Banknote,
  BarChart3,
  BellRing,
  Bot,
  Boxes,
  BrainCircuit,
  CalendarCheck2,
  CalendarClock,
  CalendarRange,
  CircleDollarSign,
  ClipboardList,
  ClipboardSignature,
  CloudUpload,
  Contact,
  CreditCard,
  FileBarChart2,
  FileCheck2,
  FileClock,
  FileSearch,
  FileSignature,
  FileText,
  Globe,
  Landmark,
  Languages,
  Layers,
  LineChart,
  ListChecks,
  Megaphone,
  MessageSquareText,
  Mic,
  MousePointerClick,
  PackageSearch,
  PhoneCall,
  PhoneIncoming,
  PieChart,
  Receipt,
  RefreshCcw,
  Repeat,
  ScanBarcode,
  ScanLine,
  Send,
  ShieldAlert,
  ShieldCheck,
  Shuffle,
  Siren,
  SlidersHorizontal,
  Smartphone,
  Smile,
  Sparkles,
  Split,
  Stethoscope,
  Target,
  Timer,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ModuleContent = {
  slug: string;
  name: string;
  category: "Front Office" | "Clinical" | "Revenue Cycle" | "Growth" | "Operations" | "Platform" | "AI Platform";
  icon: LucideIcon;
  ai?: boolean;
  tagline: string; // page H1
  description: string; // hero subheadline
  metaDescription: string;
  stats: { value: string; label: string }[];
  capabilities: Capability[];
  steps: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
};

export const modules: ModuleContent[] = [
  /* ------------------------------------------------ AI Receptionist */
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    category: "Front Office",
    icon: Bot,
    ai: true,
    tagline: "Every call answered. Every patient captured. 24/7.",
    description:
      "The DentalOS AI Receptionist answers your phones on the first ring — day, night, lunch rush, and holidays. It books real appointments on your live calendar, verifies insurance participation, triages emergencies, and recovers every missed call with an instant text-back.",
    metaDescription:
      "24/7 AI receptionist for dental practices: answers calls, books appointments, verifies insurance, triages emergencies, and recovers missed calls automatically.",
    stats: [
      { value: "24/7", label: "Call coverage, including after hours" },
      { value: "<1 ring", label: "Average answer time" },
      { value: "+62", label: "Appointments booked/month by AI (avg.)" },
    ],
    capabilities: [
      {
        icon: PhoneCall,
        title: "Natural voice conversations",
        description:
          "Patients talk normally; the AI understands context, accents, and interruptions. It never sounds like a phone tree — and callers can reach a human anytime they ask.",
      },
      {
        icon: CalendarCheck2,
        title: "Real bookings on your live calendar",
        description:
          "Not messages — actual appointments. The AI sees real availability, respects provider rules and appointment types, and sends instant SMS confirmations.",
      },
      {
        icon: Siren,
        title: "Emergency triage",
        description:
          "Clinically-reviewed decision trees route true emergencies to 911/ER guidance, offer same-day emergency slots for severe pain, and book routine issues appropriately.",
      },
      {
        icon: PhoneIncoming,
        title: "Missed-call recovery",
        description:
          "Any abandoned call triggers an immediate text: “Sorry we missed you — reply here or tap to book.” Practices recover 30–50% of would-be lost callers.",
      },
      {
        icon: Languages,
        title: "Multi-language support",
        description:
          "The AI detects and speaks the caller's language — Spanish and other languages configurable — with transcripts stored in both languages.",
      },
      {
        icon: FileSearch,
        title: "Full transparency",
        description:
          "Every call is recorded and transcribed with a structured outcome (booked, message, transferred) and sentiment score, reviewable in the Calls dashboard.",
      },
    ],
    steps: [
      { title: "Connect your number", description: "Forward your existing line or port it — no hardware, live in a day." },
      { title: "Choose coverage", description: "AI answers always, after-hours only, or as overflow when the desk is busy." },
      { title: "Teach it your practice", description: "Hours, insurance list, parking, pricing ranges — the AI answers FAQs from your knowledge base." },
      { title: "Watch the calendar fill", description: "Bookings, recovered calls, and transcripts appear in real time." },
    ],
    faqs: [
      {
        q: "What happens if the AI can't handle a call?",
        a: "It transfers warmly to your front desk or takes a detailed message that becomes a task with the full transcript attached. Callers can request a human at any moment, and frustration cues trigger automatic handoff.",
      },
      {
        q: "Will patients know they're talking to an AI?",
        a: "Yes — the AI introduces itself and discloses recording per your state's law. In practice, patients care about getting booked fast at 9 PM, and satisfaction scores show it.",
      },
      {
        q: "Can it discuss my patients' information?",
        a: "Only after identity verification (name + date of birth match). Unverified callers get scheduling and general information only — the same standard you'd hold staff to under HIPAA.",
      },
    ],
    related: ["smart-scheduling", "patient-portal", "ai-clinical-notes"],
  },

  /* ------------------------------------------------ Smart Scheduling */
  {
    slug: "smart-scheduling",
    name: "Smart Scheduling",
    category: "Front Office",
    icon: CalendarClock,
    tagline: "A schedule that fills, confirms, and repairs itself.",
    description:
      "Drag-and-drop scheduling built for dental workflows — chairs, providers, and appointment types — with online booking, automated confirmations, double-book prevention, and AI that refills cancellations from your waitlist before staff even notice the gap.",
    metaDescription:
      "Dental scheduling software with online booking, drag-and-drop calendar, double-book prevention, waitlist automation, and AI cancellation backfill.",
    stats: [
      { value: "94%", label: "Average schedule fill rate" },
      { value: "-71%", label: "Fewer no-shows with smart confirmations" },
      { value: "15 min", label: "Average time to refill a cancellation" },
    ],
    capabilities: [
      {
        icon: CalendarRange,
        title: "Day, week & month views",
        description:
          "Operatory columns or provider columns — toggle instantly. Color by appointment type or provider, with status strips for confirmed, arrived, and seated.",
      },
      {
        icon: MousePointerClick,
        title: "Drag-and-drop everything",
        description:
          "Move, resize, copy, and paste appointments. Conflicts (provider, chair, patient, working hours) are blocked server-side — no accidental double-booking, ever.",
      },
      {
        icon: Globe,
        title: "Online booking that's actually live",
        description:
          "Patients book real slots from your website, Google profile, or the app. A 5-minute slot hold prevents race conditions; confirmations are instant with calendar invites.",
      },
      {
        icon: Shuffle,
        title: "AI cancellation backfill",
        description:
          "When a slot opens, the engine scores your waitlist, overdue recalls, and unscheduled treatment for fit, then texts offers in priority order until the gap is filled.",
      },
      {
        icon: BellRing,
        title: "Confirmation ladders",
        description:
          "Email at 3 weeks, SMS at 3 days (reply C to confirm), SMS at 3 hours — fully configurable per appointment type. Unconfirmed patients escalate to a front-desk task.",
      },
      {
        icon: Repeat,
        title: "Recurring & block scheduling",
        description:
          "Perio maintenance every 3 months, provider lunches, emergency-reserved slots, holidays across locations — templates handle it all, DST-safe.",
      },
    ],
    steps: [
      { title: "Model your practice", description: "Chairs, providers, working hours, appointment types with durations and buffers." },
      { title: "Turn on online booking", description: "Choose which appointment types are patient-bookable and embed the widget." },
      { title: "Set your confirmation ladder", description: "Pick the reminder cadence; confirmations update the calendar automatically." },
      { title: "Let AI defend the schedule", description: "No-show risk scoring, waitlist backfill, and gap alerts keep chairs full." },
    ],
    faqs: [
      {
        q: "Can patients book the wrong thing online?",
        a: "No. You control exactly which appointment types are online-bookable, their durations, which providers offer them, and whether new patients must leave a card deposit. Everything else requires a call.",
      },
      {
        q: "How does double-book prevention actually work?",
        a: "The database itself enforces exclusion constraints on provider and chair time ranges — a conflicting write is rejected at the source, not just hidden in the UI. Staff with override permission can intentionally double-book when needed.",
      },
      {
        q: "What happens when a patient cancels at 7 AM?",
        a: "The backfill engine immediately texts the best-matched waitlist patients with a claim link — each gets a 15-minute exclusive hold. Most gaps refill before the morning huddle.",
      },
    ],
    related: ["ai-receptionist", "patient-portal", "business-intelligence"],
  },

  /* ------------------------------------------------ EDR */
  {
    slug: "dental-records",
    name: "Electronic Dental Records",
    category: "Clinical",
    icon: ClipboardList,
    tagline: "Charting so fast, providers finish notes before the patient leaves.",
    description:
      "A complete clinical module built for chairside speed: interactive odontogram, six-point perio charting with voice entry, template-driven notes, medical alerts, and e-prescribing — all on an iPad, all in the cloud.",
    metaDescription:
      "Cloud dental EHR/EDR: interactive odontogram, periodontal charting with voice entry, SOAP notes, medical alerts, and e-prescribing built for chairside use.",
    stats: [
      { value: "6-point", label: "Perio charting with voice entry" },
      { value: "100%", label: "Notes signed same day (typical)" },
      { value: "0", label: "Servers to maintain" },
    ],
    capabilities: [
      {
        icon: Smile,
        title: "Interactive odontogram",
        description:
          "Full-mouth chart with per-surface conditions, existing work, planned and completed treatment — visually distinct, date-stamped, and scrubbable through time.",
      },
      {
        icon: Stethoscope,
        title: "Perio charting at conversation speed",
        description:
          "Keyboard auto-advance or hands-free voice entry (“three two three, bleeding”). Compare exams side-by-side with per-site deltas highlighted.",
      },
      {
        icon: FileText,
        title: "SOAP & progress notes",
        description:
          "Template library with smart variables, quick-picks per procedure, and voice dictation. Notes lock on signature; corrections happen via addenda — a defensible legal record.",
      },
      {
        icon: ShieldAlert,
        title: "Medical alerts that can't be missed",
        description:
          "Allergies, premedication, anticoagulants, and custom flags assemble into an alert banner — with a hard-stop acknowledgment for critical alerts.",
      },
      {
        icon: ClipboardSignature,
        title: "E-prescribing with EPCS",
        description:
          "Certified e-prescribing including controlled substances, with allergy and drug-interaction checks surfaced at prescribing time.",
      },
      {
        icon: FileClock,
        title: "Clinical timeline",
        description:
          "Every note, procedure, image, and prescription on one chronological view. Tap any visit to see the chart exactly as it was that day.",
      },
    ],
    steps: [
      { title: "Chart the exam", description: "Tap tooth and surfaces; conditions and watches flow straight into the treatment plan." },
      { title: "Treat and document", description: "Procedures post from the chart; dictate findings as you go." },
      { title: "Sign before you stand up", description: "AI drafts the note from your dictation; review, edit, sign — done." },
      { title: "Everything connects", description: "Completed procedures trigger claims, recall dates, and post-op messages automatically." },
    ],
    faqs: [
      {
        q: "Can I use my own note templates?",
        a: "Yes — build unlimited templates with variables (patient name, teeth, anesthetic, materials) and attach quick-picks to specific procedures so the right template is one tap away.",
      },
      {
        q: "Are signed notes really immutable?",
        a: "Yes. Once signed, a note is locked. Corrections are appended as addenda with their own timestamps and signatures — the original is preserved, which is exactly what a legal record requires.",
      },
      {
        q: "Does it support both Universal and FDI tooth numbering?",
        a: "Yes, toggle per practice. Primary dentition and mixed dentition modes are included.",
      },
    ],
    related: ["ai-clinical-notes", "digital-imaging", "insurance-automation"],
  },

  /* ------------------------------------------------ Insurance */
  {
    slug: "insurance-automation",
    name: "Insurance Automation",
    category: "Revenue Cycle",
    icon: FileCheck2,
    tagline: "From chairside to paid claim — without touching a payer portal.",
    description:
      "DentalOS automates the entire insurance lifecycle: nightly eligibility checks before visits, benefit breakdowns, coverage estimates on every treatment plan, scrubbed electronic claims with attachments, denial work queues with AI-drafted appeals, and ERAs that post themselves.",
    metaDescription:
      "Dental insurance automation: real-time eligibility, claim scrubbing and e-submission, denial management with AI appeals, and automatic ERA/EOB posting.",
    stats: [
      { value: "≤3 clicks", label: "From completed procedure to submitted claim" },
      { value: "-52%", label: "Typical drop in AR over 90 days" },
      { value: "auto", label: "ERA posting with underpayment flags" },
    ],
    capabilities: [
      {
        icon: ShieldCheck,
        title: "Automatic eligibility verification",
        description:
          "Every patient on tomorrow's schedule is verified overnight via real-time payer connections. Issues show as badges on the appointment before the patient arrives.",
      },
      {
        icon: PieChart,
        title: "Structured benefit breakdowns",
        description:
          "Deductibles, annual max used/remaining, category coverage percentages, frequencies, and waiting periods — stored structured and used everywhere estimates appear.",
      },
      {
        icon: ListChecks,
        title: "Claim scrubbing before submission",
        description:
          "Missing surfaces, required X-rays or narratives, NPI and subscriber errors are caught before the payer sees them. Clean-claim rates jump immediately.",
      },
      {
        icon: RefreshCcw,
        title: "Automatic ERA posting",
        description:
          "835s match to claims and post payments plus contractual adjustments per procedure. Underpayments vs. your contracted fees are flagged for review — money stops leaking silently.",
      },
      {
        icon: FileSignature,
        title: "Denial queues & AI appeals",
        description:
          "Denials arrive translated into plain English, sorted by dollar value and age, with one-click correct-and-resubmit or an AI-drafted appeal letter built from the claim's context.",
      },
      {
        icon: Split,
        title: "Coordination of benefits",
        description:
          "Secondary claims are created automatically when the primary pays, with the primary EOB attached. Pre-authorizations and bulk submission included.",
      },
    ],
    steps: [
      { title: "Procedures complete", description: "Draft claims are created automatically for insured patients." },
      { title: "Scrubber validates", description: "Errors block, warnings flag; attachments are pulled from the chart." },
      { title: "Batch submits electronically", description: "With acknowledgment tracking through the clearinghouse." },
      { title: "Payment posts itself", description: "ERAs auto-post; exceptions and underpayments land in a review queue." },
    ],
    faqs: [
      {
        q: "Which clearinghouses and payers do you support?",
        a: "DentalOS connects through major dental clearinghouses covering the vast majority of US payers for eligibility (270/271), claims (837D), status (276/277), and remittance (835), plus an integrated attachment service for X-rays and narratives.",
      },
      {
        q: "How accurate are the patient estimates?",
        a: "Estimates apply the plan's actual rules — category percentages, remaining deductible and maximum, frequency limits, downgrades — from the latest verification. They're clearly labeled as estimates, and accuracy improves every time benefits refresh.",
      },
      {
        q: "Can it handle paper EOBs?",
        a: "Yes — a fast manual EOB entry screen handles payers that still mail paper, with the same per-procedure allocation and adjustment logic as electronic remittance.",
      },
    ],
    related: ["billing-payments", "analytics-reports", "dental-records"],
  },

  /* ------------------------------------------------ Billing */
  {
    slug: "billing-payments",
    name: "Billing & Payments",
    category: "Revenue Cycle",
    icon: CreditCard,
    tagline: "Get paid the way patients actually want to pay.",
    description:
      "Text-to-pay links, card on file, Apple Pay, ACH, payment plans with automatic retries, and statements that send themselves. A guarantor-based ledger keeps every family's balance clean — and your day-end always reconciles.",
    metaDescription:
      "Dental billing and payment software: text-to-pay, card on file, payment plans with auto-dunning, online payments, statements, and clean ledger accounting.",
    stats: [
      { value: "40%", label: "Faster collections on average" },
      { value: "2 clicks", label: "To take any payment" },
      { value: "auto", label: "Receipts, statements & reminders" },
    ],
    capabilities: [
      {
        icon: Send,
        title: "Text-to-pay",
        description:
          "Send a secure payment link by SMS at checkout or with a statement. Patients pay from their phone in seconds — no login, no portal hunt.",
      },
      {
        icon: Wallet,
        title: "Every payment method",
        description:
          "Cards (present or on file), ACH, Apple Pay, Google Pay, and third-party financing — all posting to the ledger with automatic receipts.",
      },
      {
        icon: CalendarClock,
        title: "Payment plans that run themselves",
        description:
          "Down payment plus scheduled installments charged to the card on file. Failed payments retry on a smart schedule with automatic patient notifications.",
      },
      {
        icon: Landmark,
        title: "Guarantor-based family ledger",
        description:
          "Charges, payments, and adjustments allocate per procedure, roll up per guarantor, and keep provider production numbers accurate to the penny.",
      },
      {
        icon: Receipt,
        title: "Statements & balance automation",
        description:
          "Monthly statement cycles with email/SMS pay links and print export. Configurable reminder cadences pause automatically when a payment plan starts.",
      },
      {
        icon: Banknote,
        title: "Day-end that reconciles",
        description:
          "Posted payments reconcile against gateway settlements; posted days lock, and corrections flow through auditable adjustment entries.",
      },
    ],
    steps: [
      { title: "Checkout in seconds", description: "Estimated patient portion is ready at checkout — tap to charge or text a link." },
      { title: "Balances chase themselves", description: "Reminder ladders send SMS, email, and letters on your schedule." },
      { title: "Plans handle big cases", description: "Split large treatment into installments with card-on-file autopay." },
      { title: "Books stay clean", description: "Daily close, settlement reconciliation, and QuickBooks-ready exports." },
    ],
    faqs: [
      {
        q: "What are the processing rates?",
        a: "Transparent flat-rate processing through our integrated gateway, with terminal hardware for card-present rates. Volume pricing is available — and you can see effective rates right in the dashboard.",
      },
      {
        q: "Can patients pay before the visit?",
        a: "Yes — pre-visit check-in links can collect copays and outstanding balances, and online booking can require deposits for new-patient appointment types.",
      },
      {
        q: "How do refunds and discounts work?",
        a: "Refunds go back to the original payment method with a required reason code and permission gate. Discounts and write-offs post as typed adjustments so reports stay honest.",
      },
    ],
    related: ["insurance-automation", "patient-portal", "analytics-reports"],
  },

  /* ------------------------------------------------ Patient Portal */
  {
    slug: "patient-portal",
    name: "Patient Portal",
    category: "Growth",
    icon: Smile,
    tagline: "Self-service your patients will actually use.",
    description:
      "Booking, forms, e-signatures, treatment plans, X-rays, bills, and secure messaging — in a white-labeled portal that works beautifully on any phone. Passwordless login means patients actually get in.",
    metaDescription:
      "White-label dental patient portal: online booking, digital forms, e-signatures, treatment plan approval, bill pay, X-ray viewing, and secure messaging.",
    stats: [
      { value: "78%", label: "Of patients complete forms before arriving" },
      { value: "0", label: "Passwords to forget (OTP login)" },
      { value: "24/7", label: "Self-service booking & payments" },
    ],
    capabilities: [
      {
        icon: CalendarCheck2,
        title: "Book, reschedule, cancel",
        description:
          "Real-time availability with your rules applied. Confirmations, calendar invites, and reminder preferences all handled.",
      },
      {
        icon: FileSignature,
        title: "Forms & consents online",
        description:
          "Intake packets auto-assigned by appointment type, completed on any device with save-and-resume, signed electronically, and filed to the chart as structured data plus PDF.",
      },
      {
        icon: ClipboardList,
        title: "Treatment plans & remote acceptance",
        description:
          "Patients review their plan with costs and insurance estimates, compare scenarios, and e-sign acceptance from home — decisions stop waiting for the next visit.",
      },
      {
        icon: CircleDollarSign,
        title: "Bills, statements & payments",
        description:
          "Current balance, downloadable invoices and receipts, payment plans in progress, and one-tap payment.",
      },
      {
        icon: MessageSquareText,
        title: "Secure messaging",
        description:
          "Threads route into your team inbox with full patient context. Patients stop calling for things a message handles.",
      },
      {
        icon: ScanLine,
        title: "Their records, their access",
        description:
          "Shared X-rays, visit history, insurance on file, and post-op instructions — plus guardian access for minors, verified at the front desk.",
      },
    ],
    steps: [
      { title: "White-label it", description: "Your logo, colors, and domain — patients see your brand, not ours." },
      { title: "Invite automatically", description: "Portal invites go out with booking confirmations and check-in links." },
      { title: "Patients self-serve", description: "Forms, payments, and rescheduling stop hitting the front desk." },
      { title: "Everything syncs", description: "Every portal action lands in the patient record and your team inbox instantly." },
    ],
    faqs: [
      {
        q: "How do patients log in?",
        a: "Passwordless by default: they enter their phone or email and get a one-time code. Optional passwords with MFA are available. Login friction is the #1 portal killer — we removed it.",
      },
      {
        q: "Can parents manage their kids' accounts?",
        a: "Yes — guardian relationships verified at the front desk grant access to minors' appointments, forms, and balances from one login.",
      },
      {
        q: "Which X-rays can patients see?",
        a: "Only images a provider has explicitly shared. Clinical control stays with you; patients get the transparency that builds case acceptance.",
      },
    ],
    related: ["smart-scheduling", "billing-payments", "marketing-crm"],
  },

  /* ------------------------------------------------ AI Clinical Notes */
  {
    slug: "ai-clinical-notes",
    name: "AI Clinical Notes",
    category: "Clinical",
    icon: Mic,
    ai: true,
    tagline: "The last note you'll ever type.",
    description:
      "Dictate the visit — or record it ambiently with patient consent — and DentalOS drafts a structured SOAP note with procedures, teeth, surfaces, anesthetic, materials, and CDT codes extracted. You review, edit, and sign. Nothing enters the record without your signature.",
    metaDescription:
      "AI dental clinical notes: dictation and ambient recording become structured SOAP notes with CDT codes, reviewed and signed by the provider.",
    stats: [
      { value: "90 min", label: "Average provider time saved daily" },
      { value: "95%", label: "Draft accuracy providers report" },
      { value: "100%", label: "Provider-reviewed before signing" },
    ],
    capabilities: [
      {
        icon: Mic,
        title: "Dictation & ambient capture",
        description:
          "Stream dictation chairside or record the visit with explicit, logged patient consent. The AI separates clinical content from small talk.",
      },
      {
        icon: FileText,
        title: "Structured SOAP output",
        description:
          "Not a transcript — a real note: subjective, objective, assessment, plan, with procedures, teeth/surfaces, anesthetic carpules, and post-op instructions extracted as data.",
      },
      {
        icon: ListChecks,
        title: "Auto CDT coding",
        description:
          "Suggested codes with confidence scores, cross-checked against the odontogram. Note says extraction but chart doesn't? You'll know before you sign.",
      },
      {
        icon: ShieldAlert,
        title: "Risk & safety flags",
        description:
          "Bisphosphonates plus a planned extraction, anticoagulants before surgery, missing premedication — surfaced at the moment of decision, not in an audit later.",
      },
      {
        icon: FileClock,
        title: "Referral letters in one click",
        description:
          "AI drafts specialist referral letters and patient summaries from the chart — history, findings, imaging attached.",
      },
      {
        icon: ShieldCheck,
        title: "Built for liability",
        description:
          "Every AI draft is flagged as AI-assisted, versioned, and stored with the reviewing provider's signature. Your record, defensible.",
      },
    ],
    steps: [
      { title: "Talk", description: "Dictate at the chair or let ambient capture listen (with consent)." },
      { title: "Review the draft", description: "Structured note appears in seconds with codes and extracted details." },
      { title: "Edit & sign", description: "Fix anything, sign, done — the note locks and procedures post." },
      { title: "Downstream automates", description: "Claims, recall intervals, and post-op messages trigger from the signed note." },
    ],
    faqs: [
      {
        q: "Does the AI ever write directly to the chart?",
        a: "Never. Everything is a draft until a licensed provider reviews and signs it. That's a hard architectural rule, not a setting.",
      },
      {
        q: "How is patient consent for recording handled?",
        a: "Ambient capture requires an explicit consent flow per patient, logged with timestamp. Dictation-only mode requires no recording of the patient at all.",
      },
      {
        q: "What about accents and dental terminology?",
        a: "The speech layer is tuned for clinical dentistry — CDT terms, tooth numbers, materials — and handles accents well. Corrections you make teach your personal phrasing preferences.",
      },
    ],
    related: ["dental-records", "ai-receptionist", "business-intelligence"],
  },

  /* ------------------------------------------------ Marketing CRM */
  {
    slug: "marketing-crm",
    name: "Marketing CRM",
    category: "Growth",
    icon: Megaphone,
    tagline: "Know exactly which marketing dollar became a patient.",
    description:
      "Capture leads from your website, Facebook, and Google Ads. Respond in seconds with AI, nurture automatically, and track every lead to their first completed visit — so marketing ROI is a number, not a feeling.",
    metaDescription:
      "Dental marketing CRM: lead capture, Facebook and Google Ads integration, automated nurturing, reactivation campaigns, and closed-loop ROI tracking.",
    stats: [
      { value: "<60 sec", label: "Speed-to-lead with AI follow-up" },
      { value: "3.2×", label: "Higher conversion on instant response" },
      { value: "$-exact", label: "ROI tracked to completed production" },
    ],
    capabilities: [
      {
        icon: UserPlus,
        title: "Lead capture everywhere",
        description:
          "Embeddable forms, hosted landing pages, Facebook Lead Ads webhooks, Google Ads tracking, and per-campaign phone numbers that attribute calls to their source.",
      },
      {
        icon: Timer,
        title: "Instant AI response",
        description:
          "New lead at 10 PM? The AI texts back within a minute and can book the consult on the spot. Speed-to-lead is the single biggest conversion lever — automate it.",
      },
      {
        icon: Workflow,
        title: "Pipeline & SLA alerts",
        description:
          "Kanban from new → contacted → scheduled → showed → converted. Leads untouched for an hour during business hours escalate automatically.",
      },
      {
        icon: Send,
        title: "Nurture sequences",
        description:
          "Multi-step email/SMS drips per offer and source, stopping the moment a lead converts. Implant inquiry gets a different journey than a whitening special.",
      },
      {
        icon: RefreshCcw,
        title: "Reactivation campaigns",
        description:
          "Build audiences from your own patient base — lapsed 18+ months, no future appointment — and win them back with targeted campaigns, bookings attributed.",
      },
      {
        icon: Target,
        title: "Closed-loop ROI",
        description:
          "Spend versus attributed production per campaign, including offline conversion upload back to Google Ads when a lead completes their first visit.",
      },
    ],
    steps: [
      { title: "Connect your channels", description: "Website forms, Facebook, Google Ads, and call tracking numbers." },
      { title: "AI works every lead", description: "Instant text-back, qualification, and booking — 24/7." },
      { title: "Sequences nurture the rest", description: "Automated follow-up until they book or opt out." },
      { title: "ROI reports itself", description: "Every campaign shows spend, patients, and production side by side." },
    ],
    faqs: [
      {
        q: "Do I still need my marketing agency?",
        a: "DentalOS doesn't run your ads — it makes them measurable and converts the leads they generate. Agencies love it because their results finally show up in production dollars.",
      },
      {
        q: "How does call tracking attribution work?",
        a: "Each campaign gets its own tracking number that forwards to your line (or the AI receptionist). Calls, bookings, and eventual production tie back to the campaign that generated them.",
      },
      {
        q: "Is marketing communication compliant?",
        a: "Marketing sends respect opt-outs separately from transactional messages, honor quiet hours, and support 10DLC registration — compliance is handled in the plumbing.",
      },
    ],
    related: ["ai-receptionist", "patient-portal", "analytics-reports"],
  },

  /* ------------------------------------------------ Analytics */
  {
    slug: "analytics-reports",
    name: "Analytics & Reports",
    category: "Operations",
    icon: BarChart3,
    tagline: "Run the practice on today's numbers, not last month's.",
    description:
      "Live dashboards and fifteen-plus standard reports covering production, collections, AR, providers, hygiene, recall, and marketing — every number drillable to the source record, every report exportable and schedulable.",
    metaDescription:
      "Dental practice analytics: live production and collections dashboards, AR aging, provider scorecards, recall effectiveness, and exportable scheduled reports.",
    stats: [
      { value: "15+", label: "Standard reports, all drillable" },
      { value: "live", label: "Today's numbers update in real time" },
      { value: "PDF/XLSX/CSV", label: "Export & scheduled email delivery" },
    ],
    capabilities: [
      {
        icon: LineChart,
        title: "Production & collections",
        description:
          "Gross and net, by provider, location, procedure category, and day — with goals, trends, and net collection ratio always visible.",
      },
      {
        icon: FileBarChart2,
        title: "AR & insurance aging",
        description:
          "Patient and insurance receivables in aging buckets, drillable to guarantor and claim level, with one-click status checks on outstanding claims.",
      },
      {
        icon: Users,
        title: "Provider & hygiene scorecards",
        description:
          "Production per hour, per visit, reappointment rates, perio percentage, and goal attainment — the numbers behind fair, motivating conversations.",
      },
      {
        icon: TrendingUp,
        title: "New patient & referral analytics",
        description:
          "Counts, sources, first-visit production, and 6/12-month retention. Know which referral sources actually build the practice.",
      },
      {
        icon: PieChart,
        title: "Procedure profitability",
        description:
          "Revenue minus supply cost, lab cost, and chair time per procedure — so you know what a crown actually earns you.",
      },
      {
        icon: SlidersHorizontal,
        title: "Day sheet & audit reports",
        description:
          "Bookkeeper-ready daily audit of every charge, payment, and adjustment — plus scheduled email delivery of any report to any stakeholder.",
      },
    ],
    steps: [
      { title: "Dashboards live out of the box", description: "No setup — the moment data flows, the numbers appear." },
      { title: "Click any number", description: "Every metric drills to the underlying appointments, claims, or ledger entries." },
      { title: "Schedule what matters", description: "Monday production recap to the owner, day sheet to the bookkeeper — automatically." },
      { title: "Ask in plain English", description: "The AI assistant answers questions like “most profitable procedures last quarter?” with charts.",
      },
    ],
    faqs: [
      {
        q: "Can I build custom reports?",
        a: "Standard reports cover the vast majority of needs and are deeply filterable. A custom report builder (choose measures, dimensions, filters, save and share) is on the near-term roadmap.",
      },
      {
        q: "How fresh is the data?",
        a: "Today-view metrics update in real time over WebSockets. Historical reporting refreshes continuously through the day — no waiting for a nightly batch to see this morning.",
      },
      {
        q: "Can my accountant get access?",
        a: "Yes — a restricted reports-only role, or scheduled exports straight to their inbox, whichever they prefer.",
      },
    ],
    related: ["business-intelligence", "billing-payments", "insurance-automation"],
  },

  /* ------------------------------------------------ Digital Imaging */
  {
    slug: "digital-imaging",
    name: "Digital Imaging",
    category: "Clinical",
    icon: ScanLine,
    tagline: "Every image, every modality, one viewer — no more imaging silos.",
    description:
      "Sensors, pano, CBCT, and intraoral cameras flow into one DICOM-ready cloud viewer with annotation, calibrated measurement, side-by-side comparison, and AI-flagged findings for provider review.",
    metaDescription:
      "Cloud dental imaging: X-ray, panoramic, CBCT and intraoral camera support, DICOM viewer, annotation, comparison, AI findings, and secure sharing.",
    stats: [
      { value: "DICOM", label: "Native ingest, storage & export" },
      { value: "∞", label: "Storage — originals kept immutable" },
      { value: "1 click", label: "Secure sharing with specialists" },
    ],
    capabilities: [
      {
        icon: ScanLine,
        title: "Every modality",
        description:
          "Digital sensors, panoramic, CBCT, and intraoral cameras via a device bridge — plus watch-folder import and manual upload for anything else.",
      },
      {
        icon: Layers,
        title: "A real diagnostic viewer",
        description:
          "Window/level, zoom, rotate, calibrated length and angle measurement, and non-destructive annotation layers. FMX and bitewing mount layouts with position-aware capture.",
      },
      {
        icon: ArrowLeftRight,
        title: "Time-lapse comparison",
        description:
          "Side-by-side with synchronized zoom — watch a watched lesion across three years of bitewings in seconds.",
      },
      {
        icon: Sparkles,
        title: "AI findings for review",
        description:
          "Caries candidates and bone-level measurements presented as overlays for provider confirmation — always advisory, decisions always logged.",
      },
      {
        icon: CloudUpload,
        title: "Immutable cloud storage",
        description:
          "Originals stored encrypted and untouched; web-optimized renditions serve fast on any device. Full DICOM metadata preserved.",
      },
      {
        icon: Send,
        title: "Sharing that respects PHI",
        description:
          "Expiring secure links for specialists, patient-visible sharing controls, and attachments flowing straight into claims and referrals.",
      },
    ],
    steps: [
      { title: "Capture", description: "The device bridge sends images straight to the patient's chart, tagged by tooth." },
      { title: "Diagnose", description: "View, measure, annotate, and compare — with AI overlays as a second set of eyes." },
      { title: "Educate", description: "Show patients on the chairside display; understanding drives acceptance." },
      { title: "Share & attach", description: "Claims get their required attachments automatically; specialists get secure links." },
    ],
    faqs: [
      {
        q: "Which sensors and devices are supported?",
        a: "The desktop bridge supports TWAIN devices and major vendor SDKs (Dexis, Carestream, and others), plus DICOM import from CBCT units. If it produces an image file, we can ingest it.",
      },
      {
        q: "Is the AI diagnosing my patients?",
        a: "No. AI findings are candidates presented for your review — you confirm or dismiss each one, and that decision is logged. Diagnosis remains the provider's.",
      },
      {
        q: "What happens to images if we switch away?",
        a: "Full export including original files and DICOM — your images are yours, always.",
      },
    ],
    related: ["dental-records", "ai-clinical-notes", "insurance-automation"],
  },

  /* ------------------------------------------------ Inventory */
  {
    slug: "inventory",
    name: "Inventory Management",
    category: "Operations",
    icon: Boxes,
    tagline: "Never run out mid-procedure. Never over-order again.",
    description:
      "Barcode-scanned receiving and usage, min/max levels with low-stock alerts, one-click purchase orders grouped by vendor, expiration tracking, and per-procedure supply costs feeding your profitability reports.",
    metaDescription:
      "Dental inventory management: barcode scanning, low stock alerts, purchase orders, expiration and batch tracking, per-location stock, and usage costing.",
    stats: [
      { value: "-23%", label: "Typical supply spend reduction" },
      { value: "0", label: "Expired materials reaching patients" },
      { value: "1 click", label: "Reorder from low-stock alerts" },
    ],
    capabilities: [
      {
        icon: ScanBarcode,
        title: "Barcode everything",
        description:
          "Scan with a phone camera or USB scanner to receive orders and deduct usage. Counts stay honest because updating them takes seconds.",
      },
      {
        icon: BellRing,
        title: "Min/max alerts",
        description:
          "Fall below minimum and the right people get notified with a suggested purchase order already drafted.",
      },
      {
        icon: PackageSearch,
        title: "POs grouped by vendor",
        description:
          "One click turns alerts into purchase orders per vendor, emailed directly, with receiving reconciliation when boxes arrive.",
      },
      {
        icon: AlarmClock,
        title: "Expiration & batch tracking",
        description:
          "Lot numbers and expiry dates tracked per batch. FEFO guidance, expiring-soon reports, and clean write-off flows.",
      },
      {
        icon: Landmark,
        title: "Per-location stock",
        description:
          "Multi-location practices see stock per site with inter-location transfers and consolidated valuation (weighted average cost).",
      },
      {
        icon: PieChart,
        title: "Procedure supply costing",
        description:
          "Map supply kits to procedures and your profitability reports show what a crown really costs in materials — not a guess.",
      },
    ],
    steps: [
      { title: "Load your catalog", description: "Import products, vendors, and current counts; print barcode labels where needed." },
      { title: "Scan in, scan out", description: "Receiving and usage stay accurate with zero clipboard time." },
      { title: "Alerts drive orders", description: "Low stock becomes a vendor-grouped PO in one click." },
      { title: "Costs flow to reports", description: "Supply usage feeds procedure profitability automatically." },
    ],
    faqs: [
      {
        q: "Is this overkill for a small practice?",
        a: "It's designed to be lighter than the spreadsheet you're using now. Most solo practices track their top 100 items and let alerts handle the rest.",
      },
      {
        q: "Can it track implant lots for compliance?",
        a: "Yes — batch and lot tracking ties specific units to receiving records, and sterilization tracking (companion module) links instruments to patient visits.",
      },
      {
        q: "Does it order automatically?",
        a: "It drafts the PO; a human clicks send. Auto-approval thresholds for routine consumables are on the roadmap.",
      },
    ],
    related: ["analytics-reports", "business-intelligence", "billing-payments"],
  },

  /* ------------------------------------------------ Mobile Apps */
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    category: "Platform",
    icon: Smartphone,
    tagline: "The practice in your pocket. The dentist in theirs.",
    description:
      "Native iOS and Android apps for both sides of the chair: providers get their schedule, patient summaries, dictation, and alerts; patients get booking, bills, messages, and their treatment plan — with push notifications that actually get read.",
    metaDescription:
      "Native dental mobile apps: provider app with schedule, dictation and alerts; patient app with booking, payments, messaging, and treatment plans.",
    stats: [
      { value: "iOS + Android", label: "Native apps for both platforms" },
      { value: "98%", label: "Push notification read rate" },
      { value: "offline", label: "Provider schedule works without signal" },
    ],
    capabilities: [
      {
        icon: CalendarRange,
        title: "Provider: live schedule",
        description:
          "Today at a glance with real-time changes, patient flow status, and emergency bookings pushed instantly — even from the golf course.",
      },
      {
        icon: Mic,
        title: "Provider: dictate anywhere",
        description:
          "Record clinical notes on the go; AI drafts wait for review and signature. Sunday chart catch-up dies here.",
      },
      {
        icon: Contact,
        title: "Provider: patient summaries",
        description:
          "Search any patient and get the AI-generated brief: history, active treatment, last visits, alerts — before you return that call.",
      },
      {
        icon: CalendarCheck2,
        title: "Patient: booking & reminders",
        description:
          "Wallet-style appointment cards, one-tap confirm and reschedule, and push reminders that outperform SMS.",
      },
      {
        icon: CircleDollarSign,
        title: "Patient: bills & payments",
        description:
          "Balances, statements, payment plans, and biometric-secured payment in two taps.",
      },
      {
        icon: MessageSquareText,
        title: "Patient: messages & plans",
        description:
          "Secure chat with the practice, treatment plans with e-sign acceptance, shared X-rays, and post-op instructions on demand.",
      },
    ],
    steps: [
      { title: "Download & sign in", description: "Same account as the web app; biometric login on both apps." },
      { title: "Providers stay connected", description: "Schedule changes, lab arrivals, and urgent tasks push in real time." },
      { title: "Patients self-serve", description: "Booking, paying, and messaging move off your phone lines." },
      { title: "Everything is one system", description: "The apps are views on the same live platform — nothing to sync." },
    ],
    faqs: [
      {
        q: "Is the patient app white-labeled?",
        a: "The patient app carries your practice branding inside the app; a fully custom-named App Store presence is available on Enterprise.",
      },
      {
        q: "Can hygienists and front desk use the provider app?",
        a: "Yes — the staff app respects the same role-based permissions as the web app. Everyone sees exactly what their role allows.",
      },
      {
        q: "Does the provider app work offline?",
        a: "The schedule and recent patient summaries cache locally and sync when you're back online — built for hospital basements and airplane mode.",
      },
    ],
    related: ["patient-portal", "smart-scheduling", "ai-clinical-notes"],
  },

  /* ------------------------------------------------ Business Intelligence */
  {
    slug: "business-intelligence",
    name: "AI Business Intelligence",
    category: "Operations",
    icon: BrainCircuit,
    ai: true,
    tagline: "A CFO, analyst, and operations manager — living in your dashboard.",
    description:
      "Every morning, DentalOS reads your practice and tells you what matters: yesterday's performance, today's risks, this month's forecast, and the three actions worth taking. Ask follow-up questions in plain English and get answers with charts.",
    metaDescription:
      "AI business intelligence for dental practices: daily executive briefing, revenue forecasting, no-show prediction, payer analysis, and plain-English analytics.",
    stats: [
      { value: "7 AM", label: "Daily executive briefing, every day" },
      { value: "30/90d", label: "Revenue forecasting horizons" },
      { value: "plain English", label: "Ask anything about your data" },
    ],
    capabilities: [
      {
        icon: FileText,
        title: "Daily executive briefing",
        description:
          "Yesterday vs. goal, today's schedule gaps, AR movements, denial spikes, and the top three recommended actions — in your inbox before your coffee.",
      },
      {
        icon: TrendingUp,
        title: "Revenue forecasting",
        description:
          "Scheduled production times historical completion rates plus your recall pipeline — see the next 30 and 90 days, and test scenarios like adding a hygiene day.",
      },
      {
        icon: AlarmClock,
        title: "No-show & cancellation prediction",
        description:
          "Every appointment gets a risk score from history, lead time, and confirmation status. High-risk visits get extra touches and smart overbooking suggestions.",
      },
      {
        icon: Users,
        title: "Churn & retention analysis",
        description:
          "Patients drifting away — overdue recall, declining cadence — surface before they're gone, feeding reactivation campaigns automatically.",
      },
      {
        icon: Landmark,
        title: "Payer intelligence",
        description:
          "Reimbursement vs. contracted fees by payer and procedure, underpayment totals, and renegotiate-or-drop scorecards for every contract.",
      },
      {
        icon: MessageSquareText,
        title: "Ask your practice anything",
        description:
          "“Which provider had the best reappointment rate last quarter?” Natural-language questions get real answers with charts — read-only, tenant-scoped, safe.",
      },
    ],
    steps: [
      { title: "It reads everything", description: "Schedule, ledger, claims, recall, and marketing data in one model." },
      { title: "It briefs you daily", description: "The morning email tells you what changed and what to do." },
      { title: "It predicts problems", description: "No-shows, churn risk, and revenue shortfalls flagged early." },
      { title: "You ask, it answers", description: "Conversational analytics for everything the briefing didn't cover." },
    ],
    faqs: [
      {
        q: "Is my data used to train AI models?",
        a: "No. Your practice data is used to answer your questions and generate your insights — it is not used to train foundation models. Cross-practice benchmarking is anonymized and strictly opt-in.",
      },
      {
        q: "How accurate is the forecasting?",
        a: "Forecasts combine your actual scheduled production with your historical completion and cancellation patterns, so they tighten as the horizon approaches. Every forecast shows its confidence range — no false precision.",
      },
      {
        q: "Can the AI take actions, or just recommend?",
        a: "Recommendations by default. Actions like queuing a recall campaign are one click with human approval — and automation rules you explicitly enable can run hands-free with full audit logs.",
      },
    ],
    related: ["analytics-reports", "ai-receptionist", "marketing-crm"],
  },

  /* ------------------------------------------------ Voice AI */
  {
    slug: "voice-ai",
    name: "Voice AI",
    category: "AI Platform",
    icon: PhoneCall,
    ai: true,
    tagline: "Phone conversations so natural, patients say thank you.",
    description:
      "The voice engine behind the DentalOS AI Receptionist: sub-second responses, natural turn-taking with interruptions handled gracefully, automatic language detection, and a voice tuned to your practice's personality — running on carrier-grade telephony with every call recorded and transcribed.",
    metaDescription:
      "Dental voice AI: natural phone conversations with sub-second latency, interruption handling, multi-language support, and full call transcripts.",
    stats: [
      { value: "<1.2 s", label: "Average response latency" },
      { value: "24/7", label: "Availability — no hold music, ever" },
      { value: "100%", label: "Calls recorded, transcribed & scored" },
    ],
    capabilities: [
      {
        icon: PhoneCall,
        title: "Natural turn-taking",
        description:
          "Patients interrupt, change their minds mid-sentence, and mumble — the voice engine keeps up, just like a great receptionist would.",
      },
      {
        icon: Timer,
        title: "Sub-second latency",
        description:
          "Streaming speech recognition and generation mean responses land in under 1.2 seconds. No awkward robot pauses that make callers hang up.",
      },
      {
        icon: Languages,
        title: "Automatic language switching",
        description:
          "The caller starts in Spanish, the AI answers in Spanish — no menu, no transfer. Transcripts store in both the original language and English.",
      },
      {
        icon: SlidersHorizontal,
        title: "Your practice's voice",
        description:
          "Choose the voice, tone, and greeting. The AI introduces itself with your practice name and follows your scripting preferences for sensitive topics.",
      },
      {
        icon: Workflow,
        title: "Carrier-grade telephony",
        description:
          "Number porting or forwarding, per-location lines, warm transfers to staff, voicemail fallback, and state-law-aware recording disclosures.",
      },
      {
        icon: FileSearch,
        title: "Every call reviewable",
        description:
          "Recording, transcript, structured outcome, and sentiment score for every conversation — searchable in the Calls dashboard for QA and training.",
      },
    ],
    steps: [
      { title: "Keep your number", description: "Forward or port your existing line — no new hardware." },
      { title: "Pick voice & rules", description: "Voice, greeting, coverage windows, and transfer rules." },
      { title: "It answers instantly", description: "First ring, every time, in the caller's language." },
      { title: "You review anything", description: "Transcripts and outcomes stream into the dashboard live." },
    ],
    faqs: [
      {
        q: "How human does it actually sound?",
        a: "Modern neural voices with natural prosody — most callers engage without hesitation. The AI always discloses it's an assistant up front, and satisfaction data shows callers care about speed and outcome far more than who answered.",
      },
      {
        q: "What if two calls come in at once?",
        a: "The AI answers unlimited concurrent calls. Monday 8 AM surge, lunch hour, post-holiday — no busy signals, no queue.",
      },
      {
        q: "Does it work with my existing phone system?",
        a: "Yes — keep your current number and either forward to DentalOS or port it fully. Staff can still make and take calls through the integrated softphone with patient screen-pop.",
      },
    ],
    related: ["ai-receptionist", "smart-scheduling", "predictive-analytics"],
  },

  /* ------------------------------------------------ AI Clinical Assistant */
  {
    slug: "ai-clinical-assistant",
    name: "AI Clinical Assistant",
    category: "AI Platform",
    icon: Stethoscope,
    ai: true,
    tagline: "A second set of eyes on every chart, every visit, every prescription.",
    description:
      "Beyond note-writing: the AI Clinical Assistant watches for what's easy to miss — drug interactions, medical-history risks against planned treatment, chart-note discrepancies, and perio findings that meet treatment criteria — surfacing them at the moment of decision, always as advisories for the provider.",
    metaDescription:
      "AI clinical assistant for dentistry: drug interaction alerts, risk detection, treatment suggestions, chart discrepancy checks, and instant patient summaries.",
    stats: [
      { value: "100%", label: "Advisory — provider always decides" },
      { value: "at-decision", label: "Alerts appear when they matter, not after" },
      { value: "1 click", label: "Full patient summary before any visit" },
    ],
    capabilities: [
      {
        icon: ShieldAlert,
        title: "Risk detection against treatment",
        description:
          "Bisphosphonates + planned extraction → MRONJ warning. Anticoagulants + surgery → protocol reminder. The chart and the plan are cross-checked continuously.",
      },
      {
        icon: Stethoscope,
        title: "Drug interaction & allergy alerts",
        description:
          "Surfaced at prescribing time and whenever new medications are recorded — combining the e-prescribing network's database with the patient's local allergy list.",
      },
      {
        icon: ListChecks,
        title: "Treatment suggestions",
        description:
          "Perio exam meets SRP criteria → suggested D4341/D4342 by quadrant. Watched caries progressing across images → re-evaluation prompt. Rules plus AI, never auto-added.",
      },
      {
        icon: FileSearch,
        title: "Chart–note discrepancy checks",
        description:
          "The note mentions an extraction the odontogram doesn't show — or vice versa. Caught before signing, not in a payer audit two years later.",
      },
      {
        icon: FileText,
        title: "Instant patient summaries",
        description:
          "One click before a visit or phone call: history, active problems, pending treatment, recent visits — assembled and cited from the chart.",
      },
      {
        icon: Send,
        title: "Referral letters drafted",
        description:
          "Specialist referrals written from the chart with relevant history, findings, and imaging attached — review, sign, send.",
      },
    ],
    steps: [
      { title: "It reads the chart", description: "History, meds, allergies, perio data, images, and the treatment plan." },
      { title: "It watches decisions", description: "Prescribing, planning, and charting get real-time cross-checks." },
      { title: "It speaks up in context", description: "Advisories appear inline at the moment of decision." },
      { title: "You stay in charge", description: "Accept or dismiss with one tap — every decision logged." },
    ],
    faqs: [
      {
        q: "Is this making clinical decisions?",
        a: "No. Every output is an advisory that the provider accepts or dismisses. The system is designed as clinical decision support, with the licensed provider as the final authority — architecturally, not just as policy.",
      },
      {
        q: "Will it spam me with alerts?",
        a: "Alert fatigue is a design constraint: advisories are tiered by severity, deduplicated per visit, and tunable per provider. Critical safety flags are prominent; everything else stays quiet until you look.",
      },
      {
        q: "Where does the drug interaction data come from?",
        a: "From the certified e-prescribing network's continuously updated database, combined with the structured allergy and medication lists in the patient's DentalOS chart.",
      },
    ],
    related: ["ai-clinical-notes", "dental-records", "digital-imaging"],
  },

  /* ------------------------------------------------ Revenue AI */
  {
    slug: "revenue-ai",
    name: "Revenue AI",
    category: "AI Platform",
    icon: CircleDollarSign,
    ai: true,
    tagline: "Finds the money your practice already earned — and gets it collected.",
    description:
      "Revenue AI hunts the leaks: claims paid below contract, completed work never billed, accepted treatment never scheduled, balances aging silently, and insurance benefits expiring unused. Each finding arrives with the action that fixes it.",
    metaDescription:
      "Dental revenue AI: underpayment detection, unscheduled treatment recovery, AR prioritization, fee schedule analysis, and year-end benefits campaigns.",
    stats: [
      { value: "~9%", label: "Of production the average practice leaks" },
      { value: "auto", label: "Underpayments flagged on every ERA" },
      { value: "$-ranked", label: "Work queues sorted by dollar impact" },
    ],
    capabilities: [
      {
        icon: Landmark,
        title: "Underpayment detection",
        description:
          "Every ERA is compared against your contracted fee schedule per procedure. Payments below contract over your threshold land in a review queue with the variance calculated.",
      },
      {
        icon: Target,
        title: "Unscheduled treatment recovery",
        description:
          "Accepted treatment plans with no appointment attached are surfaced, ranked by value, and fed into follow-up automations and the morning huddle.",
      },
      {
        icon: CircleDollarSign,
        title: "AR prioritization",
        description:
          "Not all overdue balances are equal. The AI ranks collection work by amount, age, payment history, and likelihood — so staff time goes where it pays.",
      },
      {
        icon: PieChart,
        title: "Payer contract analysis",
        description:
          "Effective reimbursement versus contract by payer and procedure, with renegotiate-or-drop scorecards when a contract is quietly costing you.",
      },
      {
        icon: FileBarChart2,
        title: "Denial pattern detection",
        description:
          "Recurring denial reasons by payer and procedure get flagged with the fix — a missing attachment rule here, a coding pattern there — so denials stop repeating.",
      },
      {
        icon: BellRing,
        title: "Benefits-expiring campaigns",
        description:
          "Patients with remaining annual maximums and pending treatment get targeted year-end outreach — the classic Q4 production surge, automated.",
      },
    ],
    steps: [
      { title: "It audits continuously", description: "Ledger, claims, plans, and fee schedules — checked on every event." },
      { title: "Findings get ranked", description: "Every leak is quantified in dollars and sorted by impact." },
      { title: "Actions are attached", description: "Resubmit, follow up, schedule, or campaign — one click from the finding." },
      { title: "Recovered revenue is tracked", description: "See exactly what Revenue AI found and collected each month." },
    ],
    faqs: [
      {
        q: "How much does the average practice recover?",
        a: "Industry data puts leakage around 9% of production. Practices typically see recoveries from underpaid claims and unscheduled treatment within the first month — the in-app ROI report shows your exact number.",
      },
      {
        q: "Does it need my fee schedules loaded?",
        a: "Underpayment detection is only as good as your contracted fees, so yes — our onboarding team imports your fee schedules, and bulk tools keep them current.",
      },
      {
        q: "Can it write off or adjust anything on its own?",
        a: "No. Financial actions require human confirmation with the right permission. Revenue AI finds and quantifies; your team decides.",
      },
    ],
    related: ["insurance-automation", "billing-payments", "business-intelligence"],
  },

  /* ------------------------------------------------ Predictive Analytics */
  {
    slug: "predictive-analytics",
    name: "Predictive Analytics",
    category: "AI Platform",
    icon: LineChart,
    ai: true,
    tagline: "See next month's problems while they're still this month's choices.",
    description:
      "Machine learning models trained on your practice's own patterns predict no-shows before they happen, spot patients about to lapse, forecast revenue 30 and 90 days out, and map demand curves against staffing — turning management from reactive to preventive.",
    metaDescription:
      "Predictive analytics for dental practices: no-show prediction, patient churn risk, revenue forecasting, and demand-based staffing insights.",
    stats: [
      { value: "per-visit", label: "No-show risk score on every appointment" },
      { value: "30/90d", label: "Revenue forecast horizons" },
      { value: "early", label: "Churn flagged before patients are gone" },
    ],
    capabilities: [
      {
        icon: AlarmClock,
        title: "No-show prediction",
        description:
          "History, lead time, day and hour, appointment type, and confirmation status combine into a risk badge on the calendar — with extra confirmation touches triggered automatically for high-risk visits.",
      },
      {
        icon: CalendarClock,
        title: "Cancellation-risk-aware scheduling",
        description:
          "Smart overbooking suggestions where risk is concentrated, and backfill priorities tuned by who's actually likely to accept an offered slot.",
      },
      {
        icon: Users,
        title: "Churn early-warning",
        description:
          "Declining visit cadence plus overdue recall equals a patient quietly leaving. They surface in a save-list months before they'd normally be noticed — wired into reactivation campaigns.",
      },
      {
        icon: TrendingUp,
        title: "Revenue forecasting",
        description:
          "Scheduled production × your historical completion rates + the recall pipeline = a forecast with confidence ranges, updated daily. Test scenarios like adding a hygiene day.",
      },
      {
        icon: LineChart,
        title: "Demand & staffing curves",
        description:
          "Appointment demand by hour and weekday against staff schedules highlights over- and under-staffed windows before payroll is wasted or patients are turned away.",
      },
      {
        icon: SlidersHorizontal,
        title: "Transparent models",
        description:
          "Every prediction shows its drivers — “3 prior no-shows, booked 6 weeks out, unconfirmed” — so your team trusts the score and knows what to change.",
      },
    ],
    steps: [
      { title: "Models learn your practice", description: "Trained on your patterns, not generic industry averages." },
      { title: "Scores appear in the flow", description: "Risk badges on the calendar, save-lists in recall, forecasts on the dashboard." },
      { title: "Automations respond", description: "High-risk visits get extra touches; churn risks enter campaigns." },
      { title: "Accuracy compounds", description: "Every outcome feeds back — predictions sharpen month over month." },
    ],
    faqs: [
      {
        q: "How much history do the models need?",
        a: "Useful signals appear within weeks of go-live using appointment metadata; migrated historical data (which we import free) lets predictions start strong on day one.",
      },
      {
        q: "Is my data pooled with other practices?",
        a: "Your models run on your tenant's data. Anonymized cross-practice benchmarking exists as a separate, strictly opt-in feature — it never feeds your predictions without consent.",
      },
      {
        q: "What do I actually do with a high no-show score?",
        a: "The system acts for you by default: extra confirmation SMS, a call task if unconfirmed, and a standby waitlist match for the slot. You can also enable smart overbooking for chronically high-risk time blocks.",
      },
    ],
    related: ["business-intelligence", "smart-scheduling", "revenue-ai"],
  },
];

export const getModule = (slug: string) => modules.find((m) => m.slug === slug);

export const moduleCategories = [
  "Front Office",
  "Clinical",
  "Revenue Cycle",
  "Growth",
  "Operations",
  "Platform",
  "AI Platform",
] as const;
