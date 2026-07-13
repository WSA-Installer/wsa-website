"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import WsaDroid from "./WsaDroid";
import Laptop3D from "./Laptop3D";
import Hologram3D from "./Hologram3D";

// Orchestrator Component for rendering inside Canvas
function SceneContent({
  scrollState,
  scrollProgress,
  activeStep,
  isMobile,
}: {
  scrollState: number;
  scrollProgress: number;
  activeStep: number;
  isMobile: boolean;
}) {
  const sceneGroupRef = useRef<THREE.Group>(null!);
  const robotGroupRef = useRef<THREE.Group>(null!);
  const laptopGroupRef = useRef<THREE.Group>(null!);
  const hologramGroupRef = useRef<THREE.Group>(null!);

  // Define targets for linear interpolation (LERP) depending on State
  const getTargets = () => {
    // Mobile Overrides
    if (isMobile) {
      switch (scrollState) {
        case 0: // Hero
          return {
            groupPos: [0.0, 0.8, -1.0],
            groupRot: [0.05, 0.0, 0.0],
            groupScale: 0.75,
            robotPos: [0.0, -0.4, -0.5],
            laptopPos: [0.0, 0.45, 0.4],
            laptopRot: [0.15, 0.0, 0.0],
            openRatio: 1.0,
            holoOpacity: 0.0,
          };
        case 1: // Features
          return {
            groupPos: [0.0, 0.8, -1.0],
            groupRot: [-0.05, 0.15, 0.0],
            groupScale: 0.7,
            robotPos: [0.0, -0.4, -0.5],
            laptopPos: [-0.08, 0.4, 0.45],
            laptopRot: [-0.05, 0.15, 0.0],
            openRatio: 0.95,
            holoOpacity: 0.0,
          };
        case 2: // How It Works
          return {
            groupPos: [0.0, 0.9, -0.8],
            groupRot: [0.15, -0.1, 0.0],
            groupScale: 0.75,
            robotPos: [0.0, -0.4, -0.5],
            laptopPos: [0.0, 0.48, 0.35],
            laptopRot: [0.28, -0.05, 0.0],
            openRatio: 1.0,
            holoOpacity: 0.0,
          };
        case 3: // Requirements
          return {
            groupPos: [0.0, 0.7, -1.0],
            groupRot: [0.05, 0.2, 0.0],
            groupScale: 0.75,
            robotPos: [-0.1, -0.4, -0.5],
            laptopPos: [0.08, 0.42, 0.4],
            laptopRot: [0.02, 0.2, 0.0],
            openRatio: 0.85,
            holoOpacity: 1.0,
          };
        case 4: // Download
        default:
          return {
            groupPos: [0.0, 0.6, -0.6],
            groupRot: [0.08, 0.0, 0.0],
            groupScale: 0.9,
            robotPos: [0.0, -0.4, -0.5],
            laptopPos: [0.0, 0.42, 0.55],
            laptopRot: [0.12, 0.0, 0.0],
            openRatio: 1.0,
            holoOpacity: 0.0,
          };
      }
    }

    // Desktop Settings
    switch (scrollState) {
      case 0: // Hero
        return {
          groupPos: [0.65, -0.1, 0.0],
          groupRot: [0.08, -0.35, 0.0],
          groupScale: 1.15,
          robotPos: [0.0, -0.4, -0.5],
          laptopPos: [0.0, 0.45, 0.45],
          laptopRot: [0.15, -0.05, 0.0],
          openRatio: 1.0,
          holoOpacity: 0.0,
        };
      case 1: // Features
        return {
          groupPos: [0.55, -0.1, 0.2],
          groupRot: [-0.05, 0.25, 0.0],
          groupScale: 1.1,
          robotPos: [0.1, -0.4, -0.6],
          laptopPos: [-0.15, 0.4, 0.48],
          laptopRot: [-0.08, 0.32, -0.05],
          openRatio: 0.95,
          holoOpacity: 0.0,
        };
      case 2: // How It Works
        return {
          groupPos: [0.65, -0.22, 0.4],
          groupRot: [0.18, -0.15, 0.0],
          groupScale: 1.25,
          robotPos: [0.0, -0.4, -0.5],
          laptopPos: [0.0, 0.5, 0.3],
          laptopRot: [0.32, -0.05, 0.0],
          openRatio: 1.0,
          holoOpacity: 0.0,
        };
      case 3: // Requirements
        return {
          groupPos: [0.45, -0.1, 0.1],
          groupRot: [0.08, 0.4, 0.0],
          groupScale: 1.2,
          robotPos: [-0.18, -0.4, -0.5],
          laptopPos: [0.08, 0.44, 0.38],
          laptopRot: [0.02, 0.35, -0.03],
          openRatio: 0.85,
          holoOpacity: 1.0,
        };
      case 4: // Download
      default:
        return {
          groupPos: [0.0, -0.1, 0.85], // Centers at the end!
          groupRot: [0.08, 0.0, 0.0],
          groupScale: 1.4,
          robotPos: [0.0, -0.45, -0.5],
          laptopPos: [0.0, 0.42, 0.55],
          laptopRot: [0.12, 0.0, 0.0],
          openRatio: 1.0,
          holoOpacity: 0.0,
        };
    }
  };

  useFrame(() => {
    const targets = getTargets();
    const lerpSpeed = 0.08;

    // LERP Scene Group Pos & Rot
    if (sceneGroupRef.current) {
      sceneGroupRef.current.position.x = THREE.MathUtils.lerp(sceneGroupRef.current.position.x, targets.groupPos[0], lerpSpeed);
      sceneGroupRef.current.position.y = THREE.MathUtils.lerp(sceneGroupRef.current.position.y, targets.groupPos[1], lerpSpeed);
      sceneGroupRef.current.position.z = THREE.MathUtils.lerp(sceneGroupRef.current.position.z, targets.groupPos[2], lerpSpeed);

      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.x, targets.groupRot[0], lerpSpeed);
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.y, targets.groupRot[1], lerpSpeed);
      sceneGroupRef.current.rotation.z = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.z, targets.groupRot[2], lerpSpeed);

      const targetScale = targets.groupScale;
      sceneGroupRef.current.scale.x = THREE.MathUtils.lerp(sceneGroupRef.current.scale.x, targetScale, lerpSpeed);
      sceneGroupRef.current.scale.y = THREE.MathUtils.lerp(sceneGroupRef.current.scale.y, targetScale, lerpSpeed);
      sceneGroupRef.current.scale.z = THREE.MathUtils.lerp(sceneGroupRef.current.scale.z, targetScale, lerpSpeed);
    }

    // LERP Robot Pos
    if (robotGroupRef.current) {
      robotGroupRef.current.position.x = THREE.MathUtils.lerp(robotGroupRef.current.position.x, targets.robotPos[0], lerpSpeed);
      robotGroupRef.current.position.y = THREE.MathUtils.lerp(robotGroupRef.current.position.y, targets.robotPos[1], lerpSpeed);
      robotGroupRef.current.position.z = THREE.MathUtils.lerp(robotGroupRef.current.position.z, targets.robotPos[2], lerpSpeed);
    }

    // LERP Laptop Pos & Rot
    if (laptopGroupRef.current) {
      laptopGroupRef.current.position.x = THREE.MathUtils.lerp(laptopGroupRef.current.position.x, targets.laptopPos[0], lerpSpeed);
      laptopGroupRef.current.position.y = THREE.MathUtils.lerp(laptopGroupRef.current.position.y, targets.laptopPos[1], lerpSpeed);
      laptopGroupRef.current.position.z = THREE.MathUtils.lerp(laptopGroupRef.current.position.z, targets.laptopPos[2], lerpSpeed);

      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.x, targets.laptopRot[0], lerpSpeed);
      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.y, targets.laptopRot[1], lerpSpeed);
      laptopGroupRef.current.rotation.z = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.z, targets.laptopRot[2], lerpSpeed);
    }

    // Match Hologram positioning above the keyboard of Laptop3D dynamically
    if (hologramGroupRef.current && laptopGroupRef.current) {
      hologramGroupRef.current.position.copy(laptopGroupRef.current.position);
      hologramGroupRef.current.rotation.copy(laptopGroupRef.current.rotation);
      // Offset slightly upward above keyboard
      hologramGroupRef.current.translateY(0.12);
    }
  });

  const targets = getTargets();

  return (
    <>
      <group ref={sceneGroupRef}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#00bcd4" />
        <pointLight position={[0, 2, 2]} intensity={0.5} color="#30d158" />

        {/* Robot Assistant Droid */}
        <group ref={robotGroupRef}>
          <WsaDroid
            scrollState={scrollState}
            scrollProgress={scrollProgress}
            activeStep={activeStep}
          />
        </group>

        {/* Laptop Held by Droid */}
        <group ref={laptopGroupRef}>
          <Laptop3D
            scrollState={scrollState}
            scrollProgress={scrollProgress}
            activeStep={activeStep}
            openRatio={targets.openRatio}
          />
        </group>
      </group>

      {/* Hologram Floating over Laptop */}
      <group ref={hologramGroupRef}>
        <Hologram3D visible={scrollState === 3} />
      </group>
    </>
  );
}

