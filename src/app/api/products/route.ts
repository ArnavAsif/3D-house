import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * GET /api/products
 * Retrieves luxury catalog products, with optional filtering by room or category.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room');
    const category = searchParams.get('category');

    const supabase = createServerSupabaseClient();
    let query = supabase.from('products').select(`
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
      model_url,
      variants:product_variants (
        id,
        title,
        sku,
        price,
        hex,
        color3,
        available_for_sale,
        inventory (
          stock_quantity,
          reserved_quantity
        )
      )
    `);

    if (room) query = query.eq('room', room);
    if (category) query = query.eq('category', category);

    const { data, error } = await query;

    // If Supabase table exists and returned data, map and return it
    if (!error && data && data.length > 0) {
      const normalized = data.map((p: any) => ({
        id: p.id,
        showroomId: p.showroom_id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category,
        room: p.room,
        displayZone: p.display_zone,
        placementType: p.placement_type,
        dimensions: p.dimensions,
        materials: p.materials,
        price: Number(p.price),
        rating: Number(p.rating),
        reviewsCount: p.reviews_count,
        modelUrl: p.model_url,
        variants: (p.variants || []).map((v: any) => ({
          id: v.id,
          productId: p.id,
          title: v.title,
          sku: v.sku,
          price: Number(v.price),
          hex: v.hex,
          color3: v.color3,
          availableForSale: v.available_for_sale,
          inventoryCount: v.inventory?.[0]?.stock_quantity ?? 15
        }))
      }));
      return NextResponse.json({ success: true, data: normalized });
    }

    // High-performance fallback to catalog dataset
    let fallback = SHOWROOM_PRODUCTS;
    if (room) fallback = fallback.filter((p) => p.room.toLowerCase() === room.toLowerCase());
    return NextResponse.json({ success: true, data: fallback });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
