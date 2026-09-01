import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the main heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/fast/i);
  });

  it("renders the tagline text", () => {
    render(<Hero />);
    expect(screen.getByText(/global logistics partner/i)).toBeInTheDocument();
  });

  it("renders the description paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/air, ocean, and road freight/i),
    ).toBeInTheDocument();
  });

  it("renders Get a Quote link to /contact", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /get a quote/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders Explore Our Services link to /services", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /explore our services/i });
    expect(link).toHaveAttribute("href", "/services");
  });

  it("renders service cards on desktop (lg breakpoint)", () => {
    render(<Hero />);
    expect(screen.getByText("Air Freight")).toBeInTheDocument();
    expect(screen.getByText("Ocean")).toBeInTheDocument();
    expect(screen.getByText("99.8%")).toBeInTheDocument();
    expect(screen.getByText("On-Time Delivery")).toBeInTheDocument();
  });

  it("is wrapped in a section element", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
