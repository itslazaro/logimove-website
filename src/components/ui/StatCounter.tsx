"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Stat } from "@/content/stats";
import { cn } from "@/lib/utils";

interface StatCounterProps extends Stat {
  /** Use the light variant when rendering on a dark background. */
  onDark?: boolean;
}

export function StatCounter({ value, suffix, label, onDark = false }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1500;
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
  }, [inView, reduce, value]);

  return (
    <div ref={ref}>
      <div
        className={cn(
          "font-display text-4xl font-bold tabular-nums sm:text-5xl",
          onDark ? "text-brand-400" : "text-brand-700",
        )}
      >
        {display.toLocaleString("en-US")}
        {suffix}
      </div>
      <div className={cn("mt-2 text-sm", onDark ? "text-gray-100/70" : "text-gray-500")}>{label}</div>
    </div>
  );
}
