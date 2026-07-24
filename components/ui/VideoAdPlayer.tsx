"use client";

import { useState, useEffect, useRef, useMemo, useId } from "react";
import { getYouTubeVideoId } from "@/lib/utils/youtube";
import VideoAdOverlay from "./VideoAdOverlay";
import { useVideoAdsConfig } from "@/hooks/useRuntimeConfig";
import type { YTPlayerEvent, YTPlayerInstance } from "@/lib/types/youtube";
import "@/lib/types/youtube";

interface VideoAdPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
}

function loadYtApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };

    const check = setInterval(() => {
      if (window.YT?.Player) {
        clearInterval(check);
        resolve();
      }
    }, 100);
  });
}

export default function VideoAdPlayer({ videoUrl, className = "" }: VideoAdPlayerProps) {
  const videoId = useMemo(() => getYouTubeVideoId(videoUrl), [videoUrl]);
  const videoAds = useVideoAdsConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const rawId = useId();
  const uid = useMemo(() => `yt-vap-${rawId.replace(/:/g, "")}`, [rawId]);

  useEffect(() => {
    if (!videoId) return;
    let active = true;

    loadYtApi().then(() => {
      if (!active || !window.YT?.Player) return;
      try {
        playerRef.current = new window.YT.Player(uid, {
          height: "100%",
          width: "100%",
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (e: YTPlayerEvent) => {
              if (!active) return;
              setDuration(e.target.getDuration());
              setApiReady(true);
            },
            onStateChange: (e: YTPlayerEvent) => {
              if (!active) return;
              const state = e.target.getPlayerState();
              const playing = state === window.YT!.PlayerState.PLAYING;
              setIsPlaying(playing);
              if (playing) setDuration(e.target.getDuration());
            },
          },
        });
      } catch { /* silent */ }
    });

    return () => {
      active = false;
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setApiReady(false);
    };
  }, [videoId, uid]);

  useEffect(() => {
    if (!apiReady || !playerRef.current) return;
    const interval = setInterval(() => {
      try {
        const ct = playerRef.current?.getCurrentTime();
        if (ct !== undefined) setCurrentTime(ct);
      } catch { /* ignore */ }
    }, 500);
    return () => clearInterval(interval);
  }, [apiReady]);

  const handleAdStart = () => {
    try { playerRef.current?.pauseVideo(); } catch { /* ignore */ }
  };

  const handleAdEnd = () => {
    try { playerRef.current?.playVideo(); } catch { /* ignore */ }
  };

  if (!videoId) {
    return (
      <div className={`relative flex items-center justify-center bg-bg-secondary text-text-muted ${className}`}>
        No video configured
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <div id={uid} className="absolute inset-0 w-full h-full" />

      {videoAds.enabled && videoAds.vastTag && (
        <VideoAdOverlay
          vastTag={videoAds.vastTag}
          adCount={videoAds.adCount}
          nonSkippable={videoAds.nonSkippable}
          videoDuration={duration}
          currentTime={currentTime}
          isPlaying={isPlaying}
          onAdStart={handleAdStart}
          onAdEnd={handleAdEnd}
        />
      )}
    </div>
  );
}
