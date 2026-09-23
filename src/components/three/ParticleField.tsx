"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/layout/ThemeProvider";
import { THREE_PALETTES } from "@/lib/threeTheme";

/**
 * Ambient "digital universe" backdrop — a slow-drifting point cloud used
 * behind the hero and as a quiet background layer elsewhere. Cheap to
 * render (single BufferGeometry, no per-particle objects) so it holds 60fps
 * alongside the other 3D elements. Color defaults to the current theme's
 * particle color (cyan in dark, neutral gray in light) — pass `color` to
 * override.
 */
export function ParticleField({ count = 900, radius = 9, color }: { count?: number; radius?: number; color?: string }) {
  const { theme } = useTheme();
  const resolvedColor = color ?? THREE_PALETTES[theme].particle;
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.3 + Math.random() * 0.7);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color={resolvedColor} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}
