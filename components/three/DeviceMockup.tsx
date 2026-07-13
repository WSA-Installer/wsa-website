"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function LaptopBody() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Screen bezel */}
      <mesh position={[0, 0.6, -0.05]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[3.2, 2.2, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Screen display */}
      <mesh position={[0, 0.6, 0.01]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[2.8, 1.8]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          thickness={0.5}
          roughness={0.0}
          transmission={0.95}
          clearcoat={0.1}
          clearcoatRoughness={0.1}
          color="#0078d4"
          opacity={0.3}
        />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 0.6, 0.02]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshBasicMaterial color="#0078d4" transparent opacity={0.03} />
      </mesh>

      {/* Keyboard deck */}
      <mesh position={[0, -0.3, 0.5]}>
        <boxGeometry args={[3.2, 0.08, 2]} />
        <meshStandardMaterial color="#12121a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Keyboard keys - row */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[-1.2 + col * 0.27, -0.25, -0.5 + row * 0.27]}
          >
            <boxGeometry args={[0.22, 0.02, 0.22]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
          </mesh>
        ))
      )}

      {/* Trackpad */}
      <mesh position={[0, -0.25, -0.8]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Hinge */}
      <mesh position={[0, 0.2, 0.5]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 3.2, 8]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function WSAIcon({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-3, 2, -2]} intensity={0.2} color="#00bcd4" />
      <pointLight position={[0, 3, 2]} intensity={0.3} color="#0078d4" />
      <LaptopBody />
      <WSAIcon position={[2.5, 1.5, -1]} color="#0078d4" />
      <WSAIcon position={[-2.5, -1, -1.5]} color="#00bcd4" />
      <WSAIcon position={[2, -1.5, -2]} color="#30d158" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#0a0a0f" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export default function DeviceMockup() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.3, 4.5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
