"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * A 3D tilt-on-hover wrapper (pointer position → rotateX/rotateY) with a
 * moving specular highlight layered on top for depth. Disabled on
 * coarse-pointer (touch) devices, where hover has no meaning anyway.
 */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 14;
    setTransform(`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`);
    setGlow({ x: px * 100, y: py * 100, opacity: 1 });
  }

  function handleLeave() {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setGlow((g) => ({ ...g, opacity: 0 }));
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transition: "transform 200ms ease-out" }}
      className={`glass relative overflow-hidden rounded-2xl ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--c-accent-soft) 16%, transparent), transparent 60%)`
        }}
      />
      {children}
    </motion.div>
  );
}
