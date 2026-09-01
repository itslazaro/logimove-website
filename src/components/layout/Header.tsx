"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <nav
          aria-label="Main"
          className="mx-auto flex h-[68px] w-[min(90%,1460px)] items-center justify-between gap-6 rounded-full border border-brand-logo/50 bg-white/70 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_32px_-12px_rgba(10,10,10,0.18),0_0_28px_-6px_color-mix(in_srgb,var(--color-brand-logo)_40%,transparent)] backdrop-blur-[20px] sm:px-7 lg:h-[72px]"
        >
        <Logo className="shrink-0" />

        <ul className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors",
                    active ? "text-ink-900" : "text-ink-900/70 hover:text-brand-logo",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-[2px] w-full origin-left rounded-full bg-brand-logo transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 lg:block">
          <Button href="/contact" size="sm">
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-900/5 lg:hidden"
        >
          <span className="sr-only">Toggle navigation menu</span>
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="mx-auto mt-4 w-[min(94%,1460px)] rounded-3xl border border-brand-logo/50 bg-white/90 p-2 shadow-[0_25px_50px_-12px_rgba(10,10,10,0.2),0_0_28px_-6px_color-mix(in_srgb,var(--color-brand-logo)_40%,transparent)] backdrop-blur-[20px] lg:hidden"
        >
          <ul className="flex flex-col gap-1 p-1">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2.5 text-base font-medium transition-colors",
                      active
                        ? "bg-brand-logo text-ink-900"
                        : "text-ink-900/80 hover:bg-ink-900/5 hover:text-brand-logo",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-ink-900/10 p-2">
            <Button href="/contact" className="w-full" onClick={() => setOpen(false)}>
              Get a Quote
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}