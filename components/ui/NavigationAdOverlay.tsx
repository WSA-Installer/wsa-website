"use client";

import { useState, useEffect } from "react";
import { Shield, ExternalLink } from "lucide-react";
import { useNavigationAdConfig, useMonetizationConfig } from "@/hooks/useRuntimeConfig";

interface NavigationAdOverlayProps {
  visible: boolean;
  onAccept: () => void;
}

export default function NavigationAdOverlay({ visible, onAccept }: NavigationAdOverlayProps) {
  const navAd = useNavigationAdConfig();
  const monetization = useMonetizationConfig();
  const [countdown, setCountdown] = useState(5);
  const canContinue = countdown <= 0;

  useEffect(() => {
    if (!visible) return;
    setCountdown(5);
  }, [visible]);

  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [visible, countdown]);

  const adsenseId = monetization.adSensePublisherId;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl mx-4 animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <div className="rounded-2xl border border-border-primary bg-bg-primary/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary bg-bg-secondary/50">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-semibold text-text-primary">Sponsored Content</span>
            </div>
            <span className="text-xs text-text-muted font-mono">
              {canContinue ? "Ready" : `Continue in ${countdown}s`}
            </span>
          </div>

          <div className="p-6">
            <div className="relative w-full max-w-[400px] mx-auto aspect-square flex items-center justify-center rounded-xl border border-border-primary bg-bg-secondary/30 overflow-hidden">
              <div className="w-full p-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client={adsenseId}
                  data-ad-slot="5341055619"
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

            <div className="mt-5">
              <button
                onClick={canContinue ? onAccept : undefined}
                disabled={!canContinue}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  canContinue
                    ? "bg-button-primary text-bg-primary hover:bg-button-primary-hover cursor-pointer"
                    : "bg-bg-secondary text-text-muted cursor-not-allowed opacity-60"
                }`}
              >
                {canContinue ? (
                  <>
                    Continue to Site
                    <ExternalLink className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary" />
                    </span>
                    Continue in {countdown}s...
                  </span>
                )}
              </button>
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
