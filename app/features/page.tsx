"use client";

import { useContentConfig, usePIPConfig } from "@/hooks/useRuntimeConfig";
import Link from "next/link";
import {
  Cpu, Settings2, Zap, Store, Download, Wrench, Activity, RefreshCw,
  FolderOpen, Shield, Package, Terminal, Search, HardDrive, CheckCircle2,
} from "lucide-react";
import AdFrame from "@/components/ui/AdFrame";
import VideoAdPlayer from "@/components/ui/VideoAdPlayer";

const iconMap: Record<string, React.ElementType> = {
  Cpu, Settings2, Zap, Store, Download, Wrench, Activity, RefreshCw,
  FolderOpen, Shield, Package, Terminal, Search, HardDrive, CheckCircle2,
};

const categories = [
  { id: "smart-system", label: "Smart System" },
  { id: "installation", label: "Installation" },
  { id: "patching", label: "Play Store" },
  { id: "security", label: "Security" },
  { id: "automation", label: "Automation" },
  { id: "integration", label: "Integration" },
];

export default function FeaturesPage() {
  const CONTENT = useContentConfig();
  const pip = usePIPConfig();

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Features</h1>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">
              Everything you need to install and manage WSA, all in one place
            </p>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-3 py-1.5 text-sm rounded-full border border-border-secondary text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-colors"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="py-10 md:py-14 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Smart System Detection</h2>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Automatic hardware and feature detection</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT.features.slice(0, 4).map((f, i) => {
              const Icon = iconMap[f.icon] || Cpu;
              return (
                <div key={i} className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                  <div className="p-5">
                    <div className="mb-3 text-accent-primary"><Icon className="w-6 h-6" /></div>
                    <h3 className="font-semibold text-text-primary mb-1">{f.title}</h3>
                    <p className="text-sm text-text-secondary">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video */}
      {pip.videoUrl && (
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border-primary shadow-2xl">
                <VideoAdPlayer
                  videoUrl={pip.videoUrl}
                  title="WSA Installer Demo"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ad */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdFrame slot="after-features" format="banner" />
        </div>
      </section>

      <section className="py-10 md:py-14 scroll-mt-28 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Installation & Downloads</h2>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Parallel chunked downloads with resume support</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT.features.slice(4, 8).map((f, i) => {
              const Icon = iconMap[f.icon] || Download;
              return (
                <div key={i} className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                  <div className="p-5">
                    <div className="mb-3 text-accent-primary"><Icon className="w-6 h-6" /></div>
                    <h3 className="font-semibold text-text-primary mb-1">{f.title}</h3>
                    <p className="text-sm text-text-secondary">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Security & Integration</h2>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Zero-trust architecture and seamless integration</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT.features.slice(8, 12).map((f, i) => {
              const Icon = iconMap[f.icon] || Shield;
              return (
                <div key={i} className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                  <div className="p-5">
                    <div className="mb-3 text-accent-primary"><Icon className="w-6 h-6" /></div>
                    <h3 className="font-semibold text-text-primary mb-1">{f.title}</h3>
                    <p className="text-sm text-text-secondary">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/gallery" className="group">
              <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">Screenshots</h3>
                  <p className="text-sm text-text-secondary">See WSA Installer in action with screenshots of every feature.</p>
                </div>
              </div>
            </Link>
            <Link href="/downloads" className="group">
              <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">Download</h3>
                  <p className="text-sm text-text-secondary">Get WSA Installer for free. Open source under MIT License.</p>
                </div>
              </div>
            </Link>
            <Link href="/docs" className="group">
              <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">Documentation</h3>
                  <p className="text-sm text-text-secondary">Read the docs for installation guides and troubleshooting.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Ready to get started?</h2>
            <p className="text-text-secondary mb-6">Download WSA Installer and take control of Android on Windows today.</p>
            <a href="/downloads" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-button-primary text-bg-primary hover:bg-button-primary-hover hover:shadow-glow transition-all">
              Download Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
