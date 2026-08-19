import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "b12c34d56e78f90a1b2c3d4e5f678901";
const BASE_URL = "https://wsa-installer-website.vercel.app";

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls array is required" }, { status: 400 });
    }

    const payload = {
      host: "wsa-installer-website.vercel.app",
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      status: response.status,
      submitted: urls.length,
    });
  } catch (error) {
    return NextResponse.json({ error: "IndexNow submission failed" }, { status: 500 });
  }
}

export async function GET() {
  const allUrls = [
    BASE_URL,
    `${BASE_URL}/features`,
    `${BASE_URL}/downloads`,
    `${BASE_URL}/docs`,
    `${BASE_URL}/releases`,
    `${BASE_URL}/gallery`,
    `${BASE_URL}/about`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/blog/what-is-wsa`,
    `${BASE_URL}/blog/wsa-architecture-explained`,
    `${BASE_URL}/blog/wsa-vs-wsl`,
    `${BASE_URL}/blog/wsa-system-requirements`,
    `${BASE_URL}/blog/wsa-history-timeline`,
    `${BASE_URL}/blog/wsa-deprecation-what-it-means`,
    `${BASE_URL}/blog/wsa-builds-explained`,
    `${BASE_URL}/blog/install-wsa-official`,
    `${BASE_URL}/blog/install-wsa-manual`,
    `${BASE_URL}/blog/wsa-installer-how-it-works`,
    `${BASE_URL}/blog/wsa-on-windows-10`,
    `${BASE_URL}/blog/wsa-offline-bundle`,
    `${BASE_URL}/blog/play-store-on-wsa`,
    `${BASE_URL}/blog/wsa-without-play-store`,
    `${BASE_URL}/blog/customize-wsa`,
    `${BASE_URL}/blog/sideload-apk-wsa`,
    `${BASE_URL}/blog/fix-wsa-not-working`,
    `${BASE_URL}/blog/wsa-file-sharing-webdav`,
    `${BASE_URL}/blog/wsa-gpu-graphics`,
    `${BASE_URL}/blog/wsa-perf-tips`,
    `${BASE_URL}/blog/wsabuilds-guide`,
    `${BASE_URL}/blog/building-wsa-installer`,
    `${BASE_URL}/blog/wsa-installer-v1-2-new-features`,
    `${BASE_URL}/blog/wsa-pacman-double-click-apk-install`,
    `${BASE_URL}/blog/apk-file-handler-explorer-integration`,
    `${BASE_URL}/blog/three-phase-system-check-explained`,
    `${BASE_URL}/blog/virtualization-bypass-auto-fix`,
    `${BASE_URL}/blog/win10-win11-detection-smart-build`,
  ];

  const payload = {
    host: "wsa-installer-website.vercel.app",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: allUrls,
  };

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return NextResponse.json({
    status: response.status,
    submitted: allUrls.length,
    urls: allUrls,
  });
}
