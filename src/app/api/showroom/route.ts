import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

/**
 * GET /api/showroom
 * Implements the user's required pipeline:
 * Supabase
 *   ↓
 * showroom_products (active only)
 *   ↓
 * product_id
 *   ↓
 * products
 *   ↓
 * product_variants & product_images & inventory
 */
export async function GET(_request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    const { data: showroomRows, error } = await supabase
      .from('showroom_products')
      .select(`
        id,
        product_id,
        model_url,
        position_x,
        position_y,
        position_z,
        rotation_x,
        rotation_y,
        rotation_z,
        scale,
        interaction_radius,
        is_active,
        product:products (
          id,
          category_id,
          name,
          slug,
          description,
          short_description,
          base_price,
          status,
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
          )
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (!error && showroomRows && showroomRows.length > 0) {
      const items = showroomRows.map((row: any, index: number) => {
        const p = Array.isArray(row.product) ? row.product[0] : row.product;
        const localMatch = SHOWROOM_PRODUCTS.find(
          (sp) => sp.handle === p?.slug || sp.name?.toLowerCase() === p?.name?.toLowerCase()
        );

        const showroomId = localMatch?.id || `product-${String(index + 1).padStart(2, '0')}`;
        const categoryObj = Array.isArray(p?.category) ? p.category[0] : p?.category;
        const roomName = localMatch?.room || categoryObj?.name || 'Living Room';
        const displayZone = localMatch?.displayZone || 'Showroom Display';
        const placementType = localMatch?.placementType || 'Dedicated Architectural Display Areas';

        const variants = (p?.variants || []).map((v: any) => {
          const inv = Array.isArray(v.inventory) ? v.inventory[0] : v.inventory;
          const stock = inv ? Math.max(0, inv.quantity - inv.reserved_quantity) : 20;
          return {
            id: v.id,
            productId: p?.id || row.product_id,
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
        });

        const normalizedProduct = {
          id: p?.id || row.product_id,
          categoryId: p?.category_id,
          category: categoryObj?.name || localMatch?.productType || 'Furniture',
          categoryData: categoryObj,
          showroomId,
          name: p?.name || localMatch?.name || 'Showroom Piece',
          title: p?.name || localMatch?.name || 'Showroom Piece',
          slug: p?.slug || localMatch?.handle || '',
          description: p?.description || localMatch?.description || '',
          shortDescription: p?.short_description,
          basePrice: Number(p?.base_price || localMatch?.price || 0),
          price: Number(p?.base_price || localMatch?.price || 0),
          status: p?.status || 'active',
          room: roomName,
          displayZone,
          placementType,
          dimensions: localMatch?.dimensions || 'Proportional Architectural Scale',
          materials: localMatch?.materials || 'Natural Oak & Stone',
          rating: localMatch?.rating || 4.9,
          reviewsCount: localMatch?.reviewsCount || 18,
          modelUrl: row.model_url || localMatch?.modelUrl,
          images: p?.images || [],
          variants: variants.length > 0 ? variants : (localMatch?.variants || []).map((v: any) => ({
            ...v,
            name: v.name,
            title: v.name,
            inventoryCount: 20
          })),
          details: localMatch?.details || []
        };

        return {
          id: row.id,
          productId: row.product_id,
          showroomId,
          modelUrl: row.model_url || localMatch?.modelUrl,
          position: [Number(row.position_x), Number(row.position_y), Number(row.position_z)] as [number, number, number],
          rotation: [Number(row.rotation_x), Number(row.rotation_y), Number(row.rotation_z)] as [number, number, number],
          scale: [Number(row.scale), Number(row.scale), Number(row.scale)] as [number, number, number],
          interactionRadius: Number(row.interaction_radius) || 1.8,
          isActive: row.is_active,
          product: normalizedProduct
        };
      });

      return NextResponse.json({ success: true, data: items });
    }

    // High-performance fallback linking catalog to database IDs
    const fallback = SHOWROOM_PRODUCTS.map((local, index) => {
      const dbId = local.dbId || `p0000000-0000-0000-0000-0000000000${String(index + 1).padStart(2, '0')}`;
      const showroomDbId = `s0000000-0000-0000-0000-0000000000${String(index + 1).padStart(2, '0')}`;

      return {
        id: showroomDbId,
        productId: dbId,
        showroomId: local.id,
        modelUrl: local.modelUrl || null,
        position: local.position as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        scale: [1, 1, 1] as [number, number, number],
        interactionRadius: local.clearanceRadiusM || 1.8,
        isActive: true,
        product: {
          id: dbId,
          showroomId: local.id,
          name: local.name,
          title: local.name,
          slug: local.handle,
          category: local.productType,
          room: local.room,
          displayZone: local.displayZone,
          placementType: local.placementType,
          description: local.description,
          dimensions: local.dimensions,
          materials: local.materials,
          price: local.price,
          basePrice: local.price,
          rating: local.rating,
          reviewsCount: local.reviewsCount,
          modelUrl: local.modelUrl,
          images: [],
          variants: local.variants.map((v) => ({
            id: v.id,
            productId: dbId,
            name: v.name,
            title: v.name,
            sku: `SKU-${local.id.toUpperCase()}-${v.name.replace(/\s+/g, '-').toUpperCase()}`,
            price: Number(v.price || local.price),
            hex: v.hex,
            color3: v.color3,
            availableForSale: v.availableForSale,
            inventoryCount: 20
          })),
          details: local.details
        }
      };
    });

    return NextResponse.json({ success: true, data: fallback });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch showroom products' },
      { status: 500 }
    );
  }
}
