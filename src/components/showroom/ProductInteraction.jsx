'use client';

import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ProductInteraction
 * Raycasting and pointer event manager for interactive showroom products.
 * Traverses geometry hierarchy to find meshes tagged with `userData.productId`
 * and dispatches decoupled events to the UI layer.
 */
export default function ProductInteraction({
  onProductHover,
  onProductSelect,
  activeProduct
}) {
  const { camera, scene, gl, pointer } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const hoveredRef = useRef(null);

  // Manage raycast test each frame or on pointer move
  useFrame(() => {
    // If active product modal is open, avoid background raycast spam
    if (activeProduct) {
      if (hoveredRef.current) {
        hoveredRef.current = null;
        gl.domElement.style.cursor = 'default';
        if (onProductHover) onProductHover(null);
      }
      return;
    }

    raycaster.current.setFromCamera(pointer, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    let foundProduct = null;

    for (const hit of intersects) {
      let cur = hit.object;
      while (cur && cur !== scene) {
        if (cur.userData && cur.userData.productId) {
          foundProduct = cur.userData.productId;
          break;
        }
        cur = cur.parent;
      }
      if (foundProduct) break;
    }

    if (foundProduct !== hoveredRef.current) {
      hoveredRef.current = foundProduct;
      gl.domElement.style.cursor = foundProduct ? 'pointer' : 'default';
      if (onProductHover) onProductHover(foundProduct);
    }
  });

  // Handle global click on interactive products
  useEffect(() => {
    const handleClick = () => {
      if (hoveredRef.current && onProductSelect) {
        onProductSelect(hoveredRef.current);
      }
    };

    const dom = gl.domElement;
    dom.addEventListener('click', handleClick);
    return () => {
      dom.removeEventListener('click', handleClick);
    };
  }, [gl.domElement, onProductSelect]);

  return null;
}
