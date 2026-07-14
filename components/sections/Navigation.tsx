"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSiteConfig, useContentConfig, useMonetizationConfig } from "@/hooks/useRuntimeConfig";
import Button from "@/components/ui/Button";
import { Download, Menu, X } from "lucide-react";

export default function Navigation() {
  const SITE = useSiteConfig();
  const CONTENT = useContentConfig();
  const MONETIZATION = useMonetizationConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong border-b border-border" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <img src="/images/logo-32.png" alt={SITE.name} className="h-8 w-8 rounded-lg transition-transform duration-300 group-hover:scale-105" />
          <span className="text-sm font-semibold text-text-primary">{SITE.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {CONTENT.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" size="sm" href={CONTENT.downloads.installer.url} download>
            <Download className="h-4 w-4" />
            Download {CONTENT.downloads.installer.size}
          </Button>
        </div>

        <button
          className="relative z-50 flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-text-primary" />
          ) : (
            <Menu className="h-5 w-5 text-text-primary" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong absolute left-0 right-0 top-16 border-b border-border md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {CONTENT.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                >
                  {item.label}
                </a>
              ))}
              <Button variant="primary" size="md" href={CONTENT.downloads.installer.url} download className="mt-2">
                <Download className="h-4 w-4" />
                Download {CONTENT.downloads.installer.size}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
