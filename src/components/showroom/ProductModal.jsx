'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingCart, Plus, Minus, ShieldCheck, Box } from 'lucide-react';
import { commerceService } from '../../services/commerceService';
import { getProductById } from '../../data/showroomProducts';

/**
 * ProductModal
 * Decoupled luxury e-commerce modal.
 * Queries Next.js backend and Supabase PostgreSQL asynchronously via unique showroom identifier (`product-XX`)
 * and triggers real-time 3D variant material updates.
 */
export default function ProductModal({
  productId,
  onClose,
  onAddToCart,
  onVariantChange
}) {
  const [productData, setProductData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Fetch product metadata asynchronously via decoupled identifier
  useEffect(() => {
    if (!productId) return;

    let isMounted = true;
    setIsLoading(true);

    commerceService
      .fetchProductByShowroomId(productId)
      .then((data) => {
        if (isMounted) {
          setProductData(data);
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
        }
      })
      .catch((err) => {
        console.warn('Fallback to local product catalog:', err);
        const fallback = getProductById(productId);
        if (isMounted && fallback) {
          setProductData(fallback);
          if (fallback.variants && fallback.variants.length > 0) {
            setSelectedVariant(fallback.variants[0]);
          }
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (!productId || !productData) return null;

  const handleVariantSelect = (v) => {
    setSelectedVariant(v);
    if (onVariantChange) {
      onVariantChange(productId, v);
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        product: productData,
        variant: selectedVariant || productData.variants[0],
        quantity
      });
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-card-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="product-modal-header">
          <div className="modal-badge-row">
            <span className="modal-id-tag">{(productData.showroomId || productId).toUpperCase()}</span>
            <span className="modal-room-tag">{productData.room}</span>
            <span className="modal-placement-tag">{productData.placementType}</span>
          </div>
          <h2 className="modal-product-title">{productData.title || productData.name}</h2>
          <div className="modal-price-row">
            <span className="modal-price">${productData.price}</span>
            <span className="modal-rating">
              ★ {productData.rating} ({productData.reviewsCount} reviews)
            </span>
            <span
              className="shopify-synced-pill"
              title={`Supabase ID: ${productData.id}`}
            >
              {isLoading ? 'Syncing...' : 'Supabase Live'}
            </span>
          </div>
        </div>

        <p className="modal-description">{productData.description}</p>

        {/* Color Variant Selector */}
        {productData.variants && productData.variants.length > 0 && (
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
              {productData.variants.map((v) => {
                const vName = v.title || v.name;
                const isSelected = (selectedVariant?.title || selectedVariant?.name) === vName;
                return (
                  <button
                    key={v.id || vName}
                    className={`color-swatch-btn ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: v.hex }}
                    onClick={() => handleVariantSelect(v)}
                    title={vName}
                  >
                    {isSelected && <Check size={12} color="#ffffff" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dimensions & Material Specs */}
        <div className="modal-specs-grid">
          <div className="spec-item">
            <span className="spec-title">Dimensions</span>
            <span className="spec-value">{productData.dimensions}</span>
          </div>
          <div className="spec-item">
            <span className="spec-title">Materials</span>
            <span className="spec-value">{productData.materials}</span>
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
            onClick={handleAdd}
          >
            {addedAnimation ? (
              <>
                <Check size={16} />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>
                  Add to Cart - ${(productData.price * quantity).toLocaleString()}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
