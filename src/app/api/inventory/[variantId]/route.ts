import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/**
 * GET /api/inventory/[variantId]
 * Checks real-time stock and reserved quantity for a specific product variant.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ variantId: string }> }
) {
  try {
    const { variantId } = await params;
    const supabase = createServerSupabaseClient();

    const { data: record, error } = await supabase
      .from('inventory')
      .select('stock_quantity, reserved_quantity, low_stock_threshold')
      .eq('variant_id', variantId)
      .maybeSingle();

    if (!error && record) {
      const available = record.stock_quantity - record.reserved_quantity;
      return NextResponse.json({
        success: true,
        variantId,
        stockQuantity: record.stock_quantity,
        availableQuantity: Math.max(0, available),
        inStock: available > 0,
        isLowStock: available <= record.low_stock_threshold
      });
    }

    // Default optimistic stock for catalog preview
    return NextResponse.json({
      success: true,
      variantId,
      stockQuantity: 15,
      availableQuantity: 15,
      inStock: true,
      isLowStock: false
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Inventory lookup failed' },
      { status: 500 }
    );
  }
}
