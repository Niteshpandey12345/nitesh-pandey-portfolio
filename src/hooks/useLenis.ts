"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Sets up Lenis smooth scrolling for the whole page and drives it from
 * requestAnimationFrame. Skipped entirely when the visitor has asked for
 * reduced motion — native scroll behaves better for them than an
 * interpolated one.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
