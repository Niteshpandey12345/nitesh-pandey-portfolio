"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillGalaxy } from "@/components/three/SkillGalaxy";
import { profile } from "@/lib/data";

export function Skills() {
  // On touch devices, a one-finger drag on the canvas would otherwise be
  // captured by OrbitControls as "orbit" and block the page from scrolling
  // past this section. Disabling manual rotation there (autoRotate still
  // spins it for visual interest) keeps normal page scroll working with one
  // finger on phones/tablets; desktop keeps the click-drag-to-orbit feature.
  const [allowDrag, setAllowDrag] = useState(true);

  useEffect(() => {
    setAllowDrag(window.matchMedia("(pointer: fine)").matches);
  }, []);

  return (
    <section id="skills" className="relative bg-[var(--c-bg-soft)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="A technology galaxy, not a progress bar"
          description="Drag to orbit on desktop (auto-rotates on mobile) — hover or tap a node for detail. Ring distance groups each skill by domain; node size reflects proficiency."
          align="center"
        />

        <div
          className="relative mx-auto mt-14 h-[320px] max-w-3xl overflow-hidden rounded-3xl border border-[var(--c-border)] bg-[var(--c-bg-raised)] sm:h-[420px] lg:h-[480px]"
          style={{ touchAction: "pan-y" }}
        >
          <Suspense fallback={<div className="flex h-full items-center justify-center text-[var(--c-text-faint)]">Loading…</div>}>
            <Canvas camera={{ position: [0, 2.4, 6], fov: 50 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[4, 4, 4]} intensity={0.6} />
              <SkillGalaxy skills={profile.skills} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={allowDrag}
                autoRotate
                autoRotateSpeed={0.6}
              />
            </Canvas>
          </Suspense>
        </div>

        {/* Plain, always-visible skill list — the 3D galaxy above only shows a
            skill's name on hover, one node at a time, so this is the readable
            reference for everything it represents (also serves as the
            accessible/no-WebGL fallback). */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {profile.skills.map((s) => (
            <span
              key={s.name}
              className="rounded-full border border-[var(--c-border)] bg-[var(--c-bg)] px-4 py-1.5 text-sm text-[var(--c-text)]"
            >
              {s.name}
              {s.level ? <span className="ml-1.5 text-[var(--c-accent-soft)]">{s.level}%</span> : null}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["AI/ML", "Robotics", "Security", "Tooling"].map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-[var(--c-border)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-[var(--c-text-muted)]"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}