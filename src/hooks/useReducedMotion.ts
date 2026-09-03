"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Returns `true` when the user has `prefers-reduced-motion: reduce` active.
 * Falls back to `false` when running on the server (SSR-safe).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    // Sync initial value in an event handler context (via microtask)
    queueMicrotask(() => setReduced(mql.matches));
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
