// Product & Category Domain Types (Custom Next.js + Supabase PostgreSQL Commerce)

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  title?: string; // Alias for name
  sku: string;
  price: number;
  status?: 'draft' | 'active' | 'archived';
  hex?: string;
  color3?: string | number;
  availableForSale?: boolean;
  inventoryCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string;
  sortOrder?: number;
  createdAt?: string;
}

export interface Product {
  id: string;
  categoryId?: string;
  category?: string;
  categoryData?: Category;
  showroomId: string; // Decoupled identifier matching 3D mesh (e.g. 'product-01')
  name: string;
  title?: string;
  slug: string;
  description: string;
  shortDescription?: string;
  basePrice?: number;
  price: number;
  status?: 'draft' | 'active' | 'archived';
  room: string;
  displayZone: string;
  placementType: string;
  dimensions: string;
  materials: string;
  rating: number;
  reviewsCount: number;
  modelUrl?: string; // Supabase Storage .glb/.gltf URL
  images?: ProductImage[];
  variants: ProductVariant[];
  details?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  room?: string;
  category?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}
