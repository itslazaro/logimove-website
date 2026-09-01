# Product Requirements Document (PRD)

**Project:** LogiMove Logistics — Corporate Website
**Version:** 1.0
**Status:** Draft for review
**Date:** 2026-08-04

> **Working title note:** "LogiMove" is a proposed placeholder brand name used throughout this
> documentation for consistency. It can be replaced with the real company name without affecting
> the architecture. All hardcoded references are centralized in `src/config/site.ts`.

---

## 1. Project Overview

LogiMove Logistics is an international freight-forwarding and logistics company providing
ocean freight, air freight, road transport, warehousing, and customs clearance services to
businesses shipping goods across borders.

This project delivers a **marketing and lead-generation website** that:

1. Presents the company as a trustworthy, modern, international logistics provider.
2. Converts visitors into **qualified leads** via WhatsApp, the company's primary customer
   contact channel.
3. Supports a **quote request flow** that funnels directly into WhatsApp conversations.
4. Establishes a design system and technical foundation that can grow into a customer portal,
   shipment tracking, and an admin CMS in later phases.

The site is a **static, content-driven marketing site** (Next.js + React). It does **not** ship
with a database in v1 — content is stored in typed data files and the contact flow redirects to
WhatsApp. The data model (see `ERD.md`) and API design (see `API.md`) are prepared for future
growth.

---

## 2. Business Goals

| # | Goal | Rationale |
|---|------|-----------|
| G1 | Generate qualified logistics inquiries via WhatsApp | WhatsApp is the primary, lowest-friction contact channel for the target audience. |
| G2 | Establish a professional, trustworthy brand image | Logistics buyers choose vendors on credibility, experience, and reliability. |
| G3 | Communicate the full service portfolio clearly | Increase requests for air/ocean/road/warehousing services, not just general inquiries. |
| G4 | Reduce friction in requesting a quote | A pre-filled WhatsApp message removes form-submission anxiety and delays. |
| G5 | Build an SEO foundation for organic lead acquisition | International logistics is a high-intent search category. |
| G6 | Lay a technical foundation for future product features | Tracking, quoting, and admin CMS will be added incrementally without rework. |

---

## 3. Objectives

1. Launch a responsive, SEO-optimized marketing site within the current sprint.
2. Achieve a **Lighthouse performance score ≥ 95** on mobile and desktop.
3. Achieve **WCAG 2.2 AA** accessibility compliance.
4. Ensure every contact path produces a valid WhatsApp click-to-chat deep link with a
   pre-filled, context-rich message.
5. Keep the codebase modular and fully documented so future phases (CMS, tracking, portal)
   build on it without restructuring.

---

## 4. Target Audience

| Segment | Description | Location | Primary Device |
|---------|-------------|----------|----------------|
| Small & mid-size importers/exporters | Businesses shipping goods internationally, needing freight quotes | Global (English-speaking) | Mobile |
| E-commerce sellers | Cross-border sellers needing freight consolidation & last-mile | Global | Mobile |
| Manufacturers & wholesalers | Recurring B2B shippers needing ocean/air contracts | Global | Desktop |
| Freight brokers / 3PLs | Third parties evaluating carrier partnerships | Global | Desktop |

---

## 5. User Personas

### Persona A — "The Operations Manager" (primary)
- **Name:** Daniel, 38
- **Role:** Import Operations Manager at a mid-size retail company.
- **Needs:** Fast, reliable freight quotes; clear service options; a contact method he can use
  from his phone while at the warehouse.
- **Pain points:** Slow web forms, unanswered emails, unclear pricing transparency.
- **Goal on the site:** Understand services, assess credibility (stats, partners, testimonials),
  and request a quote via WhatsApp in under 2 minutes.

### Persona B — "The E-commerce Founder"
- **Name:** Maya, 30
- **Role:** Founder of a D2C brand shipping internationally.
- **Needs:** Simple onboarding, clear lane explanations (air vs. ocean), reassurance about
  customs handling.
- **Pain points:** Feels overwhelmed by logistics jargon.
- **Goal on the site:** Learn the "why choose us" story and start a WhatsApp conversation with
  a pre-written question about shipping rates.

### Persona C — "The Procurement Lead"
- **Name:** Robert, 45
- **Role:** Procurement Lead evaluating logistics vendors for a manufacturing company.
- **Needs:** Deep credibility signals: years in business, shipment volumes, partners, case
  studies, and easy access to a human.
- **Pain points:** Needs to shortlist vendors quickly with verifiable data.
- **Goal on the site:** Scan statistics and partners, then contact via WhatsApp for a detailed
  proposal.

---

## 6. Functional Requirements

### FR-1 Pages
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | Home page with hero, services, why-choose-us, statistics, process, testimonials, partners, CTA, footer | P0 |
| FR-1.2 | About page (company story, mission, team/leadership, stats) | P1 |
| FR-1.3 | Services page (detailed service cards with descriptions) | P0 |
| FR-1.4 | Contact page with the WhatsApp contact form | P0 |
| FR-1.5 | FAQ page (accordion grouped by category) | P1 |
| FR-1.6 | Custom 404 page with navigation recovery | P1 |

