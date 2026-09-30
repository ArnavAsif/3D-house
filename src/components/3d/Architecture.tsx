'use client';

import React, { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { buildArchitecture } from '@/three/architectureBuilder';
import { collisionEngine } from './CollisionSystem';
import * as THREE from 'three';

interface ArchitectureProps {
  showCeiling?: boolean;
  onDoorProximity?: (state: { isNear: boolean; isOpen: boolean }) => void;
  onToggleDoorRegister?: (toggleFn: () => void) => void;
}

/**
 * Architecture
 * React Three Fiber component rendering the structural shell for Villa Lumina.
 * Manages floors, walls, sealed Coming Soon wings, ceilings, sheer linen curtains,
 * and the ONE usable Accessible Terrace Pivot Door with realistic physics animation and collision updating.
 */
export default function Architecture({
  showCeiling = true,
  onDoorProximity,
  onToggleDoorRegister
}: ArchitectureProps) {
  const ceilingRef = useRef<THREE.Group | null>(null);
  const [_isDoorOpen, setIsDoorOpen] = useState(false);
  const isDoorOpenRef = useRef(false);
  const isNearDoorRef = useRef(false);

  const { group, ceilingGroup, accessibleDoor } = useMemo(() => {
    return buildArchitecture();
  }, []);

  const doorPivotRef = useRef<THREE.Group | null>(null);
  const doorCenterPos = useMemo(() => {
    return accessibleDoor?.centerPos || new THREE.Vector3(0.0, 1.4, 6.34);
  }, [accessibleDoor]);

  useEffect(() => {
    ceilingRef.current = ceilingGroup;
    if (accessibleDoor && accessibleDoor.pivot) {
      doorPivotRef.current = accessibleDoor.pivot;
    }
  }, [ceilingGroup, accessibleDoor]);

  useEffect(() => {
    if (ceilingRef.current) {
      ceilingRef.current.visible = showCeiling;
    }
  }, [showCeiling]);

  // Master toggle function for accessible front entrance door
  const toggleDoor = useCallback(() => {
    const nextState = !isDoorOpenRef.current;
    isDoorOpenRef.current = nextState;
    setIsDoorOpen(nextState);

    // Dynamic collision update:
    // When front door is open, remove collision obstacle so player can physically walk inside
    // When door closes, restore collision blocking
    collisionEngine.setObstacleActive('front-door-entrance', !nextState);

    if (onDoorProximity) {
      onDoorProximity({ isNear: isNearDoorRef.current, isOpen: nextState });
    }
  }, [onDoorProximity]);

  // Register toggleDoor callback with parent
  useEffect(() => {
    if (onToggleDoorRegister) {
      onToggleDoorRegister(toggleDoor);
    }
  }, [onToggleDoorRegister, toggleDoor]);

  // Keyboard shortcut listener: Press 'E' to open/close when near the door
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'KeyE' || e.key === 'e' || e.key === 'E') && isNearDoorRef.current) {
        e.preventDefault();
        toggleDoor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDoor]);

  // Frame loop: checks camera proximity and smoothly animates door rotation around hinge
  useFrame((state, delta) => {
    // 1. Proximity check with player camera (within 2.5m)
    const dist = state.camera.position.distanceTo(doorCenterPos);
    const isNear = dist < 2.5;

    if (isNear !== isNearDoorRef.current) {
      isNearDoorRef.current = isNear;
      if (onDoorProximity) {
        onDoorProximity({ isNear, isOpen: isDoorOpenRef.current });
      }
    }

    // 2. Realistic door pivot rotation around vertical hinge with cubic easing
    if (doorPivotRef.current) {
      // Rotation: 0 radians when closed, Math.PI / 2 (+90 deg inward into the foyer) when open
      const targetRotation = isDoorOpenRef.current ? Math.PI / 2 : 0;
      doorPivotRef.current.rotation.y = THREE.MathUtils.damp(
        doorPivotRef.current.rotation.y,
        targetRotation,
        3.2, // Smooth, weighted architectural opening speed (~1.2s)
        delta
      );
    }
  });

  return (
    <primitive
      object={group}
      onClick={(e: any) => {
        // Allow clicking directly on the terrace door to open/close
        if (isNearDoorRef.current) {
          e.stopPropagation?.();
          toggleDoor();
        }
      }}
    />
  );
}
