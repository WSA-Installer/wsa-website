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
  titleTemplate: "%s | WSA Installer",
  defaultTitle: "WSA Installer — Windows Subsystem for Android One-Click Install with Google Play Store",
  defaultDescription:
    "A professional tool that automates installing Windows Subsystem for Android (WSA) with Google Play Store on Windows 10/11. One-click setup, no technical knowledge required.",
  siteUrl: "https://gshellmr-code.github.io/wsa-installer-website",
  twitterHandle: "@AT_Tech_Zone",
  locale: "en_US",
  ogImage: "/images/og-image.svg",
  keywords: [
    "WSA Installer",
    "Windows Subsystem for Android",
    "Android on Windows",
    "Google Play Store on Windows",
    "WSA Play Store",
    "install WSA",
    "Android apps on Windows 11",
    "Android apps on Windows 10",
    "WSA with Google Play",
    "MindTheGapps",
    "WSA download",
    "run Android apps on PC",
    "WSA setup",
    "Android subsystem installer",
    "WSA 2407.40000.4.0",
  ],
  problemKeywords: [
    "WSA apps keep crashing Windows 11",
    "WSA not opening after Windows Update",
    "WSA stuck on loading screen",
    "WSA closes immediately after opening",
    "WSA apps crash after splash screen",
    "WsaClient.exe crash fix",
    "Windows Subsystem for Android not starting",
    "Play Store not working WSA",
    "Google Play Store crashing WSA",
    "WSA crash after KB5062553",
    "WSA apps close silently after launch",
    "WSA ARM translation layer broken",
    "libhoudini WSA crash January 2026",
    "WSA NVIDIA GPU crash fix",
    "WSA Intel HD Graphics 530 not working",
    "WSA Magisk crash on start",
    "WSA GApps build crashing after June 2025",
    "WSA 2407.40000.4.0 crash fix",
  ],
  solutionKeywords: [
    "how to fix WSA crashing after Windows update",
    "how to fix WSA apps not opening",
    "WSA GApps crash fix 2026",
    "fix WsaClient.exe error Windows 10",
    "fix WSA ARM translation layer",
    "how to update Google Play Services in WSA",
    "WSA NoGApps build install guide",
    "WSA Aurora Store setup",
    "how to roll back Windows Update WSA fix",
    "WSA clean install guide",
    "WSA backup and restore userdata",
    "WSA Developer Mode enable",
    "fix ADB authorization WSA",
    "WSA file sharing WebDAV setup",
    "WSA MagiskOnWSALocal guide",
  ],
  installKeywords: [
    "how to install WSA on Windows 10",
    "how to install WSA on Windows 11",
    "WSA install guide 2026",
    "one click WSA installer",
    "WSA automatic setup tool",
    "WSA bundle download offline",
    "WSA silent install command",
    "install Google Play Store on WSA",
    "WSA with Magisk install",
    "WSA 2407 install tutorial",
    "WSA without Microsoft Store",
    "WSA offline installer",
    "WSA system requirements Windows 10",
    "enable Hyper-V for WSA",
    "enable virtualization for WSA",
  ],
};
