"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import buildTimeConfig from "@/config.json";

export type Config = typeof buildTimeConfig;

const CONFIG_URL = "https://raw.githubusercontent.com/WSA-Installer/wsa-website/master/config.json";
const POLL_INTERVAL = 60_000;

const ConfigContext = createContext<Config>(buildTimeConfig);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config>(buildTimeConfig);

  useEffect(() => {
    let mounted = true;

    async function fetchConfig() {
      try {
        const res = await fetch(CONFIG_URL, { cache: "no-cache" });
        if (!res.ok) return;
        const remote: Config = await res.json();
        if (mounted) setConfig(remote);
      } catch {
        // use build-time config
      }
    }

    fetchConfig();
    const interval = setInterval(fetchConfig, POLL_INTERVAL);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): Config {
  return useContext(ConfigContext);
}

export function useSiteConfig() {
  return useConfig().site;
}

export function useContentConfig() {
  const c = useConfig();
  return {
    downloads: c.downloads,
    navItems: c.navItems,
    features: c.features,
    howItWorks: c.howItWorks,
    screens: c.screens,
    systemRequirements: c.systemRequirements,
    windowsFeatures: c.windowsFeatures,
    documentation: c.documentation,
    techStack: c.techStack,
    faq: c.faq,
    releases: c.releases,
    heroStats: c.heroStats,
    gallery: c.gallery,
    social: c.social,
  };
}

export function useMonetizationConfig() {
  const c = useConfig().monetization;
  return {
    provider: c.provider as MonetizationProvider,
    providerId: c.adSensePublisherId || "",
    adSensePublisherId: c.adSensePublisherId || "",
    adNetworks: (c.adNetworks || []) as AdNetwork[],
    buyMeACoffee: c.buyMeACoffee,
    gitHubSponsors: c.gitHubSponsors,
    koFi: c.koFi,
    adPlacements: c.adPlacements as AdPlacement[],
    affiliateLinks: c.affiliateLinks,
  };
}

export function useDownloadUrls(): { installer: { url: string; size: string; label: string }; bundle: { url: string; size: string; label: string; sha256: string } } {
  const config = useConfig();
  return {
    installer: {
      url: config.downloads.installer.url,
      size: config.downloads.installer.size,
      label: config.downloads.installer.label,
    },
    bundle: {
      url: config.downloads.bundle.url,
      size: config.downloads.bundle.size,
      label: config.downloads.bundle.label,
      sha256: config.downloads.bundle.sha256,
    },
  };
}

type MonetizationProvider = "carbon" | "ethicalads" | "buysellads" | "adsense" | "none";

interface AdNetwork {
  id: string;
  name: string;
  enabled: boolean;
  publisherId: string;
  type: string;
  priority: number;
}

interface AdPlacement {
  slot: string;
  location: string;
  format: "native" | "banner" | "sidebar";
  enabled: boolean;
  networks?: string[];
}

export function usePIPConfig() {
  const c = useConfig().pipVideo;
  return {
    enabled: c?.enabled ?? false,
    videoUrl: c?.videoUrl ?? "",
    description: c?.description ?? "",
    ctaText: c?.ctaText ?? "",
    ctaButton: c?.ctaButton ?? "",
    ctaUrl: c?.ctaUrl ?? "",
  };
}

export interface VideoAdsConfig {
  enabled: boolean;
  vastTag: string;
  adCount: number;
  nonSkippable: boolean;
}

export interface NavigationAdConfig {
  enabled: boolean;
  network: string;
  showEvery: number;
  duration: number;
  skipAfter: number;
}

interface MonetizationConfig {
  provider: string;
  adSensePublisherId: string;
  adNetworks: AdNetwork[];
  adPlacements: AdPlacement[];
  buyMeACoffee: { enabled: boolean; url: string; username: string };
  gitHubSponsors: { enabled: boolean; url: string };
  koFi: { enabled: boolean; url: string };
  affiliateLinks: { enabled: boolean; links: { name: string; url: string; description: string }[] };
  videoAds: { enabled: boolean; vastTag: string; adCount: number; nonSkippable: boolean };
  navigationAd: { enabled: boolean; network: string; showEvery: number; duration: number; skipAfter: number };
}

export function useVideoAdsConfig(): VideoAdsConfig {
  const c = useConfig().monetization as MonetizationConfig;
  const v = c.videoAds;
  return {
    enabled: v?.enabled ?? false,
    vastTag: v?.vastTag ?? "",
    adCount: v?.adCount ?? 4,
    nonSkippable: v?.nonSkippable ?? true,
  };
}

export function useNavigationAdConfig(): NavigationAdConfig {
  const c = useConfig().monetization as MonetizationConfig;
  const n = c.navigationAd;
  return {
    enabled: n?.enabled ?? false,
    network: n?.network ?? "adsense",
    showEvery: n?.showEvery ?? 3,
    duration: n?.duration ?? 5,
    skipAfter: n?.skipAfter ?? 3,
  };
}
