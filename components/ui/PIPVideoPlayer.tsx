"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { usePIPConfig } from "@/hooks/useRuntimeConfig";

interface YTPlayerEvent {
  target: YTPlayerInstance;
  data: number;
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
}

interface YTStatic {
  Player: new (elementId: string, config: Record<string, unknown>) => YTPlayerInstance;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number };
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
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");

  const videoId = useMemo(() => getYouTubeVideoId(pip.videoUrl), [pip.videoUrl]);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

  // Fetch video title via oEmbed
  useEffect(() => {
    if (!videoId) return;
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
      .then((r) => r.json())
      .then((d) => setVideoTitle(d.title || ""))
      .catch(() => {});
  }, [videoId]);

  useEffect(() => {
    if (!pip.enabled || !videoId) return;
    let active = true;

    const initPlayer = () => {
      if (!active) return;
      try {
        playerRef.current = new window.YT.Player("pip-youtube-player", {
          height: "100%",
          width: "100%",
          videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            playlist: videoId,
          },
          events: {
            onReady: (event: YTPlayerEvent) => {
              if (!active) return;
              event.target.mute();
              event.target.playVideo();
              setIsPlayerReady(true);
            },
          },
        });
      } catch {
        // silent
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const checkInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkInterval);
        initPlayer();
      }
    }, 100);

    return () => {
      active = false;
      clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setIsPlayerReady(false);
    };
  }, [pip.enabled, videoId]);

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

  if (!pip.enabled || !videoId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 450, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 450, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 260 }}
        className="fixed bottom-6 right-6 z-[9999] w-[360px] max-w-[calc(100vw-48px)]"
      >
        <div
          className="relative overflow-hidden rounded-2xl border backdrop-blur-2xl shadow-2xl"
          style={{
            background: "rgba(10, 10, 20, 0.65)",
            borderColor: "rgba(103, 61, 230, 0.3)",
          }}
        >
          {/* Video Container */}
          <div className="relative aspect-video w-full overflow-hidden bg-black/80">
            <div id="pip-youtube-player" className="h-full w-full" />

            {/* Loading / Thumbnail Overlay */}
            {!isPlayerReady && thumbnailUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={thumbnailUrl}
                  alt="Loading video..."
                  className="h-full w-full object-cover brightness-[0.7]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              </div>
            )}

            {/* Mute Button */}
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

            {/* Looping Badge */}
            {isPlayerReady && (
              <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 rounded-full bg-primary/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Looping
              </div>
            )}
          </div>

          {/* Title */}
          {videoTitle && (
            <div className="p-3">
              <h3 className="text-xs font-medium text-text-secondary line-clamp-1 leading-snug">
                {videoTitle}
              </h3>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}