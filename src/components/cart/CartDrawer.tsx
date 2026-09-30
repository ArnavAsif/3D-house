'use client';

import React, { useState } from 'react';
import { ShoppingCart, X, PackageCheck } from 'lucide-react';
import { CartItem } from '@/types/cart';
import { Order } from '@/types/order';
import { orderService } from '@/lib/orders/orderService';
import { cartService } from '@/lib/cart/cartService';
import CartItemRow from './CartItemRow';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
}

/**
 * CartDrawer
 * Slide-over luxury cart drawer integrated with the custom orderService.
 * Executes order creation in Supabase PostgreSQL via Next.js backend.
 */
export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderInfo, setOrderInfo] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cartService.calculateSubtotal(items);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const orderPayload = {
        sessionId: 'session',
        items: items.map((it) => ({
          productId: it.productId || it.product?.id,
          variantId: it.variantId || it.variant?.id,
          quantity: it.quantity,
          unitPrice: it.unitPrice || it.product?.price,
          productName: it.product?.name || it.product?.title,
          variantTitle: it.variant?.title || it.variant?.name
        }))
      };

      const orderResult = await orderService.createOrder(orderPayload);
      setOrderInfo(orderResult);
      if (onClearCart) onClearCart();
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
                <CartItemRow
                  key={`${item.productId}-${item.variantId}-${idx}`}
                  item={item}
                  index={idx}
                  onRemove={onRemoveItem}
                />
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="cart-summary-line">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="cart-summary-line">
                <span>White Glove Delivery</span>
                <span className="free-badge">Complimentary</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span>${subtotal.toLocaleString()}</span>
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
                <span className="commerce-synced-pill">Supabase Order Confirmed</span>
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
                <span className="spec-value">Direct Atelier White Glove Dispatch</span>
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
