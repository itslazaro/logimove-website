import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "@/hooks/useCountUp";

// Mock framer-motion hooks
vi.mock("framer-motion", () => ({
  useInView: vi.fn().mockReturnValue(true),
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

import { useInView, useReducedMotion } from "framer-motion";

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(useInView).mockReturnValue(true);
  vi.mocked(useReducedMotion).mockReturnValue(false);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("useCountUp", () => {
  it("starts at 0 when not reduced motion", () => {
    const { result } = renderHook(() => useCountUp({ value: 100 }));
    expect(result.current.display).toBe(0);
  });

  it("starts at target value when reduced motion is active", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { result } = renderHook(() => useCountUp({ value: 100 }));
    expect(result.current.display).toBe(100);
  });

  it("returns a ref to attach", () => {
    const { result } = renderHook(() => useCountUp({ value: 100 }));
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.ref).toBe("object");
  });

  it("does not animate when not in view", () => {
    vi.mocked(useInView).mockReturnValue(false);
    const { result } = renderHook(() => useCountUp({ value: 100 }));
    act(() => { vi.advanceTimersByTime(2000); });
    expect(result.current.display).toBe(0);
  });

  it("counts up toward target when in view", () => {
    vi.mocked(useInView).mockReturnValue(true);
    const { result } = renderHook(() => useCountUp({ value: 100, duration: 1000 }));
    act(() => { vi.advanceTimersByTime(500); });
    expect(result.current.display).toBeGreaterThan(0);
    expect(result.current.display).toBeLessThan(100);
  });

  it("reaches target value after full duration", () => {
    vi.mocked(useInView).mockReturnValue(true);
    const { result } = renderHook(() => useCountUp({ value: 100, duration: 1000 }));
    act(() => { vi.advanceTimersByTime(1500); });
    expect(result.current.display).toBe(100);
  });
});
