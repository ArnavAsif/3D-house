import * as THREE from 'three';
import {
  createWoodTexture,
  createTravertineTexture,
  createMarbleTexture,
  createRugTexture,
  createFabricNormalTexture,
  createAbstractArtTexture,
  createAbstractArtTexture2
} from './textureGenerators';

export function buildFurnitureAndProducts(scene, productsCatalog) {
  const furnitureGroup = new THREE.Group();
  furnitureGroup.name = 'LuxuryContemporaryInterior';

  const interactiveMeshes = [];
  const hotspots = [];

  // =========================================================================
  // 1. TEXTURES & EDITORIAL LUXURY MATERIALS
  // =========================================================================
  const woodTex = createWoodTexture(false);
  woodTex.repeat.set(2, 2);

  const darkWoodTex = createWoodTexture(true);
  darkWoodTex.repeat.set(2, 2);

  const travertineTex = createTravertineTexture();
  travertineTex.repeat.set(2, 2);

  const marbleTex = createMarbleTexture();
  marbleTex.repeat.set(3, 2);

  const rugTex = createRugTexture();
  rugTex.repeat.set(2, 2);

  const fabricNormal = createFabricNormalTexture();
  fabricNormal.repeat.set(8, 8);

  const artTex1 = createAbstractArtTexture();
  const artTex2 = createAbstractArtTexture2();

  const materials = {
    // Upholstery Fabrics
    creamBoucle: new THREE.MeshStandardMaterial({
      color: 0xf2eee5,
      roughness: 0.88,
      metalness: 0.02,
      bumpMap: fabricNormal,
      bumpScale: 0.025,
      name: 'TexturedCreamBoucle'
    }),
    oatLinen: new THREE.MeshStandardMaterial({
      color: 0xd8cebc,
      roughness: 0.82,
      metalness: 0.02,
      bumpMap: fabricNormal,
      bumpScale: 0.018,
      name: 'OatLinenFabric'
    }),
    cognacLeather: new THREE.MeshStandardMaterial({
      color: 0x93552e,
      roughness: 0.42,
      metalness: 0.08,
      name: 'CognacSaddleLeather'
    }),
    charcoalVelvet: new THREE.MeshStandardMaterial({
      color: 0x2e2f32,
      roughness: 0.7,
      metalness: 0.05,
      name: 'CharcoalVelvet'
    }),
    throwBlanket: new THREE.MeshStandardMaterial({
      color: 0xb5a593,
      roughness: 0.95,
      metalness: 0.0,
      bumpMap: fabricNormal,
      bumpScale: 0.03,
      name: 'CashmereThrow'
    }),

    // Woods
    naturalOak: new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.38,
      metalness: 0.04,
      name: 'WarmNaturalOak'
    }),
    smokedWalnut: new THREE.MeshStandardMaterial({
      map: darkWoodTex,
      roughness: 0.35,
      metalness: 0.04,
      name: 'SmokedWalnut'
    }),

    // Stones & Marbles
    travertine: new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.32,
      metalness: 0.04,
      name: 'HonedRomanTravertine'
    }),
    calacatta: new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.18,
      metalness: 0.06,
      name: 'CalacattaGoldMarble'
    }),

    // Metals
    matteBlackMetal: new THREE.MeshStandardMaterial({
      color: 0x1e1f22,
      roughness: 0.32,
      metalness: 0.85,
      name: 'MatteBlackMetal'
    }),
    brushedBrass: new THREE.MeshStandardMaterial({
      color: 0xc8a462,
      roughness: 0.24,
      metalness: 0.92,
      name: 'BrushedChampagneBrass'
    }),
    subtleBronze: new THREE.MeshStandardMaterial({
      color: 0x6e5743,
      roughness: 0.28,
      metalness: 0.88,
      name: 'SubtleArchitecturalBronze'
    }),
    stainlessSteel: new THREE.MeshStandardMaterial({
      color: 0xd2d6dc,
      roughness: 0.22,
      metalness: 0.92,
      name: 'BrushedStainlessSteel'
    }),

    // Millwork & Cabinetry
    darkCharcoalCabinet: new THREE.MeshStandardMaterial({
      color: 0x242528,
      roughness: 0.42,
      metalness: 0.08,
      name: 'MatteCharcoalMillwork'
    }),

    // Art, Ceramics & Decorative Objects
    artCanvas1: new THREE.MeshStandardMaterial({
      map: artTex1,
      roughness: 0.85,
      metalness: 0.0,
      name: 'MinimalistArtCanvas1'
    }),
    artCanvas2: new THREE.MeshStandardMaterial({
      map: artTex2,
      roughness: 0.85,
      metalness: 0.0,
      name: 'MinimalistArtCanvas2'
    }),
    matteCeramicWhite: new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.65,
      metalness: 0.02,
      name: 'ArtisanalWhiteCeramic'
    }),
    matteCeramicTerracotta: new THREE.MeshStandardMaterial({
      color: 0xb46b4c,
      roughness: 0.72,
      metalness: 0.02,
      name: 'TerracottaCeramic'
    }),
    amberGlass: new THREE.MeshPhysicalMaterial({
      color: 0xc8924b,
      transmission: 0.85,
      roughness: 0.1,
      ior: 1.5,
      transparent: true,
      opacity: 0.75,
      name: 'AmberBlownGlass'
    }),
    smokedGlass: new THREE.MeshPhysicalMaterial({
      color: 0x484b50,
      transmission: 0.88,
      roughness: 0.12,
      ior: 1.5,
      transparent: true,
      opacity: 0.8,
      name: 'SmokedGlass'
    }),

    // Rugs & Linens
    livingRug: new THREE.MeshStandardMaterial({
      map: rugTex,
      roughness: 0.96,
      metalness: 0.0,
      name: 'CustomBerberWoolRug'
    }),
    bedLinen: new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      roughness: 0.9,
      metalness: 0.0,
      bumpMap: fabricNormal,
      bumpScale: 0.02,
      name: 'CrispBelgianLinen'
    }),

    // Lighting & Electronics
    tvScreen: new THREE.MeshStandardMaterial({
      color: 0x060608,
      roughness: 0.08,
      metalness: 0.95,
      name: 'OLEDGlassScreen'
    }),
    luminaireGlow: new THREE.MeshBasicMaterial({
      color: 0xffeed5,
      name: 'WarmDiffusedLuminaireGlow'
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

  const createHotspot = (product) => {
    const group = new THREE.Group();
    group.name = `Hotspot_${product.id}`;

    const ringGeo = new THREE.RingGeometry(0.12, 0.18, 32);
    const ringMesh = new THREE.Mesh(ringGeo, materials.hotspotRing.clone());
    ringMesh.rotation.x = -Math.PI / 2;
    group.add(ringMesh);

    const coreGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const coreMesh = new THREE.Mesh(coreGeo, materials.hotspotCore);
    group.add(coreMesh);

    const pinGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.24, 8);
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

  // =========================================================================
  // 1. OPEN-PLAN LIVING ROOM (Editorial Modern Luxury Lounge)
  // =========================================================================
  const livingGroup = new THREE.Group();
  livingGroup.name = 'LivingRoomZone';

  // A. Custom Hand-Knotted Berber Wool Area Rug (W: 6.0m, D: 4.8m)
  // Position: [-5.6, 0.01, 2.5]
  const livingRug = createBox(6.0, 0.018, 4.8, materials.livingRug, [-5.6, 0.009, 2.5], false, true);
  livingGroup.add(livingRug);

  // B. Large Low-Profile Modular Sectional Sofa ('modular-sectional-sofa')
  // Centered at X = -6.2, Z = 3.4. Leaves generous 1.8m+ walking paths on all sides.
  const sofaGroup = new THREE.Group();
  sofaGroup.name = 'Product_SectionalSofa';

  // Architectural recessed oak shadow plinth base (H = 60mm)
  const sofaPlinth1 = createBox(3.4, 0.06, 1.0, materials.naturalOak, [-6.2, 0.03, 3.6]);
  const sofaPlinth2 = createBox(1.1, 0.06, 1.4, materials.naturalOak, [-7.35, 0.03, 2.4]);

  // Main seating base bench (H = 220mm, upholstered in cream boucle)
  const sofaBaseMain = createBox(3.4, 0.22, 1.0, materials.creamBoucle, [-6.2, 0.17, 3.6]);
  const sofaBaseChaise = createBox(1.1, 0.22, 1.4, materials.creamBoucle, [-7.35, 0.17, 2.4]);

  // Plush seat cushions with soft piping (H = 140mm)
  const seatCushion1 = createBox(1.1, 0.14, 0.76, materials.creamBoucle, [-5.1, 0.35, 3.5]);
  const seatCushion2 = createBox(1.1, 0.14, 0.76, materials.creamBoucle, [-6.2, 0.35, 3.5]);
  const seatCushion3 = createBox(1.1, 0.14, 0.76, materials.creamBoucle, [-7.3, 0.35, 3.5]);
  const chaiseCushion = createBox(0.88, 0.14, 1.36, materials.creamBoucle, [-7.35, 0.35, 2.38]);

  // Low architectural backrest (H = 460mm, D = 260mm)
  const sofaBack = createBox(3.4, 0.46, 0.26, materials.creamBoucle, [-6.2, 0.51, 4.0]);
  const sofaArm = createBox(0.24, 0.42, 2.2, materials.creamBoucle, [-7.83, 0.43, 2.6]);

  // Curated scatter cushions (Cognac leather, Oat linen, Boucle)
  const pillow1 = createBox(0.48, 0.36, 0.14, materials.cognacLeather, [-5.3, 0.52, 3.82]);
  pillow1.rotation.y = 0.15;
  const pillow2 = createBox(0.44, 0.34, 0.12, materials.oatLinen, [-6.4, 0.52, 3.82]);
  pillow2.rotation.y = -0.1;
  const pillow3 = createBox(0.46, 0.34, 0.12, materials.cognacLeather, [-7.65, 0.52, 3.4]);
  pillow3.rotation.y = Math.PI / 4;

  // Draped folded cashmere throw blanket on chaise
  const throwDrape = createBox(0.65, 0.04, 0.95, materials.throwBlanket, [-7.35, 0.43, 1.85]);

  sofaGroup.add(
    sofaPlinth1, sofaPlinth2, sofaBaseMain, sofaBaseChaise,
    seatCushion1, seatCushion2, seatCushion3, chaiseCushion,
    sofaBack, sofaArm, pillow1, pillow2, pillow3, throwDrape
  );
  tagInteractive(sofaGroup, 'modular-sectional-sofa');
  livingGroup.add(sofaGroup);

  // C. Modern Sculptural Lounge Chairs ('modern-lounge-chair')
  // Chair 1: Angled towards the coffee table (Pos: [-3.2, 0.0, 1.4], Rot: -135 deg)
  const chairGroup1 = new THREE.Group();
  chairGroup1.name = 'Product_ModernLoungeChair1';
  chairGroup1.position.set(-3.2, 0.0, 1.4);
  chairGroup1.rotation.y = -Math.PI * 0.72;

  // Sculptural curved seat & wrap-around backrest
  const c1Seat = createBox(0.84, 0.18, 0.8, materials.creamBoucle, [0, 0.36, 0]);
  const c1Back = createBox(0.84, 0.52, 0.22, materials.creamBoucle, [0, 0.64, -0.32]);
  const c1ArmL = createBox(0.15, 0.32, 0.76, materials.creamBoucle, [-0.43, 0.53, 0]);
  const c1ArmR = createBox(0.15, 0.32, 0.76, materials.creamBoucle, [0.43, 0.53, 0]);
  const c1Lumbar = createBox(0.48, 0.24, 0.1, materials.oatLinen, [0, 0.52, -0.22]);

  // Tapered smoked walnut legs with brushed brass caps
  const legPositions = [[-0.36, -0.32], [0.36, -0.32], [-0.36, 0.32], [0.36, 0.32]];
  legPositions.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.016, 0.26, 8), materials.smokedWalnut);
    leg.position.set(lx, 0.13, lz);
    leg.rotation.x = lz > 0 ? 0.1 : -0.1;
    leg.rotation.z = lx > 0 ? -0.1 : 0.1;
    leg.castShadow = true;
    chairGroup1.add(leg);

    // Brass ferrule tip
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.016, 0.04, 8), materials.brushedBrass);
    ferrule.position.set(lx, 0.02, lz);
    chairGroup1.add(ferrule);
  });
  chairGroup1.add(c1Seat, c1Back, c1ArmL, c1ArmR, c1Lumbar);
  tagInteractive(chairGroup1, 'modern-lounge-chair');
  livingGroup.add(chairGroup1);

  // Chair 2: Second sculptural companion chair angled symmetrically
  const chairGroup2 = chairGroup1.clone();
  chairGroup2.position.set(-3.5, 0.0, 3.2);
  chairGroup2.rotation.y = -Math.PI * 0.42;
  tagInteractive(chairGroup2, 'modern-lounge-chair');
  livingGroup.add(chairGroup2);

  // D. Koto Dual Travertine Coffee Tables ('travertine-coffee-table')
  const coffeeTableGroup = new THREE.Group();
  coffeeTableGroup.name = 'Product_TravertineCoffeeTables';

  // Table 1: Low capsule / pill shape ($1.25m x 0.70m, H = 0.30m)
  const t1Top = createBox(1.25, 0.07, 0.7, materials.travertine, [-5.2, 0.28, 2.4]);
  const t1LegL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.24, 24), materials.travertine);
  t1LegL.position.set(-5.6, 0.12, 2.4);
  t1LegL.castShadow = true;
  const t1LegR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.24, 24), materials.travertine);
  t1LegR.position.set(-4.8, 0.12, 2.4);
  t1LegR.castShadow = true;

  // Table 2: Circular pedestal nesting table ($0.60m diameter, H = 0.38m)
  const t2Top = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32), materials.travertine);
  t2Top.position.set(-4.25, 0.36, 2.85);
  t2Top.castShadow = true;
  const t2Pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.33, 24), materials.travertine);
  t2Pedestal.position.set(-4.25, 0.17, 2.85);
  t2Pedestal.castShadow = true;

  // Tabletop Curated Styling
  // 1. Heavy Roman Travertine Catchall Tray
  const tray = createBox(0.32, 0.02, 0.22, materials.travertine, [-5.3, 0.33, 2.35]);
  // 2. Sculptural artisanal ceramic bowl
  const ceramicBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.04, 0.05, 16), materials.matteCeramicWhite);
  ceramicBowl.position.set(-5.3, 0.36, 2.35);
  // 3. Stack of two architectural art monographs (Minimalism & Architecture)
  const book1 = createBox(0.24, 0.022, 0.18, materials.darkCharcoalCabinet, [-5.0, 0.33, 2.5]);
  const book2 = createBox(0.22, 0.018, 0.16, materials.oatLinen, [-5.0, 0.35, 2.5]);
  book2.rotation.y = 0.12;
  // 4. Subtle bronze candle holder
  const candleBronze = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.08, 12), materials.subtleBronze);
  candleBronze.position.set(-4.25, 0.43, 2.85);

  coffeeTableGroup.add(t1Top, t1LegL, t1LegR, t2Top, t2Pedestal, tray, ceramicBowl, book1, book2, candleBronze);
  tagInteractive(coffeeTableGroup, 'travertine-coffee-table');
  livingGroup.add(coffeeTableGroup);

  // E. Nordic Fluted Media Console & OLED Screen ('media-slat-credenza')
  const mediaGroup = new THREE.Group();
  mediaGroup.name = 'Product_MediaCredenza';

  // Low credenza body (Pos: [-7.15, 0.28, -1.22], L: 2.6m, H: 0.44m, D: 0.42m)
  const consoleBody = createBox(2.6, 0.42, 0.42, materials.smokedWalnut, [-7.15, 0.28, -1.22]);
  const consoleBronzeShadow = createBox(2.64, 0.015, 0.44, materials.subtleBronze, [-7.15, 0.49, -1.22]);

  // Frameless Ultra-Thin OLED TV Display (75-inch, 1.68m W x 0.96m H x 25mm D)
  const tvFrame = createBox(1.68, 0.96, 0.025, materials.matteBlackMetal, [-7.15, 1.58, -1.37]);
  const tvGlass = createBox(1.65, 0.93, 0.008, materials.tvScreen, [-7.15, 1.58, -1.35]);

  // Media Console Decorative Shelf Styling
  const mediaVase = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 0.24, 16), materials.matteCeramicWhite);
  mediaVase.position.set(-8.1, 0.62, -1.22);
  const mediaCarafe = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.18, 16), materials.smokedGlass);
  mediaCarafe.position.set(-6.1, 0.59, -1.22);

  mediaGroup.add(consoleBody, consoleBronzeShadow, tvFrame, tvGlass, mediaVase, mediaCarafe);
  tagInteractive(mediaGroup, 'media-slat-credenza');
  livingGroup.add(mediaGroup);

  // F. Archimede Cantilever Arc Floor Lamp ('designer-floor-lamp')
  const lampGroup = new THREE.Group();
  lampGroup.name = 'Product_DesignerFloorLamp';
  lampGroup.position.set(-8.2, 0, 0.6);

  // Solid Calacatta marble cylindrical stabilizing base (D = 0.36m, H = 0.14m)
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.14, 24), materials.calacatta);
  lampBase.position.y = 0.07;
  lampBase.castShadow = true;
  lampGroup.add(lampBase);

  // Slender brushed brass arch stem & arm
  const stemVertical = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 2.1, 8), materials.brushedBrass);
  stemVertical.position.set(0, 1.12, 0);
  stemVertical.castShadow = true;
  lampGroup.add(stemVertical);

  const stemArch = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.3, 8), materials.brushedBrass);
  stemArch.position.set(0.55, 2.12, 0);
  stemArch.rotation.z = -Math.PI / 3;
  stemArch.castShadow = true;
  lampGroup.add(stemArch);

  // Spun champagne brass dome shade
  const shade = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), materials.brushedBrass);
  shade.position.set(1.15, 1.95, 0);
  shade.rotation.x = Math.PI;
  shade.castShadow = true;
  lampGroup.add(shade);

  // Warm glowing optical diffuser
  const lampDiffuser = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), materials.luminaireGlow);
  lampDiffuser.position.set(1.15, 1.9, 0);
  lampGroup.add(lampDiffuser);

  tagInteractive(lampGroup, 'designer-floor-lamp');
  livingGroup.add(lampGroup);

  // G. Statement Indoor Fiddle Leaf Fig Tree (*Ficus lyrata*)
  const figPot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.6, 24), materials.matteCeramicWhite);
  figPot.position.set(-8.8, 0.3, 5.2);
  figPot.castShadow = true;
  livingGroup.add(figPot);

  const figTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.8, 8), materials.smokedWalnut);
  figTrunk.position.set(-8.8, 1.2, 5.2);
  figTrunk.castShadow = true;
  livingGroup.add(figTrunk);

  // Sculptural broad green leaves
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x2d4822, roughness: 0.55 });
  [-0.2, 0.0, 0.2].forEach((ox, idx) => {
    const leafCluster = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45 + idx * 0.05, 1), foliageMat);
    leafCluster.position.set(-8.8 + ox, 1.8 + idx * 0.25, 5.2 + (idx % 2 === 0 ? 0.1 : -0.1));
    leafCluster.scale.set(1.1, 0.9, 1.0);
    leafCluster.castShadow = true;
    livingGroup.add(leafCluster);
  });

  furnitureGroup.add(livingGroup);

  // =========================================================================
  // 2. DINING ROOM (Formal Entertaining & Architectural Table Setting)
  // =========================================================================
  const diningGroup = new THREE.Group();
  diningGroup.name = 'DiningZone';

  // A. Solstice 8-Seater Walnut Dining Table ('dining-table-set')
  // Centered at X = 5.8, Z = 4.0. Generous 1.6m+ clearance on all 4 sides.
  const diningTableGroup = new THREE.Group();
  diningTableGroup.name = 'Product_DiningTableSet';
  diningTableGroup.position.set(5.8, 0, 4.0);

  // Boat-shaped beveled tabletop in solid smoked walnut (2.60m L x 1.05m W x 60mm H at Y = 0.74m)
  const tabletop = createBox(2.6, 0.06, 1.05, materials.smokedWalnut, [0, 0.73, 0]);
  diningTableGroup.add(tabletop);

  // Monumental cylindrical walnut pill legs (D = 0.26m)
  const legGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.7, 24);
  const dl1 = new THREE.Mesh(legGeo, materials.smokedWalnut);
  dl1.position.set(-0.85, 0.35, 0);
  dl1.castShadow = true;
  const dl2 = new THREE.Mesh(legGeo, materials.smokedWalnut);
  dl2.position.set(0.85, 0.35, 0);
  dl2.castShadow = true;
  diningTableGroup.add(dl1, dl2);

  // Tabletop Curated Minimalist Centerpiece Styling
  const tableRunner = createBox(2.4, 0.005, 0.34, materials.oatLinen, [0, 0.763, 0], false, true);
  const ceramicCenterpiece = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.05, 0.22, 16), materials.matteCeramicWhite);
  ceramicCenterpiece.position.set(0, 0.88, 0);
  const bronzeCandelabra1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.16, 8), materials.subtleBronze);
  bronzeCandelabra1.position.set(-0.45, 0.84, 0);
  const bronzeCandelabra2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.12, 8), materials.subtleBronze);
  bronzeCandelabra2.position.set(0.45, 0.82, 0);

  diningTableGroup.add(tableRunner, ceramicCenterpiece, bronzeCandelabra1, bronzeCandelabra2);
  tagInteractive(diningTableGroup, 'dining-table-set');
  diningGroup.add(diningTableGroup);

  // B. Koto Dining Armchairs ('dining-armchair') - 8 Tailored Chairs
  const diningChairGroup = new THREE.Group();
  diningChairGroup.name = 'Product_DiningArmchairGroup';

  const createDiningArmchair = (pos, rotY) => {
    const chair = new THREE.Group();
    chair.position.set(pos[0], pos[1], pos[2]);
    chair.rotation.y = rotY;

    // Curved padded backrest in oat linen
    const backrest = createBox(0.48, 0.32, 0.08, materials.oatLinen, [0, 0.65, -0.2]);
    // High-resilience seat cushion
    const seat = createBox(0.48, 0.08, 0.46, materials.oatLinen, [0, 0.46, 0]);
    // Low armrest returns
    const armL = createBox(0.05, 0.16, 0.34, materials.smokedWalnut, [-0.22, 0.54, -0.05]);
    const armR = createBox(0.05, 0.16, 0.34, materials.smokedWalnut, [0.22, 0.54, -0.05]);

    // Slim tapered smoked walnut legs
    const clPositions = [[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]];
    clPositions.forEach(([cx, cz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.012, 0.44, 8), materials.smokedWalnut);
      leg.position.set(cx, 0.22, cz);
      leg.castShadow = true;
      chair.add(leg);
    });

    chair.add(backrest, seat, armL, armR);
    return chair;
  };

  // 4 chairs along South edge (facing North)
  for (let c = -0.9; c <= 0.9; c += 0.6) {
    diningChairGroup.add(createDiningArmchair([5.8 + c, 0, 4.75], 0));
  }
  // 4 chairs along North edge (facing South)
  for (let c = -0.9; c <= 0.9; c += 0.6) {
    diningChairGroup.add(createDiningArmchair([5.8 + c, 0, 3.25], Math.PI));
  }

  tagInteractive(diningChairGroup, 'dining-armchair');
  diningGroup.add(diningChairGroup);

  // C. Halo Architectural Linear Pendant ('linear-pendant-light')
  const pendantGroup = new THREE.Group();
  pendantGroup.name = 'Product_LinearPendant';
  pendantGroup.position.set(5.8, 2.3, 4.0);

  // Minimal extruded aluminum bar with brushed champagne brass finish (2.0m L x 50mm W x 50mm H)
  const luminaireBar = createBox(2.0, 0.05, 0.05, materials.brushedBrass, [0, 0, 0]);
  // Downward optical acrylic diffuser lens
  const downDiffuser = createBox(1.96, 0.015, 0.045, materials.luminaireGlow, [0, -0.025, 0]);
  // Upward ambient ceiling glow lens
  const upDiffuser = createBox(1.96, 0.012, 0.045, materials.luminaireGlow, [0, 0.025, 0]);

  // Ultra-fine aircraft suspension wires to ceiling
  const w1 = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.9, 6), materials.matteBlackMetal);
  w1.position.set(-0.75, 0.45, 0);
  const w2 = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.9, 6), materials.matteBlackMetal);
  w2.position.set(0.75, 0.45, 0);

  pendantGroup.add(luminaireBar, downDiffuser, upDiffuser, w1, w2);
  tagInteractive(pendantGroup, 'linear-pendant-light');
  diningGroup.add(pendantGroup);

  // D. Large Potted Architectural Olive Tree near dining window
  const olivePot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.52, 24), materials.matteCeramicWhite);
  olivePot.position.set(8.8, 0.26, 6.0);
  olivePot.castShadow = true;
  diningGroup.add(olivePot);

  const oliveTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 1.5, 8), materials.smokedWalnut);
  oliveTrunk.position.set(8.8, 1.0, 6.0);
  oliveTrunk.castShadow = true;
  diningGroup.add(oliveTrunk);

  const oliveFoliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 1), new THREE.MeshStandardMaterial({ color: 0x48583c, roughness: 0.6 }));
  oliveFoliage.position.set(8.8, 1.7, 6.0);
  oliveFoliage.scale.set(1.1, 0.95, 1.0);
  oliveFoliage.castShadow = true;
  diningGroup.add(oliveFoliage);

  furnitureGroup.add(diningGroup);

  // =========================================================================
  // 3. MODERN KITCHEN (Gourmet Chef Kitchen & Waterfall Island)
  // =========================================================================
  const kitchenGroup = new THREE.Group();
  kitchenGroup.name = 'KitchenZone';

  // A. Monolithic Calacatta Gold Waterfall Island ('calacatta-kitchen-island')
  // Centered at X = 5.8, Z = -1.8. Clear 1.7m walking space between island & back cabinetry.
  const islandGroup = new THREE.Group();
  islandGroup.name = 'Product_KitchenIsland';
  islandGroup.position.set(5.8, 0, -1.8);

  // Thick waterfall countertop slab (3.2m L x 1.1m W x 80mm H at Y = 0.88m)
  const islandTop = createBox(3.2, 0.08, 1.1, materials.calacatta, [0, 0.88, 0]);
  // Left waterfall end slab dropping flush to the floor
  const waterfallL = createBox(0.08, 0.84, 1.1, materials.calacatta, [-1.56, 0.42, 0]);
  // Right waterfall end slab
  const waterfallR = createBox(0.08, 0.84, 1.1, materials.calacatta, [1.56, 0.42, 0]);

  // Integrated matte charcoal cabinetry base block (inset 250mm on dining side for barstool overhang)
  const islandCabinets = createBox(3.04, 0.84, 0.82, materials.darkCharcoalCabinet, [0, 0.42, -0.14]);
  // Concealed under-counter warm LED ribbon along island seating overhang
  const islandLed = createBox(3.0, 0.015, 0.02, materials.luminaireGlow, [0, 0.83, 0.27], false, false);

  // Undermount matte black prep sink & architectural gooseneck faucet
  const sinkLedge = createBox(0.68, 0.02, 0.44, materials.matteBlackMetal, [-0.4, 0.91, -0.12]);
  const faucetBase = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 12), materials.matteBlackMetal);
  faucetBase.position.set(-0.4, 1.08, -0.32);
  faucetBase.castShadow = true;
  const faucetArch = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.014, 8, 16, Math.PI), materials.matteBlackMetal);
  faucetArch.position.set(-0.4, 1.25, -0.21);
  faucetArch.rotation.y = Math.PI / 2;

  // Island Tabletop Curated Styling
  // 1. Large artisanal footed ceramic bowl with organic fruit
  const fruitBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.08, 0.09, 16), materials.matteCeramicWhite);
  fruitBowl.position.set(0.6, 0.96, 0.0);
  fruitBowl.castShadow = true;
  // Green pears & citrus in bowl
  const fruit1 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshStandardMaterial({ color: 0x8a9a4b, roughness: 0.5 }));
  fruit1.position.set(0.6, 1.02, 0.0);
  const fruit2 = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), new THREE.MeshStandardMaterial({ color: 0xd8a93a, roughness: 0.5 }));
  fruit2.position.set(0.64, 1.01, 0.04);

  // 2. Walnut butcher block with brass handle
  const cuttingBoard = createBox(0.42, 0.03, 0.28, materials.smokedWalnut, [1.05, 0.935, -0.1]);
  // 3. Small marble mortar & pestle
  const mortar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.06, 12), materials.calacatta);
  mortar.position.set(1.05, 0.98, -0.1);

  islandGroup.add(
    islandTop, waterfallL, waterfallR, islandCabinets, islandLed,
    sinkLedge, faucetBase, faucetArch, fruitBowl, fruit1, fruit2, cuttingBoard, mortar
  );
  tagInteractive(islandGroup, 'calacatta-kitchen-island');
  kitchenGroup.add(islandGroup);

  // B. Trio of Suspended Drop Pendant Lights above Island
  [-0.85, 0.0, 0.85].forEach((px) => {
    const dropGroup = new THREE.Group();
    dropGroup.position.set(5.8 + px, 2.4, -1.8);
    // Brass / black cylindrical pendant body (D = 70mm, H = 220mm)
    const pBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 16), materials.brushedBrass);
    pBody.castShadow = true;
    const pLens = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16), materials.luminaireGlow);
    pLens.position.y = -0.11;
    // Slim suspension cord to ceiling
    const pCord = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.8, 6), materials.matteBlackMetal);
    pCord.position.y = 0.5;
    dropGroup.add(pBody, pLens, pCord);
    kitchenGroup.add(dropGroup);
  });

  // C. Linea Leather Counter Barstools ('designer-barstool') - 4 Stools
  const barstoolGroup = new THREE.Group();
  barstoolGroup.name = 'Product_BarstoolGroup';

  const createBarstool = (xPos) => {
    const stool = new THREE.Group();
    stool.position.set(xPos, 0, -1.05);

    // Cognac saddle leather padded seat (Y = 0.65m)
    const seat = createBox(0.42, 0.06, 0.4, materials.cognacLeather, [0, 0.65, 0]);
    // Ergonomic low lumbar back lip
    const backLip = createBox(0.42, 0.16, 0.06, materials.cognacLeather, [0, 0.74, 0.18]);

    // Slender matte black steel sled frame
    const frameMat = materials.matteBlackMetal;
    [[-0.18, -0.16], [0.18, -0.16], [-0.18, 0.16], [0.18, 0.16]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.65, 8), frameMat);
      leg.position.set(lx, 0.325, lz);
      leg.castShadow = true;
      stool.add(leg);
    });

    // Brushed champagne brass footrest rail
    const footrail = createBox(0.38, 0.02, 0.02, materials.brushedBrass, [0, 0.22, 0.16]);
    stool.add(seat, backLip, footrail);
    return stool;
  };

  [-0.9, -0.3, 0.3, 0.9].forEach((offset) => {
    barstoolGroup.add(createBarstool(5.8 + offset));
  });

  tagInteractive(barstoolGroup, 'designer-barstool');
  kitchenGroup.add(barstoolGroup);

  // D. Full-Height Seamless Kitchen Cabinetry Wall (Z = -7.35, X: 6.0 to 9.8)
  const rearCabinetry = createBox(3.7, 3.0, 0.65, materials.darkCharcoalCabinet, [7.85, 1.5, -7.35]);
  // Integrated Gaggenau-style double wall ovens with dark glass
  const ovenStack = createBox(0.75, 1.05, 0.05, materials.tvScreen, [8.2, 1.25, -7.02]);
  // Integrated French-door refrigerator in brushed stainless steel
  const fridgePanels = createBox(1.1, 2.05, 0.05, materials.stainlessSteel, [6.8, 1.05, -7.02]);
  kitchenGroup.add(rearCabinetry, ovenStack, fridgePanels);

  // E. Side Prep Counter along East Window Wall (X = 9.45, Z: -4.5 to -1.5)
  const prepCounter = createBox(0.68, 0.9, 3.2, materials.calacatta, [9.45, 0.45, -3.2]);
  // Floating open shelf with potted culinary herbs
  const floatingKitchenShelf = createBox(0.24, 0.04, 2.4, materials.naturalOak, [9.55, 1.6, -3.2]);
  const herbPot = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.09, 12), materials.matteCeramicWhite);
  herbPot.position.set(9.55, 1.68, -3.2);
  const herbBush = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0x3d662a, roughness: 0.6 }));
  herbBush.position.set(9.55, 1.77, -3.2);
  kitchenGroup.add(prepCounter, floatingKitchenShelf, herbPot, herbBush);

  furnitureGroup.add(kitchenGroup);

  // =========================================================================
  // 4. SECONDARY SHOWROOM / MASTER SUITE (Zen Luxury Product Gallery)
  // =========================================================================
  const showroomGroup = new THREE.Group();
  showroomGroup.name = 'ShowroomSuiteZone';

  // A. Plush Wool Area Rug under bed (W: 4.2m, D: 3.6m)
  const bedRug = createBox(4.2, 0.016, 3.6, materials.livingRug, [-6.0, 0.018, -4.8], false, true);
  showroomGroup.add(bedRug);

  // B. Kyoto Floating Oak Platform Bed ('platform-bed-suite')
  // Centered at X = -6.0, Z = -5.4
  const bedGroup = new THREE.Group();
  bedGroup.name = 'Product_PlatformBedSuite';
  bedGroup.position.set(-6.0, 0, -5.4);

  // Low platform in natural rift-cut white oak (2.1m W x 2.25m L x 0.28m H)
  const bedPlatform = createBox(2.1, 0.26, 2.25, materials.naturalOak, [0, 0.13, 0]);
  // Concealed under-bed warm LED floating nightlight
  const underbedLed = createBox(1.9, 0.02, 2.0, materials.luminaireGlow, [0, 0.02, 0], false, false);

  // Integrated cantilevered floating nightstands left & right
  const nightstandL = createBox(0.6, 0.12, 0.42, materials.naturalOak, [-1.35, 0.28, -0.85]);
  const nightstandR = createBox(0.6, 0.12, 0.42, materials.naturalOak, [1.35, 0.28, -0.85]);

  // Tailored upholstered headboard in Belgian linen
  const headboard = createBox(2.0, 0.75, 0.14, materials.bedLinen, [0, 0.65, -1.05]);
  // Premium mattress with pillow-top
  const mattress = createBox(1.9, 0.28, 2.0, materials.creamBoucle, [0, 0.38, 0.05]);
  // Folded Belgian linen duvet with natural drape
  const duvet = createBox(1.92, 0.12, 1.4, materials.bedLinen, [0, 0.5, 0.35]);
  // Sleeping pillows (pair of Euro shams + sleeping pillows)
  const pillowL = createBox(0.72, 0.14, 0.42, materials.bedLinen, [-0.48, 0.56, -0.7]);
  const pillowR = createBox(0.72, 0.14, 0.42, materials.bedLinen, [0.48, 0.56, -0.7]);

  // Bedside Styling: Minimalist water carafe & art monograph
  const bedCarafe = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.14, 12), materials.amberGlass);
  bedCarafe.position.set(-1.35, 0.41, -0.85);
  const bedBook = createBox(0.2, 0.02, 0.15, materials.darkCharcoalCabinet, [1.35, 0.35, -0.85]);

  bedGroup.add(
    bedPlatform, underbedLed, nightstandL, nightstandR,
    headboard, mattress, duvet, pillowL, pillowR, bedCarafe, bedBook
  );
  tagInteractive(bedGroup, 'platform-bed-suite');
  showroomGroup.add(bedGroup);

  // Bedside Hanging Drop Pendants (pair of frosted globes with brass rods)
  [-1.35, 1.35].forEach((nx) => {
    const pendant = new THREE.Group();
    pendant.position.set(-6.0 + nx, 1.5, -6.25);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), materials.luminaireGlow);
    const brassCap = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.05, 8), materials.brushedBrass);
    brassCap.position.y = 0.1;
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 1.6, 6), materials.brushedBrass);
    wire.position.y = 0.9;
    pendant.add(globe, brassCap, wire);
    showroomGroup.add(pendant);
  });

  // C. Palma Organic Boucle Accent Chair ('accent-bedroom-armchair')
  const bedArmchairGroup = new THREE.Group();
  bedArmchairGroup.name = 'Product_BedroomAccentChair';
  bedArmchairGroup.position.set(-3.0, 0, -3.2);
  bedArmchairGroup.rotation.y = -Math.PI * 0.28;

  // Organic curved armchair seat & pillowed back
  const bedChairSeat = createBox(0.86, 0.22, 0.8, materials.creamBoucle, [0, 0.34, 0]);
  const bedChairBack = createBox(0.86, 0.48, 0.26, materials.creamBoucle, [0, 0.6, -0.3]);
  const bedChairPlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24), materials.naturalOak);
  bedChairPlinth.position.y = 0.04;
  bedChairPlinth.castShadow = true;

  // Small organic travertine drink pedestal table next to chair
  const drinkTable = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.48, 24), materials.travertine);
  drinkTable.position.set(0.68, 0.24, -0.15);
  drinkTable.castShadow = true;

  bedArmchairGroup.add(bedChairSeat, bedChairBack, bedChairPlinth, drinkTable);
  tagInteractive(bedArmchairGroup, 'accent-bedroom-armchair');
  showroomGroup.add(bedArmchairGroup);

  // D. Large Minimalist Textured Plaster Art Canvas in Bedroom
  const bedArtFrame = createBox(1.5, 1.9, 0.04, materials.smokedWalnut, [-8.5, 1.8, -1.62]);
  const bedArtCanvas = createBox(1.42, 1.82, 0.01, materials.artCanvas1, [-8.5, 1.8, -1.59]);
  showroomGroup.add(bedArtFrame, bedArtCanvas);

  furnitureGroup.add(showroomGroup);

  // =========================================================================
  // 5. LUXURY SPA BATHROOM (Travertine Floating Vanity & Rain Shower)
  // =========================================================================
  const bathGroup = new THREE.Group();
  bathGroup.name = 'BathroomZone';

  // A. Venezia Travertine Floating Double Vanity ('floating-travertine-vanity')
  const vanityGroup = new THREE.Group();
  vanityGroup.name = 'Product_TravertineVanity';
  vanityGroup.position.set(-0.25, 0, -7.2);

  // Floating carved Roman Travertine slab counter (1.80m W x 0.54m D x 0.35m H at Y = 0.58m)
  const vanityCounter = createBox(1.8, 0.35, 0.54, materials.travertine, [0, 0.6, 0]);
  // Twin integrated Calacatta stone basin recesses
  const basin1 = createBox(0.54, 0.12, 0.38, materials.calacatta, [-0.48, 0.82, 0]);
  const basin2 = createBox(0.54, 0.12, 0.38, materials.calacatta, [0.48, 0.82, 0]);

  // Minimalist wall-mounted matte black spout and mixer valves
  const spout1 = createBox(0.03, 0.03, 0.18, materials.matteBlackMetal, [-0.48, 1.05, -0.22]);
  const spout2 = createBox(0.03, 0.03, 0.18, materials.matteBlackMetal, [0.48, 1.05, -0.22]);

  // Large Backlit Ambient Pill Mirror (1.6m W x 0.95m H with warm LED halo glow)
  const mirrorHalo = createBox(1.64, 0.99, 0.015, materials.luminaireGlow, [0, 1.8, -0.25], false, false);
  const mirrorGlass = createBox(1.6, 0.95, 0.02, materials.calacatta, [0, 1.8, -0.23]);

  // Vanity Tabletop Styling: Amber glass soap dispenser & rolled waffle hand towel
  const soapDispenser = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 12), materials.amberGlass);
  soapDispenser.position.set(0.0, 0.84, 0.05);
  const rolledTowel = createBox(0.18, 0.08, 0.12, materials.oatLinen, [0.0, 0.82, -0.15]);

  vanityGroup.add(vanityCounter, basin1, basin2, spout1, spout2, mirrorHalo, mirrorGlass, soapDispenser, rolledTowel);
  tagInteractive(vanityGroup, 'floating-travertine-vanity');
  bathGroup.add(vanityGroup);

  // B. Frameless Fluted Glass Shower Screen & Ceiling Rain Shower
  const showerScreen = createBox(0.02, 2.4, 1.5, materials.flutedGlass, [-0.6, 1.2, -6.1], false, false);
  const rainShowerArm = createBox(0.03, 0.4, 0.03, materials.matteBlackMetal, [-1.2, 2.7, -6.5]);
  const rainShowerHead = createBox(0.35, 0.02, 0.35, materials.matteBlackMetal, [-1.2, 2.5, -6.5]);
  bathGroup.add(showerScreen, rainShowerArm, rainShowerHead);

  // C. Wall-Hung Rimless Ceramic Toilet
  const toilet = createBox(0.4, 0.42, 0.58, materials.matteCeramicWhite, [0.9, 0.38, -5.5]);
  const flushPlate = createBox(0.24, 0.14, 0.01, materials.matteBlackMetal, [0.9, 0.95, -5.8]);
  bathGroup.add(toilet, flushPlate);

  furnitureGroup.add(bathGroup);

  // =========================================================================
  // 6. ENTRANCE FOYER & CORRIDOR (Architectural Gallery Reception)
  // =========================================================================
  const foyerGroup = new THREE.Group();
  foyerGroup.name = 'FoyerZone';

  // A. Architectural Console Table in Solid Oak & Travertine (Pos: [0.0, 0, 5.7])
  const consoleTop = createBox(1.6, 0.06, 0.4, materials.naturalOak, [0.0, 0.78, 5.7]);
  const consoleLegL = createBox(0.12, 0.75, 0.36, materials.travertine, [-0.65, 0.375, 5.7]);
  const consoleLegR = createBox(0.12, 0.75, 0.36, materials.travertine, [0.65, 0.375, 5.7]);

  // Curated artisanal ceramic vessel with dried branches on foyer console
  const foyerVase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 0.38, 16), materials.matteCeramicWhite);
  foyerVase.position.set(0.0, 1.0, 5.7);
  foyerVase.castShadow = true;
  const branchStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.75, 8), materials.smokedWalnut);
  branchStem.position.set(0.0, 1.45, 5.7);
  branchStem.rotation.z = 0.15;
  branchStem.castShadow = true;

  foyerGroup.add(consoleTop, consoleLegL, consoleLegR, foyerVase, branchStem);

  // B. Large Minimalist Gallery Canvas Art on Foyer East Wall (X = 1.42, Z = 3.5)
  const foyerArtFrame = createBox(0.04, 1.8, 1.3, materials.smokedWalnut, [1.42, 1.7, 3.5]);
  const foyerArtCanvas = createBox(0.01, 1.72, 1.22, materials.artCanvas2, [1.39, 1.7, 3.5]);
  foyerGroup.add(foyerArtFrame, foyerArtCanvas);

  furnitureGroup.add(foyerGroup);

  // =========================================================================
  // 7. 3D HOTSPOT BEACON PINS FOR ALL SHOWROOM PRODUCTS
  // =========================================================================
  productsCatalog.forEach((product) => {
    createHotspot(product);
  });

  return {
    group: furnitureGroup,
    interactiveMeshes,
    hotspots
  };
}
