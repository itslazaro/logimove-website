# Design System (DESIGN.md)

**Project:** LogiMove Logistics — Corporate Website
**Version:** 1.0
**Status:** Draft for review
**Date:** 2026-08-04

> This document defines the single source of truth for visual design. Implement as Tailwind
> design tokens (CSS variables) in `src/app/globals.css`. All components must consume tokens —
> never ad-hoc hex values.

---

## 1. Design Principles

1. **Trust.** Structured grids, restrained motion, confident typography. Logistics customers
   decide on credibility — the layout must feel solid and dependable.
2. **Speed.** Clean visual hierarchy, generous whitespace, obvious calls to action. The brand
   is about moving fast, and the interface should feel fast too.
3. **Clarity.** One idea per section. Plain language. International audiences, so UI copy
   stays jargon-light and consistent.
4. **Orange energy.** The brand color is used as an accent for actions and emphasis — never
   flooding entire screens.

---

## 2. Color Palette

Primary colors are **Orange**, **White**, and **Black**. The palette below includes tints and
neutrals derived from them, plus semantic colors.

### 2.1 Brand orange (`brand`)

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-50` | `#FFF3EA` | Section backgrounds, soft emphasis |
| `brand-100` | `#FFE2CF` | Hover fills, tag backgrounds |
| `brand-200` | `#FFC49E` | Progress, decorative |
| `brand-300` | `#FFA066` | Icons on dark, illustration accents |
| `brand-400` | `#FF7D33` | Hover state of primary actions |
| `brand-500` | `#F2600C` | **Primary action background** |
| `brand-600` | `#D9550A` | Active/pressed, borders |
| `brand-700` | `#B34608` | **Orange text on white** (AA for normal text) |
| `brand-800` | `#8A3607` | Orange text on light tints |
| `brand-900` | `#642706` | Footer band on dark, deep emphasis |

### 2.2 Neutrals (`ink` / `gray`)

| Token | Hex | Usage |
|-------|-----|-------|
| `ink-900` | `#0A0A0A` | Primary text, dark surfaces |
| `ink-800` | `#1A1A18` | Dark section backgrounds |
| `ink-700` | `#262624` | Secondary dark |
| `gray-500` | `#73736D` | Secondary body text (AA on white) |
| `gray-400` | `#A3A39D` | Placeholder, disabled |
| `gray-200` | `#D1D1CC` | Borders, dividers |
| `gray-100` | `#E8E8E5` | Card alt background |
| `gray-50` | `#F7F7F5` | Page background (off-white) |
| `white` | `#FFFFFF` | Surfaces on dark, base background |

### 2.3 Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#1E8E3E` | Success states |
| `warning` | `#A96407` | Warnings (AA on white) |
| `error` | `#C5221F` | Form errors |
| `info` | `#1967D2` | Informational |

### 2.4 Contrast compliance (WCAG 2.2 AA)

| Pairing | Ratio | Verdict |
|---------|-------|---------|
| ink-900 on white | ~17.7 : 1 | ✓ AAA |
| white on ink-900 | ~17.7 : 1 | ✓ AAA |
| ink-900 on brand-500 | ~7.9 : 1 | ✓ AAA |
| brand-700 on white | ~5.9 : 1 | ✓ AA |
| brand-600 on white | ~4.6 : 1 | ✓ AA |
| white on brand-500 | ~3.1 : 1 | ✗ Use for large text / non-text only |
| gray-500 on white | ~4.6 : 1 | ✓ AA |

> **Rule:** orange backgrounds use **ink-900 text** (never white). Orange is used as **text
> color** only at `brand-600` or darker.

---

## 3. Typography

### 3.1 Families (via `next/font/google`, self-hosted)

| Role | Font | Weight range | Fallback |
|------|------|--------------|----------|
| Display / Headings | **Archivo** | 500–800 | system-ui, sans-serif |
| Body | **Inter** | 400–600 | system-ui, sans-serif |
| Mono (tracking numbers, codes) | **JetBrains Mono** | 400–500 | ui-monospace, monospace |

### 3.2 Type scale (fluid)

