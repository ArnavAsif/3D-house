'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { positioningService } from '@/lib/showroom/positioningService';
import { productService } from '@/lib/products/productService';
import { Product } from '@/types/product';
import { ShowroomSpatialPosition } from '@/types/showroom';

/**
 * InteractiveTapIcon
 * Hand cursor icon with radiating tap lines, matching the ChatGPT reference image.
 */
function InteractiveTapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M12 2v2.5" />
      <path d="M5.2 5.2l1.8 1.8" />
      <path d="M18.8 5.2l-1.8 1.8" />
      <path d="M14 9V5a2 2 0 0 0-4 0v7.5l-1.9-1.9a1.6 1.6 0 0 0-2.2 0 1.6 1.6 0 0 0 0 2.2l4.8 4.8A4 4 0 0 0 13.5 19H17a4 4 0 0 0 4-4v-4.5a2 2 0 0 0-2-2h-3z" />
    </svg>
  );
}

interface ProductCalloutItemProps {
  target: ShowroomSpatialPosition;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

function ProductCalloutItem({
  target,
  isHovered,
  onSelect,
  onHover
}: ProductCalloutItemProps) {
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    productService
      .getProduct(target.showroomId)
      .then((p) => {
        if (p) setProductData(p);
      })
      .catch(() => {});
  }, [target.showroomId]);

  return (
    <div
      id={`pin-callout-${target.showroomId}`}
      className={`product-pin-callout ${isHovered ? 'hovered' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(target.showroomId);
      }}
      onMouseEnter={() => onHover(target.showroomId)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        pointerEvents: 'none',
        transform: 'translate3d(-9999px, -9999px, 0)'
      }}
    >
      {/* Angled Leader Line (45-degree elbow to badge) */}
      <svg className="pin-leader-svg" width="90" height="60" viewBox="0 0 90 60">
        <circle cx="2" cy="58" r="3.2" fill="#ffffff" stroke="rgba(230,36,36,0.9)" strokeWidth="1.5" />
        <polyline
          points="2,58 38,18 70,18"
          fill="none"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Frosted Dark Pill Badge */}
      <div className="pin-pill-badge">
        <div className="pin-badge-icon">
          <InteractiveTapIcon />
        </div>
        <span className="pin-badge-text">
          {isHovered && productData
            ? `${productData.title || productData.name}`
            : 'Interactive Product'}
        </span>
      </div>
    </div>
  );
}

interface ProductCalloutsLayerProps {
  hoveredProductId: string | null;
  onSelectProduct: (id: string) => void;
  onHoverProduct: (id: string | null) => void;
}

/**
 * ProductCalloutsLayer
 * Renders screen-space HUD callouts directly in standard DOM.
 * Coordinates with WebGL camera projections at 60 FPS without any React 19 root unmount issues.
 */
export default function ProductCalloutsLayer({
  hoveredProductId,
  onSelectProduct,
  onHoverProduct
}: ProductCalloutsLayerProps) {
  const targets = useMemo(() => positioningService.getAllPositions(), []);

  return (
    <div
      className="product-callouts-layer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 40,
        overflow: 'hidden'
      }}
    >
      {targets.map((target) => (
        <ProductCalloutItem
          key={target.showroomId}
          target={target}
          isHovered={hoveredProductId === target.showroomId}
          onSelect={onSelectProduct}
          onHover={onHoverProduct}
        />
      ))}
    </div>
  );
}
