import type { Metadata } from "next";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-gray-50 py-24">
      <Container className="text-center">
        <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-brand-700">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-ink-900">
          This page shipped to the wrong address
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on the road.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/">
            <Home aria-hidden className="size-5" />
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary">
            <ArrowLeft aria-hidden className="size-5" />
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
