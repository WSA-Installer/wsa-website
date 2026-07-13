"use client";

import { useEffect, useRef } from "react";
import { MONETIZATION } from "@/lib/config";

export function GoogleAdSense() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || MONETIZATION.provider !== "adsense") return;

    if (!document.querySelector("script[src*='adsbygoogle']")) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${MONETIZATION.adSensePublisherId}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  if (MONETIZATION.provider !== "adsense") return null;

  return <div ref={containerRef} />;
}

interface AdSenseAdProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdSenseAd({ slot, format = "auto", className = "" }: AdSenseAdProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (insRef.current && MONETIZATION.provider === "adsense") {
        const { adsbygoogle } = window as unknown as { adsbygoogle?: unknown[] };
        if (adsbygoogle) {
          adsbygoogle.push({});
        }
      }
    } catch {
      // silent fail
    }
  }, []);

  if (MONETIZATION.provider !== "adsense") return null;

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-${MONETIZATION.adSensePublisherId}`}
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
        {MONETIZATION.provider === "adsense" && (
          <AdSenseAd slot={slot} format="auto" />
        )}
      </div>
    </div>
  );
}
