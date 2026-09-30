'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { productService } from '@/lib/products/productService';

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
 * FloatingCursorIndicator
 * Subtle floating luxury badge that follows mouse cursor on desktop when pointing at an interactive product.
 */
function FloatingCursorIndicator({
  visible,
  x,
  y,
  productName
}: {
  visible: boolean;
  x: number;
  y: number;
  productName: string;
}) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={`product-cursor-indicator ${visible ? 'active' : ''}`}
      style={{
        transform: `translate3d(${x + 16}px, ${y + 16}px, 0)`,
        pointerEvents: 'none'
      }}
    >
      <span className="indicator-dot" />
      <span className="indicator-title">{productName}</span>
      <span className="indicator-action">Inspect</span>
    </div>,
    document.body
  );
}

/**
 * ProductInteraction
 * Raycasting and pointer event manager for interactive showroom products.
 *
 * Architecture:
 * - Three.js Raycasting through React Three Fiber.
 * - Completely separate from product rendering.
 * - Desktop: Smooth hover detection, subtle material highlight, cursor styling, and floating product indicator.
 * - Mobile: Hover disabled; tap detection selects product and maintains subtle highlight until closed.
 * - Subtle, premium architectural highlight (no aggressive glowing effects).
 */
export default function ProductInteraction({
  onProductHover,
  onProductSelect,
  activeProduct
}: ProductInteractionProps) {
  const { camera, scene, gl, pointer } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hover state
  const hoveredIdRef = useRef<string | null>(null);
  const [hoveredProductName, setHoveredProductName] = useState<string>('');
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 });

  // Material highlight registry
  // Maps material UUID -> original color and smooth lerp target
  const materialRegistry = useRef<Map<string, MeshMaterialEntry>>(new Map());

  // Subtle warm architectural champagne highlight (calm, elegant, physically based)
  const highlightColor = useRef(new THREE.Color(0x352b20));
  const blackColor = useRef(new THREE.Color(0x000000));

  // 1. Detect touch device vs desktop fine pointer
  useEffect(() => {
    setMounted(true);
    const checkTouch = () => {
      const hasCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasFine = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(hasCoarse && !hasFine);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // 2. Track mouse cursor position on desktop for the small product name indicator
  useEffect(() => {
    if (isTouchDevice) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isTouchDevice]);

  // 3. Register and smoothly interpolate subtle material highlights
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

  // 4. Raycast and highlight loop inside React Three Fiber frame
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
        let cur: THREE.Object3D | null = hit.object;
        while (cur && cur !== scene) {
          if (cur.userData && (cur.userData.productId || cur.userData.isInteractive)) {
            foundId = cur.userData.productId || cur.userData.showroomId;
            break;
          }
          cur = cur.parent;
        }
        if (foundId) break;
      }

      if (foundId !== hoveredIdRef.current) {
        hoveredIdRef.current = foundId;
        gl.domElement.style.cursor = foundId ? 'pointer' : 'default';

        if (onProductHover) {
          onProductHover(foundId);
        }

        if (foundId) {
          productService.getProduct(foundId).then((prod) => {
            if (prod) setHoveredProductName(prod.title || prod.name);
          }).catch(() => {
            setHoveredProductName('Showroom Piece');
          });
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

    // 5. Smoothly lerp material emissive properties at 60 FPS (silky architectural warmth)
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

  // 6. Desktop Click & Mobile Tap Handling
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
        let cur: THREE.Object3D | null = hit.object;
        while (cur && cur !== scene) {
          if (cur.userData && (cur.userData.productId || cur.userData.isInteractive)) {
            clickedProduct = cur.userData.productId || cur.userData.showroomId;
            break;
          }
          cur = cur.parent;
        }
        if (clickedProduct) break;
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

  const showIndicator =
    mounted &&
    !isTouchDevice &&
    Boolean(hoveredIdRef.current) &&
    !activeProduct &&
    Boolean(hoveredProductName);

  return (
    <>
      {showIndicator && (
        <FloatingCursorIndicator
          visible={showIndicator}
          x={cursorPos.x}
          y={cursorPos.y}
          productName={hoveredProductName}
        />
      )}
    </>
  );
}