| Token | Size | Line-height | Weight | Use |
|-------|------|-------------|--------|-----|
| `display-xl` | `clamp(2.75rem, 5vw + 1rem, 4.5rem)` | 1.05 | 800 | Hero headline |
| `display-md` | `clamp(2rem, 3vw + 1rem, 3rem)` | 1.1 | 700 | Page/section titles |
| `h3` | `clamp(1.375rem, 1.5vw + 1rem, 1.75rem)` | 1.25 | 700 | Card titles |
| `body-lg` | `1.125rem` | 1.6 | 400 | Lead paragraphs |
| `body` | `1rem` | 1.6 | 400 | Default text |
| `body-sm` | `0.875rem` | 1.5 | 400 | Secondary text |
| `overline` | `0.75rem` | 1.4 | 700 | Uppercase, `letter-spacing: 0.12em` — section eyebrows |
| `caption` | `0.8125rem` | 1.4 | 400 | Footers, meta |

### 3.3 Style rules
- Headings: tight tracking (`-0.01em`), bold weight, never all-caps except the `overline` eyebrow.
- Body: max line length ~65ch for readability.
- Numbers/statistics: mono font, tabular numerals (no CLS when counters animate).

---

## 4. Grid & Layout

- **Container:** max-width `1280px`, horizontal padding `24px` desktop / `16px` mobile.
- **Grid:** 12-column. Mobile collapses to single column; content typically spans 6/12.
- **Gutter:** `24px` (fixed), mobile `16px`.
- **Section spacing:** `py-16 md:py-24` (mobile 64px → desktop 96px).
- **Max text measure:** ~720px for prose sections.

---

## 5. Spacing

Based on a **4px scale** (Tailwind default):

