import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * GET /api/products
 * Retrieves luxury catalog products from Supabase PostgreSQL with joined relations:
 * categories, product_variants, inventory, product_images, and showroom_products.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room');
    const category = searchParams.get('category');
    const categoryId = searchParams.get('categoryId');

    const supabase = createServerSupabaseClient();
    let query = supabase.from('products').select(`
      id,
      category_id,
      name,
      slug,
      description,
      short_description,
      base_price,
      status,
      created_at,
      updated_at,
      category:categories (
        id,
        name,
        slug
      ),
      images:product_images (
        id,
        image_url,
        alt_text,
        sort_order
      ),
      variants:product_variants (
        id,
        name,
        sku,
        price,
        status,
        hex,
        color3,
        inventory (
          quantity,
          reserved_quantity
        )
      ),
      showroom:showroom_products (
        id,
        model_url,
        position_x,
        position_y,
        position_z,
        rotation_x,
        rotation_y,
        rotation_z,
        scale,
        interaction_radius,
        is_active
      )
    `);

    if (categoryId) query = query.eq('category_id', categoryId);

    const { data, error } = await query;

    // If Supabase returned products, normalize and return
    if (!error && data && data.length > 0) {
      const normalized = data.map((p: any, index: number) => {
        const localMatch = SHOWROOM_PRODUCTS.find(
          (sp) => sp.handle === p.slug || sp.name.toLowerCase() === p.name.toLowerCase()
        );

        const categoryObj = Array.isArray((p as any).category)
          ? (p as any).category[0]
          : (p as any).category;
        const showroomId = localMatch?.id || `product-${String(index + 1).padStart(2, '0')}`;
        const roomName = localMatch?.room || categoryObj?.name || 'Living Room';
        const displayZone = localMatch?.displayZone || 'Showroom Display';
        const placementType = localMatch?.placementType || 'Dedicated Architectural Display Areas';
        const dimensions = localMatch?.dimensions || 'Proportional Architectural Scale';
        const materials = localMatch?.materials || 'Natural Oak, Marble & Linen';

        return {
          id: p.id,
          categoryId: p.category_id,
          category: categoryObj?.name || localMatch?.productType || 'Furniture',
          categoryData: categoryObj,
          showroomId,
          name: p.name,
          title: p.name,
          slug: p.slug,
          description: p.description || localMatch?.description || '',
          shortDescription: p.short_description,
          basePrice: Number(p.base_price),
          price: Number(p.base_price),
          status: p.status,
          room: roomName,
          displayZone,
          placementType,
          dimensions,
          materials,
          rating: localMatch?.rating || 4.9,
          reviewsCount: localMatch?.reviewsCount || 18,
          modelUrl: p.showroom?.[0]?.model_url || localMatch?.modelUrl,
          images: p.images || [],
          variants: (p.variants || []).map((v: any) => {
            const inv = Array.isArray(v.inventory) ? v.inventory[0] : v.inventory;
            const stock = inv ? Math.max(0, inv.quantity - inv.reserved_quantity) : 20;

            return {
              id: v.id,
              productId: p.id,
              name: v.name,
              title: v.name,
              sku: v.sku,
              price: Number(v.price),
              status: v.status,
              hex: v.hex || '#E5E0D8',
              color3: v.color3 || '#E5E0D8',
              availableForSale: v.status === 'active' && stock > 0,
              inventoryCount: stock
            };
          }),
          details: localMatch?.details || []
        };
      });

      let filtered = normalized;
      if (room) {
        filtered = filtered.filter((p) => p.room.toLowerCase() === room.toLowerCase());
      }
      if (category) {
        filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }

      return NextResponse.json({ success: true, data: filtered });
    }

    // High-performance fallback to catalog dataset
    let fallback = SHOWROOM_PRODUCTS;
    if (room) fallback = fallback.filter((p) => p.room.toLowerCase() === room.toLowerCase());
    if (category) fallback = fallback.filter((p) => p.productType.toLowerCase() === category.toLowerCase());

    return NextResponse.json({ success: true, data: fallback });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
