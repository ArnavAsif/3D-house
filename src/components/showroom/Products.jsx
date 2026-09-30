'use client';

import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SHOWROOM_PRODUCTS } from '../../data/showroomProducts';

/**
 * GLTFProductLoader
 * Asynchronous GLTF/GLB loader for external 3D product assets.
 * Wrapped in Suspense for smooth asynchronous streaming.
 */
export function GLTFProductLoader({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], productId }) {
  const { scene } = useGLTF(url);
  const cloned = scene.clone();

  cloned.traverse((node) => {
    if (node.isMesh) {
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

/**
 * HotspotBeacon
 * Floating animated golden beacon pin positioned above interactive product zones.
 */
function HotspotBeacon({ product, hovered, onClick }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Floating animation
      meshRef.current.position.y = product.position[1] + (product.hotspotOffset?.[1] || 1.1) + Math.sin(t * 3.0 + product.position[0]) * 0.05;
      meshRef.current.rotation.y = t * 1.5;
    }
  });

  const isHovered = hovered === product.id;

  return (
    <group
      ref={meshRef}
      position={[
        product.position[0],
        product.position[1] + (product.hotspotOffset?.[1] || 1.1),
        product.position[2]
      ]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(product.id);
      }}
      userData={{ isHotspot: true, productId: product.id }}
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

/**
 * Products
 * Modular component managing interactive product zones, dynamic variant updates,
 * and asynchronous 3D GLTF asset loading with Suspense.
 */
export default function Products({
  activeProductId,
  hoveredProductId,
  onProductClick,
  activeVariant,
  sceneFurnitureGroup
}) {
  // Update 3D mesh material dynamically when variant changes
  React.useEffect(() => {
    if (!activeVariant || !activeProductId || !sceneFurnitureGroup) return;

    const targetColor = activeVariant.color3 || activeVariant.hex;
    if (!targetColor) return;

    sceneFurnitureGroup.traverse((node) => {
      if (node.isMesh && node.userData && node.userData.productId === activeProductId) {
        if (node.material && !node.userData.isHotspot) {
          if (Array.isArray(node.material)) {
            node.material.forEach((m) => {
              if (m.color && (m.name.includes('Upholstery') || m.name.includes('Wood') || m.name.includes('Stone') || m.name.includes('Finish') || m.name.includes('Leather') || m.name.includes('Base'))) {
                m.color.set(targetColor);
              }
            });
          } else if (node.material.color) {
            node.material.color.set(targetColor);
          }
        }
      }
    });
  }, [activeVariant, activeProductId, sceneFurnitureGroup]);

  return (
    <group name="interactive-product-zones">
      {/* 3D Hotspot Beacons for each decoupled product */}
      {SHOWROOM_PRODUCTS.map((prod) => (
        <HotspotBeacon
          key={prod.id}
          product={prod}
          hovered={hoveredProductId}
          onClick={onProductClick}
        />
      ))}
    </group>
  );
}
