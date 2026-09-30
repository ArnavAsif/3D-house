'use client';

import * as THREE from 'three';
import { COLLISION_OBSTACLES } from '../../data/roomData';

/**
 * CollisionSystem
 * Sliding collision resolution engine for Villa Lumina.
 * Ensures the user has fluid, realistic walking navigation through all rooms
 * without clipping through solid walls, kitchen islands, or built-in plinths.
 */
export class CollisionEngine {
  constructor(obstacles = COLLISION_OBSTACLES) {
    this.obstacles = obstacles;
    this.playerRadius = 0.45; // 450mm body clearance
  }

  /**
   * Resolves player movement with independent X and Z axis sliding collision checks.
   * @param {THREE.Vector3} currentPos - Current player position
   * @param {THREE.Vector3} targetPos - Intended next position
   * @returns {THREE.Vector3} - Corrected position allowing smooth wall sliding
   */
  resolveMovement(currentPos, targetPos) {
    const nextPos = currentPos.clone();
    const r = this.playerRadius;

    // 1. Test X-axis movement
    let collideX = false;
    for (const obs of this.obstacles) {
      if (
        targetPos.x + r > obs.minX &&
        targetPos.x - r < obs.maxX &&
        currentPos.z + r > obs.minZ &&
        currentPos.z - r < obs.maxZ
      ) {
        collideX = true;
        break;
      }
    }
    if (!collideX) {
      nextPos.x = targetPos.x;
    }

    // 2. Test Z-axis movement
    let collideZ = false;
    for (const obs of this.obstacles) {
      if (
        nextPos.x + r > obs.minX &&
        nextPos.x - r < obs.maxX &&
        targetPos.z + r > obs.minZ &&
        targetPos.z - r < obs.maxZ
      ) {
        collideZ = true;
        break;
      }
    }
    if (!collideZ) {
      nextPos.z = targetPos.z;
    }

    // Always maintain eye height
    nextPos.y = currentPos.y;
    return nextPos;
  }
}

// Global collision instance
export const collisionEngine = new CollisionEngine();

export default function CollisionSystem() {
  return null;
}
