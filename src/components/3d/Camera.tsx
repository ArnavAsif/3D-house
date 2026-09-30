'use client';

import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface CameraProps {
  currentMode?: string;
}

/**
 * Camera
 * Dual-perspective architectural camera manager for Villa Lumina.
 * Toggles seamlessly between Orbiting Dollhouse Axonometric View and First-Person Walkthrough.
 */
export default function Camera({ currentMode = 'FIRST_PERSON' }: CameraProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Switch camera perspective on mode change
  useEffect(() => {
    if (currentMode === 'DOLLHOUSE') {
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
        controlsRef.current.target.set(-5.5, 1.2, 2.5);
      }
      camera.position.set(-5.5, 14, 16);
      camera.lookAt(-5.5, 1.2, 2.5);
    } else {
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
      camera.position.set(0.0, 1.65, 11.2);
      camera.lookAt(0.0, 1.65, 6.34);
    }
  }, [currentMode, camera]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enabled={currentMode === 'DOLLHOUSE'}
        enableDamping
        dampingFactor={0.08}
        minDistance={6}
        maxDistance={42}
        minPolarAngle={Math.PI / 12}
        maxPolarAngle={Math.PI / 2.3}
        target={[0, 1.2, 0]}
      />
    </>
  );
}
