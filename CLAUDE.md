# CLAUDE.md — AI DentalOS

## Project Overview

AI DentalOS is a modern, cloud-based Dental Practice Management System (PMS) for independent dental practices in the United States.

The platform replaces multiple disconnected tools by combining Practice Management, Electronic Dental Records (EDR), Scheduling, Billing, Insurance Automation, CRM, Marketing, an AI Receptionist, an AI Clinical Assistant, and Business Intelligence into one integrated system.

The UI must be modern, responsive, clean, fast, and comparable to premium SaaS products. Support desktop, tablet, and mobile devices.

---

## Core Modules & Feature Requirements

### 1. Dashboard

Real-time executive dashboard displaying:

- Today's appointments
- Patients currently checked in
- Chair utilization
- Daily production
- Daily collections
- Pending insurance claims
- Outstanding patient balances
- No-show rate
- Cancellation rate
- Treatment acceptance rate
- New patients this month
- Recall patients due
- Staff currently working
- Revenue trends
- Practice health score
- AI-generated recommendations
- Upcoming tasks
- Recent activity feed

### 2. Patient Management

Complete patient CRM. Patient profiles include:

- Personal information
- Multiple phone numbers
- Email
- Address
- Emergency contact
- Preferred communication method
- Preferred language
- Insurance information
- Medical history
- Dental history
- Allergies
- Medications
- Family members
- Referral source
- Uploaded documents
- Consent forms
- Clinical notes
- Treatment history
- Balance history
- Appointment history
- Communication timeline
- Patient tags
- Internal notes

Must support duplicate detection.

### 3. Online Appointment System

Patient-facing capabilities:

- Book online
- Cancel appointments
- Reschedule appointments
- Join waiting list
- Select provider
- Select treatment type
- Select preferred location
- Receive confirmation instantly

Calendar requirements:

- Day / week / month views
- Chair scheduling
- Multi-provider scheduling
- Color-coded appointments
- Drag-and-drop rescheduling
- Double-book prevention
- Emergency slot reservation
- Waitlist automation
- Recurring appointments
- Block schedules
- Holiday management

### 4. AI Receptionist

24/7 AI receptionist with:

- Answering incoming phone calls
- Voice conversation
- Chat assistant
- Booking / canceling / rescheduling appointments
- Insurance verification
- FAQ answering
- New patient intake
- Emergency triage
- Call routing
- Missed call recovery
- Multi-language support
- Appointment reminders
- Follow-up calls

### 5. Electronic Dental Records (EDR)

Complete clinical module:

- Tooth chart / odontogram
- Periodontal chart
- Restorations
- Existing conditions
- Treatment plans
- Clinical notes
- Voice dictation
- Templates
- AI note generation
- Progress notes / SOAP notes
- Attach X-rays and intraoral images
- Clinical timeline
- Medical alerts
- Electronic prescriptions

### 6. Digital Imaging

- Digital X-rays
- Panoramic X-rays
- CBCT
- Intraoral cameras
- Image annotation
- Image comparison
- AI image analysis
- Image storage and sharing
- DICOM support

### 7. Insurance Management

Complete insurance automation:

- Insurance verification
- Eligibility checking
- Benefits lookup
- Coverage estimation
- Treatment estimates
- Electronic claims
- Claim tracking
- Claim rejection management
- Appeals
- Pre-authorizations
- Coordination of benefits
- Insurance aging reports
- Bulk claim submission
- ERA support
- EOB reconciliation

### 8. Billing & Payments

- Invoices and statements
- Payment plans and partial payments
- Credit cards, ACH, Apple Pay, Google Pay
- Online payments and payment links
- Refunds and discounts
- Financing integration
- Outstanding balance reminders
- Automatic receipts

### 9. Treatment Planning

Interactive treatment planning:

- Visual treatment plans
- Cost estimates and insurance estimates
- Patient responsibility calculation
- Before/after images
- Digital consent and electronic signatures
- Treatment acceptance tracking
- Financing options
- Phase planning
- Multiple treatment scenarios

