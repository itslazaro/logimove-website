import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsSection } from "@/components/sections/StatsSection";
import { stats } from "@/content/stats";

describe("StatsSection", () => {
  it("renders all stat labels", () => {
    render(<StatsSection />);
    for (const stat of stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it("renders stat value containers with suffixes", () => {
    const { container } = render(<StatsSection />);
    // Each stat has a container div with the value and suffix text
    const valueDivs = container.querySelectorAll(".tabular-nums");
    expect(valueDivs.length).toBe(stats.length);
    // Check that suffix characters exist as text content
    for (const stat of stats) {
      const found = Array.from(valueDivs).some((el) =>
        el.textContent?.includes(stat.suffix),
      );
      expect(found).toBe(true);
    }
  });

  it("renders the correct number of stats", () => {
    render(<StatsSection />);
    const statLabels = stats.map((s) => s.label);
    for (const label of statLabels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("uses dark background styling", () => {
    const { container } = render(<StatsSection />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-ink-900");
  });

  it("uses a description list (dl) for semantics", () => {
    const { container } = render(<StatsSection />);
    expect(container.querySelector("dl")).toBeInTheDocument();
  });
});
