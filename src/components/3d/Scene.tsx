'use client';

import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PerformanceManager from './PerformanceManager';
import Environment from './Environment';
import Lighting from './Lighting';
import Architecture from './Architecture';
import Furniture from './Furniture';
import Player from './Player';
import Camera from './Camera';
import CollisionSystem from './CollisionSystem';
import LoadingScreen from './LoadingScreen';
import ProductInteraction from './ProductInteraction';
import ShowroomOverlay from '@/components/ui/ShowroomOverlay';

/**
 * CanvasReadyNotifier
 * Signals to the LoadingScreen when the WebGL canvas has compiled and rendered its first frame.
 */
function CanvasReadyNotifier({ onReady }: { onReady: () => void }) {
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
 * Master React Three Fiber WebGL Living Room Architectural Experience.
 *
 * Sequence:
 * 1. Player starts OUTSIDE facing the front entrance at [0.0, 1.65, 11.2].
 * 2. Player approaches the interactive front door and presses [E] or clicks OPEN.
 * 3. Front door smoothly swings open and collision updates.
 * 4. Player walks inside into the grand, open-plan Living Room.
 * 5. Player can walk freely around the spacious furniture arrangement.
 * 6. Only Master Bedroom Suite and Spa Bathroom remain closed with COMING SOON plaques.
 * 7. Single interactive product (product-01, Aura Modern Lounge Chair) with subtle highlight, click panel, and Add to Cart.
 */
export default function Scene() {
  const [sceneReady, setSceneReady] = useState(false);
  const [currentMode, setCurrentMode] = useState('FIRST_PERSON');
  const [isNight, setIsNight] = useState(false);
  const [showCeiling, setShowCeiling] = useState(true);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [joystickVector, setJoystickVector] = useState({ x: 0, y: 0 });

  // Accessible door interaction state
  const [doorState, setDoorState] = useState<{ isNear: boolean; isOpen: boolean }>({
    isNear: false,
    isOpen: false
  });
  const toggleDoorRef = useRef<(() => void) | null>(null);

  const handleModeChange = (mode: string) => {
    setCurrentMode(mode);
    if (mode === 'FIRST_PERSON') {
      setShowCeiling(true);
    } else {
      setShowCeiling(false);
    }
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
            fov: 65,
            near: 0.1,
            far: 100,
            position: [0.0, 1.65, 11.2]
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

            {/* Structural Shell with Landscaped Approach, Portico & Interactive Front Entrance Door */}
            <Architecture
              showCeiling={showCeiling}
              onDoorProximity={setDoorState}
              onToggleDoorRegister={(fn) => {
                toggleDoorRef.current = fn;
              }}
            />

            {/* Curated Luxury Furniture in Open-Plan Living Room */}
            <Furniture />

            {/* Exactly ONE Interactive Product (product-01, Aura Modern Lounge Chair) */}
            <ProductInteraction
              onProductSelect={(id) => setActiveProduct(id)}
              activeProduct={activeProduct}
            />

            {/* First-Person Walking Controller starting OUTSIDE the House */}
            <Player
              currentMode={currentMode}
              joystickVector={joystickVector}
            />

            {/* First-Person Human Eye-Height Camera System */}
            <Camera currentMode={currentMode} />

            {/* Collision Resolution Engine */}
            <CollisionSystem />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. Luxury UI & HUD Overlay */}
      <ShowroomOverlay
        currentMode={currentMode}
        onModeChange={handleModeChange}
        isNight={isNight}
        onToggleNight={() => setIsNight(!isNight)}
        showCeiling={showCeiling}
        onToggleCeiling={() => setShowCeiling(!showCeiling)}
        onJoystickMove={setJoystickVector}
        doorState={doorState}
        onToggleDoor={() => toggleDoorRef.current?.()}
        activeProduct={activeProduct}
        onCloseProduct={() => setActiveProduct(null)}
      />
    </div>
  );
}
