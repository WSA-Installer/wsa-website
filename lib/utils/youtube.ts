const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([\w-]+)/,
  /(?:youtu\.be\/)([\w-]+)/,
  /(?:youtube-nocookie\.com\/embed\/)([\w-]+)/,
  /(?:youtube\.com\/embed\/)([\w-]+)/,
];

export function getYouTubeVideoId(url: string): string | null {
  for (const p of YOUTUBE_PATTERNS) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function calculateAdTimestamps(videoDuration: number, adCount: number): number[] {
  if (adCount <= 0 || videoDuration <= 0) return [];
  const interval = videoDuration / (adCount + 1);
  const timestamps: number[] = [];
  for (let i = 1; i <= adCount; i++) {
    timestamps.push(Math.round(interval * i));
  }
  return timestamps;
}
