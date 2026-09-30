'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { ProductVariant } from '@/types/product';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelect: (variant: ProductVariant) => void;
  basePrice?: number;
}

/**
 * VariantSelector
 * Touch-friendly, luxury finish and material variant selector.
 * Supports visual color swatches, variant titles, and dynamic price differentials.
 */
export default function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
  basePrice = 0
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-selection-section">
      <div className="variant-label-row">
        <div className="variant-title-group">
          <span className="section-label">FINISH & MATERIAL</span>
          <span className="selected-variant-name">
            {selectedVariant?.title || selectedVariant?.name || variants[0]?.name}
          </span>
        </div>
        {selectedVariant?.sku && (
          <span className="variant-sku-tag">
            {selectedVariant.sku}
          </span>
        )}
      </div>

      <div className="variant-swatches-grid">
        {variants.map((v) => {
          const vTitle = v.title || v.name;
          const isSelected = (selectedVariant?.id === v.id) || (selectedVariant?.name === v.name);
          const priceDiff = v.price && basePrice && v.price !== basePrice
            ? v.price > basePrice
              ? `+$${(v.price - basePrice).toFixed(0)}`
              : `-$${(basePrice - v.price).toFixed(0)}`
            : null;

          return (
            <button
              key={v.id || vTitle}
              type="button"
              className={`variant-card-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(v)}
              title={`${vTitle}${priceDiff ? ` (${priceDiff})` : ''}`}
              aria-label={`Select ${vTitle}`}
            >
              <div
                className="variant-swatch-dot"
                style={{ backgroundColor: v.hex || '#E5E0D8' }}
              >
                {isSelected && <Check size={11} className="swatch-check" />}
              </div>
              <div className="variant-info-col">
                <span className="variant-btn-name">{vTitle}</span>
                {priceDiff && <span className="variant-price-delta">{priceDiff}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
