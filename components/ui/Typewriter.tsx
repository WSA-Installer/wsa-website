"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = "",
}: TypewriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      setCurrentText(currentPhrase.substring(0, currentText.length + 1));

      if (currentText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      setCurrentText(currentPhrase.substring(0, currentText.length - 1));

      if (currentText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
    }
  }, [currentText, isDeleting, currentPhraseIndex, phrases, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-accent-primary">|</span>
    </span>
  );
}
