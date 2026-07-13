"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minimize2, Maximize2, Play, ExternalLink } from "lucide-react";
import config from "@/config.json";

const pip = config.pipVideo;

export default function PIPVideoPlayer() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = useCallback(() => setIsMinimized((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  if (!pip.enabled) return null;

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={toggleMinimize}
          className="group flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(103, 61, 230, 0.15)",
            borderColor: "rgba(103, 61, 230, 0.4)",
          }}
        >
          <Play className="h-6 w-6 text-white" />
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 400, opacity: 0, scale: 0.9 }}
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
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-semibold text-white/80">PIP Video</span>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMinimize}
                className="rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={close}
                className="rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Video Thumbnail */}
          <a
            href={pip.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block"
          >
            <img
              src={pip.thumbnailUrl}
              alt={pip.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{ background: "rgba(103, 61, 230, 0.8)" }}
              >
                <Play className="ml-0.5 h-6 w-6 text-white" />
              </div>
            </div>
          </a>

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
    </AnimatePresence>
  );
}
