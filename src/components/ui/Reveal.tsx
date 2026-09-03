"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  className?: string;
}

/** Fades + slides content into view once, on scroll (reduced-motion aware). */
export function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  const { ref, inView } = useInView({ once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={cn("animate-reveal", inView && "is-in-view", className)}
      style={{ "--reveal-y": `${y}px`, animationDelay: `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
