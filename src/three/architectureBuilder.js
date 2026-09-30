import * as THREE from 'three';
import {
  createMarbleTexture,
  createTravertineTexture,
  createWoodTexture,
  createFlutedSlatsTexture,
  createStonePaverTexture,
  createGrassTexture
} from './textureGenerators';

export function buildArchitecture(scene) {
  const archGroup = new THREE.Group();
  archGroup.name = 'Architecture';

  // --- 1. TEXTURES & SHARED MATERIALS ---
  const marbleTex = createMarbleTexture();
  marbleTex.repeat.set(4, 3);

  const travertineTex = createTravertineTexture();
  travertineTex.repeat.set(2, 2);

  const woodTex = createWoodTexture(false);
  woodTex.repeat.set(3, 3);

  const flutedTex = createFlutedSlatsTexture();
  flutedTex.repeat.set(1, 4);

  const paverTex = createStonePaverTexture();
  paverTex.repeat.set(6, 4);

  const grassTex = createGrassTexture();
  grassTex.repeat.set(6, 6);

  // High-End Architectural PBR Materials
  const materials = {
    marbleFloor: new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.18,
      metalness: 0.05,
      name: 'MarbleFloor'
    }),
    woodFloor: new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.35,
      metalness: 0.02,
      name: 'WoodFloor'
    }),
    bathFloor: new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.3,
      metalness: 0.05,
      name: 'BathFloor'
    }),
    paverPatio: new THREE.MeshStandardMaterial({
      map: paverTex,
      roughness: 0.7,
      metalness: 0.05,
      name: 'PaverPatio'
    }),
    grass: new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.85,
      metalness: 0.0,
      name: 'LawnGrass'
    }),
    creamWall: new THREE.MeshStandardMaterial({
      color: 0xf5f2ec,
      roughness: 0.88,
      metalness: 0.02,
      name: 'CreamWall'
    }),
    stoneAccentWall: new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.5,
      metalness: 0.05,
      name: 'StoneAccentWall'
    }),
    slatWall: new THREE.MeshStandardMaterial({
      map: flutedTex,
      roughness: 0.45,
      metalness: 0.08,
      name: 'SlatWall'
    }),
    ceiling: new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.9,
      metalness: 0.0,
      side: THREE.DoubleSide,
      name: 'Ceiling'
    }),
    ceilingCoveGlow: new THREE.MeshBasicMaterial({
      color: 0xffedd0,
      name: 'CeilingCoveGlow'
    }),
    blackMullion: new THREE.MeshStandardMaterial({
      color: 0x1f2023,
      roughness: 0.3,
      metalness: 0.8,
      name: 'BlackMullion'
    }),
    brassMetal: new THREE.MeshStandardMaterial({
      color: 0xc4a060,
      roughness: 0.25,
      metalness: 0.9,
      name: 'BrushedBrass'
    }),
    timberDoor: new THREE.MeshStandardMaterial({
      map: flutedTex,
      roughness: 0.4,
      metalness: 0.05,
      name: 'TimberDoor'
    }),
    clearGlass: new THREE.MeshPhysicalMaterial({
      color: 0xddeef0,
      transmission: 0.92,
      opacity: 1.0,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      reflectivity: 0.6,
      name: 'ArchitecturalGlass'
    }),
    flutedGlass: new THREE.MeshPhysicalMaterial({
      color: 0xe8f2f4,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.35,
      ior: 1.5,
      name: 'FlutedShowerGlass'
    }),
    mirror: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.0,
      metalness: 0.98,
      name: 'Mirror'
    })
  };

  // Helper to create and position box meshes with shadow support
  const createBox = (w, h, d, mat, pos, name = '', castShadow = true, receiveShadow = true) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    if (name) mesh.name = name;
    return mesh;
  };

  // --- 2. FLOORS & FOUNDATION ---
  const floorsGroup = new THREE.Group();
  floorsGroup.name = 'Floors';

  // Main living / dining / hallway / kitchen marble slab floor (Y = 0)
  // Footprint: X: -10 to +10, Z: -8 to 6.5
  // Living, Foyer, Dining, Kitchen main marble:
  const mainFloor = createBox(20.0, 0.2, 14.5, materials.marbleFloor, [0, -0.1, -0.75], 'MainMarbleFloor');
  floorsGroup.add(mainFloor);

  // Bedroom / Showroom parquet overlay (X: -9.5 to -2.0, Z: -7.6 to -1.5)
  const bedParquet = createBox(7.5, 0.02, 6.1, materials.woodFloor, [-5.75, 0.01, -4.55], 'ShowroomParquet');
  floorsGroup.add(bedParquet);

  // Luxury Bathroom travertine floor overlay (X: -2.0 to 1.5, Z: -7.6 to -3.0)
  const bathStone = createBox(3.5, 0.02, 4.6, materials.bathFloor, [-0.25, 0.01, -5.3], 'BathStoneFloor');
  floorsGroup.add(bathStone);

  // Front Entrance Raised Porch & Steps (Z: 6.5 to 9.5, X: -3.5 to 3.5)
  // Step 1 (ground plinth)
  const porchPlinth = createBox(7.0, 0.15, 3.0, materials.paverPatio, [0, 0.075, 8.0], 'PorchPlinth');
  floorsGroup.add(porchPlinth);
  // Step 2 (upper porch landing)
  const porchUpper = createBox(5.0, 0.15, 1.8, materials.paverPatio, [0, 0.225, 7.4], 'PorchUpperLanding');
  floorsGroup.add(porchUpper);

  // Rear Garden Landscaped Patio & Lawn (Z: -8.0 to -14.0, X: -12.0 to 12.0)
  const gardenPatio = createBox(20.0, 0.2, 5.0, materials.paverPatio, [0, -0.1, -10.5], 'GardenPatio');
  floorsGroup.add(gardenPatio);
  const gardenLawn = createBox(24.0, 0.18, 5.0, materials.grass, [0, -0.11, -15.5], 'GardenLawn');
  floorsGroup.add(gardenLawn);

  // Left & Right perimeter landscaping grass strips
  const leftGreen = createBox(4.0, 0.18, 26.0, materials.grass, [-12.0, -0.11, -2.0], 'LeftLawn');
  const rightGreen = createBox(4.0, 0.18, 26.0, materials.grass, [12.0, -0.11, -2.0], 'RightLawn');
  floorsGroup.add(leftGreen);
  floorsGroup.add(rightGreen);

  archGroup.add(floorsGroup);

  // --- 3. EXTERIOR WALLS (H = 3.2m, Thickness = 0.3m) ---
  const wallsGroup = new THREE.Group();
  wallsGroup.name = 'Walls';

  const wallH = 3.2;
  const wallMidY = wallH / 2;

  // Front Wall (Z = 6.35):
  // Opening for double pivot entrance door: X from -1.0 to +1.0
  // Left side front wall (solid + floor-to-ceiling glass)
  // Living room front window: X from -9.5 to -2.0 -> Glass window wall
  // Solid pillar near door: X from -2.0 to -1.0
  wallsGroup.add(createBox(1.0, wallH, 0.3, materials.creamWall, [-1.5, wallMidY, 6.35], 'FrontWallPillarLeft'));
  // Right side front wall pillar: X from 1.0 to 2.0
  wallsGroup.add(createBox(1.0, wallH, 0.3, materials.creamWall, [1.5, wallMidY, 6.35], 'FrontWallPillarRight'));
  // Transom lintel beam over front door (H: 0.4m from Y: 2.8 to 3.2)
  wallsGroup.add(createBox(2.0, 0.4, 0.3, materials.creamWall, [0, 3.0, 6.35], 'FrontDoorLintel'));

  // Front corner returns & solid anchors
  wallsGroup.add(createBox(0.3, wallH, 0.3, materials.creamWall, [-9.85, wallMidY, 6.35], 'FrontCornerSW'));
  wallsGroup.add(createBox(0.3, wallH, 0.3, materials.creamWall, [9.85, wallMidY, 6.35], 'FrontCornerSE'));

  // Left Wall (West, X = -9.85):
  // Expansive glass curtain wall looking onto garden landscape. Solid corner piers:
  wallsGroup.add(createBox(0.3, wallH, 1.5, materials.creamWall, [-9.85, wallMidY, -7.25], 'WestWallSolidNW'));
  wallsGroup.add(createBox(0.3, wallH, 1.5, materials.creamWall, [-9.85, wallMidY, 5.6], 'WestWallSolidSW'));
  // Lintel beam along West glass wall
  wallsGroup.add(createBox(0.3, 0.3, 11.5, materials.creamWall, [-9.85, 3.05, -0.75], 'WestGlassLintel'));

  // Right Wall (East, X = 9.85):
  // Beige Travertine feature wall with architectural window slots
  wallsGroup.add(createBox(0.3, wallH, 5.0, materials.stoneAccentWall, [9.85, wallMidY, 3.8], 'EastStoneWallSouth'));
  wallsGroup.add(createBox(0.3, wallH, 3.5, materials.creamWall, [9.85, wallMidY, -6.25], 'EastWallNorth'));
  // Lintel over kitchen window
  wallsGroup.add(createBox(0.3, 0.5, 6.0, materials.creamWall, [9.85, 2.95, -1.5], 'EastKitchenWindowLintel'));
  wallsGroup.add(createBox(0.3, 0.9, 6.0, materials.creamWall, [9.85, 0.45, -1.5], 'EastKitchenWindowSill'));

  // Rear Wall (North, Z = -7.85):
  // Showroom rear glass sliding doors: X from -9.5 to -2.0
  // Bathroom solid rear wall: X from -2.0 to 1.5
  wallsGroup.add(createBox(3.5, wallH, 0.3, materials.creamWall, [-0.25, wallMidY, -7.85], 'RearBathroomWall'));
  // Kitchen rear sliding glass doors: X from 1.5 to 6.0 (glass to garden terrace)
  // Kitchen rear solid prep wall: X from 6.0 to 9.85
  wallsGroup.add(createBox(3.85, wallH, 0.3, materials.creamWall, [7.925, wallMidY, -7.85], 'RearKitchenPrepWall'));
  // Rear lintel beam across full glass sections
  wallsGroup.add(createBox(7.5, 0.4, 0.3, materials.creamWall, [-5.75, 3.0, -7.85], 'RearBedroomLintel'));
  wallsGroup.add(createBox(4.5, 0.4, 0.3, materials.creamWall, [3.75, 3.0, -7.85], 'RearKitchenLintel'));

  // --- 4. INTERIOR PARTITION WALLS (H = 3.2m, Thickness = 0.15m) ---
  // A. Bathroom Enclosure (X: -2.0 to 1.5, Z: -7.7 to -3.0):
  // West bathroom wall (separating Showroom/Bedroom from Bathroom):
  wallsGroup.add(createBox(0.15, wallH, 4.7, materials.creamWall, [-2.0, wallMidY, -5.35], 'BathWestWall'));
  // East bathroom wall (separating Bathroom from Central Corridor / Kitchen):
  wallsGroup.add(createBox(0.15, wallH, 4.7, materials.creamWall, [1.5, wallMidY, -5.35], 'BathEastWall'));
  // South bathroom front wall (facing central corridor, with 1.0m door opening):
  // Left section: X from -2.0 to -0.6 (w: 1.4m)
  wallsGroup.add(createBox(1.4, wallH, 0.15, materials.creamWall, [-1.3, wallMidY, -3.0], 'BathSouthWallLeft'));
  // Right section: X from 0.6 to 1.5 (w: 0.9m)
  wallsGroup.add(createBox(0.9, wallH, 0.15, materials.creamWall, [1.05, wallMidY, -3.0], 'BathSouthWallRight'));
  // Lintel over bathroom door (H: 0.8m, Y: 2.8 to 3.2)
  wallsGroup.add(createBox(1.2, 0.8, 0.15, materials.creamWall, [0.0, 2.8, -3.0], 'BathDoorLintel'));

  // B. Living Room & Showroom Suite Divider Wall (Z = -1.5):
  // Left segment: X from -9.85 to -4.5 (w: 5.35m) with fluted wood slat accent on living room side
  wallsGroup.add(createBox(5.35, wallH, 0.15, materials.creamWall, [-7.175, wallMidY, -1.5], 'LivingShowroomDivider'));
  // Fluted oak media wall backdrop facing living room
  wallsGroup.add(createBox(4.8, 2.8, 0.05, materials.slatWall, [-7.2, 1.4, -1.4], 'FlutedMediaFeatureWall'));
  // Right segment: X from -3.0 to -2.0 (w: 1.0m)
  wallsGroup.add(createBox(1.0, wallH, 0.15, materials.creamWall, [-2.5, wallMidY, -1.5], 'LivingShowroomRightPillar'));
  // Wide open passage between Living Room and Showroom: X from -4.5 to -3.0 (clear width 1.5m)
  wallsGroup.add(createBox(1.5, 0.6, 0.15, materials.creamWall, [-3.75, 2.9, -1.5], 'ShowroomPassageLintel'));

  // C. Master Showroom Headboard Acoustic Feature Wall:
  wallsGroup.add(createBox(3.8, 2.8, 0.06, materials.slatWall, [-6.0, 1.4, -7.68], 'BedAcousticFeatureWall'));

  // D. Dining Area Travertine Feature Wall Element:
  wallsGroup.add(createBox(0.12, 2.8, 3.2, materials.stoneAccentWall, [9.7, 1.4, 3.5], 'DiningFeatureStone'));

  archGroup.add(wallsGroup);

  // --- 5. WINDOWS, MULLIONS & ARCHITECTURAL GLAZING ---
  const glassGroup = new THREE.Group();
  glassGroup.name = 'Glazing';

  // Helper to build a framed floor-to-ceiling glass panel
  const createFramedWindow = (w, h, pos, rotY = 0, numDivisions = 3) => {
    const group = new THREE.Group();
    // Glass pane
    const glass = createBox(w, h, 0.02, materials.clearGlass, [0, 0, 0], 'GlassPane', false, false);
    group.add(glass);

    // Frame top & bottom
    group.add(createBox(w, 0.06, 0.08, materials.blackMullion, [0, h / 2 - 0.03, 0]));
    group.add(createBox(w, 0.06, 0.08, materials.blackMullion, [0, -h / 2 + 0.03, 0]));
    // Frame left & right
    group.add(createBox(0.06, h, 0.08, materials.blackMullion, [-w / 2 + 0.03, 0, 0]));
    group.add(createBox(0.06, h, 0.08, materials.blackMullion, [w / 2 - 0.03, 0, 0]));

    // Vertical Mullions
    if (numDivisions > 1) {
      const step = w / numDivisions;
      for (let i = 1; i < numDivisions; i++) {
        group.add(createBox(0.04, h, 0.08, materials.blackMullion, [-w / 2 + i * step, 0, 0]));
      }
    }

    group.position.set(pos[0], pos[1], pos[2]);
    group.rotation.y = rotY;
    return group;
  };

  // Front Living Room Window (X: -9.5 to -2.0, w = 7.5m, h = 3.0m, Z = 6.35)
  glassGroup.add(createFramedWindow(7.5, 3.0, [-5.75, 1.5, 6.35], 0, 4));

  // Front Dining Room Window (X: 2.0 to 9.5, w = 7.5m, h = 3.0m, Z = 6.35)
  glassGroup.add(createFramedWindow(7.5, 3.0, [5.75, 1.5, 6.35], 0, 4));

  // West Panoramic Glass Wall (Living room to garden, Z: -6.5 to 5.0, w = 11.5m, h = 3.0m, X = -9.85)
  glassGroup.add(createFramedWindow(11.5, 3.0, [-9.85, 1.5, -0.75], Math.PI / 2, 6));

  // Rear Showroom Garden Glass Sliding Doors (X: -9.5 to -2.0, w = 7.5m, h = 2.8m, Z = -7.85)
  glassGroup.add(createFramedWindow(7.5, 2.8, [-5.75, 1.4, -7.85], 0, 4));

  // Rear Kitchen Terrace Sliding Glass Doors (X: 1.5 to 6.0, w = 4.5m, h = 2.8m, Z = -7.85)
  glassGroup.add(createFramedWindow(4.5, 2.8, [3.75, 1.4, -7.85], 0, 3));

  // East Kitchen Window (above counter, X = 9.85, Z: -4.5 to 1.5, w = 6.0m, h = 1.6m)
  glassGroup.add(createFramedWindow(6.0, 1.6, [9.85, 1.7, -1.5], Math.PI / 2, 3));

  archGroup.add(glassGroup);

  // --- 6. ARCHITECTURAL DOORS & DETAILS ---
  const doorsGroup = new THREE.Group();
  doorsGroup.name = 'Doors';

  // Monumental Architectural Double Pivot Front Door (Pos: [0, 1.4, 6.35], W: 1.8m, H: 2.8m)
  const frontDoorGroup = new THREE.Group();
  frontDoorGroup.name = 'FrontPivotDoor';
  // Door leaf
  const doorLeaf = createBox(1.7, 2.76, 0.08, materials.timberDoor, [0, 1.38, 0], 'DoorLeaf');
  frontDoorGroup.add(doorLeaf);
  // Slim door frame
  frontDoorGroup.add(createBox(0.05, 2.8, 0.12, materials.blackMullion, [-0.88, 1.4, 0]));
  frontDoorGroup.add(createBox(0.05, 2.8, 0.12, materials.blackMullion, [0.88, 1.4, 0]));
  frontDoorGroup.add(createBox(1.8, 0.05, 0.12, materials.blackMullion, [0, 2.8, 0]));
  // Massive 1.8m Brushed Brass Vertical Pull Handle
  const handleBrass = createBox(0.03, 1.8, 0.05, materials.brassMetal, [0.65, 1.4, 0.07], 'FrontDoorPullOuter');
  const handleBrassInner = createBox(0.03, 1.8, 0.05, materials.brassMetal, [0.65, 1.4, -0.07], 'FrontDoorPullInner');
  frontDoorGroup.add(handleBrass);
  frontDoorGroup.add(handleBrassInner);
  frontDoorGroup.position.set(0, 0, 6.35);
  doorsGroup.add(frontDoorGroup);

  // Bathroom Flush Interior Door (Pos: [0.0, 1.2, -3.0], W: 1.0m, H: 2.4m)
  const bathDoorGroup = new THREE.Group();
  bathDoorGroup.name = 'BathroomDoor';
  const bathDoorLeaf = createBox(0.96, 2.38, 0.05, materials.creamWall, [0, 1.19, 0], 'BathDoorLeaf');
  bathDoorGroup.add(bathDoorLeaf);
  // Minimal black lever handle
  const bathLever = createBox(0.14, 0.03, 0.05, materials.blackMullion, [-0.38, 1.05, 0.04]);
  bathDoorGroup.add(bathLever);
  bathDoorGroup.position.set(0.0, 0, -3.0);
  doorsGroup.add(bathDoorGroup);

  archGroup.add(doorsGroup);

  // --- 7. CEILING & INDIRECT ARCHITECTURAL LIGHT COVES ---
  const ceilingGroup = new THREE.Group();
  ceilingGroup.name = 'Ceilings';

  // Main Ceiling Slab (Y = 3.2, covers the 20m x 14.5m interior)
  const mainCeiling = createBox(20.0, 0.15, 14.5, materials.ceiling, [0, 3.275, -0.75], 'MainCeilingSlab');
  ceilingGroup.add(mainCeiling);

  // Dropped Coffered Soffits with warm LED Cove Glow in Living Room & Dining Room
  // Living Room Coffered Drop (creates architectural indirect lighting recess):
  const livingSoffit = createBox(7.0, 0.12, 6.0, materials.ceiling, [-5.75, 3.14, 2.5], 'LivingRoomSoffit');
  ceilingGroup.add(livingSoffit);
  // Cove light glow ribbon around soffit:
  const livingCoveRibbon = createBox(7.2, 0.03, 6.2, materials.ceilingCoveGlow, [-5.75, 3.19, 2.5], 'LivingCoveLight', false, false);
  ceilingGroup.add(livingCoveRibbon);

  // Dining Room Coffered Drop:
  const diningSoffit = createBox(6.5, 0.12, 5.0, materials.ceiling, [5.75, 3.14, 3.8], 'DiningRoomSoffit');
  ceilingGroup.add(diningSoffit);
  const diningCoveRibbon = createBox(6.7, 0.03, 5.2, materials.ceilingCoveGlow, [5.75, 3.19, 3.8], 'DiningCoveLight', false, false);
  ceilingGroup.add(diningCoveRibbon);

  // Showroom / Bedroom Coffered Drop:
  const bedSoffit = createBox(6.5, 0.12, 5.5, materials.ceiling, [-5.75, 3.14, -4.5], 'BedroomSoffit');
  ceilingGroup.add(bedSoffit);
  const bedCoveRibbon = createBox(6.7, 0.03, 5.7, materials.ceilingCoveGlow, [-5.75, 3.19, -4.5], 'BedCoveLight', false, false);
  ceilingGroup.add(bedCoveRibbon);

  archGroup.add(ceilingGroup);

  // --- 8. REAR GARDEN ARCHITECTURAL PERIMETER & LANDSCAPING ---
  const gardenGroup = new THREE.Group();
  gardenGroup.name = 'GardenLandscape';

  // Architectural Privacy Boundary Wall (slatted timber / warm stone at Z = -16.0)
  const rearFence = createBox(24.0, 2.8, 0.2, materials.stoneAccentWall, [0, 1.4, -16.0], 'GardenRearBoundary');
  const leftFence = createBox(0.2, 2.8, 8.5, materials.stoneAccentWall, [-12.0, 1.4, -12.0], 'GardenWestBoundary');
  const rightFence = createBox(0.2, 2.8, 8.5, materials.stoneAccentWall, [12.0, 1.4, -12.0], 'GardenEastBoundary');
  gardenGroup.add(rearFence);
  gardenGroup.add(leftFence);
  gardenGroup.add(rightFence);

  // Planter boxes & Bamboo clusters along garden rear
  const planterMat = new THREE.MeshStandardMaterial({ color: 0x2d3032, roughness: 0.6 });
  const bambooStemsMat = new THREE.MeshStandardMaterial({ color: 0x486938, roughness: 0.5 });
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x3d5c2e, roughness: 0.65 });

  const rearPlanter = createBox(18.0, 0.5, 0.8, planterMat, [0, 0.25, -15.4], 'RearGardenPlanter');
  gardenGroup.add(rearPlanter);

  // Procedural Bamboo culms & leaves in planter
  for (let b = -8.0; b <= 8.0; b += 0.8) {
    const bambooCulm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 3.2, 8),
      bambooStemsMat
    );
    bambooCulm.position.set(b + (Math.random() - 0.5) * 0.2, 1.6, -15.4 + (Math.random() - 0.5) * 0.2);
    bambooCulm.castShadow = true;
    gardenGroup.add(bambooCulm);

    // Foliage puffs
    const leafPuff = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.35 + Math.random() * 0.2, 1),
      foliageMat
    );
    leafPuff.position.set(bambooCulm.position.x, 2.6 + Math.random() * 0.6, bambooCulm.position.z);
    leafPuff.scale.set(1.2, 0.8, 1.0);
    leafPuff.castShadow = true;
    gardenGroup.add(leafPuff);
  }

  // Front Porch Architectural Planters flanking entrance door
  const frontPlanterLeft = createBox(1.6, 0.6, 0.8, planterMat, [-2.2, 0.3, 7.2], 'FrontPlanterLeft');
  const frontPlanterRight = createBox(1.6, 0.6, 0.8, planterMat, [2.2, 0.3, 7.2], 'FrontPlanterRight');
  gardenGroup.add(frontPlanterLeft);
  gardenGroup.add(frontPlanterRight);

  // Lush plants in front planters
  const plantPositions = [
    [-2.6, 0.8, 7.2], [-2.2, 0.95, 7.2], [-1.8, 0.85, 7.2],
    [1.8, 0.85, 7.2], [2.2, 0.95, 7.2], [2.6, 0.8, 7.2]
  ];
  plantPositions.forEach((pos, idx) => {
    const bush = new THREE.Mesh(
      new THREE.SphereGeometry(0.32 + (idx % 2) * 0.08, 8, 8),
      foliageMat
    );
    bush.position.set(pos[0], pos[1], pos[2]);
    bush.scale.set(1.0, 1.3, 1.0);
    bush.castShadow = true;
    gardenGroup.add(bush);
  });

  archGroup.add(gardenGroup);

  // Return the complete architecture hierarchy and references
  return {
    group: archGroup,
    ceilingGroup,
    materials
  };
}
