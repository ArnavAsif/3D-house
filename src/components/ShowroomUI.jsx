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
  Plus,
  Minus,
  Check,
  Sparkles,
  Info,
  RotateCcw,
  Navigation,
  Move
} from 'lucide-react';
import { ROOMS_DATA, ARCHITECTURAL_SPECS } from '../data/roomData';
import { SHOWROOM_PRODUCTS } from '../data/showroomProducts';

export default function ShowroomUI({
  activeProduct,
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
  // Shopping Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Minimap state
  const [isMinimapExpanded, setIsMinimapExpanded] = useState(false);
  const [showArchSpecs, setShowArchSpecs] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);

  // Virtual Joystick state
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickKnobPos, setJoystickKnobPos] = useState({ x: 0, y: 0 });

  // Update selected variant when active product changes
  useEffect(() => {
    if (activeProduct && activeProduct.variants && activeProduct.variants.length > 0) {
      setSelectedVariant(activeProduct.variants[0]);
      setQuantity(1);
    }
  }, [activeProduct]);

  // Hide controls hint after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControlsHint(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    if (!activeProduct) return;
    const item = {
      product: activeProduct,
      variant: selectedVariant || activeProduct.variants[0],
      quantity
    };

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.product.id === item.product.id && ci.variant.name === item.variant.name
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Joystick touch handlers
  const handleJoystickPointerDown = (e) => {
    e.stopPropagation();
    setJoystickActive(true);
    updateJoystickFromPointer(e);
  };

  const handleJoystickPointerMove = (e) => {
    if (!joystickActive) return;
    e.stopPropagation();
    updateJoystickFromPointer(e);
  };

  const handleJoystickPointerUp = () => {
    setJoystickActive(false);
    setJoystickKnobPos({ x: 0, y: 0 });
    if (onJoystickMove) onJoystickMove({ x: 0, y: 0 });
  };

  const updateJoystickFromPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || centerX;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || centerY;

    let dx = clientX - centerX;
    let dy = clientY - centerY;
    const maxDist = 36;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > maxDist) {
      dx = (dx / dist) * maxDist;
      dy = (dy / dist) * maxDist;
    }

    setJoystickKnobPos({ x: dx, y: dy });
    if (onJoystickMove) {
      onJoystickMove({ x: dx / maxDist, y: -dy / maxDist });
    }
  };

  return (
    <div className="showroom-ui-overlay">
      {/* 1. TOP BRANDING & CONTROLS BAR */}
      <header className="top-nav-bar">
        <div className="brand-group">
          <div className="brand-title">VILLA LUMINA</div>
          <div className="brand-badge">3D Architectural Showroom</div>
        </div>

        {/* View Mode Switcher */}
        <div className="mode-toggle-group">
          <button
            className={`mode-btn ${currentMode === 'DOLLHOUSE' ? 'active' : ''}`}
            onClick={() => onModeChange('DOLLHOUSE')}
            title="3D Dollhouse Cutaway Floor Plan"
          >
            <Layers size={16} />
            <span>Dollhouse 3D</span>
          </button>

          <button
            className={`mode-btn ${currentMode === 'FIRST_PERSON' ? 'active' : ''}`}
            onClick={() => onModeChange('FIRST_PERSON')}
            title="First-Person Walkthrough (WASD / Touch)"
          >
            <Move size={16} />
            <span>Walkthrough</span>
          </button>

          <button
            className={`mode-btn ${currentMode === 'TOP_DOWN' ? 'active' : ''}`}
            onClick={() => onModeChange('TOP_DOWN')}
            title="Top-Down Architectural Layout"
          >
            <Compass size={16} />
            <span>Blueprint</span>
          </button>
        </div>

        {/* Environment Toggles & Cart */}
        <div className="action-buttons-group">
          <button
            className="icon-action-btn"
            onClick={onToggleNight}
            title={isNight ? 'Switch to Natural Daylight' : 'Switch to Evening Architectural Glow'}
          >
            {isNight ? <Sun size={18} className="sun-icon" /> : <Moon size={18} />}
          </button>

          <button
            className={`icon-action-btn ${showCeiling ? 'active' : ''}`}
            onClick={onToggleCeiling}
            title={showCeiling ? 'Hide Ceiling (Cutaway)' : 'Show Full Ceiling'}
          >
            <Eye size={18} />
          </button>

          <button
            className="icon-action-btn"
            onClick={() => setShowArchSpecs(true)}
            title="Architectural Blueprint Specs"
          >
            <Info size={18} />
          </button>

          <button
            className="cart-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
          >
            <ShoppingCart size={18} />
            {cartItemCount > 0 && <span className="cart-counter-badge">{cartItemCount}</span>}
          </button>
        </div>
      </header>

      {/* 2. ROOM QUICK-TELEPORT BAR */}
      <nav className="room-nav-bar">
        {ROOMS_DATA.map((room) => (
          <button
            key={room.id}
            className="room-pill-btn"
            onClick={() => onTeleportRoom(room.id)}
          >
            {room.name}
          </button>
        ))}
      </nav>

      {/* 3. WALKING INSTRUCTIONS TOAST */}
      {showControlsHint && (
        <div className="controls-hint-card">
          <div className="hint-header">
            <span className="hint-title">Interactive Navigation Guide</span>
            <button className="hint-close-btn" onClick={() => setShowControlsHint(false)}>
              <X size={14} />
            </button>
          </div>
          <div className="hint-content">
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

      {/* 4. HOVERED PRODUCT PREVIEW CHIP */}
      {hoveredProductId && !activeProduct && (
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

      {/* 5. INTERACTIVE 2D MINIMAP HUD */}
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
                onClick={() => onSelectProduct(prod)}
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

      {/* 5b. VIRTUAL JOYSTICK FOR WALKTHROUGH (Matching Step 10 in Reference Image) */}
      {currentMode === 'FIRST_PERSON' && (
        <div
          className="virtual-joystick-base"
          onPointerDown={handleJoystickPointerDown}
          onPointerMove={handleJoystickPointerMove}
          onPointerUp={handleJoystickPointerUp}
          onPointerCancel={handleJoystickPointerUp}
        >
          <div
            className="virtual-joystick-knob"
            style={{
              transform: `translate(${joystickKnobPos.x}px, ${joystickKnobPos.y}px)`
            }}
          >
            <Move size={16} />
          </div>
          <div className="joystick-hint-label">WALK JOYSTICK</div>
        </div>
      )}

      {/* 6. PRODUCT DETAIL & ADD TO CART MODAL (Mirrors Reference Image Design!) */}
      {activeProduct && (
        <div className="product-modal-backdrop" onClick={onCloseProduct}>
          <div className="product-card-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onCloseProduct}>
              <X size={18} />
            </button>

            <div className="product-modal-header">
              <div className="modal-room-tag">{activeProduct.room}</div>
              <h2 className="modal-product-title">{activeProduct.name}</h2>
              <div className="modal-price-row">
                <span className="modal-price">${activeProduct.price}</span>
                <span className="modal-rating">★ {activeProduct.rating} ({activeProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            <p className="modal-description">{activeProduct.description}</p>

            {/* Color Variant Selector */}
            {activeProduct.variants && activeProduct.variants.length > 0 && (
              <div className="variant-selection-section">
                <div className="variant-label-row">
                  <span className="section-label">Color:</span>
                  <span className="selected-variant-name">{selectedVariant?.name}</span>
                </div>
                <div className="color-swatches-row">
                  {activeProduct.variants.map((v) => (
                    <button
                      key={v.name}
                      className={`color-swatch-btn ${
                        selectedVariant?.name === v.name ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: v.hex }}
                      onClick={() => {
                        setSelectedVariant(v);
                        if (onVariantChange) onVariantChange(activeProduct.id, v);
                      }}
                      title={v.name}
                    >
                      {selectedVariant?.name === v.name && <Check size={12} color="#ffffff" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions & Material Specs */}
            <div className="modal-specs-grid">
              <div className="spec-item">
                <span className="spec-title">Dimensions</span>
                <span className="spec-value">{activeProduct.dimensions}</span>
              </div>
              <div className="spec-item">
                <span className="spec-title">Materials</span>
                <span className="spec-value">{activeProduct.materials}</span>
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="modal-action-row">
              <div className="quantity-stepper">
                <button
                  className="step-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button className="step-btn" onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>

              <button
                className={`add-to-cart-btn ${addedAnimation ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    <span>Add to Cart - ${(activeProduct.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-header-title">
                <ShoppingCart size={20} />
                <span>Showroom Cart ({cartItemCount})</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsCartOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="cart-items-list">
              {cart.length === 0 ? (
                <div className="empty-cart-state">
                  <p>Your showroom cart is empty.</p>
                  <p className="empty-cart-sub">
                    Explore the residence and click products or golden pins to add items.
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${idx}`} className="cart-item-row">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.product.name}</div>
                      <div className="cart-item-variant">Color: {item.variant.name}</div>
                      <div className="cart-item-price-unit">
                        ${item.product.price} × {item.quantity}
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <span className="cart-item-total">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        className="cart-remove-btn"
                        onClick={() => handleRemoveFromCart(idx)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-line">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="cart-summary-line">
                  <span>White Glove Delivery</span>
                  <span className="free-badge">Complimentary</span>
                </div>
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <button
                  className="checkout-btn"
                  onClick={() => alert('Showroom Order Prepared! Integrated with Storefront SDK.')}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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

            <div className="specs-body-content">
              <div className="spec-metric-card">
                <div className="metric-number">{ARCHITECTURAL_SPECS.totalBuiltAreaSqM} m²</div>
                <div className="metric-label">Total Built Area</div>
              </div>
              <div className="spec-metric-card">
                <div className="metric-number">{ARCHITECTURAL_SPECS.ceilingHeightM} m</div>
                <div className="metric-label">Finished Ceiling Height</div>
              </div>
              <div className="spec-metric-card">
                <div className="metric-number">{ARCHITECTURAL_SPECS.exteriorWallThicknessM} m</div>
                <div className="metric-label">Exterior Wall Thickness</div>
              </div>
              <div className="spec-metric-card">
                <div className="metric-number">{ARCHITECTURAL_SPECS.minimumCorridorWalkingClearanceM} m</div>
                <div className="metric-label">Min Walking Corridor</div>
              </div>

              <div className="specs-section">
                <h3>Room Area Schedule</h3>
                <div className="room-schedule-table">
                  {ROOMS_DATA.map((r) => (
                    <div key={r.id} className="room-schedule-row">
                      <span className="room-name">{r.name}</span>
                      <span className="room-area">{r.areaSqM} m²</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="specs-section">
                <h3>Materials & Finishes Palette</h3>
                <div className="material-swatches-grid">
                  {ARCHITECTURAL_SPECS.materialsPalette.map((m) => (
                    <div key={m.name} className="material-chip">
                      <div className="mat-color-dot" style={{ backgroundColor: m.hex }} />
                      <div className="mat-info">
                        <span className="mat-name">{m.name}</span>
                        <span className="mat-type">{m.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
