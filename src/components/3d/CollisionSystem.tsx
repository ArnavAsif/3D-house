'use client';

import * as THREE from 'three';
import { COLLISION_OBSTACLES } from '@/data/roomData';
import { CollisionObstacle } from '@/types/showroom';

/**
 * CollisionSystem
 * Sliding collision resolution engine for Villa Lumina.
 * Ensures the user has fluid, realistic walking navigation through all rooms
 * without clipping through solid walls, kitchen islands, or built-in plinths.
 */
export class CollisionEngine {
  public obstacles: CollisionObstacle[];
  public playerRadius: number;

  constructor(obstacles: CollisionObstacle[] = COLLISION_OBSTACLES as unknown as CollisionObstacle[]) {
    this.obstacles = obstacles;
    this.playerRadius = 0.45; // 450mm body clearance
  }

  /**
   * Resolves player movement with independent X and Z axis sliding collision checks.
   * @param currentPos - Current player position
   * @param targetPos - Intended next position
   * @returns Corrected position allowing smooth wall sliding
   */
  resolveMovement(currentPos: THREE.Vector3, targetPos: THREE.Vector3): THREE.Vector3 {
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

    // Retain fixed eye-level camera height (1.65m standard standing perspective)
    nextPos.y = 1.65;

    return nextPos;
  }
}

export const collisionEngine = new CollisionEngine();

export default function CollisionSystem() {
  return null;
}
