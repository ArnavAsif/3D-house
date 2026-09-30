'use client';

import React, { useMemo, useEffect } from 'react';
import { buildFurnitureAndProducts } from '@/three/furnitureBuilder';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';
import * as THREE from 'three';

interface FurnitureProps {
  onRegisterInteractives?: (data: {
    interactiveMeshes: THREE.Mesh[];
    hotspots: THREE.Group[];
    group: THREE.Group;
  }) => void;
}

/**
 * Furniture
 * React Three Fiber component rendering the contemporary luxury interior:
 * Curved bouclé sectional sofa, custom rugs, indoor mature fiddle leaf fig & olive trees,
 * minimalist textured canvas art, and built-in architectural joinery.
 */
export default function Furniture({ onRegisterInteractives }: FurnitureProps) {
  const { group, interactiveMeshes, hotspots } = useMemo(() => {
    return buildFurnitureAndProducts(null, SHOWROOM_PRODUCTS);
  }, []);

  useEffect(() => {
    if (onRegisterInteractives) {
      onRegisterInteractives({ interactiveMeshes, hotspots, group });
    }
  }, [interactiveMeshes, hotspots, group, onRegisterInteractives]);

  return <primitive object={group} />;
}
