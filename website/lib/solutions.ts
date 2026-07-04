import {
  Bot,
  BellRing,
  CalendarX2,
  CircleDollarSign,
  ClipboardList,
  Coins,
  CreditCard,
  FileCheck2,
  Files,
  LayoutDashboard,
  ListChecks,
  MessageSquareText,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  RefreshCcw,
  ShieldCheck,
  Shuffle,
  Smartphone,
  Target,
  Unplug,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type SolutionFix = {
  icon: LucideIcon;
  title: string;
  description: string;
  moduleSlug: string;
  moduleName: string;
};

export type SolutionContent = {
  slug: string;
  icon: LucideIcon;
  name: string; // short label
  headline: string; // page H1
  description: string; // hero sub
  metaDescription: string;
  painPoints: string[]; // what this problem looks like day to day
  costStats: { value: string; label: string }[];
  fixes: SolutionFix[];
  outcome: string; // closing "after DentalOS" statement
};

export const solutions: SolutionContent[] = [
  {
    slug: "insurance-paperwork",
    icon: Files,
    name: "Insurance Paperwork",
    headline: "End the insurance paperwork treadmill.",
    description:
      "Eligibility phone calls, claim forms, attachment hunting, EOB data entry, denial spreadsheets — the average practice burns 14+ staff hours a week feeding the insurance machine. DentalOS automates the entire lifecycle, from verification before the visit to payment posted after it.",
    metaDescription:
      "How DentalOS eliminates dental insurance paperwork: automated eligibility, claim scrubbing, electronic submission, AI appeals, and auto-posted ERAs.",
    painPoints: [
      "Staff on hold with payers for 20+ minutes per eligibility check",
      "Claims bounced for missing attachments or subscriber typos",
      "Friday afternoons lost to the weekly claim batch",
      "Paper EOBs keyed in line by line",
      "Denials sitting in a folder because appeals take an hour each",
    ],
    costStats: [
      { value: "14 hrs", label: "Weekly staff time on insurance admin (avg. practice)" },
      { value: "~10%", label: "Of claims denied on first submission industry-wide" },
      { value: "30–60d", label: "Cash delay when claims bounce and queue" },
    ],
    fixes: [
      {
        icon: ShieldCheck,
        title: "Eligibility verifies itself overnight",
        description:
          "Everyone on tomorrow's schedule is checked automatically through real-time payer connections. Problems show as badges on the appointment — before the patient is in the chair.",
        moduleSlug: "insurance-automation",
        moduleName: "Insurance Automation",
      },
      {
        icon: ListChecks,
        title: "Claims scrub and submit in clicks",
        description:
          "Completed procedures become draft claims automatically. The scrubber catches missing surfaces, required X-rays, and data errors before the payer ever sees them.",
        moduleSlug: "insurance-automation",
        moduleName: "Insurance Automation",
      },
      {
        icon: RefreshCcw,
        title: "ERAs post themselves",
        description:
          "Electronic remittances match to claims and post payments plus adjustments per procedure — with underpayments versus contract flagged for review, not silently written off.",
        moduleSlug: "revenue-ai",
        moduleName: "Revenue AI",
      },
      {
        icon: FileCheck2,
        title: "Denials become a worked queue",
        description:
          "Plain-English denial reasons, sorted by dollars, with one-click correct-and-resubmit or an AI-drafted appeal letter built from the claim's own context.",
        moduleSlug: "insurance-automation",
        moduleName: "Insurance Automation",
      },
    ],
    outcome:
      "Practices on DentalOS submit clean claims the same day treatment completes, post insurance payments without touching a keyboard, and cut AR over 90 days by half — while the staff hours that fed the paperwork machine go back to patients.",
  },

  {
    slug: "no-shows",
    icon: CalendarX2,
    name: "No-Shows & Cancellations",
    headline: "Empty chairs are optional now.",
    description:
      "Every no-show costs $200+ in staffed, rented, equipped chair time that produces nothing. DentalOS attacks the problem from every side: predicting who won't show, confirming smarter, and refilling the gaps automatically when cancellations happen anyway.",
    metaDescription:
      "How DentalOS reduces dental no-shows and cancellations: risk prediction, smart confirmation ladders, waitlist automation, and AI cancellation backfill.",
    painPoints: [
      "The 10 AM gap nobody saw coming until 9:55",
      "Front desk manually calling a paper waitlist while the chair sits empty",
      "Serial no-show patients booked into prime-time slots",
      "Reminders that go out but never get confirmed — or read",
    ],
    costStats: [
      { value: "$200+", label: "Lost per empty chair-hour, fully loaded" },
      { value: "10–15%", label: "Typical no-show rate without systematic follow-up" },
      { value: "$40k+", label: "Annual cost of no-shows for a 2-chair practice" },
    ],
    fixes: [
      {
        icon: Target,
        title: "Risk is visible before it happens",
        description:
          "Every appointment carries a no-show risk score from the patient's history, lead time, and confirmation status — high-risk visits get extra touches automatically.",
        moduleSlug: "predictive-analytics",
        moduleName: "Predictive Analytics",
      },
      {
        icon: BellRing,
        title: "Confirmations that actually confirm",
        description:
          "Email at 3 weeks, SMS at 3 days (reply C to confirm), SMS at 3 hours. Unconfirmed patients escalate to a call task instead of becoming a surprise.",
        moduleSlug: "smart-scheduling",
        moduleName: "Smart Scheduling",
      },
      {
        icon: Shuffle,
        title: "Cancellations refill themselves",
        description:
          "The moment a slot opens, the backfill engine texts matched waitlist patients in priority order with a claim link — most gaps refill in about 15 minutes.",
        moduleSlug: "smart-scheduling",
        moduleName: "Smart Scheduling",
      },
      {
        icon: Bot,
        title: "Rebooking happens instantly",
        description:
          "A patient who cancels by phone gets rebooked in the same AI conversation; one who no-shows gets an immediate, friendly rebooking text — no judgment, no lost patient.",
        moduleSlug: "ai-receptionist",
        moduleName: "AI Receptionist",
      },
    ],
    outcome:
      "DentalOS practices run 94% schedule fill rates with no-show rates near 2% — not because patients changed, but because the system never lets a gap survive until morning.",
  },

  {
    slug: "missed-calls",
    icon: PhoneMissed,
    name: "Missed Calls",
    headline: "Every missed call is a patient calling your competitor.",
    description:
      "Around 35% of calls to dental practices ring out — lunch hours, after close, or while the front desk juggles three things at once. A new-patient call is worth thousands in lifetime value, and it goes to whoever answers. DentalOS makes sure that's you.",
    metaDescription:
      "How DentalOS eliminates missed calls: 24/7 AI receptionist, instant text-back recovery, overflow answering, and full call visibility.",
    painPoints: [
      "The phone ringing out at 12:30 while staff eat lunch",
      "After-hours emergencies leaving voicemails — or not bothering",
      "Monday morning surge sending callers to busy signals",
      "No idea how many calls were missed, or who they were",
    ],
    costStats: [
      { value: "~35%", label: "Of practice calls go unanswered on average" },
      { value: "$5,000+", label: "Lifetime value of one lost new-patient call" },
      { value: "85%", label: "Of callers won't leave a voicemail" },
    ],
    fixes: [
      {
        icon: Bot,
        title: "Answered on the first ring, 24/7",
        description:
          "The AI receptionist answers every call — nights, weekends, lunch, and holiday breaks — and books real appointments on your live calendar.",
        moduleSlug: "ai-receptionist",
        moduleName: "AI Receptionist",
      },
      {
        icon: PhoneIncoming,
        title: "Instant missed-call recovery",
        description:
          "Any call that does slip through triggers an immediate text-back with a booking link. Practices recover 30–50% of would-be lost callers automatically.",
        moduleSlug: "ai-receptionist",
        moduleName: "AI Receptionist",
      },
      {
        icon: PhoneCall,
        title: "Overflow mode, your rules",
        description:
          "Let the front desk answer first and the AI catch what they can't — after N rings, during rush hours, or whenever lines are busy. Unlimited concurrent calls, no busy signals.",
        moduleSlug: "voice-ai",
        moduleName: "Voice AI",
      },
      {
        icon: MessageSquareText,
        title: "Every call visible",
        description:
          "Recordings, transcripts, outcomes, and sentiment for every conversation in the Calls dashboard — you finally know what your phone traffic is worth.",
        moduleSlug: "voice-ai",
        moduleName: "Voice AI",
      },
    ],
    outcome:
      "With DentalOS, the average practice books 60+ appointments a month it would have missed — most of them after hours, when the old answering machine was 'handling' the phones.",
  },

  {
    slug: "phone-interruptions",
    icon: PhoneCall,
    name: "Phone Interruptions",
    headline: "Give your front desk their day back.",
    description:
      "Sixty-plus interruptions a day: reschedules, directions, 'do you take my insurance,' balance questions — each one pulling staff away from the patient standing in front of them. DentalOS deflects the routine to AI and self-service, so humans handle what humans are for.",
    metaDescription:
      "How DentalOS reduces front desk phone interruptions: AI answering routine calls, patient self-service portal, online booking, and two-way texting.",
    painPoints: [
      "Checking in a patient while two lines ring",
      "The same five questions answered forty times a day",
      "Reschedule calls that take 6 minutes each",
      "Staff burnout from constant context-switching",
    ],
    costStats: [
      { value: "60+", label: "Front-desk interruptions per day" },
      { value: "~70%", label: "Of calls are routine and AI-deflectable" },
      { value: "4 hrs", label: "Staff time reclaimed daily (typical)" },
    ],
    fixes: [
      {
        icon: Bot,
        title: "AI takes the routine calls",
        description:
          "Booking, rescheduling, insurance participation, hours, directions — handled conversationally without a human. The desk phone rings only when it should.",
        moduleSlug: "ai-receptionist",
        moduleName: "AI Receptionist",
      },
      {
        icon: Smartphone,
        title: "Patients self-serve everything else",
        description:
          "Booking, forms, payments, X-rays, and messages in the portal and patient app. The call that used to interrupt checkout becomes a task handled between patients.",
        moduleSlug: "patient-portal",
        moduleName: "Patient Portal",
      },
      {
        icon: MessageSquareText,
        title: "Calls become async texts",
        description:
          "Two-way texting in a shared team inbox with full patient context — five text threads take the interruption load of one phone call.",
        moduleSlug: "patient-portal",
        moduleName: "Patient Portal",
      },
      {
        icon: LayoutDashboard,
        title: "Check-in without the counter crowd",
        description:
          "QR self-check-in and pre-visit links handle arrival, forms, and copays from the patient's own phone — front desk greets instead of processes.",
        moduleSlug: "smart-scheduling",
        moduleName: "Smart Scheduling",
      },
    ],
    outcome:
      "Practices report the front desk finally working a planned day instead of a reactive one — with happier staff, shorter lines, and patients who get answers faster than a phone call ever gave them.",
  },

  {
    slug: "revenue-leakage",
    icon: Coins,
    name: "Revenue Leakage",
    headline: "Stop earning money you never collect.",
    description:
      "Around 9% of production never becomes cash: procedures that miss the ledger, claims paid below contract, accepted treatment never scheduled, balances that age into write-offs. DentalOS audits every one of those leaks continuously — and attaches the fix to each finding.",
    metaDescription:
      "How DentalOS stops dental revenue leakage: underpayment detection, unscheduled treatment recovery, AR automation, and payment collection tools.",
    painPoints: [
      "ERAs posted without checking against contracted fees",
      "A $9,000 accepted treatment plan with no appointment attached",
      "Statements mailed monthly and ignored monthly",
      "Write-offs nobody questioned because nobody quantified them",
    ],
    costStats: [
      { value: "~9%", label: "Of production the average practice never collects" },
      { value: "$70k+", label: "Annual leakage for a $800k production practice" },
      { value: "60%", label: "Of underpayments go unnoticed without automation" },
    ],
    fixes: [
      {
        icon: CircleDollarSign,
        title: "Underpayments caught on every ERA",
        description:
          "Each payer payment is compared to your contracted fee per procedure — variances over threshold hit a review queue with the dollar difference calculated.",
        moduleSlug: "revenue-ai",
        moduleName: "Revenue AI",
      },
      {
        icon: Target,
        title: "Unscheduled treatment surfaces daily",
        description:
          "Accepted-but-unbooked treatment appears ranked by value in the morning huddle and feeds automated follow-up — the biggest leak, plugged.",
        moduleSlug: "revenue-ai",
        moduleName: "Revenue AI",
      },
      {
        icon: CreditCard,
        title: "Balances collect themselves",
        description:
          "Text-to-pay at checkout, reminder ladders, card-on-file payment plans with smart retries — patient AR stops aging because paying stopped being work.",
        moduleSlug: "billing-payments",
        moduleName: "Billing & Payments",
      },
      {
        icon: ClipboardList,
        title: "Nothing completed goes unbilled",
        description:
          "Procedures post from the signed clinical note, claims draft automatically, and the day sheet reconciles — the chart, ledger, and claims can't drift apart.",
        moduleSlug: "dental-records",
        moduleName: "Electronic Dental Records",
      },
    ],
    outcome:
      "DentalOS practices see the leakage number — theirs, in dollars, on the dashboard — and watch it shrink month over month as automation works the queues humans never had time for.",
  },

  {
    slug: "disconnected-software",
    icon: Unplug,
    name: "Disconnected Software",
    headline: "Six tools. Zero conversations between them. Until now.",
    description:
      "A PMS from 2005, imaging on a server in the closet, reminders from one vendor, reviews from another, payments from a third — each with its own login, bill, and copy of the truth. DentalOS replaces the pile with one platform where everything already knows about everything.",
    metaDescription:
      "How DentalOS replaces disconnected dental software: one platform for PMS, clinical, imaging, billing, insurance, communication, and marketing.",
    painPoints: [
      "Patient data re-typed into three systems — differently each time",
      "The reminder tool double-booking because it can't see the real calendar",
      "Six subscriptions, six support numbers, six points of failure",
      "Reports that disagree because every tool counts differently",
    ],
    costStats: [
      { value: "6+", label: "Disconnected tools at a typical practice" },
      { value: "$1,500+", label: "Monthly cost of the fragmented stack" },
      { value: "0", label: "Single sources of truth" },
    ],
    fixes: [
      {
        icon: Workflow,
        title: "One record, everywhere",
        description:
          "Scheduling, clinical, imaging, billing, insurance, and marketing share one patient record. Enter it once; every module already knows.",
        moduleSlug: "dental-records",
        moduleName: "Electronic Dental Records",
      },
      {
        icon: LayoutDashboard,
        title: "One dashboard, one truth",
        description:
          "Production, chairs, claims, and patient flow update live in one place — no more reconciling three tools' versions of the same number.",
        moduleSlug: "analytics-reports",
        moduleName: "Analytics & Reports",
      },
      {
        icon: Bot,
        title: "Automation that sees everything",
        description:
          "Because the AI sits on the source of truth, it can actually act: the receptionist books real slots, reminders reflect real schedules, campaigns know real balances.",
        moduleSlug: "ai-receptionist",
        moduleName: "AI Receptionist",
      },
      {
        icon: Unplug,
        title: "Integrations, not silos",
        description:
          "The tools you keep — accounting, imaging hardware, payment processors — connect through native integrations and an open API instead of manual re-entry.",
        moduleSlug: "mobile-apps",
        moduleName: "Mobile Apps & Platform",
      },
    ],
    outcome:
      "One login, one bill, one support team, one version of the truth — and a practice where a change in any module is instantly known by all of them.",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
