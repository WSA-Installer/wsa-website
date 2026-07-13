"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/config";
import { useDownloadUrls } from "@/hooks/useRuntimeConfig";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Download, Code2, ChevronDown, Play, Star } from "lucide-react";

const words = ["Run Android Apps", "Install Play Store", "One Click Away"];

export default function Hero() {
  const downloads = useDownloadUrls();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length - 1));
    } else {
      setDisplayText(currentWord.substring(0, displayText.length + 1));
    }
  }, [wordIndex, isDeleting, displayText]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting]);

  useEffect(() => {
    if (!isDeleting && displayText === words[wordIndex]) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-gradient rounded-full opacity-[0.08] blur-[150px]" style={{ background: "radial-gradient(circle, #0078d4 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 animate-gradient rounded-full opacity-[0.06] blur-[130px]" style={{ background: "radial-gradient(circle, #00bcd4 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <ScrollReveal delay={0.1}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-text-secondary">
              v{SITE.version} — WSA {SITE.wsaBuild}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{SITE.name}</span>
            <br />
            <span className="text-text-primary">
              {displayText}
              <span className="ml-0.5 inline-block h-[1em] w-[3px] animate-pulse bg-primary" />
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {SITE.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton>
              <Button variant="primary" size="lg" href={downloads.installer.url} download>
                <Download className="h-5 w-5" />
                Download Installer ({downloads.installer.size})
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="secondary" size="lg" href={SITE.githubUrl}>
                <Code2 className="h-5 w-5" />
                View on GitHub
              </Button>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-text-tertiary">
            {SITE.badges.map((badge, i) => (
              <span key={badge} className="flex items-center gap-1.5">
                {i === 0 && <Star className="h-3 w-3" />}
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="mt-16 flex items-center justify-center gap-8">
            <a href={SITE.manualGuideUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass transition-all duration-300 group-hover:glass-hover group-hover:scale-105">
                <Play className="h-6 w-6 text-red-500" />
              </div>
              <span className="text-xs text-text-tertiary">Video Guide</span>
            </a>
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass transition-all duration-300 group-hover:glass-hover group-hover:scale-105">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs text-text-tertiary">Open Source</span>
            </a>
            <a href={downloads.bundle.url} download className="group flex flex-col items-center gap-1.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass transition-all duration-300 group-hover:glass-hover group-hover:scale-105">
                <Download className="h-6 w-6 text-accent" />
              </div>
              <span className="text-xs text-text-tertiary">Offline Bundle</span>
            </a>
          </div>
        </ScrollReveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-text-tertiary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
