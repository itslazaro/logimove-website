"use client";

import Image from "next/image";
import { Truck } from "lucide-react";
import { site } from "@/config/site";
import { useTruckLoader } from "@/hooks/useTruckLoader";

export function TruckLoader() {
  const { done, unmounted } = useTruckLoader();

  if (unmounted) return null;

  return (
    <div
      aria-hidden="true"
      data-done={String(done)}
      className="loader-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="relative h-40 w-full">
        {/* Logo — fades in as the truck nears center */}
        <div className="absolute inset-x-0 top-4 flex justify-center sm:top-2">
          <div className="loader-logo flex flex-col items-center">
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              width={256}
              height={256}
              priority
              className="h-28 w-auto drop-shadow-sm sm:h-36"
            />
            <div className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-brand-700">
              {site.tagline}
            </div>
          </div>
        </div>

        {/* Road line */}
        <div className="absolute bottom-9 left-0 right-0 h-px bg-gray-100" />

        {/* Truck with dust trail */}
        <div className="loader-truck absolute bottom-7 left-0 flex items-end">
          <span className="loader-dust mb-3 h-2.5 w-24 rounded-full bg-gradient-to-r from-transparent via-brand-200 to-brand-300" />
          <Truck className="size-24 text-brand-500 sm:size-28" aria-hidden />
        </div>
      </div>
    </div>
  );
}
