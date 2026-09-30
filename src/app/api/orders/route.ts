import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/**
 * GET /api/orders
 * Retrieves orders for a given session or authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ success: true, orders: [] });
    }

    const supabase = createServerSupabaseClient();
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        id,
        order_number,
        session_id,
        status,
        subtotal,
        tax,
        shipping,
        total,
        shipping_address,
        created_at,
        items:order_items (
          id,
          product_id,
          variant_id,
          product_name,
          variant_title,
          quantity,
          unit_price,
          line_total
        )
      `)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });

    if (!error && orders) {
      return NextResponse.json({ success: true, orders });
    }

    return NextResponse.json({ success: true, orders: [] });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Orders lookup failed' },
      { status: 500 }
    );
  }
}
