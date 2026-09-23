"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export function StatCounter({
  value,
  suffix,
  label,
  href
}: {
  value: number;
  suffix: string;
  label: string;
  /** Optional link target — e.g. "Research articles" → ResearchGate, or
   * "Patented projects" → Google Scholar. When present, the whole card
   * becomes a clickable link with its own hover treatment (border glow +
   * lift) so it reads as interactive rather than a plain stat. */
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [isInView, value]);

  const cardContent = (
    <>
      <div className="font-mono text-3xl font-semibold text-gradient sm:text-4xl">
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-[var(--c-text-muted)]">{label}</div>
      {href && (
        <div className="mt-2 text-[11px] font-mono uppercase tracking-wide text-[var(--c-accent-soft)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View profile &rarr;
        </div>
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={
        href
          ? "group glass rounded-2xl px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[var(--c-accent-soft)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          : "glass rounded-2xl px-6 py-8 text-center"
      }
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}