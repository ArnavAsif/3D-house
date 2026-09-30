import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildArchitecture } from './architectureBuilder';
import { buildFurnitureAndProducts } from './furnitureBuilder';
import { ROOMS_DATA, COLLISION_OBSTACLES, WALK_LIMITS } from '../data/roomData';
import { SHOWROOM_PRODUCTS } from '../data/showroomProducts';

export class ThreeRoomScene {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;

    // Callbacks to React UI
    this.onProductSelect = options.onProductSelect || (() => {});
    this.onProductHover = options.onProductHover || (() => {});
    this.onPositionUpdate = options.onPositionUpdate || (() => {});
    this.onModeChange = options.onModeChange || (() => {});

    // State
    this.mode = 'DOLLHOUSE'; // 'DOLLHOUSE' | 'FIRST_PERSON' | 'TOP_DOWN'
    this.isNight = false;
    this.showCeiling = false;
    this.hoveredProduct = null;
    this.activeProduct = null;

    // FPS Walking state
    this.playerPos = new THREE.Vector3(0.0, 1.65, 7.8); // start at main entrance
    this.playerVelocity = new THREE.Vector3();
    this.playerYaw = 0; // horizontal look angle
    this.playerPitch = 0; // vertical look angle
    this.isPointerLocked = false;
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false
    };
    this.joystickVector = { x: 0, y: 0 };
    this.isDraggingMouse = false;
    this.lastMousePos = { x: 0, y: 0 };

    // Camera animation state for smooth teleports
    this.animatingCamera = false;
    this.cameraAnimStart = { pos: new THREE.Vector3(), target: new THREE.Vector3() };
    this.cameraAnimEnd = { pos: new THREE.Vector3(), target: new THREE.Vector3() };
    this.cameraAnimProgress = 0;
    this.cameraAnimDuration = 1.2; // seconds

    // Raycasting
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.lastTime = performance.now();
    this.startTime = performance.now();
    this.isRunning = true;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f3ee); // warm gallery neutral
    this.scene.fog = new THREE.FogExp2(0xf5f3ee, 0.015);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    // Initial dollhouse view (matching the reference image top perspective)
    this.camera.position.set(0.0, 14.0, 15.0);
    this.cameraTarget = new THREE.Vector3(0.0, 1.0, 0.0);
    this.camera.lookAt(this.cameraTarget);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls (used for Dollhouse and Top-Down)
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.06;
    this.orbitControls.maxPolarAngle = Math.PI / 2 - 0.05; // prevent going below floor
    this.orbitControls.minDistance = 2.0;
    this.orbitControls.maxDistance = 35.0;
    this.orbitControls.target.copy(this.cameraTarget);

    // 5. Build Environment Lighting
    this.setupLighting();

    // 6. Build Architecture
    this.architecture = buildArchitecture(this.scene);
    this.scene.add(this.architecture.group);
    this.architecture.ceilingGroup.visible = this.showCeiling;

    // 7. Build Furniture, Products & Hotspots
    this.furniture = buildFurnitureAndProducts(this.scene, SHOWROOM_PRODUCTS);
    this.scene.add(this.furniture.group);

    // 8. Bind Events
    this.bindEvents();

    // 9. Start Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLighting() {
    this.lightsGroup = new THREE.Group();
    this.lightsGroup.name = 'LightingRig';

    // Ambient / Hemisphere fill
    this.hemiLight = new THREE.HemisphereLight(0xfff8ee, 0xd4cdc3, 0.65);
    this.hemiLight.position.set(0, 20, 0);
    this.lightsGroup.add(this.hemiLight);

    // Primary Directional Sunlight
    this.sunLight = new THREE.DirectionalLight(0xfff2dc, 1.25);
    this.sunLight.position.set(12, 18, 14);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 50;
    this.sunLight.shadow.camera.left = -16;
    this.sunLight.shadow.camera.right = 16;
    this.sunLight.shadow.camera.top = 16;
    this.sunLight.shadow.camera.bottom = -16;
    this.sunLight.shadow.bias = -0.0003;
    this.lightsGroup.add(this.sunLight);

    // Secondary fill light from opposite angle
    this.skyFill = new THREE.DirectionalLight(0xdfebf5, 0.35);
    this.skyFill.position.set(-14, 15, -12);
    this.lightsGroup.add(this.skyFill);

    // Warm Architectural Point Lights (2700K Warm Glow)
    this.interiorPointLights = [];

    const addWarmSpot = (x, y, z, intensity = 1.0, distance = 7.0) => {
      const pl = new THREE.PointLight(0xffd59e, intensity, distance, 1.8);
      pl.position.set(x, y, z);
      this.interiorPointLights.push(pl);
      this.lightsGroup.add(pl);
      return pl;
    };

    // Entrance Portico Sconces
    addWarmSpot(-1.8, 1.8, 6.7, 0.8, 5.0);
    addWarmSpot(1.8, 1.8, 6.7, 0.8, 5.0);

    // Foyer Central Glow
    addWarmSpot(0.0, 2.7, 4.2, 0.9, 8.0);

    // Living Room Warm Ambient Spots
    addWarmSpot(-5.5, 2.7, 2.5, 1.2, 9.0);
    addWarmSpot(-7.5, 2.1, 0.8, 0.8, 4.5); // near arc lamp

    // Dining Linear Pendant Warm Glow
    addWarmSpot(5.8, 2.1, 4.0, 1.4, 8.0);

    // Kitchen Island Warm Downlights
    addWarmSpot(5.8, 2.4, -1.8, 1.3, 7.0);

    // Showroom / Bedroom Warm Cove & Bedside Glow
    addWarmSpot(-6.0, 2.6, -4.8, 1.1, 8.0);
    addWarmSpot(-7.2, 1.2, -5.8, 0.6, 3.5); // left nightstand
    addWarmSpot(-4.8, 1.2, -5.8, 0.6, 3.5); // right nightstand

    // Bathroom Backlit Glow
    addWarmSpot(-0.25, 1.8, -6.6, 1.1, 5.5);

    // Rear Garden Terrace Uplights
    addWarmSpot(0.0, 0.8, -9.5, 0.8, 8.0);
    addWarmSpot(-6.0, 0.8, -12.0, 0.6, 6.0);
    addWarmSpot(6.0, 0.8, -12.0, 0.6, 6.0);

    this.scene.add(this.lightsGroup);
  }

  setLightingMode(isNight) {
    this.isNight = isNight;
    if (isNight) {
      this.scene.background.set(0x0c0e14);
      this.scene.fog.color.set(0x0c0e14);
      this.scene.fog.density = 0.02;
      this.hemiLight.color.set(0x222a3a);
      this.hemiLight.groundColor.set(0x101318);
      this.hemiLight.intensity = 0.2;
      this.sunLight.intensity = 0.05;
      this.skyFill.intensity = 0.08;
      this.interiorPointLights.forEach((pl) => {
        pl.intensity = pl.intensity * 2.2;
      });
      this.renderer.toneMappingExposure = 1.3;
    } else {
      this.scene.background.set(0xf5f3ee);
      this.scene.fog.color.set(0xf5f3ee);
      this.scene.fog.density = 0.015;
      this.hemiLight.color.set(0xfff8ee);
      this.hemiLight.groundColor.set(0xd4cdc3);
      this.hemiLight.intensity = 0.65;
      this.sunLight.intensity = 1.25;
      this.skyFill.intensity = 0.35;
      this.interiorPointLights.forEach((pl) => {
        pl.intensity = pl.intensity / 2.2;
      });
      this.renderer.toneMappingExposure = 1.05;
    }
  }

  setCeilingVisible(visible) {
    this.showCeiling = visible;
    if (this.architecture && this.architecture.ceilingGroup) {
      this.architecture.ceilingGroup.visible = visible;
    }
  }

  setCameraMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;

    if (mode === 'DOLLHOUSE') {
      this.orbitControls.enabled = true;
      this.setCeilingVisible(false);
      this.animateCameraTo(
        new THREE.Vector3(0.0, 14.0, 15.0),
        new THREE.Vector3(0.0, 1.0, 0.0)
      );
    } else if (mode === 'TOP_DOWN') {
      this.orbitControls.enabled = true;
      this.setCeilingVisible(false);
      this.animateCameraTo(
        new THREE.Vector3(0.0, 22.0, 0.001),
        new THREE.Vector3(0.0, 0.0, 0.0)
      );
    } else if (mode === 'FIRST_PERSON') {
      this.orbitControls.enabled = false;
      this.setCeilingVisible(true);
      // Place camera at current player eye level
      this.camera.position.copy(this.playerPos);
      this.updateFPSCameraLook();
    }

    this.onModeChange(mode);
  }

  teleportToRoom(roomId) {
    const room = ROOMS_DATA.find((r) => r.id === roomId);
    if (!room) return;

    if (this.mode === 'FIRST_PERSON') {
      // Set player position directly and orient camera towards room center
      this.playerPos.set(room.cameraPos[0], room.cameraPos[1], room.cameraPos[2]);
      const dx = room.cameraTarget[0] - room.cameraPos[0];
      const dz = room.cameraTarget[2] - room.cameraPos[2];
      this.playerYaw = Math.atan2(-dx, -dz);
      this.playerPitch = 0;
      this.camera.position.copy(this.playerPos);
      this.updateFPSCameraLook();
    } else {
      // In dollhouse view, smoothly animate orbit camera focus to the room
      const target = new THREE.Vector3(room.cameraTarget[0], 1.2, room.cameraTarget[2]);
      const pos = new THREE.Vector3(room.dollhousePos[0], room.dollhousePos[1], room.dollhousePos[2]);
      this.animateCameraTo(pos, target);
    }
  }

  animateCameraTo(targetPos, targetLookAt) {
    this.cameraAnimStart.pos.copy(this.camera.position);
    this.cameraAnimStart.target.copy(this.orbitControls.target);
    this.cameraAnimEnd.pos.copy(targetPos);
    this.cameraAnimEnd.target.copy(targetLookAt);
    this.cameraAnimProgress = 0;
    this.animatingCamera = true;
  }

  bindEvents() {
    // Resize
    this.handleResize = () => {
      if (!this.container) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', this.handleResize);

    // Keyboard (WASD)
    this.handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
      }
    };
    this.handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
      }
    };
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    // Mouse movement for FPS look & Raycasting
    this.handleMouseMove = (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (this.mode === 'FIRST_PERSON' && (this.isPointerLocked || this.isDraggingMouse)) {
        const movementX = e.movementX || (e.clientX - this.lastMousePos.x);
        const movementY = e.movementY || (e.clientY - this.lastMousePos.y);

        this.playerYaw -= movementX * 0.003;
        this.playerPitch -= movementY * 0.003;
        // Clamp vertical look angle
        this.playerPitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, this.playerPitch));
        this.updateFPSCameraLook();
      }

      this.lastMousePos = { x: e.clientX, y: e.clientY };

      // Raycast check for hover
      this.checkRaycastHover();
    };

    this.handleMouseDown = (e) => {
      if (e.button === 0) {
        this.isDraggingMouse = true;
        this.lastMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    this.handleMouseUp = () => {
      this.isDraggingMouse = false;
    };

    this.handleClick = (e) => {
      this.checkRaycastClick(e);
    };

    const dom = this.renderer.domElement;
    dom.addEventListener('mousemove', this.handleMouseMove);
    dom.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    dom.addEventListener('click', this.handleClick);
  }

  checkRaycastHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    let foundProduct = null;
    let foundHotspot = null;

    for (let hit of intersects) {
      let cur = hit.object;
      while (cur && cur !== this.scene) {
        if (cur.userData && cur.userData.isHotspot) {
          foundHotspot = cur.userData.productId;
          break;
        }
        if (cur.userData && cur.userData.productId) {
          foundProduct = cur.userData.productId;
          break;
        }
        cur = cur.parent;
      }
      if (foundProduct || foundHotspot) break;
    }

    const hoveredId = foundHotspot || foundProduct;
    if (hoveredId !== this.hoveredProduct) {
      this.hoveredProduct = hoveredId;
      this.container.style.cursor = hoveredId ? 'pointer' : 'default';
      this.onProductHover(hoveredId);
    }
  }

  checkRaycastClick(e) {
    if (this.hoveredProduct) {
      const product = SHOWROOM_PRODUCTS.find((p) => p.id === this.hoveredProduct);
      if (product) {
        this.activeProduct = product;
        this.onProductSelect(product);
      }
    }
  }

  updateFPSCameraLook() {
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.x = this.playerPitch;
    euler.y = this.playerYaw;
    this.camera.quaternion.setFromEuler(euler);
  }

  updatePlayerMovement(delta) {
    if (this.mode !== 'FIRST_PERSON') return;

    const moveSpeed = 4.2; // meters per second
    const moveDir = new THREE.Vector3();

    // Keyboard inputs
    if (this.keys.forward) moveDir.z -= 1;
    if (this.keys.backward) moveDir.z += 1;
    if (this.keys.left) moveDir.x -= 1;
    if (this.keys.right) moveDir.x += 1;

    // Mobile Virtual Joystick input
    if (Math.abs(this.joystickVector.x) > 0.1 || Math.abs(this.joystickVector.y) > 0.1) {
      moveDir.x += this.joystickVector.x;
      moveDir.z -= this.joystickVector.y;
    }

    if (moveDir.lengthSq() > 0.001) {
      moveDir.normalize();

      // Transform direction according to player's yaw
      const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.playerYaw);
      const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.playerYaw);

      const targetMovement = forward.multiplyScalar(-moveDir.z).add(right.multiplyScalar(moveDir.x));
      targetMovement.multiplyScalar(moveSpeed * delta);

      // Check collision with obstacles
      const nextPos = this.playerPos.clone().add(targetMovement);
      const playerRadius = 0.45; // clearance radius

      // Test against collision obstacles
      let collideX = false;
      let collideZ = false;

      for (let obs of COLLISION_OBSTACLES) {
        // Test X movement
        if (
          nextPos.x + playerRadius > obs.minX &&
          nextPos.x - playerRadius < obs.maxX &&
          this.playerPos.z + playerRadius > obs.minZ &&
          this.playerPos.z - playerRadius < obs.maxZ
        ) {
          collideX = true;
        }

        // Test Z movement
        if (
          this.playerPos.x + playerRadius > obs.minX &&
          this.playerPos.x - playerRadius < obs.maxX &&
          nextPos.z + playerRadius > obs.minZ &&
          nextPos.z - playerRadius < obs.maxZ
        ) {
          collideZ = true;
        }
      }

      // Test against walking limits
      if (nextPos.x < WALK_LIMITS.minX || nextPos.x > WALK_LIMITS.maxX) collideX = true;
      if (nextPos.z < WALK_LIMITS.minZ || nextPos.z > WALK_LIMITS.maxZ) collideZ = true;

      if (!collideX) this.playerPos.x = nextPos.x;
      if (!collideZ) this.playerPos.z = nextPos.z;

      this.camera.position.copy(this.playerPos);
    }
  }

  updateProductVariant(productId, variant) {
    if (!this.furniture || !this.furniture.interactiveMeshes) return;
    this.furniture.interactiveMeshes.forEach((mesh) => {
      if (mesh.userData && mesh.userData.productId === productId) {
        if (mesh.material && mesh.material.color) {
          mesh.material.color.set(variant.color3);
        }
      }
    });
  }

  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(this.animate);

    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    const elapsedTime = (now - this.startTime) / 1000;

    // 1. Camera interpolation animation
    if (this.animatingCamera) {
      this.cameraAnimProgress += delta / this.cameraAnimDuration;
      const t = Math.min(1.0, this.cameraAnimProgress);
      // Smooth easeInOutCubic
      const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      this.camera.position.lerpVectors(this.cameraAnimStart.pos, this.cameraAnimEnd.pos, easeT);
      this.orbitControls.target.lerpVectors(this.cameraAnimStart.target, this.cameraAnimEnd.target, easeT);

      if (t >= 1.0) {
        this.animatingCamera = false;
      }
    }

    // 2. First-person movement
    if (this.mode === 'FIRST_PERSON') {
      this.updatePlayerMovement(delta);
    } else {
      this.orbitControls.update();
    }

    // 3. Hotspot beacon animations (gentle floating bob + pulse ring)
    if (this.furniture && this.furniture.hotspots) {
      this.furniture.hotspots.forEach((hs) => {
        // Vertical hover bob
        hs.position.y = hs.userData.baseY + Math.sin(elapsedTime * 2.5 + hs.position.x) * 0.05;
        // Ring pulse scale
        if (hs.userData.ringMesh) {
          const s = 1.0 + Math.sin(elapsedTime * 3.5) * 0.15;
          hs.userData.ringMesh.scale.set(s, s, s);
        }
      });
    }

    // 4. Broadcast real-time position to React UI (for minimap radar)
    const currentPos = this.mode === 'FIRST_PERSON' ? this.playerPos : this.orbitControls.target;
    this.onPositionUpdate({
      x: currentPos.x,
      z: currentPos.z,
      yaw: this.playerYaw,
      mode: this.mode
    });

    // 5. Render
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.isRunning = false;
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mouseup', this.handleMouseUp);

    if (this.renderer && this.renderer.domElement) {
      const dom = this.renderer.domElement;
      dom.removeEventListener('mousemove', this.handleMouseMove);
      dom.removeEventListener('mousedown', this.handleMouseDown);
      dom.removeEventListener('click', this.handleClick);
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
      this.renderer.dispose();
    }
  }
}
