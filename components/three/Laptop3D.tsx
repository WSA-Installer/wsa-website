"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Laptop3DProps {
  scrollState: number; // 0 to 4 corresponding to sections
  scrollProgress: number; // relative progress in section
  activeStep?: number; // step within How It Works (1-6)
  openRatio?: number; // 0 (closed) to 1 (fully open)
}

// Draw dynamic content onto the canvas texture
function updateCanvasScreen(
  canvas: HTMLCanvasElement,
  state: number,
  progress: number,
  activeStep: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // Clear background
  const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
  bgGradient.addColorStop(0, "#080810");
  bgGradient.addColorStop(0.5, "#0d0d1e");
  bgGradient.addColorStop(1, "#05050b");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, w, h);

  // Draw Header Bar
  ctx.fillStyle = "rgba(0, 120, 212, 0.15)";
  ctx.fillRect(0, 0, w, 60);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px 'Segoe UI', sans-serif";
  ctx.fillText("WSA Installer Droid OS", 30, 38);

  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = "14px monospace";
  ctx.fillText("v1.2.0.0", w - 100, 37);

  // Draw Section Content
  if (state === 0) {
    // === HERO / WELCOME STATE ===
    ctx.shadowColor = "rgba(0, 120, 212, 0.4)";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "#0078d4";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 120, h / 2 - 110, 240, 60, 12);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("INITIALIZING WSA", w / 2, h / 2 - 72);
    ctx.textAlign = "left";

    // Pulsing circle
    const pulseRadius = 15 + Math.sin(Date.now() * 0.005) * 4;
    ctx.fillStyle = "rgba(0, 188, 212, 0.25)";
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 + 10, pulseRadius + 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#00bcd4";
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 + 10, pulseRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Status: Waiting for scroll activation...", w / 2, h / 2 + 90);
    ctx.fillText("Ready to install Google Play Store & Android Subsystem", w / 2, h / 2 + 120);
    ctx.textAlign = "left";

  } else if (state === 1) {
    // === FEATURES STATE ===
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 22px 'Segoe UI', sans-serif";
    ctx.fillText("SYSTEM FEATURES DETECTED", 50, 110);

    const features = [
      { name: "✓ Smart System Scan", desc: "CPUID & VM detection", color: "#30d158" },
      { name: "✓ Auto Configuration", desc: "Enables virtual machine platform", color: "#30d158" },
      { name: "✓ Play Store Patching", desc: "Integrates GApps dynamically", color: "#0078d4" },
      { name: "✓ File Sharing", desc: "Mounts Android via WebDAV", color: "#00bcd4" },
    ];

    features.forEach((feat, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 50 + col * 460;
      const y = 150 + row * 120;

      // Draw feature box
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, 420, 90, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = feat.color;
      ctx.font = "bold 18px 'Segoe UI', sans-serif";
      ctx.fillText(feat.name, x + 20, y + 35);

      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "14px 'Segoe UI', sans-serif";
      ctx.fillText(feat.desc, x + 20, y + 65);
    });

  } else if (state === 2) {
    // === HOW IT WORKS / STEP STATE ===
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 22px 'Segoe UI', sans-serif";
    ctx.fillText(`INSTALLATION WORKFLOW (STEP ${activeStep}/6)`, 50, 110);

    // Timeline bar
    const barWidth = w - 100;
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.roundRect(50, 140, barWidth, 12, 6);
    ctx.fill();

    const filledWidth = (activeStep / 6) * barWidth;
    const progressGrad = ctx.createLinearGradient(50, 0, 50 + filledWidth, 0);
    progressGrad.addColorStop(0, "#0078d4");
    progressGrad.addColorStop(0.5, "#00bcd4");
    progressGrad.addColorStop(1, "#30d158");
    ctx.fillStyle = progressGrad;
    ctx.beginPath();
    ctx.roundRect(50, 140, filledWidth, 12, 6);
    ctx.fill();

    // Steps list
    const stepNames = ["Download", "Elevation", "Sys-Check", "WSA Setup", "GApps Patch", "Complete"];
    stepNames.forEach((name, idx) => {
      const isPassed = idx < activeStep;
      const isCurrent = idx === activeStep - 1;
      const x = 50 + (idx / 5) * (barWidth - 60);

      ctx.fillStyle = isPassed
        ? "#30d158"
        : isCurrent
        ? "#00bcd4"
        : "rgba(255,255,255,0.2)";
      ctx.beginPath();
      ctx.arc(x + 30, 146, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isCurrent ? "#ffffff" : "rgba(255,255,255,0.5)";
      ctx.font = isCurrent ? "bold 13px 'Segoe UI', sans-serif" : "12px 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(name, x + 30, 185);
      ctx.textAlign = "left";
    });

    // Sub-dialog simulating task logs
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.roundRect(50, 220, w - 100, 180, 10);
    ctx.fill();

    ctx.fillStyle = "#30d158";
    ctx.font = "14px monospace";
    ctx.fillText("> Connecting to download repositories... SUCCESS", 70, 255);
    if (activeStep >= 2) ctx.fillText("> Verifying administrative access tokens... ELEVATED", 70, 280);
    if (activeStep >= 3) ctx.fillText("> Checking CPU Virtualization (VT-x/AMD-V)... ACTIVE (CPUID mode)", 70, 305);
    if (activeStep >= 4) ctx.fillText("> Registering AppxManifest.xml with PowerShell... REGISTERED", 70, 330);
    if (activeStep >= 5) ctx.fillText("> Patching Google GApps system partitions... COMPLETE (MagiskOnWSA)", 70, 355);
    if (activeStep >= 6) {
      ctx.fillStyle = "#00bcd4";
      ctx.fillText(">>> ALL CHECKS COMPLETED. READY FOR LAUNCH.", 70, 380);
    } else {
      // blinking cursor
      const cursor = Math.floor(Date.now() / 400) % 2 === 0 ? "_" : "";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`Executing step ${activeStep} details...${cursor}`, 70, 380);
    }

  } else if (state === 3) {
    // === HARDWARE REQUIREMENTS STATE ===
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px 'Segoe UI', sans-serif";
    ctx.fillText("HARDWARE COMPATIBILITY SCANS", 50, 100);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "13px 'Segoe UI', sans-serif";
    ctx.fillText("Holographic visualizer initialized below. Scan status:", 50, 125);

    const specs = [
      { key: "OS Platform", value: "Windows 11 / 10 x64 Build 22000+", icon: "💻", status: "PASS", color: "#30d158" },
      { key: "Processor Core", value: "Intel Virtualization / AMD SVM", icon: "⚙️", status: "PASS", color: "#30d158" },
      { key: "System Memory", value: "8 GB RAM minimum (16 GB Recommended)", icon: "💾", status: "PASS", color: "#30d158" },
      { key: "Device Storage", value: "SSD structure required, 10 GB Free", icon: "💿", status: "PASS", color: "#30d158" }
    ];

    specs.forEach((spec, idx) => {
      const y = 160 + idx * 60;
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      ctx.beginPath();
      ctx.roundRect(50, y, w - 100, 50, 6);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "16px 'Segoe UI', sans-serif";
      ctx.fillText(`${spec.icon}  ${spec.key}:`, 70, y + 31);
      
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText(spec.value, 230, y + 31);

      ctx.fillStyle = spec.color;
      ctx.font = "bold 15px monospace";
      ctx.fillText(spec.status, w - 120, y + 31);
    });

  } else if (state === 4) {
    // === READY / DOWNLOAD STATE ===
    ctx.shadowColor = "rgba(48, 209, 88, 0.3)";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "rgba(48, 209, 88, 0.15)";
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 - 40, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Checkmark
    ctx.strokeStyle = "#30d158";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(w / 2 - 25, h / 2 - 42);
    ctx.lineTo(w / 2 - 5, h / 2 - 22);
    ctx.lineTo(w / 2 + 25, h / 2 - 52);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("INSTALLATION SUCCEEDED", w / 2, h / 2 + 55);

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "16px 'Segoe UI', sans-serif";
    ctx.fillText("WSA Installer setup executable is ready.", w / 2, h / 2 + 88);
    ctx.fillText("Click the 'Download Installer' button to launch.", w / 2, h / 2 + 115);
    ctx.textAlign = "left";
  }
}

