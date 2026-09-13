"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

/**
 * Formal business header: full-width bar with a grounded bottom border,
 * not a floating glassmorphic pill. A direct phone line sits next to the
 * CTA — the trust signal a freight/logistics buyer expects from a header,
 * not just a chat widget.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:h-[72px] sm:px-6 lg:px-8"
      >
        <Logo className="shrink-0" />

        <ul className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-sm font-semibold tracking-wide transition-colors",
                    active ? "text-ink-900" : "text-ink-900/65 hover:text-ink-900",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-brand-600 transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700"
          >
            <Phone aria-hidden className="size-4 text-brand-600" />
            {site.whatsappDisplay}
          </a>
          <span aria-hidden className="h-6 w-px bg-gray-200" />
          <Button href="/contact" size="sm">
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-ink-900 transition-colors hover:bg-ink-900/5 lg:hidden"
        >
          <span className="sr-only">Toggle navigation menu</span>
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-gray-200 bg-white lg:hidden">
          <ul className="flex flex-col divide-y divide-gray-100 px-4 sm:px-6">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block py-3.5 text-base font-semibold transition-colors",
                      active ? "text-brand-700" : "text-ink-900/80 hover:text-ink-900",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:px-6">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-ink-900"
            >
              <Phone aria-hidden className="size-4 text-brand-600" />
              {site.whatsappDisplay}
            </a>
            <Button href="/contact" className="w-full" onClick={() => setOpen(false)}>
              Get a Quote
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}