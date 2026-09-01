import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies base styles", () => {
    const { container } = render(<Card><p>Content</p></Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("rounded-2xl");
    expect(card.className).toContain("border");
    expect(card.className).toContain("bg-white");
  });

  it("applies hover class when hover is true", () => {
    const { container } = render(<Card hover><p>Content</p></Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("hover:shadow-md");
  });

  it("does not apply hover class by default", () => {
    const { container } = render(<Card><p>Content</p></Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).not.toContain("hover:shadow-md");
  });

  it("accepts custom className", () => {
    const { container } = render(<Card className="custom-class"><p>Content</p></Card>);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });
});
