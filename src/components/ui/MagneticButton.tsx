"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}

/**
 * A button that gently pulls toward the cursor on hover (a "magnetic"
 * micro-interaction), snapping back on leave. Pure transform-based motion
 * — no layout thrash — and disabled for touch/no-hover devices via the
 * pointer:fine check below, where it just behaves like a normal button.
 */
export function MagneticButton({ href, children, variant = "primary", external, className }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * 0.25, y: relY * 0.35 });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const styles = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200",
    variant === "primary"
      ? "bg-[var(--c-accent)] text-white hover:bg-[var(--c-accent-soft)] hover:text-[var(--c-bg)]"
      : "border border-[var(--c-border)] text-[var(--c-text)] hover:border-[var(--c-accent-soft)] hover:text-[var(--c-accent-soft)]",
    className
  );

  const content = (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className={styles}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor="magnetic"
    >
      {children}
    </motion.a>
  );

  return content;
}
