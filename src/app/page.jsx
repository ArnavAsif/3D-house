'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import client-only WebGL React Three Fiber Scene with SSR disabled
const ShowroomScene = dynamic(
  () => import('../components/3d/Scene'),
  {
    ssr: false,
    loading: () => (
      <div className="loading-screen-backdrop">
        <div className="loading-card">
          <div className="loading-badge">VILLA LUMINA ARCHITECTURE</div>
          <h1 className="loading-title">Interactive 3D Showroom</h1>
          <p className="loading-subtitle">Initializing Next.js React Three Fiber WebGL Canvas...</p>
        </div>
      </div>
    )
  }
);

export default function ShowroomPage() {
  return <ShowroomScene />;
}
