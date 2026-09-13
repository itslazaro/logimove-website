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
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1",
          onDark ? "ring-white/15" : "ring-ink-900/10",
        )}
      >
        <Image
          src="/logo.png"
          alt={`${site.name} logo`}
          width={64}
          height={64}
          className="size-9 object-contain"
        />
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
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
