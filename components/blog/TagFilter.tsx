"use client";

import { useState } from "react";

export default function TagFilter({
  tags,
  active,
  onChange,
}: {
  tags: string[];
  active: string;
  onChange: (tag: string) => void;
}) {
  const all = ["All", ...tags];
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {all.map((t) => {
        const isActive = (t === "All" && active === "All") || t === active;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              isActive
                ? "bg-accent-primary/10 border-accent-primary text-accent-primary"
                : "border-border-secondary text-text-secondary hover:text-text-primary hover:border-border-accent"
            }`}
          >
            {t === "All" ? "All" : `#${t}`}
          </button>
        );
      })}
    </div>
  );
}
