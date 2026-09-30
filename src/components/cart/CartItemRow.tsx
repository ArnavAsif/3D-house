'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from '@/types/cart';

interface CartItemRowProps {
  item: CartItem;
  index: number;
  onRemove: (index: number) => void;
}

/**
 * CartItemRow
 * Presentation component for individual cart line item.
 */
export default function CartItemRow({ item, index, onRemove }: CartItemRowProps) {
  const title = item.product?.title || item.product?.name || 'Showroom Product';
  const variantTitle = item.variant?.title || item.variant?.name || 'Default';
  const unitPrice = item.unitPrice || item.product?.price || 0;
  const lineTotal = unitPrice * item.quantity;

  return (
    <div className="cart-item-row">
      <div className="cart-item-info">
        <div className="cart-item-name">{title}</div>
        <div className="cart-item-variant">Color: {variantTitle}</div>
        <div className="cart-item-price-unit">
          ${unitPrice} × {item.quantity}
        </div>
      </div>
      <div className="cart-item-actions">
        <span className="cart-item-total">${lineTotal.toLocaleString()}</span>
        <button
          className="cart-remove-btn"
          onClick={() => onRemove(index)}
          title="Remove item"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
