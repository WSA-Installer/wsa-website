"use client";

import { useEffect, useRef } from "react";
import { useConfig } from "@/hooks/useRuntimeConfig";

interface AdSenseAdProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdSenseAd({ slot, format = "auto", className = "" }: AdSenseAdProps) {
  const insRef = useRef<HTMLModElement>(null);
  const cfg = useConfig();
  const pubId = cfg.monetization.adSensePublisherId;

  useEffect(() => {
    if (!insRef.current || cfg.monetization.provider !== "adsense") return;
    const timer = setTimeout(() => {
      try {
        const w = window as unknown as { adsbygoogle?: unknown[] };
        if (w.adsbygoogle) {
          w.adsbygoogle.push({});
        }
      } catch {
        // silent fail
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [slot, cfg.monetization.provider]);

  if (cfg.monetization.provider !== "adsense") return null;

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={pubId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

interface AdSlotProps {
  slot: string;
  className?: string;
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const cfg = useConfig();
  const placement = cfg.monetization.adPlacements.find((a) => a.slot === slot);
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
        {cfg.monetization.provider === "adsense" && (
          <AdSenseAd slot={slot} format="auto" />
        )}
      </div>
    </div>
  );
}
