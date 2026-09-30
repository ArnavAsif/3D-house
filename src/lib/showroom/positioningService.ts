import { ShowroomSpatialPosition, RoomDefinition, CollisionObstacle } from '@/types/showroom';
import { ROOMS_DATA, COLLISION_OBSTACLES } from '@/data/roomData';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * Showroom Positioning Service
 * Manages 3D spatial coordinates, circulation waypoints, and obstacle footprints.
 * Supports dynamic spatial hydration from Supabase PostgreSQL showroom_products table.
 */
export class ShowroomPositioningService {
  private positionsMap: Map<string, ShowroomSpatialPosition> = new Map();

  constructor() {
    SHOWROOM_PRODUCTS.forEach((prod, index) => {
      const dbId = prod.dbId || `p0000000-0000-0000-0000-0000000000${String(index + 1).padStart(2, '0')}`;
      this.positionsMap.set(prod.id, {
        showroomId: prod.id,
        productId: dbId,
        position: prod.position as [number, number, number],
        hotspotOffset: (prod.hotspotOffset || [0, 0.85, 0]) as [number, number, number],
        clearanceRadiusM: prod.clearanceRadiusM || 1.8,
        room: prod.room,
        displayZone: prod.displayZone,
        placementType: prod.placementType as any,
        modelUrl: prod.modelUrl
      });
    });
  }

  /**
   * Sets dynamic spatial positions fetched from Supabase showroom_products.
   */
  setPositions(positions: ShowroomSpatialPosition[]): void {
    positions.forEach((pos) => {
      this.positionsMap.set(pos.showroomId, pos);
      if (pos.productId) {
        this.positionsMap.set(pos.productId, pos);
      }
    });
  }

  /**
   * Retrieves spatial coordinates and clearance envelope for a 3D product ID or database UUID.
   */
  getPosition(id: string): ShowroomSpatialPosition | undefined {
    return this.positionsMap.get(id);
  }

  /**
   * Lists all unique spatial positioning targets for 3D navigation beacons.
   */
  getAllPositions(): ShowroomSpatialPosition[] {
    const seen = new Set<string>();
    const unique: ShowroomSpatialPosition[] = [];

    for (const pos of this.positionsMap.values()) {
      if (!seen.has(pos.showroomId)) {
        seen.add(pos.showroomId);
        unique.push(pos);
      }
    }

    return unique;
  }

  /**
   * Returns architectural rooms with navigation waypoints.
   */
  getRooms(): RoomDefinition[] {
    return ROOMS_DATA as unknown as RoomDefinition[];
  }

  /**
   * Returns collision bounding boxes for physical player obstruction.
   */
  getCollisionObstacles(): CollisionObstacle[] {
    return COLLISION_OBSTACLES as unknown as CollisionObstacle[];
  }
}

export const positioningService = new ShowroomPositioningService();
