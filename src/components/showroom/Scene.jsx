'use client';

import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PerformanceManager from './PerformanceManager';
import Environment from './Environment';
import Lighting from './Lighting';
import Architecture from './Architecture';
import Furniture from './Furniture';
import Products from './Products';
import Player from './Player';
import Camera from './Camera';
import CollisionSystem from './CollisionSystem';
import ProductInteraction from './ProductInteraction';
import LoadingScreen from './LoadingScreen';
import ShowroomOverlay from './ShowroomOverlay';
import { ROOMS_DATA } from '../../data/roomData';

/**
 * CanvasReadyNotifier
 * Signals to the LoadingScreen when the WebGL canvas has compiled and rendered its first frame.
 */
function CanvasReadyNotifier({ onReady }) {
  const notified = useRef(false);
  useFrame(() => {
    if (!notified.current) {
      notified.current = true;
      if (onReady) onReady();
    }
  });
  return null;
}

/**
 * Scene
 * Master React Three Fiber WebGL Showroom component.
 * Integrates modular components for Architecture, Furniture, Products,
 * Lighting, CollisionSystem, Camera, Player, and UI HUD.
 */
export default function Scene() {
  const [sceneReady, setSceneReady] = useState(false);
  const [currentMode, setCurrentMode] = useState('DOLLHOUSE');
  const [isNight, setIsNight] = useState(false);
  const [showCeiling, setShowCeiling] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 7.8, yaw: 0, mode: 'DOLLHOUSE' });
  const [teleportTarget, setTeleportTarget] = useState(null);
  const [joystickVector, setJoystickVector] = useState({ x: 0, y: 0 });

  const [furnitureGroup, setFurnitureGroup] = useState(null);

  const handleRegisterInteractives = ({ group }) => {
    setFurnitureGroup(group);
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    if (mode === 'FIRST_PERSON') {
      setShowCeiling(true);
    } else {
      setShowCeiling(false);
    }
  };

  const handleTeleportRoom = (roomId) => {
    const room = ROOMS_DATA.find((r) => r.id === roomId);
    if (room && room.cameraWaypoint) {
      setTeleportTarget({
        x: room.cameraWaypoint.position[0],
        z: room.cameraWaypoint.position[2],
        yaw: 0
      });
      // Automatically switch to first person mode when teleporting to a specific room
      if (currentMode !== 'FIRST_PERSON') {
        handleModeChange('FIRST_PERSON');
      }
    }
  };

  const handleVariantChange = (productId, variant) => {
    setActiveVariant(variant);
  };

  return (
    <div className="showroom-app-root">
      {/* 1. Loading Screen Fallback */}
      <LoadingScreen isSceneReady={sceneReady} />

      {/* 2. WebGL 3D Canvas Viewport via React Three Fiber */}
      <div className="three-viewport-canvas">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          }}
          camera={{
            fov: 60,
            near: 0.1,
            far: 100,
            position: [0, 16, 20]
          }}
        >
          <Suspense fallback={null}>
            {/* Notify when WebGL pipeline renders first frame */}
            <CanvasReadyNotifier onReady={() => setSceneReady(true)} />

            {/* Adaptive GPU / Frame Scaling */}
            <PerformanceManager />

            {/* Atmosphere, Sky & Garden */}
            <Environment isNight={isNight} />

            {/* Dynamic Day/Night Lighting Engine */}
            <Lighting isNight={isNight} />

            {/* Complete Structural Architectural Shell */}
            <Architecture showCeiling={showCeiling} />

            {/* Curated Luxury Furniture & Fixtures */}
            <Furniture onRegisterInteractives={handleRegisterInteractives} />

            {/* Decoupled Interactive Product Zones & Hotspots */}
            <Products
              activeProductId={activeProductId}
              hoveredProductId={hoveredProductId}
              onProductClick={(id) => setActiveProductId(id)}
              activeVariant={activeVariant}
              sceneFurnitureGroup={furnitureGroup}
            />

            {/* First-Person Walking Controller */}
            <Player
              currentMode={currentMode}
              joystickVector={joystickVector}
              onPositionUpdate={setPlayerPosition}
              teleportTarget={teleportTarget}
            />

            {/* Dual Mode Camera System */}
            <Camera currentMode={currentMode} />

            {/* Collision Resolution Engine */}
            <CollisionSystem />

            {/* Raycasting Event Manager */}
            <ProductInteraction
              onProductHover={setHoveredProductId}
              onProductSelect={(id) => setActiveProductId(id)}
              activeProduct={activeProductId}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. Luxury UI & HUD Overlay */}
      <ShowroomOverlay
        activeProductId={activeProductId}
        hoveredProductId={hoveredProductId}
        onCloseProduct={() => setActiveProductId(null)}
        onSelectProduct={(id) => setActiveProductId(id)}
        onVariantChange={handleVariantChange}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        isNight={isNight}
        onToggleNight={() => setIsNight(!isNight)}
        showCeiling={showCeiling}
        onToggleCeiling={() => setShowCeiling(!showCeiling)}
        onTeleportRoom={handleTeleportRoom}
        playerPosition={playerPosition}
        onJoystickMove={setJoystickVector}
      />
    </div>
  );
}
