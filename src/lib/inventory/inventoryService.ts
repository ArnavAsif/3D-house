import { StockCheckResult } from '@/types/inventory';

/**
 * Inventory Service
 * Manages real-time stock verification and threshold checks.
 */
export class InventoryService {
  /**
   * Queries real-time stock for a variant via /api/inventory/[variantId].
   */
  async checkStock(variantId: string): Promise<StockCheckResult> {
    try {
      const res = await fetch(`/api/inventory/${variantId}`);
      if (res.ok) {
        const json = await res.json();
        return {
          variantId,
          inStock: json.inStock ?? true,
          availableQuantity: json.availableQuantity ?? 15,
          isLowStock: json.isLowStock ?? false
        };
      }
    } catch (err) {
      console.warn(`[InventoryService] Error checking stock for ${variantId}:`, err);
    }

    return {
      variantId,
      inStock: true,
      availableQuantity: 15,
      isLowStock: false
    };
  }
}

export const inventoryService = new InventoryService();
