"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { usePIPConfig } from "@/hooks/useRuntimeConfig";

function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]+)/,
    /(?:youtu\.be\/)([\w-]+)/,
    /(?:youtube-nocookie\.com\/embed\/)([\w-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&mute=1&playsinline=1&rel=0`;
  }
  return null;
}

export default function PIPVideoPlayer() {
  const pip = usePIPConfig();
  const embedUrl = useMemo(() => getYouTubeEmbedUrl(pip.videoUrl), [pip.videoUrl]);

  if (!pip.enabled) return null;

  return (
    <motion.div
      initial={{ x: 400, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-32px)]"
    >
      <div
        className="overflow-hidden rounded-xl border backdrop-blur-xl"
        style={{
          background: "rgba(103, 61, 230, 0.15)",
          borderColor: "rgba(103, 61, 230, 0.4)",
        }}
      >
        {/* Video / Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={pip.title}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative h-full w-full">
              <img
                src={pip.thumbnailUrl}
                alt={pip.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "rgba(103, 61, 230, 0.8)" }}
                >
                  <Play className="ml-0.5 h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-1">
            {pip.title}
          </h3>
          <p className="mt-1 text-xs text-white/60 line-clamp-1">
            {pip.description}
          </p>

          {/* CTA Row */}
          <div className="mt-3 flex items-center gap-2">
            <p className="flex-1 text-[11px] leading-tight text-white/50 line-clamp-2">
              {pip.ctaText}
            </p>
            <a
              href={pip.ctaUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#673de6" }}
            >
              {pip.ctaButton}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
