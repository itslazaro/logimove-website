"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Simple analytics component that tracks:
 * - Page views (via console.log for now, replace with your analytics provider)
 * - WhatsApp click events
 *
 * In production, replace the console.log calls with your analytics provider:
 * - Google Analytics: gtag('event', ...)
 * - Plausible: plausible('event', ...)
 * - Mixpanel: mixpanel.track(...)
 */
export function Analytics() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    console.log("[Analytics] Page view:", pathname);
    // Replace with: gtag('event', 'page_view', { page_path: pathname });
  }, [pathname]);

  // Track WhatsApp clicks
  useEffect(() => {
    const handleWhatsAppClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href*="wa.me"]');

      if (link) {
        console.log("[Analytics] WhatsApp click:", {
          page: pathname,
          href: link.getAttribute("href"),
          timestamp: new Date().toISOString(),
        });
        // Replace with: gtag('event', 'whatsapp_click', { page_path: pathname });
      }
    };

    document.addEventListener("click", handleWhatsAppClick);
    return () => document.removeEventListener("click", handleWhatsAppClick);
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
