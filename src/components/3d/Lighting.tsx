'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';

interface LightingProps {
  isNight?: boolean;
}

/**
 * Lighting
 * Dual-state architectural lighting engine for Villa Lumina.
 * Dynamically modulates between Golden Hour Daylight and Moody Ambient Evening.
 */
export default function Lighting({ isNight = false }: LightingProps) {
  const sunRef = useRef<THREE.DirectionalLight>(null);

  return (
    <group name="architectural-lighting">
      {/* 1. Global Ambient Base Light */}
      <ambientLight
        color={isNight ? '#404556' : '#fff4e6'}
        intensity={isNight ? 0.35 : 0.8}
      />

      {/* 2. Hemisphere Light for Sky vs Ground Bounce */}
      <hemisphereLight
        color={isNight ? '#3b4860' : '#ffffff'}
        groundColor={isNight ? '#1a1612' : '#d8cfbe'}
        intensity={isNight ? 0.25 : 0.65}
      />

      {/* 3. Primary Directional Sunlight / Moonlight */}
      <directionalLight
        ref={sunRef}
        position={isNight ? [12, 18, -10] : [14, 22, 12]}
        color={isNight ? '#a4b8db' : '#fff6eb'}
        intensity={isNight ? 0.4 : 1.75}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00015}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />

      {/* 4. Secondary Soft Sunlight Bounce */}
      <directionalLight
        position={[-12, 10, -10]}
        color={isNight ? '#26334a' : '#faeedb'}
        intensity={isNight ? 0.15 : 0.45}
      />

      {/* 5. Architectural Interior Recessed LED Cove Lighting */}
      {/* Living Room Recessed LED Cove */}
      <pointLight
        position={[-5.5, 3.0, 2.5]}
        color="#ffeed6"
        intensity={isNight ? 1.8 : 0.6}
        distance={9}
        decay={2}
      />

      {/* Foyer Gallery Warm Downlight */}
      <pointLight
        position={[0, 2.9, 4.0]}
        color="#ffe2b5"
        intensity={isNight ? 1.5 : 0.5}
        distance={7}
        decay={2}
      />

      {/* Dining Room Suspended Halo Wash */}
      <pointLight
        position={[5.5, 2.6, 4.0]}
        color="#ffeed0"
        intensity={isNight ? 2.2 : 0.8}
        distance={7}
        decay={2}
      />

      {/* Kitchen Island Countertop Downlight & Under-counter LED Wash */}
      <pointLight
        position={[5.5, 2.8, -3.5]}
        color="#fff4e8"
        intensity={isNight ? 2.0 : 0.9}
        distance={8}
        decay={2}
      />

      {/* Showroom Suite Bedside & Niche Ambient Light */}
      <pointLight
        position={[-5.8, 2.8, -4.5]}
        color="#ffecd1"
        intensity={isNight ? 1.6 : 0.5}
        distance={8}
        decay={2}
      />

      {/* Bathroom Mirror Perimeter Backlight */}
      <pointLight
        position={[-0.2, 2.6, -5.2]}
        color="#fff6ed"
        intensity={isNight ? 1.5 : 0.6}
        distance={5}
        decay={2}
      />

      {/* Rear Patio Architectural Sconce Uplights */}
      <pointLight
        position={[-3.5, 2.5, -8.2]}
        color="#ffcc88"
        intensity={isNight ? 1.2 : 0.3}
        distance={6}
        decay={2}
      />
      <pointLight
        position={[3.5, 2.5, -8.2]}
        color="#ffcc88"
        intensity={isNight ? 1.2 : 0.3}
        distance={6}
        decay={2}
      />
    </group>
  );
}
