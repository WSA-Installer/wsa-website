"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONTENT } from "@/lib/config";
import { AdSlot } from "@/components/ui/AdSlot";
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
    <section id="how-it-works" className="relative border-t border-border py-24 md:pl-16 lg:pl-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="w-full md:max-w-[50%] text-left">
          <ScrollReveal>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
                <span className="text-xs text-text-secondary">Simple 6-step process</span>
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="text-gradient">How It Works</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                From download to Android apps — the complete workflow in six simple steps.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative mt-20 w-full md:max-w-[50%]">
          <motion.div
            className="absolute left-[31px] top-0 bottom-12 w-px bg-gradient-to-b from-primary via-accent to-transparent origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-4">
            {CONTENT.howItWorks.map((step, i) => (
              <ScrollReveal key={step.step} delay={0.08 * i} direction="left">
                <div className="relative flex gap-8 items-start pb-12">
                  {/* Step Connector Node */}
                  <div className="absolute left-0 top-0 flex items-center justify-center">
                    <motion.div
                      className="relative z-10 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full glass border border-border"
                      whileHover={{ scale: 1.1, borderColor: "rgba(0,120,212,0.3)" }}
                    >
                      {iconMap[step.icon]}
                    </motion.div>
                  </div>

                  {/* Step Content Card */}
                  <div className="pl-20 flex-1">
                    <div className="rounded-2xl glass p-6 transition-all duration-300 hover:glass-hover">
                      <div className="mb-2 inline-flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary">Step {step.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:max-w-[50%]">
        <AdSlot slot="after-how-it-works" />
      </div>
    </section>
  );
}
