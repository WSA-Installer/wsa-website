"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

function generateScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 0, 640);
  gradient.addColorStop(0, "#0f0f23");
  gradient.addColorStop(0.5, "#1a1a3e");
  gradient.addColorStop(1, "#0a0a1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 640);

  ctx.shadowColor = "rgba(0, 120, 212, 0.2)";
  ctx.shadowBlur = 20;

  ctx.fillStyle = "#0078d4";
  ctx.beginPath();
  ctx.roundRect(60, 40, 160, 40, 8);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 18px 'Segoe UI', sans-serif";
  ctx.fillText("WSA Installer", 70, 67);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "14px 'Segoe UI', sans-serif";
  ctx.fillText("v1.2.0", 230, 67);

  ctx.shadowBlur = 0;

  const steps = [
    { label: "Welcome", x: 60, color: "#0078d4", active: true },
    { label: "Check", x: 230, color: "#00bcd4", active: true },
    { label: "Install", x: 370, color: "#30d158", active: true },
    { label: "Play Store", x: 520, color: "#ff9f0a", active: false },
    { label: "Complete", x: 700, color: "rgba(255,255,255,0.2)", active: false },
  ];

  steps.forEach((step, i) => {
    const y = 120;
    const active = step.active;

    ctx.fillStyle = active ? step.color : "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.roundRect(step.x, y, 90, 28, 6);
    ctx.fill();

    ctx.fillStyle = active ? "#ffffff" : "rgba(255,255,255,0.3)";
    ctx.font = "12px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(step.label, step.x + 45, y + 19);
    ctx.textAlign = "start";

    if (i < steps.length - 1) {
      ctx.strokeStyle = active ? "rgba(0,120,212,0.3)" : "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(step.x + 95, y + 14);
      ctx.lineTo(steps[i + 1].x - 5, y + 14);
      ctx.stroke();
    }
  });

  ctx.fillStyle = "#0078d4";
  ctx.beginPath();
  ctx.roundRect(60, 180, 300, 180, 12);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px 'Segoe UI', sans-serif";
  ctx.fillText("System Check", 90, 220);

  const checks = [
    { label: "Virtualization", status: "✓ Enabled", color: "#30d158" },
    { label: "Hyper-V", status: "✓ Enabled", color: "#30d158" },
    { label: "VMP", status: "✓ Enabled", color: "#30d158" },
    { label: "WSL", status: "✓ Enabled", color: "#30d158" },
  ];

  checks.forEach((check, i) => {
    const y = 255 + i * 28;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "14px 'Segoe UI', sans-serif";
    ctx.fillText(check.label, 90, y);

    ctx.fillStyle = check.color;
    ctx.font = "bold 14px 'Segoe UI', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(check.status, 340, y);
    ctx.textAlign = "start";
  });

  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.roundRect(400, 180, 250, 180, 12);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "bold 16px 'Segoe UI', sans-serif";
  ctx.fillText("Download Progress", 420, 220);

  ctx.fillStyle = "#30d158";
  ctx.beginPath();
  ctx.roundRect(420, 235, 200, 8, 4);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillStyle = "#00bcd4";
  ctx.beginPath();
  ctx.roundRect(420, 235, 140, 8, 4);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "12px 'Segoe UI', sans-serif";
  ctx.fillText("Downloading WSA 2407... 70% — 12 MB/s", 420, 265);

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath();
  ctx.roundRect(60, 390, 590, 120, 12);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = "12px 'Segoe UI', sans-serif";
  ctx.fillText("ℹ Windows Subsystem for Android is being installed. This may take a few minutes.", 80, 420);

  ctx.fillStyle = "#0078d4";
  ctx.font = "bold 13px 'Segoe UI', sans-serif";
  ctx.fillText("▼ View detailed log", 80, 460);

  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.roundRect(690, 180, 280, 330, 12);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "bold 12px 'Segoe UI', sans-serif";
  ctx.fillText("REQUIREMENTS", 710, 210);

  const reqs = [
    { label: "✓ Windows 11/10", color: "#30d158" },
    { label: "✓ 8 GB RAM", color: "#30d158" },
    { label: "✓ 10 GB Storage", color: "#30d158" },
    { label: "✓ VT-x/AMD-V", color: "#30d158" },
  ];

  reqs.forEach((req, i) => {
    ctx.fillStyle = req.color;
    ctx.font = "13px 'Segoe UI', sans-serif";
    ctx.fillText(req.label, 710, 240 + i * 28);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function LaptopBody() {
  const groupRef = useRef<THREE.Group>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);
  const screenTexture = useMemo(() => generateScreenTexture(), []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.08 + 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0, 0.65, -0.08]} rotation={[-0.08, 0, 0]}>
        {/* Screen content */}
        <mesh ref={screenRef} position={[0, 0, 0.011]}>
          <planeGeometry args={[3.0, 1.875]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
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
          <meshStandardMaterial
            color="#0d0d1a"
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>

        {/* Front lip */}
        <mesh position={[0, -1.08, 0.08]}>
          <boxGeometry args={[3.4, 0.04, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Camera dot */}
        <mesh position={[0, 1.05, 0.035]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#1a1a2e" />
        </mesh>
      </group>

      {/* Hinge */}
      <mesh position={[0, 0.15, 0.5]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3.2, 12]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Base deck */}
      <mesh position={[0, -0.25, 0.55]}>
        <boxGeometry args={[3.2, 0.06, 2.2]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Keyboard area */}
      <mesh position={[0, -0.22, 0.3]}>
        <planeGeometry args={[2.6, 0.9]} />
        <meshStandardMaterial color="#111118" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Keyboard keys */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[
              -1.2 + col * 0.22,
              -0.19,
              0.7 - row * 0.16,
            ]}
          >
            <boxGeometry args={[0.19, 0.015, 0.13]} />
            <meshStandardMaterial
              color={row === 0 && col === 11 ? "#0078d4" : "#1a1a2e"}
              metalness={0.4}
              roughness={0.6}
              emissive={row === 0 && col === 11 ? "#0078d4" : "#000000"}
              emissiveIntensity={row === 0 && col === 11 ? 0.3 : 0}
            />
          </mesh>
        ))
      )}

      {/* Space bar */}
      <mesh position={[0, -0.19, 1.27]}>
        <boxGeometry args={[0.8, 0.015, 0.13]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, -0.19, 1.55]}>
        <planeGeometry args={[0.9, 0.4]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Trackpad border */}
      <mesh position={[0, -0.195, 1.55]}>
        <planeGeometry args={[0.95, 0.45]} />
        <meshBasicMaterial
          color="#0078d4"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Front edge */}
      <mesh position={[0, -0.28, 1.65]}>
        <boxGeometry args={[3.2, 0.04, 0.08]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.6} roughness={0.5} />
      </mesh>
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

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.15} color="#00bcd4" />
      <pointLight position={[0, 3, 2]} intensity={0.2} color="#0078d4" />
      <pointLight position={[-2, -1, 3]} intensity={0.1} color="#30d158" />

      <LaptopBody />

      <FloatingOrb position={[3.0, 1.8, -1.5]} color="#0078d4" size={0.12} />
      <FloatingOrb position={[-3.2, -0.5, -2.0]} color="#00bcd4" size={0.08} />
      <FloatingOrb position={[2.5, -1.2, -2.5]} color="#30d158" size={0.1} />
      <FloatingOrb position={[-2.8, 2.0, -1.0]} color="#ff9f0a" size={0.06} />
      <FloatingOrb position={[0.0, 2.5, -2.8]} color="#0078d4" size={0.09} />
      <FloatingOrb position={[3.5, 0.5, 0.5]} color="#00bcd4" size={0.07} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial color="#0a0a0f" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

export default function DeviceMockup() {
  return (
    <div className="group relative h-full w-full">
      {/* Ambient glow behind device */}
      <div className="pointer-events-none absolute -inset-20 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <Canvas
        camera={{ position: [0, 0.4, 4.8], fov: 30 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
