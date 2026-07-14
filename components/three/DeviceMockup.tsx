"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

function LaptopBody({ activeStep }: { activeStep: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);
  const ledRef = useRef<THREE.Mesh>(null!);
  
  const textures = useTexture([
    "/images/screenshot-welcome.png",
    "/images/screenshot-system-check.png",
    "/images/screenshot-install-progress.png",
    "/images/screenshot-play-store.png",
    "/images/screenshot-complete.png",
    "/images/screenshot-webdav.png",
  ]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.08 + 0.05;
    }
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshBasicMaterial;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
      mat.opacity = 0.1 + pulse * 0.4;
    }
  });

  textures.forEach((tex) => {
    if (tex) {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
    }
  });

  return (
    <group ref={groupRef}>
      {/* === SCREEN / LID === */}
      <group position={[0, 0.65, -0.08]} rotation={[-0.08, 0, 0]}>
        {/* Screen content */}
        <mesh ref={screenRef} position={[0, 0, 0.011]}>
          <planeGeometry args={[3.0, 1.875]} />
          <meshBasicMaterial map={textures[activeStep] || textures[0]} toneMapped={false} />
        </mesh>

        {/* Screen glass overlay */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[3.0, 1.875]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.08}
            roughness={0.1}
            metalness={0.9}
            clearcoat={0.3}
            color="#0078d4"
          />
        </mesh>

        {/* Screen glow */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[3.4, 2.2]} />
          <meshBasicMaterial color="#0078d4" transparent opacity={0.015} />
        </mesh>

        {/* Bezel */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[3.4, 2.2, 0.04]} />
          <meshStandardMaterial color="#0d0d1a" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Inner bezel edge */}
        <mesh position={[0, 0, -0.015]}>
          <boxGeometry args={[3.1, 1.95, 0.005]} />
          <meshBasicMaterial color="#673de6" transparent opacity={0.04} />
        </mesh>

        {/* Bottom bezel - WSA branding */}
        <mesh position={[0, -1.06, 0.035]}>
          <planeGeometry args={[1.0, 0.06]} />
          <meshBasicMaterial color="#673de6" transparent opacity={0.12} />
        </mesh>

        {/* Front lip */}
        <mesh position={[0, -1.08, 0.08]}>
          <boxGeometry args={[3.4, 0.04, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Lid bottom LED strip */}
        <mesh ref={ledRef} position={[0, -1.1, 0.02]}>
          <boxGeometry args={[2.6, 0.02, 0.02]} />
          <meshBasicMaterial color="#673de6" transparent opacity={0.3} />
        </mesh>

        {/* Camera dot */}
        <mesh position={[0, 1.05, 0.035]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#1a1a2e" />
        </mesh>
        {/* Camera lens */}
        <mesh position={[0, 1.05, 0.042]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#0a0a0f" />
        </mesh>
      </group>

      {/* === HINGE === */}
      <group position={[0, 0.15, 0.5]}>
        <mesh rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 3.2, 12]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Hinge caps */}
        <mesh position={[-1.55, 0, 0]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.08, 12]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[1.55, 0, 0]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.08, 12]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* === BASE DECK === */}
      <mesh position={[0, -0.25, 0.55]}>
        <boxGeometry args={[3.2, 0.06, 2.2]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Keyboard area */}
      <mesh position={[0, -0.22, 0.3]}>
        <planeGeometry args={[2.6, 0.9]} />
        <meshStandardMaterial color="#111118" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Function row */}
      {Array.from({ length: 14 }).map((_, col) => (
        <mesh key={`fn-${col}`} position={[-1.32 + col * 0.2, -0.19, 0.02]}>
          <boxGeometry args={[0.17, 0.012, 0.1]} />
          <meshStandardMaterial color="#161625" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}

      {/* Keyboard keys - 6 rows x 12 cols + function row */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => {
          const isPowerKey = row === 0 && col === 11;
          return (
            <mesh key={`key-${row}-${col}`} position={[-1.2 + col * 0.22, -0.19, 0.7 - row * 0.16]}>
              <boxGeometry args={[0.19, 0.015, 0.13]} />
              <meshStandardMaterial
                color={isPowerKey ? "#673de6" : "#1a1a2e"}
                metalness={0.4}
                roughness={0.6}
                emissive={isPowerKey ? "#673de6" : "#000000"}
                emissiveIntensity={isPowerKey ? 0.3 : 0}
              />
            </mesh>
          );
        })
      )}

      {/* Space bar */}
      <mesh position={[0, -0.19, 1.27]}>
        <boxGeometry args={[0.8, 0.015, 0.13]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Modifier keys */}
      {[[-1.32, 0.7], [1.32, 0.7], [-1.32, 1.11], [1.32, 1.11]].map(([x, z], i) => (
        <mesh key={`mod-${i}`} position={[x, -0.19, z]}>
          <boxGeometry args={[0.24, 0.015, 0.13]} />
          <meshStandardMaterial color="#161625" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}

      {/* Trackpad */}
      <mesh position={[0, -0.19, 1.55]}>
        <planeGeometry args={[0.9, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Trackpad border */}
      <mesh position={[0, -0.195, 1.55]}>
        <planeGeometry args={[0.95, 0.45]} />
        <meshBasicMaterial color="#673de6" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>

      {/* === SIDE PORTS === */}
      {[-1.6, 1.6].map((x, side) => (
        <mesh key={`port-${side}`} position={[x, -0.24, 0.2]}>
          <boxGeometry args={[0.02, 0.05, 0.08]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* === FRONT EDGE === */}
      <mesh position={[0, -0.28, 1.65]}>
        <boxGeometry args={[3.2, 0.04, 0.08]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Battery indicator */}
      <mesh position={[0.0, -0.27, 1.7]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#30d158" transparent opacity={0.6} />
      </mesh>

      {/* === RUBBER FEET === */}
      {[[-1.2, 1.5], [1.2, 1.5], [-1.2, -0.2], [1.2, -0.2]].map(([x, z], i) => (
        <mesh key={`foot-${i}`} position={[x, -0.28, z]}>
          <cylinderGeometry args={[0.04, 0.05, 0.015, 6]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.1} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingOrb({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

function ParticleRing() {
  const count = 60;
  const ref = useRef<THREE.Group>(null!);
  const positions = useRef<[number, number, number][]>(
    Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.8;
      const y = (Math.random() - 0.5) * 1.8;
      return [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number];
    })
  );

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {positions.current.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 4, 4]} />
          <meshBasicMaterial
            color="#673de6"
            transparent
            opacity={0.15 + Math.random() * 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ activeStep }: { activeStep: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-3, 2, -2]} intensity={0.25} color="#673de6" />
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#673de6" />
      <pointLight position={[-2, -1, 3]} intensity={0.2} color="#30d158" />
      <pointLight position={[2, -1, 1]} intensity={0.15} color="#ff9f0a" />

      <Suspense fallback={null}>
        <LaptopBody activeStep={activeStep} />
      </Suspense>

      <ParticleRing />

      <FloatingOrb position={[3.0, 1.8, -1.5]} color="#673de6" size={0.12} />
      <FloatingOrb position={[-3.2, -0.5, -2.0]} color="#00bcd4" size={0.08} />
      <FloatingOrb position={[2.5, -1.2, -2.5]} color="#30d158" size={0.1} />
      <FloatingOrb position={[-2.8, 2.0, -1.0]} color="#ff9f0a" size={0.06} />
      <FloatingOrb position={[0.0, 2.5, -2.8]} color="#673de6" size={0.09} />
      <FloatingOrb position={[3.5, 0.5, 0.5]} color="#00bcd4" size={0.07} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial color="#0a0a0f" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

export default function DeviceMockup({ activeStep = 0 }: { activeStep?: number }) {
  return (
    <div className="group relative h-full w-full">
      {/* Ambient glow behind device */}
      <div className="pointer-events-none absolute -inset-20 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <Canvas
        camera={{ position: [0, 0.4, 4.8], fov: 30 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene activeStep={activeStep} />
      </Canvas>
    </div>
  );
}
