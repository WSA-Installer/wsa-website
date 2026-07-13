"use client";

import { CONTENT } from "@/lib/config";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CheckCircle2 } from "lucide-react";

export default function Requirements() {
  return (
    <section id="requirements" className="relative border-t border-border py-24 md:pl-16 lg:pl-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full md:max-w-[50%] text-left">
          <ScrollReveal>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
                <span className="text-xs text-text-secondary">What you need</span>
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="text-gradient">System Requirements</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                WSA Installer works on most modern Windows PCs. Check the requirements below.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 w-full md:max-w-[50%] grid gap-8 grid-cols-1">
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl glass p-8">
              <h3 className="text-lg font-semibold text-text-primary">Minimum & Recommended</h3>
              <div className="mt-6 space-y-4">
                {Object.values(CONTENT.systemRequirements).map((req) => (
                  <div key={req.label} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-xs font-bold text-primary">✓</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm font-medium text-text-primary">{req.label}</span>
                        <span className="text-xs text-text-tertiary">{req.min}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-accent">Recommended: {req.rec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-2xl glass p-8">
              <h3 className="text-lg font-semibold text-text-primary">Windows Features Handled</h3>
              <p className="mt-2 text-sm text-text-secondary">
                The installer automatically enables these Windows features:
              </p>
              <div className="mt-6 space-y-4">
                {CONTENT.windowsFeatures.map((feature) => (
                  <div key={feature.name} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <div>
                      <span className="text-sm font-medium text-text-primary">{feature.name}</span>
                      <p className="mt-0.5 text-xs text-text-secondary">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-border bg-bg-secondary/50 p-4">
                <p className="text-xs text-text-secondary">
                  Virtualization (Intel VT-x or AMD-V) must be enabled in BIOS/UEFI. The installer detects this automatically via 5 methods including CPUID, wmic, systeminfo, PowerShell, and registry checks.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
