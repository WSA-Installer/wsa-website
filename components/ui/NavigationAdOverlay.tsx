"use client";

import { useState, useEffect } from "react";
import { X, Shield, ExternalLink } from "lucide-react";
import { useNavigationAdConfig, useMonetizationConfig } from "@/hooks/useRuntimeConfig";

interface NavigationAdOverlayProps {
  visible: boolean;
  onAccept: () => void;
  onSkip: () => void;
}

export default function NavigationAdOverlay({ visible, onAccept, onSkip }: NavigationAdOverlayProps) {
  const navAd = useNavigationAdConfig();
  const monetization = useMonetizationConfig();
  const [countdown, setCountdown] = useState(navAd.skipAfter);
  const canSkip = countdown <= 0;

  useEffect(() => {
    if (!visible) return;
    setCountdown(navAd.skipAfter);
  }, [visible, navAd.skipAfter]);

  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [visible, countdown]);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && canSkip) onSkip();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, canSkip, onSkip]);

  const adsenseId = monetization.adSensePublisherId;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg mx-4 animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <div className="rounded-2xl border border-border-primary bg-bg-primary/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary bg-bg-secondary/50">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-semibold text-text-primary">Sponsored Content</span>
            </div>
            <button
              onClick={onSkip}
              className="flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              {canSkip ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  Skip
                </>
              ) : (
                <span className="font-mono">Skip in {countdown}s</span>
              )}
            </button>
          </div>

          <div className="p-6">
            <div className="relative min-h-[120px] flex items-center justify-center rounded-xl border border-border-primary bg-bg-secondary/30 overflow-hidden">
              <div className="w-full p-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client={adsenseId}
                  data-ad-slot="navigation-interstitial"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-10 h-10 rounded-xl border border-border-primary bg-bg-tertiary flex items-center justify-center">
                  <span className="text-xs text-text-muted font-mono">AD</span>
                </div>
                <span className="text-xs text-text-muted">Advertisement</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onAccept}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-button-primary text-bg-primary hover:bg-button-primary-hover transition-all"
              >
                Continue to Site
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              {canSkip && (
                <button
                  onClick={onSkip}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-border-secondary text-text-secondary hover:text-text-primary hover:border-border-accent transition-all"
                >
                  Skip Ad
                </button>
              )}
            </div>
          </div>

          <div className="px-5 py-2 border-t border-border-primary bg-bg-secondary/30">
            <p className="text-[10px] text-text-muted text-center">
              This advertisement helps keep WSA Installer free and open source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
