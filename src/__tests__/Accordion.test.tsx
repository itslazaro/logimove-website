import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccordionItem } from "@/components/ui/Accordion";

describe("AccordionItem", () => {
  const defaultProps = {
    question: "What is your return policy?",
    answer: "You can return items within 30 days.",
  };

  it("renders the question text", () => {
    render(<AccordionItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.question)).toBeInTheDocument();
  });

  it("is collapsed by default", () => {
    render(<AccordionItem {...defaultProps} />);
    const button = screen.getByRole("button", { name: defaultProps.question });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(defaultProps.answer)).not.toBeInTheDocument();
  });

  it("expands when clicked", async () => {
    const user = userEvent.setup();
    render(<AccordionItem {...defaultProps} />);
    const button = screen.getByRole("button", { name: defaultProps.question });

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(defaultProps.answer)).toBeInTheDocument();
  });

  it("collapses when clicked again", async () => {
    const user = userEvent.setup();
    render(<AccordionItem {...defaultProps} />);
    const button = screen.getByRole("button", { name: defaultProps.question });

    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("opens when defaultOpen is true", () => {
    render(<AccordionItem {...defaultProps} defaultOpen />);
    const button = screen.getByRole("button", { name: defaultProps.question });
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(defaultProps.answer)).toBeInTheDocument();
  });

  it("has correct aria-controls linking", async () => {
    const user = userEvent.setup();
    render(<AccordionItem {...defaultProps} />);
    const button = screen.getByRole("button", { name: defaultProps.question });
    const controlsId = button.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();

    // Expand first, then the region should have the matching id
    await user.click(button);
    const region = document.getElementById(controlsId!);
    expect(region).toBeInTheDocument();
  });

  it("region has role=region and aria-labelledby", async () => {
    const user = userEvent.setup();
    render(<AccordionItem {...defaultProps} />);
    const button = screen.getByRole("button", { name: defaultProps.question });

    await user.click(button);

    const region = screen.getByRole("region", { name: defaultProps.question });
    expect(region).toBeInTheDocument();
  });
});
