// Inventory Domain Types

export interface InventoryRecord {
  id: string;
  variantId: string;
  stockQuantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  updatedAt?: string;
}

export interface StockCheckResult {
  variantId: string;
  inStock: boolean;
  availableQuantity: number;
  isLowStock: boolean;
}
