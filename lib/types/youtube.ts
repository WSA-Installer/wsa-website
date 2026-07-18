export interface YTPlayerEvent {
  target: YTPlayerInstance;
  data: number;
}

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

export interface YTStatic {
  Player: new (elementId: string, config: Record<string, unknown>) => YTPlayerInstance;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number };
}

declare global {
  interface Window {
    YT?: YTStatic;
    onYouTubeIframeAPIReady?: (() => void) | undefined;
  }
}

export {};
