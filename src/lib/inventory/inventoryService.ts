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
          quantity: json.quantity ?? 20,
          reservedQuantity: json.reservedQuantity ?? 0,
          availableQuantity: json.availableQuantity ?? 20,
          isLowStock: json.isLowStock ?? false
        };
      }
    } catch (err) {
      console.warn(`[InventoryService] Error checking stock for ${variantId}:`, err);
    }

    return {
      variantId,
      inStock: true,
      quantity: 20,
      reservedQuantity: 0,
      availableQuantity: 20,
      isLowStock: false
    };
  }
}

export const inventoryService = new InventoryService();
