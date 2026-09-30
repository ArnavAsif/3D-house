// Architectural Room Definitions & Circulation Data for Villa Lumina

export const ROOMS_DATA = [
  {
    id: 'entrance',
    name: 'Main Entrance & Porch',
    subtitle: 'Exterior Entryway & Architectural Portico',
    areaSqM: 14.5,
    cameraPos: [0.0, 1.65, 8.2],
    cameraTarget: [0.0, 1.4, 5.0],
    dollhousePos: [0.0, 12.0, 16.0],
    description: 'Raised exterior entrance porch with stone steps, lush architectural planters, dual warm wall sconces, and a monumental 2.8m oversized timber pivot door.',
    features: ['Architectural Pivot Timber Door', 'Natural Stone Stepping Plinth', 'Monstera & Ficus Planters', '2700K Warm Wall Sconces'],
    highlightProducts: ['product-18']
  },
  {
    id: 'foyer',
    name: 'Wide Entrance Hallway',
    subtitle: 'Grand Central Foyer & Reception',
    areaSqM: 18.2,
    cameraPos: [0.0, 1.65, 4.2],
    cameraTarget: [0.0, 1.4, 0.0],
    dollhousePos: [0.0, 14.0, 12.0],
    description: 'Spacious 3.5m wide reception spine with honed Calacatta marble slab flooring, indirect ceiling cove lighting, and seamless unobstructed sightlines to all living spaces.',
    features: ['Honed Calacatta Marble Slabs', 'Recessed Warm Ceiling Light Coves', '3.5m Wide Unobstructed Flow', 'Central Distribution Spine'],
    highlightProducts: ['product-07', 'product-08']
  },
  {
    id: 'living',
    name: 'Open-Plan Living Room',
    subtitle: 'Luxury Lounge & Entertainment Zone',
    areaSqM: 48.0,
    cameraPos: [-5.0, 1.65, 4.2],
    cameraTarget: [-5.8, 1.2, 1.5],
    dollhousePos: [-8.0, 12.0, 8.0],
    description: 'Expansive sunken-feel living room flanked by floor-to-ceiling panoramic glass windows. Featuring a modular cream sectional sofa, dual travertine tables, acoustic wood slat media wall, and designer reading nook.',
    features: ['Floor-to-Ceiling Panoramic Windows', 'Modular Cream Boucle Sectional', 'Acoustic Fluted Wood Media Wall', 'Cantilever Arc Floor Lamp'],
    highlightProducts: ['product-01', 'product-02', 'product-03', 'product-04', 'product-05', 'product-06']
  },
  {
    id: 'dining',
    name: 'Dining Area',
    subtitle: 'Formal Entertaining & Architectural Table Setting',
    areaSqM: 28.5,
    cameraPos: [4.8, 1.65, 4.8],
    cameraTarget: [5.8, 1.2, 3.5],
    dollhousePos: [8.0, 12.0, 8.0],
    description: 'Refined open-plan dining space with a solid American walnut 8-seater table, tailored upholstered armchairs, suspended architectural linear pendant, and full-height exterior window wall.',
    features: ['Solid Walnut 8-Seater Table', 'Architectural Dual-Emission Linear Luminaire', 'Travertine Feature Wall', 'Direct Connection to Kitchen'],
    highlightProducts: ['product-09', 'product-10', 'product-11']
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    subtitle: 'Gourmet Chef Kitchen & Waterfall Island',
    areaSqM: 32.0,
    cameraPos: [4.5, 1.65, -1.0],
    cameraTarget: [6.0, 1.2, -3.5],
    dollhousePos: [8.0, 12.0, -4.0],
    description: 'State-of-the-art chef kitchen anchored by a monolithic 3.2m Calacatta marble waterfall island with 4 leather barstools, seamless matte charcoal cabinetry, integrated appliances, and rear sliding glass doors.',
    features: ['Monolithic Calacatta Waterfall Island', 'Seamless Integrated Cabinetry & Fridge', 'Under-Counter Warm LED Task Strips', 'Rear Patio Glass Access'],
    highlightProducts: ['product-12', 'product-13', 'product-14']
  },
  {
    id: 'showroom',
    name: 'Secondary Showroom / Master Suite',
    subtitle: 'Multi-functional Product Gallery & Bedroom',
    areaSqM: 36.0,
    cameraPos: [-4.2, 1.65, -3.5],
    cameraTarget: [-6.5, 1.2, -5.5],
    dollhousePos: [-8.0, 12.0, -6.0],
    description: 'Versatile luxury master suite and dedicated interactive product showroom featuring a floating oak platform bed, acoustic slat headboard with cove lighting, organic boucle armchair, and private garden patio access.',
    features: ['Floating Oak Platform Bed', 'Acoustic Wood Slat Feature Wall', 'Reading Lounge with Boucle Armchair', 'Sliding Doors to Private Garden'],
    highlightProducts: ['product-15', 'product-16']
  },
  {
    id: 'bathroom',
    name: 'Luxury Bathroom',
    subtitle: 'Spa-Inspired Wet Room & Travertine Vanity',
    areaSqM: 15.0,
    cameraPos: [-0.2, 1.65, -4.0],
    cameraTarget: [-0.2, 1.3, -6.8],
    dollhousePos: [0.0, 12.0, -8.0],
    description: 'Spa-like sanctuary with large-format limestone tiles, a floating carved travertine double vanity, frameless fluted glass walk-in rain shower, backlit ambient pill mirror, and matte black fixtures.',
    features: ['Floating Carved Travertine Vanity', 'Backlit Illuminated Ambient Mirror', 'Walk-in Fluted Glass Rain Shower', 'Matte Black Minimalist Fixtures'],
    highlightProducts: ['product-17']
  },
  {
    id: 'garden',
    name: 'Rear Garden & Terrace',
    subtitle: 'Landscaped Outdoor Oasis & Alfresco Deck',
    areaSqM: 42.0,
    cameraPos: [0.0, 1.65, -7.8],
    cameraTarget: [0.0, 1.4, -10.5],
    dollhousePos: [0.0, 14.0, -12.0],
    description: 'Lush outdoor sanctuary directly connected via expansive sliding glass pocket doors. Features natural stone patio pavers, architectural privacy fencing, bamboo plantings, and soft landscape uplighting.',
    features: ['Seamless Indoor-Outdoor Flow', 'Architectural Perimeter Privacy Screen', 'Landscape Warm Uplighting', 'Lush Bamboo & Tropical Greenery'],
    highlightProducts: []
  }
];

