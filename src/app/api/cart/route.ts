import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/**
 * /api/cart
 * Manages custom shopping cart state using Supabase tables.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'anonymous-session';

    const supabase = createServerSupabaseClient();
    const { data: cart } = await supabase
      .from('carts')
      .select(`
        id,
        session_id,
        user_id,
        items:cart_items (
          id,
          product_id,
          variant_id,
          quantity,
          unit_price,
          product:products (id, showroom_id, name, price, dimensions, materials),
          variant:product_variants (id, title, hex, sku)
        )
      `)
      .eq('session_id', sessionId)
      .maybeSingle();

    if (!cart) {
      return NextResponse.json({
        success: true,
        data: {
          id: `cart_${sessionId}`,
          sessionId,
          items: [],
          subtotal: 0,
          total: 0
        }
      });
    }

    const items = (cart.items || []).map((ci: any) => ({
      id: ci.id,
      productId: ci.product_id,
      variantId: ci.variant_id,
      product: ci.product,
      variant: ci.variant,
      quantity: ci.quantity,
      unitPrice: Number(ci.unit_price)
    }));

    const subtotal = items.reduce((sum: number, it: any) => sum + it.unitPrice * it.quantity, 0);

    return NextResponse.json({
      success: true,
      data: {
        id: cart.id,
        sessionId,
        items,
        subtotal,
        total: subtotal
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Cart fetch failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, productId, variantId, quantity = 1, unitPrice } = body;

    if (!sessionId || !productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required sessionId or productId' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // 1. Get or create cart for session
    let { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (!cart) {
      const { data: newCart, error: createCartErr } = await supabase
        .from('carts')
        .insert({ session_id: sessionId })
        .select('id')
        .single();
      if (!createCartErr) cart = newCart;
    }

    // 2. Add or update cart item
    if (cart) {
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .eq('variant_id', variantId)
        .maybeSingle();

      if (existingItem) {
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
      } else {
        await supabase.from('cart_items').insert({
          cart_id: cart.id,
          product_id: productId,
          variant_id: variantId,
          quantity,
          unit_price: unitPrice || 0
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Item staged in custom cart',
      item: { productId, variantId, quantity, unitPrice }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Cart update failed' },
      { status: 500 }
    );
  }
}
