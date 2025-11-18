"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

export function TypewriterText({ words, className = "" }: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);

      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1));
          } else {
            setIsPaused(true);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(word.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{currentText}</span>
      <motion.span
        className="inline-block w-0.5 h-[0.9em] bg-[var(--versopag-primary)] ml-1 align-middle"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="absolute bottom-2 left-0 h-4 bg-[var(--versopag-primary)]/20 -z-0"
        initial={{ width: 0 }}
        animate={{ width: currentText ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </span>
  );
}
