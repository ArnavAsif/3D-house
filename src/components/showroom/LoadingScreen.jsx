'use client';

import React from 'react';
import { useProgress } from '@react-three/drei';
import { Sparkles, Compass } from 'lucide-react';

/**
 * LoadingScreen
 * Luxury architectural blueprint loading state integrated with Drei's useProgress.
 * Displays real-time asset loading percentage and smooth transition into the 3D scene.
 */
export default function LoadingScreen({ forceVisible = false }) {
  const { active, progress, errors, item, loaded, total } = useProgress();

  if (!active && !forceVisible && progress >= 100) {
    return null;
  }

  const roundedProgress = Math.min(100, Math.round(progress || 0));

  return (
    <div className="loading-screen-backdrop">
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
            style={{ width: `${roundedProgress}%` }}
          />
        </div>

        <div className="loading-meta-row">
          <span className="loading-percent">{roundedProgress}%</span>
          <span className="loading-item-text">
            {item ? `Loading: ${item.split('/').pop()}` : `Assets: ${loaded}/${total || 18}`}
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
