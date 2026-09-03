"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Only trigger once (stop observing after first intersection). Default: true. */
  once?: boolean;
  /** RootMargin passed to IntersectionObserver. Default: "-40px". */
  margin?: string;
}

/**
 * Observes the returned ref and returns `true` once the element enters the viewport.
 * SSR-safe: defaults to `false` on the server.
 */
export function useInView({ once = true, margin = "-40px" }: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin: margin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin]);

  return { ref, inView } as const;
}
