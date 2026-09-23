"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A small ring cursor that trails the pointer and grows over interactive
 * elements (anything with data-cursor="magnetic", or a link/button).
 * Only activates for fine-pointer devices with motion allowed — everywhere
 * else the native cursor is left alone, and .custom-cursor-active (the
 * class that hides it via globals.css) is never applied.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setActive(true);
    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
      const target = e.target as HTMLElement;
      setHoveringInteractive(Boolean(target.closest('a, button, [data-cursor="magnetic"]')));
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      animate={{ scale: hoveringInteractive ? 1.8 : 1 }}
      transition={{ scale: { duration: 0.2 } }}
      className="pointer-events-none fixed left-0 top-0 z-[200] h-6 w-6 rounded-full border border-[var(--c-accent-soft)] mix-blend-difference"
      aria-hidden="true"
    />
  );
}
