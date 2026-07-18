"use client";

import { useSiteConfig, useDownloadUrls, useMonetizationConfig, useContentConfig, usePIPConfig } from "@/hooks/useRuntimeConfig";
import { Download, Shield, Zap, Coffee } from "lucide-react";
import Link from "next/link";
import AdFrame from "@/components/ui/AdFrame";
import VideoAdPlayer from "@/components/ui/VideoAdPlayer";

export default function DownloadsPage() {
  const SITE = useSiteConfig();
  const CONTENT = useContentConfig();
  const downloads = useDownloadUrls();
  const MONETIZATION = useMonetizationConfig();
  const pip = usePIPConfig();

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Download WSA Installer</h1>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Choose your preferred download method</p>
          </div>

          <div className="text-center mb-8">
            <span className="inline-flex items-center rounded-full font-mono tracking-wider px-2.5 py-0.5 text-xs font-medium bg-accent-primary/10 text-accent-primary border border-accent-primary/20 mb-2">
              Latest Release
            </span>
            <h2 className="text-2xl font-bold text-text-primary">v{SITE.version}</h2>
            <p className="text-sm text-text-muted mt-1">WSA Build {SITE.wsaBuild}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-6 h-6 text-accent-primary" />
                  <h3 className="text-lg font-semibold text-text-primary">WSA Installer Setup</h3>
                </div>
                <div className="space-y-3">
                  <a
                    href={downloads.installer.url}
                    download
                    className="flex items-center justify-between p-3 rounded-lg border border-border-primary hover:border-accent-primary/50 hover:bg-bg-hover transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-text-primary group-hover:text-accent-primary transition-colors">{downloads.installer.label}</div>
                      <div className="text-xs text-text-muted">Full installer with all features</div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <Download className="w-5 h-5 text-text-muted" />
                      <div className="text-xs text-text-muted font-mono">{downloads.installer.size}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-accent-primary" />
                  <h3 className="text-lg font-semibold text-text-primary">WSA Bundle</h3>
                  <span className="inline-flex items-center rounded-full font-mono tracking-wider px-2.5 py-0.5 text-xs font-medium bg-bg-tertiary text-text-secondary border border-border-secondary ml-auto">Optional</span>
                </div>
                <div className="space-y-3">
                  <a
                    href={downloads.bundle.url}
                    download
                    className="flex items-center justify-between p-3 rounded-lg border border-border-primary hover:border-accent-primary/50 hover:bg-bg-hover transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-text-primary group-hover:text-accent-primary transition-colors">{downloads.bundle.label}</div>
                      <div className="text-xs text-text-muted">Offline installation bundle</div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <Download className="w-5 h-5 text-text-muted" />
                      <div className="text-xs text-text-muted font-mono">{downloads.bundle.size}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <a href={SITE.githubUrl + "/releases"} className="text-sm text-text-secondary hover:text-accent-primary transition-colors" target="_blank" rel="noopener noreferrer">
              View all releases on GitHub &rarr;
            </a>
          </div>

          {MONETIZATION?.buyMeACoffee?.enabled && (
            <div className="mt-12">
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-text-muted">WSA Installer is free and open source. If you find it useful, consider supporting its development.</p>
                <a
                  href={SITE.buymeacoffeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffdd00] hover:bg-[#f0c800] text-black font-medium transition-colors"
                >
                  <Coffee className="w-4 h-4" />
                  Buy Me a Coffee
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 md:py-14 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">System Requirements</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm">
              <div className="p-6">
                <ul className="space-y-3 text-text-secondary">
                  {Object.entries(CONTENT.systemRequirements || {}).map(([key, req]) => (
                    <li key={key} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-status-success shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong className="text-text-primary">{req.label}:</strong> {req.min} {req.rec !== req.min ? `(Recommended: ${req.rec})` : ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdFrame slot="hero-banner" format="banner" />
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Need Help?</h2>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Check out our guides and documentation</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/docs" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-button-secondary text-text-primary border border-border-secondary hover:bg-button-secondary-hover hover:border-border-accent px-4 py-2 text-sm gap-2">
              Documentation
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-button-secondary text-text-primary border border-border-secondary hover:bg-button-secondary-hover hover:border-border-accent px-4 py-2 text-sm gap-2">
              Features
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-button-secondary text-text-primary border border-border-secondary hover:bg-button-secondary-hover hover:border-border-accent px-4 py-2 text-sm gap-2">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
