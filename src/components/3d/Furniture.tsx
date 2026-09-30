'use client';

import React, { useMemo, useEffect } from 'react';
import { buildFurnitureAndProducts } from '@/three/furnitureBuilder';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';
import { ShowroomProductWithDetails } from '@/types/showroom';
import * as THREE from 'three';

interface FurnitureProps {
  products?: ShowroomProductWithDetails[];
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
 * Visual models only represent 3D geometry and dynamically receive database product IDs.
 */
export default function Furniture({ products, onRegisterInteractives }: FurnitureProps) {
  const { group, interactiveMeshes, hotspots } = useMemo(() => {
    const catalog = products && products.length > 0 ? products : SHOWROOM_PRODUCTS;
    return buildFurnitureAndProducts(null, catalog);
  }, [products]);

  useEffect(() => {
    if (onRegisterInteractives) {
      onRegisterInteractives({ interactiveMeshes, hotspots, group });
    }
  }, [interactiveMeshes, hotspots, group, onRegisterInteractives]);

  return <primitive object={group} />;
}
