"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Shield, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useSponsorContentConfig } from "@/hooks/useRuntimeConfig";
import { getYouTubeVideoId } from "@/lib/utils/youtube";

interface NavigationAdOverlayProps {
  visible: boolean;
  onAccept: () => void;
}

export default function NavigationAdOverlay({ visible, onAccept }: NavigationAdOverlayProps) {
  const config = useSponsorContentConfig();
  const [countdown, setCountdown] = useState(config.duration);
  const canContinue = countdown <= 0;
  const [imageIndex, setImageIndex] = useState(0);
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const videoId = getYouTubeVideoId(config.videoUrl);

  useEffect(() => {
    if (!visible) return;
    setCountdown(config.duration);
    setImageIndex(0);
  }, [visible, config.duration]);

  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [visible, countdown]);

  const nextImage = useCallback(() => {
    setImageIndex((prev) => (prev + 1) % config.imageLinks.length);
  }, [config.imageLinks.length]);

  const prevImage = useCallback(() => {
    setImageIndex((prev) => (prev - 1 + config.imageLinks.length) % config.imageLinks.length);
  }, [config.imageLinks.length]);

  if (!visible) return null;

  const showVideo = config.showVideo && videoId;
  const showImages = config.showImages && config.imageLinks.length > 0;

  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl mx-4 animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <div className="rounded-2xl border border-border-primary bg-bg-primary/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary bg-bg-secondary/50">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-semibold text-text-primary">{config.title}</span>
            </div>
            <span className="text-xs text-text-muted font-mono">
              {canContinue ? "Ready" : `Continue in ${countdown}s`}
            </span>
          </div>

          <div className="p-6">
            {showVideo && (
              <div className="relative w-full rounded-xl overflow-hidden border border-border-primary bg-black/80" style={{ aspectRatio: "16/9" }}>
                <iframe
                  ref={playerRef}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            )}

            {showImages && (
              <div className="relative w-full rounded-xl overflow-hidden border border-border-primary bg-bg-secondary/30" style={{ aspectRatio: "16/9" }}>
                <img
                  src={config.imageLinks[imageIndex]}
                  alt={`Slide ${imageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {config.imageLinks.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                      {config.imageLinks.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImageIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i === imageIndex ? "bg-accent-primary w-3" : "bg-white/60 hover:bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {!showVideo && !showImages && (
              <div className="relative w-full rounded-xl border border-border-primary bg-bg-secondary/30 flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
                <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <div className="w-10 h-10 rounded-xl border border-border-primary bg-bg-tertiary flex items-center justify-center">
                    <span className="text-xs text-text-muted font-mono">AD</span>
                  </div>
                  <span className="text-xs text-text-muted">Advertisement</span>
                </div>
              </div>
            )}

            {config.description && (
              <p className="mt-4 text-sm text-text-secondary text-center leading-relaxed">
                {config.description}
              </p>
            )}

            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={canContinue ? onAccept : undefined}
                disabled={!canContinue}
                className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  canContinue
                    ? "bg-button-primary text-bg-primary hover:bg-button-primary-hover cursor-pointer"
                    : "bg-bg-secondary text-text-muted cursor-not-allowed opacity-60"
                }`}
              >
                {canContinue ? (
                  <>
                    {config.ctaText}
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
              This content helps keep WSA Installer free and open source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
