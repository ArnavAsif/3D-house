'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingCart, Plus, Minus, Box } from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { productService } from '@/lib/products/productService';
import { inventoryService } from '@/lib/inventory/inventoryService';
import VariantSelector from './VariantSelector';

interface ProductModalProps {
  productId: string | null;
  onClose: () => void;
  onAddToCart: (item: { product: Product; variant: ProductVariant; quantity: number }) => void;
  onVariantChange?: (productId: string, variant: ProductVariant) => void;
}

/**
 * ProductModal
 * Decoupled luxury product presentation modal.
 * Uses productService and inventoryService to query Next.js backend and Supabase PostgreSQL.
 */
export default function ProductModal({
  productId,
  onClose,
  onAddToCart,
  onVariantChange
}: ProductModalProps) {
  const [productData, setProductData] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [stockInfo, setStockInfo] = useState<{ inStock: boolean; availableQuantity: number }>({
    inStock: true,
    availableQuantity: 15
  });
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Fetch product metadata asynchronously via decoupled showroom ID
  useEffect(() => {
    if (!productId) return;

    let isMounted = true;
    setIsLoading(true);

    productService
      .getProduct(productId)
      .then((data) => {
        if (isMounted) {
          setProductData(data);
          if (data.variants && data.variants.length > 0) {
            const first = data.variants[0];
            setSelectedVariant(first);
            // Check real-time stock for the default variant
            inventoryService.checkStock(first.id).then((stock) => {
              if (isMounted) setStockInfo(stock);
            });
          }
        }
      })
      .catch((err) => {
        console.warn('Failed to load product details:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (!productId || !productData) return null;

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    inventoryService.checkStock(v.id).then(setStockInfo);
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
              className="commerce-synced-pill"
              title={`Supabase ID: ${productData.id}`}
            >
              {isLoading ? 'Syncing...' : stockInfo.inStock ? `In Stock (${stockInfo.availableQuantity})` : 'Limited'}
            </span>
          </div>
        </div>

        <p className="modal-description">{productData.description}</p>

        {/* Modular Variant Selector */}
        <VariantSelector
          variants={productData.variants}
          selectedVariant={selectedVariant}
          onSelect={handleVariantSelect}
        />

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
