"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Hologram3DProps {
  visible: boolean;
}

const PARTICLE_SPEEDS = [0.65, 0.8, 0.55, 0.9, 0.72, 0.6];

export default function Hologram3D({ visible }: Hologram3DProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const cpuRef = useRef<THREE.Mesh>(null!);
  const platterRef = useRef<THREE.Mesh>(null!);
  const ram1Ref = useRef<THREE.Mesh>(null!);
  const ram2Ref = useRef<THREE.Mesh>(null!);
  const opacityRef = useRef(0);

  useFrame((state) => {
    // 1. Calculate opacity internally
    const targetOpacity = visible ? 1.0 : 0.0;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.08);
    const opacity = opacityRef.current;

    if (opacity <= 0.01) {
      if (groupRef.current) groupRef.current.visible = false;
      return;
    }
    if (groupRef.current) groupRef.current.visible = true;

    const time = state.clock.getElapsedTime();

    // 2. Slow rotation of the entire hologram motherboard
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.4;
    }

    // 3. CPU pulse animation
    if (cpuRef.current) {
      const cpuMaterial = cpuRef.current.material as THREE.MeshBasicMaterial;
      cpuMaterial.opacity = (0.4 + Math.sin(time * 6) * 0.25) * opacity;
    }

    // 4. Disk Platter spin
    if (platterRef.current) {
      platterRef.current.rotation.z = time * 2.5;
    }

    // 5. Alternating RAM indicator heights
    if (ram1Ref.current && ram2Ref.current) {
      const h1 = 0.25 + Math.sin(time * 3) * 0.1;
      const h2 = 0.25 + Math.cos(time * 3) * 0.1;
      ram1Ref.current.scale.y = h1;
      ram2Ref.current.scale.y = h2;
      
      const ramMat1 = ram1Ref.current.material as THREE.MeshBasicMaterial;
      const ramMat2 = ram2Ref.current.material as THREE.MeshBasicMaterial;
      ramMat1.opacity = 0.8 * opacity;
      ramMat2.opacity = 0.8 * opacity;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.45, 0.1]} scale={1.1} visible={false}>
      {/* 1. Motherboard Grid Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial
          color="#00bcd4"
          wireframe
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Outer borders of the motherboard grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.52, 1.52]} />
        <meshBasicMaterial
          color="#0078d4"
          transparent
          opacity={0.25}
          wireframe
          depthWrite={false}
        />
      </mesh>

      {/* Grid lines connecting components */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <gridHelper args={[1.4, 8, "#00bcd4", "#00bcd4"]} />
      </mesh>

      {/* 2. CPU Core Component */}
      <group position={[0, 0.05, 0]}>
        {/* Core substrate */}
        <mesh>
          <boxGeometry args={[0.38, 0.04, 0.38]} />
          <meshBasicMaterial
            color="#08081a"
            transparent
            opacity={0.7}
          />
        </mesh>
        
        {/* CPU Pins / Outer outline */}
        <mesh>
          <boxGeometry args={[0.4, 0.045, 0.4]} />
          <meshBasicMaterial
            color="#00bcd4"
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Pulsing Core center */}
        <mesh ref={cpuRef} position={[0, 0.03, 0]}>
          <boxGeometry args={[0.2, 0.04, 0.2]} />
          <meshBasicMaterial
            color="#30d158"
            transparent
            opacity={0.6}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* 3. RAM Sticks */}
      <group position={[-0.45, 0.15, -0.2]}>
        {/* Socket */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.1, 0.04, 0.5]} />
          <meshBasicMaterial color="#00bcd4" transparent opacity={0.3} wireframe />
        </mesh>

        {/* RAM Stick 1 */}
        <mesh ref={ram1Ref} position={[-0.02, 0, 0]}>
          <boxGeometry args={[0.015, 0.3, 0.4]} />
          <meshBasicMaterial
            color="#30d158"
            transparent
            opacity={0.6}
            toneMapped={false}
          />
        </mesh>
        
        {/* RAM Stick 2 */}
        <mesh ref={ram2Ref} position={[0.02, 0, 0]}>
          <boxGeometry args={[0.015, 0.3, 0.4]} />
          <meshBasicMaterial
            color="#00bcd4"
            transparent
            opacity={0.6}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* 4. Disk Drive Platter (SSD / HDD model) */}
      <group position={[0.45, 0.1, 0.2]}>
        {/* Enclosure base */}
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[0.38, 0.04, 0.38]} />
          <meshBasicMaterial color="#0078d4" transparent opacity={0.3} wireframe />
        </mesh>

        {/* Spinning Platter disc */}
        <mesh ref={platterRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.01, 24]} />
          <meshBasicMaterial
            color="#00bcd4"
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>

        {/* Floating read/write arm */}
        <mesh position={[-0.08, 0.04, 0.08]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.14, 0.01, 0.02]} />
          <meshBasicMaterial color="#30d158" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* 5. Glowing data beacons rising up (particles) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.3;
        const z = Math.sin(angle) * 0.3;
        const speed = PARTICLE_SPEEDS[i];
        
        return (
          <RisingParticle
            key={`part-${i}`}
            x={x}
            z={z}
            speed={speed}
            opacityRef={opacityRef}
          />
        );
      })}
    </group>
  );
}

// Particle helper that rises and loops
function RisingParticle({
  x,
  z,
  speed,
  opacityRef,
}: {
  x: number;
  z: number;
  speed: number;
  opacityRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const y = ((time * speed) % 0.8) - 0.1; // rise up to 0.7 units and loop
    meshRef.current.position.y = y;

    // Fade out as it rises
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = (1.0 - y / 0.8) * 0.8 * opacityRef.current;
  });

  return (
    <mesh ref={meshRef} position={[x, 0, z]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="#00bcd4" transparent opacity={0.8} toneMapped={false} />
    </mesh>
  );
}