`0 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

Use semantic spacing tokens in components: `space-sm (16)`, `space-md (24)`, `space-lg (48)`,
`space-xl (96)`. Never scatter arbitrary values.

---

## 6. Buttons

| Variant | Styles |
|---------|--------|
| **Primary** | `bg-brand-500 text-ink-900 font-semibold` · hover `bg-brand-400` · focus ring |
| **Secondary** | `bg-white text-ink-900 border border-ink-900` · hover `bg-ink-900 text-white` |
| **Ghost / text** | `text-ink-900` underline on hover · low emphasis |
| **Inverse** | `bg-white text-ink-900` on dark sections · hover `bg-brand-500` |

- Sizes: `sm (h-9 px-4 text-sm)`, `md (h-11 px-6 text-base)`, `lg (h-13 px-8 text-lg)`.
- Radius: `rounded-full` (pill) for primary/CTA; `rounded-lg` for secondary.
- Icon slots: left/right 20px; gap 8px.
- **Touch target ≥ 44×44px** on mobile.
- Focus: `focus-visible:ring-2 ring-brand-600 ring-offset-2`.

---

## 7. Cards

- Base: `bg-white border border-gray-200 rounded-2xl p-6`, subtle `shadow-sm`.
- Hover: `shadow-md -translate-y-0.5` (transition 200ms).
- **Service card:** icon in `brand-50` rounded square → title (h3) → body-sm text → "Learn more" link.
- **Statistic card:** big mono number (brand-700) + body-sm label.
- **Testimonial card:** 5-star row (brand-500 icons), quote text, author name + role.
- **Partner logo:** grayscale image, `opacity-60`, hover full opacity + brand tint.

---

## 8. Forms

| Element | Style |
|---------|-------|
| Label | `body-sm font-medium` above field |
| Input / textarea / select | `h-11 rounded-lg border border-gray-200 bg-white px-4 text-base` |
| Focus | `border-brand-600 ring-2 ring-brand-600/20` |
| Placeholder | `gray-400` |
| Error | `border-error` + `text-error` message with `role="alert"` |
| Required | visible `*` + `aria-required` |
| Submit | Primary button (opens WhatsApp) |
| Success hint | `aria-live="polite"` confirmation text |

---

## 9. Icons

- **Library:** Lucide React (tree-shakeable).
- **Default:** `size-5`, `strokeWidth 2`, `aria-hidden`.
- Icon usage: section eyebrows, service icons, feature bullets, WhatsApp button, stats.
- WhatsApp glyph: use the official WhatsApp SVG (from the brand/partner assets) for the float
  button and contact CTAs — not a Lucide substitute.

---

## 10. Animations & Motion

### 10.1 Motion philosophy
Enhance, never distract. Duration 200–600ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out
expo). All motion uses **transform + opacity only** (GPU-composited, 60 FPS).

### 10.2 Patterns
| Pattern | Spec |
|---------|------|
| Fade-in on scroll | `opacity 0→1`, `y 16→0`, stagger 80ms, once |
| Hover | scale/translate 200ms on cards & buttons |
| Animated counters | count 0→N over ~1.5s, tabular numerals, start when in view |
| Smooth scroll | `scroll-behavior: smooth` + `scroll-margin-top` for anchor targets |
| Page transitions | fade/slide between routes (Framer Motion `AnimatePresence`) |
| Truck loader | one-shot 2–3s timeline (truck L→R, logo fade-in, dust trail, site fade-in) |

### 10.3 Reduced motion
Respect `prefers-reduced-motion`: disable scroll/parallax/counter anims, show static states;
the loader renders a static brand frame and yields immediately.

---

## 11. Mobile Responsiveness

| Breakpoint | Range | Behavior |
|------------|-------|----------|
| base | < 480px | Single column; nav → hamburger menu; floating WhatsApp FAB |
| `sm` 480 | ≥ 480px | Two-up stats |
| `md` 768 | ≥ 768px | 2-col grids; inline nav |
| `lg` 1024 | ≥ 1024px | 3–4 col grids; full nav |
| `xl` 1280 | ≥ 1280px | Container maxes at 1280px |

- Sticky header with backdrop blur on scroll.
- Floating WhatsApp button bottom-right (`fixed bottom-5 right-5`), ≥ 56px, with pulse ring.
- Fonts/buttons auto-scale; no horizontal overflow (test at 320px).

---

## 12. Accessibility (UI layer)

- Semantic landmarks; single `h1` per page; logical heading order.
- Visible focus states on every interactive element.
- Contrast per §2.4.
- Minimum touch target 44×44px on mobile.
- Decorative icons `aria-hidden`; informational icons get text labels.
- Accordions: `button` toggles with `aria-expanded` + `aria-controls`.
- Form errors announced via `aria-live`.
- Loader hidden from assistive tech (`aria-hidden`) while shown; content not blocked on reveal.

---

## 13. UI Component Inventory

| Component | Notes |
|-----------|-------|
| `Container` | Max-width wrapper |
| `Button` | Variants/sizes/icon slots (asLink) |
| `Badge` | Status/eyebrow pills |
| `Card` | Base surface with hover |
| `SectionHeading` | Eyebrow + title + lead (centered or left) |
| `ServiceCard` | Icon + title + desc + link |
| `StatCounter` | Animated number |
| `ProcessStep` | Numbered step (1–4) |
| `TestimonialCard` | Quote + author + rating |
| `PartnerLogo` | Grayscale logo |
| `Accordion` | FAQ item |
| `FormField` | Label + input + error |
| `WhatsAppButton` | Config-driven float + inline CTA |
| `Header` / `Footer` | Site shell |
| `TruckLoader` | Branded loader |
| `Divider`, `SocialLinks`, `Breadcrumb` | Utilities |

---

## 14. Branding Guidelines

### 14.1 Logo
- **Mark:** an orange delivery truck silhouette (simple, geometric) + wordmark **"LogiMove"** in
  Archivo 800.
- **Stacked (mobile / loader):** mark above wordmark. **Horizontal (header):** mark left of wordmark.
- **Colors:** orange mark + ink-900 wordmark on light; white mark + white wordmark on dark.
- **Clear space:** half the height of the mark on all sides.
- **Minimum size:** width ≥ 120px (horizontal), ≥ 64px (stacked).

### 14.2 Logo don'ts
Do not stretch, recolor outside palette, add drop shadows, rotate, or place on busy imagery
without a scrim.

### 14.3 Voice & tone
- Confident, plain, international English. Short sentences.
- Keywords: **trust, speed, reliability, global reach, customs expertise.**
- Avoid industry jargon unless explained; numbers over adjectives ("40+ partner carriers"
  not "many partners").

### 14.4 Imagery
- Photography: trucks on highways, container ports, air freight, warehouses — natural light,
  slightly warm grade, orange accents.
- `next/image` with descriptive `alt` text; 4:3 / 16:9 crops; lazy below the hero.

### 14.5 Usage rules
- Orange is the **action/emphasis** color — reserve for CTAs, active states, key numbers.
- Dark sections (ink-900) may frame orange CTAs; never use orange as a full-bleed page
  background.
- Maximum ~2 font weights per family per screen.

---

*End of DESIGN. Implement all tokens as CSS variables in `globals.css`; components reference
tokens only.*
