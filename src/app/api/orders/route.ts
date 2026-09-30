import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/**
 * GET /api/orders
 * Retrieves verified orders from Supabase PostgreSQL for a given user or session.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const orderNumber = searchParams.get('orderNumber');

    const supabase = createServerSupabaseClient();
    let query = supabase
      .from('orders')
      .select(`
        id,
        user_id,
        order_number,
        status,
        subtotal,
        total,
        created_at,
        updated_at,
        items:order_items (
          id,
          order_id,
          product_id,
          variant_id,
          product_name,
          variant_name,
          quantity,
          unit_price,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (userId) query = query.eq('user_id', userId);
    if (orderNumber) query = query.eq('order_number', orderNumber);

    const { data: orders, error } = await query;

    if (!error && orders) {
      const normalized = orders.map((o: any) => ({
        id: o.id,
        orderNumber: o.order_number,
        userId: o.user_id,
        status: o.status,
        subtotal: Number(o.subtotal),
        total: Number(o.total),
        tax: Number((o.subtotal * 0.08).toFixed(2)),
        shipping: 'Complimentary White Glove Delivery',
        itemCount: (o.items || []).reduce((s: number, i: any) => s + (i.quantity || 1), 0),
        items: (o.items || []).map((it: any) => ({
          id: it.id,
          orderId: it.order_id,
          productId: it.product_id,
          variantId: it.variant_id,
          productName: it.product_name,
          variantName: it.variant_name,
          variantTitle: it.variant_name,
          quantity: it.quantity,
          unitPrice: Number(it.unit_price),
          lineTotal: Number(it.unit_price) * it.quantity
        })),
        createdAt: o.created_at,
        updatedAt: o.updated_at
      }));

      return NextResponse.json({ success: true, orders: normalized });
    }

    return NextResponse.json({ success: true, orders: [] });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Orders lookup failed' },
      { status: 500 }
    );
  }
}
