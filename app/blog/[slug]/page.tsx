"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { getPostBySlug, getRelatedPosts } from "@/lib/config/blog";
import ArticleBody from "@/components/blog/ArticleBody";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogCard from "@/components/blog/BlogCard";
import AdFrame from "@/components/ui/AdFrame";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = params instanceof Promise ? use(params) : params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const related = getRelatedPosts(post, 3);

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-text-muted">
            <Link href="/blog" className="hover:text-accent-primary transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">{post.title}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
            <article>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                {post.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                <span className="font-mono">{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
                {post.author && (
                  <>
                    <span>·</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-accent-primary/10 px-2 py-0.5 text-[11px] font-medium text-accent-primary border border-accent-primary/20"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Cover */}
              <div
                className={`relative mt-6 h-52 md:h-64 rounded-xl overflow-hidden border border-border-primary shadow-2xl box-glow bg-gradient-to-br ${post.gradient || "from-accent-primary/20 to-bg-tertiary"}`}
              >
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
              </div>

              {/* Series nav */}
              {post.series && (
                <div className="mt-8 rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary p-5">
                  <p className="text-sm font-semibold text-accent-primary">
                    {post.series.name} — Part {post.series.part} of {post.series.total}
                  </p>
                  <ol className="mt-3 space-y-1 text-sm">
                    {post.series.posts.map((sp) => (
                      <li key={sp.slug}>
                        {sp.slug === post.slug ? (
                          <span className="text-text-primary font-medium">{sp.title} (you are here)</span>
                        ) : (
                          <Link href={`/blog/${sp.slug}`} className="text-text-secondary hover:text-accent-primary transition-colors">
                            {sp.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Body */}
              <div className="mt-8">
                <ArticleBody body={post.body} />
              </div>

              {/* Ad after body */}
              <div className="mt-10">
                <AdFrame slot="after-blog-post" format="banner" />
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-semibold text-text-primary mb-6">Related Posts</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {related.map((rp) => (
                      <BlogCard key={rp.slug} post={rp} />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-accent-primary hover:underline"
                >
                  ← Back to all posts
                </Link>
              </div>
            </article>

            {/* TOC sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents body={post.body} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
