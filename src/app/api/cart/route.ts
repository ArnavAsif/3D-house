import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * /api/cart
 * Manages shopping carts and cart_items using Supabase PostgreSQL tables.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'anonymous-session';

    const supabase = createServerSupabaseClient();
    const { data: cart, error } = await supabase
      .from('carts')
      .select(`
        id,
        session_id,
        user_id,
        status,
        created_at,
        updated_at,
        items:cart_items (
          id,
          product_id,
          variant_id,
          quantity,
          unit_price,
          product:products (
            id,
            name,
            slug,
            description,
            short_description,
            base_price
          ),
          variant:product_variants (
            id,
            name,
            sku,
            price,
            hex,
            color3
          )
        )
      `)
      .eq('session_id', sessionId)
      .eq('status', 'active')
      .maybeSingle();

    if (error || !cart) {
      return NextResponse.json({
        success: true,
        data: {
          id: `cart_${sessionId}`,
          sessionId,
          status: 'active',
          items: [],
          subtotal: 0,
          total: 0
        }
      });
    }

    const items = (cart.items || []).map((ci: any) => {
      const local = SHOWROOM_PRODUCTS.find(
        (p) => p.handle === ci.product?.slug || p.name.toLowerCase() === ci.product?.name?.toLowerCase()
      );

      return {
        id: ci.id,
        cartId: cart.id,
        productId: ci.product_id,
        variantId: ci.variant_id,
        product: {
          id: ci.product?.id || ci.product_id,
          showroomId: local?.id || 'product-01',
          name: ci.product?.name || 'Villa Lumina Showroom Piece',
          title: ci.product?.name || 'Villa Lumina Showroom Piece',
          slug: ci.product?.slug || '',
          category: local?.productType || 'Furniture',
          room: local?.room || 'Living Room',
          displayZone: local?.displayZone || 'Showroom Display',
          placementType: local?.placementType || 'Dedicated Architectural Display Areas',
          description: ci.product?.description || '',
          dimensions: local?.dimensions || 'Proportional Architectural Scale',
          materials: local?.materials || 'Natural Oak & Stone',
          price: Number(ci.unit_price),
          rating: 4.9,
          reviewsCount: 18,
          variants: []
        },
        variant: {
          id: ci.variant?.id || ci.variant_id,
          productId: ci.product_id,
          name: ci.variant?.name || 'Standard Finish',
          title: ci.variant?.name || 'Standard Finish',
          sku: ci.variant?.sku || '',
          price: Number(ci.variant?.price || ci.unit_price),
          hex: ci.variant?.hex || '#F2EEE5',
          color3: ci.variant?.color3 || '#F2EEE5',
          availableForSale: true
        },
        quantity: ci.quantity,
        unitPrice: Number(ci.unit_price)
      };
    });

    const subtotal = items.reduce((sum: number, it: any) => sum + it.unitPrice * it.quantity, 0);

    return NextResponse.json({
      success: true,
      data: {
        id: cart.id,
        sessionId,
        status: cart.status,
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
    const { sessionId, userId, productId, variantId, quantity = 1, unitPrice } = body;

    if (!sessionId || !productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required sessionId or productId' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const isUuid = (val: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

    // 1. Get or create active cart for session
    let { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('session_id', sessionId)
      .eq('status', 'active')
      .maybeSingle();

    if (!cart) {
      const { data: newCart, error: createCartErr } = await supabase
        .from('carts')
        .insert({
          session_id: sessionId,
          user_id: userId && isUuid(userId) ? userId : null,
          status: 'active'
        })
        .select('id')
        .single();
      if (!createCartErr) cart = newCart;
    }

    // 2. Add or update cart item if cart and UUIDs exist
    if (cart && isUuid(productId) && variantId && isUuid(variantId)) {
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cart.id)
        .eq('variant_id', variantId)
        .maybeSingle();

      if (existingItem) {
        await supabase
          .from('cart_items')
          .update({
            quantity: existingItem.quantity + quantity,
            updated_at: new Date().toISOString()
          })
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
      message: 'Item staged in custom Supabase cart',
      item: { productId, variantId, quantity, unitPrice }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Cart update failed' },
      { status: 500 }
    );
  }
}
