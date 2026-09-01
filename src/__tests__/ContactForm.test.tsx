import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";

// Mock window.open for WhatsApp
const openSpy = vi.fn().mockReturnValue(null);

beforeEach(() => {
  openSpy.mockClear();
  vi.spyOn(window, "open").mockImplementation(openSpy);
});

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("shows the Contact Us submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /contact us/i })).toBeInTheDocument();
  });

  it("shows validation error for empty name on submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /contact us/i }));

    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/enter your name/i)).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Daniel");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/message/i), "I need a freight quote for ocean shipping.");
    await user.click(screen.getByRole("button", { name: /contact us/i }));

    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it("shows validation error for short message", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Daniel");
    await user.type(screen.getByLabelText(/email/i), "daniel@test.com");
    await user.type(screen.getByLabelText(/message/i), "Short");
    await user.click(screen.getByRole("button", { name: /contact us/i }));

    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it("opens WhatsApp on valid submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Daniel");
    await user.type(screen.getByLabelText(/email/i), "daniel@test.com");
    await user.type(screen.getByLabelText(/message/i), "I need a freight quote for ocean shipping.");
    await user.click(screen.getByRole("button", { name: /contact us/i }));

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining("wa.me/"),
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("shows success status after submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Daniel");
    await user.type(screen.getByLabelText(/email/i), "daniel@test.com");
    await user.type(screen.getByLabelText(/message/i), "I need a freight quote for ocean shipping.");
    await user.click(screen.getByRole("button", { name: /contact us/i }));

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/whatsapp is opening/i)).toBeInTheDocument();
  });

  it("shows copy button after submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Daniel");
    await user.type(screen.getByLabelText(/email/i), "daniel@test.com");
    await user.type(screen.getByLabelText(/message/i), "I need a freight quote for ocean shipping.");
    await user.click(screen.getByRole("button", { name: /contact us/i }));

    expect(screen.getByRole("button", { name: /copy message/i })).toBeInTheDocument();
  });

  it("phone field is optional — validates format when provided", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Daniel");
    await user.type(screen.getByLabelText(/email/i), "daniel@test.com");
    await user.type(screen.getByLabelText(/phone/i), "abc");
    await user.type(screen.getByLabelText(/message/i), "I need a freight quote for ocean shipping.");
    await user.click(screen.getByRole("button", { name: /contact us/i }));

    expect(screen.getByText(/valid phone/i)).toBeInTheDocument();
  });
});
