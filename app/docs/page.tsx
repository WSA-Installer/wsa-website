"use client";

import { useContentConfig, useSiteConfig, usePIPConfig } from "@/hooks/useRuntimeConfig";
import Link from "next/link";
import { FileCode, Settings, HardDrive, Wrench, Shield, Code2, BookOpen, AlertTriangle, FileText } from "lucide-react";
import AdFrame from "@/components/ui/AdFrame";
import VideoAdPlayer from "@/components/ui/VideoAdPlayer";

export default function DocsPage() {
  const CONTENT = useContentConfig();
  const SITE = useSiteConfig();
  const pip = usePIPConfig();

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Documentation</h1>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Everything you need to get the most out of WSA Installer</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {CONTENT.documentation.map((doc, i) => {
              const icons = [FileCode, Settings, HardDrive, Wrench, Shield, Code2];
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="group">
                  <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                    <div className="p-6">
                      <div className="mb-4 text-accent-primary"><Icon className="w-8 h-8" /></div>
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">{doc.title}</h3>
                      <p className="text-sm text-text-secondary">{doc.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
          <AdFrame slot="after-features" format="banner" />
        </div>
      </section>

      <section className="py-10 md:py-14 border-t border-border-primary pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-8">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTENT.techStack.map((tech, i) => (
              <div key={i} className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{tech.name} <span className="text-sm font-normal text-text-muted">{tech.version}</span></h3>
                  <p className="text-sm text-text-secondary">{tech.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 border-t border-border-primary pt-12 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-8">Windows Features Required</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {CONTENT.windowsFeatures.map((feat, i) => (
              <div key={i} className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm p-4">
                <h3 className="font-semibold text-text-primary">{feat.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 border-t border-border-primary pt-12 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-8">External Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="group">
              <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-5 h-5 text-accent-primary" />
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors flex items-center gap-2">
                      GitHub Repository
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary">Source code, issues, and discussions.</p>
                </div>
              </div>
            </a>
            <a href={SITE.githubUrl + "/issues"} target="_blank" rel="noopener noreferrer" className="group">
              <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-accent-primary" />
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors flex items-center gap-2">
                      Report an Issue
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary">Found a bug? Let us know.</p>
                </div>
              </div>
            </a>
            <a href={SITE.manualGuideUrl} target="_blank" rel="noopener noreferrer" className="group">
              <div className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-subtle h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-accent-primary" />
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors flex items-center gap-2">
                      Manual Guide
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary">Step-by-step video guide for manual installation.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
