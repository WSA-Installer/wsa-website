"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSiteConfig, useContentConfig } from "@/hooks/useRuntimeConfig";
import Link from "next/link";

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wsa-installer-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("wsa-installer-theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

export default function Navigation() {
  const SITE = useSiteConfig();
  const CONTENT = useContentConfig();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = CONTENT.navItems.map((item) => ({
    ...item,
    active: pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border-primary bg-bg-primary/80 backdrop-blur-md" style={{ marginRight: "380px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src="/images/logo-64.png" alt="WSA Installer" width={36} height={36} className="relative drop-shadow-lg rounded-lg" />
            </div>
            <div>
              <span className="text-xl font-semibold tracking-tight text-text-primary">
                WSA <span className="font-bold text-accent-primary">Installer</span>
              </span>
              <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase">One-Click Install</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  link.active
                    ? "text-accent-primary bg-bg-secondary"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <ThemeToggle />
          </nav>

          <button
            type="button"
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border-primary py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  link.active
                    ? "text-accent-primary bg-bg-secondary"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-md transition-colors"
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
