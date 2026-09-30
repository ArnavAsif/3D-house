'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { positioningService } from '@/lib/showroom/positioningService';
import { productService } from '@/lib/products/productService';
import { ProductVariant, Product } from '@/types/product';
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

/**
 * InteractiveTapIcon
 * Hand cursor icon with radiating tap lines, matching reference indicator badge.
 */
function InteractiveTapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Radiating tap arc lines */}
      <path d="M12 2v2.5" />
      <path d="M5.2 5.2l1.8 1.8" />
      <path d="M18.8 5.2l-1.8 1.8" />
      {/* Hand index finger pointing */}
      <path d="M14 9V5a2 2 0 0 0-4 0v7.5l-1.9-1.9a1.6 1.6 0 0 0-2.2 0 1.6 1.6 0 0 0 0 2.2l4.8 4.8A4 4 0 0 0 13.5 19H17a4 4 0 0 0 4-4v-4.5a2 2 0 0 0-2-2h-3z" />
    </svg>
  );
}

/**
 * SurfaceRipples
 * Concentric animated expanding radar rings on the product surface at the needle contact point.
 */
function SurfaceRipples() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // 3 staggered expanding wave phases
    const p1 = (t * 0.7) % 1;
    const p2 = (t * 0.7 + 0.33) % 1;
    const p3 = (t * 0.7 + 0.66) % 1;

    if (ring1Ref.current) {
      const s1 = 0.4 + p1 * 1.6;
      ring1Ref.current.scale.set(s1, s1, 1);
      (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - p1) * 0.65);
    }
    if (ring2Ref.current) {
      const s2 = 0.4 + p2 * 1.6;
      ring2Ref.current.scale.set(s2, s2, 1);
      (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - p2) * 0.45);
    }
    if (ring3Ref.current) {
      const s3 = 0.4 + p3 * 1.6;
      ring3Ref.current.scale.set(s3, s3, 1);
      (ring3Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - p3) * 0.3);
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.045, 0.062, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.045, 0.062, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring3Ref}>
        <ringGeometry args={[0.045, 0.062, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface ProductPinIndicatorProps {
  target: ShowroomSpatialPosition;
  isHovered: boolean;
  onClick: (id: string) => void;
}

/**
 * ProductPinIndicator
 * Modern navigation indicator modeled after ChatGPT reference image:
 * - 3D glossy red pushpin with slender stainless steel needle
 * - Concentric surface ripple rings on contact surface
 * - Angled slender leader line
 * - Dark frosted pill badge with hand click icon and "Interactive Product" label
 */
function ProductPinIndicator({ target, isHovered, onClick }: ProductPinIndicatorProps) {
  const pinGroupRef = useRef<THREE.Group>(null);
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    productService.getProduct(target.showroomId).then((p) => {
      if (p) setProductData(p);
    }).catch(() => {});
  }, [target.showroomId]);

  useFrame(({ clock }) => {
    if (pinGroupRef.current) {
      const t = clock.getElapsedTime();
      // Gentle micro-floating oscillation
      const bounce = Math.sin(t * 2.5 + target.position[0]) * 0.015;
      pinGroupRef.current.position.y =
        target.position[1] + (target.hotspotOffset?.[1] || 0.85) + bounce;
    }
  });

  const pinRedMat = (
    <meshStandardMaterial
      color={isHovered ? '#ff2b2b' : '#e62424'}
      roughness={0.16}
      metalness={0.06}
    />
  );

  return (
    <group
      ref={pinGroupRef}
      position={[
        target.position[0],
        target.position[1] + (target.hotspotOffset?.[1] || 0.85),
        target.position[2]
      ]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(target.showroomId);
      }}
      userData={{ isHotspot: true, productId: target.showroomId }}
    >
      {/* 1. Concentric Ripple Rings on Surface */}
      <SurfaceRipples />

      {/* 2. 3D Glossy Red Pushpin Mesh with Slender Chrome Needle */}
      <group rotation={[-0.04, 0, -0.18]}>
        {/* Slender Chrome Stainless Needle */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.0012, 0.12, 12]} />
          <meshStandardMaterial color="#e0e4eb" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* Lower Flared Collar */}
        <mesh position={[0, 0.125, 0]} castShadow>
          <cylinderGeometry args={[0.024, 0.016, 0.02, 20]} />
          {pinRedMat}
        </mesh>

        {/* Concave Tapered Waist / Grip Neck */}
        <mesh position={[0, 0.168, 0]} castShadow>
          <cylinderGeometry args={[0.042, 0.018, 0.066, 20]} />
          {pinRedMat}
        </mesh>

        {/* Upper Wide Flanged Rim */}
        <mesh position={[0, 0.21, 0]} castShadow>
          <cylinderGeometry args={[0.052, 0.046, 0.026, 20]} />
          {pinRedMat}
        </mesh>

        {/* Recessed Top Cap */}
        <mesh position={[0, 0.228, 0]} castShadow>
          <cylinderGeometry args={[0.048, 0.052, 0.01, 20]} />
          <meshStandardMaterial
            color={isHovered ? '#ff3838' : '#d81d1d'}
            roughness={0.2}
            metalness={0.06}
          />
        </mesh>

        {/* White/Silver Connection Node */}
        <mesh position={[0, 0.238, 0]}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.92} roughness={0.1} />
        </mesh>
      </group>

      {/* 3. HTML Leader Line & Frosted Badge HUD */}
      <Html
        position={[0, 0.24, 0]}
        center={false}
        distanceFactor={11}
        zIndexRange={[90, 10]}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
      >
        <div
          className={`product-pin-callout ${isHovered ? 'hovered' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick(target.showroomId);
          }}
          title={productData ? `${productData.title} - $${productData.price}` : 'Inspect Product'}
        >
          {/* Angled Leader Line (Diagonal elbow to badge) */}
          <svg className="pin-leader-svg" width="90" height="60" viewBox="0 0 90 60">
            {/* Origin Anchor Dot */}
            <circle cx="2" cy="58" r="3.2" fill="#ffffff" stroke="rgba(230,36,36,0.9)" strokeWidth="1.5" />
            {/* 45-degree Angled Elbow Line */}
            <polyline
              points="2,58 38,18 70,18"
              fill="none"
              stroke="rgba(255, 255, 255, 0.88)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Frosted Dark Pill Badge */}
          <div className="pin-pill-badge">
            <div className="pin-badge-icon">
              <InteractiveTapIcon />
            </div>
            <span className="pin-badge-text">
              {isHovered && productData
                ? `${productData.title || productData.name}`
                : 'Interactive Product'}
            </span>
          </div>
        </div>
      </Html>
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
      {/* Modern Red Pushpin Indicators with Leader Lines and Badges */}
      {targets.map((target) => (
        <ProductPinIndicator
          key={target.showroomId}
          target={target}
          isHovered={hoveredProductId === target.showroomId}
          onClick={onProductClick}
        />
      ))}
    </group>
  );
}
