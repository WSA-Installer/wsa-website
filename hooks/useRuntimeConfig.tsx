"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import buildTimeConfig from "@/config.json";

export type Config = typeof buildTimeConfig;
export type PIPVideoConfig = Config["pipVideo"];

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

export function usePIPConfig(): PIPVideoConfig {
  return useConfig().pipVideo;
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
  };
}

export function useMonetizationConfig() {
  const c = useConfig().monetization;
  return {
    provider: c.provider as MonetizationProvider,
    providerId: c.adSensePublisherId || "",
    adSensePublisherId: c.adSensePublisherId || "",
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
interface AdPlacement {
  slot: string;
  location: string;
  format: "native" | "banner" | "sidebar";
  enabled: boolean;
}
