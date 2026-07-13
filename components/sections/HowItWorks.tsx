"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONTENT, MONETIZATION } from "@/lib/config";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  Download, Shield, Search, HardDrive, Store, CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Download: <Download className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Search: <Search className="h-5 w-5" />,
  HardDrive: <HardDrive className="h-5 w-5" />,
  Store: <Store className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
};

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="text-xs text-text-secondary">Simple 6-step process</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">How It Works</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              From download to Android apps — the complete workflow in six simple steps.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-20">
          <motion.div
            className="absolute left-[31px] top-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden md:block origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-0">
            {CONTENT.howItWorks.map((step, i) => (
              <ScrollReveal key={step.step} delay={0.1 * i} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`relative flex flex-col gap-6 md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="hidden md:flex md:w-1/2 items-center">
                    <div className={i % 2 === 0 ? "text-right" : "text-left"}>
                      <motion.div
                        className={`inline-block rounded-2xl glass p-6 max-w-lg ${i % 2 === 0 ? "ml-auto" : ""}`}
                        whileHover={{ y: -2, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex md:w-0 items-center justify-center">
                    <motion.div
                      className="relative z-10 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full glass border border-border"
                      whileHover={{ scale: 1.1, borderColor: "rgba(0,120,212,0.3)" }}
                    >
                      {iconMap[step.icon]}
                    </motion.div>
                  </div>

                  <div className="md:hidden">
                    <div className="rounded-2xl glass p-6">
                      <div className="mb-2 inline-flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary">Step {step.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex md:w-1/2 items-center">
                    <div className={i % 2 === 0 ? "text-left" : "text-right"}>
                      <span className="inline-block text-7xl font-bold text-text-tertiary/10">
                        {String(step.step).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {MONETIZATION.adPlacements.find(a => a.slot === "after-how-it-works")?.enabled && (
        <div className="mx-auto mt-12 max-w-7xl px-4" id="ad-after-how-it-works" />
      )}
    </section>
  );
}
