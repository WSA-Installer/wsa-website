"use client";

import { useSiteConfig, useDownloadUrls, useContentConfig, usePIPConfig } from "@/hooks/useRuntimeConfig";
import { Download, Code2, Cpu, Settings2, Zap, Store, Shield, Terminal } from "lucide-react";
import Link from "next/link";
import AdFrame from "@/components/ui/AdFrame";
import Typewriter from "@/components/ui/Typewriter";
import VideoAdPlayer from "@/components/ui/VideoAdPlayer";

const featureIcons = [Cpu, Settings2, Zap, Store, Shield, Terminal];

const typewriterPhrases = [
  "Run Android Apps",
  "Install Play Store",
  "One Click Setup",
  "Smart System Scan",
  "Auto Configuration",
  "Parallel Downloads",
  "Background Service",
  "Self-Update System",
  "File Sharing via WebDAV",
  "Zero-Trust Security",
];

export default function HomePage() {
  const SITE = useSiteConfig();
  const CONTENT = useContentConfig();
  const downloads = useDownloadUrls();
  const pip = usePIPConfig();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-4 md:py-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[4fr_8fr] gap-8 items-center">
            <div className="text-center lg:text-left animate-slide-in-left">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-primary leading-tight flex flex-wrap items-baseline gap-x-3 gap-y-1">
                WSA <span className="text-accent-primary">Installer</span>
                <span className="inline-flex items-center rounded-full font-mono tracking-wider bg-accent-primary/10 text-accent-primary border border-accent-primary/20 text-[10px] font-bold px-2 py-0.5 align-middle shrink-0">
                  v{SITE.version}
                </span>
              </h1>
              <span className="block text-lg md:text-xl lg:text-2xl font-medium text-text-secondary mt-2">
                <Typewriter phrases={typewriterPhrases} className="text-accent-primary" />
              </span>

              <p className="mt-5 text-xs md:text-sm text-text-secondary max-w-xl mx-auto lg:mx-0">
                {SITE.description}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/downloads"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary bg-button-primary text-bg-primary hover:bg-button-primary-hover hover:shadow-glow px-4 py-2 text-xs gap-1.5"
                >
                  <Download className="w-5 h-5" />
                  Download Free ({downloads.installer.size})
                </Link>
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary bg-button-secondary text-text-primary border border-border-secondary hover:bg-button-secondary-hover hover:border-border-accent px-4 py-2 text-xs gap-1.5"
                >
                  <Code2 className="w-5 h-5" />
                  View on GitHub
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 justify-center lg:justify-start">
                {CONTENT.heroStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-base md:text-lg font-bold text-accent-primary font-mono">{stat.value}</div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative rounded-xl overflow-hidden border border-border-primary shadow-2xl box-glow">
                <div className="relative aspect-video">
                  <VideoAdPlayer
                    videoUrl={pip.videoUrl}
                    title="WSA Installer Demo"
                    className="absolute inset-0"
                  />
                </div>
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-accent-primary/50 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-accent-primary/50 rounded-br-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner Ad */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdFrame slot="hero-banner" format="banner" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 md:py-14 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Everything You Need</h2>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">
              A complete toolkit for installing and managing WSA on Windows
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SITE.features.map((title, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div
                  key={i}
                  className="animate-slide-up opacity-0"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
                >
                  <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                    <div className="p-6">
                      <div className="mb-4 text-accent-primary">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
                      <p className="text-sm text-text-secondary">
                        {typeof SITE.features[i] === "string" ? `Powerful ${title.toLowerCase()} capabilities for WSA management.` : title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
            <Link href="/features" className="text-accent-primary hover:underline">View all features →</Link>
            <Link href="/gallery" className="text-accent-primary hover:underline">See screenshots →</Link>
          </div>
        </div>
      </section>

      {/* After Features Ad */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdFrame slot="after-features" format="native" />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Why Choose WSA Installer?</h2>
            <div className="space-y-4 text-text-secondary">
              <p className="text-lg leading-relaxed">
                Installing Windows Subsystem for Android manually can be tedious and error-prone. WSA Installer gives you a one-click solution that handles everything from system checks to Play Store patching, with a clean graphical interface that puts you in control.
              </p>
              <p className="text-lg leading-relaxed">
                Built with performance and reliability in mind, WSA Installer automates the entire process with parallel chunked downloads, intelligent system configuration, and a zero-trust security architecture. Your data stays on your machine, and you stay in control.
              </p>
              <p className="text-lg leading-relaxed">
                See it in action in our <Link href="/gallery" className="text-accent-primary hover:underline">screenshots gallery</Link>, explore the <Link href="/features" className="text-accent-primary hover:underline">full feature set</Link>, or <Link href="/downloads" className="text-accent-primary hover:underline">download now</Link> to get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-secondary" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent-primary)/0.1,transparent_70%)]" />
            <div className="relative px-8 py-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Ready to install <span className="text-accent-primary">WSA</span>?
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
                Download WSA Installer today and get Android apps running on Windows in one click.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/downloads"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-button-primary text-bg-primary hover:bg-button-primary-hover hover:shadow-glow px-6 py-3 text-base gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download for Windows
                </Link>
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-button-secondary text-text-primary border border-border-secondary hover:bg-button-secondary-hover hover:border-border-accent px-6 py-3 text-base gap-2"
                >
                  <Code2 className="w-5 h-5" />
                  View on GitHub
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-text-muted">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-status-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Free for personal use
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-status-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Open source
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-status-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  MIT License
                </span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-accent-primary/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-accent-primary/20 rounded-br-2xl" />
        </div>
      </section>
    </>
  );
}
