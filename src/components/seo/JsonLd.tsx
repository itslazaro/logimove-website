import { site } from "@/config/site";
import { services } from "@/content/services";

/**
 * JSON-LD structured data for SEO.
 * Renders Organization, LocalBusiness, and Service schemas.
 */
export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.siteUrl,
    logo: `${site.siteUrl}/logo.png`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1200 Harbor Blvd, Suite 300",
      addressLocality: "Long Beach",
      addressRegion: "CA",
      postalCode: "90802",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [site.social.linkedin, site.social.instagram, site.social.facebook],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: site.siteUrl,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1200 Harbor Blvd, Suite 300",
      addressLocality: "Long Beach",
      addressRegion: "CA",
      postalCode: "90802",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.7701,
      longitude: -118.1937,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 33.7701,
        longitude: -118.1937,
      },
      geoRadius: "50000",
    },
  };

  const serviceSchemas = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: site.name,
    },
    areaServed: "Worldwide",
    serviceType: service.name,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
