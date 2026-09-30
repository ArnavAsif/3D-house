import { Product, ProductFilter } from '@/types/product';
import { getProductById, SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * Product Data Service
 * Abstracts all catalog queries so UI and 3D components never query the database directly.
 */
export class ProductDataService {
  private cache: Map<string, Product> = new Map();

  /**
   * Fetches product details by decoupled 3D ID (`product-XX`), slug, or database UUID.
   */
  async getProduct(identifier: string): Promise<Product> {
    if (this.cache.has(identifier)) {
      return this.cache.get(identifier)!;
    }

    try {
      const res = await fetch(`/api/products/${identifier}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          this.cache.set(identifier, json.data);
          return json.data;
        }
      }
    } catch (err) {
      console.warn(`[ProductDataService] Fallback for ${identifier}:`, err);
    }

    // High-performance client-side fallback from seeded dataset
    const local = getProductById(identifier) || SHOWROOM_PRODUCTS.find((p) => p.dbId === identifier || p.handle === identifier);
    if (!local) {
      throw new Error(`Product "${identifier}" not found in catalog.`);
    }

    const normalized: Product = {
      id: local.dbId || `prod-${local.id}`,
      showroomId: local.id,
      name: local.name,
      title: local.name,
      slug: local.handle,
      category: local.productType,
      room: local.room,
      displayZone: local.displayZone,
      placementType: local.placementType,
      description: local.description,
      dimensions: local.dimensions,
      materials: local.materials,
      price: local.price,
      rating: local.rating,
      reviewsCount: local.reviewsCount,
      variants: local.variants.map((v) => ({
        id: v.id,
        productId: local.dbId || `prod-${local.id}`,
        name: v.name,
        title: v.name,
        sku: `SKU-${local.id.toUpperCase()}-${v.name.replace(/\s+/g, '-').toUpperCase()}`,
        price: Number(v.price || local.price),
        hex: v.hex,
        color3: v.color3,
        availableForSale: v.availableForSale,
        inventoryCount: 20
      })),
      details: local.details
    };

    this.cache.set(identifier, normalized);
    return normalized;
  }

  /**
   * Fetches full catalog list with optional room filtering.
   */
  async getProducts(filter?: ProductFilter): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filter?.room) queryParams.set('room', filter.room);
      if (filter?.category) queryParams.set('category', filter.category);
      if (filter?.categoryId) queryParams.set('categoryId', filter.categoryId);

      const url = `/api/products${queryParams.toString() ? `?${queryParams}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[ProductDataService] Fallback to local catalog:', err);
    }

    let products: Product[] = SHOWROOM_PRODUCTS.map((local) => ({
      id: local.dbId || `prod-${local.id}`,
      showroomId: local.id,
      name: local.name,
      title: local.name,
      slug: local.handle,
      category: local.productType,
      room: local.room,
      displayZone: local.displayZone,
      placementType: local.placementType,
      description: local.description,
      dimensions: local.dimensions,
      materials: local.materials,
      price: local.price,
      rating: local.rating,
      reviewsCount: local.reviewsCount,
      variants: local.variants.map((v) => ({
        id: v.id,
        productId: local.dbId || `prod-${local.id}`,
        name: v.name,
        title: v.name,
        sku: `SKU-${local.id.toUpperCase()}-${v.name.replace(/\s+/g, '-').toUpperCase()}`,
        price: Number(v.price || local.price),
        hex: v.hex,
        color3: v.color3,
        availableForSale: v.availableForSale,
        inventoryCount: 20
      }))
    }));

    if (filter?.room) {
      products = products.filter((p) => p.room.toLowerCase() === filter.room!.toLowerCase());
    }
    if (filter?.category) {
      products = products.filter((p) => p.category.toLowerCase() === filter.category!.toLowerCase());
    }
    return products;
  }
}

export const productService = new ProductDataService();
