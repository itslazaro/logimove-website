import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessSection } from "@/components/sections/ProcessSection";

describe("ProcessSection", () => {
  it("renders the section heading", () => {
    render(<ProcessSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /from quote to delivery/i,
    );
  });

  it("renders the eyebrow badge", () => {
    render(<ProcessSection />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("renders all four steps", () => {
    render(<ProcessSection />);
    expect(screen.getByText("Reach out")).toBeInTheDocument();
    expect(screen.getByText("Get your quote")).toBeInTheDocument();
    expect(screen.getByText("We handle the rest")).toBeInTheDocument();
    expect(screen.getByText("Track to delivery")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<ProcessSection />);
    // "message us on whatsapp" appears in both the section description and step 1
    const matches = screen.getAllByText(/message us on whatsapp/i);
    expect(matches.length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByText(/receive a transparent/i),
    ).toBeInTheDocument();
  });

  it("uses ordered list semantics", () => {
    const { container } = render(<ProcessSection />);
    expect(container.querySelector("ol")).toBeInTheDocument();
  });

  it("renders numbered badges 1 through 4", () => {
    render(<ProcessSection />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders step titles as headings", () => {
    render(<ProcessSection />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(4);
  });
});
