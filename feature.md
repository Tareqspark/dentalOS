# AI DentalOS — Full Development Specification

This document expands every module in [CLAUDE.md](CLAUDE.md) into implementation-level detail: data entities, functional requirements, UI screens, API surface, business rules, and edge cases. It is the working spec for development.

---

## 0. Foundations

### 0.1 User Roles & Personas

| Role | Description | Typical Access |
|---|---|---|
| Practice Owner / Admin | Owns the tenant; full access | Everything, including billing/settings |
| Office Manager | Runs daily operations | All operational modules; limited settings |
| Dentist (Provider) | Clinical work | Clinical modules, own schedule, patient records |
| Hygienist | Hygiene appointments, perio charting | Clinical (scoped), own schedule |
| Dental Assistant | Chairside support | Clinical read + limited write, imaging |
| Front Desk | Scheduling, check-in, payments | Scheduling, patients, billing, communication |
| Billing Specialist | Claims and AR | Insurance, billing, reports |
| Marketing Staff | Campaigns and leads | Marketing CRM, reputation, communication |
| Patient | Portal/app user | Own records only via portal |
| Super Admin (platform) | DentalOS staff | Cross-tenant support tooling, feature flags |

Permissions are role-based (RBAC) with per-permission overrides. Every permission is a `module:action` string (e.g. `patients:read`, `claims:submit`). Roles are editable per tenant; system roles above ship as defaults.

### 0.2 Multi-Tenancy Model

- One **Tenant** = one practice organization (may have many **Locations**).
- Every table carries `tenant_id`; enforce with row-level security (Postgres RLS) plus application-level scoping.
- Patients, providers, fee schedules, and inventory are tenant-scoped; appointments, operatories, and stock levels are location-scoped.
- White-label: per-tenant branding (logo, colors, custom domain for patient portal, email/SMS sender identity).

### 0.3 Suggested Tech Stack

- **Frontend:** React + TypeScript, Vite or Next.js, TailwindCSS, shadcn/ui-style component library, TanStack Query, Zustand for local state, WebSocket client for live updates. PWA with offline cache for schedule + charting.
- **Backend:** Node.js (NestJS) or equivalent API-first framework; REST + WebSocket gateway; background jobs via a queue (BullMQ/Redis or SQS).
- **Database:** PostgreSQL (RLS multi-tenancy), Redis (cache, presence, queues), S3-compatible object storage (documents, imaging), optional read replica for analytics.
- **AI layer:** Anthropic Claude API for language tasks (notes, chat, summaries, briefings); speech-to-text service for dictation/calls; telephony via Twilio (or similar) for voice/SMS.
- **Search:** Postgres full-text initially; move to OpenSearch if needed.
- **Infra:** Docker, IaC, CI/CD, per-environment feature flags (e.g. LaunchDarkly-style, can be homegrown table + SDK).

### 0.4 API Conventions

- REST, JSON, versioned: `/api/v1/...`
- Auth: OAuth2/OIDC; JWT access tokens (15 min) + refresh tokens; MFA (TOTP + SMS fallback).
- Standard list params: `?page=`, `?limit=`, `?sort=`, `?filter[...]=`, cursor pagination for large sets.
- Every mutating endpoint writes an **audit log** entry (see §21).
- Webhooks: tenant-configurable endpoints with HMAC signatures, retries with exponential backoff, event types like `appointment.created`, `claim.denied`, `payment.succeeded`.
- Idempotency keys required on payment and claim submission endpoints.

### 0.5 Core Shared Entities

