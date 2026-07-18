"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Volume2, VolumeX } from "lucide-react";
import { usePIPConfig, useVideoAdsConfig } from "@/hooks/useRuntimeConfig";
import AdFrame from "@/components/ui/AdFrame";
import VideoAdOverlay from "@/components/ui/VideoAdOverlay";
import type { YTPlayerEvent, YTPlayerInstance } from "@/lib/types/youtube";
import "@/lib/types/youtube";
import { getYouTubeVideoId } from "@/lib/utils/youtube";

export default function PIPVideoPlayer() {
  const pip = usePIPConfig();
  const videoAds = useVideoAdsConfig();
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [pipPlaying, setPipPlaying] = useState(false);
  const [pipCurrentTime, setPipCurrentTime] = useState(0);
  const [pipDuration, setPipDuration] = useState(0);

  const videoId = useMemo(() => getYouTubeVideoId(pip.videoUrl), [pip.videoUrl]);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

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
      if (!active || !window.YT?.Player) return;
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
              setPipDuration(event.target.getDuration());
            },
            onStateChange: (event: YTPlayerEvent) => {
              if (!active) return;
              const playing = event.target.getPlayerState() === window.YT!.PlayerState.PLAYING;
              setPipPlaying(playing);
              if (playing) setPipDuration(event.target.getDuration());
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

  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;
    const interval = setInterval(() => {
      try {
        const ct = playerRef.current?.getCurrentTime();
        if (ct !== undefined) setPipCurrentTime(ct);
      } catch { /* ignore */ }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlayerReady]);

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
        className="fixed bottom-6 right-6 z-[9999] w-[360px] max-w-[calc(100vw-48px)] pointer-events-none"
      >
        {/* Ad Frame Slider - Above PIP Player */}
        <div className="mb-2">
          <AdFrame
            slot="pip-top"
            format="banner"
            rotate
            rotateInterval={15000}
            className="!min-h-[250px]"
          />
        </div>

        {/* PIP Video Player */}
        <div
          className="relative overflow-hidden rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-accent-primary/50 pointer-events-auto"
          style={{
            background: "rgba(10, 10, 20, 0.65)",
            borderColor: "rgba(var(--theme-glow-rgb), 0.3)",
          }}
        >
          <div className="relative aspect-video w-full overflow-hidden bg-black/80">
            <div id="pip-youtube-player" className="h-full w-full" />

            {!isPlayerReady && thumbnailUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={thumbnailUrl}
                  alt="Loading video..."
                  className="h-full w-full object-cover brightness-[0.7]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-primary border-t-transparent" />
                </div>
              </div>
            )}

            {isPlayerReady && (
              <button
                onClick={toggleMute}
                className="absolute bottom-3 left-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-transform hover:scale-105"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-accent-primary" />
                )}
              </button>
            )}

            {isPlayerReady && (
              <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 rounded-full bg-accent-primary/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Looping
              </div>
            )}

            {videoAds.enabled && videoAds.vastTag && (
              <VideoAdOverlay
                vastTag={videoAds.vastTag}
                adCount={videoAds.adCount}
                nonSkippable={videoAds.nonSkippable}
                videoDuration={pipDuration}
                currentTime={pipCurrentTime}
                isPlaying={pipPlaying}
                onAdStart={() => {
                  try { playerRef.current?.pauseVideo(); } catch { /* ignore */ }
                }}
                onAdEnd={() => {
                  try { playerRef.current?.playVideo(); } catch { /* ignore */ }
                }}
              />
            )}
          </div>

          <div className="p-4">
            <h3 className="text-xs font-bold text-accent-primary line-clamp-1 uppercase tracking-wide">
              {videoTitle || "WSA Installer Guide"}
            </h3>
            <p className="mt-1 text-xs font-medium text-text-secondary line-clamp-1 leading-snug">
              {pip.description}
            </p>
            {pip.ctaUrl && (
              <div className="mt-4 flex items-center gap-3">
                <p className="flex-1 text-[10px] leading-relaxed text-text-muted line-clamp-2">
                  {pip.ctaText}
                </p>
                <a
                  href={pip.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    boxShadow: "0 4px 15px rgba(var(--theme-glow-rgb), 0.3)",
                  }}
                >
                  {pip.ctaButton}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
