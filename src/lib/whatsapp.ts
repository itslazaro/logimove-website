import { site } from "@/config/site";

export interface ContactFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export interface QuoteFormValues {
  service?: string;
  origin: string;
  destination: string;
  details?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

/** Builds an official WhatsApp Click-to-Chat URL for the configured number. */
export function buildWhatsAppUrl(message: string): string {
  const digits = site.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Structured pre-filled message for the contact form. */
export function buildContactMessage(values: ContactFormValues): string {
  const lines = [
    `Hello ${site.name}! I'd like to get in touch.`,
    "",
    `Name: ${values.name}`,
    values.company ? `Company: ${values.company}` : null,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    "",
    "Message:",
    values.message,
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}

/** Structured pre-filled message for a quote request. */
export function buildQuoteMessage(values: QuoteFormValues): string {
  const lines = [
    `Hello ${site.name}! I'd like to request a quote.`,
    "",
    values.service ? `Service: ${values.service}` : null,
    `Origin: ${values.origin}`,
    `Destination: ${values.destination}`,
    values.details ? `Details: ${values.details}` : null,
    "",
    `Name: ${values.name}`,
    values.company ? `Company: ${values.company}` : null,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}

/** Opens the pre-filled WhatsApp chat for a message. Returns false if it fails. */
export function openWhatsApp(message: string): boolean {
  try {
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  } catch {
    return false;
  }
}