### 10. Patient Communication

Communication center supporting:

- SMS, email, voice, WhatsApp (optional)
- Appointment reminders
- Recall reminders
- Birthday messages
- Payment reminders
- Marketing campaigns
- Review requests
- Satisfaction surveys

### 11. Recall Management

Automated patient recalls:

- 6-month hygiene recalls
- Custom recall intervals
- AI priority scoring
- Missed recall alerts
- Automated outreach
- SMS and email campaigns
- Recall dashboard

### 12. Reputation Management

- Automatic review requests
- Negative feedback routing
- Internal surveys
- Google review links
- Review analytics
- Practice reputation score

### 13. Inventory Management

- Products and vendors
- Purchase orders
- Stock levels
- Expiration dates
- Batch tracking
- Barcode scanning
- Low stock alerts
- Inventory valuation
- Usage tracking

### 14. Staff Management

- Employee profiles
- Roles and permissions
- Shift scheduling
- Clock in/out
- Payroll export
- PTO management
- CE tracking
- Productivity tracking

### 15. AI Clinical Assistant

- Voice-to-notes
- Auto SOAP notes
- Auto coding suggestions
- Treatment suggestions
- Clinical summaries
- Documentation assistance
- Risk detection
- Drug interaction alerts
- Medical alerts

### 16. AI Business Assistant

- Revenue forecasting
- Profitability analysis
- Staffing recommendations
- Marketing suggestions
- Patient retention analysis
- Cancellation prediction
- No-show prediction
- Insurance reimbursement analysis
- Daily executive briefing

### 17. Marketing CRM

- Lead capture
- Website integration
- Landing pages
- Facebook Lead Ads integration
- Google Ads tracking
- Referral tracking
- Campaign management
- Lead nurturing
- Reactivation campaigns

### 18. Analytics & Reports

Interactive dashboards with reports for:

- Revenue, production, collections
- Provider and hygiene productivity
- Procedure profitability
- Insurance aging
- Accounts receivable
- New patient trends
- Referral performance
- Recall effectiveness
- No-show analysis
- Chair utilization
- Marketing ROI

Reports must export to PDF, Excel, and CSV.

### 19. Patient Portal

Patients can:

- Book appointments
- View treatment plans
- Complete forms
- Upload documents
- View X-rays
- Pay bills
- View insurance estimates
- Download invoices
- Message the clinic
- Receive educational content

### 20. Multi-Location Management

- Unlimited locations
- Centralized scheduling
- Shared patient records
- Location-specific reporting
- Provider transfers
- Inventory per location
- Revenue by location

### 21. Compliance & Security

- HIPAA compliance
- Role-based permissions
- Audit logs
- Encryption at rest and in transit
- Multi-factor authentication
- Automatic backups
- Disaster recovery
- Session timeout
- Device management

### 22. Integrations

- Payment gateways
- Insurance clearinghouses
- Digital imaging devices
- Accounting software
- Email and SMS providers
- Calendar platforms
- E-signature providers
- AI speech-to-text services
- Cloud storage providers

### 23. Mobile Applications

Native iOS and Android apps.

**Dentist App:** schedule, clinical notes, images, patient search, dashboard, notifications.

**Patient App:** appointment booking, bills, payments, messages, treatment plans, X-rays, insurance information.

### 24. AI Platform

A unified AI engine powers every module:

- Voice receptionist
- Clinical documentation
- Business intelligence
- Predictive analytics
- Insurance assistance
- Smart scheduling
- Automated patient communication
- Revenue optimization
- Natural language search
- AI chatbot for patients and staff
- AI executive assistant
- Workflow automation
- Recommendation engine

### 25. Real-Time Practice Operations

Live, self-updating experience across the whole app:

