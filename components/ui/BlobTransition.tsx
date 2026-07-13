"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlobTransitionProps {
  className?: string;
}

export default function BlobTransition({ className = "" }: BlobTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative h-32 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="absolute bottom-0 w-full h-32"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 120C240 120 480 80 720 80C960 80 1200 120 1440 120V0H0V120Z"
            fill="url(#blob-gradient)"
            initial={{ d: "M0 120C240 120 480 80 720 80C960 80 1200 120 1440 120V0H0V120Z" }}
            animate={isInView ? {
              d: [
                "M0 120C240 120 480 80 720 80C960 80 1200 120 1440 120V0H0V120Z",
                "M0 100C240 130 480 70 720 90C960 110 1200 60 1440 100V0H0V100Z",
                "M0 120C240 120 480 80 720 80C960 80 1200 120 1440 120V0H0V120Z",
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="blob-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0078d4" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#00bcd4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0078d4" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
