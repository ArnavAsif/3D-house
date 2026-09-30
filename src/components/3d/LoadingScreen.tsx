'use client';

import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { Compass } from 'lucide-react';

interface LoadingScreenProps {
  isSceneReady?: boolean;
  forceVisible?: boolean;
}

/**
 * LoadingScreen
 * Luxury architectural blueprint loading state integrated with Drei's useProgress
 * and WebGL canvas first-frame detection.
 * Automatically resolves and fades out smoothly without getting stuck at 0%.
 */
export default function LoadingScreen({
  isSceneReady = false,
  forceVisible = false
}: LoadingScreenProps) {
  const { active, progress, item, total } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(25);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // If Drei has active asset loading queue:
    if (active && total > 0) {
      setDisplayProgress(Math.max(25, Math.round(progress)));
      if (progress >= 100) {
        setIsFadingOut(true);
        const timer = setTimeout(() => setIsUnmounted(true), 500);
        return () => clearTimeout(timer);
      }
    } else if (isSceneReady) {
      // Scene has rendered first frame in WebGL
      setDisplayProgress(100);
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => setIsUnmounted(true), 500);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      // Fast incremental progression while initializing procedural materials
      const interval = setInterval(() => {
        setDisplayProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 25;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [active, progress, total, isSceneReady]);

  if (isUnmounted && !forceVisible) {
    return null;
  }

  const rounded = Math.min(100, Math.max(25, displayProgress));

  return (
    <div className={`loading-screen-backdrop ${isFadingOut ? 'fading-out' : ''}`}>
      <div className="loading-card">
        <div className="loading-badge">
          <Compass size={16} className="spin-slow" />
          <span>VILLA LUMINA ARCHITECTURE</span>
        </div>

        <h1 className="loading-title">Interactive 3D Showroom</h1>
        <p className="loading-subtitle">
          Preparing structural shell, procedural travertine materials, and Supabase catalog...
        </p>

        {/* Progress Bar */}
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${rounded}%` }}
          />
        </div>

        <div className="loading-meta-row">
          <span className="loading-percent">{rounded}%</span>
          <span className="loading-item-text">
            {item
              ? `Loading: ${item.split('/').pop()}`
              : isSceneReady
              ? 'Scene Initialized'
              : 'Generating Architectural Shell'}
          </span>
        </div>

        <div className="loading-specs-footnote">
          <span>R3F WebGL 2.0</span>
          <span>•</span>
          <span>Shadow-Line Architecture</span>
          <span>•</span>
          <span>Next.js + Supabase Commerce</span>
        </div>
      </div>
    </div>
  );
}