- Live operatory / patient flow board (arrived → waiting → seated → in treatment → checkout) with wait-time timers
- Real-time updates everywhere via WebSockets — schedule changes, check-ins, and payments appear instantly without refresh
- Presence indicators when multiple staff view/edit the same record
- Smart notification & alerts engine — configurable in-app alerts (claim denied, production below target, VIP patient checked in)
- Customizable drag-and-drop dashboard widgets per role (owner, front desk, hygienist)
- Morning huddle mode — auto-generated daily team briefing: schedule gaps, patients arriving with outstanding balances, unscheduled treatment opportunities among today's patients
- AI cancellation backfill — when a slot opens, automatically text the waitlist in priority order and fill the gap without staff involvement

### 26. Membership / In-House Dental Plans

Subscription plans for uninsured patients:

- Plan builder (monthly/annual fee → included cleanings, exams, discounts)
- Recurring billing with card-on-file
- Benefit usage tracking per member
- Renewal reminders and failed-payment dunning
- Membership revenue reporting

### 27. Lab Case Management

Track cases sent to external labs:

- Case creation tied to patient and procedure
- Lab directory and digital lab prescriptions
- Case status tracking (sent, in progress, shipped, received)
- Due-date alerts, including "case not back but patient scheduled" warnings
- Lab cost tracking and quality/remake history

### 28. Referral Management

- Inbound and outbound specialist referrals
- Referral status tracking and follow-up reminders
- Secure document and imaging exchange
- Referral source ROI reporting

### 29. Fee Schedule Management

- UCR (practice) fee schedules
- Per-payer contracted fee schedules
- Automatic write-off and adjustment calculation
- Fee schedule versioning and effective dates
- Bulk fee updates

### 30. Sterilization & Instrument Tracking

- Autoclave cycle logs
- Instrument batch/cassette tracking
- Batch-to-patient-visit linkage for compliance
- Spore test tracking
- Compliance-ready reports

### 31. Teledentistry

- Video consults for triage, post-op checks, and consult follow-ups
- Integrated with scheduling and billing
- Virtual waiting room
- Consult notes flow into the clinical record

### 32. Patient Check-In & Smart Intake

- Self check-in kiosk and QR / text-link check-in from the patient's phone
- Digital intake forms completed on arrival or before the visit
- OCR capture — photograph insurance card and driver's license to auto-fill the patient record
- Arrival notifications pushed to the live patient flow board

### 33. Loyalty & Rewards

- Points for kept appointments, reviews, and referrals
- Reward redemption (credits, discounts)
- Loyalty tier tracking
- Integration with reputation management and marketing CRM

---

## Design & Architecture Requirements

- Premium SaaS UI/UX
- Responsive design (desktop, tablet, mobile)
- Dark mode
- Accessibility compliant
- Lightning-fast performance
- Component-based architecture
- Beautiful dashboards
- Minimal clicks for common workflows
- Smooth animations
- Modern typography
- Enterprise-grade scalability
- API-first architecture
- Multi-tenant SaaS architecture
- White-label capability
- Subscription billing support
- Feature flags
- Plugin/extension architecture
- Public API with webhooks and Zapier integration
- No-code workflow automation builder (if-this-then-that rules, e.g. "treatment plan unaccepted after 14 days → send follow-up SMS and create a task")
- Offline-tolerant PWA mode — schedule and charting stay usable during internet outages and sync when back online
- Integrated VoIP screen-pop — incoming calls automatically open the patient's record with balance, next appointment, and last visit
- KPI benchmarking against anonymized industry averages

---

## Guidance for Claude Code

- This is a greenfield project: when implementing features, follow the module breakdown above and keep code organized by module/domain.
- All patient data handling must be designed with HIPAA compliance in mind (audit logging, encryption, role-based access).
- Prioritize a component-based, API-first, multi-tenant architecture in all technical decisions.
- UI work should target a premium SaaS look: responsive, accessible, dark-mode-ready, with smooth animations and minimal clicks for common workflows.
