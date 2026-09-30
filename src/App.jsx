import React, { useEffect, useRef, useState } from 'react';
import { ThreeRoomScene } from './three/ThreeRoomScene';
import ShowroomUI from './components/ShowroomUI';
import './App.css';

export default function App() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  const [activeProduct, setActiveProduct] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [currentMode, setCurrentMode] = useState('DOLLHOUSE');
  const [isNight, setIsNight] = useState(false);
  const [showCeiling, setShowCeiling] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 7.8, yaw: 0, mode: 'DOLLHOUSE' });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new ThreeRoomScene(containerRef.current, {
      onProductSelect: (product) => {
        setActiveProduct(product);
      },
      onProductHover: (productId) => {
        setHoveredProductId(productId);
      },
      onPositionUpdate: (pos) => {
        setPlayerPosition(pos);
      },
      onModeChange: (mode) => {
        setCurrentMode(mode);
        if (mode === 'FIRST_PERSON') {
          setShowCeiling(true);
        } else {
          setShowCeiling(false);
        }
      }
    });

    sceneRef.current = scene;

    return () => {
      scene.destroy();
    };
  }, []);

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    if (sceneRef.current) {
      sceneRef.current.setCameraMode(mode);
    }
  };

  const handleToggleNight = () => {
    const nextNight = !isNight;
    setIsNight(nextNight);
    if (sceneRef.current) {
      sceneRef.current.setLightingMode(nextNight);
    }
  };

  const handleToggleCeiling = () => {
    const nextCeiling = !showCeiling;
    setShowCeiling(nextCeiling);
    if (sceneRef.current) {
      sceneRef.current.setCeilingVisible(nextCeiling);
    }
  };

  const handleTeleportRoom = (roomId) => {
    if (sceneRef.current) {
      sceneRef.current.teleportToRoom(roomId);
    }
  };

  const handleVariantChange = (productId, variant) => {
    if (sceneRef.current) {
      sceneRef.current.updateProductVariant(productId, variant);
    }
  };

  const handleJoystickMove = (vec) => {
    if (sceneRef.current) {
      sceneRef.current.joystickVector = vec;
    }
  };

  return (
    <div className="showroom-app-root">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={containerRef} className="three-viewport-canvas" />

      {/* Modern Luxury UI Layer */}
      <ShowroomUI
        activeProduct={activeProduct}
        hoveredProductId={hoveredProductId}
        onCloseProduct={() => setActiveProduct(null)}
        onSelectProduct={(prod) => setActiveProduct(prod)}
        onVariantChange={handleVariantChange}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        isNight={isNight}
        onToggleNight={handleToggleNight}
        showCeiling={showCeiling}
        onToggleCeiling={handleToggleCeiling}
        onTeleportRoom={handleTeleportRoom}
        playerPosition={playerPosition}
        onJoystickMove={handleJoystickMove}
      />
    </div>
  );
}
