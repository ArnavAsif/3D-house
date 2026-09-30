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
    highlightProducts: ['architectural-front-door']
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
    highlightProducts: []
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
    highlightProducts: ['modular-sectional-sofa', 'modern-lounge-chair', 'travertine-coffee-table', 'media-slat-credenza', 'designer-floor-lamp']
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
    highlightProducts: ['dining-table-set', 'dining-armchair', 'linear-pendant-light']
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
    highlightProducts: ['calacatta-kitchen-island', 'designer-barstool']
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
    highlightProducts: ['platform-bed-suite', 'accent-bedroom-armchair']
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
    highlightProducts: ['floating-travertine-vanity']
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

// Walking boundaries and collision hulls for First Person Walk
// Axis-aligned bounding boxes (minX, maxX, minZ, maxZ) that the player collides with
export const COLLISION_OBSTACLES = [
  // Outer perimeter boundary walls:
  { id: 'wall-north-solid-left', minX: -10.0, maxX: -2.0, minZ: -8.0, maxZ: -7.6 },
  { id: 'wall-north-solid-right', minX: 1.5, maxX: 6.0, minZ: -8.0, maxZ: -7.6 },
  { id: 'wall-south-left', minX: -10.0, maxX: -0.9, minZ: 6.18, maxZ: 6.55 },
  { id: 'wall-south-right', minX: 0.9, maxX: 10.0, minZ: 6.18, maxZ: 6.55 },
  { id: 'wall-west', minX: -10.0, maxX: -9.6, minZ: -8.0, maxZ: 6.5 },
  { id: 'wall-east', minX: 9.6, maxX: 10.0, minZ: -8.0, maxZ: 6.5 },

  // Architectural Columns:
  { id: 'column-central', minX: -0.22, maxX: 0.22, minZ: 1.28, maxZ: 1.72 },
  { id: 'column-portico-left', minX: -2.65, maxX: -2.15, minZ: 7.55, maxZ: 8.05 },
  { id: 'column-portico-right', minX: 2.15, maxX: 2.65, minZ: 7.55, maxZ: 8.05 },

  // Interior partition walls:
  // Bathroom walls (box: X: -2.0 to 1.5, Z: -7.7 to -3.0):
  { id: 'wall-bath-west', minX: -2.0, maxX: -1.8, minZ: -7.7, maxZ: -3.0 },
  { id: 'wall-bath-east', minX: 1.35, maxX: 1.55, minZ: -7.7, maxZ: -3.0 },
  { id: 'wall-bath-south-left', minX: -2.0, maxX: -0.5, minZ: -3.15, maxZ: -2.85 },
  { id: 'wall-bath-south-right', minX: 0.5, maxX: 1.55, minZ: -3.15, maxZ: -2.85 }, // door opening: -0.5 to 0.5

  // Living Room / Bedroom Divider wall (partial with opening):
  { id: 'wall-bed-living-part1', minX: -9.85, maxX: -4.5, minZ: -1.65, maxZ: -1.35 },
  { id: 'wall-bed-living-part2', minX: -3.0, maxX: -2.0, minZ: -1.65, maxZ: -1.35 }, // passage opening: -4.5 to -3.0

  // Kitchen rear cabinetry block:
  { id: 'cabinetry-kitchen-back', minX: 6.0, maxX: 9.85, minZ: -7.85, maxZ: -7.0 },

  // Kitchen Island:
  { id: 'island-block', minX: 4.2, maxX: 7.4, minZ: -2.4, maxZ: -1.2 },

  // Dining Table block:
  { id: 'dining-block', minX: 4.4, maxX: 7.2, minZ: 2.8, maxZ: 5.2 },

  // Living Room Sofa block:
  { id: 'sofa-block-main', minX: -8.2, maxX: -4.5, minZ: 2.2, maxZ: 4.2 },
  { id: 'sofa-block-side', minX: -8.2, maxX: -6.8, minZ: 0.8, maxZ: 2.2 },

  // Bed block:
  { id: 'bed-block', minX: -7.8, maxX: -4.2, minZ: -6.8, maxZ: -3.8 }
];

// Overall house walkable bounding limits (including garden patio and front porch)
export const WALK_LIMITS = {
  minX: -9.2,
  maxX: 9.2,
  minZ: -10.5,
  maxZ: 8.8
};

