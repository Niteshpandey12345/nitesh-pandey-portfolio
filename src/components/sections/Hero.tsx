"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { AICore } from "@/components/three/AICore";
import { HeroFrameCanvas } from "@/components/sections/HeroFrameCanvas";
import { useTypewriter } from "@/hooks/useTypewriter";
import { profile } from "@/lib/data";

const PILLS: { label: string; href: string; external?: boolean }[] = [
  { label: "See my recognition", href: "#recognition" },
  { label: "Read my research", href: "#research" },
  { label: "See my experience", href: "#experience" },
  { label: "LinkedIn", href: profile.personal.linkedin, external: true }
];

/**
 * Full-bleed hero built around the head-turn portrait clip as a mouse-scrub
 * background video (drag the cursor left/right to move through the turn) —
 * modeled on a cinematic agency landing-page technique — layered with the
 * site's own AI/robotics HUD identity (corner brackets, scan readout,
 * floating 3D core) instead of a plain video. All copy below is Nitesh's
 * own; nothing is borrowed from the reference brief's fictional
 * agency/persona.
 */
export function Hero() {
  const pointer = useRef({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  const { displayed, done } = useTypewriter(profile.heroSummary, 26, 700);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1
    };
  }

  function copyEmail() {
    navigator.clipboard.writeText(profile.personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      className="relative flex h-screen flex-col justify-end overflow-hidden pb-14 pt-32 md:justify-center md:pb-0"
    >
      {/* Full-bleed mouse-scrub portrait, scoped to this section (absolute, not
          fixed) so it scrolls away naturally once the visitor moves past the
          hero instead of bleeding through every section below it. Rendered as
          a canvas of pre-decoded JPEG frames rather than a scrubbed <video> —
          video seeking has real per-call decode overhead in the browser even
          with an all-keyframe encode, which shows up as stutter once you're
          seeking on every mousemove; drawing frames onto a canvas has none. */}
      <HeroFrameCanvas className="absolute inset-0 z-0 h-full w-full" />
      <span className="sr-only">Portrait of {profile.name} — move your cursor left and right to turn</span>

      {/* Theme-aware scrim for text legibility over the video */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--c-bg)] via-[var(--c-bg)]/10 to-[var(--c-bg)]/40" />
      <div className="absolute inset-0 z-[1] bg-[var(--c-bg)]/10" />

      {/* HUD frame, scoped to the hero */}
      {["top-6 left-6 border-t border-l", "top-6 right-6 border-t border-r", "bottom-6 left-6 border-b border-l", "bottom-6 right-6 border-b border-r"].map(
        (pos, i) => (
          <span key={i} className={`absolute z-[2] h-6 w-6 border-[var(--c-accent-soft)]/60 ${pos}`} />
        )
      )}
      <div className="absolute left-6 top-6 z-[2] font-mono text-[10px] uppercase tracking-widest text-[var(--c-text-faint)]">
        Scan // NP&ndash;01
      </div>
      <div className="absolute right-6 top-6 z-[2] flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--c-text-faint)]">
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[var(--c-accent-soft)]" />
        Online
      </div>

      {/* Floating AI core, tucked into a corner so it reads as a companion to
          the video rather than competing with it */}
      <div className="pointer-events-none absolute bottom-10 right-6 z-[2] hidden h-40 w-40 opacity-80 sm:block">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 3, 3]} intensity={0.8} />
            <AICore pointer={pointer} />
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl px-5 sm:px-8 md:px-10">
        {/* Intro label — fades in sharp; previously carried a permanent blur
            filter that never cleared, making the name illegible. Name is now
            oversized with a gradient fill so it reads as the visual anchor
            of the hero, with the role line as a smaller mono/accent tag
            underneath instead of blending into one plain sentence. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none mb-5 select-none sm:mb-6"
        >
          <p className="font-display text-[clamp(15px,2.6vw,18px)] font-normal text-[var(--c-text-muted)]">
            Hey there, I&rsquo;m
          </p>
          <h1 className="-mt-1 bg-gradient-to-r from-[var(--c-accent-soft)] via-[var(--c-accent)] to-[var(--c-accent-soft)] bg-clip-text font-display text-[clamp(42px,9vw,76px)] font-bold leading-[1.05] text-transparent">
            Nitesh Pandey
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[clamp(12px,2.2vw,14px)] uppercase tracking-[0.2em] text-[var(--c-text)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--c-accent-soft)]" />
            AI &bull; Robotics &bull; Cybersecurity Engineer
          </p>
        </motion.div>

        {/* Typewriter line */}
        <p className="mb-5 min-h-[54px] text-[clamp(18px,4vw,26px)] font-normal leading-[1.35] text-[var(--c-text)] sm:mb-6">
          {displayed}
          {!done && (
            <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-[blink_1s_step-end_infinite] bg-[var(--c-text)] align-middle" />
          )}
        </p>

        {/* Action pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap gap-y-1"
        >
          {PILLS.map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              target={pill.external ? "_blank" : undefined}
              rel={pill.external ? "noopener noreferrer" : undefined}
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[var(--c-border)] bg-[var(--c-bg)] px-4 py-[0.3em] text-[13px] text-[var(--c-text)] transition-colors duration-200 hover:bg-[var(--c-accent)] hover:text-[var(--c-accent-contrast)] sm:px-5 sm:text-[15px]"
            >
              {pill.label}
            </a>
          ))}
          <button
            onClick={copyEmail}
            className="mx-[0.2em] mb-[0.4em] inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[var(--c-text)] bg-transparent px-4 py-[0.3em] text-[13px] text-[var(--c-text)] transition-colors duration-200 hover:bg-[var(--c-text)] hover:text-[var(--c-bg)] sm:gap-3 sm:px-5 sm:text-[15px]"
          >
            {/* No whitespace-nowrap here — on very narrow phones a long
                email address in one unbreakable line could push past the
                viewport; break-all lets it wrap onto a second line inside
                the pill instead of overflowing. */}
            <span className="min-w-0 break-all text-left">
              Email me: <span className="underline underline-offset-1">{profile.personal.email}</span>
            </span>
            {copied ? <FaCheck className="h-3 w-3 shrink-0" /> : <FaRegCopy className="h-3 w-3 shrink-0" />}
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--c-text-faint)] md:block"
        animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Move your cursor to turn
      </motion.div>
    </section>
  );
}