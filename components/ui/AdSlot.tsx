"use client";

import { useEffect, useRef } from "react";
import { MONETIZATION } from "@/lib/config";

export function CarbonAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || MONETIZATION.provider !== "carbon") return;

    const script = document.createElement("script");
    script.src = `https://cdn.carbonads.com/carbon.js?serve=${MONETIZATION.carbonId}&placement=wsainstaller`;
    script.async = true;
    script.id = "_carbonads_js";
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);

    return () => {
      const existing = document.getElementById("_carbonads_js");
      if (existing) existing.remove();
    };
  }, []);

  if (MONETIZATION.provider !== "carbon") return null;

  return (
    <div
      ref={containerRef}
      className="carbon-ad flex min-h-[100px] items-center justify-center"
    />
  );
}

interface AdSlotProps {
  slot: string;
  className?: string;
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const placement = MONETIZATION.adPlacements.find((a) => a.slot === slot);
  if (!placement?.enabled) return null;

  return (
    <div
      id={`ad-${slot}`}
      className={`mx-auto w-full max-w-7xl px-4 py-8 ${className}`}
    >
      <div className="flex flex-col items-center gap-3 rounded-2xl glass p-6">
        <span className="text-[10px] uppercase tracking-widest text-text-tertiary">
          — Sponsored —
        </span>
        <CarbonAd />
        {MONETIZATION.affiliateLinks.enabled && MONETIZATION.affiliateLinks.links.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {MONETIZATION.affiliateLinks.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="rounded-lg bg-primary/5 px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-primary/10 hover:text-text-primary"
              >
                {link.description} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
