'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Layers,
  Moon,
  Sun,
  X,
  Sparkles,
  Info,
  ShoppingBag
} from 'lucide-react';
import Minimap from './Minimap';
import MobileControls from './MobileControls';
import SpecsModal from './SpecsModal';
import ProductModal from '@/components/products/ProductModal';
import CartDrawer from '@/components/cart/CartDrawer';
import { CartItem } from '@/types/cart';
import { Product, ProductVariant } from '@/types/product';

interface ShowroomOverlayProps {
  currentMode: string;
  onModeChange?: (mode: string) => void;
  isNight: boolean;
  onToggleNight: () => void;
  showCeiling: boolean;
  onToggleCeiling: () => void;
  playerPosition?: { x: number; z: number; yaw: number };
  onJoystickMove?: (vector: { x: number; y: number }) => void;
  doorState?: { isNear: boolean; isOpen: boolean };
  onToggleDoor?: () => void;
  activeProduct?: string | null;
  onCloseProduct?: () => void;
}

/**
 * ShowroomOverlay
 * Top-level luxury architectural HUD overlay:
 * - Brand navigation header with Day / Night toggle, Ceiling cutaway, and Cart bag
 * - Minimal luxury Front Entrance Door interaction prompt [E] OPEN / CLOSE
 * - Single interactive product detail modal & cart checkout integration
 * - 2D Floor Plan Radar Minimap (Open-plan Living Room & Entrance)
 * - Architectural blueprint specs modal
 * - Mobile walkthrough touch controls
 */
export default function ShowroomOverlay({
  currentMode,
  onModeChange,
  isNight,
  onToggleNight,
  showCeiling,
  onToggleCeiling,
  playerPosition,
  onJoystickMove,
  doorState,
  onToggleDoor,
  activeProduct,
  onCloseProduct
}: ShowroomOverlayProps) {
  const [showArchSpecs, setShowArchSpecs] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Hide controls hint after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowControlsHint(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: { product: Product; variant: ProductVariant; quantity: number }) => {
    const newItem: CartItem = {
      productId: item.product.id,
      variantId: item.variant.id,
      quantity: item.quantity,
      unitPrice: typeof item.variant.price === 'string' ? parseFloat(item.variant.price) : Number(item.variant.price || item.product.price),
      product: item.product,
      variant: item.variant
    };

    setCartItems((prev) => [...prev, newItem]);
    if (onCloseProduct) onCloseProduct();
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <>
      {/* 1. TOP LUXURY NAVIGATION HEADER */}
      <header className="showroom-nav-header">
        <div className="nav-brand-section">
          <div className="brand-icon-wrapper">
            <Compass size={22} className="brand-compass-icon" />
          </div>
          <div className="brand-text-block">
            <span className="brand-supertitle">ARCHITECTURAL VISUALIZATION</span>
            <h1 className="brand-maintitle">Villa Lumina — Living Room</h1>
          </div>
        </div>

        {/* Action Toggles */}
        <div className="nav-actions-section">
          {/* Cart Drawer Trigger */}
          <button
            className={`icon-action-btn ${totalCartCount > 0 ? 'active' : ''}`}
            onClick={() => setIsCartOpen(true)}
            title="View Shopping Cart"
            aria-label="View Cart"
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={18} />
            {totalCartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--color-gold, #c8a462)',
                  color: '#111',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Lighting Mode Switcher */}
          <button
            className={`icon-action-btn ${isNight ? 'active-night' : ''}`}
            onClick={onToggleNight}
            title={isNight ? 'Switch to Golden Hour Daylight' : 'Switch to Moody Ambient Evening'}
            aria-label="Toggle Lighting Mode"
          >
            {isNight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Ceiling Toggle */}
          <button
            className={`icon-action-btn ${showCeiling ? 'active' : ''}`}
            onClick={onToggleCeiling}
            title={showCeiling ? 'Hide Ceiling (Cutaway)' : 'Show Full Coffered Ceiling'}
            aria-label="Toggle Ceiling"
          >
            <Layers size={18} />
          </button>

          {/* Architectural Specs Modal Trigger */}
          <button
            className="icon-action-btn"
            onClick={() => setShowArchSpecs(true)}
            title="View Architectural Blueprint Specs"
            aria-label="View Blueprint Specs"
          >
            <Info size={18} />
          </button>
        </div>
      </header>

      {/* 2. MINIMAL LUXURY FRONT ENTRANCE DOOR PROMPT */}
      {doorState?.isNear && (
        <div className="luxury-door-prompt-container">
          <button
            className="luxury-door-prompt-btn"
            onClick={onToggleDoor}
            title="Press [E] or click to open/close front entrance door"
          >
            <span className="door-prompt-action">{doorState.isOpen ? 'CLOSE' : 'OPEN'}</span>
            <span className="door-prompt-sub">
              <span className="door-prompt-key">KEY [E]</span>
              <span>MAIN ENTRANCE DOOR</span>
            </span>
          </button>
        </div>
      )}

      {/* 3. FIRST-PERSON CONTROLS GUIDE OVERLAY */}
      {showControlsHint && (
        <div className="controls-hint-card">
          <div className="hint-header">
            <Sparkles size={16} color="var(--color-gold)" />
            <span>VILLA LUMINA WALKTHROUGH</span>
            <button
              className="hint-close-btn"
              onClick={() => setShowControlsHint(false)}
              aria-label="Close Hint"
            >
              <X size={14} />
            </button>
          </div>
          <div className="hint-body">
            <div className="hint-row">
              <span className="kbd-pill">W</span>
              <span className="kbd-pill">A</span>
              <span className="kbd-pill">S</span>
              <span className="kbd-pill">D</span>
              <span className="hint-text">or Arrow Keys to walk toward the entrance</span>
            </div>
            <div className="hint-row">
              <span className="kbd-pill">Mouse Drag</span>
              <span className="hint-text">Look around in full 360° first-person view</span>
            </div>
            <div className="hint-row">
              <span className="kbd-pill">E</span>
              <span className="hint-text">Approach front door to OPEN and enter the Living Room</span>
            </div>
            <div className="hint-row">
              <span className="kbd-pill">Click Chair</span>
              <span className="hint-text">Inspect the Aura Modern Lounge Chair & Add to Cart</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. SINGLE INTERACTIVE PRODUCT MODAL */}
      {activeProduct && (
        <ProductModal
          productId={activeProduct}
          onClose={() => onCloseProduct && onCloseProduct()}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 5. SLIDE-OVER LUXURY CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      {/* 6. 2D FLOOR PLAN RADAR MINIMAP */}
      <Minimap
        playerPosition={playerPosition}
        hoveredProductId={null}
        onSelectProduct={() => {}}
      />

      {/* 7. VIRTUAL TOUCH JOYSTICK FOR MOBILE WALKTHROUGH */}
      <MobileControls
        currentMode={currentMode}
        onJoystickMove={onJoystickMove}
      />

      {/* 8. ARCHITECTURAL BLUEPRINT SPECIFICATIONS MODAL */}
      <SpecsModal
        isOpen={showArchSpecs}
        onClose={() => setShowArchSpecs(false)}
      />
    </>
  );
}