// Architectural Specifications
export const ARCHITECTURAL_SPECS = {
  totalBuiltAreaSqM: 194.2,
  ceilingHeightM: 3.20,
  exteriorWallThicknessM: 0.30,
  interiorWallThicknessM: 0.15,
  windowGlassThicknessM: 0.08,
  doorClearanceWidthM: 1.00,
  mainEntranceDoorM: { width: 1.60, height: 2.80 },
  minimumHallwayClearanceM: 2.20,
  minimumCorridorWalkingClearanceM: 1.50,
  naturalLightingPercentage: 42, // percent of facade area with floor-to-ceiling glass
  lightingColorTemperatureK: 2700, // warm residential architectural lighting
  materialsPalette: [
    { name: 'Calacatta Gold Marble', hex: '#F5F2EB', type: 'Stone' },
    { name: 'Roman Beige Travertine', hex: '#D7CCA8', type: 'Stone' },
    { name: 'Natural White Oak', hex: '#C6A97F', type: 'Wood' },
    { name: 'Warm Cream Plaster (RAL 9010)', hex: '#F6F3EE', type: 'Wall Finish' },
    { name: 'Matte Charcoal Metal', hex: '#262729', type: 'Fenestration' },
    { name: 'Low-Iron Clear Float Glass', hex: '#EAF4F6', type: 'Glazing' }
  ]
};

