"use client";

import { useSiteConfig, useContentConfig, useMonetizationConfig } from "@/hooks/useRuntimeConfig";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import {
  Play, Code2, Coffee, BookOpen, MessageCircle, Bug,
} from "lucide-react";

export default function Support() {
  const SITE = useSiteConfig();
  const CONTENT = useContentConfig();
  const MONETIZATION = useMonetizationConfig();

  const supportItems = [
    {
      title: "Video Guide",
      desc: "Step-by-step tutorial on installing WSA with Google Play Store.",
      icon: Play,
      href: SITE.manualGuideUrl,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "GitHub Repository",
      desc: "Source code, issues, discussions, and community contributions.",
      icon: Code2,
      href: SITE.githubUrl,
      color: "text-text-primary",
      bg: "bg-white/5",
    },
    {
      title: "Documentation",
      desc: "Installation guides, troubleshooting, CLI reference, and architecture docs.",
      icon: BookOpen,
      href: SITE.githubUrl + "#documentation",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Report an Issue",
      desc: "Found a bug? Open a GitHub issue and the community will help.",
      icon: Bug,
      href: SITE.githubUrl + "/issues",
      color: "text-error",
      bg: "bg-error/10",
    },
    {
      title: "WSA Builds (Upstream)",
      desc: "MustardChef/WSABuilds — the upstream WSA build project with 17.9K stars.",
      icon: MessageCircle,
      href: SITE.wsaBuildsUrl,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];
  return (
    <section id="support" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="text-xs text-text-secondary">Need help?</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">Support & Community</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Get help through video guides, documentation, GitHub issues, or community discussions.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supportItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={0.1 * i}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl glass p-6 transition-all duration-300 hover:glass-hover"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.desc}
                </p>
              </a>
            </ScrollReveal>
          ))}

          {/* Buy Me a Coffee */}
          {MONETIZATION.buyMeACoffee.enabled && (
            <ScrollReveal delay={0.5}>
              <a
                href={MONETIZATION.buyMeACoffee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl glass p-6 transition-all duration-300 hover:glass-hover border border-yellow-500/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Coffee className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-text-primary group-hover:text-yellow-500 transition-colors">
                  Buy Me a Coffee
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Support the development of WSA Installer. Every coffee helps keep the project alive and improving.
                </p>
              </a>
            </ScrollReveal>
          )}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-sm text-text-secondary">
              Built with ❤️ by{" "}
              <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {SITE.author} / {SITE.channel}
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
