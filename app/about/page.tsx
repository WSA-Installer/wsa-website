"use client";

import { useSiteConfig, useMonetizationConfig } from "@/hooks/useRuntimeConfig";
import AdFrame from "@/components/ui/AdFrame";
import { usePIPConfig } from "@/hooks/useRuntimeConfig";
import { Play, Code2, Coffee, Lightbulb } from "lucide-react";
import { useMemo } from "react";

export default function AboutPage() {
  const SITE = useSiteConfig();
  const MONETIZATION = useMonetizationConfig();
  const pip = usePIPConfig();
  const videoId = useMemo(() => {
    const url = pip.videoUrl;
    if (!url) return null;
    const patterns = [/(?:youtube\.com\/watch\?v=)([\w-]+)/, /(?:youtu\.be\/)([\w-]+)/, /(?:youtube\.com\/embed\/)([\w-]+)/];
    for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
    return null;
  }, [pip.videoUrl]);

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">About {SITE.name}</h1>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">{SITE.shortTagline}</p>
          </div>

          <div className="max-w-3xl mx-auto rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm p-8 mb-16">
            <p className="text-text-secondary leading-relaxed">
              {SITE.name} is a professional open-source tool that automates installing Windows Subsystem for Android (WSA) with Google Play Store on Windows 10 and Windows 11.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Built with <strong className="text-text-primary">Python</strong> and <strong className="text-text-primary">Rust</strong>, {SITE.name} delivers a polished native experience with a Flet-based GUI. The installer handles system checks, downloads, extraction, patching, and configuration — all in one click.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Built by {SITE.channel}</h2>
            <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <span className="text-lg font-bold">{SITE.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{SITE.author}</p>
                  <p className="text-sm text-text-secondary">{SITE.channel}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-bg-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-bg-hover">
                  <Code2 className="h-4 w-4" /> GitHub
                </a>
                <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-bg-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-bg-hover">
                  <Play className="h-4 w-4" /> YouTube
                </a>
                {MONETIZATION.buyMeACoffee.enabled && (
                  <a href={MONETIZATION.buyMeACoffee.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-bg-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:text-yellow-500 hover:bg-bg-hover">
                    <Coffee className="h-4 w-4" /> Buy Me a Coffee
                  </a>
                )}
              </div>
            </div>
          </div>

          {videoId && (
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border-primary shadow-2xl">
                <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`} title="WSA Installer Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
              </div>
            </div>
          )}

      <div className="max-w-3xl mx-auto mb-12">
        <AdFrame slot="after-features" format="banner" />
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Open Source License</h2>
            <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm p-8 text-center">
              <p className="text-text-secondary">{SITE.name} is licensed under the <strong className="text-text-primary">MIT License</strong>.</p>
              <p className="mt-2 text-sm text-text-muted">Free to use, modify, and distribute.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Get in Touch</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={<Code2 className="h-5 w-5" />} title="Report a Bug" desc="Found an issue? Let us know on GitHub." action="Open Issue" href={SITE.githubUrl} />
              <ContactCard icon={<Lightbulb className="h-5 w-5" />} title="Feature Request" desc="Have an idea? We're always listening." action="Suggest" href={SITE.githubUrl} />
              <ContactCard icon={<Play className="h-5 w-5" />} title="YouTube" desc="Watch tutorials and guides." action="Subscribe" href={SITE.youtubeUrl} />
              <ContactCard icon={<Coffee className="h-5 w-5" />} title="Support" desc="Help keep the project alive." action="Donate" href={MONETIZATION.buyMeACoffee.url} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, title, desc, action, href }: { icon: React.ReactNode; title: string; desc: string; action: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">{title}</h3>
      <p className="mt-1 text-sm text-text-secondary">{desc}</p>
      <p className="mt-3 text-sm text-accent-primary">{action} →</p>
    </a>
  );
}
