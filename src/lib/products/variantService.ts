import { ProductVariant } from '@/types/product';

/**
 * Product Variant Service
 * Encapsulates color codes, hex conversions, and 3D material color formatting.
 */
export class ProductVariantService {
  /**
   * Translates hex string (e.g. '#C8A462') to a Three.js-compatible numeric color integer or hex string.
   */
  getColorValue(variant: ProductVariant): string | number {
    if (variant.color3 !== undefined) {
      return variant.color3;
    }
    return variant.hex;
  }

  /**
   * Finds a matching variant by title or ID within a variant array.
   */
  findVariant(variants: ProductVariant[], identifier: string): ProductVariant | undefined {
    return variants.find((v) => v.id === identifier || v.title.toLowerCase() === identifier.toLowerCase());
  }

  /**
   * Generates a standardized SKU for showroom variants.
   */
  generateSku(showroomId: string, variantIndex: number): string {
    return `SKU-${showroomId.toUpperCase()}-${String(variantIndex + 1).padStart(2, '0')}`;
  }
}

export const variantService = new ProductVariantService();
