// Shopify Storefront API Integration Service
// Demonstrates how the 3D showroom dynamically queries product data by unique identifier (`product-XX`)
// instead of hardcoding product metadata into the 3D scene geometry.

import { SHOWROOM_PRODUCTS, getProductById } from '../data/showroomProducts';

export class ShopifyStorefrontService {
  constructor(config = {}) {
    this.shopDomain = config.shopDomain || 'villa-lumina.myshopify.com';
    this.storefrontAccessToken = config.storefrontAccessToken || 'mock_storefront_token_3d_showroom';
    this.apiVersion = config.apiVersion || '2025-01';
    this.cache = new Map();
  }

  /**
   * Fetches product details dynamically using the decoupled 3D ID (`product-XX`)
   * In production, this issues a GraphQL query to the Shopify Storefront API endpoint:
   * https://{shopDomain}/api/{apiVersion}/graphql.json
   */
  async fetchProductByShowroomId(showroomId) {
    if (this.cache.has(showroomId)) {
      return this.cache.get(showroomId);
    }

    // Simulate fast network fetch from Shopify Storefront API
    const localProduct = getProductById(showroomId);
    if (!localProduct) {
      throw new Error(`Product with ID "${showroomId}" not found in Shopify catalog.`);
    }

    // Shopify Storefront API normalized response structure
    const shopifyPayload = {
      id: localProduct.shopifyId,
      showroomId: localProduct.id,
      handle: localProduct.handle,
      title: localProduct.name,
      vendor: localProduct.vendor,
      productType: localProduct.productType,
      room: localProduct.room,
      displayZone: localProduct.displayZone,
      placementType: localProduct.placementType,
      description: localProduct.description,
      dimensions: localProduct.dimensions,
      materials: localProduct.materials,
      details: localProduct.details,
      priceRange: localProduct.priceRange,
      price: localProduct.price,
      rating: localProduct.rating,
      reviewsCount: localProduct.reviewsCount,
      variants: localProduct.variants.map((v) => ({
        id: v.id,
        title: v.name,
        price: v.price,
        hex: v.hex,
        color3: v.color3,
        availableForSale: v.availableForSale
      }))
    };

    this.cache.set(showroomId, shopifyPayload);
    return shopifyPayload;
  }

  /**
   * Creates a checkout cart via Shopify Storefront Cart API
   */
  async createCart(lineItems = []) {
    return {
      id: `gid://shopify/Cart/${Date.now()}`,
      checkoutUrl: `https://${this.shopDomain}/cart`,
      lines: lineItems,
      cost: {
        subtotalAmount: {
          amount: lineItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2),
          currencyCode: 'USD'
        }
      }
    };
  }
}

// Global Singleton Export
export const shopifyService = new ShopifyStorefrontService();
