import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SITE, SEO, MONETIZATION } from "@/lib/config";
import { softwareSchema } from "@/lib/seo";
import Navigation from "@/components/sections/Navigation";
import { ConfigProvider } from "@/hooks/useRuntimeConfig";
import { ThemeProvider } from "@/hooks/useTheme";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PIPVideoPlayer from "@/components/ui/PIPVideoPlayer";
import FooterAd from "@/components/ui/FooterAd";
import Footer from "@/components/sections/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: SEO.defaultTitle,
  description: SEO.defaultDescription,
  keywords: SEO.keywords,
  authors: [{ name: SITE.author, url: SITE.youtubeUrl }],
  creator: SITE.author,
  publisher: SITE.channel,
  metadataBase: new URL(SEO.siteUrl),
  openGraph: {
    type: "website",
    locale: SEO.locale,
    siteName: SITE.name,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: SEO.siteUrl,
    images: [{ url: SEO.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.ogImage],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon/favicon.ico", apple: "/favicon/favicon.ico" },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("wsa-installer-theme");var r=t;if(!t||t==="system"){r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=r}catch(e){document.documentElement.dataset.theme="dark"}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${MONETIZATION.adSensePublisherId}`}
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <ConfigProvider>
            <ScrollProgress />
            <Navigation />
            <main className="flex-1" style={{ marginRight: "380px" }}>{children}</main>
            <div style={{ marginRight: "380px" }}>
              <FooterAd />
              <Footer />
            </div>
            <PIPVideoPlayer />
          </ConfigProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
