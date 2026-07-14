"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContentConfig } from "@/hooks/useRuntimeConfig";
import { Monitor, Cpu, Download, Store, CheckCircle2, FolderOpen, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DeviceMockup = dynamic(() => import("@/components/three/DeviceMockup"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center rounded-2xl glass">
      <div className="h-8 w-8 animate-pulse rounded-full bg-primary/30" />
    </div>
  ),
});

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Download: <Download className="h-5 w-5" />,
  Store: <Store className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
  FolderOpen: <FolderOpen className="h-5 w-5" />,
};

const screenshotUrls = [
  "/images/screenshot-welcome.png",
  "/images/screenshot-system-check.png",
  "/images/screenshot-install-progress.png",
  "/images/screenshot-play-store.png",
  "/images/screenshot-complete.png",
  "/images/screenshot-webdav.png",
];

export default function Gallery() {
  const CONTENT = useContentConfig();
  const [activeStep, setActiveStep] = useState(0);
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
              <span className="text-gradient">Screens & Experience</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Explore the guided 5-step wizard with real-time progress, glassmorphism UI, and WebDAV file sharing. Click any screen card below to view it on the 3D model.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive 3D Mockup */}
        <ScrollReveal delay={0.2}>
          <div className="relative mt-12 overflow-hidden rounded-3xl glass p-2">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-card">
              <DeviceMockup activeStep={activeStep} />
            </div>

            {/* View Fullscreen Overlay Button */}
            <button
              onClick={() => setFullscreenImage(screenshotUrls[activeStep])}
              className="absolute bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all hover:bg-primary hover:border-primary/20 hover:scale-105 active:scale-95 shadow-lg"
              title="View screenshot in full size"
            >
              <Maximize2 className="h-4.5 w-4.5" />
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-text-tertiary">
            Interactive 3D model — Hover to rotate and interact. Click cards below to cycle screen contents.
          </p>
        </ScrollReveal>

        {/* Screen Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.screens.map((s, i) => {
            const isActive = activeStep === i;
            return (
              <ScrollReveal key={s.title} delay={0.1 * i}>
                <div
                  onClick={() => setActiveStep(i)}
                  className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 cursor-pointer shadow-md select-none ${
                    isActive
                      ? "bg-primary/5 scale-[1.02]"
                      : "bg-bg-card/30 hover:bg-bg-card/50"
                  }`}
                  style={{
                    borderColor: isActive ? "rgba(103, 61, 230, 0.4)" : "rgba(255, 255, 255, 0.05)",
                    boxShadow: isActive ? "0 10px 30px -10px rgba(103, 61, 230, 0.15)" : "none",
                  }}
                >
                  {/* Glowing corner indicator */}
                  <div
                    className={`absolute -top-20 -right-20 h-40 w-40 rounded-full blur-[60px] transition-all duration-500 ${
                      isActive ? "bg-primary/15" : "bg-primary/0 group-hover:bg-primary/5"
                    }`}
                  />
                  
                  <div className="relative z-10">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {iconMap[s.icon]}
                    </div>
                    
                    <div className="mb-2">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-accent"
                        }`}
                      >
                        {s.phase}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-semibold text-text-primary transition-colors duration-300 group-hover:text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
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
              onClick={(e) => e.stopPropagation()} // prevent modal close on clicking image
            >
              <img
                src={fullscreenImage}
                alt="WSA Installer Screen Fullscreen"
                className="h-full w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
