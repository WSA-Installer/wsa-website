import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE, SEO } from "@/lib/config";
import { softwareSchema } from "@/lib/seo";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import CursorFollower from "@/components/ui/CursorFollower";
import PIPVideoPlayer from "@/components/ui/PIPVideoPlayer";
import { ConfigProvider } from "@/hooks/useRuntimeConfig";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="noise-bg" style={{ cursor: "none" }}>
        <ConfigProvider>
          <CursorFollower />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <PIPVideoPlayer />
        </ConfigProvider>
      </body>
    </html>
  );
}
