'use client';

import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { collisionEngine } from './CollisionSystem';

interface PlayerProps {
  currentMode: string;
  joystickVector?: { x: number; y: number };
  onPositionUpdate: (pos: { x: number; z: number; yaw: number; mode: string }) => void;
  teleportTarget?: { x: number; z: number; yaw?: number } | null;
}

/**
 * Player
 * First-Person avatar & movement controller for Villa Lumina.
 * Operates in FIRST_PERSON mode with WASD, mouse drag rotation, and mobile joystick.
 * Broadcasts position coordinates to the 2D floor plan radar minimap.
 */
export default function Player({
  currentMode,
  joystickVector,
  onPositionUpdate,
  teleportTarget
}: PlayerProps) {
  const { camera, gl } = useThree();

  const playerPos = useRef(new THREE.Vector3(0, 1.65, 7.8)); // Start at entry porch
  const playerYaw = useRef(0);
  const playerPitch = useRef(0);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  // Handle room teleportation
  useEffect(() => {
    if (teleportTarget) {
      playerPos.current.set(teleportTarget.x, 1.65, teleportTarget.z);
      playerYaw.current = teleportTarget.yaw || 0;
      playerPitch.current = 0;
    }
  }, [teleportTarget]);

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse drag look listeners (360° first-person view)
  useEffect(() => {
    if (currentMode !== 'FIRST_PERSON') return;

    const dom = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      const lookSpeed = 0.003;
      playerYaw.current -= dx * lookSpeed;
      playerPitch.current -= dy * lookSpeed;

      // Clamp vertical pitch to prevent neck overturning [-60°, +60°]
      playerPitch.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, playerPitch.current));
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [currentMode, gl.domElement]);

  // Per-frame physics update & movement integration
  useFrame((_, delta) => {
    if (currentMode !== 'FIRST_PERSON') return;

    const dt = Math.min(delta, 0.1);
    const walkSpeed = 3.6; // 3.6 m/s walk speed

    // Calculate move vector from keyboard or mobile joystick
    const moveZ =
      (keys.current.forward ? -1 : 0) +
      (keys.current.backward ? 1 : 0) +
      (joystickVector ? -joystickVector.y : 0);
    const moveX =
      (keys.current.right ? 1 : 0) +
      (keys.current.left ? -1 : 0) +
      (joystickVector ? joystickVector.x : 0);

    if (Math.abs(moveX) > 0.05 || Math.abs(moveZ) > 0.05) {
      const dir = new THREE.Vector3(moveX, 0, moveZ).normalize();

      // Rotate direction vector by player's horizontal yaw
      dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerYaw.current);

      const targetPos = playerPos.current.clone().addScaledVector(dir, walkSpeed * dt);

      // Resolve collision with architectural walls and obstacle footprints
      const correctedPos = collisionEngine.resolveMovement(playerPos.current, targetPos);
      playerPos.current.copy(correctedPos);
    }

    // Synchronize Camera with Player Position and Look Angles
    camera.position.copy(playerPos.current);

    // Compute look-at direction
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyAxisAngle(new THREE.Vector3(1, 0, 0), playerPitch.current);
    forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerYaw.current);

    const lookTarget = playerPos.current.clone().add(forward);
    camera.lookAt(lookTarget);

    // Broadcast current position to 2D floor plan radar minimap
    if (onPositionUpdate) {
      onPositionUpdate({
        x: playerPos.current.x,
        z: playerPos.current.z,
        yaw: playerYaw.current,
        mode: currentMode
      });
    }
  });

  return null;
}
