import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "@/hooks/useCountUp";

// Mock the custom hooks
vi.mock("@/hooks/useInView", () => ({
  useInView: vi.fn().mockReturnValue({ ref: { current: null }, inView: true }),
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(useInView).mockReturnValue({ ref: { current: null }, inView: true });
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
    vi.mocked(useInView).mockReturnValue({ ref: { current: null }, inView: false });
    const { result } = renderHook(() => useCountUp({ value: 100 }));
    act(() => { vi.advanceTimersByTime(2000); });
    expect(result.current.display).toBe(0);
  });

  it("counts up toward target when in view", () => {
    vi.mocked(useInView).mockReturnValue({ ref: { current: null }, inView: true });
    const { result } = renderHook(() => useCountUp({ value: 100, duration: 1000 }));
    act(() => { vi.advanceTimersByTime(500); });
    expect(result.current.display).toBeGreaterThan(0);
    expect(result.current.display).toBeLessThan(100);
  });

  it("reaches target value after full duration", () => {
    vi.mocked(useInView).mockReturnValue({ ref: { current: null }, inView: true });
    const { result } = renderHook(() => useCountUp({ value: 100, duration: 1000 }));
    act(() => { vi.advanceTimersByTime(1500); });
    expect(result.current.display).toBe(100);
  });
});
