"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Truck } from "lucide-react";
import { site } from "@/config/site";

const TRUCK_CROSS = 3.2; // seconds for the truck to cross the screen
const TOTAL_HOLD = 4800; // ms before the overlay begins fading out (~5s branded intro)

export function TruckLoader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timerList = timers.current;
    const hold = reduce ? 900 : TOTAL_HOLD;
    timerList.push(
      setTimeout(() => {
        setDone(true);
        timerList.push(setTimeout(() => setUnmounted(true), 450));
      }, hold),
    );
    return () => timerList.forEach(clearTimeout);
  }, [reduce]);

  if (unmounted) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="relative h-40 w-full">
        {/* Logo — fades in as the truck nears center */}
        <div className="absolute inset-x-0 top-4 flex justify-center sm:top-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: done ? 0 : 1, scale: 1 }}
            transition={{ delay: reduce ? 0 : 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={1024}
              height={1024}
              priority
              className="h-28 w-auto drop-shadow-sm sm:h-36"
            />
            <div className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-brand-700">
              {site.tagline}
            </div>
          </motion.div>
        </div>

        {/* Road line */}
        <div className="absolute bottom-9 left-0 right-0 h-px bg-gray-100" />

        {/* Truck with dust trail */}
        <motion.div
          className="absolute bottom-7 left-0 flex items-end"
          initial={{ x: "-45vw" }}
          animate={{ x: reduce ? "32vw" : "115vw" }}
          transition={{ duration: reduce ? 0 : TRUCK_CROSS, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.span
            className="mb-3 h-2.5 w-24 rounded-full bg-gradient-to-r from-transparent via-brand-200 to-brand-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.2, 0.7, 0.2] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
          <Truck className="size-24 text-brand-500 sm:size-28" aria-hidden />
        </motion.div>
      </div>
    </motion.div>
  );
}
