import { describe, it, expect, vi } from "vitest";
import {
  buildWhatsAppUrl,
  buildContactMessage,
  buildQuoteMessage,
  openWhatsApp,
  type ContactFormValues,
  type QuoteFormValues,
} from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("returns a valid wa.me URL with digits only", () => {
    const url = buildWhatsAppUrl("Hello!");
    expect(url).toBe("https://wa.me/12345550199?text=Hello!");
  });

  it("encodes special characters in the message", () => {
    const url = buildWhatsAppUrl("Hello & goodbye!");
    expect(url).toContain("text=Hello%20%26%20goodbye!");
  });

  it("strips non-digit characters from the phone number", () => {
    const url = buildWhatsAppUrl("test");
    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  });
});

describe("buildContactMessage", () => {
  const baseValues: ContactFormValues = {
    name: "Daniel",
    company: "Acme Corp",
    email: "daniel@acme.com",
    phone: "+1555123456",
    message: "I need a quote for ocean freight.",
  };

  it("includes all fields when provided", () => {
    const msg = buildContactMessage(baseValues);
    expect(msg).toContain("Hello LogiMove!");
    expect(msg).toContain("Name: Daniel");
    expect(msg).toContain("Company: Acme Corp");
    expect(msg).toContain("Email: daniel@acme.com");
    expect(msg).toContain("Phone: +1555123456");
    expect(msg).toContain("Message:");
    expect(msg).toContain("I need a quote for ocean freight.");
  });

  it("omits company when empty", () => {
    const msg = buildContactMessage({ ...baseValues, company: "" });
    expect(msg).not.toContain("Company:");
  });

  it("omits phone when empty", () => {
    const msg = buildContactMessage({ ...baseValues, phone: "" });
    expect(msg).not.toContain("Phone:");
  });
});

describe("buildQuoteMessage", () => {
  const baseValues: QuoteFormValues = {
    service: "Air Freight",
    origin: "Los Angeles",
    destination: "Shanghai",
    details: "10 pallets, 2000 kg",
    name: "Maya",
    company: "D2C Brand",
    email: "maya@d2c.com",
    phone: "+447123456",
  };

  it("includes all fields when provided", () => {
    const msg = buildQuoteMessage(baseValues);
    expect(msg).toContain("Hello LogiMove! I'd like to request a quote.");
    expect(msg).toContain("Service: Air Freight");
    expect(msg).toContain("Origin: Los Angeles");
    expect(msg).toContain("Destination: Shanghai");
    expect(msg).toContain("Details: 10 pallets, 2000 kg");
    expect(msg).toContain("Name: Maya");
    expect(msg).toContain("Company: D2C Brand");
    expect(msg).toContain("Email: maya@d2c.com");
    expect(msg).toContain("Phone: +447123456");
  });

  it("omits optional fields when empty", () => {
    const msg = buildQuoteMessage({
      ...baseValues,
      service: undefined,
      details: undefined,
      company: "",
      phone: "",
    });
    expect(msg).not.toContain("Service:");
    expect(msg).not.toContain("Details:");
    expect(msg).not.toContain("Company:");
    expect(msg).not.toContain("Phone:");
  });
});

describe("openWhatsApp", () => {
  it("opens a new window and returns true on success", () => {
    const openSpy = vi.spyOn(window, "open").mockReturnValue(null);
    const result = openWhatsApp("Hello!");
    expect(result).toBe(true);
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining("wa.me/"),
      "_blank",
      "noopener,noreferrer",
    );
    openSpy.mockRestore();
  });

  it("returns false when window.open throws", () => {
    vi.spyOn(window, "open").mockImplementation(() => {
      throw new Error("blocked");
    });
    const result = openWhatsApp("Hello!");
    expect(result).toBe(false);
    vi.restoreAllMocks();
  });
});
