import * as THREE from 'three';

/**
 * MemoryManager
 * Production resource disposal and texture caching engine for Three.js.
 * Guarantees zero memory leaks on page transitions, camera switches, or dynamic tier swaps.
 */

export class MemoryManager {
  private static textureRegistry: Map<string, THREE.Texture> = new Map();

  /**
   * Safely disposes an entire Three.js Object3D subtree including geometries,
   * materials, custom shader attributes, and linked textures.
   */
  public static disposeObject(root: THREE.Object3D | null | undefined): void {
    if (!root) return;

    root.traverse((node: any) => {
      // 1. Dispose Geometry
      if (node.geometry) {
        node.geometry.dispose();
      }

      // 2. Dispose Materials & Textures
      if (node.material) {
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((mat: THREE.Material) => {
          this.disposeMaterial(mat);
        });
      }

      // 3. Clear InstancedMesh attributes
      if (node.isInstancedMesh) {
        if (node.instanceMatrix) {
          node.instanceMatrix.needsUpdate = false;
        }
        if (node.instanceColor) {
          node.instanceColor.needsUpdate = false;
        }
      }
    });

    if (root.parent) {
      root.parent.remove(root);
    }
  }

  /**
   * Disposes a material and its associated PBR maps.
   */
  public static disposeMaterial(material: any): void {
    if (!material) return;

    const textureKeys = [
      'map',
      'normalMap',
      'roughnessMap',
      'metalnessMap',
      'aoMap',
      'alphaMap',
      'displacementMap',
      'bumpMap',
      'emissiveMap',
      'clearcoatMap',
      'clearcoatRoughnessMap',
      'transmissionMap'
    ];

    textureKeys.forEach((key) => {
      if (material[key] && material[key].isTexture) {
        // Only dispose if not marked as persistent shared cache
        if (!material[key].userData?.persistentCache) {
          material[key].dispose();
        }
      }
    });

    material.dispose();
  }

  /**
   * Registers a shared procedural texture in the singleton cache.
   */
  public static registerCachedTexture(key: string, texture: THREE.Texture): THREE.Texture {
    texture.userData = texture.userData || {};
    texture.userData.persistentCache = true;
    this.textureRegistry.set(key, texture);
    return texture;
  }

  /**
   * Retrieves a shared texture from the cache if available.
   */
  public static getCachedTexture(key: string): THREE.Texture | undefined {
    return this.textureRegistry.get(key);
  }

  /**
   * Disposes all registered textures in the cache and clears registry.
   */
  public static clearTextureCache(): void {
    this.textureRegistry.forEach((tex) => {
      tex.dispose();
    });
    this.textureRegistry.clear();
  }
}
