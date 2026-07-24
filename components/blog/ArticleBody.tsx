import type { BlogBlock } from "@/lib/config/blog";
import InArticleAd from "@/components/ui/InArticleAd";

function slugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ArticleBody({ body }: { body: BlogBlock[] }) {
  let paragraphCount = 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-5">
        {body.map((block, i) => {
          const elements: React.ReactNode[] = [];

          if (block.type === "p") {
            paragraphCount++;
          }

          switch (block.type) {
            case "h2":
              elements.push(
                <h2
                  key={i}
                  id={block.id || slugId(block.text)}
                  className="text-xl md:text-2xl font-bold text-text-primary mt-10 mb-3 scroll-mt-28"
                >
                  {block.text}
                </h2>
              );
              break;
            case "h3":
              elements.push(
                <h3 key={i} className="text-lg font-semibold text-text-primary mt-6 mb-2">
                  {block.text}
                </h3>
              );
              break;
            case "p":
              elements.push(
                <p key={i} className="text-base leading-relaxed text-text-secondary">
                  {block.text}
                </p>
              );
              break;
            case "code":
              elements.push(
                <pre
                  key={i}
                  className="rounded-xl border border-border-primary bg-bg-primary/80 p-4 overflow-x-auto text-sm font-mono text-text-primary"
                >
                  <code>{block.code}</code>
                </pre>
              );
              break;
            case "list":
              elements.push(
                <ul key={i} className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-base text-text-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
              break;
            case "callout": {
              const tone =
                block.tone === "warning"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                  : block.tone === "tip"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : "border-accent-primary/40 bg-accent-primary/10 text-text-primary";
              elements.push(
                <div key={i} className={`rounded-xl border p-4 text-sm leading-relaxed ${tone}`}>
                  {block.text}
                </div>
              );
              break;
            }
            case "quote":
              elements.push(
                <blockquote
                  key={i}
                  className="border-l-2 border-accent-primary pl-4 italic text-text-secondary"
                >
                  <p className="text-base">"{block.text}"</p>
                  {block.author && (
                    <footer className="mt-1 text-xs text-text-muted not-italic">— {block.author}</footer>
                  )}
                </blockquote>
              );
              break;
            case "img":
              elements.push(
                <figure key={i} className="my-6">
                  <div className="h-48 rounded-xl bg-gradient-to-br from-accent-primary/15 to-bg-tertiary border border-border-primary" />
                  {block.caption && (
                    <figcaption className="mt-2 text-center text-xs text-text-muted">{block.caption}</figcaption>
                  )}
                </figure>
              );
              break;
            default:
              return null;
          }

          if (block.type === "p" && paragraphCount > 0 && paragraphCount % 4 === 0) {
            elements.push(<InArticleAd key={`ad-${i}`} />);
          }

          return elements;
        })}
      </div>
    </div>
  );
}
