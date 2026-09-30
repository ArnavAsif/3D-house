'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  Eye,
  Layers,
  Moon,
  Sun,
  ShoppingCart,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { positioningService } from '@/lib/showroom/positioningService';
import { productService } from '@/lib/products/productService';
import ProductModal from '@/components/products/ProductModal';
import CartDrawer from '@/components/cart/CartDrawer';
import Minimap from './Minimap';
import MobileControls from './MobileControls';
import SpecsModal from './SpecsModal';
import ProductCalloutsLayer from './ProductCalloutsLayer';
import { CartItem } from '@/types/cart';
import { Product, ProductVariant } from '@/types/product';

import { ShowroomProductWithDetails } from '@/types/showroom';

interface ShowroomOverlayProps {
  showroomProducts?: ShowroomProductWithDetails[];
  activeProductId: string | null;
  hoveredProductId: string | null;
  onCloseProduct: () => void;
  onSelectProduct: (id: string) => void;
  onHoverProduct?: (id: string | null) => void;
  onVariantChange: (id: string, variant: ProductVariant) => void;
  currentMode: string;
  onModeChange: (mode: string) => void;
  isNight: boolean;
  onToggleNight: () => void;
  showCeiling: boolean;
  onToggleCeiling: () => void;
  onTeleportRoom: (roomId: string) => void;
  playerPosition: { x: number; z: number; yaw: number };
  onJoystickMove?: (vector: { x: number; y: number }) => void;
}

/**
 * ShowroomOverlay
 * Top-level luxury HUD overlay: Navigation header, 2D Floor Plan Radar Minimap,
 * room jumper, modal displays, and Supabase-backed cart drawer.
 */
export default function ShowroomOverlay({
  showroomProducts,
  activeProductId,
  hoveredProductId,
  onCloseProduct,
  onSelectProduct,
  onHoverProduct,
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
}: ShowroomOverlayProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showArchSpecs, setShowArchSpecs] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);
  const [hoveredProductName, setHoveredProductName] = useState<string>('Product');

  const rooms = positioningService.getRooms();

  const spatialTargets = useMemo(() => {
    if (showroomProducts && showroomProducts.length > 0) {
      return showroomProducts.map((sp) => ({
        showroomId: sp.showroomId,
        productId: sp.productId,
        position: sp.position,
        rotation: sp.rotation,
        scale: sp.scale,
        hotspotOffset: [0, 0.85, 0] as [number, number, number],
        clearanceRadiusM: sp.interactionRadius,
        room: sp.product.room,
        displayZone: sp.product.displayZone,
        placementType: sp.product.placementType as any,
        modelUrl: sp.modelUrl
      }));
    }
    return positioningService.getAllPositions();
  }, [showroomProducts]);

  // Hide controls hint after 9s
  useEffect(() => {
    const timer = setTimeout(() => setShowControlsHint(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  // Update hover product name dynamically via productService
  useEffect(() => {
    if (!hoveredProductId) return;
    productService.getProduct(hoveredProductId).then((p) => {
      if (p) setHoveredProductName(p.title || p.name);
    }).catch(() => {
      setHoveredProductName(hoveredProductId);
    });
  }, [hoveredProductId]);

  const handleAddToCart = (item: { product: Product; variant: ProductVariant; quantity: number }) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          (ci.productId === item.product.id || ci.product?.id === item.product.id) &&
          (ci.variantId === item.variant?.id || ci.variant?.id === item.variant?.id)
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: `${item.product.id}-${item.variant.id}`,
          productId: item.product.id,
          variantId: item.variant.id,
          product: item.product,
          variant: item.variant,
          quantity: item.quantity,
          unitPrice: item.variant.price || item.product.price
        }
      ];
    });
  };

  const handleRemoveFromCart = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearCart = () => {
    setCart([]);
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
          {rooms.map((room) => (
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
            aria-label="Toggle Lighting Mode"
          >
            {isNight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Ceiling Toggle */}
          <button
            className={`icon-action-btn ${showCeiling ? 'active' : ''}`}
            onClick={onToggleCeiling}
            title={showCeiling ? 'Hide Ceiling (Cutaway)' : 'Show Full Ceiling'}
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

          {/* Shopping Cart Button */}
          <button
            className="cart-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            title="View Showroom Cart"
            aria-label="Open Shopping Cart"
          >
            <ShoppingCart size={18} />
            <span className="cart-label">Cart</span>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
        </div>
      </header>

      {/* 2. MODERN PRODUCT CALLOUT HUD (Leader line & frosted badge matching reference photo) */}
      <ProductCalloutsLayer
        hoveredProductId={hoveredProductId}
        onSelectProduct={onSelectProduct}
        onHoverProduct={onHoverProduct || (() => {})}
        targets={spatialTargets}
      />

      {/* 2. CONTROLS GUIDE OVERLAY */}
      {showControlsHint && (
        <div className="controls-hint-card">
          <div className="hint-header">
            <Sparkles size={16} color="var(--color-gold)" />
            <span>INTERACTIVE SHOWROOM CONTROLS</span>
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
            Click to inspect <strong>{hoveredProductName}</strong>
          </span>
        </div>
      )}

      {/* 4. INTERACTIVE 2D MINIMAP HUD */}
      <Minimap
        playerPosition={playerPosition}
        hoveredProductId={hoveredProductId}
        onSelectProduct={onSelectProduct}
      />

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
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* 8. ARCHITECTURAL BLUEPRINT SPECIFICATIONS MODAL */}
      <SpecsModal
        isOpen={showArchSpecs}
        onClose={() => setShowArchSpecs(false)}
      />
    </>
  );
}
