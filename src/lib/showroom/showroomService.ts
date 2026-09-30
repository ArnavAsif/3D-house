import { ShowroomProductWithDetails, ShowroomSpatialPosition } from '@/types/showroom';
import { positioningService } from './positioningService';

/**
 * Showroom Service
 * Connects the 3D showroom directly with Supabase PostgreSQL:
 * Supabase -> showroom_products (is_active = true) -> product_id -> products -> product_variants & product_images & inventory
 */
export class ShowroomService {
  private cachedItems: ShowroomProductWithDetails[] = [];
  private fetchPromise: Promise<ShowroomProductWithDetails[]> | null = null;

  /**
   * Fetches active showroom products from Supabase via /api/showroom.
   * Feeds spatial targets into the 3D scene and caches product details.
   */
  async fetchShowroomProducts(): Promise<ShowroomProductWithDetails[]> {
    if (this.cachedItems.length > 0) {
      return this.cachedItems;
    }

    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    this.fetchPromise = (async () => {
      try {
        const res = await fetch('/api/showroom');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            this.cachedItems = json.data;
            this.updateSpatialPositions(json.data);
            return json.data;
          }
        }
      } catch (err) {
        console.warn('[ShowroomService] Error fetching from /api/showroom:', err);
      }

      // Return default positions if network fails
      const fallbackPositions = positioningService.getAllPositions();
      this.cachedItems = fallbackPositions.map((pos) => ({
        id: `s-${pos.showroomId}`,
        productId: pos.productId || pos.showroomId,
        showroomId: pos.showroomId,
        modelUrl: pos.modelUrl,
        position: pos.position,
        rotation: pos.rotation || [0, 0, 0],
        scale: pos.scale || [1, 1, 1],
        interactionRadius: pos.clearanceRadiusM || 1.8,
        isActive: true,
        product: {
          id: pos.productId || pos.showroomId,
          showroomId: pos.showroomId,
          name: 'Villa Lumina Showroom Piece',
          title: 'Villa Lumina Showroom Piece',
          slug: pos.showroomId,
          category: 'Furniture',
          room: pos.room,
          displayZone: pos.displayZone,
          placementType: pos.placementType,
          description: '',
          dimensions: 'Proportional Architectural Scale',
          materials: 'Natural Oak & Stone',
          price: 950,
          rating: 4.9,
          reviewsCount: 18,
          variants: []
        }
      }));

      return this.cachedItems;
    })();

    return this.fetchPromise;
  }

  /**
   * Updates spatial coordinates in the positioning service from active Supabase showroom rows.
   */
  private updateSpatialPositions(items: ShowroomProductWithDetails[]) {
    const positions: ShowroomSpatialPosition[] = items.map((item) => ({
      showroomId: item.showroomId,
      productId: item.productId,
      position: item.position,
      rotation: item.rotation,
      scale: item.scale,
      hotspotOffset: [0, 0.85, 0],
      clearanceRadiusM: item.interactionRadius,
      room: item.product.room,
      displayZone: item.product.displayZone,
      placementType: item.product.placementType as any,
      modelUrl: item.modelUrl
    }));

    positioningService.setPositions(positions);
  }

  /**
   * Retrieves an active showroom product by either database productId or showroomId.
   */
  getShowroomProduct(identifier: string): ShowroomProductWithDetails | undefined {
    return this.cachedItems.find(
      (it) =>
        it.productId === identifier ||
        it.showroomId === identifier ||
        it.product.id === identifier ||
        it.product.slug === identifier
    );
  }

  /**
   * Returns all active cached showroom products.
   */
  getAllShowroomProducts(): ShowroomProductWithDetails[] {
    return this.cachedItems;
  }
}

export const showroomService = new ShowroomService();
