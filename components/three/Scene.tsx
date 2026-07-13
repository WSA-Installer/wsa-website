"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  background?: string;
}

export default function Scene({
  children,
  className = "",
  cameraPosition = [0, 0, 6],
  cameraFov = 50,
}: SceneProps) {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-3, 2, -2]} intensity={0.2} color="#00bcd4" />
        {children}
      </Canvas>
    </div>
  );
}
