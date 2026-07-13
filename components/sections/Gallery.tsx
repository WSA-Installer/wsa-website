"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CONTENT } from "@/lib/config";
import { Monitor, Cpu, Download, Store, CheckCircle2, FolderOpen } from "lucide-react";

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

export default function Gallery() {
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
              A guided 5-step wizard with real-time progress, glassmorphism UI, and seamless automation.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive 3D Mockup */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 overflow-hidden rounded-3xl glass p-2">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-card">
              <DeviceMockup />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-text-tertiary">
            Interactive 3D model — hover and drag to rotate
          </p>
        </ScrollReveal>

        {/* Screen Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.screens.map((s, i) => (
            <ScrollReveal key={s.title} delay={0.1 * i}>
              <div className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:glass-hover cursor-default">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 blur-[60px] transition-all duration-500 group-hover:bg-primary/10" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {iconMap[s.icon]}
                  </div>
                  <div className="mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {s.phase}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
