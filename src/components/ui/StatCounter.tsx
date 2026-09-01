"use client";

import type { Stat } from "@/content/stats";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface StatCounterProps extends Stat {
  /** Use the light variant when rendering on a dark background. */
  onDark?: boolean;
}

export function StatCounter({ value, suffix, label, onDark = false }: StatCounterProps) {
  const { ref, display } = useCountUp({ value });

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
