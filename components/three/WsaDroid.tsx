"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WsaDroidProps {
  scrollState: number; // 0 to 4
  scrollProgress: number; // relative progress in active section
  activeStep?: number;
}

export default function WsaDroid({
  scrollState,
  scrollProgress,
  activeStep = 1,
}: WsaDroidProps) {
  const headRef = useRef<THREE.Group>(null!);
  const leftEyeRef = useRef<THREE.Mesh>(null!);
  const rightEyeRef = useRef<THREE.Mesh>(null!);
  const leftArmRef = useRef<THREE.Group>(null!);
  const rightArmRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Blinking Logic
    const blinkCycle = time % 5; // blink every 5 seconds
    let eyeScaleY = 1.0;
    if (blinkCycle > 4.8) {
      // blink out/in
      eyeScaleY = THREE.MathUtils.lerp(1.0, 0.05, Math.sin((blinkCycle - 4.8) * Math.PI * 5));
    }
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY;
      rightEyeRef.current.scale.y = eyeScaleY;
    }

    // 2. Idle Body Hovering
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(time * 1.2) * 0.05;
      bodyRef.current.rotation.y = Math.sin(time * 0.5) * 0.03;
    }

    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = 0.15 + Math.sin(time * 3) * 0.05;
    }

    // 3. Dynamic Animations depending on active Section State
    if (scrollState === 0) {
      // === HERO STATE: Waving left hand, looking at user ===
      if (headRef.current) {
        // Look at screen/user
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(time * 1.5) * 0.05, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -0.05, 0.1);
      }
      if (leftArmRef.current) {
        // Wave left arm in the air
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -2.2 - Math.sin(time * 5) * 0.3, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.6, 0.1);
      }
      if (rightArmRef.current) {
        // Right arm holding laptop steady
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.8, 0.1);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.3, 0.1);
      }
    } else if (scrollState === 1) {
      // === FEATURES STATE: Pointing at screen ===
      if (headRef.current) {
        // Look at screen
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0.25, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.1, 0.1);
      }
      if (leftArmRef.current) {
        // Left arm points towards laptop screen
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -1.2, 0.1);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0.4, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2, 0.1);
      }
      if (rightArmRef.current) {
        // Right arm steady
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.9, 0.1);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.4, 0.1);
      }
    } else if (scrollState === 2) {
      // === WORKFLOW STATE: Typing motion on keyboard ===
      if (headRef.current) {
        // Look down at keyboard
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0.0, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.25, 0.1);
      }
      if (leftArmRef.current && rightArmRef.current) {
        // Rapid alternating typing rotation
        const typeOffsetLeft = Math.sin(time * 12) * 0.12;
        const typeOffsetRight = Math.cos(time * 12) * 0.12;

        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.95 + typeOffsetLeft, 0.15);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2, 0.1);

        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.95 + typeOffsetRight, 0.15);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.2, 0.1);
      }
    } else if (scrollState === 3) {
      // === REQUIREMENTS STATE: Scanning hologram (rotating head and glowing green eyes) ===
      if (headRef.current) {
        // Slow pan looking at hologram
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(time * 2.0) * 0.3, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.05, 0.1);
      }
      if (leftArmRef.current && rightArmRef.current) {
        // Arms back analyzing
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.4, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.3, 0.1);

        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.4, 0.1);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.3, 0.1);
      }
    } else if (scrollState === 4) {
      // === COMPLETE STATE: Offering laptop, happy eyes ===
      if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0.0, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -0.1, 0.1);
      }
      if (leftArmRef.current && rightArmRef.current) {
        // Arms presenting forward
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -1.3, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.4, 0.1);

        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -1.3, 0.1);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.4, 0.1);
      }
    }
  });

  // Eye Material color changes based on status (requirements scan = green scan, download complete = success emerald)
  const eyeColor = scrollState === 3 ? "#30d158" : scrollState === 4 ? "#30d158" : "#00bcd4";

  return (
    <group ref={bodyRef} position={[0, -0.2, -0.5]}>
      {/* 1. Droid Head */}
      <group ref={headRef} position={[0, 1.45, -0.1]}>
        {/* Head Dome */}
        <mesh>
          <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshPhysicalMaterial
            color="#fafafa"
            roughness={0.1}
            metalness={0.1}
            clearcoat={0.9}
          />
        </mesh>
        
        {/* Visor Area */}
        <mesh position={[0, 0.06, 0.32]}>
          <boxGeometry args={[0.6, 0.16, 0.15]} />
          <meshStandardMaterial color="#0c0c16" roughness={0.05} metalness={0.8} />
        </mesh>

        {/* Eyes (Glowing LEDs) */}
        <mesh ref={leftEyeRef} position={[-0.16, 0.06, 0.38]}>
          <boxGeometry args={[0.07, 0.07, 0.02]} />
          <meshBasicMaterial color={eyeColor} toneMapped={false} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.16, 0.06, 0.38]}>
          <boxGeometry args={[0.07, 0.07, 0.02]} />
          <meshBasicMaterial color={eyeColor} toneMapped={false} />
        </mesh>

        {/* Ear Antennas */}
        <group position={[-0.42, 0.1, 0]} rotation={[0, 0, 0.4]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
        </group>
        <group position={[0.42, 0.1, 0]} rotation={[0, 0, -0.4]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={eyeColor} />
          </mesh>
        </group>
      </group>

      {/* 2. Neck Connection */}
      <mesh position={[0, 1.05, -0.1]}>
        <cylinderGeometry args={[0.14, 0.16, 0.12, 16]} />
        <meshStandardMaterial color="#40404a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 3. Droid Torso */}
      <group position={[0, 0.48, -0.1]}>
        {/* Chest Plate */}
        <mesh>
          <cylinderGeometry args={[0.38, 0.28, 1.0, 20]} />
          <meshPhysicalMaterial
            color="#fafafa"
            roughness={0.12}
            metalness={0.08}
            clearcoat={0.9}
          />
        </mesh>

        {/* Glowing Chest Emblem (Android Droid shape overlay) */}
        <mesh position={[0, 0.15, 0.35]} rotation={[0.08, 0, 0]}>
          <planeGeometry args={[0.18, 0.18]} />
          <meshBasicMaterial color="#30d158" transparent opacity={0.85} toneMapped={false} />
        </mesh>
        
        {/* Secondary Microsoft emblem below */}
        <mesh position={[0, -0.12, 0.36]} rotation={[0.08, 0, 0]}>
          <planeGeometry args={[0.12, 0.12]} />
          <meshBasicMaterial color="#0078d4" transparent opacity={0.85} toneMapped={false} />
        </mesh>

        {/* Dynamic scan lights in requirements phase */}
        {scrollState === 3 && (
          <mesh position={[0, 0.3, 0.38]}>
            <boxGeometry args={[0.3, 0.02, 0.05]} />
            <meshBasicMaterial color="#30d158" toneMapped={false} />
          </mesh>
        )}
      </group>

      {/* 4. Left Arm & Shoulder */}
      <group ref={leftArmRef} position={[-0.48, 0.88, -0.1]}>
        {/* Shoulder Sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Arm Upper segment */}
        <group position={[-0.08, -0.22, 0]} rotation={[0, 0, 0.15]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.06, 0.4, 12]} />
            <meshPhysicalMaterial color="#fafafa" roughness={0.1} clearcoat={0.7} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[0, -0.22, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#404040" metalness={0.8} />
          </mesh>
          {/* Forearm segment */}
          <group position={[0, -0.38, 0.15]} rotation={[0.8, 0.0, 0.0]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.05, 0.42, 12]} />
              <meshPhysicalMaterial color="#fafafa" roughness={0.1} clearcoat={0.7} />
            </mesh>
            {/* Hand Sphere */}
            <mesh position={[0, -0.22, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#303030" metalness={0.9} />
            </mesh>
          </group>
        </group>
      </group>

      {/* 5. Right Arm & Shoulder */}
      <group ref={rightArmRef} position={[0.48, 0.88, -0.1]}>
        {/* Shoulder Sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Arm Upper segment */}
        <group position={[0.08, -0.22, 0]} rotation={[0, 0, -0.15]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.06, 0.4, 12]} />
            <meshPhysicalMaterial color="#fafafa" roughness={0.1} clearcoat={0.7} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[0, -0.22, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#404040" metalness={0.8} />
          </mesh>
          {/* Forearm segment */}
          <group position={[0, -0.38, 0.15]} rotation={[0.8, 0.0, 0.0]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.05, 0.42, 12]} />
              <meshPhysicalMaterial color="#fafafa" roughness={0.1} clearcoat={0.7} />
            </mesh>
            {/* Hand Sphere */}
            <mesh position={[0, -0.22, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#303030" metalness={0.9} />
            </mesh>
          </group>
        </group>
      </group>

      {/* 6. Droid Base (Torus-like bottom plate simulating hovering field) */}
      <group position={[0, -0.1, -0.1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.26, 0.06, 8, 24]} />
          <meshStandardMaterial color="#40404d" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Glow light field */}
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.22, 0.35, 0.15, 16]} />
          <meshBasicMaterial
            ref={glowMaterialRef}
            color={eyeColor}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </group>
  );
}
