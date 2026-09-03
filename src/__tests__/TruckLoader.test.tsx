import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

// Mock the custom useReducedMotion hook
vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TruckLoader } from "@/components/loading/TruckLoader";

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(useReducedMotion).mockReturnValue(false);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("TruckLoader", () => {
  it("renders the loader overlay", () => {
    render(<TruckLoader />);
    expect(screen.getByText(/moving your world/i)).toBeInTheDocument();
  });

  it("is hidden from assistive tech via aria-hidden", () => {
    render(<TruckLoader />);
    const overlay = screen.getByText(/moving your world/i).closest("[aria-hidden]");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  it("shows the logo", () => {
    render(<TruckLoader />);
    expect(screen.getByAltText(/logimove logo/i)).toBeInTheDocument();
  });

  it("self-removes after the hold duration", () => {
    const { container } = render(<TruckLoader />);

    // Still visible before hold expires
    act(() => { vi.advanceTimersByTime(1000); });
    expect(container.innerHTML).not.toBe("");

    // After TOTAL_HOLD (1600ms) + FADE_OUT (400ms) it should be gone
    act(() => { vi.advanceTimersByTime(1600); });
    act(() => { vi.advanceTimersByTime(450); });
    expect(container.innerHTML).toBe("");
  });

  it("uses shorter hold when reduced motion is active", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { container } = render(<TruckLoader />);

    // After 500ms + 400ms fade it should be gone
    act(() => { vi.advanceTimersByTime(500); });
    act(() => { vi.advanceTimersByTime(450); });
    expect(container.innerHTML).toBe("");
  });
});
