"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useMonetizationConfig } from "@/hooks/useRuntimeConfig";

interface AdFrameProps {
  slot: string;
  className?: string;
  format?: "banner" | "native" | "sidebar";
  rotate?: boolean;
  rotateInterval?: number;
}

interface AdSlide {
  networkId: string;
  loaded: boolean;
  failed: boolean;
}

interface AdsbygoogleWindow {
  adsbygoogle?: Array<Record<string, unknown>>;
}

export default function AdFrame({
  slot,
  className = "",
  format = "banner",
  rotate = false,
  rotateInterval = 15000,
}: AdFrameProps) {
  const { adNetworks, adPlacements } = useMonetizationConfig();

  const placement = adPlacements.find((p) => p.slot === slot);

  const enabledNetworks = useMemo(
    () =>
      placement?.networks
        ? adNetworks
            .filter((n) => n.enabled && placement.networks?.includes(n.id))
            .sort((a, b) => a.priority - b.priority)
        : adNetworks
            .filter((n) => n.enabled)
            .sort((a, b) => a.priority - b.priority),
    [adNetworks, placement]
  );

  const enabledNetworkKey = enabledNetworks.map((n) => n.id).join(",");
  const [slides, setSlides] = useState<AdSlide[]>(() =>
    enabledNetworks.map((n) => ({ networkId: n.id, loaded: false, failed: false }))
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotateTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSlides(enabledNetworks.map((n) => ({ networkId: n.id, loaded: false, failed: false })));
    setActiveIndex(0);
  }, [enabledNetworkKey]);

  const markLoaded = useCallback((networkId: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.networkId === networkId ? { ...s, loaded: true } : s))
    );
  }, []);

  const markFailed = useCallback((networkId: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.networkId === networkId ? { ...s, failed: true } : s))
    );
  }, []);

  useEffect(() => {
    if (!rotate || slides.length <= 1) return;

    rotateTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        let next = (prev + 1) % slides.length;
        let attempts = 0;
        while (slides[next]?.failed && attempts < slides.length) {
          next = (next + 1) % slides.length;
          attempts++;
        }
        return next;
      });
    }, rotateInterval);

    return () => {
      if (rotateTimerRef.current) clearInterval(rotateTimerRef.current);
    };
  }, [rotate, rotateInterval, slides]);

  useEffect(() => {
    if (rotate) return;
    if (enabledNetworks.length === 0) return;

    let currentIndex = 0;
    let cancelled = false;

    const tryLoad = () => {
      if (cancelled || currentIndex >= enabledNetworks.length) return;

      const container = containerRefs.current[0];
      if (!container) return;

      container.innerHTML = "";
      const network = enabledNetworks[currentIndex];

      const timeout = setTimeout(() => {
        if (!cancelled) {
          currentIndex++;
          tryLoad();
        }
      }, 5000);

      loadTimeoutRef.current = timeout;

      const detectAdLoad = (targetEl: Element) => {
        const observer = new MutationObserver(() => {
          const hasAd = targetEl.querySelector("iframe, ins.adsbygoogle, script[src]");
          if (hasAd) {
            markLoaded(network.id);
            clearTimeout(timeout);
            observer.disconnect();
          }
        });
        observer.observe(targetEl, { childList: true, subtree: true });

        setTimeout(() => {
          observer.disconnect();
          if (!cancelled) {
            currentIndex++;
            tryLoad();
          }
        }, 4500);
      };

      if (network.type === "adsense" && network.publisherId) {
        try {
          const ins = document.createElement("ins");
          ins.className = "adsbygoogle";
          ins.style.display = "block";
          ins.style.width = "100%";
          if (format === "sidebar") ins.style.height = "600px";
          else if (format === "native") {
            ins.setAttribute("data-ad-format", "fluid");
            ins.setAttribute("data-ad-layout", "in-article");
          } else ins.style.height = "90px";
          ins.setAttribute("data-ad-client", network.publisherId);
          ins.setAttribute("data-ad-slot", slot);
          container.appendChild(ins);
          try {
            if (!ins.getAttribute("data-ad-status")) {
              const win = window as unknown as AdsbygoogleWindow;
              win.adsbygoogle = win.adsbygoogle || [];
              win.adsbygoogle.push({});
              ins.setAttribute("data-ad-status", "pushed");
            }
          } catch { /* ignore */ }
          detectAdLoad(ins);
        } catch {
          clearTimeout(timeout);
          currentIndex++;
          tryLoad();
        }
      } else if (network.type === "monetag" && network.publisherId) {
        try {
          const script = document.createElement("script");
          script.src = `//viblast.com/${network.publisherId}/invoke.js`;
          script.async = true;
          script.onload = () => {
            markLoaded(network.id);
            clearTimeout(timeout);
          };
          script.onerror = () => {
            clearTimeout(timeout);
            currentIndex++;
            tryLoad();
          };
          container.appendChild(script);
        } catch {
          clearTimeout(timeout);
          currentIndex++;
          tryLoad();
        }
      } else if (network.type === "adsterra" && network.publisherId) {
        try {
          const script = document.createElement("script");
          script.src = `//pl${network.publisherId}.adsterra.com/${network.publisherId}.js`;
          script.async = true;
          script.onload = () => {
            markLoaded(network.id);
            clearTimeout(timeout);
          };
          script.onerror = () => {
            clearTimeout(timeout);
            currentIndex++;
            tryLoad();
          };
          container.appendChild(script);
        } catch {
          clearTimeout(timeout);
          currentIndex++;
          tryLoad();
        }
      } else {
        clearTimeout(timeout);
        currentIndex++;
        tryLoad();
      }
    };

    tryLoad();

    return () => {
      cancelled = true;
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [enabledNetworks, format, slot, rotate, markLoaded]);

  const heightClass =
    format === "sidebar"
      ? "min-h-[400px]"
      : format === "native"
        ? "min-h-[150px]"
        : "min-h-[60px]";

  const hasLoadedAd = slides.some((s) => s.loaded);

  const frameContent = (
    <>
      <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-accent-primary/60 rounded-tl-lg" />
      <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-accent-primary/60 rounded-br-lg" />

      <div className="absolute top-2 right-2 z-10">
        <span className="text-[9px] font-mono text-text-muted/50 uppercase tracking-wider">
          Ad
        </span>
      </div>

      {rotate ? (
        enabledNetworks.map((network, i) => (
          <div
            key={network.id}
            ref={(el) => { containerRefs.current[i] = el; }}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === activeIndex ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        ))
      ) : (
        <div ref={(el) => { containerRefs.current[0] = el; }} className="w-full h-full" />
      )}

      {!hasLoadedAd && (
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="flex flex-col items-center gap-1.5 opacity-40">
            <div className="w-6 h-6 rounded border border-text-muted/40 flex items-center justify-center">
              <span className="text-[8px] text-text-muted">AD</span>
            </div>
            <span className="text-[9px] text-text-muted font-mono">Advertisement</span>
          </div>
        </div>
      )}

      {rotate && slides.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.networkId}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-accent-primary w-3"
                  : slide.failed
                    ? "bg-text-muted/30"
                    : "bg-text-muted/60 hover:bg-text-muted"
              }`}
              title={enabledNetworks[i]?.name}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border-primary shadow-2xl box-glow ${heightClass} ${className}`}
      style={{
        background: "rgba(10, 10, 20, 0.65)",
      }}
    >
      {frameContent}
    </div>
  );
}
