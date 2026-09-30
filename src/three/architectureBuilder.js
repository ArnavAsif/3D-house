import * as THREE from 'three';
import {
  createMarbleTexture,
  createTravertineTexture,
  createWoodTexture,
  createFlutedSlatsTexture,
  createStonePaverTexture,
  createGrassTexture,
  createPlasterNormalTexture,
  createDoorPlaqueTexture,
  createCurtainTexture
} from './textureGenerators';

export function buildArchitecture(scene) {
  const archGroup = new THREE.Group();
  archGroup.name = 'Architecture';

  // =========================================================================
  // 1. TEXTURES & PBR ARCHITECTURAL MATERIALS
  // =========================================================================
  const marbleTex = createMarbleTexture();
  marbleTex.repeat.set(4, 3);

  const travertineTex = createTravertineTexture();
  travertineTex.repeat.set(2, 2);

  const woodTex = createWoodTexture(false);
  woodTex.repeat.set(3, 3);

  const darkWoodTex = createWoodTexture(true);
  darkWoodTex.repeat.set(2, 2);

  const flutedTex = createFlutedSlatsTexture();
  flutedTex.repeat.set(1, 4);

  const paverTex = createStonePaverTexture();
  paverTex.repeat.set(6, 4);

  const grassTex = createGrassTexture();
  grassTex.repeat.set(6, 6);

  const plasterNormal = createPlasterNormalTexture();
  plasterNormal.repeat.set(8, 8);

  const materials = {
    marbleFloor: new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.16,
      metalness: 0.04,
      name: 'MarbleFloor'
    }),
    woodFloor: new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.32,
      metalness: 0.02,
      name: 'WoodParquetFloor'
    }),
    bathFloor: new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.28,
      metalness: 0.04,
      name: 'BathStoneFloor'
    }),
    showerDrain: new THREE.MeshStandardMaterial({
      color: 0x1f2022,
      roughness: 0.3,
      metalness: 0.9,
      name: 'ShowerLinearDrain'
    }),
    brassThreshold: new THREE.MeshStandardMaterial({
      color: 0xc4a060,
      roughness: 0.22,
      metalness: 0.92,
      name: 'BrassThresholdStrip'
    }),
    sliderTrack: new THREE.MeshStandardMaterial({
      color: 0x222326,
      roughness: 0.25,
      metalness: 0.85,
      name: 'RecessedSliderTrack'
    }),
    paverPatio: new THREE.MeshStandardMaterial({
      map: paverTex,
      roughness: 0.65,
      metalness: 0.04,
      name: 'PaverPatio'
    }),
    grass: new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.85,
      metalness: 0.0,
      name: 'LawnGrass'
    }),
    creamWall: new THREE.MeshStandardMaterial({
      color: 0xf6f3ed,
      roughness: 0.85,
      metalness: 0.02,
      normalMap: plasterNormal,
      normalScale: new THREE.Vector2(0.04, 0.04),
      name: 'CreamPlasterWall'
    }),
    stoneAccentWall: new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.45,
      metalness: 0.05,
      name: 'TravertineFeatureWall'
    }),
    slatWall: new THREE.MeshStandardMaterial({
      map: flutedTex,
      roughness: 0.4,
      metalness: 0.06,
      name: 'AcousticFlutedSlatWall'
    }),
    baseboard: new THREE.MeshStandardMaterial({
      color: 0xf0ede6,
      roughness: 0.5,
      metalness: 0.05,
      name: 'ModernBaseboard'
    }),
    baseboardWood: new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.4,
      metalness: 0.05,
      name: 'WoodBaseboard'
    }),
    ceiling: new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.88,
      metalness: 0.0,
      side: THREE.DoubleSide,
      name: 'CeilingPlaster'
    }),
    ceilingCoveGlow: new THREE.MeshBasicMaterial({
      color: 0xffeed2,
      name: 'CeilingCoveGlow'
    }),
    hvacDiffuser: new THREE.MeshStandardMaterial({
      color: 0x161719,
      roughness: 0.4,
      metalness: 0.7,
      name: 'HVACLinearDiffuser'
    }),
    spotBezel: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
      name: 'SpotBezel'
    }),
    spotLensGlow: new THREE.MeshBasicMaterial({
      color: 0xfff3db,
      name: 'SpotLensGlow'
    }),
    blackMullion: new THREE.MeshStandardMaterial({
      color: 0x1c1d20,
      roughness: 0.28,
      metalness: 0.82,
      name: 'BlackAnodizedAluminum'
    }),
    windowSillStone: new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.2,
      metalness: 0.05,
      name: 'MarbleWindowSill'
    }),
    brassMetal: new THREE.MeshStandardMaterial({
      color: 0xc8a462,
      roughness: 0.22,
      metalness: 0.92,
      name: 'BrushedChampagneBrass'
    }),
    timberDoor: new THREE.MeshStandardMaterial({
      map: flutedTex,
      roughness: 0.38,
      metalness: 0.05,
      name: 'VerticalFlutedTeakDoor'
    }),
    interiorDoorLeaf: new THREE.MeshStandardMaterial({
      color: 0xf5f2ec,
      roughness: 0.5,
      metalness: 0.05,
      name: 'InteriorDoorLeaf'
    }),
    doorHandleMat: new THREE.MeshStandardMaterial({
      color: 0x222325,
      roughness: 0.25,
      metalness: 0.85,
      name: 'MatteBlackDoorHandle'
    }),
    hingeMat: new THREE.MeshStandardMaterial({
      color: 0x8a8c90,
      roughness: 0.3,
      metalness: 0.9,
      name: 'SatinNickelHinge'
    }),
    clearGlass: new THREE.MeshPhysicalMaterial({
      color: 0xe5f1f4,
      transmission: 0.94,
      opacity: 1.0,
      transparent: true,
      roughness: 0.03,
      ior: 1.52,
      reflectivity: 0.65,
      thickness: 0.028,
      name: 'ArchitecturalDoubleGlazing'
    }),
    flutedGlass: new THREE.MeshPhysicalMaterial({
      color: 0xe8f2f4,
      transmission: 0.88,
      opacity: 0.9,
      transparent: true,
      roughness: 0.32,
      ior: 1.5,
      name: 'FlutedShowerGlass'
    }),
    curtain: new THREE.MeshStandardMaterial({
      map: createCurtainTexture(),
      roughness: 0.92,
      metalness: 0.0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
      name: 'SheerLinenCurtain'
    }),
    frostedGlass: new THREE.MeshPhysicalMaterial({
      color: 0xeaf2f4,
      transmission: 0.75,
      opacity: 0.94,
      transparent: true,
      roughness: 0.45,
      ior: 1.5,
      name: 'FrostedArchitecturalGlass'
    }),
    plaqueBackingGlow: new THREE.MeshBasicMaterial({
      color: 0xffedd0,
      transparent: true,
      opacity: 0.7,
      name: 'PlaqueBackingGlow'
    }),
    bedroomPlaque: new THREE.MeshStandardMaterial({
      map: createDoorPlaqueTexture('BEDROOM SUITE', 'COMING SOON'),
      roughness: 0.35,
      metalness: 0.65,
      name: 'Plaque_Bedroom'
    }),
    diningPlaque: new THREE.MeshStandardMaterial({
      map: createDoorPlaqueTexture('DINING ROOM', 'COMING SOON'),
      roughness: 0.35,
      metalness: 0.65,
      name: 'Plaque_Dining'
    }),
    kitchenPlaque: new THREE.MeshStandardMaterial({
      map: createDoorPlaqueTexture('GOURMET KITCHEN', 'COMING SOON'),
      roughness: 0.35,
      metalness: 0.65,
      name: 'Plaque_Kitchen'
    }),
    foyerPlaque: new THREE.MeshStandardMaterial({
      map: createDoorPlaqueTexture('ENTRANCE FOYER', 'COMING SOON'),
      roughness: 0.35,
      metalness: 0.65,
      name: 'Plaque_Foyer'
    }),
    bathPlaque: new THREE.MeshStandardMaterial({
      map: createDoorPlaqueTexture('SPA BATHROOM', 'COMING SOON'),
      roughness: 0.35,
      metalness: 0.65,
      name: 'Plaque_Bathroom'
    })
  };

  // Helper to create box meshes with shadow flags and names
  const createBox = (w, h, d, mat, pos, name = '', castShadow = true, receiveShadow = true) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    if (name) mesh.name = name;
    return mesh;
  };

  // =========================================================================
  // 2. FLOORS, ROOM TRANSITIONS & THRESHOLD STRIPS
  // =========================================================================
  const floorsGroup = new THREE.Group();
  floorsGroup.name = 'FloorsAndTransitions';

  // A. Main Calacatta Marble Floor (Living, Foyer, Dining, Kitchen)
  // Overall footprint: X: -10.0 to 10.0 (W: 20m), Z: -8.0 to 6.5 (D: 14.5m)
  const mainFloorSlab = createBox(20.0, 0.2, 14.5, materials.marbleFloor, [0, -0.1, -0.75], 'MainMarbleSlab');
  floorsGroup.add(mainFloorSlab);

  // B. Showroom Suite / Master Bedroom Parquet Floor (X: -9.8 to -2.0, Z: -7.8 to -1.5)
  const bedParquet = createBox(7.8, 0.02, 6.3, materials.woodFloor, [-5.9, 0.01, -4.65], 'ShowroomParquet');
  floorsGroup.add(bedParquet);

  // C. Luxury Bathroom Travertine Floor with Recessed Walk-in Shower
  // Bathroom bounds: X: -2.0 to 1.5 (W: 3.5m), Z: -7.8 to -3.0 (D: 4.8m)
  const bathMainFloor = createBox(3.5, 0.02, 3.2, materials.bathFloor, [-0.25, 0.01, -4.5], 'BathMainStoneFloor');
  floorsGroup.add(bathMainFloor);

  // Shower wet area recessed stone floor (-15mm drop for water containment)
  const showerWetFloor = createBox(1.6, 0.005, 1.6, materials.bathFloor, [-1.2, 0.0025, -6.9], 'ShowerRecessedWetFloor');
  floorsGroup.add(showerWetFloor);

  // Linear Stainless Steel Shower Drain
  const linearDrain = createBox(1.2, 0.008, 0.08, materials.showerDrain, [-1.2, 0.005, -7.5], 'LinearShowerDrain');
  floorsGroup.add(linearDrain);

  // D. Realistic Transition Threshold Dividers
  // 1. Foyer -> Bedroom threshold divider (X: -3.75, Z: -1.5, L: 1.5m, W: 15mm, H: 4mm)
  const thresholdBed = createBox(1.5, 0.006, 0.02, materials.brassThreshold, [-3.75, 0.022, -1.5], 'ThresholdBedFoyer');
  floorsGroup.add(thresholdBed);

  // 2. Hallway -> Bathroom threshold divider (X: 0.0, Z: -3.0, L: 1.0m, W: 15mm, H: 4mm)
  const thresholdBath = createBox(1.0, 0.006, 0.02, materials.brassThreshold, [0.0, 0.022, -3.0], 'ThresholdBathHall');
  floorsGroup.add(thresholdBath);

  // 3. Interior -> Rear Terrace Flush Sliding Door Floor Tracks
  // Showroom sliding track: X from -9.5 to -2.0 (L: 7.5m, W: 120mm triple track)
  const bedSliderTrack = createBox(7.5, 0.006, 0.12, materials.sliderTrack, [-5.75, 0.021, -7.85], 'BedSliderFloorTrack');
  // Kitchen sliding track: X from 1.5 to 6.0 (L: 4.5m, W: 120mm triple track)
  const kitchenSliderTrack = createBox(4.5, 0.006, 0.12, materials.sliderTrack, [3.75, 0.021, -7.85], 'KitchenSliderFloorTrack');
  floorsGroup.add(bedSliderTrack, kitchenSliderTrack);

  // E. Front Entrance Raised Porch & Steps & Landscaped Exterior Approach
  // Lower step plinth (7.0m x 3.0m x 0.15m at Y = 0.075m)
  const porchLower = createBox(7.0, 0.15, 3.0, materials.paverPatio, [0, 0.075, 8.0], 'PorchLowerStep');
  // Upper landing step (5.2m x 1.8m x 0.15m at Y = 0.225m)
  const porchUpper = createBox(5.2, 0.15, 1.8, materials.paverPatio, [0, 0.225, 7.4], 'PorchUpperLanding');
  // Concealed warm LED step light strip under upper landing bullnose
  const stepLedStrip = createBox(5.0, 0.015, 0.02, materials.ceilingCoveGlow, [0, 0.215, 8.3], 'StepLEDLight', false, false);
  floorsGroup.add(porchLower, porchUpper, stepLedStrip);

  // Front Stone Pathway Leading Toward Entrance (W: 3.2m, L: 5.5m from Z = 9.0 to 14.5)
  const frontWalkway = createBox(3.2, 0.04, 5.5, materials.paverPatio, [0, 0.02, 11.75], 'FrontWalkwayPavers');
  // Flanking Front Manicured Lawns
  const frontLawnLeft = createBox(5.5, 0.02, 6.0, materials.grass, [-4.5, 0.01, 11.0], 'FrontLawnLeft');
  const frontLawnRight = createBox(5.5, 0.02, 6.0, materials.grass, [4.5, 0.01, 11.0], 'FrontLawnRight');
  floorsGroup.add(frontWalkway, frontLawnLeft, frontLawnRight);

  // Architectural Low Planter Boxes Flanking Entrance Steps
  const planterLeft = createBox(1.0, 0.5, 2.6, materials.stoneAccentWall, [-2.6, 0.25, 7.8], 'EntrancePlanterLeft');
  const planterRight = createBox(1.0, 0.5, 2.6, materials.stoneAccentWall, [2.6, 0.25, 7.8], 'EntrancePlanterRight');
  const hedgeLeft = createBox(0.8, 0.35, 2.4, materials.grass, [-2.6, 0.6, 7.8], 'EntranceHedgeLeft');
  const hedgeRight = createBox(0.8, 0.35, 2.4, materials.grass, [2.6, 0.6, 7.8], 'EntranceHedgeRight');
  floorsGroup.add(planterLeft, planterRight, hedgeLeft, hedgeRight);

  // Modern Architectural Pathway Bollard Lights (Warm 2700K Glow)
  [
    [-1.8, 9.6],
    [1.8, 9.6],
    [-1.8, 12.0],
    [1.8, 12.0]
  ].forEach(([bx, bz], idx) => {
    const bollardBase = createBox(0.1, 0.65, 0.1, materials.blackMullion, [bx, 0.325, bz], `PathBollard_${idx}`);
    const bollardHead = createBox(0.08, 0.05, 0.08, materials.ceilingCoveGlow, [bx, 0.62, bz], '', false, false);
    const bollardLight = new THREE.PointLight(0xffecd0, 0.6, 2.8, 2);
    bollardLight.position.set(bx, 0.62, bz);
    floorsGroup.add(bollardBase, bollardHead, bollardLight);
  });

  // F. Rear Landscaped Garden Terrace & Lawn
  // Terrace stone slabs (20.0m x 5.0m x 0.2m)
  const rearPatio = createBox(20.0, 0.2, 5.0, materials.paverPatio, [0, -0.1, -10.5], 'RearGardenPatio');
  // Green manicured lawn (24.0m x 6.0m)
  const rearLawn = createBox(24.0, 0.18, 6.0, materials.grass, [0, -0.11, -16.0], 'RearGardenLawn');
  // West & East perimeter lawns
  const westLawn = createBox(4.0, 0.18, 26.0, materials.grass, [-12.0, -0.11, -2.0], 'WestPerimeterLawn');
  const eastLawn = createBox(4.0, 0.18, 26.0, materials.grass, [12.0, -0.11, -2.0], 'EastPerimeterLawn');

  // G. West Landscaped Garden Terrace directly outside Living Room Accessible Terrace Door
  // Continuous honed stone pavers extending from facade out into the manicured garden (X: -9.84 to -12.8, Z: -2.5 to 6.4)
  const westTerracePatio = createBox(3.2, 0.18, 9.2, materials.paverPatio, [-11.44, -0.09, 1.95], 'WestLivingTerracePatio');
  floorsGroup.add(rearPatio, rearLawn, westLawn, eastLawn, westTerracePatio);

  archGroup.add(floorsGroup);

  // =========================================================================
  // 3. STRUCTURAL WALLS, BUILT-IN SECTIONS & RECESSED NICHES
  // =========================================================================
  const wallsGroup = new THREE.Group();
  wallsGroup.name = 'WallsAndNiches';

  const wallH = 3.20;
  const wallMidY = wallH / 2; // 1.6m

  // --- EXTERIOR WALLS (Thickness: 0.32m) ---
  // A. South Facade (Front, Z = 6.34)
  // Double Pivot Front Door Opening: X: -0.9 to +0.9 (W: 1.8m)
  // Left solid pier flanking entrance: X: -2.0 to -0.9 (W: 1.1m)
  wallsGroup.add(createBox(1.1, wallH, 0.32, materials.creamWall, [-1.45, wallMidY, 6.34], 'FrontWallPierLeft'));
  // Right solid pier flanking entrance: X: 0.9 to 2.0 (W: 1.1m)
  wallsGroup.add(createBox(1.1, wallH, 0.32, materials.creamWall, [1.45, wallMidY, 6.34], 'FrontWallPierRight'));
  // Structural transom lintel beam above front door opening (from Y: 2.8m to 3.2m)
  wallsGroup.add(createBox(1.8, 0.4, 0.32, materials.creamWall, [0, 3.0, 6.34], 'FrontDoorHeaderLintel'));

  // Architectural Portico / Cantilevered Entrance Canopy Roof (W: 4.2m, D: 2.2m)
  wallsGroup.add(createBox(4.2, 0.18, 2.2, materials.blackMullion, [0, 3.29, 7.3], 'EntranceCanopyRoof'));
  // Soffit downlight recessed into canopy
  const canopyDownlight = new THREE.PointLight(0xffecd0, 1.0, 4.5, 2);
  canopyDownlight.position.set(0, 3.1, 7.1);
  wallsGroup.add(canopyDownlight);

  // Luxury Architectural Exterior Wall Sconces on Entrance Piers
  const sconceL = createBox(0.08, 0.44, 0.08, materials.brassMetal, [-1.2, 2.0, 6.52], 'SconceLeft');
  const sconceLightL = new THREE.PointLight(0xffd8a8, 0.75, 3.2, 2);
  sconceLightL.position.set(-1.2, 2.0, 6.64);
  const sconceR = createBox(0.08, 0.44, 0.08, materials.brassMetal, [1.2, 2.0, 6.52], 'SconceRight');
  const sconceLightR = new THREE.PointLight(0xffd8a8, 0.75, 3.2, 2);
  sconceLightR.position.set(1.2, 2.0, 6.64);
  wallsGroup.add(sconceL, sconceLightL, sconceR, sconceLightR);

  // Southwest corner return pier (X: -9.84, Z: 6.34)
  wallsGroup.add(createBox(0.32, wallH, 0.32, materials.creamWall, [-9.84, wallMidY, 6.34], 'CornerSW'));
  // Southeast corner return pier (X: 9.84, Z: 6.34)
  wallsGroup.add(createBox(0.32, wallH, 0.32, materials.creamWall, [9.84, wallMidY, 6.34], 'CornerSE'));
  // Lintel beams over front glass curtain walls
  wallsGroup.add(createBox(7.5, 0.3, 0.32, materials.creamWall, [-5.75, 3.05, 6.34], 'FrontLivingGlassLintel'));
  wallsGroup.add(createBox(7.5, 0.3, 0.32, materials.creamWall, [5.75, 3.05, 6.34], 'FrontDiningGlassLintel'));

  // B. West Facade (Left, X = -9.84)
  // Corner piers & structural lintel beams above panoramic glass walls and accessible terrace door
  wallsGroup.add(createBox(0.32, wallH, 1.5, materials.creamWall, [-9.84, wallMidY, -7.25], 'WestWallPierNW'));
  wallsGroup.add(createBox(0.32, wallH, 1.5, materials.creamWall, [-9.84, wallMidY, 5.5], 'WestWallPierSW'));
  wallsGroup.add(createBox(0.32, 0.3, 5.4, materials.creamWall, [-9.84, 3.05, -4.3], 'WestBedGlassLintel'));
  wallsGroup.add(createBox(0.32, 0.3, 1.7, materials.creamWall, [-9.84, 3.05, -0.65], 'WestLivingNorthGlassLintel'));
  wallsGroup.add(createBox(0.32, 0.4, 1.6, materials.creamWall, [-9.84, 3.0, 1.0], 'AccessibleTerraceDoorLintel'));
  wallsGroup.add(createBox(0.32, 0.3, 4.54, materials.creamWall, [-9.84, 3.05, 4.07], 'WestLivingSouthGlassLintel'));

  // C. East Facade (Right, X = 9.84)
  // Travertine clad feature exterior wall section in Dining: Z: 1.0 to 6.2 (L: 5.2m)
  wallsGroup.add(createBox(0.32, wallH, 5.2, materials.stoneAccentWall, [9.84, wallMidY, 3.6], 'EastDiningStoneWall'));
  // Kitchen solid wall section: Z: -7.8 to -4.5 (L: 3.3m)
  wallsGroup.add(createBox(0.32, wallH, 3.3, materials.creamWall, [9.84, wallMidY, -6.15], 'EastKitchenSolidWall'));
  // Kitchen window lintel and lower sill wall: Z: -4.5 to 1.0 (L: 5.5m)
  wallsGroup.add(createBox(0.32, 0.5, 5.5, materials.creamWall, [9.84, 2.95, -1.75], 'EastKitchenWindowLintel'));
  // Kitchen lower sill wall
  wallsGroup.add(createBox(0.32, 0.9, 5.5, materials.creamWall, [9.84, 0.45, -1.75], 'EastKitchenWindowSillWall'));

  // D. North Facade (Rear Garden, Z = -7.84)
  // Solid bathroom rear exterior wall: X: -2.0 to 1.5 (W: 3.5m)
  wallsGroup.add(createBox(3.5, wallH, 0.32, materials.creamWall, [-0.25, wallMidY, -7.84], 'RearBathroomExteriorWall'));
  // Solid kitchen rear cabinetry wall: X: 6.0 to 9.84 (W: 3.84m)
  wallsGroup.add(createBox(3.84, wallH, 0.32, materials.creamWall, [7.92, wallMidY, -7.84], 'RearKitchenPrepExteriorWall'));
  // Lintel beams over rear sliding glass systems
  wallsGroup.add(createBox(7.5, 0.4, 0.32, materials.creamWall, [-5.75, 3.0, -7.84], 'RearBedroomSliderLintel'));
  wallsGroup.add(createBox(4.5, 0.4, 0.32, materials.creamWall, [3.75, 3.0, -7.84], 'RearKitchenSliderLintel'));

  // --- INTERIOR PARTITION WALLS (Thickness: 0.15m) & BUILT-IN RECESSES ---
  // A. Bathroom Enclosure (X: -2.0 to 1.5, Z: -7.7 to -3.0)
  // West bathroom wall (between Showroom Suite and Bathroom)
  wallsGroup.add(createBox(0.15, wallH, 4.7, materials.creamWall, [-2.0, wallMidY, -5.35], 'BathWestPartition'));
  // East bathroom wall (between Bathroom and Central Hallway / Kitchen)
  wallsGroup.add(createBox(0.15, wallH, 4.7, materials.creamWall, [1.5, wallMidY, -5.35], 'BathEastPartition'));
  // South bathroom front wall (facing hallway, with 1.0m door opening: X from -0.5 to 0.5)
  // Left wall segment: X: -2.0 to -0.5 (W: 1.5m)
  wallsGroup.add(createBox(1.5, wallH, 0.15, materials.creamWall, [-1.25, wallMidY, -3.0], 'BathSouthWallLeft'));
  // Right wall segment: X: 0.5 to 1.5 (W: 1.0m)
  wallsGroup.add(createBox(1.0, wallH, 0.15, materials.creamWall, [1.0, wallMidY, -3.0], 'BathSouthWallRight'));
  // Header lintel over bathroom door opening (from Y: 2.4m to 3.2m, H: 0.8m)
  wallsGroup.add(createBox(1.0, 0.8, 0.15, materials.creamWall, [0.0, 2.8, -3.0], 'BathDoorHeaderLintel'));

  // Built-in Shower Shampoo Niche in Bathroom West Wall (X: -1.93, Z: -6.5, W: 0.8m, H: 0.35m, D: 0.12m)
  const showerNicheBox = createBox(0.04, 0.35, 0.8, materials.stoneAccentWall, [-1.92, 1.4, -6.5], 'ShowerShampooNiche');
  const showerNicheLed = createBox(0.02, 0.015, 0.78, materials.ceilingCoveGlow, [-1.91, 1.56, -6.5], 'ShowerNicheLED', false, false);
  wallsGroup.add(showerNicheBox, showerNicheLed);

  // B. Living Room & Master Suite Divider Wall (Z = -1.5)
  // Solid divider wall: X from -9.84 to -4.5 (W: 5.34m)
  wallsGroup.add(createBox(5.34, wallH, 0.15, materials.creamWall, [-7.17, wallMidY, -1.5], 'LivingBedroomDividerWall'));
  // Right return wall to bathroom corner: X from -3.0 to -2.0 (W: 1.0m)
  wallsGroup.add(createBox(1.0, wallH, 0.15, materials.creamWall, [-2.5, wallMidY, -1.5], 'LivingBedroomRightPillar'));
  // Lintel beam over Master Suite Coming Soon Door (X: -4.5 to -3.0, Clear opening W: 1.5m, H: 2.8m)
  wallsGroup.add(createBox(1.5, 0.4, 0.15, materials.creamWall, [-3.75, 3.0, -1.5], 'ShowroomPassageHeaderLintel'));

  // Built-in Fluted Acoustic Media Feature Wall facing Living Room
  // Dimensions: W: 4.8m, H: 2.8m, D: 0.05m centered on X = -7.0m, Z = -1.40m
  const mediaSlatWall = createBox(4.8, 2.8, 0.05, materials.slatWall, [-7.0, 1.4, -1.4], 'LivingMediaSlatFeature');
  wallsGroup.add(mediaSlatWall);

  // C. Showroom Master Bed Acoustic Slat Feature Wall (Z = -7.68)
  const bedFeatureWall = createBox(4.2, 2.8, 0.06, materials.slatWall, [-6.0, 1.4, -7.68], 'BedAcousticFeatureSlat');
  const bedFeatureLed = createBox(4.2, 0.02, 0.02, materials.ceilingCoveGlow, [-6.0, 2.81, -7.65], 'BedHeadboardCoveLED', false, false);
  wallsGroup.add(bedFeatureWall, bedFeatureLed);

  // D. Built-in Foyer Architectural Display Niche (Recessed into wall at X = 1.42, Z = 5.2)
  const foyerNicheBack = createBox(0.04, 1.8, 1.2, materials.stoneAccentWall, [1.42, 1.6, 5.2], 'FoyerDisplayNicheBack');
  const foyerNicheShelf = createBox(0.18, 0.06, 1.2, materials.baseboardWood, [1.34, 0.7, 5.2], 'FoyerNicheShelf');
  const foyerNicheSpot = createBox(0.08, 0.02, 0.08, materials.spotLensGlow, [1.36, 2.45, 5.2], 'FoyerNicheSpotGlow', false, false);
  wallsGroup.add(foyerNicheBack, foyerNicheShelf, foyerNicheSpot);

  archGroup.add(wallsGroup);

  // =========================================================================
  // 4. ARCHITECTURAL COLUMNS & STRUCTURAL PIERS
  // =========================================================================
  const columnsGroup = new THREE.Group();
  columnsGroup.name = 'StructuralColumnsAndPiers';

  // A. Entrance Portico Columns (Square 450mm x 450mm x 3.2m stone piers)
  // Left Portico Pier (Pos: [-2.4, 1.6, 7.8])
  const porticoColumnLeft = createBox(0.45, wallH, 0.45, materials.stoneAccentWall, [-2.4, wallMidY, 7.8], 'PorticoPierLeft');
  // Right Portico Pier (Pos: [2.4, 1.6, 7.8])
  const porticoColumnRight = createBox(0.45, wallH, 0.45, materials.stoneAccentWall, [2.4, wallMidY, 7.8], 'PorticoPierRight');
  // Portico canopy roof slab connecting piers to main facade (W: 6.0m, D: 1.8m, H: 0.2m at Y: 3.2m)
  const porticoCanopy = createBox(6.0, 0.2, 1.8, materials.creamWall, [0.0, 3.2, 7.3], 'PorticoCanopySlab');
  columnsGroup.add(porticoColumnLeft, porticoColumnRight, porticoCanopy);


  // C. Rear Garden Terrace Canopy Support Columns (250mm x 250mm steel/stone)
  const rearColLeft = createBox(0.25, wallH, 0.25, materials.blackMullion, [-5.75, wallMidY, -13.0], 'RearTerraceColumnLeft');
  const rearColRight = createBox(0.25, wallH, 0.25, materials.blackMullion, [3.75, wallMidY, -13.0], 'RearTerraceColumnRight');
  columnsGroup.add(rearColLeft, rearColRight);

  archGroup.add(columnsGroup);

  // =========================================================================
  // 5. BASEBOARDS / SKIRTING BOARDS (Continuous Luxury Detailing)
  // =========================================================================
  const baseboardsGroup = new THREE.Group();
  baseboardsGroup.name = 'Baseboards';

  const bH = 0.10; // 100mm height
  const bD = 0.014; // 14mm depth
  const bY = bH / 2; // 0.05m

  // Helper to add baseboard runs along walls
  const addBaseboard = (w, pos, rotY = 0, isWood = false, name = '') => {
    const mat = isWood ? materials.baseboardWood : materials.baseboard;
    const bb = createBox(w, bH, bD, mat, [0, 0, 0], name, false, true);
    bb.position.set(pos[0], bY, pos[2]);
    bb.rotation.y = rotY;
    baseboardsGroup.add(bb);
    return bb;
  };

  // Living Room Baseboards
  addBaseboard(5.2, [-7.2, 0, -1.35], 0, false, 'BB_LivingMediaWall');
  addBaseboard(6.0, [-9.7, 0, 2.5], Math.PI / 2, false, 'BB_LivingWestCorner');
  addBaseboard(1.0, [-2.5, 0, -1.35], 0, false, 'BB_LivingDividerRight');

  // Entrance Foyer & Corridor Baseboards
  addBaseboard(3.5, [0.0, 0, 6.15], 0, false, 'BB_FoyerSouthWall');
  addBaseboard(4.5, [1.4, 0, 0.5], Math.PI / 2, false, 'BB_FoyerEastSpine');
  addBaseboard(1.5, [-1.25, 0, -2.9], 0, false, 'BB_HallBathLeft');
  addBaseboard(0.9, [1.0, 0, -2.9], 0, false, 'BB_HallBathRight');

  // Dining Room Baseboards
  addBaseboard(5.0, [9.7, 0, 3.6], Math.PI / 2, false, 'BB_DiningEastWall');
  addBaseboard(1.8, [1.4, 0, 5.0], Math.PI / 2, false, 'BB_DiningFoyerReturn');

  // Kitchen Baseboards
  addBaseboard(3.6, [7.8, 0, -7.65], 0, false, 'BB_KitchenRearCabinet');

  // Showroom Suite Baseboards (Natural Oak Finish)
  addBaseboard(5.2, [-7.2, 0, -1.65], 0, true, 'BB_BedDividerNorth');
  addBaseboard(4.6, [-2.1, 0, -5.35], Math.PI / 2, true, 'BB_BedBathEast');
  addBaseboard(4.0, [-6.0, 0, -7.6], 0, true, 'BB_BedHeadboardWall');

  archGroup.add(baseboardsGroup);

  // =========================================================================
  // 6. WINDOWS, FRAMES, MULLIONS & DEEP SILLS
  // =========================================================================
  const windowsGroup = new THREE.Group();
  windowsGroup.name = 'WindowsAndDeepSills';

  // Builder for architectural multi-pane floor-to-ceiling window assembly with deep sill
  const createArchitecturalWindow = (w, h, pos, rotY = 0, numDivisions = 3, hasSill = true, sillDepth = 0.22) => {
    const group = new THREE.Group();

    // 1. Double-Glazed Glass Pane (28mm overall IGU thickness)
    const glass = createBox(w, h, 0.028, materials.clearGlass, [0, 0, 0], 'GlassIGU', false, false);
    group.add(glass);

    // 2. Extruded Outer Frame (70mm face x 120mm depth)
    const frameW = 0.07;
    const frameD = 0.12;
    // Top & Bottom frames
    group.add(createBox(w, frameW, frameD, materials.blackMullion, [0, h / 2 - frameW / 2, 0]));
    group.add(createBox(w, frameW, frameD, materials.blackMullion, [0, -h / 2 + frameW / 2, 0]));
    // Left & Right frames
    group.add(createBox(frameW, h, frameD, materials.blackMullion, [-w / 2 + frameW / 2, 0, 0]));
    group.add(createBox(frameW, h, frameD, materials.blackMullion, [w / 2 - frameW / 2, 0, 0]));

    // 3. Intermediate Vertical Mullions (50mm face x 100mm depth)
    if (numDivisions > 1) {
      const step = w / numDivisions;
      for (let i = 1; i < numDivisions; i++) {
        group.add(createBox(0.05, h, 0.10, materials.blackMullion, [-w / 2 + i * step, 0, 0]));
      }
    }

    // 4. Deep Architectural Window Sill (Interior Honed Marble Slab)
    if (hasSill) {
      const sill = createBox(w + 0.06, 0.03, sillDepth, materials.windowSillStone, [0, -h / 2 - 0.015, -sillDepth / 2 + 0.04]);
      group.add(sill);
    }

    group.position.set(pos[0], pos[1], pos[2]);
    group.rotation.y = rotY;
    return group;
  };

  // Window 1: Front Living Room Panoramic Window (W: 7.5m, H: 3.0m, Z: 6.34)
  windowsGroup.add(createArchitecturalWindow(7.5, 3.0, [-5.75, 1.5, 6.34], 0, 4, true, 0.22));

  // Window 2: Front Dining Room Window (W: 7.5m, H: 3.0m, Z: 6.34)
  windowsGroup.add(createArchitecturalWindow(7.5, 3.0, [5.75, 1.5, 6.34], 0, 4, true, 0.22));

  // Window 3A: West Master Bedroom Window Wall (Z: -7.0 to -1.6, W: 5.4m, H: 3.0m, X: -9.84)
  windowsGroup.add(createArchitecturalWindow(5.4, 3.0, [-9.84, 1.5, -4.3], Math.PI / 2, 3, true, 0.24));

  // Window 3B: West Living Room North Window (Z: -1.5 to 0.2, W: 1.7m, H: 3.0m, X: -9.84)
  windowsGroup.add(createArchitecturalWindow(1.7, 3.0, [-9.84, 1.5, -0.65], Math.PI / 2, 1, true, 0.24));

  // Window 3C: West Living Room South Window (Z: 1.8 to 6.34, W: 4.54m, H: 3.0m, X: -9.84)
  windowsGroup.add(createArchitecturalWindow(4.54, 3.0, [-9.84, 1.5, 4.07], Math.PI / 2, 3, true, 0.24));

  // Window 4: East Kitchen Counter Garden Window (W: 5.5m, H: 1.6m, X: 9.84, Y: 1.7m)
  windowsGroup.add(createArchitecturalWindow(5.5, 1.6, [9.84, 1.7, -1.75], Math.PI / 2, 3, true, 0.28));

  archGroup.add(windowsGroup);

  // =========================================================================
  // 7. DOORS, DETAILED CASINGS, HINGES & LUXURY HANDLES
  // =========================================================================
  const doorsGroup = new THREE.Group();
  doorsGroup.name = 'DoorsAndHardware';

  // Builder for permanently closed architectural Coming Soon doors with backlit plaques
  const createComingSoonDoor = (w, h, pos, rotY, plaqueMaterial, roomTitle, isFrosted = false) => {
    const doorGroup = new THREE.Group();
    doorGroup.name = `ComingSoonDoor_${roomTitle.replace(/\s+/g, '_')}`;

    const frameW = 0.07;
    const frameD = 0.14;
    // Casing jambs & head
    doorGroup.add(createBox(frameW, h, frameD, materials.blackMullion, [-w / 2 + frameW / 2, h / 2, 0]));
    doorGroup.add(createBox(frameW, h, frameD, materials.blackMullion, [w / 2 - frameW / 2, h / 2, 0]));
    doorGroup.add(createBox(w, frameW, frameD, materials.blackMullion, [0, h - frameW / 2, 0]));

    // Door Leaf
    const leafW = w - frameW * 2;
    const leafH = h - frameW;
    const leafMat = isFrosted ? materials.frostedGlass : materials.slatWall;
    const doorLeaf = createBox(leafW, leafH, 0.05, leafMat, [0, leafH / 2, 0], `DoorLeaf_${roomTitle}`);
    doorGroup.add(doorLeaf);

    // Slim metal border trim around leaf
    doorGroup.add(createBox(leafW, 0.035, 0.054, materials.blackMullion, [0, leafH - 0.0175, 0]));
    doorGroup.add(createBox(leafW, 0.035, 0.054, materials.blackMullion, [0, 0.0175, 0]));
    doorGroup.add(createBox(0.035, leafH, 0.054, materials.blackMullion, [-leafW / 2 + 0.0175, leafH / 2, 0]));
    doorGroup.add(createBox(0.035, leafH, 0.054, materials.blackMullion, [leafW / 2 - 0.0175, leafH / 2, 0]));

    // Champagne Brass Vertical Pull Handle (1.6m H x 28mm W)
    const handleX = leafW / 2 - 0.12;
    const handleY = 1.25;
    const handleOuter = createBox(0.028, 1.6, 0.02, materials.brassMetal, [handleX, handleY, 0.055]);
    const standoffTop = createBox(0.024, 0.024, 0.035, materials.brassMetal, [handleX, handleY + 0.7, 0.035]);
    const standoffBtm = createBox(0.024, 0.024, 0.035, materials.brassMetal, [handleX, handleY - 0.7, 0.035]);
    doorGroup.add(handleOuter, standoffTop, standoffBtm);

    // Architectural Backlit "COMING SOON" Plaque
    const plaqueY = 1.55; // human eye height
    // A. Frosted Lightbox Backplate with ambient warm glow
    const backplate = createBox(0.48, 0.24, 0.008, materials.plaqueBackingGlow, [0, plaqueY, 0.03], '', false, false);
    doorGroup.add(backplate);

    // B. Brushed Metal Face Plaque with high-res crisp canvas text
    const plaqueFace = createBox(0.46, 0.22, 0.012, plaqueMaterial, [0, plaqueY, 0.038], `Plaque_${roomTitle}`);
    doorGroup.add(plaqueFace);

    // C. Subtle warm architectural point light illuminating the plaque & door surface
    const plaqueLight = new THREE.PointLight(0xffecd0, 0.75, 2.0, 2);
    plaqueLight.position.set(0, plaqueY, 0.16);
    doorGroup.add(plaqueLight);

    doorGroup.position.set(pos[0], pos[1], pos[2]);
    doorGroup.rotation.y = rotY;

    doorGroup.userData = {
      isComingSoonDoor: true,
      roomTitle
    };

    return doorGroup;
  };

  // --- CLOSED COMING SOON DOORS ---
  // Only Master Bedroom Suite and Spa Bathroom are closed with architectural COMING SOON plaques
  // 1. Master Bedroom Suite (North wall: Z = -1.5, X = -3.75)
  doorsGroup.add(createComingSoonDoor(1.5, 2.8, [-3.75, 0, -1.5], 0, materials.bedroomPlaque, 'Bedroom Suite', false));

  // --- THE MAIN INTERACTIVE FRONT ENTRANCE PIVOT DOOR ---
  // Opening: W: 1.8m, H: 2.8m on South front facade at X = 0.0, Z = 6.34 (spans X: -0.9 to 0.9)
  const frontDoorSystem = new THREE.Group();
  frontDoorSystem.name = 'InteractiveFrontDoorSystem';
  frontDoorSystem.position.set(0.0, 0, 6.34);

  const fW = 1.8;
  const fH = 2.8;
  const fFrameW = 0.08;
  const fFrameD = 0.16;

  // Outer Black Anodized Aluminum Casing / Outer Jamb
  frontDoorSystem.add(createBox(fFrameW, fH, fFrameD, materials.blackMullion, [-fW / 2 + fFrameW / 2, fH / 2, 0]));
  frontDoorSystem.add(createBox(fFrameW, fH, fFrameD, materials.blackMullion, [fW / 2 - fFrameW / 2, fH / 2, 0]));
  frontDoorSystem.add(createBox(fW, fFrameW, fFrameD, materials.blackMullion, [0, fH - fFrameW / 2, 0]));
  frontDoorSystem.add(createBox(fW, 0.015, fFrameD, materials.sliderTrack, [0, 0.0075, 0]));

  // Front Door Pivot Group (Hinged at the right jamb at local X = fW / 2 - 0.08 = 0.82)
  const frontDoorPivot = new THREE.Group();
  frontDoorPivot.name = 'FrontDoorPivot';
  frontDoorPivot.position.set(fW / 2 - 0.08, 0, 0);

  const fLeafW = fW - fFrameW * 2 - 0.02; // 1.62m
  const fLeafH = fH - fFrameW - 0.02;    // 2.70m
  const fLeafCenterX = -fLeafW / 2;

  const frontDoorLeaf = new THREE.Group();
  frontDoorLeaf.name = 'FrontDoorLeaf';

  // Solid Vertical Fluted Oak/Timber Core
  const fCore = createBox(fLeafW, fLeafH, 0.07, materials.timberDoor, [fLeafCenterX, fLeafH / 2, 0], 'FrontDoorCore', true, true);
  frontDoorLeaf.add(fCore);

  // Perimeter Black Metal Bevel Trim
  frontDoorLeaf.add(createBox(fLeafW, 0.035, 0.075, materials.blackMullion, [fLeafCenterX, fLeafH - 0.0175, 0]));
  frontDoorLeaf.add(createBox(fLeafW, 0.035, 0.075, materials.blackMullion, [fLeafCenterX, 0.0175, 0]));
  frontDoorLeaf.add(createBox(0.035, fLeafH, 0.075, materials.blackMullion, [fLeafCenterX - fLeafW / 2 + 0.0175, fLeafH / 2, 0]));
  frontDoorLeaf.add(createBox(0.035, fLeafH, 0.075, materials.blackMullion, [fLeafCenterX + fLeafW / 2 - 0.0175, fLeafH / 2, 0]));

  // Monumental Brushed Champagne Brass Vertical Pull Handle (2.0m H x 35mm W)
  const fHandleX = fLeafCenterX - fLeafW / 2 + 0.16;
  const fHandleY = 1.35;
  // Exterior handle (facing outside, +Z)
  const fHBarOut = createBox(0.035, 2.0, 0.025, materials.brassMetal, [fHandleX, fHandleY, 0.065]);
  const fStandOut1 = createBox(0.028, 0.028, 0.05, materials.brassMetal, [fHandleX, fHandleY + 0.8, 0.035]);
  const fStandOut2 = createBox(0.028, 0.028, 0.05, materials.brassMetal, [fHandleX, fHandleY - 0.8, 0.035]);
  // Interior handle (facing foyer, -Z)
  const fHBarIn = createBox(0.035, 2.0, 0.025, materials.brassMetal, [fHandleX, fHandleY, -0.065]);
  const fStandIn1 = createBox(0.028, 0.028, 0.05, materials.brassMetal, [fHandleX, fHandleY + 0.8, -0.035]);
  const fStandIn2 = createBox(0.028, 0.028, 0.05, materials.brassMetal, [fHandleX, fHandleY - 0.8, -0.035]);
  frontDoorLeaf.add(fHBarOut, fStandOut1, fStandOut2, fHBarIn, fStandIn1, fStandIn2);

  // Heavy-Duty Pivot Discs
  const fPivotBtm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 24), materials.hingeMat);
  fPivotBtm.position.set(0, 0.01, 0);
  const fPivotTop = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 24), materials.hingeMat);
  fPivotTop.position.set(0, fH - 0.01, 0);
  frontDoorPivot.add(fPivotBtm, fPivotTop);

  frontDoorPivot.add(frontDoorLeaf);
  frontDoorSystem.add(frontDoorPivot);
  doorsGroup.add(frontDoorSystem);

  // --- THE ONE SPECIAL ACCESSIBLE TERRACE PIVOT DOOR ---
  // Opening: W: 1.6m, H: 2.8m on West panoramic facade at X = -9.84, Z = 1.0 (spans Z: 0.2 to 1.8)
  const terraceDoorSystem = new THREE.Group();
  terraceDoorSystem.name = 'AccessibleTerraceDoorSystem';
  terraceDoorSystem.position.set(-9.84, 0, 1.0);
  terraceDoorSystem.rotation.y = Math.PI / 2;

  const tW = 1.6;
  const tH = 2.8;
  const tFrameW = 0.07;
  const tFrameD = 0.14;

  // 1. Black Aluminum Casing / Outer Jamb
  terraceDoorSystem.add(createBox(tFrameW, tH, tFrameD, materials.blackMullion, [-tW / 2 + tFrameW / 2, tH / 2, 0]));
  terraceDoorSystem.add(createBox(tFrameW, tH, tFrameD, materials.blackMullion, [tW / 2 - tFrameW / 2, tH / 2, 0]));
  terraceDoorSystem.add(createBox(tW, tFrameW, tFrameD, materials.blackMullion, [0, tH - tFrameW / 2, 0]));
  terraceDoorSystem.add(createBox(tW, 0.015, tFrameD, materials.sliderTrack, [0, 0.0075, 0]));

  // 2. Door Pivot Hinge Group (Hinged on the South jamb at local X = tW/2 - 0.06 = 0.74)
  const terraceDoorPivot = new THREE.Group();
  terraceDoorPivot.name = 'TerraceDoorPivot';
  terraceDoorPivot.position.set(tW / 2 - 0.06, 0, 0);

  const tLeafW = tW - tFrameW * 2 - 0.02; // 1.44m
  const tLeafH = tH - tFrameW - 0.02; // 2.71m
  const tLeafCenterX = -tLeafW / 2;

  const terraceDoorLeaf = new THREE.Group();
  terraceDoorLeaf.name = 'TerraceDoorLeaf';

  // Architectural Low-Iron Double Glazing
  const tGlass = createBox(tLeafW - 0.1, tLeafH - 0.1, 0.028, materials.clearGlass, [tLeafCenterX, tLeafH / 2, 0], 'TerraceDoorGlass', false, false);
  terraceDoorLeaf.add(tGlass);

  // Slim Black Aluminum Stiles & Rails
  terraceDoorLeaf.add(createBox(tLeafW, 0.05, 0.045, materials.blackMullion, [tLeafCenterX, tLeafH - 0.025, 0]));
  terraceDoorLeaf.add(createBox(tLeafW, 0.08, 0.045, materials.blackMullion, [tLeafCenterX, 0.04, 0]));
  terraceDoorLeaf.add(createBox(0.05, tLeafH, 0.045, materials.blackMullion, [tLeafCenterX - tLeafW / 2 + 0.025, tLeafH / 2, 0]));
  terraceDoorLeaf.add(createBox(0.05, tLeafH, 0.045, materials.blackMullion, [tLeafCenterX + tLeafW / 2 - 0.025, tLeafH / 2, 0]));

  // Brushed Champagne Brass Vertical Pull Handle (1.8m H x 32mm W)
  const tHandleX = tLeafCenterX - tLeafW / 2 + 0.14;
  const tHandleY = 1.35;
  // Interior handle (towards Living Room, -Z local in doorSystem coordinate)
  const tHBarIn = createBox(0.032, 1.8, 0.022, materials.brassMetal, [tHandleX, tHandleY, -0.055]);
  const tStandIn1 = createBox(0.025, 0.025, 0.045, materials.brassMetal, [tHandleX, tHandleY + 0.75, -0.028]);
  const tStandIn2 = createBox(0.025, 0.025, 0.045, materials.brassMetal, [tHandleX, tHandleY - 0.75, -0.028]);
  // Exterior handle (towards Terrace, +Z local)
  const tHBarOut = createBox(0.032, 1.8, 0.022, materials.brassMetal, [tHandleX, tHandleY, 0.055]);
  const tStandOut1 = createBox(0.025, 0.025, 0.045, materials.brassMetal, [tHandleX, tHandleY + 0.75, 0.028]);
  const tStandOut2 = createBox(0.025, 0.025, 0.045, materials.brassMetal, [tHandleX, tHandleY - 0.75, 0.028]);
  terraceDoorLeaf.add(tHBarIn, tStandIn1, tStandIn2, tHBarOut, tStandOut1, tStandOut2);

  // Pivot Discs
  const tPivotBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 20), materials.hingeMat);
  tPivotBottom.position.set(0, 0.008, 0);
  const tPivotTop = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 20), materials.hingeMat);
  tPivotTop.position.set(0, tH - 0.008, 0);
  terraceDoorPivot.add(tPivotBottom, tPivotTop);

  terraceDoorPivot.add(terraceDoorLeaf);
  terraceDoorSystem.add(terraceDoorPivot);
  doorsGroup.add(terraceDoorSystem);

  // --- SHEER LINEN WAVE CURTAINS ---
  const curtainsGroup = new THREE.Group();
  curtainsGroup.name = 'LivingRoomSheerCurtains';

  const addCurtainPanel = (w, h, pos, rotY) => {
    const panel = new THREE.Group();
    const numFolds = Math.floor(w / 0.12);
    const foldStep = w / numFolds;
    for (let f = 0; f < numFolds; f++) {
      const fold = createBox(foldStep * 0.9, h, 0.03 + (f % 2) * 0.02, materials.curtain, [
        -w / 2 + f * foldStep + foldStep / 2,
        h / 2,
        (f % 2 === 0 ? 0.012 : -0.012)
      ], '', false, true);
      panel.add(fold);
    }
    panel.add(createBox(w + 0.04, 0.02, 0.04, materials.blackMullion, [0, h + 0.01, 0]));
    panel.position.set(pos[0], pos[1], pos[2]);
    panel.rotation.y = rotY;
    curtainsGroup.add(panel);
  };

  // South panoramic window curtains
  addCurtainPanel(1.2, 3.1, [-9.2, 0.05, 6.22], 0);
  addCurtainPanel(1.0, 3.1, [-2.2, 0.05, 6.22], 0);

  // West panoramic window curtains
  addCurtainPanel(1.0, 3.1, [-9.72, 0.05, -1.1], Math.PI / 2);
  addCurtainPanel(1.2, 3.1, [-9.72, 0.05, 5.8], Math.PI / 2);

  archGroup.add(curtainsGroup);

  // --- B. SPA BATHROOM FLUSH INTERIOR DOOR ---
  // Opening: W: 1.0m, H: 2.4m at [0.0, 1.2, -3.0]
  const bathDoorSystem = new THREE.Group();
  bathDoorSystem.name = 'BathroomDoorSystem';

  // 1. Casing / Jamb Frame (150mm depth matching wall, 60mm architraves)
  bathDoorSystem.add(createBox(0.06, 2.42, 0.16, materials.creamWall, [-0.49, 1.21, 0]));
  bathDoorSystem.add(createBox(0.06, 2.42, 0.16, materials.creamWall, [0.49, 1.21, 0]));
  bathDoorSystem.add(createBox(1.04, 0.06, 0.16, materials.creamWall, [0, 2.42, 0]));

  // 2. Door Leaf (0.95m W x 2.38m H x 45mm Thick solid flush door)
  const bathDoorLeaf = createBox(0.94, 2.37, 0.045, materials.interiorDoorLeaf, [0, 1.185, 0], 'BathDoorLeaf');
  bathDoorSystem.add(bathDoorLeaf);

  // 2b. Spa Bath Coming Soon Plaque
  const bathBackplate = createBox(0.42, 0.2, 0.008, materials.plaqueBackingGlow, [0, 1.55, 0.025], '', false, false);
  const bathPlaqueFace = createBox(0.40, 0.18, 0.012, materials.bathPlaque, [0, 1.55, 0.032], 'Plaque_SpaBath');
  const bathPlaqueLight = new THREE.PointLight(0xffecd0, 0.6, 1.8, 2);
  bathPlaqueLight.position.set(0, 1.55, 0.15);
  bathDoorSystem.add(bathBackplate, bathPlaqueFace, bathPlaqueLight);

  // 3. 3x Concealed Satin Nickel Hinges on Jamb
  [0.35, 1.2, 2.05].forEach((hy) => {
    const hinge = createBox(0.012, 0.09, 0.025, materials.hingeMat, [-0.46, hy, 0]);
    bathDoorSystem.add(hinge);
  });

  // 4. Ergonomic Lever Handle on Round Rosette (Y = 1.05m)
  const rosetteOut = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.01, 16), materials.doorHandleMat);
  rosetteOut.position.set(0.38, 1.05, 0.026);
  rosetteOut.rotation.x = Math.PI / 2;
  const leverOut = createBox(0.13, 0.02, 0.035, materials.doorHandleMat, [0.43, 1.05, 0.045]);

  const rosetteIn = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.01, 16), materials.doorHandleMat);
  rosetteIn.position.set(0.38, 1.05, -0.026);
  rosetteIn.rotation.x = Math.PI / 2;
  const leverIn = createBox(0.13, 0.02, 0.035, materials.doorHandleMat, [0.43, 1.05, -0.045]);

  bathDoorSystem.add(rosetteOut, leverOut, rosetteIn, leverIn);
  bathDoorSystem.position.set(0, 0, -3.0);
  doorsGroup.add(bathDoorSystem);

  // --- C. REAR TRIPLE SLIDING GLASS DOOR SYSTEMS ---
  // Builder for multi-panel pocket sliding glass system
  const createSlidingGlassSystem = (w, h, pos, numPanels = 3) => {
    const group = new THREE.Group();
    const panelW = w / numPanels + 0.1; // overlap
    const step = (w - panelW) / (numPanels - 1);

    // Frame top & sides
    group.add(createBox(w, 0.08, 0.14, materials.blackMullion, [0, h - 0.04, 0]));
    group.add(createBox(0.08, h, 0.14, materials.blackMullion, [-w / 2 + 0.04, h / 2, 0]));
    group.add(createBox(0.08, h, 0.14, materials.blackMullion, [w / 2 - 0.04, h / 2, 0]));

    for (let p = 0; p < numPanels; p++) {
      const panelGroup = new THREE.Group();
      const px = -w / 2 + panelW / 2 + p * step;
      const pz = (p - (numPanels - 1) / 2) * 0.04;

      // Panel Glass
      const pGlass = createBox(panelW, h - 0.1, 0.024, materials.clearGlass, [0, (h - 0.1) / 2 + 0.05, 0], 'SliderGlass', false, false);
      // Panel Frame (black aluminum)
      panelGroup.add(pGlass);
      panelGroup.add(createBox(panelW, 0.06, 0.05, materials.blackMullion, [0, h - 0.06, 0]));
      panelGroup.add(createBox(panelW, 0.08, 0.05, materials.blackMullion, [0, 0.04, 0]));
      panelGroup.add(createBox(0.06, h, 0.05, materials.blackMullion, [-panelW / 2 + 0.03, h / 2, 0]));
      panelGroup.add(createBox(0.06, h, 0.05, materials.blackMullion, [panelW / 2 - 0.03, h / 2, 0]));

      // Integrated vertical flush edge pull handle
      const pull = createBox(0.015, 0.22, 0.02, materials.brassMetal, [panelW / 2 - 0.05, 1.05, 0]);
      panelGroup.add(pull);

      panelGroup.position.set(px, 0, pz);
      group.add(panelGroup);
    }

    group.position.set(pos[0], pos[1], pos[2]);
    return group;
  };

  // Rear Showroom Sliding System (W: 7.5m, H: 2.8m, Z = -7.84)
  doorsGroup.add(createSlidingGlassSystem(7.5, 2.8, [-5.75, 0, -7.84], 3));
  // Rear Kitchen Terrace Sliding System (W: 4.5m, H: 2.8m, Z = -7.84)
  doorsGroup.add(createSlidingGlassSystem(4.5, 2.8, [3.75, 0, -7.84], 3));

  archGroup.add(doorsGroup);

  // =========================================================================
  // 8. ARCHITECTURAL CEILINGS, COFFERS, COVES, HVAC DIFFUSERS & DOWNLIGHTS
  // =========================================================================
  const ceilingGroup = new THREE.Group();
  ceilingGroup.name = 'CeilingsAndDetails';

  // A. Main Continuous Ceiling Slab (Y = 3.20m, 20.0m x 14.5m)
  const mainCeilingSlab = createBox(20.0, 0.16, 14.5, materials.ceiling, [0, 3.28, -0.75], 'MainCeilingSlab');
  ceilingGroup.add(mainCeilingSlab);

  // B. Dropped Coffered Ceiling Soffits with Concealed Warm LED Light Coves
  // 1. Living Room Dropped Soffit (7.2m x 6.2m, Drop: 120mm at Y: 3.14m)
  // 1. Living Room Dropped Soffit (5.4m x 5.8m, Drop: 120mm centered on X = -7.0m, Z = 2.6m)
  const livingSoffit = createBox(5.4, 0.12, 5.8, materials.ceiling, [-7.0, 3.14, 2.6], 'LivingCofferedSoffit');
  const livingCove = createBox(5.6, 0.025, 6.0, materials.ceilingCoveGlow, [-7.0, 3.19, 2.6], 'LivingCoveLED', false, false);
  ceilingGroup.add(livingSoffit, livingCove);

  // 2. Dining Room Dropped Soffit (6.6m x 5.2m, Drop: 120mm at Y: 3.14m)
  const diningSoffit = createBox(6.6, 0.12, 5.2, materials.ceiling, [5.75, 3.14, 3.8], 'DiningCofferedSoffit');
  const diningCove = createBox(6.8, 0.025, 5.4, materials.ceilingCoveGlow, [5.75, 3.19, 3.8], 'DiningCoveLED', false, false);
  ceilingGroup.add(diningSoffit, diningCove);

  // 3. Showroom Suite Dropped Soffit (6.6m x 5.6m, Drop: 120mm at Y: 3.14m)
  const bedSoffit = createBox(6.6, 0.12, 5.6, materials.ceiling, [-5.75, 3.14, -4.5], 'BedCofferedSoffit');
  const bedCove = createBox(6.8, 0.025, 5.8, materials.ceilingCoveGlow, [-5.75, 3.19, -4.5], 'BedCoveLED', false, false);
  ceilingGroup.add(bedSoffit, bedCove);

  // C. Minimalist Continuous HVAC Linear Slot Diffusers (Black twin-slot)
  // Living room diffuser (Centered on X = -7.0m)
  const hvacLiving = createBox(3.2, 0.02, 0.07, materials.hvacDiffuser, [-7.0, 3.07, 5.2], 'HVAC_Living');
  // Dining room diffuser
  const hvacDining = createBox(3.0, 0.02, 0.07, materials.hvacDiffuser, [5.75, 3.07, 6.0], 'HVAC_Dining');
  // Kitchen ceiling slot diffuser
  const hvacKitchen = createBox(3.2, 0.02, 0.07, materials.hvacDiffuser, [5.75, 3.19, -3.5], 'HVAC_Kitchen');
  ceilingGroup.add(hvacLiving, hvacDining, hvacKitchen);

  // D. Symmetrical Recessed Downlight Fixtures (White bezels with warm frosted lenses)
  const createDownlight = (x, z) => {
    const spotGroup = new THREE.Group();
    // Cylindrical outer bezel (90mm diameter)
    const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.015, 16), materials.spotBezel);
    bezel.position.set(0, 0, 0);
    // Glowing frosted inner lens
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.018, 16), materials.spotLensGlow);
    lens.position.set(0, -0.002, 0);
    spotGroup.add(bezel, lens);
    spotGroup.position.set(x, 3.19, z);
    return spotGroup;
  };

  const spotCoordinates = [
    // Entrance Foyer
    [0.0, 3.5], [0.0, 4.8],
    // Living Room Grid (Centered around X = -7.0m, Z = 2.6m)
    [-5.2, 1.2], [-5.2, 4.0], [-8.8, 1.2], [-8.8, 4.0], [-7.0, 2.6],
    // Dining Room Grid
    [4.2, 2.5], [7.2, 2.5], [4.2, 5.0], [7.2, 5.0],
    // Kitchen Grid
    [4.5, -0.5], [7.2, -0.5], [4.5, -3.5], [7.2, -3.5],
    // Showroom Suite Grid
    [-4.2, -3.2], [-7.2, -3.2], [-4.2, -6.0], [-7.2, -6.0],
    // Bathroom
    [-0.25, -4.5], [-0.25, -6.0]
  ];

  spotCoordinates.forEach((coord) => {
    ceilingGroup.add(createDownlight(coord[0], coord[1]));
  });

  archGroup.add(ceilingGroup);

  // =========================================================================
  // 9. REAR GARDEN LANDSCAPE, ARCHITECTURAL PRIVACY SCREEN & PLANTS
  // =========================================================================
  const gardenGroup = new THREE.Group();
  gardenGroup.name = 'GardenAndLandscaping';

  // Architectural Horizontal Slatted Privacy Wall at Z = -16.0m
  const rearScreen = createBox(24.0, 2.8, 0.2, materials.stoneAccentWall, [0, 1.4, -16.0], 'GardenRearBoundaryWall');
  const westScreen = createBox(0.2, 2.8, 8.5, materials.stoneAccentWall, [-12.0, 1.4, -12.0], 'GardenWestBoundaryWall');
  const eastScreen = createBox(0.2, 2.8, 8.5, materials.stoneAccentWall, [12.0, 1.4, -12.0], 'GardenEastBoundaryWall');
  gardenGroup.add(rearScreen, westScreen, eastScreen);

  // Concrete Planter Bed along rear wall
  const planterMat = new THREE.MeshStandardMaterial({ color: 0x27292c, roughness: 0.55 });
  const bambooStemsMat = new THREE.MeshStandardMaterial({ color: 0x486938, roughness: 0.45 });
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x365427, roughness: 0.65 });

  const rearPlanter = createBox(18.0, 0.55, 0.85, planterMat, [0, 0.275, -15.4], 'RearGardenPlanter');
  gardenGroup.add(rearPlanter);

  // Bamboo Clusters in rear planter
  for (let b = -8.0; b <= 8.0; b += 0.75) {
    const bamboo = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 3.4, 8), bambooStemsMat);
    bamboo.position.set(b + (Math.random() - 0.5) * 0.15, 1.7, -15.4 + (Math.random() - 0.5) * 0.15);
    bamboo.castShadow = true;
    gardenGroup.add(bamboo);

    const leafPuff = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38 + Math.random() * 0.2, 1), foliageMat);
    leafPuff.position.set(bamboo.position.x, 2.7 + Math.random() * 0.7, bamboo.position.z);
    leafPuff.scale.set(1.2, 0.8, 1.0);
    leafPuff.castShadow = true;
    gardenGroup.add(leafPuff);
  }

  // Front Porch Architectural Planter Boxes flanking entrance steps
  const frontPlanterL = createBox(1.6, 0.65, 0.85, planterMat, [-2.2, 0.325, 7.2], 'FrontPlanterLeft');
  const frontPlanterR = createBox(1.6, 0.65, 0.85, planterMat, [2.2, 0.325, 7.2], 'FrontPlanterRight');
  gardenGroup.add(frontPlanterL, frontPlanterR);

  // Symmetrical lush plants in front planters
  [
    [-2.6, 0.85, 7.2], [-2.2, 1.0, 7.2], [-1.8, 0.9, 7.2],
    [1.8, 0.9, 7.2], [2.2, 1.0, 7.2], [2.6, 0.85, 7.2]
  ].forEach((pos, idx) => {
    const bush = new THREE.Mesh(new THREE.SphereGeometry(0.34 + (idx % 2) * 0.08, 8, 8), foliageMat);
    bush.position.set(pos[0], pos[1], pos[2]);
    bush.scale.set(1.0, 1.35, 1.0);
    bush.castShadow = true;
    gardenGroup.add(bush);
  });

  // West Garden Planter with Bamboo & Soft Architectural Greenery along terrace
  const westPlanter = createBox(0.8, 0.45, 8.2, planterMat, [-12.6, 0.225, 2.0], 'WestGardenPlanter');
  gardenGroup.add(westPlanter);
  for (let b = -1.5; b <= 5.5; b += 0.85) {
    const bamboo = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 3.2, 8), bambooStemsMat);
    bamboo.position.set(-12.6 + (Math.random() - 0.5) * 0.1, 1.6, b + (Math.random() - 0.5) * 0.15);
    bamboo.castShadow = true;
    gardenGroup.add(bamboo);

    const leafPuff = new THREE.Mesh(new THREE.DodecahedronGeometry(0.36 + Math.random() * 0.15, 1), foliageMat);
    leafPuff.position.set(bamboo.position.x, 2.6 + Math.random() * 0.5, b);
    leafPuff.scale.set(1.15, 0.85, 1.0);
    leafPuff.castShadow = true;
    gardenGroup.add(leafPuff);
  }

  archGroup.add(gardenGroup);

  return {
    group: archGroup,
    ceilingGroup,
    materials,
    frontDoorSystem,
    accessibleDoor: {
      pivot: frontDoorPivot,
      centerPos: new THREE.Vector3(0.0, 1.4, 6.34)
    },
    terraceDoor: {
      pivot: terraceDoorPivot,
      centerPos: new THREE.Vector3(-9.84, 1.4, 1.0)
    }
  };
}
