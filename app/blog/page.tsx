"use client";

import { useState, useMemo } from "react";
import { BLOG_POSTS, getAllTags } from "@/lib/config/blog";
import BlogCard from "@/components/blog/BlogCard";
import TagFilter from "@/components/blog/TagFilter";
import AdFrame from "@/components/ui/AdFrame";

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const tags = getAllTags();

  const filtered = useMemo(() => {
    if (activeTag === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Blog</h1>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">
              Guides, deep-dives &amp; tutorials for WSA and WSA Installer — from architecture to troubleshooting.
            </p>
          </div>

          <TagFilter tags={tags} active={activeTag} onChange={setActiveTag} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-text-secondary">
              <p>No posts found for #{activeTag}.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdFrame slot="after-blog" format="banner" />
        </div>
      </section>
    </>
  );
}
