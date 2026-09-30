'use client';

import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { collisionEngine } from './CollisionSystem';

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
}) {
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
    const handleKeyDown = (e) => {
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
      }
    };

    const handleKeyUp = (e) => {
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse drag look-around listeners
  useEffect(() => {
    if (currentMode !== 'FIRST_PERSON') return;

    const dom = gl.domElement;

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      playerYaw.current -= dx * 0.003;
      playerPitch.current -= dy * 0.003;
      playerPitch.current = Math.max(-Math.PI / 2.6, Math.min(Math.PI / 2.6, playerPitch.current));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentMode, gl.domElement]);

  // Frame tick: update player movement, collision resolution, and camera transform
  useFrame((_, delta) => {
    if (currentMode !== 'FIRST_PERSON') return;

    const moveSpeed = 4.2; // meters/sec
    const moveDir = new THREE.Vector3();

    if (keys.current.forward) moveDir.z -= 1;
    if (keys.current.backward) moveDir.z += 1;
    if (keys.current.left) moveDir.x -= 1;
    if (keys.current.right) moveDir.x += 1;

    // Mobile virtual joystick input
    if (joystickVector && (Math.abs(joystickVector.x) > 0.1 || Math.abs(joystickVector.y) > 0.1)) {
      moveDir.x += joystickVector.x;
      moveDir.z -= joystickVector.y;
    }

    if (moveDir.lengthSq() > 0.001) {
      moveDir.normalize();

      const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), playerYaw.current);
      const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), playerYaw.current);

      const targetMovement = forward.multiplyScalar(-moveDir.z).add(right.multiplyScalar(moveDir.x));
      targetMovement.multiplyScalar(moveSpeed * delta);

      const intendedPos = playerPos.current.clone().add(targetMovement);
      playerPos.current = collisionEngine.resolveMovement(playerPos.current, intendedPos);
    }

    // Update Camera Position and Look Direction
    camera.position.copy(playerPos.current);
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.x = playerPitch.current;
    euler.y = playerYaw.current;
    camera.quaternion.setFromEuler(euler);

    // Broadcast position to Minimap Radar
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
