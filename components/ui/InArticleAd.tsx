"use client";

import { useEffect, useRef } from "react";

interface AdsbygoogleWindow {
  adsbygoogle?: Array<Record<string, unknown>>;
}

export default function InArticleAd() {
  const insRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!insRef.current) return;
    const container = insRef.current;
    if (container.querySelector("ins.adsbygoogle")) return;

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.style.textAlign = "center";
    ins.setAttribute("data-ad-layout", "in-article");
    ins.setAttribute("data-ad-format", "fluid");
    ins.setAttribute("data-ad-client", "ca-pub-7315130185108046");
    ins.setAttribute("data-ad-slot", "2044808434");
    container.appendChild(ins);

    try {
      const win = window as unknown as AdsbygoogleWindow;
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
    } catch { /* ignore */ }
  }, []);

  return (
    <div ref={insRef} className="my-8" />
  );
}
