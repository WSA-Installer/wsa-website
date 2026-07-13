import config from "@/config.json";

export interface SEOConfig {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  siteUrl: string;
  twitterHandle: string;
  locale: string;
  ogImage: string;
  keywords: string[];
  problemKeywords: string[];
  solutionKeywords: string[];
  installKeywords: string[];
}

export const SEO: SEOConfig = {
  titleTemplate: config.seo.titleTemplate,
  defaultTitle: config.seo.defaultTitle,
  defaultDescription: config.seo.defaultDescription,
  siteUrl: config.site.siteUrl,
  twitterHandle: config.seo.twitterHandle,
  locale: config.seo.locale,
  ogImage: config.seo.ogImage,
  keywords: config.seo.keywords,
  problemKeywords: config.seo.problemKeywords,
  solutionKeywords: config.seo.solutionKeywords,
  installKeywords: config.seo.installKeywords,
};
