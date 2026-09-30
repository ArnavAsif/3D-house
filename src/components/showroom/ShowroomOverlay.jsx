'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Eye,
  Layers,
  Moon,
  Sun,
  ShoppingCart,
  X,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  Navigation
} from 'lucide-react';
import { ROOMS_DATA, ARCHITECTURAL_SPECS } from '../../data/roomData';
import { SHOWROOM_PRODUCTS } from '../../data/showroomProducts';
import ProductModal from './ProductModal';
import Cart from './Cart';
import MobileControls from './MobileControls';

/**
 * ShowroomOverlay
 * Top-level luxury HUD overlay: Navigation header, 2D Floor Plan Radar Minimap,
 * controls hint, room jumper, modal displays, and cart drawer.
 */
export default function ShowroomOverlay({
  activeProductId,
  hoveredProductId,
  onCloseProduct,
  onSelectProduct,
  onVariantChange,
  currentMode,
  onModeChange,
  isNight,
  onToggleNight,
  showCeiling,
  onToggleCeiling,
  onTeleportRoom,
  playerPosition,
  onJoystickMove
}) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMinimapExpanded, setIsMinimapExpanded] = useState(false);
  const [showArchSpecs, setShowArchSpecs] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);

  // Hide controls hint after 9s
  useEffect(() => {
    const timer = setTimeout(() => setShowControlsHint(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.product.id === item.product.id &&
          (ci.variant?.id === item.variant?.id || ci.variant?.name === item.variant?.name)
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* 1. TOP NAVIGATION HEADER */}
      <header className="showroom-nav-header">
        <div className="nav-brand-section">
          <div className="brand-icon-wrapper">
            <Compass size={22} className="brand-compass-icon" />
          </div>
          <div className="brand-text-block">
            <span className="brand-supertitle">ARCHITECTURAL 3D SHOWROOM</span>
            <h1 className="brand-maintitle">Villa Lumina</h1>
          </div>
        </div>

        {/* Room Teleport Quick-Pills */}
        <div className="room-nav-pills">
          {ROOMS_DATA.map((room) => (
            <button
              key={room.id}
              className="room-pill-btn"
              onClick={() => onTeleportRoom(room.id)}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Action Toggles */}
        <div className="nav-actions-section">
          {/* Camera View Mode */}
          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${currentMode === 'DOLLHOUSE' ? 'active' : ''}`}
              onClick={() => onModeChange('DOLLHOUSE')}
              title="Dollhouse Axonometric View"
            >
              <Layers size={15} />
              <span>Dollhouse</span>
            </button>
            <button
              className={`mode-btn ${currentMode === 'FIRST_PERSON' ? 'active' : ''}`}
              onClick={() => onModeChange('FIRST_PERSON')}
              title="First-Person Walkthrough"
            >
              <Eye size={15} />
              <span>Walkthrough</span>
            </button>
          </div>

          {/* Lighting Mode Switcher */}
          <button
            className={`icon-action-btn ${isNight ? 'active-night' : ''}`}
            onClick={onToggleNight}
            title={isNight ? 'Switch to Golden Hour Day' : 'Switch to Moody Evening'}
          >
            {isNight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Ceiling Toggle */}
          <button
            className={`icon-action-btn ${showCeiling ? 'active' : ''}`}
            onClick={onToggleCeiling}
            title={showCeiling ? 'Hide Ceiling (Cutaway)' : 'Show Full Ceiling'}
          >
            <Layers size={18} />
          </button>

          {/* Architectural Specs Modal Trigger */}
          <button
            className="icon-action-btn"
            onClick={() => setShowArchSpecs(true)}
            title="View Architectural Blueprint Specs"
          >
            <Info size={18} />
          </button>

          {/* Shopping Cart Button */}
          <button
            className="cart-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            title="View Showroom Cart"
          >
            <ShoppingCart size={18} />
            <span className="cart-label">Cart</span>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
        </div>
      </header>

      {/* 2. CONTROLS GUIDE OVERLAY */}
      {showControlsHint && (
        <div className="controls-hint-card">
          <div className="hint-header">
            <Sparkles size={16} color="var(--color-gold)" />
            <span>INTERACTIVE SHOWROOM CONTROLS</span>
            <button className="hint-close-btn" onClick={() => setShowControlsHint(false)}>
              <X size={14} />
            </button>
          </div>
          <div className="hint-body">
            <div className="hint-row">
              <span className="kbd-pill">W</span>
              <span className="kbd-pill">A</span>
              <span className="kbd-pill">S</span>
              <span className="kbd-pill">D</span>
              <span className="hint-text">or Arrow Keys to walk through the villa</span>
            </div>
            <div className="hint-row">
              <span className="kbd-pill">Mouse Drag</span>
              <span className="hint-text">Look around in 360° or rotate dollhouse</span>
            </div>
            <div className="hint-row">
              <span className="hotspot-mini-dot"></span>
              <span className="hint-text">Click any golden pin or furniture piece to inspect details</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. HOVERED PRODUCT PREVIEW CHIP */}
      {hoveredProductId && !activeProductId && (
        <div className="hover-chip">
          <Sparkles size={14} className="hover-sparkle" />
          <span>
            Click to inspect{' '}
            <strong>
              {SHOWROOM_PRODUCTS.find((p) => p.id === hoveredProductId)?.name || 'Product'}
            </strong>
          </span>
        </div>
      )}

      {/* 4. INTERACTIVE 2D MINIMAP HUD */}
      <div className={`minimap-container ${isMinimapExpanded ? 'expanded' : ''}`}>
        <div className="minimap-header">
          <div className="minimap-title-row">
            <Navigation size={13} />
            <span>Floor Plan Radar</span>
          </div>
          <button
            className="minimap-expand-btn"
            onClick={() => setIsMinimapExpanded(!isMinimapExpanded)}
          >
            {isMinimapExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>

        {/* Scaled 2D Architectural SVG Floor Plan */}
        <div className="minimap-canvas-wrapper">
          <svg viewBox="-12 -16 24 26" className="minimap-svg">
            {/* Background Villa Bounds */}
            <rect x="-10" y="-8" width="20" height="14.5" className="map-house-floor" />
            <rect x="-11" y="-15.5" width="22" height="7.5" className="map-garden-ground" />
            <rect x="-3.5" y="6.5" width="7" height="2.5" className="map-porch-ground" />

            {/* Room Zones */}
            <rect x="-9.5" y="-1.5" width="8" height="8" className="map-room-zone" />
            <text x="-5.5" y="2.5" className="map-room-label">Living Room</text>

            <rect x="1.5" y="1.5" width="8" height="5" className="map-room-zone" />
            <text x="5.5" y="4.2" className="map-room-label">Dining Area</text>

            <rect x="1.5" y="-7.5" width="8" height="8" className="map-room-zone" />
            <text x="5.5" y="-3.5" className="map-room-label">Kitchen</text>

            <rect x="-9.5" y="-7.5" width="7.5" height="6" className="map-room-zone" />
            <text x="-5.7" y="-4.2" className="map-room-label">Showroom Suite</text>

            <rect x="-2.0" y="-7.5" width="3.5" height="4.5" className="map-room-zone" />
            <text x="-0.2" y="-5.2" className="map-room-label">Bath</text>

            <text x="0" y="4.2" className="map-room-label foyer-label">Foyer</text>
            <text x="0" y="-11.0" className="map-room-label garden-label">Rear Garden</text>

            {/* Exterior Walls */}
            <line x1="-10" y1="6.5" x2="-1.8" y2="6.5" className="map-wall-solid" />
            <line x1="1.8" y1="6.5" x2="10" y2="6.5" className="map-wall-solid" />
            <line x1="-1.8" y1="6.5" x2="1.8" y2="6.5" className="map-door-entrance" />

            <line x1="-10" y1="-8" x2="-2.0" y2="-8" className="map-wall-glass" />
            <line x1="-2.0" y1="-8" x2="1.5" y2="-8" className="map-wall-solid" />
            <line x1="1.5" y1="-8" x2="6.0" y2="-8" className="map-wall-glass" />
            <line x1="6.0" y1="-8" x2="10" y2="-8" className="map-wall-solid" />

            <line x1="-10" y1="-8" x2="-10" y2="6.5" className="map-wall-glass" />
            <line x1="10" y1="-8" x2="10" y2="6.5" className="map-wall-solid" />

            {/* Interior Partitions */}
            <line x1="-2.0" y1="-7.5" x2="-2.0" y2="-3.0" className="map-wall-interior" />
            <line x1="1.5" y1="-7.5" x2="1.5" y2="-3.0" className="map-wall-interior" />
            <line x1="-2.0" y1="-3.0" x2="-0.6" y2="-3.0" className="map-wall-interior" />
            <line x1="0.6" y1="-3.0" x2="1.5" y2="-3.0" className="map-wall-interior" />

            <line x1="-9.5" y1="-1.5" x2="-4.5" y2="-1.5" className="map-wall-interior" />
            <line x1="-3.0" y1="-1.5" x2="-2.0" y2="-1.5" className="map-wall-interior" />

            {/* Product Hotspots on Minimap */}
            {SHOWROOM_PRODUCTS.map((prod) => (
              <circle
                key={prod.id}
                cx={prod.position[0]}
                cy={prod.position[2]}
                r={hoveredProductId === prod.id ? '0.7' : '0.45'}
                className={`map-product-dot ${hoveredProductId === prod.id ? 'active' : ''}`}
                onClick={() => onSelectProduct(prod.id)}
              >
                <title>{prod.name}</title>
              </circle>
            ))}

            {/* Real-time Player Position & View Angle Cone */}
            {playerPosition && (
              <g
                transform={`translate(${playerPosition.x}, ${playerPosition.z}) rotate(${
                  (-playerPosition.yaw * 180) / Math.PI
                })`}
              >
                <polygon points="0,0 -1.5,-3 1.5,-3" className="player-view-cone" />
                <circle cx="0" cy="0" r="0.6" className="player-marker-core" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* 5. VIRTUAL TOUCH JOYSTICK FOR MOBILE WALKTHROUGH */}
      <MobileControls
        currentMode={currentMode}
        onJoystickMove={onJoystickMove}
      />

      {/* 6. DYNAMIC SUPABASE COMMERCE PRODUCT DETAIL MODAL */}
      <ProductModal
        productId={activeProductId}
        onClose={onCloseProduct}
        onAddToCart={handleAddToCart}
        onVariantChange={onVariantChange}
      />

      {/* 7. CUSTOM COMMERCE SHOPPING CART DRAWER */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
      />

      {/* 8. ARCHITECTURAL BLUEPRINT SPECIFICATIONS MODAL */}
      {showArchSpecs && (
        <div className="product-modal-backdrop" onClick={() => setShowArchSpecs(false)}>
          <div className="specs-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="specs-modal-header">
              <h2>Architectural Specifications & Floor Plan</h2>
              <button className="modal-close-btn" onClick={() => setShowArchSpecs(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="specs-grid-display">
              <div className="spec-card">
                <h3>Walls & Partitions</h3>
                <p>
                  <strong>Exterior:</strong> {ARCHITECTURAL_SPECS.wallThickness.exterior} solid
                  insulated assembly.
                </p>
                <p>
                  <strong>Interior:</strong> {ARCHITECTURAL_SPECS.wallThickness.interior} dry-wall
                  partitions.
                </p>
                <p>
                  <strong>Ceiling:</strong> {ARCHITECTURAL_SPECS.ceilingHeight} finished ceiling
                  with recessed LED coves.
                </p>
              </div>

              <div className="spec-card">
                <h3>Doors & Openings</h3>
                <p>
                  <strong>Front Door:</strong> {ARCHITECTURAL_SPECS.doors.entrance.width} ×{' '}
                  {ARCHITECTURAL_SPECS.doors.entrance.height} grand pivot architectural timber
                  door.
                </p>
                <p>
                  <strong>Interior:</strong> {ARCHITECTURAL_SPECS.doors.interior.width} ×{' '}
                  {ARCHITECTURAL_SPECS.doors.interior.height} flush frameless doors with concealed
                  hinges.
                </p>
                <p>
                  <strong>Patio Sliders:</strong> {ARCHITECTURAL_SPECS.doors.patioSlider.width} ×{' '}
                  {ARCHITECTURAL_SPECS.doors.patioSlider.height} multi-panel sliding pocket doors.
                </p>
              </div>

              <div className="spec-card">
                <h3>Design Principles</h3>
                <p>
                  <strong>Circulation:</strong> Continuous non-bottlenecked path with {'>'}1.5m
                  clearance.
                </p>
                <p>
                  <strong>Materiality:</strong> Warm Oak, Roman Travertine, Calacatta Gold Marble,
                  and Matte Black metal.
                </p>
                <p>
                  <strong>Decoupling:</strong> Meshes carry only IDs (`product-XX`) for dynamic
                  Next.js + Supabase hydration.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
