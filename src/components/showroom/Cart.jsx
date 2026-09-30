'use client';

import React, { useState } from 'react';
import { ShoppingCart, X, Check } from 'lucide-react';
import { shopifyService } from '../../services/shopifyService';

/**
 * Cart
 * Showroom cart drawer integrated with Shopify Storefront Cart API.
 * Calculates line items and creates dynamic checkout sessions.
 */
export default function Cart({
  isOpen,
  onClose,
  items = [],
  onRemoveItem
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState(null);

  if (!isOpen) return null;

  const cartTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        id: item.variant?.id || `gid://shopify/ProductVariant/${item.product.id || item.product.showroomId}`,
        title: `${item.product.title || item.product.name} - ${item.variant?.title || item.variant?.name}`,
        price: item.product.price,
        quantity: item.quantity
      }));
      const cartResult = await shopifyService.createCart(lineItems);
      setCheckoutInfo(cartResult);
    } catch (err) {
      console.error('Failed to create Shopify cart:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={onClose}>
        <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <div className="cart-header-title">
              <ShoppingCart size={20} />
              <span>Showroom Cart ({cartItemCount})</span>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="cart-items-list">
            {items.length === 0 ? (
              <div className="empty-cart-state">
                <p>Your showroom cart is empty.</p>
                <p className="empty-cart-sub">
                  Explore the residence and click products or golden pins to add items.
                </p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.product.id}-${idx}`} className="cart-item-row">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.product.title || item.product.name}</div>
                    <div className="cart-item-variant">
                      Color: {item.variant?.title || item.variant?.name}
                    </div>
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
                      onClick={() => onRemoveItem(idx)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
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
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Creating Shopify Cart...' : 'Proceed to Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Shopify Storefront Checkout Confirmation */}
      {checkoutInfo && (
        <div className="product-modal-backdrop" onClick={() => setCheckoutInfo(null)}>
          <div className="product-card-modal checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setCheckoutInfo(null)}>
              <X size={18} />
            </button>
            <div className="product-modal-header">
              <div className="modal-badge-row">
                <span className="shopify-synced-pill">Shopify Storefront Connected</span>
              </div>
              <h2 className="modal-product-title">Shopify Cart Generated</h2>
              <p className="modal-description" style={{ marginTop: '8px', marginBottom: '16px' }}>
                Your selected 3D products have been packaged into a Shopify Storefront cart instance ready for checkout.
              </p>
            </div>

            <div className="modal-specs-grid" style={{ gridTemplateColumns: '1fr', gap: '8px' }}>
              <div className="spec-item">
                <span className="spec-title">Cart GID</span>
                <span className="spec-value" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {checkoutInfo.id}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-title">Storefront Endpoint</span>
                <span className="spec-value">https://villa-lumina.myshopify.com/api/2025-01/graphql</span>
              </div>
              <div className="spec-item">
                <span className="spec-title">Subtotal Amount</span>
                <span className="spec-value" style={{ fontWeight: 700, color: 'var(--color-walnut)' }}>
                  ${checkoutInfo.cost?.subtotalAmount?.amount} USD
                </span>
              </div>
            </div>

            <div className="modal-action-row" style={{ marginTop: '20px' }}>
              <button
                className="add-to-cart-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  alert(`Navigating to mock Shopify checkout URL:\n${checkoutInfo.checkoutUrl}`);
                  setCheckoutInfo(null);
                  onClose();
                }}
              >
                Launch Shopify Checkout (${checkoutInfo.cost?.subtotalAmount?.amount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
