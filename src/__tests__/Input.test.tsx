import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("renders with a visible label", () => {
    render(<Input label="Email" name="email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders as required when specified", () => {
    render(<Input label="Email" name="email" required />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("shows error message and aria-invalid when error is provided", () => {
    render(<Input label="Email" name="email" error="Invalid email" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("links error to input via aria-describedby", () => {
    render(<Input label="Email" name="email" error="Invalid email" />);
    const input = screen.getByLabelText(/email/i);
    const errorId = input.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId!)).toHaveTextContent("Invalid email");
  });

  it("does not show error when error is undefined", () => {
    render(<Input label="Email" name="email" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input label="Name" name="name" />);
    await user.type(screen.getByLabelText(/name/i), "Daniel");
    expect(screen.getByLabelText(/name/i)).toHaveValue("Daniel");
  });
});
