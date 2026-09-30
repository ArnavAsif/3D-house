'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProductInteractionProps {
  onProductHover?: (productId: string | null) => void;
  onProductSelect?: (productId: string) => void;
  activeProduct?: string | null;
}

interface MeshMaterialEntry {
  mat: THREE.MeshStandardMaterial;
  originalEmissive: THREE.Color;
  targetEmissive: THREE.Color;
  active: boolean;
}

/**
 * ProductInteraction
 * High-performance, single-product interaction layer for Villa Lumina.
 *
 * Requirements met:
 * - Exactly ONE interactive product: 'product-01' (Aura Modern Lounge Chair).
 * - Raycasts ONLY against the target product hierarchy (zero full-scene traversal).
 * - Subtle, architectural champagne highlight on hover (no arcade neon glows).
 * - Click / tap detection opens the luxury ProductModal.
 * - Frame-rate independent and ultra lightweight.
 */
export default function ProductInteraction({
  onProductHover,
  onProductSelect,
  activeProduct
}: ProductInteractionProps) {
  const { camera, scene, gl, pointer } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hoveredIdRef = useRef<string | null>(null);

  // Cached target product meshes for fast O(1) raycasting
  const targetMeshesRef = useRef<THREE.Mesh[]>([]);

  // Material highlight registry
  const materialRegistry = useRef<Map<string, MeshMaterialEntry>>(new Map());

  // Subtle warm architectural champagne highlight
  const highlightColor = useRef(new THREE.Color(0x352b20));

  // 1. Detect touch device vs desktop fine pointer
  useEffect(() => {
    const checkTouch = () => {
      const hasCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasFine = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(hasCoarse && !hasFine);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // 2. Discover and cache meshes belonging to the single interactive product (product-01)
  useEffect(() => {
    const found: THREE.Mesh[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh.userData && mesh.userData.productId === 'product-01') {
        found.push(mesh);
      }
    });
    targetMeshesRef.current = found;
  }, [scene]);

  // 3. Register and smoothly interpolate subtle material highlights
  const applySubtleHighlight = useCallback(
    (mesh: THREE.Mesh, highlight: boolean) => {
      if (!mesh.material) return;

      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      mats.forEach((m) => {
        const stdMat = m as THREE.MeshStandardMaterial;
        if (!stdMat || !stdMat.isMeshStandardMaterial || !stdMat.emissive) return;

        let entry = materialRegistry.current.get(stdMat.uuid);
        if (!entry) {
          entry = {
            mat: stdMat,
            originalEmissive: stdMat.emissive.clone(),
            targetEmissive: stdMat.emissive.clone(),
            active: false
          };
          materialRegistry.current.set(stdMat.uuid, entry);
        }

        entry.active = highlight;
        if (highlight) {
          entry.targetEmissive.copy(highlightColor.current);
        } else {
          entry.targetEmissive.copy(entry.originalEmissive);
        }
      });
    },
    []
  );

  // 4. Fast Raycast & Highlight loop inside React Three Fiber frame
  useFrame(() => {
    const isTargetActive = activeProduct === 'product-01';

    // If we have cached meshes, raycast only them
    if (targetMeshesRef.current.length > 0) {
      if (!isTouchDevice && !activeProduct) {
        raycaster.current.setFromCamera(pointer, camera);
        const intersects = raycaster.current.intersectObjects(targetMeshesRef.current, false);

        const isHovered = intersects.length > 0;
        const currentFoundId = isHovered ? 'product-01' : null;

        if (currentFoundId !== hoveredIdRef.current) {
          hoveredIdRef.current = currentFoundId;
          gl.domElement.style.cursor = isHovered ? 'pointer' : 'default';

          if (onProductHover) {
            onProductHover(currentFoundId);
          }
        }
      } else if (activeProduct) {
        if (gl.domElement.style.cursor !== 'default') {
          gl.domElement.style.cursor = 'default';
        }
      }

      const shouldHighlight = isTargetActive || hoveredIdRef.current === 'product-01';
      for (const mesh of targetMeshesRef.current) {
        applySubtleHighlight(mesh, shouldHighlight);
      }
    }

    // Smoothly lerp material emissive properties (silky architectural warmth)
    materialRegistry.current.forEach((entry, uuid) => {
      entry.mat.emissive.lerp(entry.targetEmissive, 0.12);

      const diff =
        Math.abs(entry.mat.emissive.r - entry.originalEmissive.r) +
        Math.abs(entry.mat.emissive.g - entry.originalEmissive.g) +
        Math.abs(entry.mat.emissive.b - entry.originalEmissive.b);

      if (!entry.active && diff < 0.005) {
        entry.mat.emissive.copy(entry.originalEmissive);
        materialRegistry.current.delete(uuid);
      }
    });
  });

  // 5. Desktop Click & Mobile Tap Handling for single interactive product
  useEffect(() => {
    const dom = gl.domElement;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerStartTime = 0;

    const handlePointerDown = (e: PointerEvent) => {
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      pointerStartTime = performance.now();
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dx = Math.abs(e.clientX - pointerStartX);
      const dy = Math.abs(e.clientY - pointerStartY);
      const dt = performance.now() - pointerStartTime;

      // Filter out camera drags/walk movements
      if (dx > 8 || dy > 8 || dt > 400) return;

      if (targetMeshesRef.current.length === 0) return;

      const rect = dom.getBoundingClientRect();
      const clickCoords = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const clickRaycaster = new THREE.Raycaster();
      clickRaycaster.setFromCamera(clickCoords, camera);
      const intersects = clickRaycaster.intersectObjects(targetMeshesRef.current, false);

      if (intersects.length > 0 && onProductSelect) {
        onProductSelect('product-01');
      }
    };

    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointerup', handlePointerUp);

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl.domElement, camera, onProductSelect]);

  // Clean up cursor on unmount
  useEffect(() => {
    const canvasDom = gl.domElement;
    return () => {
      if (canvasDom) canvasDom.style.cursor = 'default';
    };
  }, [gl.domElement]);

  return null;
}
