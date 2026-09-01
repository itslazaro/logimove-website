import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: boolean;
  className?: string;
  /** Light variant for use on dark surfaces. */
  onDark?: boolean;
}

export function Logo({ href = true, className, onDark = false }: LogoProps) {
  const content = (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
        <Image
          src="/logo.png"
          alt={`${site.name} logo`}
          width={1024}
          height={1024}
          className="size-8 object-contain"
        />
      </span>
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tight",
          onDark ? "text-white" : "text-ink-900",
        )}
      >
        {site.name}
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href="/" className="inline-flex" aria-label={`${site.name} — home`}>
      {content}
    </Link>
  );
}
