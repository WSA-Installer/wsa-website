"use client";

import { motion } from "framer-motion";
import { useContentConfig } from "@/hooks/useRuntimeConfig";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Tag } from "lucide-react";

export default function ReleaseNotes() {
  const CONTENT = useContentConfig();
  return (
    <section id="release-notes" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="text-xs text-text-secondary">Version history</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">Release Notes</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Track the evolution of WSA Installer across all versions.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-10">
            {CONTENT.releases.map((release, i) => (
              <ScrollReveal key={release.version} delay={0.1 * i} direction="left">
                <div className="relative flex gap-6">
                  <div className="relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full glass border border-border">
                    <Tag className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-text-primary">
                        v{release.version}
                      </h3>
                      {release.label && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                          {release.label}
                        </span>
                      )}
                      <span className="text-xs text-text-tertiary">{release.date}</span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {release.notes.map((note, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-tertiary" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
