"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Shape({ position, scale, color, speed, distort }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  // eslint-disable-next-line react-hooks/purity
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005 * speed;
      mesh.current.rotation.y += 0.008 * speed;
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.3 + randomOffset) * 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.12}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]} scale={1.5}>
      <torusKnotGeometry args={[1, 0.3, 64, 8]} />
      <meshStandardMaterial
        color="#0078d4"
        transparent
        opacity={0.05}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <TorusKnot />
      <Shape position={[-4, 3, -3]} scale={1.2} color="#0078d4" speed={1.2} distort={0.3} />
      <Shape position={[4, -2, -4]} scale={0.8} color="#00bcd4" speed={0.8} distort={0.4} />
      <Shape position={[-3, -3, -2]} scale={0.6} color="#30d158" speed={1.5} distort={0.2} />
      <Shape position={[5, 3, -5]} scale={1} color="#0078d4" speed={0.6} distort={0.35} />
      <Shape position={[-5, -1, -6]} scale={0.9} color="#00bcd4" speed={1.0} distort={0.25} />
    </>
  );
}

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
