"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/layout/ThemeProvider";
import { THREE_PALETTES } from "@/lib/threeTheme";

/**
 * A small wireframe globe with scattered "connection point" dots — the
 * contact section's centerpiece, standing in for a literal world map while
 * staying consistent with the rest of the site's primitive-geometry style.
 */
export function AnimatedGlobe() {
  const { theme } = useTheme();
  const palette = THREE_PALETTES[theme];
  const globeRef = useRef<THREE.Group>(null);
  const dotsRef = useRef<THREE.Points>(null);

  const dotPositions = useMemo(() => {
    const count = 140;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.55;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.15;
    if (dotsRef.current) dotsRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshStandardMaterial color={palette.ring} wireframe transparent opacity={0.35} />
        </mesh>
      </group>
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color={palette.core} sizeAttenuation />
      </points>
      <pointLight color={palette.light} intensity={3} distance={6} />
      <ambientLight intensity={0.4} />
    </group>
  );
}
