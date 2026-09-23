"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A short "AI boot sequence" shown once per tab session (sessionStorage
 * gate, so navigating back doesn't replay it). Purely decorative — it
 * never blocks real content, which mounts underneath it immediately;
 * this only covers it for up to ~1.4s while fonts/fonts-in-use settle.
 */
const BOOT_LINES = ["initializing core", "calibrating sensors", "loading neural map", "ready"];

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("np-loaded")) {
      setVisible(false);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      sessionStorage.setItem("np-loaded", "1");
      setVisible(false);
      return;
    }

    const stepMs = 320;
    const timers = BOOT_LINES.map((_, i) => setTimeout(() => setLineIndex(i), i * stepMs));
    const done = setTimeout(() => {
      sessionStorage.setItem("np-loaded", "1");
      setVisible(false);
    }, BOOT_LINES.length * stepMs + 260);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[var(--c-bg)]"
        >
          <div className="font-display text-lg tracking-[0.3em] text-[var(--c-text)]">
            N<span className="text-[var(--c-accent-soft)]">P</span>
          </div>
          <div className="mt-6 h-px w-40 overflow-hidden bg-[var(--c-border)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--c-accent)] to-[var(--c-accent-soft)]"
              initial={{ width: "0%" }}
              animate={{ width: `${((lineIndex + 1) / BOOT_LINES.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-text-faint)]">
            {BOOT_LINES[lineIndex]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
