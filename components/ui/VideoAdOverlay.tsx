"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { calculateAdTimestamps } from "@/lib/utils/youtube";

interface VideoAdOverlayProps {
  vastTag: string;
  adCount: number;
  nonSkippable: boolean;
  videoDuration: number;
  currentTime: number;
  isPlaying: boolean;
  onAdStart: () => void;
  onAdEnd: () => void;
}

export default function VideoAdOverlay({
  vastTag,
  adCount,
  nonSkippable,
  videoDuration,
  currentTime,
  isPlaying,
  onAdStart,
  onAdEnd,
}: VideoAdOverlayProps) {
  const [active, setActive] = useState(false);
  const [adVideoUrl, setAdVideoUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [adDuration, setAdDuration] = useState(0);
  const adVideoRef = useRef<HTMLVideoElement | null>(null);
  const triggeredRef = useRef<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const adTimestamps = calculateAdTimestamps(videoDuration, adCount);

  const fetchVastMediaUrl = useCallback(async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const mediaFile = xml.querySelector("MediaFile > MediaFile");
      if (!mediaFile) {
        const allMedia = xml.querySelectorAll("MediaFile");
        for (const mf of allMedia) {
          const src = mf.querySelector("StaticResource, IFrameResource, HTMLResource")?.textContent?.trim()
            || mf.getAttribute("src")
            || mf.textContent?.trim();
          if (src && (src.startsWith("http") || src.startsWith("//"))) return src;
        }
        const inlineSrc = xml.querySelector("Linear > StaticResource")?.textContent?.trim();
        if (inlineSrc) return inlineSrc;
        return null;
      }
      const src = mediaFile.querySelector("StaticResource, IFrameResource, HTMLResource")?.textContent?.trim()
        || mediaFile.getAttribute("src")
        || mediaFile.textContent?.trim();
      return src && (src.startsWith("http") || src.startsWith("//")) ? src : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || active || adTimestamps.length === 0 || !vastTag) return;

    for (const ts of adTimestamps) {
      if (currentTime >= ts && currentTime < ts + 2 && !triggeredRef.current.has(ts)) {
        triggeredRef.current.add(ts);
        setActive(true);
        onAdStart();
        fetchVastMediaUrl(vastTag).then((url) => {
          if (url) setAdVideoUrl(url);
        });
        break;
      }
    }
  }, [currentTime, isPlaying, active, adTimestamps, vastTag, onAdStart, fetchVastMediaUrl]);

  useEffect(() => {
    if (!active || !adVideoUrl || !adVideoRef.current) return;
    const video = adVideoRef.current;
    video.load();
    video.play().catch(() => {});
  }, [active, adVideoUrl]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      if (adVideoRef.current) {
        const remaining = Math.ceil(adVideoRef.current.duration - adVideoRef.current.currentTime);
        setCountdown(remaining > 0 ? remaining : 0);
        setAdDuration(adVideoRef.current.duration || 0);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [active]);

  const handleAdEnded = useCallback(() => {
    setActive(false);
    setAdVideoUrl(null);
    setCountdown(0);
    onAdEnd();
  }, [onAdEnd]);

  const handleSkip = useCallback(() => {
    if (nonSkippable && countdown > 0) return;
    handleAdEnded();
  }, [nonSkippable, countdown, handleAdEnded]);

  if (!active) return null;

  const progress = adDuration > 0 ? ((adDuration - countdown) / adDuration) * 100 : 0;
  const canSkip = !nonSkippable || countdown <= 0;

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 bg-black flex items-center justify-center">
      {adVideoUrl ? (
        <video
          ref={adVideoRef}
          className="w-full h-full object-contain"
          onEnded={handleAdEnded}
          playsInline
          muted
          controls={false}
        >
          <source src={adVideoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-text-muted font-mono">Loading ad...</span>
        </div>
      )}

      <div className="absolute top-3 right-3 bg-black/70 rounded-lg px-3 py-1.5 flex items-center gap-2">
        <span className="text-xs text-text-muted font-mono">
          Ad {nonSkippable ? "" : `remaining: `}{countdown}s
        </span>
        {nonSkippable && countdown > 0 && (
          <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-primary transition-all duration-250"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {canSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white text-xs font-mono px-4 py-2 rounded-lg border border-white/20 transition-colors"
        >
          ✕ Close Ad
        </button>
      )}

      <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg px-3 py-1.5">
        <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">Advertisement</span>
      </div>
    </div>
  );
}
