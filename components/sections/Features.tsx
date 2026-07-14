"use client";

import { useContentConfig } from "@/hooks/useRuntimeConfig";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import { AdSlot } from "@/components/ui/AdSlot";
import {
  Cpu, Settings2, Zap, Store, Download as DownloadIcon,
  Wrench, Activity, RefreshCw, FolderOpen, Shield, Package, Terminal,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="h-6 w-6" />,
  Settings2: <Settings2 className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Store: <Store className="h-6 w-6" />,
  Download: <DownloadIcon className="h-6 w-6" />,
  Wrench: <Wrench className="h-6 w-6" />,
  Activity: <Activity className="h-6 w-6" />,
  RefreshCw: <RefreshCw className="h-6 w-6" />,
  FolderOpen: <FolderOpen className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Package: <Package className="h-6 w-6" />,
  Terminal: <Terminal className="h-6 w-6" />,
};

export default function Features() {
  const CONTENT = useContentConfig();
  return (
    <section id="features" className="relative border-t border-border py-24 md:pl-16 lg:pl-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full md:max-w-[50%] text-left">
          <ScrollReveal>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
                <span className="text-xs text-text-secondary">Everything you need</span>
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="text-gradient">Powerful Features</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                From system detection to Play Store integration — every aspect is automated and optimized.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_480px]">
          <div className="grid gap-6 sm:grid-cols-2">
            {CONTENT.features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={0.1 * (i % 2)}>
                <TiltCard maxTilt={12} glare={true}>
                  <div 
                    className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:glass-hover hover:border-border-hover h-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.gradient} blur-[60px] transition-all duration-500 group-hover:scale-150`}
                    />
                    <div className="relative z-10" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                      <div 
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        {iconMap[feature.icon]}
                      </div>
                      <h3 
                        className="text-lg font-semibold text-text-primary"
                        style={{ transform: "translateZ(25px)" }}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className="mt-2 text-sm leading-relaxed text-text-secondary"
                        style={{ transform: "translateZ(15px)" }}
                      >
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="right" className="hidden lg:block">
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 blur-2xl" />
                <img
                  src="/images/feature-preview.png"
                  alt="WSA Installer app interface preview"
                  className="relative w-full rounded-2xl shadow-2xl"
                />
              </div>
              <p className="mt-4 text-center text-xs text-text-tertiary">
                Live installation progress — real-time speed, ETA, and chunk tracking
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="w-full md:max-w-[50%]">
        <AdSlot slot="after-features" />
      </div>
    </section>
  );
}
