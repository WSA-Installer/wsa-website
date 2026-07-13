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
  provider: "none",
  providerId: "",
  buyMeACoffee: {
    enabled: true,
    url: "https://buymeacoffee.com/mrcyberdev",
    username: "mrcyberdev",
  },
  gitHubSponsors: {
    enabled: false,
    url: "",
  },
  koFi: {
    enabled: false,
    url: "",
  },
  adPlacements: [
    { slot: "after-features", location: "Between Features and HowItWorks", format: "native", enabled: false },
    { slot: "after-how-it-works", location: "Between HowItWorks and Gallery", format: "native", enabled: false },
    { slot: "after-faq", location: "After FAQ section", format: "banner", enabled: false },
    { slot: "sidebar-docs", location: "Sidebar on documentation", format: "sidebar", enabled: false },
    { slot: "footer", location: "Footer area", format: "banner", enabled: false },
  ],
  affiliateLinks: {
    enabled: false,
    links: [],
  },
};
