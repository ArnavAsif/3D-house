import { ShowroomSpatialPosition, RoomDefinition, CollisionObstacle } from '@/types/showroom';
import { ROOMS_DATA, COLLISION_OBSTACLES } from '@/data/roomData';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * Showroom Positioning Service
 * Manages 3D spatial coordinates, circulation waypoints, and obstacle footprints.
 * Completely decoupled from e-commerce metadata, pricing, and orders.
 */
export class ShowroomPositioningService {
  private positionsMap: Map<string, ShowroomSpatialPosition> = new Map();

  constructor() {
    SHOWROOM_PRODUCTS.forEach((prod) => {
      this.positionsMap.set(prod.id, {
        showroomId: prod.id,
        position: prod.position as [number, number, number],
        hotspotOffset: (prod.hotspotOffset || [0, 1.0, 0]) as [number, number, number],
        clearanceRadiusM: prod.clearanceRadiusM || 1.8,
        room: prod.room,
        displayZone: prod.displayZone,
        placementType: prod.placementType as any
      });
    });
  }

  /**
   * Retrieves spatial coordinates and clearance envelope for a 3D product ID.
   */
  getPosition(showroomId: string): ShowroomSpatialPosition | undefined {
    return this.positionsMap.get(showroomId);
  }

  /**
   * Lists all spatial positioning targets for 3D hotspot beacon placement.
   */
  getAllPositions(): ShowroomSpatialPosition[] {
    return Array.from(this.positionsMap.values());
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
