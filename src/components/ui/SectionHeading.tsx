"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}
    >
      <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-accent-soft)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--c-accent-soft)] shadow-[0_0_8px_theme(colors.cyan.DEFAULT)]" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold text-[var(--c-text)] sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-[var(--c-text-muted)]">{description}</p>}
    </motion.div>
  );
}
