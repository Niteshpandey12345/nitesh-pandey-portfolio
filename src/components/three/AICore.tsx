"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/layout/ThemeProvider";
import { THREE_PALETTES } from "@/lib/threeTheme";

/**
 * The hero's 3D centerpiece: a glowing icosahedral "AI core" wrapped in two
 * independently-tilted rings, floating beside the portrait video. Built
 * from primitive geometry only — no external model files. `pointer` (in
 * normalized -1..1 device coords) lets it tilt gently toward the cursor.
 * Colors switch between the dark (electric/cyan/violet) and light
 * (grayscale-only) palettes via THREE_PALETTES.
 */
export function AICore({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { theme } = useTheme();
  const palette = THREE_PALETTES[theme];
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (core.current) {
      core.current.rotation.y += delta * 0.4;
      core.current.rotation.x += delta * 0.15;
      const pulse = 1 + Math.sin(t * 1.6) * 0.06;
      core.current.scale.setScalar(pulse);
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.3;
    if (ringB.current) ringB.current.rotation.x += delta * 0.22;

    if (group.current) {
      // Gentle float + parallax toward the cursor, eased rather than snapped.
      group.current.position.y = Math.sin(t * 0.8) * 0.15;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x * 0.3, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y * 0.2, 0.04);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={palette.core}
          emissive={palette.core}
          emissiveIntensity={1.6}
          metalness={0.3}
          roughness={0.15}
          wireframe
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color={palette.dark} metalness={0.6} roughness={0.25} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.6, 0.012, 8, 96]} />
        <meshStandardMaterial color={palette.ring} emissive={palette.ring} emissiveIntensity={1.2} />
      </mesh>

      <mesh ref={ringB} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.05, 0.008, 8, 96]} />
        <meshStandardMaterial color={palette.ring2} emissive={palette.ring2} emissiveIntensity={0.9} />
      </mesh>

      <pointLight color={palette.light} intensity={8} distance={6} />
    </group>
  );
}
