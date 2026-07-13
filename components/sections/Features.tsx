"use client";

import { CONTENT } from "@/lib/config";
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
  return (
    <section id="features" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="text-xs text-text-secondary">Everything you need</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">Powerful Features</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              From system detection to Play Store integration — every aspect is automated and optimized.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={0.1 * (i % 3)}>
              <TiltCard maxTilt={8}>
                <div className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:glass-hover hover:border-border-hover h-full">
                  <div
                    className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.gradient} blur-[60px] transition-all duration-500 group-hover:scale-150`}
                  />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      {iconMap[feature.icon]}
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AdSlot slot="after-features" />
    </section>
  );
}
