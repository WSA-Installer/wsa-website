"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generatePositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  return pos;
}

function generateColors(count: number) {
  const c = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    c[i * 3] = 0 + t * 0.47;
    c[i * 3 + 1] = 0.47 + t * 0.27;
    c[i * 3 + 2] = 0.83 + t * 0.08;
  }
  return c;
}

function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const positions = useMemo(() => generatePositions(count), [count]);
  const colors = useMemo(() => generateColors(count), [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += (Math.sin(state.clock.elapsedTime * 0.05) * 0.0003);
    mesh.current.rotation.y += 0.0005;
    mesh.current.rotation.z += (Math.cos(state.clock.elapsedTime * 0.03) * 0.0002);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
