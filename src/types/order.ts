// Order Domain Types

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

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantTitle: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export type OrderStatus = 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string; // e.g. "ORD-2026-882194"
  userId?: string | null;
  sessionId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number | string;
  total: number;
  itemCount: number;
  items?: OrderItem[];
  shippingAddress?: ShippingAddress;
  createdAt: string;
}

export interface CreateOrderInput {
  sessionId: string;
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
    unitPrice: number;
    productName?: string;
    variantTitle?: string;
  }>;
  shippingAddress?: ShippingAddress;
}
