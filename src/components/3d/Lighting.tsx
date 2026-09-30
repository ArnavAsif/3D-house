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
      {/* 1. Global Ambient Base Light (Calibrated to preserve deep grounded contact shadows) */}
      <ambientLight
        color={isNight ? '#404556' : '#fff4e6'}
        intensity={isNight ? 0.35 : 0.30}
      />

      {/* 2. Hemisphere Light for Sky vs Ground Bounce */}
      <hemisphereLight
        color={isNight ? '#3b4860' : '#ffffff'}
        groundColor={isNight ? '#1a1612' : '#d8cfbe'}
        intensity={isNight ? 0.25 : 0.35}
      />

      {/* 3. Primary Directional Sunlight / Moonlight */}
      {/* Positioned at [-12, 18, 14] to stream sunlight through South & West panoramic glass directly into the Living Room */}
      <directionalLight
        ref={sunRef}
        position={isNight ? [12, 18, -10] : [-12, 18, 14]}
        color={isNight ? '#a4b8db' : '#fff6eb'}
        intensity={isNight ? 0.4 : 1.85}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00012}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />

      {/* 4. Large Window Daylight Spill & Bounce (West & South Facades) */}
      <directionalLight
        position={[-12, 6, 2.5]}
        color={isNight ? '#26334a' : '#faeedb'}
        intensity={isNight ? 0.15 : 0.65}
        castShadow={false}
      />
      <directionalLight
        position={[0, 6, 10]}
        color={isNight ? '#22283a' : '#fff5e6'}
        intensity={isNight ? 0.15 : 0.6}
        castShadow={false}
      />

      {/* 5. Architectural Interior Recessed LED Cove Lighting (2700K Warm Residential) */}
      {/* Living Room Dropped Soffit Cove (Center on X = -7.0m) */}
      <pointLight
        position={[-7.0, 3.1, 2.8]}
        color="#fff1dc"
        intensity={isNight ? 2.2 : 0.75}
        distance={9}
        decay={2}
      />

      {/* Recessed Architectural Downlights for Living Room Feature Zones */}
      {/* Coffee Table Focus Spot (Directly over X = -7.0m, Z = 2.6m) */}
      <pointLight
        position={[-7.0, 3.15, 2.6]}
        color="#fff5e4"
        intensity={isNight ? 1.8 : 0.7}
        distance={5.5}
        decay={2}
      />
      {/* Feature Shelving & Media Wall Wash (Centered at X = -7.0m) */}
      <pointLight
        position={[-7.0, 3.15, -0.6]}
        color="#ffeed0"
        intensity={isNight ? 2.0 : 0.8}
        distance={5}
        decay={2}
      />
      {/* Living Room Fine Art Spot */}
      <pointLight
        position={[-1.8, 3.0, 4.45]}
        color="#fff3dc"
        intensity={isNight ? 1.4 : 0.55}
        distance={4.5}
        decay={2}
      />

      {/* West Terrace Outdoor Landscape Warm Sconce / Uplight */}
      <pointLight
        position={[-11.2, 1.2, 1.0]}
        color="#ffddaa"
        intensity={isNight ? 1.6 : 0.35}
        distance={7}
        decay={2}
      />

      {/* Ambient Lighting for Background Visual Rooms (Master Suite, Dining, Kitchen, Bath) */}
      <pointLight
        position={[-5.8, 2.8, -4.5]}
        color="#ffecd1"
        intensity={isNight ? 1.2 : 0.4}
        distance={8}
        decay={2}
      />
      <pointLight
        position={[5.5, 2.6, 4.0]}
        color="#ffeed0"
        intensity={isNight ? 1.4 : 0.5}
        distance={7}
        decay={2}
      />
      <pointLight
        position={[5.5, 2.8, -3.5]}
        color="#fff4e8"
        intensity={isNight ? 1.4 : 0.5}
        distance={8}
        decay={2}
      />
      <pointLight
        position={[-0.2, 2.6, -5.2]}
        color="#fff6ed"
        intensity={isNight ? 1.2 : 0.4}
        distance={5}
        decay={2}
      />
    </group>
  );
}
