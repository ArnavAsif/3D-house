import * as THREE from 'three';
import {
  createWoodTexture,
  createTravertineTexture,
  createMarbleTexture,
  createRugTexture,
  createFabricNormalTexture
} from './textureGenerators';

export function buildFurnitureAndProducts(scene, productsCatalog) {
  const furnitureGroup = new THREE.Group();
  furnitureGroup.name = 'FurnitureAndProducts';

  const interactiveMeshes = [];
  const hotspots = [];

  // Textures
  const woodTex = createWoodTexture(false);
  const darkWoodTex = createWoodTexture(true);
  const travertineTex = createTravertineTexture();
  const marbleTex = createMarbleTexture();
  const rugTex = createRugTexture();
  rugTex.repeat.set(2, 2);
  const fabricNormal = createFabricNormalTexture();
  fabricNormal.repeat.set(8, 8);

  // Reusable Materials
  const materials = {
    creamBoucle: new THREE.MeshStandardMaterial({
      color: 0xf0ece1,
      roughness: 0.85,
      metalness: 0.05,
      bumpMap: fabricNormal,
      bumpScale: 0.02,
      name: 'CreamBoucle'
    }),
    saddleLeather: new THREE.MeshStandardMaterial({
      color: 0x94532b,
      roughness: 0.45,
      metalness: 0.1,
      name: 'SaddleLeather'
    }),
    darkWalnut: new THREE.MeshStandardMaterial({
      map: darkWoodTex,
      roughness: 0.35,
      metalness: 0.05,
      name: 'DarkWalnut'
    }),
    naturalOak: new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.4,
      metalness: 0.05,
      name: 'NaturalOak'
    }),
    travertine: new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.35,
      metalness: 0.05,
      name: 'Travertine'
    }),
    calacatta: new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.2,
      metalness: 0.08,
      name: 'CalacattaMarble'
    }),
    matteBlackMetal: new THREE.MeshStandardMaterial({
      color: 0x222326,
      roughness: 0.35,
      metalness: 0.8,
      name: 'MatteBlackMetal'
    }),
    brushedBrass: new THREE.MeshStandardMaterial({
      color: 0xc8a462,
      roughness: 0.28,
      metalness: 0.85,
      name: 'BrushedBrass'
    }),
    livingRug: new THREE.MeshStandardMaterial({
      map: rugTex,
      roughness: 0.95,
      metalness: 0.0,
      name: 'LivingRug'
    }),
    darkCharcoalCabinet: new THREE.MeshStandardMaterial({
      color: 0x2c2d30,
      roughness: 0.4,
      metalness: 0.1,
      name: 'CharcoalCabinet'
    }),
    stainlessSteel: new THREE.MeshStandardMaterial({
      color: 0xd4d8dc,
      roughness: 0.25,
      metalness: 0.9,
      name: 'StainlessSteel'
    }),
    tvScreen: new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.1,
      metalness: 0.9,
      name: 'TVScreen'
    }),
    bedLinen: new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      roughness: 0.9,
      metalness: 0.0,
      name: 'BedLinen'
    }),
    mirrorGlow: new THREE.MeshBasicMaterial({
      color: 0xffedd0,
      name: 'MirrorGlow'
    }),
    hotspotRing: new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    }),
    hotspotCore: new THREE.MeshBasicMaterial({
      color: 0xfff4d6
    })
  };

  const createBox = (w, h, d, mat, pos, castShadow = true, receiveShadow = true) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    return mesh;
  };

  // Helper to tag meshes as interactive and register for raycasting
  const tagInteractive = (meshOrGroup, productId) => {
    meshOrGroup.traverse((child) => {
      if (child.isMesh) {
        child.userData = {
          productId,
          isInteractive: true,
          originalMaterial: child.material
        };
        interactiveMeshes.push(child);
      }
    });
  };

  // Helper to create 3D floating hotspot pins
  const createHotspot = (product) => {
    const group = new THREE.Group();
    group.name = `Hotspot_${product.id}`;

    // Outer pulsing ring
    const ringGeo = new THREE.RingGeometry(0.12, 0.18, 32);
    const ringMesh = new THREE.Mesh(ringGeo, materials.hotspotRing.clone());
    ringMesh.rotation.x = -Math.PI / 2;
    group.add(ringMesh);

    // Inner glowing sphere core
    const coreGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const coreMesh = new THREE.Mesh(coreGeo, materials.hotspotCore);
    group.add(coreMesh);

    // Vertical pin stalk
    const pinGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.25, 8);
    const pinMesh = new THREE.Mesh(pinGeo, materials.brushedBrass);
    pinMesh.position.y = -0.12;
    group.add(pinMesh);

    const px = product.position[0] + product.hotspotOffset[0];
    const py = product.position[1] + product.hotspotOffset[1];
    const pz = product.position[2] + product.hotspotOffset[2];
    group.position.set(px, py, pz);

    group.userData = {
      productId: product.id,
      isHotspot: true,
      baseY: py,
      ringMesh
    };

    hotspots.push(group);
    furnitureGroup.add(group);
  };

  // ==========================================
  // 1. LIVING ROOM FURNITURE
  // ==========================================
  const livingGroup = new THREE.Group();
  livingGroup.name = 'LivingRoomZone';

  // Woven Area Rug (X: -5.6, Z: 2.4, W: 5.5m, D: 4.5m)
  const livingRug = createBox(5.6, 0.015, 4.4, materials.livingRug, [-5.6, 0.01, 2.4], false, true);
  livingGroup.add(livingRug);

  // A. Modular Sectional Sofa ('modular-sectional-sofa')
  const sofaGroup = new THREE.Group();
  sofaGroup.name = 'Product_SectionalSofa';
  // Main back section (length: 3.4m, depth: 1.0m)
  const sofaBase1 = createBox(3.4, 0.24, 1.0, materials.creamBoucle, [-6.2, 0.16, 3.6]);
  const sofaBack1 = createBox(3.4, 0.48, 0.28, materials.creamBoucle, [-6.2, 0.52, 4.0]);
  // Cushions
  const cushion1 = createBox(1.1, 0.16, 0.72, materials.creamBoucle, [-7.3, 0.36, 3.5]);
  const cushion2 = createBox(1.1, 0.16, 0.72, materials.creamBoucle, [-6.2, 0.36, 3.5]);
  const cushion3 = createBox(1.1, 0.16, 0.72, materials.creamBoucle, [-5.1, 0.36, 3.5]);
  // L-Extension / Chaise section (left side: depth 2.2m)
  const sofaBase2 = createBox(1.1, 0.24, 1.5, materials.creamBoucle, [-7.35, 0.16, 2.3]);
  const sofaArmLeft = createBox(0.26, 0.42, 2.2, materials.creamBoucle, [-7.85, 0.44, 2.6]);
  const chaiseCushion = createBox(0.85, 0.16, 1.45, materials.creamBoucle, [-7.35, 0.36, 2.3]);

  sofaGroup.add(sofaBase1, sofaBack1, cushion1, cushion2, cushion3, sofaBase2, sofaArmLeft, chaiseCushion);
  tagInteractive(sofaGroup, 'modular-sectional-sofa');
  livingGroup.add(sofaGroup);

  // B. Modern Accent Lounge Chair ('modern-lounge-chair')
  // Positioned facing sofa conversation area (Pos: [-3.2, 0.0, 1.4], rotated)
  const chairGroup = new THREE.Group();
  chairGroup.name = 'Product_ModernLoungeChair';
  chairGroup.position.set(-3.2, 0.0, 1.4);
  chairGroup.rotation.y = -Math.PI * 0.75; // angled towards coffee table
  // Chair Seat
  const chairSeat = createBox(0.85, 0.18, 0.8, materials.creamBoucle, [0, 0.38, 0]);
  // Curved/angled backrest
  const chairBack = createBox(0.85, 0.52, 0.22, materials.creamBoucle, [0, 0.65, -0.32]);
  // Armrests
  const armL = createBox(0.16, 0.34, 0.78, materials.creamBoucle, [-0.44, 0.54, 0]);
  const armR = createBox(0.16, 0.34, 0.78, materials.creamBoucle, [0.44, 0.54, 0]);
  // Sleek smoked wood / brass legs
  const legMat = materials.darkWalnut;
  const legPositions = [[-0.38, 0.14, -0.32], [0.38, 0.14, -0.32], [-0.38, 0.14, 0.32], [0.38, 0.14, 0.32]];
  legPositions.forEach((lp) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.018, 0.28, 8), legMat);
    leg.position.set(lp[0], lp[1], lp[2]);
    leg.rotation.x = lp[2] > 0 ? 0.12 : -0.12;
    leg.rotation.z = lp[0] > 0 ? -0.12 : 0.12;
    leg.castShadow = true;
    chairGroup.add(leg);
  });
  chairGroup.add(chairSeat, chairBack, armL, armR);
  tagInteractive(chairGroup, 'modern-lounge-chair');
  livingGroup.add(chairGroup);

  // Second Accent Chair for conversational symmetry
  const chair2 = chairGroup.clone();
  chair2.position.set(-3.5, 0.0, 3.2);
  chair2.rotation.y = -Math.PI * 0.45;
  tagInteractive(chair2, 'modern-lounge-chair');
  livingGroup.add(chair2);

  // C. Aura Travertine Coffee Tables ('travertine-coffee-table')
  const tableGroup = new THREE.Group();
  tableGroup.name = 'Product_TravertineCoffeeTables';
  // Large Table: Low pill shape (1.2m x 0.7m, H = 0.32m)
  const largeTableTop = createBox(1.2, 0.08, 0.7, materials.travertine, [-5.2, 0.3, 2.4]);
  const tableLeg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.26, 16), materials.travertine);
  tableLeg1.position.set(-5.6, 0.13, 2.4);
  tableLeg1.castShadow = true;
  const tableLeg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.26, 16), materials.travertine);
  tableLeg2.position.set(-4.8, 0.13, 2.4);
  tableLeg2.castShadow = true;

  // Smaller Nesting Table: Round travertine (D = 0.55m, H = 0.40m)
  const smallTableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 32), materials.travertine);
  smallTableTop.position.set(-4.2, 0.38, 2.8);
  smallTableTop.castShadow = true;
  const smallTableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.35, 16), materials.travertine);
  smallTableLeg.position.set(-4.2, 0.18, 2.8);
  smallTableLeg.castShadow = true;

  tableGroup.add(largeTableTop, tableLeg1, tableLeg2, smallTableTop, smallTableLeg);
  tagInteractive(tableGroup, 'travertine-coffee-table');
  livingGroup.add(tableGroup);

  // D. Nordic Fluted Media Console & TV Wall ('media-slat-credenza')
  const mediaGroup = new THREE.Group();
  mediaGroup.name = 'Product_MediaCredenza';
  // Low console (Pos: [-7.2, 0.25, -1.25], L: 2.6m, H: 0.48m, D: 0.45m)
  const consoleBody = createBox(2.6, 0.44, 0.44, materials.darkWalnut, [-7.2, 0.28, -1.2]);
  // 75-inch Ultra-thin OLED TV mounted on fluted wood wall
  const tvFrame = createBox(1.7, 0.98, 0.04, materials.matteBlackMetal, [-7.2, 1.6, -1.36]);
  const tvGlass = createBox(1.66, 0.94, 0.01, materials.tvScreen, [-7.2, 1.6, -1.33]);
  mediaGroup.add(consoleBody, tvFrame, tvGlass);
  tagInteractive(mediaGroup, 'media-slat-credenza');
  livingGroup.add(mediaGroup);

  // E. Designer Cantilever Arc Floor Lamp ('designer-floor-lamp')
  const lampGroup = new THREE.Group();
  lampGroup.name = 'Product_DesignerFloorLamp';
  lampGroup.position.set(-8.2, 0, 0.6);
  // Marble base
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 24), materials.calacatta);
  lampBase.position.y = 0.06;
  lampBase.castShadow = true;
  lampGroup.add(lampBase);
  // Brass arc stem
  const stemMat = materials.brushedBrass;
  const stem1 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.1, 8), stemMat);
  stem1.position.set(0, 1.1, 0);
  stem1.castShadow = true;
  lampGroup.add(stem1);
  const stemArm = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.2, 8), stemMat);
  stemArm.position.set(0.5, 2.1, 0);
  stemArm.rotation.z = -Math.PI / 3;
  stemArm.castShadow = true;
  lampGroup.add(stemArm);
  // Spun brass dome shade
  const shade = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), stemMat);
  shade.position.set(1.0, 1.9, 0);
  shade.rotation.x = Math.PI;
  shade.castShadow = true;
  lampGroup.add(shade);
  // Diffuser glow
  const bulbGlow = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), materials.mirrorGlow);
  bulbGlow.position.set(1.0, 1.85, 0);
  lampGroup.add(bulbGlow);

  tagInteractive(lampGroup, 'designer-floor-lamp');
  livingGroup.add(lampGroup);

  // Large living room indoor plant (Fiddle leaf fig in white ceramic planter)
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.2, 0.55, 24), materials.calacatta);
  pot.position.set(-8.8, 0.28, 5.4);
  pot.castShadow = true;
  livingGroup.add(pot);
  const plantFoliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.65, 1), new THREE.MeshStandardMaterial({ color: 0x2b4a22, roughness: 0.6 }));
  plantFoliage.position.set(-8.8, 1.1, 5.4);
  plantFoliage.scale.set(0.9, 1.4, 0.9);
  plantFoliage.castShadow = true;
  livingGroup.add(plantFoliage);

  furnitureGroup.add(livingGroup);

  // ==========================================
  // 2. DINING ROOM FURNITURE
  // ==========================================
  const diningGroup = new THREE.Group();
  diningGroup.name = 'DiningZone';

  // A. Solstice 8-Seater Walnut Dining Table ('dining-table-set')
  const diningTableGroup = new THREE.Group();
  diningTableGroup.name = 'Product_DiningTableSet';
  diningTableGroup.position.set(5.8, 0, 4.0);

  // Sculpted beveled walnut tabletop (L: 2.6m, W: 1.05m, H: 0.06m at Y: 0.74m)
  const tabletop = createBox(2.6, 0.06, 1.05, materials.darkWalnut, [0, 0.73, 0]);
  diningTableGroup.add(tabletop);

  // Cylindrical walnut pill legs
  const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.7, 24);
  const dl1 = new THREE.Mesh(legGeo, materials.darkWalnut);
  dl1.position.set(-0.85, 0.35, 0);
  dl1.castShadow = true;
  const dl2 = new THREE.Mesh(legGeo, materials.darkWalnut);
  dl2.position.set(0.85, 0.35, 0);
  dl2.castShadow = true;
  diningTableGroup.add(dl1, dl2);

  tagInteractive(diningTableGroup, 'dining-table-set');
  diningGroup.add(diningTableGroup);

  // B. Koto Dining Armchairs ('dining-armchair') - 8 chairs
  const diningChairGroup = new THREE.Group();
  diningChairGroup.name = 'Product_DiningArmchairGroup';

  const createDiningChair = (pos, rotY) => {
    const chair = new THREE.Group();
    chair.position.set(pos[0], pos[1], pos[2]);
    chair.rotation.y = rotY;
    // Seat cushion
    const seat = createBox(0.48, 0.08, 0.46, materials.creamBoucle, [0, 0.46, 0]);
    // Curved backrest
    const back = createBox(0.48, 0.32, 0.06, materials.creamBoucle, [0, 0.65, -0.2]);
    // Slim walnut legs
    const clPositions = [[-0.2, 0.22, -0.18], [0.2, 0.22, -0.18], [-0.2, 0.22, 0.18], [0.2, 0.22, 0.18]];
    clPositions.forEach((cp) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.014, 0.44, 8), materials.darkWalnut);
      leg.position.set(cp[0], cp[1], cp[2]);
      leg.castShadow = true;
      chair.add(leg);
    });
    chair.add(seat, back);
    return chair;
  };

  // 4 chairs along South side of table (facing North)
  for (let c = -0.9; c <= 0.9; c += 0.6) {
    const chair = createDiningChair([5.8 + c, 0, 4.75], 0);
    diningChairGroup.add(chair);
  }
  // 4 chairs along North side of table (facing South)
  for (let c = -0.9; c <= 0.9; c += 0.6) {
    const chair = createDiningChair([5.8 + c, 0, 3.25], Math.PI);
    diningChairGroup.add(chair);
  }

  tagInteractive(diningChairGroup, 'dining-armchair');
  diningGroup.add(diningChairGroup);

  // C. Halo Architectural Linear Pendant ('linear-pendant-light')
  const pendantGroup = new THREE.Group();
  pendantGroup.name = 'Product_LinearPendant';
  pendantGroup.position.set(5.8, 2.3, 4.0);
  // Slim horizontal luminaire bar (L: 2.0m, H: 0.05m, D: 0.05m)
  const bar = createBox(2.0, 0.05, 0.05, materials.brushedBrass, [0, 0, 0]);
  // Glowing diffuser underside
  const diffuser = createBox(1.96, 0.015, 0.045, materials.mirrorGlow, [0, -0.025, 0]);
  pendantGroup.add(bar, diffuser);
  // Aircraft suspension wires to ceiling
  const wireMat = materials.matteBlackMetal;
  const wire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.9, 6), wireMat);
  wire1.position.set(-0.75, 0.45, 0);
  const wire2 = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.9, 6), wireMat);
  wire2.position.set(0.75, 0.45, 0);
  pendantGroup.add(wire1, wire2);

  tagInteractive(pendantGroup, 'linear-pendant-light');
  diningGroup.add(pendantGroup);

  furnitureGroup.add(diningGroup);

  // ==========================================
  // 3. MODERN KITCHEN
  // ==========================================
  const kitchenGroup = new THREE.Group();
  kitchenGroup.name = 'KitchenZone';

  // A. Monolithic Calacatta Gold Waterfall Island ('calacatta-kitchen-island')
  const islandGroup = new THREE.Group();
  islandGroup.name = 'Product_KitchenIsland';
  islandGroup.position.set(5.8, 0, -1.8);
  // Main countertop slab (L: 3.2m, W: 1.1m, H: 0.08m at Y = 0.90m)
  const islandTop = createBox(3.2, 0.08, 1.1, materials.calacatta, [0, 0.88, 0]);
  // Left waterfall side panel (drops to floor)
  const waterFallLeft = createBox(0.08, 0.84, 1.1, materials.calacatta, [-1.56, 0.42, 0]);
  // Right waterfall side panel
  const waterFallRight = createBox(0.08, 0.84, 1.1, materials.calacatta, [1.56, 0.42, 0]);
  // Base cabinetry block under island (inset on dining side for leg overhang)
  const islandCabinets = createBox(3.04, 0.84, 0.8, materials.darkCharcoalCabinet, [0, 0.42, -0.15]);
  // Undermount sink (black composite cutout)
  const sink = createBox(0.7, 0.02, 0.42, materials.matteBlackMetal, [-0.4, 0.91, -0.1]);
  // Minimalist matte black gooseneck faucet
  const faucetBase = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.38, 12), materials.matteBlackMetal);
  faucetBase.position.set(-0.4, 1.08, -0.32);
  faucetBase.castShadow = true;
  const faucetSpout = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 8, 16, Math.PI), materials.matteBlackMetal);
  faucetSpout.position.set(-0.4, 1.25, -0.22);
  faucetSpout.rotation.y = Math.PI / 2;
  islandGroup.add(islandTop, waterFallLeft, waterFallRight, islandCabinets, sink, faucetBase, faucetSpout);

  tagInteractive(islandGroup, 'calacatta-kitchen-island');
  kitchenGroup.add(islandGroup);

  // B. Linea Leather Counter Barstools ('designer-barstool') - 4 stools
  const barstoolGroup = new THREE.Group();
  barstoolGroup.name = 'Product_BarstoolGroup';

  const createBarstool = (xPos) => {
    const stool = new THREE.Group();
    stool.position.set(xPos, 0, -1.05);
    // Leather padded seat
    const seat = createBox(0.42, 0.06, 0.4, materials.saddleLeather, [0, 0.65, 0]);
    // Low backrest lip
    const backLip = createBox(0.42, 0.16, 0.06, materials.saddleLeather, [0, 0.74, 0.18]);
    // Sled black steel legs & footrest
    const frameMat = materials.matteBlackMetal;
    const l1 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.65, 8), frameMat);
    l1.position.set(-0.18, 0.325, -0.16);
    const l2 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.65, 8), frameMat);
    l2.position.set(0.18, 0.325, -0.16);
    const l3 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.65, 8), frameMat);
    l3.position.set(-0.18, 0.325, 0.16);
    const l4 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.65, 8), frameMat);
    l4.position.set(0.18, 0.325, 0.16);
    // Footrest rail
    const footrail = createBox(0.38, 0.02, 0.02, materials.brushedBrass, [0, 0.22, 0.16]);

    stool.add(seat, backLip, l1, l2, l3, l4, footrail);
    return stool;
  };

  [-0.9, -0.3, 0.3, 0.9].forEach((offset) => {
    barstoolGroup.add(createBarstool(5.8 + offset));
  });

  tagInteractive(barstoolGroup, 'designer-barstool');
  kitchenGroup.add(barstoolGroup);

  // Full-Height Rear Kitchen Cabinetry Wall (Z = -7.35, X: 6.0 to 9.7)
  const rearCabinetry = createBox(3.6, 3.0, 0.65, materials.darkCharcoalCabinet, [7.85, 1.5, -7.35]);
  // Built-in stainless steel double door refrigerator
  const fridge = createBox(1.1, 2.0, 0.05, materials.stainlessSteel, [6.8, 1.0, -7.02]);
  // Built-in wall ovens
  const oven = createBox(0.7, 0.95, 0.05, materials.matteBlackMetal, [8.2, 1.2, -7.02]);
  kitchenGroup.add(rearCabinetry, fridge, oven);

  // Side counter along East wall (X: 9.35, Z: -4.5 to -1.5)
  const sideCounter = createBox(0.65, 0.9, 3.2, materials.calacatta, [9.45, 0.45, -3.2]);
  kitchenGroup.add(sideCounter);

  furnitureGroup.add(kitchenGroup);

  // ==========================================
  // 4. SECONDARY SHOWROOM / MASTER SUITE
  // ==========================================
  const showroomGroup = new THREE.Group();
  showroomGroup.name = 'ShowroomZone';

  // Area Rug under bed (W: 4.0m, D: 3.5m)
  const bedRug = createBox(4.0, 0.015, 3.5, materials.livingRug, [-6.0, 0.01, -4.8], false, true);
  showroomGroup.add(bedRug);

  // A. Kyoto Floating Oak Platform Bed ('platform-bed-suite')
  const bedGroup = new THREE.Group();
  bedGroup.name = 'Product_PlatformBedSuite';
  bedGroup.position.set(-6.0, 0, -5.4);

  // Oak base platform (W: 2.1m, L: 2.2m, H: 0.28m)
  const bedPlatform = createBox(2.1, 0.26, 2.2, materials.naturalOak, [0, 0.13, 0]);
  // Integrated floating nightstand shelves left & right
  const nightstandLeft = createBox(0.55, 0.12, 0.42, materials.naturalOak, [-1.32, 0.28, -0.85]);
  const nightstandRight = createBox(0.55, 0.12, 0.42, materials.naturalOak, [1.32, 0.28, -0.85]);
  // Upholstered headboard
  const headboard = createBox(2.0, 0.75, 0.14, materials.bedLinen, [0, 0.65, -1.05]);
  // Mattress
  const mattress = createBox(1.9, 0.28, 2.0, materials.creamBoucle, [0, 0.38, 0.05]);
  // Folded luxury linen duvet
  const duvet = createBox(1.92, 0.12, 1.4, materials.bedLinen, [0, 0.5, 0.35]);
  // Sleeping pillows (pair)
  const pillow1 = createBox(0.72, 0.14, 0.42, materials.bedLinen, [-0.48, 0.56, -0.7]);
  const pillow2 = createBox(0.72, 0.14, 0.42, materials.bedLinen, [0.48, 0.56, -0.7]);

  bedGroup.add(bedPlatform, nightstandLeft, nightstandRight, headboard, mattress, duvet, pillow1, pillow2);
  tagInteractive(bedGroup, 'platform-bed-suite');
  showroomGroup.add(bedGroup);

  // B. Palma Organic Boucle Accent Chair ('accent-bedroom-armchair')
  const bedArmchairGroup = new THREE.Group();
  bedArmchairGroup.name = 'Product_BedroomAccentChair';
  bedArmchairGroup.position.set(-3.0, 0, -3.2);
  bedArmchairGroup.rotation.y = -Math.PI * 0.25;

  const bedChairSeat = createBox(0.85, 0.22, 0.8, materials.creamBoucle, [0, 0.34, 0]);
  const bedChairBack = createBox(0.85, 0.48, 0.25, materials.creamBoucle, [0, 0.6, -0.3]);
  const bedChairPlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24), materials.darkWalnut);
  bedChairPlinth.position.y = 0.04;
  bedChairPlinth.castShadow = true;

  // Small travertine drink pedestal table next to chair
  const drinkTable = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.48, 24), materials.travertine);
  drinkTable.position.set(0.65, 0.24, -0.2);
  drinkTable.castShadow = true;

  bedArmchairGroup.add(bedChairSeat, bedChairBack, bedChairPlinth, drinkTable);
  tagInteractive(bedArmchairGroup, 'accent-bedroom-armchair');
  showroomGroup.add(bedArmchairGroup);

  // Modern abstract canvas art on the wall
  const artFrame = createBox(1.4, 1.8, 0.04, materials.darkWalnut, [-8.5, 1.8, -1.62]);
  const artCanvas = createBox(1.32, 1.72, 0.01, new THREE.MeshStandardMaterial({ color: 0xdfd8ca, roughness: 0.85 }), [-8.5, 1.8, -1.59]);
  showroomGroup.add(artFrame, artCanvas);

  furnitureGroup.add(showroomGroup);

  // ==========================================
  // 5. LUXURY SPA BATHROOM
  // ==========================================
  const bathGroup = new THREE.Group();
  bathGroup.name = 'BathroomZone';

  // A. Venezia Travertine Floating Double Vanity ('floating-travertine-vanity')
  const vanityGroup = new THREE.Group();
  vanityGroup.name = 'Product_TravertineVanity';
  vanityGroup.position.set(-0.25, 0, -7.2);

  // Floating Travertine counter (W: 1.8m, D: 0.54m, H: 0.35m at Y: 0.55m)
  const vanityCounter = createBox(1.8, 0.35, 0.54, materials.travertine, [0, 0.6, 0]);
  // Twin carved stone basins
  const basin1 = createBox(0.52, 0.12, 0.38, materials.calacatta, [-0.45, 0.82, 0]);
  const basin2 = createBox(0.52, 0.12, 0.38, materials.calacatta, [0.45, 0.82, 0]);
  // Wall-mounted matte black faucets
  const faucet1 = createBox(0.04, 0.04, 0.16, materials.matteBlackMetal, [-0.45, 1.05, -0.22]);
  const faucet2 = createBox(0.04, 0.04, 0.16, materials.matteBlackMetal, [0.45, 1.05, -0.22]);

  // Large illuminated LED Backlit Pill Mirror
  const mirrorFrame = createBox(1.6, 0.95, 0.03, materials.matteBlackMetal, [0, 1.8, -0.24]);
  const mirrorGlass = createBox(1.54, 0.89, 0.01, materials.mirrorGlow, [0, 1.8, -0.22]);

  vanityGroup.add(vanityCounter, basin1, basin2, faucet1, faucet2, mirrorFrame, mirrorGlass);
  tagInteractive(vanityGroup, 'floating-travertine-vanity');
  bathGroup.add(vanityGroup);

  // Walk-in Shower Enclosure (X: -1.8 to -0.6, Z: -7.5 to -5.2)
  // Frameless fluted glass screen
  const showerGlassScreen = createBox(0.02, 2.4, 1.5, materials.calacatta, [-0.6, 1.2, -6.1], false, false);
  showerGlassScreen.material = new THREE.MeshPhysicalMaterial({
    transmission: 0.88,
    roughness: 0.25,
    ior: 1.5,
    transparent: true,
    opacity: 0.8
  });
  // Overhead matte black ceiling rain shower head
  const showerArm = createBox(0.03, 0.4, 0.03, materials.matteBlackMetal, [-1.3, 2.7, -6.5]);
  const showerHead = createBox(0.35, 0.02, 0.35, materials.matteBlackMetal, [-1.3, 2.5, -6.5]);
  bathGroup.add(showerGlassScreen, showerArm, showerHead);

  // Wall-hung toilet (X: 0.9, Z: -5.5)
  const toilet = createBox(0.42, 0.42, 0.58, materials.calacatta, [0.9, 0.38, -5.5]);
  bathGroup.add(toilet);

  furnitureGroup.add(bathGroup);

  // ==========================================
  // 6. ENTRANCE HALLWAY & FOYER CONSOLE
  // ==========================================
  const foyerGroup = new THREE.Group();
  foyerGroup.name = 'FoyerZone';

  // Architectural Foyer console table (Pos: [0.0, 0, 4.2], against pillar or divider)
  const consoleTable = createBox(1.6, 0.78, 0.38, materials.naturalOak, [0.0, 0.42, 5.7]);
  // Sculptural ceramic vase with dried pampas grass
  const foyerVase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.42, 16), materials.travertine);
  foyerVase.position.set(0.0, 0.98, 5.7);
  foyerVase.castShadow = true;
  foyerGroup.add(consoleTable, foyerVase);

  furnitureGroup.add(foyerGroup);

  // Generate 3D Hotspot Pins for all products in catalog
  productsCatalog.forEach((product) => {
    createHotspot(product);
  });

  return {
    group: furnitureGroup,
    interactiveMeshes,
    hotspots
  };
}
