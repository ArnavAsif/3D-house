// Cart Domain Types

import { Product, ProductVariant } from './product';

export interface CartItem {
  id?: string;
  cartId?: string;
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  id: string;
  sessionId: string;
  userId?: string | null;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  updatedAt?: string;
}

export interface AddToCartInput {
  sessionId: string;
  product: Product;
  variant: ProductVariant;
  quantity?: number;
}
