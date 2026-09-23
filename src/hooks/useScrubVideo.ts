"use client";

import { useEffect, useRef } from "react";

// How quickly the video eases toward the cursor's target frame each animation
// frame (0–1). Higher = snappier/more literal to the cursor, lower = smoother/laggier.
// Safe to run high now that the video is encoded with every frame as a keyframe
// (instant seeks) — see public/video/hero-turn.mp4.
const EASE = 0.35;

/**
 * Scrubs a <video>'s playhead based on the cursor's absolute horizontal
 * position across the window — the left edge of the screen maps to the
 * first frame, the right edge to the last frame, so wherever the cursor
 * hovers, that's the video frame shown (no dragging/clicking required).
 * A requestAnimationFrame loop eases the actual playhead toward that target
 * each frame, so movement reads as a smooth follow rather than a jump-cut.
 *
 * Falls back to a normal autoplaying muted loop for touch devices (no
 * hover state there) and under prefers-reduced-motion (continuous
 * hover-driven scrubbing is itself a motion effect).
 */
export function useScrubVideo(videoRef: React.RefObject<HTMLVideoElement>) {
  const targetTime = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) {
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {
        /* Autoplay can be blocked even when muted on some browsers; the
           poster frame (first frame) is a fine fallback if so. */
      });
      return;
    }

    function handleMouseMove(e: MouseEvent) {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;
      const ratio = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetTime.current = ratio * video.duration;
    }

    function tick() {
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const diff = targetTime.current - video.currentTime;
        if (Math.abs(diff) > 0.005) {
          video.currentTime += diff * EASE;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [videoRef]);
}