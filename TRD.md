# Technical Requirements Document (TRD)

**Project:** LogiMove Logistics — Corporate Website
**Version:** 1.0
**Status:** Draft for review
**Date:** 2026-08-04

---

## 1. Technology Stack

| Layer | Choice | Version | Rationale |
|-------|--------|---------|-----------|
| Framework | Next.js (App Router) | 16.x | RSC + static export, SEO, file-based routing |
| UI Library | React | 19.x | Framework-native; concurrent rendering |
| Language | TypeScript | 5.x | Strict typing across the codebase |
| Styling | Tailwind CSS | 4.x | Utility-first, design-system tokens, fast iteration |
| Animation | Framer Motion | latest | Declarative, 60 FPS, reduced-motion aware |
| Animation (advanced) | GSAP | only where necessary | Scroll-triggered timeline effects (loader/truck) |
| Icons | Lucide React | latest | Lightweight, tree-shakeable, accessible |
| Linting | ESLint + `eslint-config-next` | 16.x | Framework-aligned lint rules |
| Fonts | `next/font/google` | — | Self-hosted, zero-CLS web fonts |
| Package manager | npm | latest | Default, lockfile committed |

> **⚠️ Framework warning (IMPORTANT):** This repo uses a **newer Next.js major version whose
> APIs, conventions, and file structure may differ from training data / older guides.** Before
> writing any Next.js code, consult the bundled official guides in
> `node_modules/next/dist/docs/` and heed any deprecation notices. Never assume legacy patterns
> (e.g., old `next.config` fields, `pages/` routing, removed props) still apply.

---

## 2. Folder Structure

```
logistics-website/
├── public/                     # Static assets (icons, logos, og image)
├── src/
│   ├── app/                    # App Router (file-based routes)
│   │   ├── (site)/             # Route group: shared marketing layout
│   │   │   ├── layout.tsx      # Header/Footer/WhatsApp button shell
│   │   │   ├── page.tsx        # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   └── not-found.tsx   # 404
│   │   ├── layout.tsx          # Root layout (fonts, metadata, loader)
│   │   ├── globals.css         # Tailwind + CSS variables
│   │   ├── sitemap.ts          # Generated sitemap
│   │   └── robots.ts           # Generated robots.txt
│   ├── components/
│   │   ├── ui/                 # Primitives: Button, Card, Badge, Input, Accordion…
│   │   ├── layout/             # Header, Footer, Container, WhatsAppButton
│   │   ├── sections/           # Page sections: Hero, Services, Stats, Process…
│   │   └── loading/            # TruckLoading animation
│   ├── config/
│   │   └── site.ts             # 🔑 WhatsApp number, nav, site URL (single source of truth)
│   ├── content/                # Typed data files
│   │   ├── services.ts
│   │   ├── faqs.ts
│   │   ├── testimonials.ts
│   │   ├── partners.ts
│   │   └── stats.ts
│   ├── hooks/                  # useCountUp, useReducedMotion, useTruckLoader…
│   ├── lib/                    # whatsapp.ts (URL builder), utils.ts (cn)
│   └── providers/              # MotionProvider (client boundaries)
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── package.json
└── .env.example                # Non-secret environment template (no secrets committed)
```

**Ownership rules:** `components/ui` holds stateless primitives only. `components/sections`
compose primitives + data. `content` files are the only place raw marketing copy lives.
`config/site.ts` is the only place operational values (WhatsApp number, URL) live.

---

## 3. Architecture

### 3.1 Rendering model
- **Static Site Generation (SSG)** for all marketing pages — every route is pre-rendered at
  build time; the deployable output is static HTML + assets.
- **Client components** are used only where interactivity requires them (loader, animations,
  form, accordion). Everything else stays a server component to minimize JS shipped.
- **No runtime API dependency** in v1: the site must render fully without any network calls.

### 3.2 Data flow
- Marketing content flows **content files → server components → primitives**. No fetch, no DB.
- The contact form is a **client component** that validates and then builds a WhatsApp URL
  using `lib/whatsapp.ts` + `config/site.ts`. It never posts to a server.

### 3.3 Future growth (designed now)
- When a CMS/API is introduced, content components will accept props from an API layer while
  keeping the same component interfaces — swapping data sources must not change the UI layer.
- An API route layer can be added under `src/app/api/**` (see `API.md`) without restructuring.

---

## 4. Deployment Strategy

- **Target:** Static export to a CDN/Vercel. Recommended host: **Vercel** (native Next.js
  support, edge caching, preview deployments) — also compatible with any static host
  (Netlify, Cloudflare Pages, S3 + CloudFront).
- **Build:** `next build` → static output → CDN.
- **Environment config:** All operational values in `src/config/site.ts`; any non-public values
  via environment variables referenced in `.env.example` (none required for v1 static export).
- **CI/CD:** Branch protection on `main`; lint + typecheck + build must pass before merge;
  preview deploys per PR.
- **Caching:** Static assets long-cacheable; HTML immutable per deploy.

---

## 5. Security

- **No secrets in source.** WhatsApp number and site URL live in `config/site.ts`; anything
  sensitive uses environment variables only. `.env*` is git-ignored (see `.gitignore`).
