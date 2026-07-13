import config from "@/config.json";

export type MonetizationProvider = "carbon" | "ethicalads" | "buysellads" | "none";

export interface AdPlacement {
  slot: string;
  location: string;
  format: "native" | "banner" | "sidebar";
  enabled: boolean;
}

export interface MonetizationConfig {
  provider: MonetizationProvider;
  providerId: string;
  carbonId?: string;
  buyMeACoffee: {
    enabled: boolean;
    url: string;
    username: string;
  };
  gitHubSponsors: {
    enabled: boolean;
    url: string;
  };
  koFi: {
    enabled: boolean;
    url: string;
  };
  adPlacements: AdPlacement[];
  affiliateLinks: {
    enabled: boolean;
    links: { name: string; url: string; description: string }[];
  };
}

export const MONETIZATION: MonetizationConfig = {
  provider: config.monetization.provider as MonetizationProvider,
  providerId: config.monetization.carbonId || "",
  carbonId: config.monetization.carbonId,
  buyMeACoffee: config.monetization.buyMeACoffee,
  gitHubSponsors: config.monetization.gitHubSponsors,
  koFi: config.monetization.koFi,
  adPlacements: config.monetization.adPlacements as AdPlacement[],
  affiliateLinks: config.monetization.affiliateLinks,
};