export default function Main3DCanvas() {
  const [scrollState, setScrollState] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile viewport width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Scroll calculations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = scrollY / docHeight;
      setScrollProgress(percent);

      // Map scroll bounds to states
      if (percent < 0.16) {
        setScrollState(0); // Hero
      } else if (percent >= 0.16 && percent < 0.42) {
        setScrollState(1); // Features
      } else if (percent >= 0.42 && percent < 0.68) {
        setScrollState(2); // How It Works
        
        // Inside How It Works, map 6 steps:
        const progressInWorks = (percent - 0.42) / 0.26;
        const currentStep = Math.min(6, Math.max(1, Math.floor(progressInWorks * 6) + 1));
        setActiveStep(currentStep);
      } else if (percent >= 0.68 && percent < 0.88) {
        setScrollState(3); // Requirements
      } else {
        setScrollState(4); // Download / Footer
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen transition-opacity duration-1000">
      {/* 3D Canvas element - pointer-events allowed on 3D elements if needed, but none for scrolling overlay */}
      <Canvas
        camera={{ position: [0, 0.4, 5.0], fov: 32 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <SceneContent
          scrollState={scrollState}
          scrollProgress={scrollProgress}
          activeStep={activeStep}
          isMobile={isMobile}
        />
        {/* Soft studio lighting environment */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
