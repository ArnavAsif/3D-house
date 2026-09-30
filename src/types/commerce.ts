// Custom Commerce Data Architecture Types
// Pure Next.js + Supabase PostgreSQL schema representations

export interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  sku: string;
  price: number;
  hex: string;
  color3: string;
  availableForSale: boolean;
  inventoryCount?: number;
}

export interface Product {
  id: string;
  showroomId: string; // Decoupled unique identifier matching 3D mesh (e.g. 'product-01')
  name: string;
  slug: string;
  category: string;
  room: string;
  displayZone: string;
  placementType: string;
  description: string;
  dimensions: string;
  materials: string;
  price: number;
  rating: number;
  reviewsCount: number;
  modelUrl?: string; // Optional Supabase Storage GLTF/GLB asset URL
  variants: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface InventoryRecord {
  id: string;
  variantId: string;
  stockQuantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  isAvailable: boolean;
}

export interface CartItem {
  id: string;
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
  updatedAt: string;
}

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

export interface Order {
  id: string;
  orderNumber: string; // e.g. "ORD-2026-8821"
  userId?: string | null;
  sessionId: string;
  status: 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface CommerceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
