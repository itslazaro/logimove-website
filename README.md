# LogiMove Logistics — Corporate Website

> **Moving your world, reliably.**

A modern, SEO-optimized marketing and lead-generation website for LogiMove Logistics — an international freight-forwarding company. Built with Next.js 16, React 19, Tailwind CSS 4, and Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Tests](https://img.shields.io/badge/Tests-71%20passing-brightgreen)

---

## 🚀 Features

- **7 static routes** — Home, About, Services, FAQ, Contact, 404, Sitemap
- **WhatsApp contact flow** — pre-filled messages via Click-to-Chat deep links
- **Branded truck loader** — animated intro with logo fade-in and truck crossing
- **Scroll animations** — reveal effects on sections using Framer Motion
- **Animated stat counters** — count-up numbers triggered on scroll
- **Responsive design** — mobile-first with breakpoints at 480 / 768 / 1024 / 1280
- **Accessibility** — WCAG 2.2 AA compliant with semantic HTML, ARIA attributes, keyboard navigation
- **SEO optimized** — metadata, Open Graph, sitemap.xml, robots.txt
- **Zero runtime dependencies** — fully static SSG output, no API calls

---

## 📦 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) (strict mode) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Testing | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/itslazaro/logimove-website.git
cd logimove-website

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Folder Structure

```
logimove-website/
├── public/                     # Static assets (images, logos, video)
├── src/
│   ├── app/                    # App Router (file-based routes)
│   │   ├── about/page.tsx      # About page
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── faq/page.tsx        # FAQ page
│   │   ├── services/page.tsx   # Services page
│   │   ├── not-found.tsx       # Custom 404
│   │   ├── layout.tsx          # Root layout (fonts, header, footer)
│   │   ├── globals.css         # Tailwind + CSS variables
│   │   ├── sitemap.ts          # Generated sitemap
│   │   └── robots.ts           # Generated robots.txt
│   ├── components/
│   │   ├── ui/                 # Primitives: Button, Card, Input, Accordion…
│   │   ├── layout/             # Header, Footer, Logo, WhatsAppButton
│   │   ├── sections/           # Hero, Services, Stats, Process, Testimonials…
│   │   ├── contact/            # ContactForm
│   │   └── loading/            # TruckLoader animation
│   ├── config/
│   │   └── site.ts             # WhatsApp number, nav, site URL
│   ├── content/                # Typed data files (services, FAQs, testimonials…)
│   ├── hooks/                  # useCountUp, useTruckLoader
│   ├── lib/                    # whatsapp.ts (URL builder), utils.ts (cn)
│   └── __tests__/              # Vitest + React Testing Library tests
├── vitest.config.ts
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── postcss.config.mjs
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**71 tests** covering:
- Utility functions (`whatsapp.ts`, `utils.ts`)
- UI primitives (`Accordion`, `Button`, `Card`, `Input`)
- Section components (`Hero`, `StatsSection`, `ProcessSection`)
- Interactive components (`ContactForm`, `TruckLoader`)
- Custom hooks (`useCountUp`)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

---

## 🎨 Design System

All design tokens are defined in `src/app/globals.css` and configured in the Tailwind theme. The project uses:

- **Fonts:** Archivo (headings), Inter (body), JetBrains Mono (code)
- **Colors:** Brand orange palette, ink-900 for text, gray-50 for backgrounds
- **Components:** Stateless primitives in `src/components/ui/`

---

## 📄 Documentation

The project includes comprehensive specification documents:

- **[PRD.md](PRD.md)** — Product Requirements Document
- **[TRD.md](TRD.md)** — Technical Requirements Document
- **[ERD.md](ERD.md)** — Entity Relationship Document (future database schema)
- **[DESIGN.md](DESIGN.md)** — Design System & Tokens
- **[API.md](API.md)** — API Design (future endpoints)
- **[AGENTS.md](AGENTS.md)** — AI Development Workflow

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes following the coding standards in `AGENTS.md`
3. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`
4. Commit with a conventional message (e.g., `feat(contact): add WhatsApp deep-link`)
5. Open a pull request

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 🔗 Links

- **Live Site:** [logimove.example.com](https://logimove.example.com)
- **Repository:** [github.com/itslazaro/logimove-website](https://github.com/itslazaro/logimove-website)

---

<p align="center">Built with ❤️ by <a href="https://github.com/itslazaro">itslazaro</a></p>
