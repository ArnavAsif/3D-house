'use client';

import React, { useState } from 'react';
import { ShoppingCart, X, Check, ShieldCheck, PackageCheck } from 'lucide-react';
import { commerceService } from '../../services/commerceService';

/**
 * Cart
 * Showroom cart drawer integrated with custom Next.js + Supabase Commerce backend.
 * Calculates line items and executes order placement against Supabase PostgreSQL.
 */
export default function Cart({
  isOpen,
  onClose,
  items = [],
  onRemoveItem
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

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
        productId: item.product.id || item.product.showroomId,
        variantId: item.variant?.id || `var-${item.product.id}`,
        product: item.product,
        variant: item.variant,
        price: item.product.price,
        quantity: item.quantity
      }));
      const orderResult = await commerceService.createOrder(lineItems);
      setOrderInfo(orderResult);
    } catch (err) {
      console.error('Failed to create custom order:', err);
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
                {isCheckingOut ? 'Submitting to Supabase Backend...' : 'Proceed to Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Supabase Commerce Order Confirmation Modal */}
      {orderInfo && (
        <div className="product-modal-backdrop" onClick={() => setOrderInfo(null)}>
          <div className="product-card-modal checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setOrderInfo(null)}>
              <X size={18} />
            </button>
            <div className="product-modal-header">
              <div className="modal-badge-row">
                <span className="shopify-synced-pill" style={{ background: '#eaf4ed', color: '#276738' }}>
                  Supabase Order Confirmed
                </span>
              </div>
              <h2 className="modal-product-title">Order {orderInfo.orderNumber}</h2>
              <p className="modal-description" style={{ marginTop: '8px', marginBottom: '16px' }}>
                Your bespoke showroom selection has been recorded in Supabase PostgreSQL and sent to fulfillment.
              </p>
            </div>

            <div className="modal-specs-grid" style={{ gridTemplateColumns: '1fr', gap: '8px' }}>
              <div className="spec-item">
                <span className="spec-title">Order Reference</span>
                <span className="spec-value" style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--color-walnut)', fontWeight: 700 }}>
                  {orderInfo.orderNumber}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-title">Fulfillment Routing</span>
                <span className="spec-value">Direct Atelier White Glove White Glove Dispatch</span>
              </div>
              <div className="spec-item">
                <span className="spec-title">Order Total</span>
                <span className="spec-value" style={{ fontWeight: 700, color: 'var(--color-walnut)' }}>
                  ${orderInfo.total} USD
                </span>
              </div>
            </div>

            <div className="modal-action-row" style={{ marginTop: '20px' }}>
              <button
                className="add-to-cart-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setOrderInfo(null);
                  onClose();
                }}
              >
                <PackageCheck size={18} style={{ marginRight: 6 }} />
                <span>Return to Residence</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
