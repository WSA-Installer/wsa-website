"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContentConfig } from "@/hooks/useRuntimeConfig";
import { Monitor, Cpu, Download, Store, CheckCircle2, FolderOpen, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Download: <Download className="h-5 w-5" />,
  Store: <Store className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
  FolderOpen: <FolderOpen className="h-5 w-5" />,
};

export default function Gallery() {
  const CONTENT = useContentConfig();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="text-xs text-text-secondary">See it in action</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">Screenshots</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Browse through the WSA Installer interface — from the welcome screen to Play Store patching and file sharing.
            </p>
          </div>
        </ScrollReveal>

        {/* Screenshot Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CONTENT.screens.map((s, i) => (
            <ScrollReveal key={s.title} delay={0.05 * i}>
              <div
                onClick={() => setFullscreenImage(`/images/${s.image}`)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card/30 cursor-pointer transition-all duration-300 hover:bg-bg-card/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={`/images/${s.image}`}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button
                  onClick={(e) => { e.stopPropagation(); setFullscreenImage(`/images/${s.image}`); }}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/80">
                    {s.phase}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-xs text-white/60 line-clamp-2">{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute right-6 top-6 z-[100000] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenImage}
                alt="WSA Installer Screenshot"
                className="h-full w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}