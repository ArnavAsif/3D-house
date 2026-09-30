'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getProductById, SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * Next.js Server Actions for Custom Commerce
 * Runs strictly on the server with direct Supabase PostgreSQL queries.
 */

export async function fetchProductAction(showroomId: string) {
  try {
    const supabase = createServerSupabaseClient();
    const isShowroomId = showroomId.startsWith('product-');
    const column = isShowroomId ? 'showroom_id' : 'id';

    const { data: product, error } = await supabase
      .from('products')
      .select(`
        id,
        showroom_id,
        name,
        slug,
        description,
        category,
        room,
        display_zone,
        placement_type,
        dimensions,
        materials,
        price,
        rating,
        reviews_count,
        variants:product_variants (
          id,
          title,
          sku,
          price,
          hex,
          color3,
          available_for_sale,
          inventory (
            stock_quantity
          )
        )
      `)
      .eq(column, showroomId)
      .maybeSingle();

    if (!error && product) {
      return {
        success: true,
        data: {
          id: product.id,
          showroomId: product.showroom_id,
          name: product.name,
          title: product.name,
          slug: product.slug,
          description: product.description,
          category: product.category,
          room: product.room,
          displayZone: product.display_zone,
          placementType: product.placement_type,
          dimensions: product.dimensions,
          materials: product.materials,
          price: Number(product.price),
          rating: Number(product.rating),
          reviewsCount: product.reviews_count,
          variants: (product.variants || []).map((v: any) => ({
            id: v.id,
            title: v.title,
            name: v.title,
            sku: v.sku,
            price: Number(v.price),
            hex: v.hex,
            color3: v.color3,
            availableForSale: v.available_for_sale,
            inventoryCount: v.inventory?.[0]?.stock_quantity ?? 15
          }))
        }
      };
    }

    const fallback = getProductById(showroomId);
    if (fallback) {
      return {
        success: true,
        data: {
          ...fallback,
          showroomId: fallback.id,
          title: fallback.name,
          variants: fallback.variants.map((v) => ({
            ...v,
            title: v.name,
            inventoryCount: 15
          }))
        }
      };
    }

    return { success: false, error: `Product ${showroomId} not found` };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createOrderAction(items: any[], shippingDetails?: any) {
  try {
    const subtotal = items.reduce(
      (sum, it) => sum + Number(it.price || it.unitPrice || 0) * Number(it.quantity || 1),
      0
    );
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    const orderNumber = `ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const supabase = createServerSupabaseClient();
    const { data: order } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        session_id: 'server-action-session',
        status: 'confirmed',
        subtotal,
        tax,
        shipping: 0,
        total,
        shipping_address: shippingDetails || {
          fullName: 'Villa Lumina Collector',
          addressLine1: '100 Architectural Pavilion Way',
          city: 'Beverly Hills',
          state: 'CA',
          postalCode: '90210',
          country: 'United States'
        }
      })
      .select('id, order_number, status, total, created_at')
      .maybeSingle();

    return {
      success: true,
      order: {
        id: order?.id || `ord_${Date.now()}`,
        orderNumber,
        status: 'confirmed',
        subtotal,
        tax,
        shipping: 'Complimentary White Glove Delivery',
        total,
        itemCount: items.reduce((s, i) => s + i.quantity, 0),
        createdAt: new Date().toISOString()
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
