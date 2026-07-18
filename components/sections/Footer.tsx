"use client";

import { useSiteConfig, useContentConfig, useMonetizationConfig } from "@/hooks/useRuntimeConfig";
import Link from "next/link";

export default function Footer() {
  const SITE = useSiteConfig();
  const CONTENT = useContentConfig();
  const MONETIZATION = useMonetizationConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-primary bg-bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link className="inline-flex items-center gap-3 mb-3" href="/">
              <img src="/images/logo-64.png" alt="WSA Installer" width={32} height={32} className="drop-shadow-lg rounded-lg" />
              <span className="text-xl font-semibold text-text-primary">
                WSA <span className="font-bold text-accent-primary">Installer</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary mb-4">
              A professional tool that automates installing Windows Subsystem for Android (WSA) with Google Play Store on Windows 10/11.
            </p>
            {MONETIZATION.buyMeACoffee.enabled && (
              <a
                href={MONETIZATION.buyMeACoffee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffdd00] hover:bg-[#f0c800] text-black font-medium transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 3H4v10a4 4 0 004 4h6a4 4 0 004-4v-1h1a4 4 0 004-4V4a1 1 0 00-1-1zm-9 12H8a2 2 0 01-2-2V5h7v10zm9-7a2 2 0 01-2 2h-1V5h1a2 2 0 012 2v3z" />
                </svg>
                Buy Me a Coffee
              </a>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Product</h3>
            <ul className="space-y-2">
              {CONTENT.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-text-secondary hover:text-accent-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href={SITE.wsaBuildsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">
                  WSA Builds
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-primary flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            {SITE.copyright.replace("2026", String(currentYear))}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
