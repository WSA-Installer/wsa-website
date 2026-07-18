import type { BlogBlock } from "@/lib/config/blog";

function slugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function TableOfContents({ body }: { body: BlogBlock[] }) {
  const headings = body
    .map((b, i) => ({ b, i }))
    .filter(({ b }) => b.type === "h2")
    .map(({ b }) => {
      const text = (b as { text: string }).text;
      return { text, id: (b as { id?: string }).id || slugId(text) };
    });

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm">
      <p className="font-semibold text-text-primary mb-3 uppercase tracking-wider text-xs">On this page</p>
      <ul className="space-y-2 border-l border-border-primary pl-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-text-muted hover:text-accent-primary transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
