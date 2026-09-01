# AI Development Workflow (AGENTS.md)

**Project:** LogiMove Logistics — Corporate Website
**Version:** 1.0
**Status:** Draft for review
**Date:** 2026-08-04

> This file is the operating manual for **any contributor — human or AI assistant** — working
> in this repository. Read `PRD.md`, `TRD.md`, `ERD.md`, `DESIGN.md`, and `API.md` before
> making changes. If two docs conflict, **file a review** — do not silently pick one.

---

## ⚠️ Framework Warning (read first)

> **This is NOT the Next.js you know.** This repo uses a **newer Next.js major version** whose
> APIs, conventions, and file structure may differ from training data and older guides.
>
> - **Before writing any Next.js code**, read the relevant guide in
>   `node_modules/next/dist/docs/`.
> - Heed deprecation notices. Do not assume legacy patterns (old `next.config` fields,
>   `pages/` routing, removed props) still apply.
> - When unsure about a Next.js API, verify against the bundled docs before implementing.

---

## 1. Coding Standards

Follow `TRD.md` §9 and the design tokens in `DESIGN.md`. Non-negotiable:

- TypeScript **strict**; no `any` without a comment + justification.
- **Immutability** — never mutate props/state; create new values.
- Functions < 50 lines · files < 800 lines · nesting < 4 levels · early returns.
- `camelCase` values/functions · `PascalCase` components/types · `UPPER_SNAKE_CASE` constants ·
  `use` prefix hooks · `is/has/should` boolean prefixes.
- No `console.log` / debug statements in committed code.
- No magic numbers/strings in components — use tokens and `config`/`content`.
- Server components by default; `"use client"` only for interactive leaf components.
- All styling through Tailwind tokens defined in `globals.css` — never ad-hoc hex values.

---

## 2. Folder Ownership

| Path | Owns | Do NOT |
|------|------|--------|
| `src/config/site.ts` | Operational values (WhatsApp number, site URL, nav) | Put content or styles here |
| `src/content/**` | Marketing copy (services, FAQs, testimonials, partners, stats) | Import components or logic |
| `src/components/ui/**` | Stateless primitives (Button, Card, …) | Data, business logic, page sections |
| `src/components/sections/**` | Page sections composing primitives + content | Raw logic or global styles |
| `src/components/layout/**` | Header, Footer, Container, WhatsApp float | Content data |
| `src/components/loading/**` | TruckLoader | Anything else |
| `src/lib/**` | Pure utilities (`whatsapp.ts`, `cn`) | Components, styles |
| `src/hooks/**` | Shared hooks | UI markup |
| `src/app/**` | Routing, layouts, metadata, API (future) | Reusable components |
| `src/providers/**` | Client provider boundaries (Motion) | Business logic |

**Rule:** changes must stay within their ownership boundary. Moving content into a component or
logic into `content` is a review blocker.

---

## 3. Development Phases

1. **Research & reuse** — before writing new code: `gh search` for existing patterns, check
   `node_modules/next/dist/docs/`, verify library APIs (Framer Motion, GSAP, Lucide).
2. **Plan** — for any multi-file feature, produce a short plan (steps, files, risks) and get
   approval before implementation.
3. **Implement** — small, reviewable commits; one logical change per commit.
4. **Test** — add/adjust tests with the change (see §4).
5. **Review** — self-review against the checklists (§6–§8) before requesting a human review.
6. **Merge** — through PR + CI only; never push directly to `main`.

---

## 4. Testing Requirements

- **Baseline:** unit tests for all `lib/` utilities (especially `whatsapp.ts` — URL building,
  phone sanitization, encoding).
- **Components:** render tests for interactive components (ContactForm validation states,
  Accordion a11y, TruckLoader reduced-motion behavior).
