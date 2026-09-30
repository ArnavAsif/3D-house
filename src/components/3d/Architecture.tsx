'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { buildArchitecture } from '@/three/architectureBuilder';
import * as THREE from 'three';

interface ArchitectureProps {
  showCeiling?: boolean;
}

/**
 * Architecture
 * React Three Fiber component rendering the complete structural shell for Villa Lumina.
 * Manages floors, 0.32m exterior walls, 0.15m interior partitions, doors, windows,
 * and ceiling visibility according to camera mode.
 */
export default function Architecture({ showCeiling = false }: ArchitectureProps) {
  const ceilingRef = useRef<THREE.Group | null>(null);

  const { group, ceilingGroup } = useMemo(() => {
    return buildArchitecture();
  }, []);

  useEffect(() => {
    ceilingRef.current = ceilingGroup;
  }, [ceilingGroup]);

  useEffect(() => {
    if (ceilingRef.current) {
      ceilingRef.current.visible = showCeiling;
    }
  }, [showCeiling]);

  return <primitive object={group} />;
}
