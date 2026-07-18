import Link from "next/link";
import type { BlogPost } from "@/lib/config/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent-primary/40 hover:shadow-glow-subtle"
    >
      <div className={`relative h-40 bg-gradient-to-br ${post.gradient || "from-accent-primary/20 to-bg-tertiary"}`}>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-text-primary/90 backdrop-blur-sm"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs text-text-muted font-mono">{post.date} · {post.readTime}</div>
        <h3 className="mt-2 text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  );
}
