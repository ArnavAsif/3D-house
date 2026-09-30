// Product Domain Types (Custom Next.js + Supabase Commerce)

export interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  name?: string;
  sku: string;
  price: number;
  hex: string;
  color3: string | number;
  availableForSale: boolean;
  inventoryCount?: number;
}

export interface Product {
  id: string;
  showroomId: string; // Decoupled identifier matching 3D mesh (e.g. 'product-01')
  name: string;
  title?: string;
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
  modelUrl?: string; // Optional Supabase Storage .glb/.gltf URL
  variants: ProductVariant[];
  details?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  room?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}
