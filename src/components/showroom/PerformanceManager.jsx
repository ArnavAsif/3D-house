'use client';

import React from 'react';
import { AdaptiveDpr, AdaptiveEvents, Bvh } from '@react-three/drei';

/**
 * PerformanceManager
 * Adaptive rendering controls and hardware scaling for React Three Fiber.
 * Automatically adapts device pixel ratio during camera movement and downscales
 * expensive compute passes on low-power mobile GPUs.
 */
export default function PerformanceManager({ enableBvh = true }) {
  return (
    <>
      {/* Adaptively scales DPR down when frame drops occur (e.g. 1.5x down to 1x) */}
      <AdaptiveDpr pixelated />

      {/* Disables raycasting and pointer events during fast camera rotations to maintain 60 FPS */}
      <AdaptiveEvents />

      {/* Accelerated raycasting BVH structure for high polygon interior geometry */}
      {enableBvh && <Bvh firstHitOnly />}
    </>
  );
}
