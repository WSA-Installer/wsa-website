"use client";

import AdFrame from "@/components/ui/AdFrame";

export default function FooterAd() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <AdFrame slot="footer" format="banner" />
    </div>
  );
}