- **Tenant** (id, name, plan, branding, settings JSON)
- **Location** (tenant_id, name, address, phone, timezone, tax rate, operatories[])
- **User** (tenant_id, name, email, phone, role_ids[], provider_profile?, status, MFA config)
- **Provider** (user_id, NPI, license #, specialty, provider color, production goals)
- **Patient** (see §2)
- **Operatory/Chair** (location_id, name, color, equipment tags)
- **AuditLog** (actor, action, entity, entity_id, before/after diff, IP, timestamp)
- **Notification** (user_id, type, payload, read_at, channel)
- **Document** (owner entity, S3 key, mime, category, uploaded_by, virus-scan status)

---

## 1. Dashboard

### Purpose
Single real-time screen answering "how is the practice doing right now."

### Widgets (each independently loadable, drag-and-drop arrangeable, per-role defaults)
1. **Today's appointments** — count + list preview; statuses (confirmed/unconfirmed/arrived/completed/no-show).
2. **Checked-in patients** — live list with wait-time timer; turns amber >10 min, red >20 min (configurable).
3. **Chair utilization** — % of bookable chair-minutes filled today; per-operatory mini bars.
4. **Daily production** — sum of completed procedure fees today vs. daily goal; live update on procedure completion.
5. **Daily collections** — payments posted today (by method); vs. goal.
6. **Pending insurance claims** — count + total $ by status bucket (draft, submitted, pending, denied).
7. **Outstanding patient balances** — AR total with 0–30/31–60/61–90/90+ aging chips.
8. **No-show rate / cancellation rate** — trailing 30 days, trend arrow vs. prior 30.
9. **Treatment acceptance rate** — presented vs. accepted $ this month.
10. **New patients this month** — count + source breakdown sparkline.
11. **Recall patients due** — due this month / overdue counts, link to recall dashboard.
12. **Staff currently working** — clocked-in staff avatars.
13. **Revenue trend** — 12-month production/collections line chart.
14. **Practice health score** — 0–100 composite (weights configurable): production vs. goal, AR aging, recall effectiveness, no-show rate, review rating, schedule fill rate.
15. **AI recommendations** — 3–5 generated daily insights ("Friday afternoons are 40% unfilled — consider a recall SMS blast").
16. **Tasks** — user's open tasks due today.
17. **Activity feed** — recent significant events (new patient, large payment, claim denial), live-streamed.

### Data / Implementation Notes
- All metrics served by a **metrics service** with per-widget endpoints (`GET /api/v1/dashboard/widgets/:key`) so widgets load independently and cache separately (Redis, 30–60 s TTL; live widgets use WebSocket pushes instead).
- Health score computed nightly + on-demand; store daily snapshots for trend.
- Dashboard layout persisted per user (`dashboard_layouts` table: user_id, widgets JSON with position/size).

### Acceptance Criteria
- Dashboard interactive (first widgets rendered) < 1.5 s on broadband.
- Check-in appearing on the flow board reflects on dashboard within 2 s (WebSocket).
- Every number is clickable and deep-links to the filtered underlying list.

---

## 2. Patient Management

### Entities
- **Patient**: first/middle/last name, preferred name, DOB, sex, gender identity (optional), SSN (encrypted, last-4 display), photo, status (active/inactive/archived/deceased), chart number (auto, tenant-scoped sequence), preferred location, preferred provider, preferred language, preferred contact method (SMS/email/voice), referral source (type + detail + referring patient/doctor link), tags[], created/updated.
- **PatientPhone** (patient_id, number, type: mobile/home/work, is_primary, sms_consent boolean + timestamp)
- **PatientAddress** (line1/2, city, state, zip; type: home/billing)
- **EmergencyContact** (name, relationship, phone)
- **FamilyLink** (patient_id, related_patient_id, relationship, is_guarantor) — guarantor drives statements (§8).
- **MedicalHistory**: structured questionnaire responses (versioned form), conditions[], surgeries[], flags (pregnant, pacemaker, anticoagulants, bisphosphonates, premedication required).
- **Allergy** (allergen, reaction, severity) — feeds medical alerts (§5) and e-prescribing checks.
- **Medication** (name, dose, frequency, prescriber, active)
- **PatientInsurance** — see §7.
- **PatientNote** (internal note, pinned flag, author) — never patient-visible.
- **PatientTag** (tenant-defined label + color; e.g. VIP, Anxious, Collections).

### Functional Requirements
- **Profile page** with tab layout: Overview | Clinical | Appointments | Billing | Insurance | Documents | Communication | Family | Activity.
- Overview header always visible: photo, name, age/DOB, alerts strip (allergies, medical flags, balance due, overdue recall), quick actions (book, message, take payment).
- **Communication timeline**: unified chronological log of every SMS/email/call/letter with direction, content, status (delivered/read), and who sent it.
- **Documents**: category folders (consent, insurance card, ID, referral, other), drag-drop upload, preview (PDF/image), e-signed consent forms stored with signature metadata (signer, IP, timestamp, form version).
- **Duplicate detection**:
  - On create: block/warn if exact match on (first+last+DOB) or same mobile number; show side-by-side compare.
  - Batch job: nightly fuzzy scan (trigram similarity on name + DOB/phone/email overlap), queue into a "Possible Duplicates" review screen with merge tool.
  - **Merge tool**: pick surviving record field-by-field; re-parent all child records (appointments, ledger, notes, images); merged record archived with pointer; merge is audit-logged and reversible for 30 days.
- **Global patient search**: instant search by name (fuzzy), phone, DOB, chart #, email; results in ≤300 ms; keyboard-first (⌘K palette).

### API (representative)
```
GET/POST   /patients            GET/PATCH/DELETE /patients/:id
POST       /patients/:id/merge  GET /patients/:id/timeline
GET/POST   /patients/:id/documents
GET        /patients/duplicates
```

### Edge Cases
- Minor patients: guarantor required; portal access via guardian account.
- Deceased status: suppress all automated communication immediately.
- Same phone number shared by family members (allowed, but SMS threads must disambiguate).

---

## 3. Online Appointment System & Calendar

### Entities
- **Appointment**: patient_id, provider_id, operatory_id, location_id, start/end (UTC + location TZ display), appointment_type_id, procedures[] (planned CDT codes), status (unconfirmed → confirmed → arrived → seated → in_treatment → checkout → completed | cancelled | no_show), booked_via (staff/online/AI receptionist/portal), notes, color override, recurring_group_id?, created_by.
- **AppointmentType** (name, default duration, default procedures, color, online-bookable flag, allowed providers, buffer before/after, new-patient-only flag).
- **ScheduleTemplate / Block**: provider working hours per location per weekday; block types (lunch, admin, emergency-reserved, holiday); date-specific overrides.
- **WaitlistEntry**: patient, desired appointment type, provider preference (or any), date/time window preferences, priority score, status, expiry.
- **Holiday** (location-scoped, recurring or one-off).

### Calendar (staff-facing)
- Views: Day (columns = operatories or providers, toggle), Week (per provider), Month (density heat).
- Drag-and-drop: move/resize appointments; conflict check on drop (provider double-book, operatory double-book, outside working hours, patient double-book) → hard block with override permission `schedule:override`.
- Color: by appointment type (default) or provider (toggle); status shown as left-edge strip + icon.
- Right-click / long-press context menu: confirm, check in, mark no-show, send reminder, copy, cut/paste to new slot.
- **Emergency slots**: blocks reserved per provider per day; only bookable with appointment types flagged `emergency` until N hours before (configurable), then released.
- **Recurring appointments**: weekly/biweekly/monthly patterns (e.g., perio maintenance); edit "this one / this and following / all".
- Timezone: all storage UTC; render in location TZ; DST-safe recurrence.

### Online Booking (patient-facing, embeddable widget + portal + patient app)
Flow: choose location → treatment type (only online-bookable types) → provider ("first available" default) → live slot picker (next 60 days) → identify (existing patient lookup via phone + DOB with OTP verification, or new patient mini-intake) → confirm → instant confirmation via SMS + email + calendar (.ics) attachment.
- Slot computation: provider template minus existing appointments minus blocks minus buffers; recompute on each request; **slot hold** (5 min TTL, Redis) while patient completes booking to prevent races.
- Reschedule/cancel via secure tokenized link (no login needed) up to cutoff (default 24 h; later requires calling); enforce cancellation policy text display.
- **Waitlist**: if no acceptable slot, patient joins waitlist with preferences; see AI backfill (§25).

### Business Rules
- New-patient appointment types can require deposit (card capture via §8) — configurable.
- Double-book prevention is authoritative server-side (unique-range exclusion constraint in Postgres on operatory + provider time ranges).
- No-show marking triggers: patient no-show counter++, optional automatic fee, communication template, and prediction model feedback (§16).

### API
```
GET  /calendar?location=&date=&view=       (returns appointments + blocks + templates)
POST /appointments        PATCH /appointments/:id     POST /appointments/:id/status
GET  /booking/slots?type=&provider=&location=&from=&to=
POST /booking/hold        POST /booking/confirm
GET/POST /waitlist
```

---

## 4. AI Receptionist

### Channels
1. **Voice** (phone): telephony provider streams audio → STT → Claude conversation loop with tool calls → TTS response. Target round-trip latency < 1.2 s.
2. **Web chat**: widget on practice website + patient portal, same tool-calling brain.

### Tools available to the AI agent (server-side functions, all permission-scoped and audit-logged)
- `lookup_patient(phone|name+dob)` — verify identity before disclosing anything (name + DOB match required; never read PHI to unverified callers).
- `get_available_slots`, `book_appointment`, `cancel_appointment`, `reschedule_appointment`
- `get_appointment_info` (verified patients only)
- `check_insurance_participation(payer)` — answers "do you take X?"
- `collect_new_patient_info` — structured intake → creates lead/patient draft
- `triage_emergency` — decision tree: uncontrolled bleeding / trauma / swelling affecting breathing → instruct 911/ER; severe pain/swelling → offer same-day emergency slot; else next available.
- `transfer_call(target)` — route to front desk / billing / voicemail; always available on request ("let me speak to a human").
- `take_message` — creates a task for staff with transcript summary.
- `answer_faq` — RAG over tenant-configured knowledge base (hours, parking, insurance list, pricing ranges, post-op instructions).

### Behaviors
- **Missed-call recovery**: any missed/abandoned call → immediate SMS "Sorry we missed you — reply here or tap to book" with booking link; logged in communication timeline.
- **Outbound**: appointment reminder calls, post-op follow-up calls, recall outreach calls — all with opt-out handling and quiet hours (no calls before 8 am / after 8 pm local, configurable).
- **Multi-language**: auto-detect; supported languages configurable; transcripts stored in original + English translation.
- **Handoff**: on any uncertainty, frustration cues, or explicit request → warm transfer or callback task. Configurable "AI answers: always / after-hours only / overflow only (after N rings)".
- Every call produces: recording (retention policy configurable), transcript, structured outcome (booked/cancelled/message/transferred), sentiment score — visible in a **Calls dashboard** with listen/review.

### Compliance
- Announce AI + recording disclosure at call start (per state law config).
- PHI disclosure only after identity verification; log verification method.

---

## 5. Electronic Dental Records (EDR)

### Odontogram / Tooth Chart
- Full-mouth interactive SVG chart: permanent (1–32 universal numbering; support FDI toggle) + primary (A–T); mixed dentition mode.
- Per-tooth, per-surface (M/O/D/B/L + root) rendering of:
  - **Existing conditions**: caries, existing restorations (amalgam/composite/crown/veneer/implant/bridge/RCT/extraction/missing), watch.
  - **Planned treatment** (from treatment plan, §9) — distinct visual style (outlined).
  - **Completed treatment** — solid style, date-stamped.
- Click tooth → radial/side panel to add condition or procedure (CDT code picker with favorites and smart suggestions based on surface + condition).
- Chart states are **snapshotted per visit**; scrub through clinical timeline to see chart at any past date.

### Periodontal Chart
- 6 sites/tooth: pocket depth, gingival margin/recession, CAL (computed), bleeding on probing, suppuration, furcation (grades), mobility (grades), plaque.
- Fast keyboard entry (auto-advance site→site) + **voice entry** ("three two three, bleeding") for solo hygienist charting.
- Exam comparison view: current vs. previous exams, per-site deltas highlighted; auto-classification suggestion (AAP staging/grading) as a draft.

### Clinical Notes
- Note types: SOAP, progress, exam findings, phone note, addendum.
- **Locked after signing** (provider signature + timestamp); corrections only via addendum (original preserved) — legal record requirement.
- **Templates**: tenant library with variables (`{{patient.first_name}}`, `{{teeth}}`, `{{anesthetic}}`); quick-picks per procedure.
- **Voice dictation**: streaming STT into note editor.
- **AI note generation** (§15): draft from dictation/ambient audio + structured visit data; provider must review and sign; AI-drafted flag stored.
- Auto-associations: note links to appointment, procedures performed, images taken that day.

### Medical Alerts
- Alert banner assembled from: allergies, medical flags (premed required, anticoagulants, pregnancy, bisphosphonates), and custom alerts.
- Hard-stop interstitial when opening the chart of a patient with critical alerts (must acknowledge).

### Electronic Prescriptions
- Integrate certified e-prescribing partner (e.g., DoseSpot/Surescripts network) — including **EPCS** for controlled substances (identity proofing + 2FA signing).
- In-app: medication search, patient med/allergy interaction check (surface interaction warnings from partner + local allergy list), pharmacy selection, Rx history.

### Entities
`ToothCondition`, `PerioExam` + `PerioMeasurement`, `ClinicalNote` (+ `NoteAddendum`), `Procedure` (CDT code, tooth, surfaces, status: planned/completed/existing, fee, provider, appointment_id, completed_at), `Prescription`, `MedicalAlert`.

---

## 6. Digital Imaging

### Requirements
- **Acquisition**: TWAIN/device-bridge desktop helper app for sensors/pano/CBCT import; watch-folder import; manual upload; intraoral camera capture.
- **Storage**: originals immutable in S3 (encrypted); auto-generate web-friendly renditions; **DICOM** ingest (store full DICOM, extract preview + metadata) and DICOM export/DICOMweb (WADO-RS) for sharing.
- **Viewer**: window/level (brightness/contrast), zoom/pan, rotate/flip, measure (calibrated length/angle), annotate (arrows, circles, text — stored as non-destructive overlay layers), full-screen and multi-image compare (side-by-side with sync zoom), timeline filmstrip per patient.
- **Mount layouts**: FMX 18, bitewing 4, pano — position-aware capture sequences.
- **AI image analysis** (flagged feature, requires regulatory review before diagnostic claims): caries detection candidates, bone-level measurement, calculus flags — always presented as "AI findings for review," provider must confirm/dismiss; decisions logged.
- **Sharing**: secure expiring link (specialist referral), export with patient info burn-in optional, attach to claims (§7 attachments) and referrals (§28).

### Entities
`ImageStudy` (patient, date, modality, mount layout), `ImageInstance` (study_id, S3 keys, DICOM meta, tooth tags[]), `ImageAnnotation`, `AIFinding` (image, type, bbox/polygon, confidence, review status).

---

## 7. Insurance Management

### Entities
- **Payer** (name, payer ID, clearinghouse routing, phone, portal URL, participation status per provider)
- **InsurancePlan** (payer, group #, employer, plan type PPO/HMO/indemnity, fee schedule link, frequency limitations JSON, waiting periods, missing tooth clause flag, annual max, deductible)
- **PatientInsurance** (patient, plan, subscriber (self or family member), member ID, rank primary/secondary, effective/term dates, remaining benefits cache)
- **EligibilityCheck** (raw 270/271 payload, parsed benefits snapshot, checked_at)
- **Claim** (patient, procedures[], billed amounts, status: draft → validated → submitted → accepted → pending → paid/denied/partial, payer claim #, attachments[], resubmission lineage)
- **PreAuthorization** (like claim, type=predetermination, approval details, expiry)
- **ERA/835 Payment** (payer, check/EFT #, claim allocations, adjustment codes)

### Functional Requirements
- **Verification & eligibility**: clearinghouse integration (e.g., Change Healthcare/Availity-class) for real-time 270/271; **auto-verify batch job** runs nightly for all patients with appointments in next N days (default 3); result badge on appointment (verified ✓ / issue ⚠ / unverified).
- **Benefits breakdown** stored structured: deductible (ind/family, met), annual max (used/remaining), coverage % by category (preventive/basic/major/ortho), frequencies (e.g., D1110 2/yr, last used date if returned), waiting periods.
- **Coverage estimation engine**: given planned procedures → apply plan rules (category %, deductible remaining, annual max remaining, frequency conflicts, downgrades e.g. posterior composite→amalgam) → per-procedure insurance estimate + patient responsibility. This engine powers treatment plan estimates (§9) and checkout.
- **Claims**:
  - Auto-create draft claim when procedures completed for insured patient.
  - **Pre-submission scrubber**: validation rules (missing tooth/surface for surface-specific codes, missing attachments for codes requiring X-rays/narratives, provider NPI, subscriber data) — errors block, warnings flag.
  - Batch submission (837D) with clearinghouse acknowledgment tracking (999/277).
  - Attachments via NEA/DentalXChange-style attachment service (X-rays, perio charts, narratives).
- **Denial management**: denial reason codes mapped to plain English; work queue sorted by $ and age; actions: correct & resubmit (lineage preserved), appeal (letter template library with AI-drafted appeal from claim context), write off (permission-gated), bill patient.
- **ERA/EOB reconciliation**: auto-post 835s — match to claims, post payer payment + contractual adjustment per procedure, flag underpayments vs. contracted fee schedule (> $ threshold) into a review queue; manual EOB entry screen for paper EOBs.
- **COB**: secondary claims auto-created after primary payment posts, with primary EOB attached.
- **Insurance aging report**: outstanding claims by payer and 0–30/31–60/61–90/90+ buckets; drill to claim list; one-click "check status" (276/277) per claim.

### Acceptance Criteria
- Eligibility check round-trip surfaced in UI ≤ 30 s (async with live status).
- A clean claim can go from procedure completion to submitted in ≤ 3 clicks.

---

## 8. Billing & Payments

### Ledger Model (double-entry style per guarantor)
- **LedgerEntry** types: charge (procedure), payment (patient/insurance), adjustment (contractual, courtesy discount, write-off — each with reason code), refund, transfer (between family members), finance charge.
- Balances computed per patient and rolled up per **guarantor** (statements go to guarantor).
- Allocation: payments allocate to specific procedures (FIFO default, manual reallocation allowed) so production/collection reports per provider are accurate.

### Payments
- Gateway integration (Stripe or dental-specific processor) supporting: card present (terminal SDK), card on file (tokenized, consent recorded), ACH, Apple Pay/Google Pay (online), payment links (SMS/email, hosted checkout page), portal payments.
- **Payment plans**: schedule builder (down payment, N installments, frequency), auto-charge card on file, failed-payment dunning (retry schedule 3/5/7 days + notifications), plan status dashboard.
- Refunds: full/partial to original method, reason required, permission `payments:refund`, auto ledger entry.
- **Financing integration**: third-party (CareCredit/Sunbit-style) — application link from treatment plan, approval webhook posts as payment method.
- Receipts: automatic email/SMS receipt on every payment; reprint anytime.
- Surcharging/convenience fee support (state-law configurable).

### Statements & Reminders
- Statement generation: on-demand + scheduled monthly cycle; delivery: email with pay-link (default), SMS link, print/mail export (PDF batch); guarantor-level, itemized, aging summary, minimum-balance threshold to suppress.
- **Balance reminder automation**: configurable cadence (e.g., day 7 SMS, day 21 email + link, day 45 letter, day 60 pre-collections flag); auto-pauses if payment plan active or dispute flag set.

### Day-End & Controls
- Daily close: reconcile posted payments vs. gateway settlement; over/short report; lock posted days (edits require adjustment entries, `billing:admin`).

---

## 9. Treatment Planning

### Entities
- **TreatmentPlan** (patient, name, status: draft/presented/accepted/partially accepted/declined/expired, presented_at, presented_by, expiry)
- **PlanPhase** (plan_id, sequence, name, target timeframe)
- **PlanProcedure** (phase_id, CDT code, tooth/surface, provider, fee (from fee schedule §29), insurance estimate, patient portion, priority, status, alternative_group?)
- **PlanScenario** — alternative versions of a plan (e.g., "Implant option" vs. "Bridge option") sharing the same case; patient sees comparison.
- **ConsentRecord** (plan or procedure scoped, form version, signature image/vector, signer, timestamp, IP, witness)

### Functional Requirements
- Build plan from odontogram (planned procedures flow in automatically) or from scratch; drag procedures between phases.
- **Estimates**: live insurance estimation via §7 engine; show per-procedure and totals: fee / est. insurance / est. patient portion; disclaimer text configurable; refresh estimates on benefit changes with change-highlighting.
- **Presentation mode**: full-screen patient-facing view — clean visuals, tooth chart highlights, before/after image gallery (from §6 or stock education images), scenario comparison side-by-side, financing calculator (monthly payment at configured APR/terms).
- **Acceptance workflow**: patient accepts whole plan / by phase / by procedure → e-signature capture (in-office tablet or portal remote signing link) → accepted procedures become schedulable (feed the "unscheduled treatment" report and morning huddle §25).
- **Tracking**: acceptance rate analytics by provider, by procedure category, by presenter; follow-up automation for unaccepted plans (workflow rules §Design: e.g., 14-day SMS).

---

## 10. Patient Communication

### Channels & Infrastructure
- **SMS**: two-way, per-location numbers (provisioned via telephony provider); threads per patient; MMS support; STOP/opt-out compliance handled automatically; 10DLC registration support.
- **Email**: transactional (reminders/receipts) + marketing (campaigns) with separate sending domains; open/click tracking; unsubscribe management (marketing only — transactional always allowed).
- **Voice**: AI calls (§4) + click-to-call for staff with call logging.
- **WhatsApp** (optional, feature-flagged): via WhatsApp Business API, template-message compliant.

### Unified Inbox
- Team inbox of all patient threads (SMS/email/portal messages/WhatsApp) with assignment, unread states, snooze, internal comments, canned responses, patient context sidebar (next appt, balance, alerts). Real-time via WebSocket.

### Automated Messaging (template + rules engine)
- **Appointment reminders**: default ladder — 3 weeks (email), 3 days (SMS with confirm link — reply C to confirm), 3 hours (SMS); confirmations update appointment status; unconfirmed-by-24 h escalation task for front desk. Cadence fully configurable per appointment type.
- Recall reminders (§11), payment reminders (§8), birthday messages, post-op check-ins (procedure-triggered, e.g., extraction → next-day "how are you feeling" SMS), review requests (§12), survey invites.
- All templates support variables, per-language variants, quiet hours, and per-patient channel preference; every automated send appears in the patient communication timeline.

### Surveys
- Post-visit satisfaction survey (NPS + free text) via SMS link; results feed reputation module (§12) and provider scorecards.

---

## 11. Recall Management

### Model
- **RecallType** (name, e.g., Hygiene/Perio Maintenance/Exam/X-ray, default interval, linked CDT triggers)
- **PatientRecall** (patient, type, interval override, due_date, status: due/scheduled/completed/overdue/dismissed, last_completed_at)
- Completing a triggering procedure (e.g., D1110) auto-advances due_date = completion + interval.

### Functional Requirements
- **Recall dashboard**: pipeline view — due this month / next month / overdue 1–3 mo / 3–6 mo / 6 mo+; filters by provider, insurance status, last contact; bulk actions.
- **Automated outreach sequences**: configurable multi-touch (e.g., due−30 d email, due date SMS with booking link, due+14 d SMS, due+45 d AI voice call, due+90 d "we miss you" reactivation); stops instantly when appointment booked.
- **AI priority scoring**: rank overdue patients by (production potential from unscheduled treatment, perio status, insurance benefits remaining & expiring at year-end, historical show rate) → "call these 20 first" list; year-end "use your benefits" campaign generator.
- Missed recall alerts: overdue patients with upcoming non-hygiene appointments flagged so staff can add hygiene same-day.

---

## 12. Reputation Management

- **Review request automation**: post-checkout trigger (completed appointment) → SMS with rating prompt (1–5 stars in-app):
  - 4–5 stars → deep link to Google review page (per-location Google review link config).
  - 1–3 stars → internal feedback form routed as high-priority task to office manager; never blocks or gates public reviewing (compliant with Google policy — configurable to always show public link).
- Throttling: max 1 request per patient per N days; exclude tagged patients.
- **Review monitoring**: Google Business Profile API integration — pull reviews per location, notify on new reviews (alert on ≤3 stars), reply from within app, AI-drafted reply suggestions.
- **Analytics**: average rating trend, review velocity, source breakdown, staff mentions extraction; **reputation score** component feeds practice health score (§1).

---

## 13. Inventory Management

### Entities
`Product` (name, SKU, barcode, category, unit, min/max levels per location, default vendor, cost history), `Vendor`, `PurchaseOrder` (+lines, status: draft/sent/partial/received/closed), `StockLevel` (product × location), `StockTransaction` (receive/use/adjust/transfer/expire — every movement logged), `Batch` (product, lot #, expiry, qty).

### Functional Requirements
- Barcode scanning (camera-based on mobile/tablet + USB scanner support) for receiving and usage deduction.
- Low-stock alerts (below min → notification + suggested PO); one-click PO generation grouped by vendor; email PO to vendor.
- Expiration tracking: FEFO guidance, expiring-in-30/60/90 report, expired-stock write-off flow.
- Usage tracking: optional procedure-linked consumption (procedure → supply kit mapping) for per-procedure supply cost in profitability reports (§18).
- Inventory valuation (weighted average cost), per-location stock, inter-location transfers.

---

## 14. Staff Management

- **Employee profile**: personal info, role(s), locations, pay type (exempt/hourly), license/credential records with expiry alerts (dental license, DEA, CPR), documents (contracts, W-4), emergency contact.
- **Shift scheduling**: weekly rota builder per location, shift templates, publish → notifies staff, swap requests with approval, conflict warnings vs. PTO.
- **Time clock**: clock in/out from app (optional geofence per location), break tracking, manager corrections (audit-logged), timesheet approval flow, **payroll export** (CSV + Gusto/ADP-style formats).
- **PTO**: policy config (accrual rules), request → approval workflow, balance display, calendar overlay on scheduling.
- **CE tracking**: required hours per license period, log courses + certificates, deadline reminders.
- **Productivity**: provider production/collection per day/hour, hygiene reappointment rate, front-desk conversion metrics — feeds §18 dashboards; visible per user vs. their goals.

---

## 15. AI Clinical Assistant

- **Ambient/dictated visit notes**: record audio during visit (explicit consent flow, consent logged) or dictate after → structured draft SOAP note with extracted: procedures performed (mapped to CDT), teeth/surfaces, anesthetic used (type/carpules), materials, post-op instructions given, follow-up plan. Provider reviews, edits, signs.
- **Auto coding suggestions**: from note text + odontogram deltas → suggested CDT codes with confidence; discrepancy check (note mentions procedure not charted, or vice versa) before sign-off.
- **Treatment suggestions**: rule + AI hybrid: e.g., perio exam meets SRP criteria → suggest D4341/D4342 by quadrant; watch-listed caries progression across images → prompt re-evaluation. Always advisory, never auto-added.
- **Clinical summaries**: one-click "summarize this patient" (history, active problems, pending treatment, last visits) for provider prep; referral letter auto-draft (§28).
- **Risk & safety**:
  - Drug interaction + allergy alerts surfaced at prescribing time (§5) and when new meds recorded.
  - Medical-history-driven flags at treatment planning (e.g., bisphosphonates + planned extraction → MRONJ warning; anticoagulants + surgery → protocol reminder; premedication check at check-in).
- All AI outputs are drafts requiring human confirmation; every AI generation stored with model version, prompt context hash, and reviewing provider — for QA and liability.

---

## 16. AI Business Assistant

- **Daily executive briefing** (configurable delivery: in-app + email + push, 7 am local): yesterday's production/collections vs. goal, today's schedule fill %, notable gaps, AR movements, denial spikes, staffing vs. demand, top 3 recommended actions.
- **Forecasting**: revenue forecast (next 30/90 days) from scheduled production × historical completion rates + recall pipeline; scenario tweaks ("what if we add a hygiene day Fridays").
- **Prediction models**:
  - **No-show/cancellation risk** per appointment (features: history, lead time, day/time, appointment type, confirmation status, weather optional) → risk badge on calendar; high-risk triggers extra confirmation touch + overbooking suggestions.
  - **Patient churn risk**: overdue recall + declining visit cadence → feeds reactivation campaigns (§17).
- **Analysis on demand** (chat interface for owner, natural-language over practice data): "Which procedures were most profitable last quarter?" → NL→SQL over a semantic layer restricted to the tenant's data, with rendered charts; guardrails: read-only, PHI-minimized aggregate answers by default.
- **Insurance reimbursement analysis**: average reimbursement vs. contracted fee by payer/procedure, underpayment totals, "renegotiate or drop" payer scorecards.
- Staffing recommendations: demand curve (appointments by hour/day) vs. staff schedule → over/understaffed windows.

---

## 17. Marketing CRM

### Entities
`Lead` (name, contact, source, campaign, status: new/contacted/scheduled/converted/lost, assigned_to, notes, patient_id when converted), `Campaign` (channel, audience, content, schedule, budget, UTM), `LandingPage`, `ReferralRecord`.

### Functional Requirements
- **Lead capture**: embeddable web forms + hosted landing pages (template builder: hero, offer, form, testimonials — white-labeled, published on tenant subdomain), **Facebook Lead Ads** webhook integration, **Google Ads** tracking (UTM capture + offline conversion upload when lead converts to completed first visit), call-tracking numbers per campaign (dynamic number insertion) attributing calls to sources.
- **Lead pipeline**: kanban (new → contacted → scheduled → showed → converted); SLA alerts (uncontacted > 1 h during business hours → escalate); AI receptionist can work leads (instant SMS/call-back on form submit).
- **Nurture sequences**: multi-step email/SMS drips per source/offer; stop on conversion.
- **Reactivation campaigns**: audience builder over patient base (last visit > 18 mo, no future appt, not deceased/opted-out) → campaign send → bookings attributed.
- **Referral tracking**: referral source on every patient; thank-you automation for referring patients/doctors; leaderboard; referral ROI in §18.
- Marketing ROI: per campaign — spend (manual or ads API) vs. attributed production from converted patients.

---

## 18. Analytics & Reports

### Architecture
- Nightly ETL into analytics schema (star-ish: fact_procedures, fact_payments, fact_appointments, dims: date/provider/location/payer/patient-cohort) + intraday incremental for "today" metrics; report engine renders tables + charts with drill-down to source records.

### Standard Reports (all filterable by date range, location, provider; all exportable PDF/XLSX/CSV; schedulable email delivery)
1. Production (gross/net, by provider/location/procedure category/day)
2. Collections (by method, by provider allocation, net collection ratio)
3. Adjustments & write-offs (by reason code)
4. Provider productivity (production/hour, per visit, goal attainment)
5. Hygiene productivity (perio %, reappointment rate, production/visit)
6. Procedure profitability (revenue − supply cost (§13) − lab cost (§27) − chair time cost)
7. Insurance aging & claim turnaround by payer
8. Accounts receivable (patient vs. insurance, aging buckets, guarantor detail)
9. New patient report (count, source, first-visit production, retention at 6/12 mo)
10. Referral performance (§17/§28)
11. Recall effectiveness (due vs. scheduled vs. completed %)
12. No-show/cancellation analysis (by day/time/type/provider)
13. Chair utilization (booked vs. available chair-minutes)
14. Marketing ROI (§17)
15. Day sheet (daily audit: all charges/payments/adjustments — bookkeeper-ready)

- **Custom report builder** (v2): pick measures/dimensions/filters, save + share tenant-wide.
- Benchmarking (feature-flagged): anonymized cross-tenant percentile comparisons.

---

## 19. Patient Portal

- Auth: email/phone + OTP (passwordless default), optional password + MFA; guardian access to minor accounts (relationship verified at front desk).
- Features: upcoming/past appointments (book/reschedule/cancel per §3 rules), treatment plans (view + remote e-sign + accept), forms center (assigned intake/consent forms, auto-assigned by appointment type, save-and-resume), document upload (insurance card photo), X-ray viewing (share-enabled images only), billing (balance, statements, pay now, payment plans view, receipts/invoices PDF), insurance on file + estimates, secure messaging with the clinic (threads into unified inbox §10), educational content (procedure-specific articles/videos assigned by provider or auto by planned treatment).
- White-labeled per tenant (logo/colors/custom domain). Fully responsive; this is also the web fallback for the patient app (§23).

---

## 20. Multi-Location Management

- Location switcher in app header (persists per user; "All locations" mode for admins on dashboards/reports).
- Shared tenant-wide: patient records, providers (with per-location availability), fee schedules (optional per-location overrides), templates, roles.
- Location-scoped: operatories, schedules, phone numbers, inventory stock, tax/statement settings, Google Business profile.
- Centralized scheduling: front desk can book any location; patient preferred location default; provider transfer = availability template moved, history intact.
- Reporting: every report groupable/filterable by location; consolidated P&L-style revenue view.

---

## 21. Compliance & Security

- **HIPAA program**: BAA support, minimum-necessary RBAC, PHI access logging (every patient-record view logged with user + timestamp — "break the glass" reporting), configurable data retention, patient record export (patient right of access) and amendment workflow.
- **Audit logs**: immutable (append-only, hash-chained), all CRUD + auth events + PHI views + permission changes; searchable admin UI; export.
- **Encryption**: TLS 1.2+ everywhere; AES-256 at rest (DB + S3); field-level encryption for SSN/payment tokens; secrets in a vault.
- **Auth hardening**: MFA enforceable per tenant, session timeout (default 15 min inactivity, configurable), device management (view/revoke active sessions), IP allowlisting (optional), lockout after failed attempts.
- **Backups/DR**: automated encrypted backups (point-in-time recovery), cross-region replication, documented RTO ≤ 4 h / RPO ≤ 15 min, restore drills.
- App security: OWASP ASVS-aligned SDLC, dependency scanning, pen test before GA, rate limiting, tenant isolation tests in CI.

---

## 22. Integrations

| Category | Approach |
|---|---|
| Payments | Stripe (or dental processor) — cards, ACH, terminals, wallets |
| Clearinghouse | 270/271, 837D, 835, 276/277 + attachments partner |
| E-prescribing | Certified partner (Surescripts network, EPCS) |
| Imaging devices | Desktop bridge app (TWAIN/vendor SDKs) + DICOM |
| Accounting | QuickBooks Online export/sync (day sheet → journal entries) |
| Email | Transactional (SES/Postmark-class) + marketing sends |
| SMS/Voice | Twilio-class CPaaS (10DLC, numbers per location) |
| Calendar | Google/Outlook one-way provider schedule feed (.ics + API) |
| E-signature | Native in-app signing (primary); DocuSign-class optional |
| Speech-to-text | Streaming STT vendor for dictation + calls |
| AI | Anthropic Claude API (all language AI) |
| Cloud storage | S3-compatible; optional tenant Drive/Dropbox export |
| Automation | Public REST API + webhooks + Zapier app |

All third-party credentials stored per tenant in encrypted config; integration health dashboard (last sync, error states) for admins.

---

## 23. Mobile Applications

- **Approach**: React Native (shared TS types with web) or Flutter; offline-first storage for the dentist app schedule/notes drafts.
- **Dentist/Staff app**: today's schedule (live), patient search + chart summary view, clinical note dictation (record → AI draft → sign later on desktop or in-app), image capture/upload to patient chart, dashboard KPIs, push notifications (schedule changes, lab case arrivals, high-priority tasks, emergency bookings), time clock.
- **Patient app**: everything in the portal (§19) + push reminders, wallet-style appointment cards, biometric login, in-app chat.
- Push infrastructure: FCM/APNs via a notification service with per-user channel preferences.

---

## 24. AI Platform (Unified Engine)

Central AI service used by all modules — never module-siloed integrations.

- **Gateway**: single internal API for AI calls; handles model routing (Claude model per task class), prompt templates versioned in-repo, PHI redaction options, response caching, token/cost accounting **per tenant per feature** (for margin monitoring and plan limits), rate limiting, full generation logging (input hash, output, model, latency) for QA.
- **Context service**: assembles tenant+patient context safely (RBAC-checked) for any AI feature; RAG store for tenant knowledge bases (FAQ, policies, templates).
- **Capabilities registry** (each feature-flagged per tenant/plan): voice receptionist (§4), clinical documentation (§15), business intelligence + predictions (§16), insurance assistance (denial appeals, narratives §7), smart scheduling (slot suggestions, overbooking advice), automated communication drafting (§10/§17), revenue optimization hints, **natural-language search** (global ⌘K: "show me Maria's last perio chart", "unpaid claims over $500 from Delta"), patient chatbot (§4 chat), staff chatbot ("how do I post a refund?" — docs RAG), executive assistant (§16 chat), workflow automation suggestions, recommendation engine (dashboard insights §1).
- **Human-in-the-loop policy**: clinical and financial AI outputs require explicit confirmation; communication AI can auto-send only for approved template classes; all auto-actions reversible and logged.
- Evaluation: golden-set regression tests for prompts run in CI; feedback buttons (👍/👎 + reason) on every AI surface feeding an eval queue.

---

## 25. Real-Time Practice Operations

### Live Patient Flow Board
- Columns: Scheduled → Arrived → Ready (checked in, forms done) → Seated → In Treatment → Checkout → Done; cards show patient, provider, operatory, timer in current state; drag or status-button transitions; wall-display mode (auto-refresh, large type, no PHI-sensitive details beyond first name + last initial configurable).
- State transitions emit WebSocket events consumed by dashboard (§1), calendar, and dentist app.

### Real-Time Infrastructure
- WebSocket gateway (socket rooms per tenant+location); events: appointment.*, patient.checked_in, payment.posted, claim.status_changed, message.received, lab_case.updated, task.assigned.
- **Presence**: record-level presence ("Dana is viewing this chart"), soft edit locks on clinical notes (takeover with warning).
- Offline/reconnect: event replay via cursor on reconnect; PWA queues writes made offline (schedule notes, charting) with conflict resolution (server wins + diff surfaced).

### Alerts Engine
- Rule builder: trigger (event or metric threshold) + conditions + channel (in-app/push/SMS/email) + recipients (role/user); ships with presets (claim denied > $300; daily production < goal at 2 pm; new 1-star review; VIP arrival).

### Morning Huddle Mode
- Auto-generated screen per location per day: today's schedule with per-patient flags (balance due, unscheduled treatment $, medical alerts, first visit, lab case status), yesterday recap, goal for today, open slots to fill; printable/one-tap present mode for team standup.

### AI Cancellation Backfill
- On cancellation of a slot ≤ 7 days out: engine scores waitlist (§3) + overdue recalls + unscheduled accepted treatment for fit (type, duration, provider) → sends offers in priority order (SMS with claim link, 15-min exclusive hold each, configurable batch size) until filled; staff see live backfill progress; full audit of offers sent.

---

## 26. Membership / In-House Dental Plans

- **Plan builder**: name, price (monthly/annual), included services (mapped to CDT codes + frequency, e.g., 2× D1110, 1× D0274, 2× D0120), global discount % on other treatment (by category overrides), family add-on pricing, terms text.
- **Enrollment**: in-office or portal self-serve; card on file required; e-signed agreement; pro-rating rules.
- **Benefit tracking**: usage ledger per member (included services consumed vs. remaining, reset on renewal); at checkout, membership acts like an internal "payer" in the estimation engine (§7) — included service → $0, others → discount applied automatically.
- **Billing**: recurring charges via §8; failed payment dunning (retry + notify + suspend benefits after N days); renewal reminders (annual plans); cancellation flow with configurable refund policy.
- Reporting: MRR, active members, churn, utilization, production from members vs. non-members.

---

## 27. Lab Case Management

- **Entities**: `Lab` (vendor contact, portal, shipping prefs), `LabCase` (patient, procedure link, lab, type (crown/bridge/denture/aligner/nightguard), shade, impressions type (digital scan/physical), sent_date, due_date, status: draft → sent → in_progress → shipped → received → seated | remake, tracking #, cost, notes, attachments (scans, photos)).
- **Digital lab prescription**: templated Rx per case type, PDF + email to lab (portal API integrations later).
- **Alerts**: due date approaching + not received; **"patient scheduled but case not received"** — daily job cross-references upcoming seat appointments with case status → red flag on calendar + task; case received → notify provider + suggest confirming seat appointment.
- Remake tracking (reason codes, cost responsibility) → lab quality scorecard (turnaround, remake rate) in reports; lab cost feeds procedure profitability (§18).

---

## 28. Referral Management

- **Outbound**: create referral from patient chart → select specialist (directory of `ReferralContact`s), reason, attach images/notes (AI-drafted referral letter §15), send via secure link (expiring, audit-logged) or fax integration; status tracking (sent → scheduled → report received → completed) with follow-up reminders ("no report after 30 d").
- **Inbound**: intake screen for received referrals → creates lead/patient with referring-doctor attribution; thank-you letter automation to referrer; referring-doctor portal-lite (status of their referred patients — feature-flagged).
- **Analytics**: referrals in/out by doctor, conversion rate, production from referred patients; top-referrer recognition list.

---

## 29. Fee Schedule Management

- **FeeSchedule** (name, type: UCR | payer-contracted | membership | custom, effective_date, expiry) + `FeeScheduleItem` (CDT code, fee).
- Assignment precedence at charge time: patient insurance plan schedule → membership schedule → location override → tenant UCR; the applied schedule is stamped on each procedure for audit.
- Write-off automation: contracted fee < UCR → contractual adjustment auto-posted at claim payment (§7 ERA posting).
- Tools: bulk import (CSV), bulk update (+X % by category), version comparison diff, effective-dating (schedule new fees for Jan 1), payer contract analysis (actual paid vs. contracted — flags for renegotiation §16).

---

## 30. Sterilization & Instrument Tracking

- **Entities**: `Sterilizer` (device, location), `SterilizationCycle` (sterilizer, date/time, cycle type, temp/pressure params, result pass/fail, operator, load photo optional), `InstrumentCassette` (barcode/QR label, contents), `CycleItem` (cycle × cassette), `SporeTest` (sterilizer, date, result, lab ref).
- Workflow: print/assign QR labels to cassettes → scan cassettes into a cycle → record cycle result → cassettes become "sterile" inventory → **scan cassette at chairside to link to patient visit** (compliance chain: patient ↔ cassette ↔ cycle).
- Failed cycle: all linked cassettes flagged unusable; if already used on patients → exposure report of affected visits.
- Spore test scheduler (weekly reminders, per device) + overdue alerts; compliance report export for inspections.

---

## 31. Teledentistry

- Video visits: browser-based WebRTC (no install) via embedded video SDK; appointment type flag `virtual` → booking generates video link (patient) + provider join from calendar; **virtual waiting room** (patient waits, provider admits); in-visit: chat, photo share (patient camera → saved to chart), screen share (show X-rays).
- Use cases wired in: emergency triage escalation from AI receptionist (§4), post-op checks (auto-offer after surgical procedures), aligner checks.
- Documentation: visit auto-creates clinical note draft (with AI summary if recorded w/ consent); billable with teledentistry CDT codes (D9995/D9996) through normal billing/claims.
- Consent: teledentistry-specific consent form required before first virtual visit (state-configurable).

---

## 32. Patient Check-In & Smart Intake

- **Channels**: pre-visit link (SMS 24 h before: forms + insurance update + payment of copay), QR poster at front desk (scan → check-in on own phone), kiosk mode (tenant tablet, locked-down PWA), front-desk manual.
- Check-in flow: identify (name + DOB) → confirm/update demographics + insurance (photo of new card → **OCR extraction**: payer, member ID, group # → staff verification queue) → outstanding forms (assigned by appointment type: new patient packet, medical history annual re-confirm, procedure consents) → copay/balance payment prompt (optional) → done → patient appears as "Arrived/Ready" on flow board (§25) with forms-complete badge.
- **OCR**: insurance card + driver's license capture → auto-fill patient fields with per-field confidence; low-confidence fields highlighted for staff confirmation; images saved to documents.
- Form builder: tenant-configurable intake/consent forms (sections, field types, conditional logic, e-sign blocks, versioning); responses stored structured + rendered PDF snapshot.

---

## 33. Loyalty & Rewards

- **Earning rules** (configurable): points for completed appointments, on-time arrival, Google review submitted, referral converted, portal profile completed, membership enrollment.
- **Redemption**: catalog per tenant — account credit, whitening discount, product freebies; redemption creates ledger adjustment (§8) with reason code.
- **Tiers**: point thresholds → status (e.g., Silver/Gold) with perk multipliers; anniversary bonuses.
- Patient-facing: points balance + history in portal/app, earn notifications; staff-facing: adjust points (permission-gated, audited).
- Anti-abuse: caps per period, referral validation (referred patient must complete first visit).

---

## Cross-Cutting: Workflow Automation Builder

- **Trigger** (event from the WebSocket/event bus, schedule/cron, or metric threshold) → **Conditions** (field comparisons, patient tags, time windows) → **Actions** (send templated SMS/email, create task, add tag, notify user/role, enroll in sequence, call webhook, create appointment hold).
- Visual builder (if/then blocks, no code), test mode (dry-run against sample event), run history with per-step logs, loop protection (an automation's actions can trigger other automations max depth 3), per-automation kill switch.
- Ships with a template gallery (unaccepted treatment follow-up, no-show rebooking, birthday message, review request, NP welcome sequence).

---

## Non-Functional Requirements

- **Performance**: P95 API < 300 ms (reads), < 800 ms (writes); calendar day-view render < 1 s with 200 appointments; search-as-you-type < 300 ms.
- **Availability**: 99.9 % target; zero-downtime deploys; status page.
- **Scale**: design for 10k tenants, 5M patients, 50M appointments; hot paths load-tested.
- **Accessibility**: WCAG 2.1 AA; full keyboard navigation of calendar and charting; screen-reader labels on odontogram.
- **Browser support**: last 2 versions of Chrome/Safari/Edge/Firefox; iPad Safari first-class (chairside use).
- **i18n**: UI English at launch, string-externalized; patient-facing content multi-language day one (ES priority).
- **Observability**: structured logs, tracing, error tracking, per-tenant usage metrics; PHI never in logs.
- **Testing**: unit + integration on business rules (estimation engine, ledger, scheduling conflicts are the critical suites), E2E happy paths (Playwright), load tests on booking + calendar.

---

## Suggested Build Phases

| Phase | Scope | Outcome |
|---|---|---|
| **P1 — Core PMS (MVP)** | Foundations (§0), Patients (§2), Calendar + staff scheduling (§3 staff-side), basic Billing/ledger + card payments (§8), Dashboard v1 (§1), Communication: reminders + 2-way SMS (§10), Compliance baseline (§21) | A practice can run its day |
| **P2 — Clinical** | EDR: odontogram, notes, perio (§5), Imaging (§6), Treatment planning (§9), Fee schedules (§29), e-Rx integration | Replace legacy clinical software |
| **P3 — Revenue cycle** | Insurance: eligibility, claims, ERA (§7), statements + payment plans (§8 full), Reports v1 (§18) | Full billing lifecycle |
| **P4 — Growth & automation** | Online booking (§3 patient-side), Patient portal (§19), Recall (§11), Reputation (§12), Check-in/intake (§32), Workflow automations | Front-office automation |
| **P5 — AI layer** | AI platform gateway (§24), AI receptionist (§4), Clinical assistant (§15), Business assistant (§16), cancellation backfill + huddle (§25) | Differentiating AI features |
| **P6 — Scale-out** | Multi-location polish (§20), Marketing CRM (§17), Inventory (§13), Staff mgmt (§14), Lab cases (§27), Referrals (§28), Membership (§26), Teledentistry (§31), Sterilization (§30), Loyalty (§33), Mobile apps (§23), Public API/Zapier | Full platform |

Each phase ships behind feature flags; every module built API-first so mobile apps and integrations consume the same endpoints.
