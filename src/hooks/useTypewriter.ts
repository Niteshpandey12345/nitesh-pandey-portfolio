"use client";

import { useEffect, useState } from "react";

/**
 * Reveals `text` one character at a time, starting after `startDelay` ms,
 * at `speed` ms per character. Returns `done` once fully revealed so
 * callers can stop rendering a blinking cursor.
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
