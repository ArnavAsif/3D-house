'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { ProductVariant } from '@/types/product';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelect: (variant: ProductVariant) => void;
}

/**
 * VariantSelector
 * Modular color swatch picker for custom product variants.
 */
export default function VariantSelector({
  variants,
  selectedVariant,
  onSelect
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-selection-section">
      <div className="variant-label-row">
        <span className="section-label">Color:</span>
        <span className="selected-variant-name">
          {selectedVariant?.title || selectedVariant?.name}
        </span>
        {selectedVariant?.sku && (
          <span className="variant-sku" style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#888' }}>
            {selectedVariant.sku}
          </span>
        )}
      </div>
      <div className="color-swatches-row">
        {variants.map((v) => {
          const vTitle = v.title || v.name;
          const isSelected = (selectedVariant?.title || selectedVariant?.name) === vTitle;
          return (
            <button
              key={v.id || vTitle}
              className={`color-swatch-btn ${isSelected ? 'selected' : ''}`}
              style={{ backgroundColor: v.hex }}
              onClick={() => onSelect(v)}
              title={vTitle}
            >
              {isSelected && <Check size={12} color="#ffffff" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