- **Target:** ≥ 80% coverage on `src/lib` and interactive components.
- **Tooling:** Vitest + React Testing Library + Testing Library a11y queries.
- Run before any commit: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build`.
- Accessibility checks are part of tests, not optional (see §8).

---

## 5. Commit Conventions

Format (Conventional Commits):

```
<type>(<scope>): <imperative, lowercase summary>

[optional body — why, not what]
```

- Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`, `style`.
- Scopes: `contact`, `loader`, `home`, `services`, `faq`, `header`, `footer`, `seo`, `config`, `docs`, `deps`.
- Examples:
  - `feat(contact): add WhatsApp deep-link generation`
  - `fix(loader): skip animation when prefers-reduced-motion`
  - `docs(prd): add success metrics table`
- One logical change per commit. Do not mix refactors with feature commits.
- No secrets, no generated files (`node_modules`, `.next`, `.env*`) in commits.

---

## 6. Code Review Checklist

- [ ] Meets the requirement; no scope creep
- [ ] TypeScript strict; no `any`
- [ ] Within folder ownership (§2)
- [ ] Functions < 50 lines, files < 800 lines, nesting < 4
- [ ] Immutable updates; no in-place mutation
- [ ] No hardcoded values — uses `config`/`content`/tokens
- [ ] No `console.log` / debug statements
- [ ] Errors handled explicitly; no silent failures
- [ ] Tests updated; coverage ≥ 80% on libs/interactive components
- [ ] Accessibility: semantic, focus, contrast, reduced-motion honored
- [ ] Performance: no layout-thrashing animation, images lazy/optimized
- [ ] Lint + typecheck + test + build pass

---

## 7. Performance Checklist

- [ ] LCP < 2.5 s; Lighthouse mobile ≥ 95
- [ ] Hero image `priority`; everything else lazy via `next/image`
- [ ] Fonts via `next/font` (`display: swap`), no CLS
- [ ] Animations are transform/opacity-only; no layout thrash
- [ ] Truck loader ≤ 3 s and self-removes; skipped when loading finishes early
- [ ] No runtime network dependency; fully static render
- [ ] Minimal client JS; server components by default

---

## 8. Accessibility Checklist

- [ ] WCAG 2.2 AA
- [ ] Semantic landmarks; one `h1`; logical heading order
- [ ] All interactive elements keyboard-operable with visible focus
- [ ] Contrast meets `DESIGN.md` §2.4
- [ ] Touch targets ≥ 44×44 on mobile
- [ ] Icons `aria-hidden` or labeled; images have `alt`
- [ ] Forms: labels, `required`, `aria-describedby`/`role="alert"` errors
- [ ] Accordions/menus: `aria-expanded`, `aria-controls`
- [ ] `prefers-reduced-motion` honored everywhere

---

## 9. Definition of Done (DoD)

A feature/task is **done** only when ALL hold:

1. Implements the approved requirement (no scope creep).
2. Follows folder ownership and coding standards (§1–§2).
3. Includes/adjusts tests; coverage ≥ 80% on libs & interactive components.
4. Accessibility checklist passes (§8).
5. Performance checklist passes (§7).
6. `npm run lint`, `tsc --noEmit`, `npm run test`, `npm run build` all green.
7. Docs updated if behavior/contract changed (`PRD`/`TRD`/`ERD`/`DESIGN`/`API`).
8. Committed with a conventional message (§5).

---

## 10. Deployment Checklist

- [ ] `main` is green: lint + typecheck + tests + production build pass in CI
- [ ] No secrets in the diff or env files; `.env*` not tracked
- [ ] `next build` produces the static export without warnings
- [ ] Sitemap (`/sitemap.xml`) and `robots.txt` generated and valid
- [ ] Metadata/OG tags correct on all routes
- [ ] WhatsApp number verified in `src/config/site.ts` on the target environment
- [ ] Deploy to staging → smoke-test all pages + contact flow → deploy to production
- [ ] Post-deploy: check Lighthouse, 404s in analytics, and CDN cache headers

---

*End of AGENTS.md. All contributors and AI assistants must treat this as mandatory reading.*
