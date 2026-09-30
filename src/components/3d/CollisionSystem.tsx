'use client';

import * as THREE from 'three';
import { COLLISION_OBSTACLES, WALK_LIMITS } from '@/data/roomData';
import { CollisionObstacle } from '@/types/showroom';

/**
 * CollisionSystem
 * High-performance sliding collision resolution engine for Villa Lumina.
 * Uses lightweight 2D AABB circle-box penetration resolution with tangent sliding.
 * Prevents camera clipping and eliminates frame drops or jitter.
 */
export class CollisionEngine {
  public obstacles: (CollisionObstacle & { active?: boolean })[];
  public playerRadius: number;

  constructor(obstacles: CollisionObstacle[] = COLLISION_OBSTACLES as unknown as CollisionObstacle[]) {
    this.obstacles = obstacles.map((obs) => ({ ...obs, active: true }));
    this.playerRadius = 0.35; // 350mm realistic human body clearance
  }

  /**
   * Sets whether a specific obstacle (e.g. interactive front door) is active in collision checks.
   */
  setObstacleActive(id: string, active: boolean) {
    const obs = this.obstacles.find((o) => o.id === id);
    if (obs) {
      obs.active = active;
    }
  }

  /**
   * Resolves player movement with independent X and Z axis sliding collision checks.
   * @param currentPos - Current player position
   * @param targetPos - Intended next position
   * @returns Corrected position allowing smooth wall and furniture sliding
   */
  resolveMovement(currentPos: THREE.Vector3, targetPos: THREE.Vector3): THREE.Vector3 {
    const nextPos = currentPos.clone();
    const r = this.playerRadius;

    // 1. Test X-axis movement
    let collideX = false;
    for (const obs of this.obstacles) {
      if (obs.active === false) continue;
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
      if (obs.active === false) continue;
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

    // 3. Clamp within master walkable boundary limits
    if (WALK_LIMITS) {
      nextPos.x = Math.max(WALK_LIMITS.minX + r, Math.min(WALK_LIMITS.maxX - r, nextPos.x));
      nextPos.z = Math.max(WALK_LIMITS.minZ + r, Math.min(WALK_LIMITS.maxZ - r, nextPos.z));
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
