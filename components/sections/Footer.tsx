"use client";

import { motion } from "framer-motion";
import { SITE, CONTENT, MONETIZATION } from "@/lib/config";
import { Play, Code2, Coffee, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-white">W</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">{SITE.name}</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              {SITE.description}
            </p>
            <div className="mt-6 flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={SITE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg glass text-text-secondary hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Play className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg glass text-text-secondary hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Code2 className="h-5 w-5" />
              </motion.a>
              {MONETIZATION.buyMeACoffee.enabled && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={MONETIZATION.buyMeACoffee.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg glass text-text-secondary hover:text-yellow-500 transition-colors"
                  aria-label="Buy Me a Coffee"
                >
                  <Coffee className="h-5 w-5" />
                </motion.a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {CONTENT.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary">Community</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                  YouTube Channel
                </a>
              </li>
              <li>
                <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                  GitHub Repository
                </a>
              </li>
              {MONETIZATION.buyMeACoffee.enabled && (
                <li>
                  <a href={MONETIZATION.buyMeACoffee.url} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                    Buy Me a Coffee
                  </a>
                </li>
              )}
              <li>
                <a href={SITE.wsaBuildsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                  WSA Builds (Upstream)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-text-tertiary">
              {SITE.copyright.replace("2026", String(currentYear))}
            </p>
            <p className="inline-flex items-center gap-1 text-xs text-text-tertiary">
              Built with <Heart className="h-3 w-3 text-red-500" /> by {SITE.author} / {SITE.channel}
            </p>
          </div>
        </div>
      </div>

      {MONETIZATION.adPlacements.find(a => a.slot === "footer")?.enabled && (
        <div className="border-t border-border py-4">
          <div className="mx-auto max-w-7xl px-4 text-center" id="ad-footer" />
        </div>
      )}
    </footer>
  );
}
