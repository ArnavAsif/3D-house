// Showroom 3D Spatial Layout & Database Types (Supabase PostgreSQL)

import { Product } from './product';

export type ShowroomPlacementType =
  | 'Furniture Floor Zone'
  | 'On Display Table'
  | 'On Display Tables'
  | 'On Wall Shelves'
  | 'On Pedestals'
  | 'Inside Illuminated Cabinets'
  | 'On Kitchen Counters'
  | 'On Side Tables'
  | 'Dedicated Architectural Display Areas'
  | 'Architectural Lighting Zone';

/**
 * Showroom product row as stored in Supabase public.showroom_products table.
 */
export interface ShowroomProductRecord {
  id: string;
  productId: string;
  modelUrl?: string | null;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  interactionRadius: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Connected 3D Showroom Item with complete Supabase product details:
 * Supabase -> showroom_products -> product_id -> products -> product_variants & product_images & inventory
 */
export interface ShowroomProductWithDetails {
  id: string; // showroom_products UUID
  productId: string; // products UUID
  showroomId: string; // e.g. 'product-01'
  modelUrl?: string | null;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  interactionRadius: number;
  isActive: boolean;
  product: Product;
}

/**
 * Spatial positioning used by Three.js runtime.
 */
export interface ShowroomSpatialPosition {
  showroomId: string; // e.g. 'product-01'
  productId?: string; // Supabase database product UUID
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  hotspotOffset: [number, number, number];
  clearanceRadiusM: number;
  room: string;
  displayZone: string;
  placementType: ShowroomPlacementType;
  modelUrl?: string | null;
}

export interface RoomDefinition {
  id: string;
  name: string;
  subtitle?: string;
  category?: string;
  areaSqM: number;
  ceilingHeightM?: number;
  flooringType?: string;
  cameraPos?: number[];
  cameraTarget?: number[];
  dollhousePos?: number[];
  description?: string;
  features?: string[];
  highlightProducts?: string[];
  cameraWaypoint?: {
    position: [number, number, number];
    lookAt: [number, number, number];
    description: string;
  };
}

export interface CollisionObstacle {
  id?: string;
  name?: string;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}