// Walking boundaries and collision hulls for Villa Lumina
// Exterior front entrance path leads through the interactive front door into the grand open-plan Living Room.
// Only the Master Bedroom Suite and Spa Bathroom remain permanently closed with COMING SOON plaques.
export const COLLISION_OBSTACLES = [
  // 1. South Facade Exterior Wall (Z = 6.18 to 6.55)
  // Left wing (Living room facade): X from -10.0 to -0.9
  { id: 'wall-south-left', minX: -10.0, maxX: -0.9, minZ: 6.18, maxZ: 6.55 },
  // Right wing (Dining facade): X from 0.9 to 10.0
  { id: 'wall-south-right', minX: 0.9, maxX: 10.0, minZ: 6.18, maxZ: 6.55 },
  // Front Entrance Pivot Door: Active collision when closed, disabled when opened
  { id: 'front-door-entrance', minX: -0.9, maxX: 0.9, minZ: 6.15, maxZ: 6.55 },

  // 2. Exterior Front Pathway & Porch Boundaries (keeps player on front pathway outside)
  { id: 'exterior-boundary-west', minX: -5.0, maxX: -2.8, minZ: 6.4, maxZ: 13.5 },
  { id: 'exterior-boundary-east', minX: 2.8, maxX: 5.0, minZ: 6.4, maxZ: 13.5 },
  { id: 'exterior-boundary-south', minX: -3.5, maxX: 3.5, minZ: 12.5, maxZ: 14.0 },

  // 3. West Panoramic Facade Wall & Windows (X = -10.0 to -9.6)
  { id: 'wall-villa-west', minX: -10.0, maxX: -9.6, minZ: -7.8, maxZ: 6.5 },

  // 4. East Facade Exterior Wall (X = 9.6 to 10.0)
  { id: 'wall-villa-east', minX: 9.6, maxX: 10.0, minZ: -7.8, maxZ: 6.5 },

  // 5. North Facade Exterior Wall (Z = -8.0 to -7.6)
  { id: 'wall-villa-north', minX: -10.0, maxX: 10.0, minZ: -8.0, maxZ: -7.6 },

  // 6. Inaccessible Master Bedroom Suite (Permanently Closed with COMING SOON plaque)
  // North living divider wall: X from -10.0 to -4.5
  { id: 'wall-bedroom-divider-left', minX: -10.0, maxX: -4.5, minZ: -1.65, maxZ: -1.35 },
  // Closed Bedroom Door: X from -4.5 to -3.0
  { id: 'door-bedroom-coming-soon', minX: -4.5, maxX: -3.0, minZ: -1.65, maxZ: -1.35 },
  // Bedroom partition return to bathroom: X from -3.0 to -2.0
  { id: 'wall-bedroom-divider-right', minX: -3.0, maxX: -2.0, minZ: -1.65, maxZ: -1.35 },

  // 7. Inaccessible Spa Bathroom (Permanently Closed with COMING SOON plaque)
  // West partition: X = -2.0, Z from -7.6 to -3.0
  { id: 'wall-bathroom-west', minX: -2.15, maxX: -1.85, minZ: -7.6, maxZ: -3.0 },
  // South front wall left segment: X from -2.0 to -0.5, Z = -3.0
  { id: 'wall-bathroom-south-left', minX: -2.0, maxX: -0.5, minZ: -3.15, maxZ: -2.85 },
  // Closed Bathroom Door: X from -0.5 to 0.5, Z = -3.0
  { id: 'door-bathroom-coming-soon', minX: -0.5, maxX: 0.5, minZ: -3.15, maxZ: -2.85 },
  // South front wall right segment: X from 0.5 to 1.65, Z = -3.0
  { id: 'wall-bathroom-south-right', minX: 0.5, maxX: 1.65, minZ: -3.15, maxZ: -2.85 },
  // East partition: X = 1.5, Z from -7.6 to -3.0
  { id: 'wall-bathroom-east', minX: 1.35, maxX: 1.65, minZ: -7.6, maxZ: -3.0 },

  // 8. Living Room Curated Large Furniture Footprints (Generous Walking Clearance)
  // Sectional Boucle Sofa Main Body
  { id: 'sofa-block-main', minX: -7.6, maxX: -4.8, minZ: 3.0, maxZ: 4.2 },
  // Sectional Chaise Return
  { id: 'sofa-block-chaise', minX: -7.8, maxX: -6.4, minZ: 1.6, maxZ: 3.0 },
  // Sculptural Low Travertine Coffee Table
  { id: 'coffee-table-block', minX: -5.7, maxX: -4.5, minZ: 1.8, maxZ: 2.6 },
  // Acoustic Fluted Media Console base against North wall
  { id: 'media-console-block', minX: -7.8, maxX: -4.4, minZ: -1.5, maxZ: -1.0 }
];

// Master walkable area limits
export const WALK_LIMITS = {
  minX: -9.5,
  maxX: 9.5,
  minZ: -7.5,
  maxZ: 13.0
};

