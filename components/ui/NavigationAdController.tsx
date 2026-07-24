"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import NavigationAdOverlay from "./NavigationAdOverlay";
import { useNavigationAdConfig } from "@/hooks/useRuntimeConfig";

export default function NavigationAdController() {
  const pathname = usePathname();
  const navAd = useNavigationAdConfig();
  const [showAd, setShowAd] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const lastPathRef = useRef(pathname);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      lastPathRef.current = pathname;
      return;
    }
  }, [pathname]);

  useEffect(() => {
    if (!navAd.enabled) return;

    const handler = (url: string) => {
      if (url === lastPathRef.current) return;
      if (url.startsWith("#") || url.startsWith("javascript:")) return;

      setPendingPath(url);
      setShowAd(true);
      return false;
    };

    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;

    window.history.pushState = function (...args) {
      const result = originalPush.apply(this, args);
      if (args[2] && typeof args[2] === "string") {
        handler(args[2]);
      }
      return result;
    };

    window.history.replaceState = function (...args) {
      return originalReplace.apply(this, args);
    };

    return () => {
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
    };
  }, [navAd.enabled]);

  const handleAccept = useCallback(() => {
    setShowAd(false);
    if (pendingPath) {
      lastPathRef.current = pendingPath;
      window.history.pushState({}, "", pendingPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
      setPendingPath(null);
    }
  }, [pendingPath]);

  return (
    <NavigationAdOverlay
      visible={showAd}
      onAccept={handleAccept}
    />
  );
}
