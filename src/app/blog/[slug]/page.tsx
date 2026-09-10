import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-like rendering (converts ## headings and paragraphs)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) {
          elements.push(
            <p key={elements.length} className="mb-4 text-gray-600 leading-relaxed">
              {text}
            </p>,
          );
        }
        currentParagraph = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushParagraph();
        elements.push(
          <h2
            key={elements.length}
            className="mt-8 mb-4 font-display text-2xl font-bold text-ink-900"
          >
            {trimmed.slice(3)}
          </h2>,
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph();
        elements.push(
          <h3
            key={elements.length}
            className="mt-6 mb-3 font-display text-xl font-bold text-ink-900"
          >
            {trimmed.slice(4)}
          </h3>,
        );
      } else if (trimmed.startsWith("- ")) {
        flushParagraph();
        elements.push(
          <li
            key={elements.length}
            className="ml-6 mb-2 list-disc text-gray-600 leading-relaxed"
          >
            {trimmed.slice(2)}
          </li>,
        );
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        flushParagraph();
        elements.push(
          <p key={elements.length} className="mb-4 font-semibold text-ink-900">
            {trimmed.slice(2, -2)}
          </p>,
        );
      } else if (trimmed === "") {
        flushParagraph();
      } else {
        currentParagraph.push(trimmed);
      }
    }

    flushParagraph();
    return elements;
  };

  // Find adjacent posts for navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <article>
        {/* Header */}
        <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
          <Container>
            <Reveal>
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-brand-700"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Back to Blog
              </Link>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge>{post.category}</Badge>
                <span className="flex items-center gap-1.5 text-sm text-gray-400">
                  <Calendar aria-hidden className="size-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-400">
                  <Clock aria-hidden className="size-4" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl">
                {post.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
                {post.excerpt}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Cover image */}
        <Container className="relative -mt-10 sm:-mt-12">
          <Reveal delay={0.05}>
            <div className="relative mx-auto h-64 w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg sm:h-80">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>

        {/* Content */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Reveal delay={0.1}>
                <div className="prose prose-gray max-w-none">{renderContent(post.content)}</div>
              </Reveal>

              {/* Tags */}
              <Reveal delay={0.15}>
                <div className="mt-12 border-t border-gray-100 pt-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag aria-hidden className="size-4 text-gray-400" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Post navigation */}
              <Reveal delay={0.2}>
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group rounded-2xl border border-gray-200 p-5 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
                    >
                      <span className="text-xs font-medium text-gray-400">Previous</span>
                      <p className="mt-1 font-display text-sm font-bold text-ink-900 group-hover:text-brand-700">
                        {prevPost.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group rounded-2xl border border-gray-200 p-5 text-right transition-colors hover:border-brand-200 hover:bg-brand-50/50"
                    >
                      <span className="text-xs font-medium text-gray-400">Next</span>
                      <p className="mt-1 font-display text-sm font-bold text-ink-900 group-hover:text-brand-700">
                        {nextPost.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </article>

      <CtaSection />
    </>
  );
}
