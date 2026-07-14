"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Volume2, VolumeX, X } from "lucide-react";
import { usePIPConfig } from "@/hooks/useRuntimeConfig";

/* ---- YouTube Iframe API type stubs ---- */
interface YTPlayerEvent {
  target: YTPlayerInstance;
  data: number;
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
}

interface YTStatic {
  Player: new (
    elementId: string,
    config: Record<string, unknown>
  ) => YTPlayerInstance;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
    BUFFERING: number;
  };
}

declare global {
  interface Window {
    YT: YTStatic;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]+)/,
    /(?:youtu\.be\/)([\w-]+)/,
    /(?:youtube-nocookie\.com\/embed\/)([\w-]+)/,
    /(?:youtube\.com\/embed\/)([\w-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function PIPVideoPlayer() {
  const pip = usePIPConfig();
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const videoId = useMemo(() => getYouTubeVideoId(pip.videoUrl), [pip.videoUrl]);

  // Loop checking logic
  const startLoopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const start = pip.startTime ?? 0;
    const end = pip.endTime ?? 0;

    timerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const currentTime = playerRef.current.getCurrentTime();
        
        // If we hit or pass the end time, loop back to start
        if (end > 0 && currentTime >= end) {
          playerRef.current.seekTo(start, true);
        }
        // If we somehow drifted way behind the start time, seek to start
        else if (currentTime < start - 1) {
          playerRef.current.seekTo(start, true);
        }
      }
    }, 200);
  }, [pip.startTime, pip.endTime]);

  const stopLoopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!pip.enabled || !videoId || isDismissed) return;

    let active = true;

    const initPlayer = () => {
      if (!active) return;

      try {
        const start = pip.startTime ?? 0;
        const end = pip.endTime ?? 0;

        playerRef.current = new window.YT.Player("pip-youtube-player", {
          height: "100%",
          width: "100%",
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            start: start,
            end: end > 0 ? end : undefined,
            playlist: videoId,
          },
          events: {
            onReady: (event: YTPlayerEvent) => {
              if (!active) return;
              event.target.mute();
              event.target.playVideo();
              setIsPlayerReady(true);
            },
            onStateChange: (event: YTPlayerEvent) => {
              if (!active) return;
              
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                if (pip.startTime !== undefined && pip.endTime !== undefined) {
                  startLoopTimer();
                }
              } else {
                setIsPlaying(false);
                stopLoopTimer();
              }
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize YT Player:", err);
      }
    };

    // Load API Script if not exists
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // Poll for YT script load
    const checkInterval: ReturnType<typeof setInterval> = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkInterval);
        initPlayer();
      }
    }, 100);

    return () => {
      active = false;
      clearInterval(checkInterval);
      stopLoopTimer();
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setIsPlayerReady(false);
    };
  }, [pip.enabled, videoId, pip.startTime, pip.endTime, isDismissed, startLoopTimer]);

  const toggleMute = () => {
    if (playerRef.current && typeof playerRef.current.isMuted === "function") {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  if (!pip.enabled || !videoId || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 450, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 450, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 260 }}
        className="fixed bottom-6 right-6 z-[9999] w-[360px] max-w-[calc(100vw-48px)]"
        ref={containerRef}
      >
        <div
          className="relative overflow-hidden rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-primary/50"
          style={{
            background: "rgba(10, 10, 20, 0.65)",
            borderColor: "rgba(103, 61, 230, 0.3)",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute right-3 top-3 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-md transition-colors hover:bg-black/60 hover:text-white"
            aria-label="Dismiss Player"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Video Container */}
          <div className="relative aspect-video w-full overflow-hidden bg-black/80">
            {/* The YT Player Mount Element */}
            <div id="pip-youtube-player" className="h-full w-full" />

            {/* Loading / Thumbnail Overlay */}
            {!isPlayerReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={pip.thumbnailUrl}
                  alt={pip.title}
                  className="h-full w-full object-cover brightness-[0.7]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              </div>
            )}

            {/* Mute Overlay Button */}
            {isPlayerReady && (
              <button
                onClick={toggleMute}
                className="absolute bottom-3 left-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-transform hover:scale-105"
              >
                {isMuted ? (
                  <VolumeX className="h-4.5 w-4.5 text-red-400" />
                ) : (
                  <Volume2 className="h-4.5 w-4.5 text-primary" />
                )}
              </button>
            )}

            {/* Looping indicator Badge */}
            {isPlayerReady && isPlaying && pip.startTime !== undefined && pip.endTime !== undefined && (
              <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 rounded-full bg-primary/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
                </span>
                Looping
              </div>
            )}
          </div>

          {/* Content Info */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-text-primary line-clamp-1 uppercase tracking-wide text-primary">
              {pip.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-text-secondary line-clamp-1 leading-snug">
              {pip.description}
            </p>

            {/* CTA row */}
            <div className="mt-4 flex items-center gap-3">
              <p className="flex-1 text-[10px] leading-relaxed text-text-muted line-clamp-2">
                {pip.ctaText}
              </p>
              <a
                href={pip.ctaUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #673de6 0%, #a855f7 100%)",
                  boxShadow: "0 4px 15px rgba(103, 61, 230, 0.3)",
                }}
              >
                {pip.ctaButton}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
