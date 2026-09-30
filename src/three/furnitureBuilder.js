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

  // Attaches database product ID to 3D geometry for exactly ONE interactive product
  const tagInteractive = (meshOrGroup, slotId) => {
    if (slotId === 'product-01') {
      meshOrGroup.userData = {
        productId: slotId,
        isInteractive: true,
        productName: 'Aura Modern Lounge Chair'
      };
      meshOrGroup.traverse((child) => {
        if (child.isMesh) {
          child.userData = {
            productId: slotId,
            isInteractive: true,
            productName: 'Aura Modern Lounge Chair'
          };
        }
      });
    }
  };

  const _createHotspot = (_product) => {
    // Intentionally no-op: Golden pins/hotspots removed for pure architectural visualization
  };

  // =========================================================================
  // 1. OPEN-PLAN LIVING ROOM (PREMIUM ARCHITECTURAL VISUALIZATION)
  // =========================================================================
  const livingGroup = new THREE.Group();
  livingGroup.name = 'LivingRoomZone';

  // A. Generous Custom Berber Wool Area Rug (W: 6.2m, D: 5.0m)
  const livingRug = createBox(6.2, 0.018, 5.0, materials.livingRug, [-5.7, 0.009, 2.5], false, true);
  livingGroup.add(livingRug);

  // B. Large Low Modular Sectional Sofa
  const sofaGroup = new THREE.Group();
  sofaGroup.name = 'LivingRoomSofa';

  // Recessed American Walnut Plinths with shadow reveals
  const sofaPlinthMain = createBox(3.5, 0.07, 1.05, materials.smokedWalnut, [-6.1, 0.035, 3.55]);
  const sofaPlinthChaise = createBox(1.15, 0.07, 1.5, materials.smokedWalnut, [-7.4, 0.035, 2.3]);
  sofaGroup.add(sofaPlinthMain, sofaPlinthChaise);

  // Cream Boucle Cushioned Bases
  const sofaBaseMain = createBox(3.5, 0.22, 1.05, materials.creamBoucle, [-6.1, 0.18, 3.55]);
  const sofaBaseChaise = createBox(1.15, 0.22, 1.5, materials.creamBoucle, [-7.4, 0.18, 2.3]);
  sofaGroup.add(sofaBaseMain, sofaBaseChaise);

  // Deep High-Density Boucle Seat Cushions with subtle seam bevels
  const seatCushion1 = createBox(1.12, 0.15, 0.8, materials.creamBoucle, [-4.95, 0.365, 3.42]);
  const seatCushion2 = createBox(1.12, 0.15, 0.8, materials.creamBoucle, [-6.1, 0.365, 3.42]);
  const seatCushion3 = createBox(1.12, 0.15, 0.8, materials.creamBoucle, [-7.25, 0.365, 3.42]);
  const chaiseCushion = createBox(0.96, 0.15, 1.44, materials.creamBoucle, [-7.4, 0.365, 2.28]);
  sofaGroup.add(seatCushion1, seatCushion2, seatCushion3, chaiseCushion);

  // Low-Profile Contoured Backrests & Armrests
  const sofaBack = createBox(3.5, 0.46, 0.26, materials.creamBoucle, [-6.1, 0.51, 3.98]);
  const sofaArm = createBox(0.24, 0.42, 2.3, materials.creamBoucle, [-7.92, 0.43, 2.5]);
  sofaGroup.add(sofaBack, sofaArm);

  // Curated Luxury Accent Pillows
  const pillow1 = createBox(0.48, 0.36, 0.14, materials.cognacLeather, [-5.2, 0.53, 3.82]);
  pillow1.rotation.y = 0.14;
  const pillow2 = createBox(0.44, 0.34, 0.12, materials.oatLinen, [-6.3, 0.53, 3.82]);
  pillow2.rotation.y = -0.08;
  const pillow3 = createBox(0.46, 0.34, 0.12, materials.charcoalVelvet, [-7.65, 0.53, 3.4]);
  pillow3.rotation.y = Math.PI / 4;
  const pillow4 = createBox(0.42, 0.32, 0.12, materials.oatLinen, [-4.6, 0.52, 3.8]);
  pillow4.rotation.y = -0.15;
  const throwDrape = createBox(0.7, 0.04, 1.05, materials.throwBlanket, [-7.4, 0.44, 1.75]);
  sofaGroup.add(pillow1, pillow2, pillow3, pillow4, throwDrape);

  livingGroup.add(sofaGroup);

  // C. Pair of Sculptural Curved Lounge Chairs
  const createLoungeChair = (pos, rotY) => {
    const chair = new THREE.Group();
    chair.position.set(pos[0], pos[1], pos[2]);
    chair.rotation.y = rotY;

    // Curved Boucle Backrest
    const seat = createBox(0.86, 0.18, 0.82, materials.creamBoucle, [0, 0.36, 0]);
    const back = createBox(0.86, 0.54, 0.22, materials.creamBoucle, [0, 0.65, -0.32]);
    const armL = createBox(0.15, 0.34, 0.78, materials.creamBoucle, [-0.44, 0.54, 0]);
    const armR = createBox(0.15, 0.34, 0.78, materials.creamBoucle, [0.44, 0.54, 0]);
    const lumbar = createBox(0.48, 0.24, 0.1, materials.oatLinen, [0, 0.52, -0.22]);

    // Tapered Smoked Walnut Legs with Champagne Brass Ferrules
    [[-0.36, -0.32], [0.36, -0.32], [-0.36, 0.32], [0.36, 0.32]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.016, 0.26, 8), materials.smokedWalnut);
      leg.position.set(lx, 0.13, lz);
      leg.rotation.x = lz > 0 ? 0.1 : -0.1;
      leg.rotation.z = lx > 0 ? -0.1 : 0.1;
      leg.castShadow = true;
      chair.add(leg);

      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.016, 0.04, 8), materials.brushedBrass);
      ferrule.position.set(lx, 0.02, lz);
      chair.add(ferrule);
    });

    chair.add(seat, back, armL, armR, lumbar);
    return chair;
  };

  const chair1 = createLoungeChair([-3.4, 0.0, 1.4], -Math.PI * 0.72);
  tagInteractive(chair1, 'product-01');
  const chair2 = createLoungeChair([-3.4, 0.0, 3.2], -Math.PI * 0.42);
  livingGroup.add(chair1, chair2);

  // D. Sculptural Dual-Tier Travertine & Calacatta Marble Coffee Tables
  const coffeeTableGroup = new THREE.Group();
  coffeeTableGroup.name = 'SculpturalCoffeeTables';

  // Tier 1: Honed Roman Travertine Monolithic Table
  const t1Top = createBox(1.35, 0.07, 0.75, materials.travertine, [-5.3, 0.29, 2.35]);
  const t1LegL = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.25, 24), materials.travertine);
  t1LegL.position.set(-5.75, 0.125, 2.35);
  t1LegL.castShadow = true;
  const t1LegR = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.25, 24), materials.travertine);
  t1LegR.position.set(-4.85, 0.125, 2.35);
  t1LegR.castShadow = true;

  // Tier 2: Overlapping Polished Calacatta Gold Marble Round Disc
  const t2Top = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 32), materials.calacatta);
  t2Top.position.set(-4.3, 0.38, 2.85);
  t2Top.castShadow = true;
  const t2Pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.35, 24), materials.travertine);
  t2Pedestal.position.set(-4.3, 0.18, 2.85);
  t2Pedestal.castShadow = true;

  coffeeTableGroup.add(t1Top, t1LegL, t1LegR, t2Top, t2Pedestal);

  // Curated Tabletop Accessories
  const tray = createBox(0.34, 0.02, 0.24, materials.travertine, [-5.4, 0.335, 2.35]);
  const ceramicBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.04, 0.055, 16), materials.matteCeramicWhite);
  ceramicBowl.position.set(-5.4, 0.37, 2.35);
  const book1 = createBox(0.26, 0.024, 0.19, materials.darkCharcoalCabinet, [-5.05, 0.34, 2.45]);
  const book2 = createBox(0.24, 0.02, 0.17, materials.oatLinen, [-5.05, 0.36, 2.45]);
  book2.rotation.y = 0.14;
  const candleBronze = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.08, 12), materials.subtleBronze);
  candleBronze.position.set(-4.3, 0.44, 2.85);
  const amberVase = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.18, 16), materials.amberGlass);
  amberVase.position.set(-5.7, 0.42, 2.4);

  coffeeTableGroup.add(tray, ceramicBowl, book1, book2, candleBronze, amberVase);
  livingGroup.add(coffeeTableGroup);

  // E. Architectural Cantilever Arc Floor Lamp (Archimede)
  const lampGroup = new THREE.Group();
  lampGroup.name = 'CantileverArcFloorLamp';
  lampGroup.position.set(-8.2, 0, 0.6);

  // Calacatta Marble Heavy Base
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.15, 24), materials.calacatta);
  lampBase.position.y = 0.075;
  lampBase.castShadow = true;
  lampGroup.add(lampBase);

  // Brushed Champagne Brass Stem & Arch
  const stemVertical = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 2.15, 8), materials.brushedBrass);
  stemVertical.position.set(0, 1.15, 0);
  stemVertical.castShadow = true;
  lampGroup.add(stemVertical);

  const stemArch = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.35, 8), materials.brushedBrass);
  stemArch.position.set(0.58, 2.18, 0);
  stemArch.rotation.z = -Math.PI / 3;
  stemArch.castShadow = true;
  lampGroup.add(stemArch);

  // Spun Brass Dome Shade & Diffused Glow
  const shade = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), materials.brushedBrass);
  shade.position.set(1.18, 2.0, 0);
  shade.rotation.x = Math.PI;
  shade.castShadow = true;
  lampGroup.add(shade);

  const lampDiffuser = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), materials.luminaireGlow);
  lampDiffuser.position.set(1.18, 1.95, 0);
  lampGroup.add(lampDiffuser);

  // Warm downward task light
  const floorLampLight = new THREE.PointLight(0xffeed4, 1.4, 5.0, 2);
  floorLampLight.position.set(1.18, 1.88, 0);
  lampGroup.add(floorLampLight);

  livingGroup.add(lampGroup);

  // F. Fluted Smoked Walnut Side Table next to sofa
  const sideTableGroup = new THREE.Group();
  sideTableGroup.name = 'LivingSideTable';
  const sideTableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.48, 24), materials.smokedWalnut);
  sideTableBase.position.set(-8.15, 0.24, 4.2);
  sideTableBase.castShadow = true;
  const sideTableCoaster = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.01, 16), materials.subtleBronze);
  sideTableCoaster.position.set(-8.15, 0.485, 4.2);
  const sideGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.09, 12), materials.smokedGlass);
  sideGlass.position.set(-8.15, 0.53, 4.2);
  sideTableGroup.add(sideTableBase, sideTableCoaster, sideGlass);
  livingGroup.add(sideTableGroup);

  // G. Architectural Feature Wall (Fluted Walnut, Built-in Open Shelving & OLED TV)
  const mediaFeatureGroup = new THREE.Group();
  mediaFeatureGroup.name = 'MediaAndShelvingFeature';

  // Floating Honed Stone Media Plinth
  const mediaPlinth = createBox(3.2, 0.16, 0.42, materials.travertine, [-7.1, 0.25, -1.2]);
  mediaFeatureGroup.add(mediaPlinth);

  // Sculptural Bronze Horizon Arch on plinth
  const bronzeArch = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.032, 12, 24, Math.PI), materials.subtleBronze);
  bronzeArch.position.set(-6.0, 0.58, -1.2);
  bronzeArch.rotation.z = Math.PI;
  bronzeArch.castShadow = true;
  const bronzeBase = createBox(0.34, 0.035, 0.14, materials.subtleBronze, [-6.0, 0.43, -1.2]);
  mediaFeatureGroup.add(bronzeArch, bronzeBase);

  // 75-inch OLED TV with Razor-Thin Metal Frame & Ambient Bias Light
  const tvFrame = createBox(1.72, 0.98, 0.025, materials.matteBlackMetal, [-7.1, 1.62, -1.37]);
  const tvGlass = createBox(1.68, 0.94, 0.008, materials.tvScreen, [-7.1, 1.62, -1.35]);
  const tvBiasGlow = createBox(1.8, 1.05, 0.01, materials.ceilingCoveGlow, [-7.1, 1.62, -1.39], '', false, false);
  mediaFeatureGroup.add(tvFrame, tvGlass, tvBiasGlow);

  // Built-in Architectural Floating Open Shelves with warm LED illumination
  const shelfX = -8.7;
  [1.05, 1.55, 2.05].forEach((sy, idx) => {
    // Shelf board
    const shelfBoard = createBox(1.4, 0.04, 0.28, materials.smokedWalnut, [shelfX, sy, -1.25]);
    // Under-shelf warm LED strip
    const shelfLed = createBox(1.36, 0.01, 0.02, materials.ceilingCoveGlow, [shelfX, sy - 0.02, -1.18], '', false, false);
    mediaFeatureGroup.add(shelfBoard, shelfLed);

    // Curated shelf display objects
    if (idx === 0) {
      // Artisanal ceramic vessels
      const v1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.22, 16), materials.matteCeramicWhite);
      v1.position.set(shelfX - 0.35, sy + 0.13, -1.25);
      const v2 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.03, 0.16, 16), materials.matteCeramicTerracotta);
      v2.position.set(shelfX - 0.18, sy + 0.10, -1.25);
      mediaFeatureGroup.add(v1, v2);
    } else if (idx === 1) {
      // Books & Stoneware urn
      const sb1 = createBox(0.035, 0.22, 0.18, materials.darkCharcoalCabinet, [shelfX + 0.25, sy + 0.13, -1.25]);
      const sb2 = createBox(0.03, 0.20, 0.18, materials.oatLinen, [shelfX + 0.29, sy + 0.12, -1.25]);
      const urn = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.04, 0.24, 16), materials.matteCeramicWhite);
      urn.position.set(shelfX - 0.25, sy + 0.14, -1.25);
      mediaFeatureGroup.add(sb1, sb2, urn);
    } else {
      // Blown glass carafe & bronze cube
      const decanter = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.065, 0.20, 16), materials.amberGlass);
      decanter.position.set(shelfX - 0.1, sy + 0.12, -1.25);
      const bCube = createBox(0.08, 0.08, 0.08, materials.subtleBronze, [shelfX + 0.3, sy + 0.06, -1.25]);
      mediaFeatureGroup.add(decanter, bCube);
    }
  });

  livingGroup.add(mediaFeatureGroup);

  // H. Mature Fiddle Leaf Fig Tree in Fluted White Ceramic Pot
  const figPot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.6, 24), materials.matteCeramicWhite);
  figPot.position.set(-8.8, 0.3, 5.2);
  figPot.castShadow = true;
  const figTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.8, 8), materials.smokedWalnut);
  figTrunk.position.set(-8.8, 1.2, 5.2);
  figTrunk.castShadow = true;
  livingGroup.add(figPot, figTrunk);

  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x2d4822, roughness: 0.55 });
  [-0.2, 0.0, 0.2].forEach((ox, idx) => {
    const leafCluster = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45 + idx * 0.05, 1), foliageMat);
    leafCluster.position.set(-8.8 + ox, 1.8 + idx * 0.25, 5.2 + (idx % 2 === 0 ? 0.1 : -0.1));
    leafCluster.scale.set(1.1, 0.9, 1.0);
    leafCluster.castShadow = true;
    livingGroup.add(leafCluster);
  });

  // I. Minimalist Abstract Canvas Art on East Living Room Wall
  const livingArtFrame = createBox(0.04, 1.8, 1.3, materials.smokedWalnut, [-1.58, 1.7, 4.45]);
  const livingArtCanvas = createBox(0.01, 1.72, 1.22, materials.artCanvas1, [-1.55, 1.7, 4.45]);
  livingGroup.add(livingArtFrame, livingArtCanvas);

  furnitureGroup.add(livingGroup);

  // =========================================================================
  // 2. WIDE ENTRANCE HALLWAY & RECEPTION GALLERY
  // =========================================================================
  const foyerGroup = new THREE.Group();
  foyerGroup.name = 'FoyerZone';

  // [product-07] Monolithic Travertine Display Pedestal with Urn (On Pedestals)
  const foyerPedestalGroup = new THREE.Group();
  foyerPedestalGroup.name = 'Item_product-07_TravertinePedestal';
  // 90cm high monolithic carved Roman travertine column pedestal (0.40m x 0.40m x 0.90m)
  const pedestalBlock = createBox(0.42, 0.9, 0.42, materials.travertine, [0.0, 0.45, 4.2]);
  // Large artisanal earthenware urn atop pedestal
  const urnVessel = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.08, 0.45, 16), materials.matteCeramicWhite);
  urnVessel.position.set(0.0, 1.125, 4.2);
  urnVessel.castShadow = true;
  const urnBranches = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.7, 8), materials.smokedWalnut);
  urnBranches.position.set(0.0, 1.5, 4.2);
  urnBranches.rotation.z = 0.18;
  urnBranches.castShadow = true;

  foyerPedestalGroup.add(pedestalBlock, urnVessel, urnBranches);
  tagInteractive(foyerPedestalGroup, 'product-07');
  foyerGroup.add(foyerPedestalGroup);

  // [product-08] Artisanal Stoneware Amphora (Inside Illuminated Cabinets / Wall Niche)
  const nicheAmphoraGroup = new THREE.Group();
  nicheAmphoraGroup.name = 'Item_product-08_NicheAmphora';
  const amphoraBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.07, 0.44, 16), materials.matteCeramicTerracotta);
  amphoraBody.position.set(1.34, 1.0, 5.2);
  amphoraBody.castShadow = true;
  const amphoraHandle1 = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 8, 12, Math.PI), materials.matteCeramicTerracotta);
  amphoraHandle1.position.set(1.34, 1.1, 5.08);
  amphoraHandle1.rotation.y = Math.PI / 2;
  const amphoraHandle2 = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 8, 12, Math.PI), materials.matteCeramicTerracotta);
  amphoraHandle2.position.set(1.34, 1.1, 5.32);
  amphoraHandle2.rotation.y = -Math.PI / 2;

  nicheAmphoraGroup.add(amphoraBody, amphoraHandle1, amphoraHandle2);
  tagInteractive(nicheAmphoraGroup, 'product-08');
  foyerGroup.add(nicheAmphoraGroup);

  // Minimalist Gallery Canvas Art on Foyer East Wall
  const foyerArtFrame = createBox(0.04, 1.8, 1.3, materials.smokedWalnut, [1.42, 1.7, 3.5]);
  const foyerArtCanvas = createBox(0.01, 1.72, 1.22, materials.artCanvas2, [1.39, 1.7, 3.5]);
  foyerGroup.add(foyerArtFrame, foyerArtCanvas);

  furnitureGroup.add(foyerGroup);

  // =========================================================================
  // 3. FORMAL DINING AREA
  // =========================================================================
  const diningGroup = new THREE.Group();
  diningGroup.name = 'DiningZone';

  // [product-09] Solstice 8-Seater Walnut Dining Table (On Display Tables)
  const diningTableGroup = new THREE.Group();
  diningTableGroup.name = 'Item_product-09_DiningTable';
  diningTableGroup.position.set(5.8, 0, 4.0);

  const tabletop = createBox(2.6, 0.06, 1.05, materials.smokedWalnut, [0, 0.73, 0]);
  const legGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.7, 24);
  const dl1 = new THREE.Mesh(legGeo, materials.smokedWalnut);
  dl1.position.set(-0.85, 0.35, 0);
  dl1.castShadow = true;
  const dl2 = new THREE.Mesh(legGeo, materials.smokedWalnut);
  dl2.position.set(0.85, 0.35, 0);
  dl2.castShadow = true;

  const tableRunner = createBox(2.4, 0.005, 0.34, materials.oatLinen, [0, 0.763, 0], false, true);
  const ceramicCenterpiece = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.05, 0.22, 16), materials.matteCeramicWhite);
  ceramicCenterpiece.position.set(0, 0.88, 0);
  const bronzeCandelabra1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.16, 8), materials.subtleBronze);
  bronzeCandelabra1.position.set(-0.45, 0.84, 0);
  const bronzeCandelabra2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.12, 8), materials.subtleBronze);
  bronzeCandelabra2.position.set(0.45, 0.82, 0);

  diningTableGroup.add(tabletop, dl1, dl2, tableRunner, ceramicCenterpiece, bronzeCandelabra1, bronzeCandelabra2);
  tagInteractive(diningTableGroup, 'product-09');
  diningGroup.add(diningTableGroup);

  // [product-10] Koto Dining Armchair Set (Furniture Floor Zone)
  const diningChairGroup = new THREE.Group();
  diningChairGroup.name = 'Item_product-10_DiningChairs';

  const createDiningArmchair = (pos, rotY) => {
    const chair = new THREE.Group();
    chair.position.set(pos[0], pos[1], pos[2]);
    chair.rotation.y = rotY;

    const backrest = createBox(0.48, 0.32, 0.08, materials.oatLinen, [0, 0.65, -0.2]);
    const seat = createBox(0.48, 0.08, 0.46, materials.oatLinen, [0, 0.46, 0]);
    const armL = createBox(0.05, 0.16, 0.34, materials.smokedWalnut, [-0.22, 0.54, -0.05]);
    const armR = createBox(0.05, 0.16, 0.34, materials.smokedWalnut, [0.22, 0.54, -0.05]);

    [[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]].forEach(([cx, cz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.012, 0.44, 8), materials.smokedWalnut);
      leg.position.set(cx, 0.22, cz);
      leg.castShadow = true;
      chair.add(leg);
    });

    chair.add(backrest, seat, armL, armR);
    return chair;
  };

  for (let c = -0.9; c <= 0.9; c += 0.6) {
    diningChairGroup.add(createDiningArmchair([5.8 + c, 0, 4.75], 0));
  }
  for (let c = -0.9; c <= 0.9; c += 0.6) {
    diningChairGroup.add(createDiningArmchair([5.8 + c, 0, 3.25], Math.PI));
  }

  tagInteractive(diningChairGroup, 'product-10');
  diningGroup.add(diningChairGroup);

  // [product-11] Halo Architectural Linear Pendant (Architectural Lighting Zone)
  const pendantGroup = new THREE.Group();
  pendantGroup.name = 'Item_product-11_LinearPendant';
  pendantGroup.position.set(5.8, 2.3, 4.0);

  const luminaireBar = createBox(2.0, 0.05, 0.05, materials.brushedBrass, [0, 0, 0]);
  const downDiffuser = createBox(1.96, 0.015, 0.045, materials.luminaireGlow, [0, -0.025, 0]);
  const upDiffuser = createBox(1.96, 0.012, 0.045, materials.luminaireGlow, [0, 0.025, 0]);

  const w1 = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.9, 6), materials.matteBlackMetal);
  w1.position.set(-0.75, 0.45, 0);
  const w2 = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.9, 6), materials.matteBlackMetal);
  w2.position.set(0.75, 0.45, 0);

  pendantGroup.add(luminaireBar, downDiffuser, upDiffuser, w1, w2);
  tagInteractive(pendantGroup, 'product-11');
  diningGroup.add(pendantGroup);

  // Potted Olive Tree
  const olivePot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.52, 24), materials.matteCeramicWhite);
  olivePot.position.set(8.8, 0.26, 6.0);
  olivePot.castShadow = true;
  const oliveTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 1.5, 8), materials.smokedWalnut);
  oliveTrunk.position.set(8.8, 1.0, 6.0);
  oliveTrunk.castShadow = true;
  const oliveFoliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 1), new THREE.MeshStandardMaterial({ color: 0x48583c, roughness: 0.6 }));
  oliveFoliage.position.set(8.8, 1.7, 6.0);
  oliveFoliage.scale.set(1.1, 0.95, 1.0);
  oliveFoliage.castShadow = true;
  diningGroup.add(olivePot, oliveTrunk, oliveFoliage);

  furnitureGroup.add(diningGroup);

  // =========================================================================
  // 4. MODERN GOURMET KITCHEN
  // =========================================================================
  const kitchenGroup = new THREE.Group();
  kitchenGroup.name = 'KitchenZone';

  // [product-12] Calacatta Gold Waterfall Kitchen Island (On Kitchen Counters)
  const islandGroup = new THREE.Group();
  islandGroup.name = 'Item_product-12_KitchenIsland';
  islandGroup.position.set(5.8, 0, -1.8);

  const islandTop = createBox(3.2, 0.08, 1.1, materials.calacatta, [0, 0.88, 0]);
  const waterfallL = createBox(0.08, 0.84, 1.1, materials.calacatta, [-1.56, 0.42, 0]);
  const waterfallR = createBox(0.08, 0.84, 1.1, materials.calacatta, [1.56, 0.42, 0]);
  const islandCabinets = createBox(3.04, 0.84, 0.82, materials.darkCharcoalCabinet, [0, 0.42, -0.14]);
  const islandLed = createBox(3.0, 0.015, 0.02, materials.luminaireGlow, [0, 0.83, 0.27], false, false);
  const faucetBase = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 12), materials.matteBlackMetal);
  faucetBase.position.set(-0.4, 1.08, -0.32);
  faucetBase.castShadow = true;
  const faucetArch = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.014, 8, 16, Math.PI), materials.matteBlackMetal);
  faucetArch.position.set(-0.4, 1.25, -0.21);
  faucetArch.rotation.y = Math.PI / 2;

  islandGroup.add(islandTop, waterfallL, waterfallR, islandCabinets, islandLed, faucetBase, faucetArch);
  tagInteractive(islandGroup, 'product-12');
  kitchenGroup.add(islandGroup);

  // [product-13] Linea Leather Counter Barstool Set (Furniture Floor Zone)
  const barstoolGroup = new THREE.Group();
  barstoolGroup.name = 'Item_product-13_Barstools';

  const createBarstool = (xPos) => {
    const stool = new THREE.Group();
    stool.position.set(xPos, 0, -1.05);

    const seat = createBox(0.42, 0.06, 0.4, materials.cognacLeather, [0, 0.65, 0]);
    const backLip = createBox(0.42, 0.16, 0.06, materials.cognacLeather, [0, 0.74, 0.18]);

    const frameMat = materials.matteBlackMetal;
    [[-0.18, -0.16], [0.18, -0.16], [-0.18, 0.16], [0.18, 0.16]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.65, 8), frameMat);
      leg.position.set(lx, 0.325, lz);
      leg.castShadow = true;
      stool.add(leg);
    });

    const footrail = createBox(0.38, 0.02, 0.02, materials.brushedBrass, [0, 0.22, 0.16]);
    stool.add(seat, backLip, footrail);
    return stool;
  };

  [-0.9, -0.3, 0.3, 0.9].forEach((offset) => {
    barstoolGroup.add(createBarstool(5.8 + offset));
  });

  tagInteractive(barstoolGroup, 'product-13');
  kitchenGroup.add(barstoolGroup);

  // [product-14] Artisanal Footed Ceramic Bowl & Marble Mortar (On Kitchen Counters)
  const kitchenCounterDuoGroup = new THREE.Group();
  kitchenCounterDuoGroup.name = 'Item_product-14_KitchenCounterware';
  const fruitBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.08, 0.09, 16), materials.matteCeramicWhite);
  fruitBowl.position.set(6.4, 0.96, -1.8);
  fruitBowl.castShadow = true;
  const fruit1 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshStandardMaterial({ color: 0x8a9a4b, roughness: 0.5 }));
  fruit1.position.set(6.4, 1.02, -1.8);
  const fruit2 = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), new THREE.MeshStandardMaterial({ color: 0xd8a93a, roughness: 0.5 }));
  fruit2.position.set(6.44, 1.01, -1.76);
  const cuttingBoard = createBox(0.42, 0.03, 0.28, materials.smokedWalnut, [6.85, 0.935, -1.9]);
  const mortar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.06, 12), materials.calacatta);
  mortar.position.set(6.85, 0.98, -1.9);

  kitchenCounterDuoGroup.add(fruitBowl, fruit1, fruit2, cuttingBoard, mortar);
  tagInteractive(kitchenCounterDuoGroup, 'product-14');
  kitchenGroup.add(kitchenCounterDuoGroup);

  // Island Drop Pendants
  [-0.85, 0.0, 0.85].forEach((px) => {
    const dropGroup = new THREE.Group();
    dropGroup.position.set(5.8 + px, 2.4, -1.8);
    const pBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 16), materials.brushedBrass);
    pBody.castShadow = true;
    const pLens = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16), materials.luminaireGlow);
    pLens.position.y = -0.11;
    const pCord = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.8, 6), materials.matteBlackMetal);
    pCord.position.y = 0.5;
    dropGroup.add(pBody, pLens, pCord);
    kitchenGroup.add(dropGroup);
  });

  // Seamless Cabinetry Wall & Side Counters
  const rearCabinetry = createBox(3.7, 3.0, 0.65, materials.darkCharcoalCabinet, [7.85, 1.5, -7.35]);
  const ovenStack = createBox(0.75, 1.05, 0.05, materials.tvScreen, [8.2, 1.25, -7.02]);
  const fridgePanels = createBox(1.1, 2.05, 0.05, materials.stainlessSteel, [6.8, 1.05, -7.02]);
  const prepCounter = createBox(0.68, 0.9, 3.2, materials.calacatta, [9.45, 0.45, -3.2]);
  const floatingKitchenShelf = createBox(0.24, 0.04, 2.4, materials.naturalOak, [9.55, 1.6, -3.2]);
  const herbPot = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.09, 12), materials.matteCeramicWhite);
  herbPot.position.set(9.55, 1.68, -3.2);
  const herbBush = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0x3d662a, roughness: 0.6 }));
  herbBush.position.set(9.55, 1.77, -3.2);
  kitchenGroup.add(rearCabinetry, ovenStack, fridgePanels, prepCounter, floatingKitchenShelf, herbPot, herbBush);

  furnitureGroup.add(kitchenGroup);

  // =========================================================================
  // 5. SECONDARY SHOWROOM / MASTER SUITE
  // =========================================================================
  const showroomGroup = new THREE.Group();
  showroomGroup.name = 'ShowroomSuiteZone';

  const bedRug = createBox(4.2, 0.016, 3.6, materials.livingRug, [-6.0, 0.018, -4.8], false, true);
  showroomGroup.add(bedRug);

  // [product-15] Kyoto Floating Oak Platform Bed (Dedicated Architectural Display Areas)
  const bedGroup = new THREE.Group();
  bedGroup.name = 'Item_product-15_PlatformBed';
  bedGroup.position.set(-6.0, 0, -5.4);

  const bedPlatform = createBox(2.1, 0.26, 2.25, materials.naturalOak, [0, 0.13, 0]);
  const underbedLed = createBox(1.9, 0.02, 2.0, materials.luminaireGlow, [0, 0.02, 0], false, false);
  const nightstandL = createBox(0.6, 0.12, 0.42, materials.naturalOak, [-1.35, 0.28, -0.85]);
  const nightstandR = createBox(0.6, 0.12, 0.42, materials.naturalOak, [1.35, 0.28, -0.85]);
  const headboard = createBox(2.0, 0.75, 0.14, materials.bedLinen, [0, 0.65, -1.05]);
  const mattress = createBox(1.9, 0.28, 2.0, materials.creamBoucle, [0, 0.38, 0.05]);
  const duvet = createBox(1.92, 0.12, 1.4, materials.bedLinen, [0, 0.5, 0.35]);
  const pillowL = createBox(0.72, 0.14, 0.42, materials.bedLinen, [-0.48, 0.56, -0.7]);
  const pillowR = createBox(0.72, 0.14, 0.42, materials.bedLinen, [0.48, 0.56, -0.7]);
  const bedCarafe = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.14, 12), materials.amberGlass);
  bedCarafe.position.set(-1.35, 0.41, -0.85);
  const bedBook = createBox(0.2, 0.02, 0.15, materials.darkCharcoalCabinet, [1.35, 0.35, -0.85]);

  bedGroup.add(
    bedPlatform, underbedLed, nightstandL, nightstandR,
    headboard, mattress, duvet, pillowL, pillowR, bedCarafe, bedBook
  );
  tagInteractive(bedGroup, 'product-15');
  showroomGroup.add(bedGroup);

  // Bedside Drop Pendants
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

  // [product-16] Palma Organic Boucle Armchair & Drink Table (On Side Tables / Lounge)
  const bedArmchairGroup = new THREE.Group();
  bedArmchairGroup.name = 'Item_product-16_PalmaChair';
  bedArmchairGroup.position.set(-3.0, 0, -3.2);
  bedArmchairGroup.rotation.y = -Math.PI * 0.28;

  const bedChairSeat = createBox(0.86, 0.22, 0.8, materials.creamBoucle, [0, 0.34, 0]);
  const bedChairBack = createBox(0.86, 0.48, 0.26, materials.creamBoucle, [0, 0.6, -0.3]);
  const bedChairPlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24), materials.naturalOak);
  bedChairPlinth.position.y = 0.04;
  bedChairPlinth.castShadow = true;

  const drinkTable = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.48, 24), materials.travertine);
  drinkTable.position.set(0.68, 0.24, -0.15);
  drinkTable.castShadow = true;

  bedArmchairGroup.add(bedChairSeat, bedChairBack, bedChairPlinth, drinkTable);
  tagInteractive(bedArmchairGroup, 'product-16');
  showroomGroup.add(bedArmchairGroup);

  // Minimalist Plaster Art Canvas
  const bedArtFrame = createBox(1.5, 1.9, 0.04, materials.smokedWalnut, [-8.5, 1.8, -1.62]);
  const bedArtCanvas = createBox(1.42, 1.82, 0.01, materials.artCanvas1, [-8.5, 1.8, -1.59]);
  showroomGroup.add(bedArtFrame, bedArtCanvas);

  furnitureGroup.add(showroomGroup);

  // =========================================================================
  // 6. LUXURY SPA BATHROOM
  // =========================================================================
  const bathGroup = new THREE.Group();
  bathGroup.name = 'BathroomZone';

  // [product-17] Venezia Travertine Floating Double Vanity & Mirror (Built-in Wall Sections)
  const vanityGroup = new THREE.Group();
  vanityGroup.name = 'Item_product-17_TravertineVanity';
  vanityGroup.position.set(-0.25, 0, -7.2);

  const vanityCounter = createBox(1.8, 0.35, 0.54, materials.travertine, [0, 0.6, 0]);
  const basin1 = createBox(0.54, 0.12, 0.38, materials.calacatta, [-0.48, 0.82, 0]);
  const basin2 = createBox(0.54, 0.12, 0.38, materials.calacatta, [0.48, 0.82, 0]);
  const spout1 = createBox(0.03, 0.03, 0.18, materials.matteBlackMetal, [-0.48, 1.05, -0.22]);
  const spout2 = createBox(0.03, 0.03, 0.18, materials.matteBlackMetal, [0.48, 1.05, -0.22]);
  const mirrorHalo = createBox(1.64, 0.99, 0.015, materials.luminaireGlow, [0, 1.8, -0.25], false, false);
  const mirrorGlass = createBox(1.6, 0.95, 0.02, materials.calacatta, [0, 1.8, -0.23]);
  const soapDispenser = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 12), materials.amberGlass);
  soapDispenser.position.set(0.0, 0.84, 0.05);
  const rolledTowel = createBox(0.18, 0.08, 0.12, materials.oatLinen, [0.0, 0.82, -0.15]);

  vanityGroup.add(vanityCounter, basin1, basin2, spout1, spout2, mirrorHalo, mirrorGlass, soapDispenser, rolledTowel);
  tagInteractive(vanityGroup, 'product-17');
  bathGroup.add(vanityGroup);

  // Shower Fixtures & Toilet
  const rainShowerArm = createBox(0.03, 0.4, 0.03, materials.matteBlackMetal, [-1.2, 2.7, -6.5]);
  const rainShowerHead = createBox(0.35, 0.02, 0.35, materials.matteBlackMetal, [-1.2, 2.5, -6.5]);
  const toilet = createBox(0.4, 0.42, 0.58, materials.matteCeramicWhite, [0.9, 0.38, -5.5]);
  const flushPlate = createBox(0.24, 0.14, 0.01, materials.matteBlackMetal, [0.9, 0.95, -5.8]);
  bathGroup.add(rainShowerArm, rainShowerHead, toilet, flushPlate);

  furnitureGroup.add(bathGroup);

  // Hotspot indicators are handled by the modular Products component

  return {
    group: furnitureGroup,
    interactiveMeshes,
    hotspots
  };
}