### FR-2 Contact & Quote Flow
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Contact form collects Name, Company, Email, Phone Number, Message | P0 |
| FR-2.2 | On submit, the app generates a pre-filled WhatsApp message using the official Click-to-Chat URL format (`https://wa.me/<phone>?text=<encoded>`), with no database submission | P0 |
| FR-2.3 | Destination WhatsApp number is read from a **configuration file** (`src/config/site.ts`), never from component logic | P0 |
| FR-2.4 | Form validates inputs client-side before opening WhatsApp | P0 |
| FR-2.5 | A fallback manual-copy path is available if WhatsApp is unavailable (e.g., `mailto:` or copy-to-clipboard) | P2 |

### FR-3 Loading Experience
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | A branded loading animation: a delivery truck drives left → right, the logo fades in, a dust/motion trail follows, then the site fades in | P0 |
| FR-3.2 | Animation lasts ~2–3 s, runs at 60 FPS, is lightweight, and auto-skips once the page is ready | P0 |
| FR-3.3 | Respects `prefers-reduced-motion` (skip or shrink animation) | P1 |

### FR-4 Content
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | All content (services, FAQs, testimonials, partners, statistics) lives in typed data files under `src/content/` | P0 |
| FR-4.2 | Each page exposes SEO metadata (title, description, Open Graph) | P0 |

### FR-5 Infrastructure
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-5.1 | `robots.ts` and `sitemap.ts` generated | P1 |
| FR-5.2 | Floating WhatsApp button on mobile and a persistent contact path in the header | P0 |

---

## 7. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1 | Performance (Lighthouse) | LCP < 2.5 s, overall score ≥ 95 |
| NFR-2 | Accessibility | WCAG 2.2 AA |
| NFR-3 | Responsive design | Mobile-first; breakpoints at 480 / 768 / 1024 / 1280 |
| NFR-4 | SEO | Semantic HTML, meta tags, sitemap, structured data where relevant |
| NFR-5 | Security | No secrets in code; validated user input; CSP via headers |
| NFR-6 | Maintainability | Modular components, typed content, <800 lines/file, <50 lines/function |
| NFR-7 | Compatibility | Latest two versions of Chrome, Firefox, Safari, Edge |
| NFR-8 | Reliability | 100% static output; no runtime API dependency in v1 |

---

## 8. User Journeys

### Journey 1 — Quote via WhatsApp (primary)
1. Visitor lands on Home and scrolls the hero → services → trust signals.
2. Clicks **"Get a Quote"** (header, hero, or services card).
3. Lands on the Contact page with the service context preserved in a query param or message.
4. Fills Name, Company, Email, Phone, Message.
5. Clicks **Contact Us**.
6. Browser opens WhatsApp with a pre-filled, structured message.
7. Sales rep replies; conversation continues in WhatsApp.

### Journey 2 — Evaluate and Validate
1. Visitor lands on Home.
2. Reads Why Choose Us, Statistics, Process.
3. Opens Services to understand offerings.
4. Reads Testimonials and scans Partners.
5. Uses the floating WhatsApp button to ask a follow-up question.

### Journey 3 — FAQ self-service
1. Visitor arrives via search with a specific question (e.g., "transit time air freight").
2. Opens FAQ, finds the answer, and either self-resolves or taps WhatsApp for clarification.

---

## 9. Success Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| WhatsApp contact rate | Clicks on Contact Us / WhatsApp links per session | ≥ 3% |
| Bounce rate | Single-page sessions | < 45% |
| Quote request completion | Form → WhatsApp deep link open rate | ≥ 80% |
| Organic traffic | Sessions from search engines | +20% MoM after SEO pass |
| Performance | Lighthouse mobile performance | ≥ 95 |
| Accessibility | Lighthouse / axe violations | 0 critical |
| Time on site | Average session duration | > 90 s |

---

## 10. Features (MVP vs. Later)

### In scope (v1)
- Home, About, Services, Contact, FAQ, 404
- WhatsApp contact & quote flow (config-driven number)
- Branded truck loading animation
- Animated statistics counters, scroll animations, page transitions
- SEO metadata, sitemap, robots
- Floating WhatsApp button

### Out of scope (v1)
- Database / CMS / admin panel
- Server-side contact storage or email delivery
- Shipment tracking / customer portal
- Multi-language / i18n
- Blog / news
- Payments or bookings

---

## 11. Scope Statement

**In:** A fully responsive, SEO-ready marketing site with the pages and sections above, the
WhatsApp-driven contact flow, the branded loader, and the full design system documented in
`DESIGN.md`.

**Out:** Any server-persisted data, authentication, admin tooling, tracking features, or
multi-language support in this release. These are designed for (see `ERD.md` / `API.md`) but
not implemented.

---

## 12. Future Improvements

1. **Shipment tracking portal** — customers enter a tracking number to see live status.
2. **Admin CMS** — manage services, testimonials, partners, FAQs without code changes.
3. **Quote engine** — a multi-step wizard that computes estimated costs before contact.
4. **CRM integration** — push quote requests to a CRM (HubSpot / Salesforce / Pipedrive).
5. **Email notification pipeline** — notify sales when a WhatsApp message is triggered.
6. **i18n** — English + Spanish (and additional lanes) with `next-intl` or equivalent.
7. **Blog / insights** — SEO content targeting logistics keywords.
8. **Live chat + WhatsApp Business API** — structured message templates, delivery receipts.
9. **User portal** — document upload, booking management, invoice access.
10. **Multi-brand theming** — reuse the design system across sister companies.

---

*End of PRD. This document is a living artifact and will be versioned as the product evolves.*
