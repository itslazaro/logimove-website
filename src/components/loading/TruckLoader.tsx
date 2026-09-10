"use client";

import { Truck } from "lucide-react";
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
        {/* Road line */}
        <div className="absolute bottom-9 left-0 right-0 h-px bg-gray-100" />

        {/* Truck with exhaust trail */}
        <div className="loader-truck absolute bottom-7 left-0 flex items-end">
          <div aria-hidden className="loader-exhaust relative mb-4 h-6 w-14 shrink-0">
            <span className="loader-puff" />
            <span className="loader-puff" />
            <span className="loader-puff" />
          </div>
          <Truck className="size-24 text-brand-500 sm:size-28" aria-hidden />
        </div>
      </div>
    </div>
  );
}