- **Input validation at boundaries:** the contact form validates all fields client-side
  (schema via a small validator; see `API.md` for the future server contract).
- **Output safety:** all content is rendered as text/typed data; no `dangerouslySetInnerHTML`
  unless absolutely required and sanitized (avoid entirely in v1).
- **Security headers:** served via host configuration (CSP, X-Content-Type-Options,
  referrer policy, frame-ancestors) — enable at the CDN/host layer.
- **WhatsApp URL construction:** `wa.me` link built from validated digits only (strip
  `+`, spaces, parentheses) — prevents link-injection via the number field.
- **Dependency hygiene:** `npm audit` in CI; lockfile pinned.

---

## 6. Performance

| Metric | Budget |
|--------|--------|
| LCP | < 2.5 s |
| INP | < 200 ms |
| CLS | < 0.1 |
| Total JS (initial) | < 150 KB gzip |
| Lighthouse performance | ≥ 95 |

**Practices:**
- SSG + static export (no server work at request time).
- `next/image` for all imagery with `priority` only on the hero LCP image; lazy-load below fold.
- Fonts via `next/font/google` with `display: swap` (no CLS).
- Code-split by route automatically; minimal client JS.
- Animations are transform/opacity-only (compositor-friendly, no layout thrash).
- The truck loader is a one-shot Framer Motion/GSAP timeline (~2–3 s max) and self-removes.
- Respect `prefers-reduced-motion`.

---

## 7. Accessibility

- **Standard:** WCAG 2.2 **AA**.
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`, `h1` hierarchy).
- Keyboard-navigable: all interactive elements reachable + visible focus rings.
- Accessible names for icons; decorative icons `aria-hidden`; Lucide icons `aria-hidden` with
  text labels where needed.
- Color contrast ≥ 4.5:1 text / ≥ 3:1 large text and UI components (orange/white/black palette
  is designed to comply — see `DESIGN.md`).
- Focus trap + `role="dialog"` + `aria-modal` for any modal (loader is decorative; hidden
  from assistive tech via `aria-hidden` while present).
- `prefers-reduced-motion` honored for all animation.
- Form inputs have visible `<label>`s, `required`, `aria-describedby` for errors.

---

## 8. Responsive Design

- **Mobile-first.** Base styles target ≤ 480 px; enhance upward.
- Breakpoints: `sm 480` · `md 768` · `lg 1024` · `xl 1280`.
- Fluid type/space via `clamp()` and Tailwind container with `max-w-[1280px]`.
- Navigation collapses to a mobile menu (accessible disclosure / dialog).
- Floating WhatsApp button shown on all viewports; larger hit area on touch.
- Test at 320 px minimum width (small phones), 1280+ desktop, and tablet between.

---

## 9. Coding Standards

- TypeScript **strict** mode; no `any` without justification.
- **Immutability:** never mutate props/state in place; use immutable updates.
- Functions < 50 lines; files < 800 lines; nesting < 4 levels; early returns.
- Naming: `camelCase` values/functions, `PascalCase` components/types, `UPPER_SNAKE_CASE`
  constants, `use` prefix hooks, `is/has/should` boolean prefixes.
- Components are typed with explicit prop interfaces; `cn()` for conditional class merging.
- No `console.log`/debug statements in committed code.
- No hardcoded magic numbers/strings in components — use tokens and `config`/`content`.
- Server components by default; add `"use client"` only for interactive leaf components.

---

## 10. Error Handling

- **UI boundaries:** every async/user action has explicit success and error states.
- **Form:** per-field validation messages, inline, `aria-live="polite"` for announcement;
  WhatsApp-link failure fallback (copy message / `mailto:`).
- **Loader:** timeout guard so the page always reveals even if an animation event misfires.
- **Images:** `onError`/`alt` fallbacks; broken partner logos render a text fallback.
- **Never silently swallow errors:** log context to the console in development; render a
  graceful fallback in production.

---

## 11. Logging

- v1 static site: no server logs required. Client-side errors surface via Next.js
  error overlay in dev.
- When an API/admin phase lands, adopt structured JSON logs (request id, route, status,
  latency) and a hosted error tracker (Sentry) with source maps.
- Never log user-entered message bodies or PII in full (partial/quoted only if needed).

---

## 12. Scalability

- **Content scale:** hundreds of services/FAQs/tests render fine statically; thousands suggest
  pagination or generated routes.
- **Team scale:** strict folder ownership (see §2) + typed data contracts keep parallel work
  collision-free.
- **Product scale:** the content/API boundaries mean moving to a headless CMS or a database
  (see `ERD.md`) is additive, not a rewrite.
- **Traffic scale:** static CDN output scales horizontally with zero origin dependency.

---

## 13. Maintainability

- Small, cohesive modules; high cohesion, low coupling.
- Single source of truth for operational config (`config/site.ts`) and marketing copy
  (`content/`).
- Cross-document consistency is enforced by docs review: `PRD.md`, `TRD.md`, `ERD.md`,
  `DESIGN.md`, `API.md`, `AGENTS.md` must be read together before changes.
- Automated gates: `npm run lint`, `tsc --noEmit`, `next build` in CI; `AGENTS.md` defines the
  Definition of Done (DoD) for any contributor or AI assistant.

---

*End of TRD.*
