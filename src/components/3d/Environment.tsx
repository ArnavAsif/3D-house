'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

interface EnvironmentProps {
  isNight?: boolean;
}

/**
 * Environment
 * Exterior landscape, garden terrace, sky ambiance, and atmospheric depth for Villa Lumina.
 */
export default function Environment({ isNight = false }: EnvironmentProps) {
  // Garden Lawn Material
  const grassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isNight ? '#162818' : '#456636',
        roughness: 0.92,
        metalness: 0.05
      }),
    [isNight]
  );

  // Patio Travertine Pavers Material
  const patioMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isNight ? '#2a2824' : '#ded7ca',
        roughness: 0.65,
        metalness: 0.1
      }),
    [isNight]
  );

  // Perimeter Hedge Material
  const hedgeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isNight ? '#0e1f11' : '#2d4523',
        roughness: 0.88,
        metalness: 0.05
      }),
    [isNight]
  );

  // Boundary Wall Material
  const boundaryMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isNight ? '#222329' : '#d1cbbf',
        roughness: 0.75,
        metalness: 0.08
      }),
    [isNight]
  );

  return (
    <group name="exterior-environment">
      {/* Dynamic Atmospheric Fog */}
      <fog attach="fog" args={[isNight ? '#0d1117' : '#f5efe6', 15, 65]} />

      {/* Dynamic Background Sky Color */}
      <color attach="background" args={[isNight ? '#0b0e14' : '#f2ebe0']} />

      {/* Rear Garden Lawn Ground */}
      <mesh
        position={[0, -0.05, -12]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={grassMat}
      >
        <planeGeometry args={[26, 12]} />
      </mesh>

      {/* Front Approach Landscape Ground */}
      <mesh
        position={[0, -0.05, 12]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={grassMat}
      >
        <planeGeometry args={[26, 10]} />
      </mesh>

      {/* Rear Travertine Covered Terrace / Patio */}
      <mesh
        position={[0, 0.01, -9.5]}
        receiveShadow
        material={patioMat}
      >
        <boxGeometry args={[18, 0.1, 3.5]} />
      </mesh>

      {/* Front Entrance Travertine Portico Porch */}
      <mesh
        position={[0, 0.01, 7.8]}
        receiveShadow
        material={patioMat}
      >
        <boxGeometry args={[6.5, 0.1, 2.5]} />
      </mesh>

      {/* Perimeter Manicured Hedge - Rear Boundary */}
      <mesh position={[0, 1.2, -17.5]} castShadow receiveShadow material={hedgeMat}>
        <boxGeometry args={[26, 2.4, 1.0]} />
      </mesh>

      {/* Perimeter Manicured Hedge - Left Boundary */}
      <mesh position={[-12.8, 1.2, 0]} castShadow receiveShadow material={hedgeMat}>
        <boxGeometry args={[1.0, 2.4, 34]} />
      </mesh>

      {/* Perimeter Manicured Hedge - Right Boundary */}
      <mesh position={[12.8, 1.2, 0]} castShadow receiveShadow material={hedgeMat}>
        <boxGeometry args={[1.0, 2.4, 34]} />
      </mesh>

      {/* Low Architectural Perimeter Wall with Coping */}
      <mesh position={[0, 0.5, -16.8]} castShadow receiveShadow material={boundaryMat}>
        <boxGeometry args={[25, 1.0, 0.35]} />
      </mesh>

      {/* Feature Olive Trees in Rear Garden */}
      <group position={[-5.5, 0, -12.5]}>
        <mesh position={[0, 1.2, 0]} castShadow material={boundaryMat}>
          <cylinderGeometry args={[0.14, 0.18, 2.4, 8]} />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow material={hedgeMat}>
          <sphereGeometry args={[1.1, 10, 10]} />
        </mesh>
      </group>

      <group position={[5.5, 0, -12.5]}>
        <mesh position={[0, 1.2, 0]} castShadow material={boundaryMat}>
          <cylinderGeometry args={[0.14, 0.18, 2.4, 8]} />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow material={hedgeMat}>
          <sphereGeometry args={[1.1, 10, 10]} />
        </mesh>
      </group>
    </group>
  );
}
