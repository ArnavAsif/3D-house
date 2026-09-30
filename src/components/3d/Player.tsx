'use client';

import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { collisionEngine } from './CollisionSystem';
import { playerStore } from '@/lib/store/playerStore';

interface PlayerProps {
  currentMode: string;
  joystickVector?: { x: number; y: number };
  onPositionUpdate?: (pos: { x: number; z: number; yaw: number; mode: string }) => void;
  teleportTarget?: { x: number; z: number; yaw?: number } | null;
}

// Re-usable scratch vectors to ensure ZERO per-frame garbage collection
const _moveVec = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _forward = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();
const _upAxis = new THREE.Vector3(0, 1, 0);
const _pitchAxis = new THREE.Vector3(1, 0, 0);

/**
 * Player
 * High-performance, zero-allocation First-Person avatar & movement controller.
 *
 * Performance & Physics Highlights:
 * - Pre-allocated module-level Vector3s: ZERO heap allocations in useFrame loop.
 * - Velocity-based acceleration & friction damping with frame-rate independent delta time.
 * - Buttery-smooth mouse look damping (rate: 22.0) with pitch clamping [-75°, +75°].
 * - Decoupled position broadcast to playerStore: ZERO React state re-renders of the 3D scene while walking!
 * - Lightweight 2D circle-box collision resolution with tangential sliding.
 */
export default function Player({
  currentMode,
  joystickVector,
  onPositionUpdate,
  teleportTarget
}: PlayerProps) {
  const { camera, gl } = useThree();

  // Initial spawn: Outside facing the front entrance portico
  const playerPos = useRef(new THREE.Vector3(0.0, 1.65, 11.2));
  const playerYaw = useRef(0.0);
  const playerPitch = useRef(-0.02);

  // Smooth look target angles
  const targetYaw = useRef(0.0);
  const targetPitch = useRef(-0.02);

  // Velocity integration
  const velocity = useRef(new THREE.Vector2(0, 0));

  // Pointer dragging state
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Throttled store update timer (15Hz)
  const lastUpdateTimer = useRef(0);

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  // Handle room teleportation if requested
  useEffect(() => {
    if (teleportTarget) {
      playerPos.current.set(teleportTarget.x, 1.65, teleportTarget.z);
      playerYaw.current = teleportTarget.yaw || 0;
      targetYaw.current = teleportTarget.yaw || 0;
      playerPitch.current = 0;
      targetPitch.current = 0;
      velocity.current.set(0, 0);
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

  // Mouse look listeners: Supports both pointer lock and smooth drag look
  useEffect(() => {
    if (currentMode !== 'FIRST_PERSON') return;

    const dom = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 0) {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const isLocked = document.pointerLockElement === dom;

      if (isLocked) {
        const lookSpeed = 0.0022;
        targetYaw.current -= e.movementX * lookSpeed;
        targetPitch.current -= e.movementY * lookSpeed;
        targetPitch.current = Math.max(-1.3, Math.min(1.3, targetPitch.current));
      } else if (isDragging.current) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        lastMousePos.current = { x: e.clientX, y: e.clientY };

        const lookSpeed = 0.0026;
        targetYaw.current -= dx * lookSpeed;
        targetPitch.current -= dy * lookSpeed;
        targetPitch.current = Math.max(-1.3, Math.min(1.3, targetPitch.current));
      }
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

  // Per-frame physics update & smooth movement integration (ZERO allocations)
  useFrame((_, delta) => {
    if (currentMode !== 'FIRST_PERSON') return;

    // Clamp delta-time to avoid huge physics spikes when tab changes
    const dt = Math.min(delta, 0.05);

    // 1. Smooth Camera Look Angle Damping (Eliminates mouse stutter)
    playerYaw.current = THREE.MathUtils.damp(playerYaw.current, targetYaw.current, 22.0, dt);
    playerPitch.current = THREE.MathUtils.damp(playerPitch.current, targetPitch.current, 22.0, dt);

    // 2. Compute Desired Input Vector
    const moveZ =
      (keys.current.forward ? -1 : 0) +
      (keys.current.backward ? 1 : 0) +
      (joystickVector ? -joystickVector.y : 0);
    const moveX =
      (keys.current.right ? 1 : 0) +
      (keys.current.left ? -1 : 0) +
      (joystickVector ? joystickVector.x : 0);

    const inputLen = Math.hypot(moveX, moveZ);
    const maxSpeed = 3.6; // 3.6 m/s walk speed

    let targetVelX = 0;
    let targetVelZ = 0;

    if (inputLen > 0.05) {
      targetVelX = (moveX / inputLen) * maxSpeed;
      targetVelZ = (moveZ / inputLen) * maxSpeed;
    }

    // 3. Smooth Acceleration / Deceleration Damping
    const accelRate = inputLen > 0.05 ? 14.0 : 16.0; // Responsive acceleration, smooth friction stop
    velocity.current.x = THREE.MathUtils.damp(velocity.current.x, targetVelX, accelRate, dt);
    velocity.current.y = THREE.MathUtils.damp(velocity.current.y, targetVelZ, accelRate, dt);

    // 4. Integrate Velocity into World Position with Yaw Rotation (Zero allocations!)
    const currentSpeedSq = velocity.current.lengthSq();
    if (currentSpeedSq > 0.0001) {
      _moveVec.set(velocity.current.x * dt, 0, velocity.current.y * dt);
      _moveVec.applyAxisAngle(_upAxis, playerYaw.current);

      _targetPos.copy(playerPos.current).add(_moveVec);

      // Resolve collision with architectural walls and obstacle footprints
      const correctedPos = collisionEngine.resolveMovement(playerPos.current, _targetPos);
      playerPos.current.copy(correctedPos);
    }

    // 5. Synchronize Camera with Player Position and Look Angles
    camera.position.copy(playerPos.current);

    _forward.set(0, 0, -1);
    _forward.applyAxisAngle(_pitchAxis, playerPitch.current);
    _forward.applyAxisAngle(_upAxis, playerYaw.current);

    _lookTarget.copy(playerPos.current).add(_forward);
    camera.lookAt(_lookTarget);

    // 6. Throttled Position Broadcast to playerStore (15Hz) - ZERO React state re-renders!
    lastUpdateTimer.current += dt;
    if (lastUpdateTimer.current >= 0.066) {
      lastUpdateTimer.current = 0;
      playerStore.set({
        x: playerPos.current.x,
        z: playerPos.current.z,
        yaw: playerYaw.current,
        mode: currentMode
      });
      if (onPositionUpdate) {
        onPositionUpdate({
          x: playerPos.current.x,
          z: playerPos.current.z,
          yaw: playerYaw.current,
          mode: currentMode
        });
      }
    }
  });

  return null;
}
