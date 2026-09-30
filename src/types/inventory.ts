// Inventory Domain Types (Supabase PostgreSQL)

export interface InventoryRecord {
  id: string;
  variantId: string;
  quantity: number;
  reservedQuantity: number;
  stockQuantity?: number; // Normalized alias for quantity
  availableQuantity?: number; // quantity - reservedQuantity
  updatedAt?: string;
}

export interface StockCheckResult {
  variantId: string;
  inStock: boolean;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  isLowStock: boolean;
}
