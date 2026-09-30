import { supabase } from './client';

/**
 * Supabase Storage Asset Manager
 * Retrieves public URLs and uploads 3D GLTF / GLB meshes and procedural texture maps.
 */
export class SupabaseStorageService {
  private modelsBucket = 'showroom-models';
  private texturesBucket = 'showroom-textures';

  /**
   * Retrieves the public CDN URL for a 3D GLTF/GLB product asset.
   */
  getModelUrl(path: string): string {
    const { data } = supabase.storage.from(this.modelsBucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * Retrieves the public CDN URL for an architectural texture map.
   */
  getTextureUrl(path: string): string {
    const { data } = supabase.storage.from(this.texturesBucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * Uploads a 3D model asset to Supabase Storage.
   */
  async uploadModel(path: string, file: File | Blob) {
    const { data, error } = await supabase.storage.from(this.modelsBucket).upload(path, file, {
      upsert: true,
      contentType: 'model/gltf-binary'
    });
    if (error) throw error;
    return this.getModelUrl(data.path);
  }
}

export const storageService = new SupabaseStorageService();
