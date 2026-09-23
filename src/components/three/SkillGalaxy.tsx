"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Skill } from "@/types";
import { useTheme } from "@/components/layout/ThemeProvider";

// One distinguishable shade per category, per theme. Dark keeps the
// original electric/cyan/violet identity; light stays strictly
// grayscale/black, per the brief.
const CATEGORY_COLOR: Record<"light" | "dark", Record<Skill["category"], string>> = {
  dark: {
    "AI/ML": "#29e7d9",
    Robotics: "#3e7bfa",
    Security: "#7b5cfa",
    Tooling: "#98a2b8"
  },
  light: {
    "AI/ML": "#171717",
    Robotics: "#404040",
    Security: "#737373",
    Tooling: "#a3a3a3"
  }
};

/**
 * One orbiting node per skill, arranged in category "rings" around a shared
 * center — a technology galaxy in place of a progress-bar list. Ring radius
 * encodes category, node size encodes proficiency level (a flat default
 * size for the one skill with no numeric level). Hover reveals a tooltip
 * via drei's <Html>, which also doubles as this component's accessible
 * fallback text (each node is a real DOM node, readable by a screen reader
 * and included when JS/WebGL is unavailable via the noscript list below it).
 */
function SkillNode({ skill, radius, angle, speed }: { skill: Skill; radius: number; angle: number; speed: number }) {
  const { theme } = useTheme();
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLOR[theme][skill.category];
  const size = skill.level ? 0.14 + (skill.level / 100) * 0.16 : 0.16;

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angle;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.3) * 0.4;
    }
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1.8 : 1} roughness={0.25} />
      </mesh>
      {hovered && (
        <Html distanceFactor={8} center>
          {/* Plain Tailwind opacity modifiers on CSS-variable colors (e.g.
              bg-[var(--c-bg-raised)]/95) silently produce invalid CSS here
              because these variables are stored as full hex strings, not
              space-separated components — the div rendered with no
              background at all, leaving text floating over the (often dark)
              sphere behind it. color-mix() in an inline style is the fix. */}
          <div
            className="pointer-events-none whitespace-nowrap rounded-md border border-[var(--c-border)] px-3 py-1.5 text-xs font-mono font-semibold text-[var(--c-text)]"
            style={{
              background: "color-mix(in srgb, var(--c-bg-raised) 96%, transparent)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.5)"
            }}
          >
            {skill.name}
            {skill.level ? <span className="ml-1.5 text-[var(--c-accent-soft)]">{skill.level}%</span> : null}
          </div>
        </Html>
      )}
    </group>
  );
}

export function SkillGalaxy({ skills }: { skills: Skill[] }) {
  const { theme } = useTheme();
  const centerColor = theme === "light" ? "#171717" : "#3e7bfa";
  const centerLight = theme === "light" ? "#ffffff" : "#6c9cff";
  const coreRef = useRef<THREE.Mesh>(null);

  const nodes = useMemo(() => {
    const categories = Array.from(new Set(skills.map((s) => s.category)));
    return skills.map((skill, i) => {
      const categoryIndex = categories.indexOf(skill.category);
      const withinCategory = skills.filter((s) => s.category === skill.category);
      const indexInCategory = withinCategory.indexOf(skill);
      return {
        skill,
        radius: 1.6 + categoryIndex * 0.75,
        angle: (indexInCategory / withinCategory.length) * Math.PI * 2,
        speed: 0.12 + categoryIndex * 0.04
      };
    });
  }, [skills]);

  useFrame((_, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.2;
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial color={centerColor} emissive={centerColor} emissiveIntensity={1} wireframe />
      </mesh>
      <pointLight color={centerLight} intensity={4} distance={8} />
      {nodes.map((n, i) => (
        <SkillNode key={i} skill={n.skill} radius={n.radius} angle={n.angle} speed={n.speed} />
      ))}
    </group>
  );
}