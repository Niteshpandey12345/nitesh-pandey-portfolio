"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 192;
const FRAME_PATH = (i: number) => `/video/hero-frames/frame-${String(i).padStart(4, "0")}.jpg`;
// Higher = snappier/more literal to the cursor, lower = smoother/more trailing.
const EASE = 0.35;
// Auto-play speed (frames per second) used for touch devices / reduced-motion,
// where there's no hover to scrub with.
const AUTOPLAY_FPS = 18;

/**
 * Renders the hero head-turn sequence as individual JPEG frames drawn onto a
 * <canvas>, instead of scrubbing an HTML <video>'s currentTime. Browsers add
 * real per-call decode overhead to video seeking — even with an all-keyframe
 * encode — which shows up as stutter once you're seeking on every mousemove.
 * Drawing pre-decoded <img> frames onto a canvas has none of that overhead,
 * so this is the technique behind most cinematic mouse/scroll-scrub sites.
 */
export function HeroFrameCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCount = useRef(0);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round((rect?.width ?? window.innerWidth) * dpr);
      canvas.height = Math.round((rect?.height ?? window.innerHeight) * dpr);
      draw(Math.round(currentFrame.current));
    }

    function draw(index: number) {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0 || !canvas || !ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // object-cover style fit, matching how the old <video> was framed
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      // Frame vertically like the previous "center 18%" video crop.
      const dy = (ch - dh) * 0.18;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    // Preload every frame up front — 192 small JPEGs, fine to load eagerly.
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount.current++;
        if (i === 1) draw(0);
      };
      imagesRef.current[i - 1] = img;
    }

    window.addEventListener("resize", resize);
    resize();

    if (reducedMotion || coarsePointer) {
      let last = performance.now();
      let acc = 0;
      const frameDuration = 1000 / AUTOPLAY_FPS;
      const loop = (now: number) => {
        acc += now - last;
        last = now;
        if (acc >= frameDuration) {
          acc = 0;
          currentFrame.current = (currentFrame.current + 1) % FRAME_COUNT;
          draw(Math.round(currentFrame.current));
        }
        rafId.current = requestAnimationFrame(loop);
      };
      rafId.current = requestAnimationFrame(loop);
      return () => {
        window.removeEventListener("resize", resize);
        if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      };
    }

    function handleMouseMove(e: MouseEvent) {
      const ratio = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetFrame.current = ratio * (FRAME_COUNT - 1);
    }

    function tick() {
      const diff = targetFrame.current - currentFrame.current;
      if (Math.abs(diff) > 0.02) {
        currentFrame.current += diff * EASE;
      } else {
        currentFrame.current = targetFrame.current;
      }
      draw(Math.round(currentFrame.current));
      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