export default function Laptop3D({
  scrollState,
  scrollProgress,
  activeStep = 1,
  openRatio = 1.0,
}: Laptop3DProps) {
  const laptopGroupRef = useRef<THREE.Group>(null!);
  const screenMeshRef = useRef<THREE.Mesh>(null!);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  // Setup canvas drawing
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;
    canvasRef.current = canvas;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    textureRef.current = texture;

    if (screenMeshRef.current) {
      const material = screenMeshRef.current.material;
      if (material && !Array.isArray(material)) {
        const meshBasicMat = material as THREE.MeshBasicMaterial;
        meshBasicMat.map = texture;
        meshBasicMat.needsUpdate = true;
      }
    }
  }, []);

  // Update canvas on parameter change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateCanvasScreen(canvas, scrollState, scrollProgress, activeStep);

    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  }, [scrollState, scrollProgress, activeStep]);

  // Minor idle floating animation
  useFrame((state) => {
    if (laptopGroupRef.current) {
      const time = state.clock.getElapsedTime();
      laptopGroupRef.current.position.y = Math.sin(time * 0.8) * 0.03;
    }
  });

  const hingeRotation = -0.08 - (1.0 - openRatio) * (Math.PI / 2);

  return (
    <group ref={laptopGroupRef} scale={1.2}>
      {/* Upper Screen Part (revolves around hinge) */}
      <group position={[0, 0.05, -0.6]} rotation={[hingeRotation, 0, 0]}>
        <group position={[0, 0.5, 0.58]}>
          {/* LCD Screen Plate */}
          <mesh ref={screenMeshRef} position={[0, 0, 0.011]}>
            <planeGeometry args={[1.9, 1.18]} />
            <meshBasicMaterial toneMapped={false} />
          </mesh>

          {/* Screen Glass Coating */}
          <mesh position={[0, 0, 0.013]}>
            <planeGeometry args={[1.9, 1.18]} />
            <meshPhysicalMaterial
              transparent
              opacity={0.12}
              roughness={0.05}
              metalness={0.9}
              clearcoat={0.8}
              color="#00bcd4"
            />
          </mesh>

          {/* Outer Bezel Lid */}
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[2.0, 1.28, 0.03]} />
            <meshStandardMaterial
              color="#0a0a14"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* Camera dot */}
          <mesh position={[0, 0.6, 0.02]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#1a1a2e" />
          </mesh>
        </group>
      </group>

      {/* Hinge Cylindrical connection */}
      <mesh position={[0, 0.05, -0.6]} rotation={[0.05, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.8, 12]} />
        <meshStandardMaterial color="#05050a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Base Deck Plate */}
      <mesh position={[0, 0.0, 0.0]}>
        <boxGeometry args={[2.0, 0.05, 1.35]} />
        <meshStandardMaterial color="#080812" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Keyboard Bed */}
      <mesh position={[0, 0.026, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.7, 0.65]} />
        <meshStandardMaterial color="#050508" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Spacing for keyboard grid keys (simplified look using small boxes) */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 9 }).map((_, col) => (
          <mesh
            key={`kkey-${row}-${col}`}
            position={[
              -0.72 + col * 0.18,
              0.032,
              -0.34 + row * 0.16,
            ]}
          >
            <boxGeometry args={[0.13, 0.01, 0.1]} />
            <meshStandardMaterial
              color={row === 0 && col === 8 ? "#30d158" : "rgba(10,120,212,0.95)"}
              metalness={0.3}
              roughness={0.6}
              emissive={row === 0 && col === 8 ? "#30d158" : "rgba(0,120,212,0.3)"}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))
      )}

      {/* Space bar */}
      <mesh position={[0, 0.032, 0.28]}>
        <boxGeometry args={[0.6, 0.01, 0.1]} />
        <meshStandardMaterial color="rgba(0,120,212,0.95)" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.026, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.24]} />
        <meshStandardMaterial
          color="#0f0f23"
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>

      {/* Outer laptop body edge details */}
      <mesh position={[0, -0.02, 0.66]}>
        <boxGeometry args={[2.0, 0.03, 0.04]} />
        <meshStandardMaterial color="#05050a" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
