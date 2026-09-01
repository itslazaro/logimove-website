"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface UseCountUpOptions {
  /** Target value to count up to. */
  value: number;
  /** Animation duration in ms. Default: 1500. */
  duration?: number;
}

/**
 * Animates a number from 0 to `value` when the returned ref enters the viewport.
 * Returns the ref to attach, and the current display value.
 * Skips animation when `prefers-reduced-motion` is active.
 */
export function useCountUp({ value, duration = 1500 }: UseCountUpOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return { ref, display } as const;
}
