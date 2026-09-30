'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { positioningService } from '@/lib/showroom/positioningService';
import { ProductVariant } from '@/types/product';
import { ShowroomSpatialPosition } from '@/types/showroom';

interface GLTFProductLoaderProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  productId: string;
}

/**
 * GLTFProductLoader
 * Asynchronous GLTF/GLB loader for external 3D product assets from Supabase Storage.
 * Wrapped in Suspense for smooth asynchronous streaming.
 */
export function GLTFProductLoader({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  productId
}: GLTFProductLoaderProps) {
  const { scene } = useGLTF(url);
  const cloned = scene.clone();

  cloned.traverse((node) => {
    if ((node as THREE.Mesh).isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.userData.productId = productId;
    }
  });

  return (
    <primitive
      object={cloned}
      position={position}
      rotation={rotation}
      scale={scale}
      userData={{ productId }}
    />
  );
}

interface HotspotBeaconProps {
  target: ShowroomSpatialPosition;
  hovered: string | null;
  onClick: (id: string) => void;
}

/**
 * HotspotBeacon
 * Floating animated golden beacon pin positioned above interactive product zones.
 */
function HotspotBeacon({ target, hovered, onClick }: HotspotBeaconProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.y =
        target.position[1] + (target.hotspotOffset?.[1] || 1.1) + Math.sin(t * 3.0 + target.position[0]) * 0.05;
      meshRef.current.rotation.y = t * 1.5;
    }
  });

  const isHovered = hovered === target.showroomId;

  return (
    <group
      ref={meshRef}
      position={[
        target.position[0],
        target.position[1] + (target.hotspotOffset?.[1] || 1.1),
        target.position[2]
      ]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(target.showroomId);
      }}
      userData={{ isHotspot: true, productId: target.showroomId }}
    >
      {/* Outer Glow Halo */}
      <mesh>
        <sphereGeometry args={[isHovered ? 0.16 : 0.12, 16, 16]} />
        <meshBasicMaterial
          color={isHovered ? '#ffaa22' : '#c9a050'}
          transparent
          opacity={isHovered ? 0.85 : 0.6}
        />
      </mesh>

      {/* Inner Core */}
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

interface ProductsProps {
  activeProductId: string | null;
  hoveredProductId: string | null;
  onProductClick: (id: string) => void;
  activeVariant?: ProductVariant | null;
  sceneFurnitureGroup?: THREE.Group | null;
}

/**
 * Products
 * Modular component managing interactive product zones, dynamic variant updates,
 * and asynchronous 3D GLTF asset loading with Suspense.
 * Driven by the positioningService data layer.
 */
export default function Products({
  activeProductId,
  hoveredProductId,
  onProductClick,
  activeVariant,
  sceneFurnitureGroup
}: ProductsProps) {
  const targets = positioningService.getAllPositions();

  // Update 3D mesh material dynamically when variant changes
  useEffect(() => {
    if (!activeVariant || !activeProductId || !sceneFurnitureGroup) return;

    const targetColor = activeVariant.color3 || activeVariant.hex;
    if (!targetColor) return;

    sceneFurnitureGroup.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.isMesh && mesh.userData && mesh.userData.productId === activeProductId) {
        if (mesh.material && !mesh.userData.isHotspot) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => {
              const stdMat = m as THREE.MeshStandardMaterial;
              if (
                stdMat.color &&
                (stdMat.name.includes('Upholstery') ||
                  stdMat.name.includes('Wood') ||
                  stdMat.name.includes('Stone') ||
                  stdMat.name.includes('Finish') ||
                  stdMat.name.includes('Leather') ||
                  stdMat.name.includes('Base'))
              ) {
                stdMat.color.set(targetColor);
              }
            });
          } else {
            const stdMat = mesh.material as THREE.MeshStandardMaterial;
            if (stdMat.color) {
              stdMat.color.set(targetColor);
            }
          }
        }
      }
    });
  }, [activeVariant, activeProductId, sceneFurnitureGroup]);

  return (
    <group name="interactive-product-zones">
      {/* 3D Hotspot Beacons for each decoupled product */}
      {targets.map((target) => (
        <HotspotBeacon
          key={target.showroomId}
          target={target}
          hovered={hoveredProductId}
          onClick={onProductClick}
        />
      ))}
    </group>
  );
}
