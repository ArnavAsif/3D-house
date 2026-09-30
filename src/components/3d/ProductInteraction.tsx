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
 * Raycasting and pointer event manager for interactive showroom products.
 *
 * Architecture:
 * - Three.js Raycasting through React Three Fiber.
 * - Completely separate from product rendering.
 * - Desktop: Smooth hover detection, subtle material highlight, cursor styling.
 * - Mobile: Hover disabled; tap detection selects product and maintains subtle highlight until closed.
 * - Subtle, premium architectural highlight (no aggressive glowing effects).
 * - Pure 3D WebGL component returning null (no DOM JSX inside Canvas).
 */
export default function ProductInteraction({
  onProductHover,
  onProductSelect,
  activeProduct
}: ProductInteractionProps) {
  const { camera, scene, gl, pointer } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Hover tracking
  const hoveredIdRef = useRef<string | null>(null);

  // Material highlight registry
  // Maps material UUID -> original color and smooth lerp target
  const materialRegistry = useRef<Map<string, MeshMaterialEntry>>(new Map());

  // Subtle warm architectural champagne highlight (calm, elegant, physically based)
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

  // 2. Register and smoothly interpolate subtle material highlights
  const applySubtleHighlight = useCallback(
    (mesh: THREE.Mesh, highlight: boolean) => {
      if (!mesh.material || mesh.userData.isHotspot) return;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      materials.forEach((m) => {
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

  // 3. Raycast and highlight loop inside React Three Fiber frame
  useFrame(() => {
    // Current target product to highlight:
    // On Mobile: strictly the selected activeProduct (persists while panel is open)
    // On Desktop: hovered product or active selected product
    const targetProduct = isTouchDevice
      ? activeProduct
      : (hoveredIdRef.current || activeProduct);

    // Desktop hover raycasting (only when no modal is active and not touch device)
    if (!isTouchDevice && !activeProduct) {
      raycaster.current.setFromCamera(pointer, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      let foundId: string | null = null;

      for (const hit of intersects) {
        if (!hit.object.visible) continue;

        let cur: THREE.Object3D | null = hit.object;
        let isProduct = false;
        while (cur && cur !== scene) {
          if (cur.userData && (cur.userData.productId || cur.userData.isInteractive)) {
            foundId = cur.userData.productId || cur.userData.showroomId;
            isProduct = true;
            break;
          }
          cur = cur.parent;
        }

        if (isProduct) {
          break;
        }

        // Occlusion check: solid non-transparent geometry blocks ray
        const meshObj = hit.object as THREE.Mesh;
        const mat = meshObj.material as THREE.Material | undefined;
        const isTransparent = mat && mat.transparent && mat.opacity < 0.3;
        if (!isTransparent) {
          break;
        }
      }

      if (foundId !== hoveredIdRef.current) {
        hoveredIdRef.current = foundId;
        gl.domElement.style.cursor = foundId ? 'pointer' : 'default';

        if (onProductHover) {
          onProductHover(foundId);
        }
      }
    } else if (activeProduct) {
      gl.domElement.style.cursor = 'default';
    }

    // Traverse scene to flag meshes of targetProduct as highlighted
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh.userData && (mesh.userData.productId || mesh.userData.showroomId)) {
        const isTarget =
          Boolean(targetProduct) &&
          (mesh.userData.productId === targetProduct || mesh.userData.showroomId === targetProduct);
        applySubtleHighlight(mesh, isTarget);
      }
    });

    // 4. Smoothly lerp material emissive properties at 60 FPS (silky architectural warmth)
    materialRegistry.current.forEach((entry, uuid) => {
      entry.mat.emissive.lerp(entry.targetEmissive, 0.12);

      // If returning to original and very close, snap to prevent endless lerp
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

  // 5. Desktop Click & Mobile Tap Handling
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

      // Filter out drags/swipes (camera rotation/player walking)
      if (dx > 8 || dy > 8 || dt > 400) return;

      // Tap / Click Raycasting
      const rect = dom.getBoundingClientRect();
      const clickCoords = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const clickRaycaster = new THREE.Raycaster();
      clickRaycaster.setFromCamera(clickCoords, camera);
      const intersects = clickRaycaster.intersectObjects(scene.children, true);

      let clickedProduct: string | null = null;
      for (const hit of intersects) {
        if (!hit.object.visible) continue;

        let cur: THREE.Object3D | null = hit.object;
        let isProduct = false;
        while (cur && cur !== scene) {
          if (cur.userData && (cur.userData.productId || cur.userData.isInteractive)) {
            clickedProduct = cur.userData.productId || cur.userData.showroomId;
            isProduct = true;
            break;
          }
          cur = cur.parent;
        }

        if (isProduct) {
          break;
        }

        const meshObj = hit.object as THREE.Mesh;
        const mat = meshObj.material as THREE.Material | undefined;
        const isTransparent = mat && mat.transparent && mat.opacity < 0.3;
        if (!isTransparent) {
          break;
        }
      }

      if (clickedProduct && onProductSelect) {
        onProductSelect(clickedProduct);
      }
    };

    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointerup', handlePointerUp);

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl.domElement, camera, scene, onProductSelect]);

  // Clean up cursor on unmount
  useEffect(() => {
    const canvasDom = gl.domElement;
    return () => {
      if (canvasDom) canvasDom.style.cursor = 'default';
    };
  }, [gl.domElement]);

  // Pure 3D component inside R3F canvas tree
  return null;
}
