"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import NavigationAdOverlay from "./NavigationAdOverlay";
import { useNavigationAdConfig } from "@/hooks/useRuntimeConfig";

const STORAGE_KEY = "wsa-nav-count";
const FIRST_VISIT_KEY = "wsa-nav-first-visit";

export default function NavigationAdController() {
  const pathname = usePathname();
  const navAd = useNavigationAdConfig();
  const [showAd, setShowAd] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    if (!navAd.enabled) return;

    const isFirstVisit = !localStorage.getItem(FIRST_VISIT_KEY);
    if (isFirstVisit) {
      localStorage.setItem(FIRST_VISIT_KEY, "true");
      lastPathRef.current = pathname;
      return;
    }

    if (pathname !== lastPathRef.current) {
      lastPathRef.current = pathname;
      return;
    }
  }, [pathname, navAd.enabled]);

  useEffect(() => {
    if (!navAd.enabled) return;

    const checkAndShowAd = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const count = stored ? parseInt(stored, 10) : 0;
      const newCount = count + 1;
      localStorage.setItem(STORAGE_KEY, String(newCount));

      if (newCount > 0 && newCount % navAd.showEvery === 0) {
        return true;
      }
      return false;
    };

    const handler = (url: string) => {
      if (url === lastPathRef.current) return;

      if (checkAndShowAd()) {
        setPendingPath(url);
        setShowAd(true);
        return false;
      }
      lastPathRef.current = url;
      return true;
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
  }, [navAd.enabled, navAd.showEvery]);

  const handleAccept = useCallback(() => {
    setShowAd(false);
    if (pendingPath) {
      lastPathRef.current = pendingPath;
      window.history.pushState({}, "", pendingPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
      setPendingPath(null);
    }
  }, [pendingPath]);

  const handleSkip = useCallback(() => {
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
      onSkip={handleSkip}
    />
  );
}
