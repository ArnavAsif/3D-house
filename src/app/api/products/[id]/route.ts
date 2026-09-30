import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getProductById, SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * GET /api/products/[id]
 * Retrieves single product by UUID, slug, or 3D showroom identifier (`product-XX`).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerSupabaseClient();

    // Check if looking up by UUID, slug, or showroom ID
    const isShowroomId = id.startsWith('product-');
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

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

    if (isUuid) {
      query = query.eq('id', id);
    } else if (isShowroomId) {
      // Find matching local slug
      const local = getProductById(id);
      if (local?.handle) {
        query = query.eq('slug', local.handle);
      } else {
        query = query.eq('id', id);
      }
    } else {
      query = query.eq('slug', id);
    }

    const { data: product, error } = await query.maybeSingle();

    if (!error && product) {
      const localMatch = SHOWROOM_PRODUCTS.find(
        (sp) => sp.handle === product.slug || sp.name.toLowerCase() === product.name.toLowerCase()
      );

      const categoryObj = Array.isArray((product as any).category)
        ? (product as any).category[0]
        : (product as any).category;
      const showroomId = localMatch?.id || (isShowroomId ? id : 'product-01');
      const roomName = localMatch?.room || categoryObj?.name || 'Living Room';
      const displayZone = localMatch?.displayZone || 'Showroom Display';
      const placementType = localMatch?.placementType || 'Dedicated Architectural Display Areas';
      const dimensions = localMatch?.dimensions || 'Proportional Architectural Scale';
      const materials = localMatch?.materials || 'Natural Oak, Marble & Linen';

      const normalized = {
        id: product.id,
        categoryId: product.category_id,
        category: categoryObj?.name || localMatch?.productType || 'Furniture',
        categoryData: categoryObj,
        showroomId,
        name: product.name,
        title: product.name,
        slug: product.slug,
        description: product.description || localMatch?.description || '',
        shortDescription: product.short_description,
        basePrice: Number(product.base_price),
        price: Number(product.base_price),
        status: product.status,
        room: roomName,
        displayZone,
        placementType,
        dimensions,
        materials,
        rating: localMatch?.rating || 4.9,
        reviewsCount: localMatch?.reviewsCount || 18,
        modelUrl: product.showroom?.[0]?.model_url || localMatch?.modelUrl,
        images: product.images || [],
        variants: (product.variants || []).map((v: any) => {
          const inv = Array.isArray(v.inventory) ? v.inventory[0] : v.inventory;
          const stock = inv ? Math.max(0, inv.quantity - inv.reserved_quantity) : 20;

          return {
            id: v.id,
            productId: product.id,
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

      return NextResponse.json({ success: true, data: normalized });
    }

    // High-performance fallback to catalog dataset
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
          inventoryCount: 20
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
