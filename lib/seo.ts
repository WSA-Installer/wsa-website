import type { Metadata } from "next";
import { SITE, SEO } from "./config";

export function generateMetadata(title?: string, description?: string): Metadata {
  const metaTitle = title ? `${title} | ${SITE.name}` : SEO.defaultTitle;
  const metaDescription = description || SEO.defaultDescription;
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: SEO.keywords,
    authors: [{ name: SITE.author, url: SITE.youtubeUrl }],
    creator: SITE.author,
    publisher: SITE.channel,
    metadataBase: new URL(SEO.siteUrl),
    openGraph: {
      type: "website",
      locale: SEO.locale,
      siteName: SITE.name,
      title: metaTitle,
      description: metaDescription,
      url: SEO.siteUrl,
      images: [{ url: SEO.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [SEO.ogImage],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon/favicon.ico", apple: "/favicon/favicon.ico" },
    manifest: "/manifest.json",
  };
}

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Windows 10/11",
  description: SITE.description,
  version: SITE.version,
  author: {
    "@type": "Person",
    name: SITE.author,
    url: SITE.youtubeUrl,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  downloadUrl: "https://github.com/gshellmr-code/ads-json-data/releases/download/bundle-1.0/WSA_Installer_Setup.exe",
  fileSize: "228 MB",
  softwareHelp: {
    "@type": "WebPage",
    url: SITE.youtubeUrl,
  },
};
