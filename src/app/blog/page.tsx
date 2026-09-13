import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights and guides on international shipping, customs clearance, supply chain strategy, and logistics optimization.",
};

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <Badge>Blog</Badge>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
              Logistics insights & shipping guides
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Expert advice on freight shipping, customs compliance, supply chain optimization,
              and growing your business internationally.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Badge>{post.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock aria-hidden className="size-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-ink-900 group-hover:text-brand-700">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar aria-hidden className="size-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
                      >
                        Read more
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
