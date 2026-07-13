"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
}

export default function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 overflow-hidden", className)}>
      <div
        className="absolute -top-[40%] -left-[20%] h-[60%] w-[60%] rounded-full opacity-[0.08] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #0078d4 0%, transparent 70%)",
          animation: "gradient-drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-[30%] -right-[10%] h-[50%] w-[50%] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #00bcd4 0%, transparent 70%)",
          animation: "gradient-drift 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] rounded-full opacity-[0.04] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #30d158 0%, transparent 70%)",
          animation: "gradient-drift 30s ease-in-out infinite 5s",
        }}
      />
    </div>
  );
}
