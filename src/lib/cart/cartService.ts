import { Cart, CartItem, AddToCartInput } from '@/types/cart';
import { authService } from '@/lib/supabase/auth';

/**
 * Cart Service
 * Manages shopping cart state, session persistence, and server synchronization.
 */
export class CartService {
  private localKey = 'villa_lumina_cart';

  /**
   * Retrieves cart from localStorage and synchronizes with /api/cart.
   */
  async getCart(): Promise<CartItem[]> {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(this.localKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse local cart:', e);
    }
    return [];
  }

  /**
   * Adds an item to the cart and triggers server route synchronization.
   */
  async addItem(input: AddToCartInput, currentItems: CartItem[]): Promise<CartItem[]> {
    const existingIdx = currentItems.findIndex(
      (item) =>
        item.productId === input.product.id &&
        (item.variantId === input.variant.id || item.variant?.title === input.variant.title)
    );

    let updated: CartItem[];
    const qty = input.quantity || 1;

    if (existingIdx >= 0) {
      updated = [...currentItems];
      updated[existingIdx].quantity += qty;
    } else {
      const newItem: CartItem = {
        id: `ci_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        productId: input.product.id,
        variantId: input.variant.id,
        product: input.product,
        variant: input.variant,
        quantity: qty,
        unitPrice: input.variant.price || input.product.price
      };
      updated = [...currentItems, newItem];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.localKey, JSON.stringify(updated));
    }

    // Asynchronously notify Next.js /api/cart
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: input.sessionId || authService.getOrCreateSessionId(),
        productId: input.product.id,
        variantId: input.variant.id,
        quantity: qty,
        unitPrice: input.variant.price || input.product.price
      })
    }).catch((err) => console.warn('Sync /api/cart error:', err));

    return updated;
  }

  /**
   * Removes an item from the cart.
   */
  removeItem(index: number, currentItems: CartItem[]): CartItem[] {
    const updated = currentItems.filter((_, idx) => idx !== index);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.localKey, JSON.stringify(updated));
    }
    return updated;
  }

  /**
   * Calculates subtotal of cart items.
   */
  calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  /**
   * Clears the cart after successful checkout.
   */
  clearCart(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.localKey);
    }
  }
}

export const cartService = new CartService();
