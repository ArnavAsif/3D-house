// Cart Domain Types (Supabase PostgreSQL)

import { Product, ProductVariant } from './product';

export interface CartRecord {
  id: string;
  userId?: string | null;
  sessionId: string;
  status: 'active' | 'abandoned' | 'converted';
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItemRecord {
  id: string;
  cartId: string;
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

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
  status?: 'active' | 'abandoned' | 'converted';
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddToCartInput {
  sessionId: string;
  product: Product;
  variant: ProductVariant;
  quantity?: number;
}
