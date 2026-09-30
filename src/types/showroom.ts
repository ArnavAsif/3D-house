// Showroom 3D Spatial Layout Types

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

export interface ShowroomSpatialPosition {
  showroomId: string; // e.g. 'product-01'
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  hotspotOffset: [number, number, number];
  clearanceRadiusM: number;
  room: string;
  displayZone: string;
  placementType: ShowroomPlacementType;
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
