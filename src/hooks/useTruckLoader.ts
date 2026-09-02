"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TOTAL_HOLD = 1600;
const FADE_OUT_DURATION = 400;
const REDUCED_HOLD = 500;

/**
 * Manages the branded truck loader lifecycle.
 * Returns `{ done }` — when `done` is true the overlay should start fading out,
 * and `unmounted` means it can be fully removed from the DOM.
 */
export function useTruckLoader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timerList = timers.current;
    const hold = reduce ? REDUCED_HOLD : TOTAL_HOLD;
    timerList.push(
      setTimeout(() => {
        setDone(true);
        timerList.push(setTimeout(() => setUnmounted(true), FADE_OUT_DURATION));
      }, hold),
    );
    return () => timerList.forEach(clearTimeout);
  }, [reduce]);

  return { done, unmounted } as const;
}
