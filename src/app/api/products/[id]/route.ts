import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getProductById, SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * GET /api/products/[id]
 * Retrieves single product by either UUID or 3D Showroom Identifier (`product-XX`).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerSupabaseClient();

    // Query by showroom_id (e.g. 'product-01') or by UUID
    const isShowroomId = id.startsWith('product-');
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
      `)
      .eq(column, id)
      .maybeSingle();

    if (!error && product) {
      const normalized = {
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
        modelUrl: product.model_url,
        variants: (product.variants || []).map((v: any) => ({
          id: v.id,
          productId: product.id,
          title: v.title,
          name: v.title,
          sku: v.sku,
          price: Number(v.price),
          hex: v.hex,
          color3: v.color3,
          availableForSale: v.available_for_sale,
          inventoryCount: v.inventory?.[0]?.stock_quantity ?? 15
        }))
      };
      return NextResponse.json({ success: true, data: normalized });
    }

    // Fallback to local catalog
    const local = getProductById(id) || SHOWROOM_PRODUCTS.find((p) => p.dbId === id || p.handle === id);
    if (!local) {
      return NextResponse.json(
        { success: false, error: `Product "${id}" not found in commerce catalog.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...local,
        showroomId: local.id,
        title: local.name,
        variants: local.variants.map((v) => ({
          ...v,
          title: v.name,
          inventoryCount: 15
        }))
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
