// Order Domain Types (Supabase PostgreSQL)

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface OrderItemRecord {
  id: string;
  orderId: string;
  productId?: string | null;
  variantId?: string | null;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  createdAt?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  variantTitle?: string; // alias for variantName
  quantity: number;
  unitPrice: number;
  lineTotal?: number;
}

export interface OrderRecord {
  id: string;
  userId?: string | null;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "ORD-2026-882194"
  userId?: string | null;
  sessionId?: string;
  status: OrderStatus;
  subtotal: number;
  tax?: number;
  shipping?: number | string;
  total: number;
  itemCount: number;
  items?: OrderItem[];
  shippingAddress?: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrderInput {
  sessionId: string;
  userId?: string | null;
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
    unitPrice: number;
    productName?: string;
    variantName?: string;
    variantTitle?: string;
  }>;
  shippingAddress?: ShippingAddress;
}
