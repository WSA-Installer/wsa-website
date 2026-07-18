"use client";

import { useState } from "react";
import { useContentConfig } from "@/hooks/useRuntimeConfig";
import { ChevronDown, ChevronUp } from "lucide-react";
import AdFrame from "@/components/ui/AdFrame";

export default function ReleasesPage() {
  const CONTENT = useContentConfig();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Release Notes</h1>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Latest updates and changes</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {CONTENT.releases.map((r, i) => (
              <div key={i} className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm p-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-text-primary">v{r.version}</h3>
                  {r.label && (
                    <span className="rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-xs font-medium text-accent-primary border border-accent-primary/20">
                      {r.label}
                    </span>
                  )}
                  <span className="text-sm text-text-muted">{r.date}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {r.notes.map((note, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Frequently Asked Questions</h2>
            <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">Common questions about WSA Installer</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {CONTENT.faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-border-primary bg-gradient-to-br from-bg-secondary to-bg-tertiary backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-text-primary">{item.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-text-muted" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-text-muted" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* After FAQ Ad */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdFrame slot="after-faq" format="banner" />
        </div>
      </section>
    </>
  );
}
