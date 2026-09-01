/**
 * Single source of truth for operational site configuration.
 * Change values here — never in component logic.
 */
export const site = {
  name: "LogiMove",
  legalName: "LogiMove Logistics",
  tagline: "Moving your world, reliably.",
  description:
    "LogiMove is an international logistics company offering air freight, ocean freight, road transport, warehousing, and customs clearance — with fast, personal service on WhatsApp.",

  /** Official WhatsApp Click-to-Chat requires digits only (country code + number). */
  whatsappNumber: "12345550199",
  whatsappDisplay: "+1 234 555-0199",

  email: "hello@logimove.example.com",
  phone: "+1 234 555-0199",
  address: "1200 Harbor Blvd, Suite 300, Long Beach, CA 90802, USA",

  siteUrl: "https://logimove.example.com",

  social: {
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof site;
