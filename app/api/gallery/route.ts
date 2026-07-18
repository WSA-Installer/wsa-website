import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join, extname } from "path";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".svg"]);

const EXCLUDED_FILES = new Set([
  "logo-32.png",
  "logo-64.png",
  "logo-192.png",
  "favicon.ico",
  "apple-touch-icon.png",
]);

export async function GET() {
  try {
    const dir = join(process.cwd(), "public", "demo-images");
    const images: { src: string; name: string; folder: string }[] = [];

    function scan(subdir: string) {
      const full = subdir ? join(dir, subdir) : dir;
      let entries;
      try {
        entries = readdirSync(full, { withFileTypes: true });
      } catch {
        return;
      }
      for (const entry of entries) {
        if (entry.isDirectory()) {
          scan(subdir ? `${subdir}/${entry.name}` : entry.name);
        } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
          if (EXCLUDED_FILES.has(entry.name.toLowerCase())) continue;
          const folder = subdir || "";
          images.push({
            src: `/demo-images/${folder ? folder + "/" : ""}${entry.name}`,
            name: entry.name.replace(/\.[^.]+$/, ""),
            folder,
          });
        }
      }
    }

    scan("");
    images.sort((a, b) => a.src.localeCompare(b.src));

    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}
