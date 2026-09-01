import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const socialIcons = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.facebook, label: "Facebook", Icon: Facebook },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 text-gray-100">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <Logo onDark />
            <p className="mt-4 text-sm leading-relaxed text-gray-500">{site.description}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-500 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.code}>
                  <Link href="/services" className="text-sm text-gray-500 transition-colors hover:text-white">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2.5">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <a href={`tel:${site.phone}`} className="hover:text-white">
                  {site.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span>{site.address}</span>
              </li>
            </ul>
            <ul className="mt-5 flex gap-3">
              {socialIcons.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-gray-200/20 text-gray-400 transition-colors hover:border-brand-500 hover:text-brand-400"
                  >
                    <Icon aria-hidden className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-200/10 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
