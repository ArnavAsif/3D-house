// src/lib/optimization/qualityService.ts
/**
 * Quality Service – determines rendering settings based on device capabilities.
 * Provides DPR limits, shadow toggles, texture resolution scaling, lazy‑load distances, etc.
 */
export enum DeviceTier {
  HIGH_DESKTOP = "high-desktop",
  NORMAL_DESKTOP = "normal-desktop",
  TABLET = "tablet",
  MOBILE = "mobile",
}

export interface QualityProfile {
  /** Minimum device pixel ratio */
  minDpr: number;
  /** Maximum device pixel ratio */
  maxDpr: number;
  /** Enable shadows? */
  shadowsEnabled: boolean;
  /** Shadow map size */
  shadowMapSize: number;
  /** Enable point lights */
  enablePointLights: boolean;
  /** Max point lights */
  maxPointLights: number;
  /** Texture resolution factor (1 = full) */
  textureResolutionFactor: number;
  /** Frustum culling distance (meters) */
  frustumCullingDistance: number;
  /** Lazy‑load distance for GLTF models */
  lazyLoadDistance: number;
}

function detectDeviceTier(): DeviceTier {
  const ua = navigator.userAgent.toLowerCase();
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Mobile detection
  if (isTouch && (width <= 768 || /mobile|android|iphone|ipad/.test(ua))) {
    return DeviceTier.MOBILE;
  }
  // Tablet detection
  if (isTouch && width > 768 && width <= 1024) {
    return DeviceTier.TABLET;
  }
  // High‑end desktop detection – look for high‑end GPU strings
  if (/nvidia|rtx|gtx|radeon|intel.*iris/.test(ua) && width >= 1440) {
    return DeviceTier.HIGH_DESKTOP;
  }
  // Normal desktop fallback
  return DeviceTier.NORMAL_DESKTOP;
}

export const getQualityProfile = (): QualityProfile => {
  const tier = detectDeviceTier();
  switch (tier) {
    case DeviceTier.HIGH_DESKTOP:
      return {
        minDpr: 1,
        maxDpr: 2.5,
        shadowsEnabled: true,
        shadowMapSize: 2048,
        enablePointLights: true,
        maxPointLights: 20,
        textureResolutionFactor: 1,
        frustumCullingDistance: 200,
        lazyLoadDistance: 150,
      };
    case DeviceTier.NORMAL_DESKTOP:
      return {
        minDpr: 1,
        maxDpr: 2,
        shadowsEnabled: true,
        shadowMapSize: 1024,
        enablePointLights: true,
        maxPointLights: 12,
        textureResolutionFactor: 0.9,
        frustumCullingDistance: 150,
        lazyLoadDistance: 120,
      };
    case DeviceTier.TABLET:
      return {
        minDpr: 1,
        maxDpr: 1.5,
        shadowsEnabled: false,
        shadowMapSize: 512,
        enablePointLights: true,
        maxPointLights: 6,
        textureResolutionFactor: 0.7,
        frustumCullingDistance: 100,
        lazyLoadDistance: 80,
      };
    case DeviceTier.MOBILE:
    default:
      return {
        minDpr: 1,
        maxDpr: 1.2,
        shadowsEnabled: false,
        shadowMapSize: 256,
        enablePointLights: false,
        maxPointLights: 0,
        textureResolutionFactor: 0.5,
        frustumCullingDistance: 60,
        lazyLoadDistance: 50,
      };
  }
};
