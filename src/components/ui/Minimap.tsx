'use client';

import React, { useState } from 'react';
import { Navigation, Maximize2, Minimize2 } from 'lucide-react';
import { SHOWROOM_PRODUCTS } from '@/data/showroomProducts';

interface MinimapProps {
  playerPosition: { x: number; z: number; yaw: number };
  hoveredProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

/**
 * Minimap
 * 2D Architectural SVG Floor Plan Radar HUD.
 * Tracks user real-time spatial positioning, viewing angle cone, and interactive product targets.
 */
export default function Minimap({
  playerPosition,
  hoveredProductId,
  onSelectProduct
}: MinimapProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`minimap-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="minimap-header">
        <div className="minimap-title-row">
          <Navigation size={13} />
          <span>Floor Plan Radar</span>
        </div>
        <button
          className="minimap-expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Minimize floor plan' : 'Expand floor plan'}
        >
          {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>
      </div>

      {/* Scaled 2D Architectural SVG Floor Plan */}
      <div className="minimap-canvas-wrapper">
        <svg viewBox="-12 -16 24 26" className="minimap-svg">
          {/* Background Villa Bounds */}
          <rect x="-10" y="-8" width="20" height="14.5" className="map-house-floor" />
          <rect x="-11" y="-15.5" width="22" height="7.5" className="map-garden-ground" />
          <rect x="-3.5" y="6.5" width="7" height="2.5" className="map-porch-ground" />

          {/* Room Zones */}
          <rect x="-9.5" y="-1.5" width="8" height="8" className="map-room-zone" />
          <text x="-5.5" y="2.5" className="map-room-label">Living Room</text>

          <rect x="1.5" y="1.5" width="8" height="5" className="map-room-zone" />
          <text x="5.5" y="4.2" className="map-room-label">Dining Area</text>

          <rect x="1.5" y="-7.5" width="8" height="8" className="map-room-zone" />
          <text x="5.5" y="-3.5" className="map-room-label">Kitchen</text>

          <rect x="-9.5" y="-7.5" width="7.5" height="6" className="map-room-zone" />
          <text x="-5.7" y="-4.2" className="map-room-label">Showroom Suite</text>

          <rect x="-2.0" y="-7.5" width="3.5" height="4.5" className="map-room-zone" />
          <text x="-0.2" y="-5.2" className="map-room-label">Bath</text>

          <text x="0" y="4.2" className="map-room-label foyer-label">Foyer</text>
          <text x="0" y="-11.0" className="map-room-label garden-label">Rear Garden</text>

          {/* Exterior Walls */}
          <line x1="-10" y1="6.5" x2="-1.8" y2="6.5" className="map-wall-solid" />
          <line x1="1.8" y1="6.5" x2="10" y2="6.5" className="map-wall-solid" />
          <line x1="-1.8" y1="6.5" x2="1.8" y2="6.5" className="map-door-entrance" />

          <line x1="-10" y1="-8" x2="-2.0" y2="-8" className="map-wall-glass" />
          <line x1="-2.0" y1="-8" x2="1.5" y2="-8" className="map-wall-solid" />
          <line x1="1.5" y1="-8" x2="6.0" y2="-8" className="map-wall-glass" />
          <line x1="6.0" y1="-8" x2="10" y2="-8" className="map-wall-solid" />

          <line x1="-10" y1="-8" x2="-10" y2="6.5" className="map-wall-glass" />
          <line x1="10" y1="-8" x2="10" y2="6.5" className="map-wall-solid" />

          {/* Interior Partitions */}
          <line x1="-2.0" y1="-7.5" x2="-2.0" y2="-3.0" className="map-wall-interior" />
          <line x1="1.5" y1="-7.5" x2="1.5" y2="-3.0" className="map-wall-interior" />
          <line x1="-2.0" y1="-3.0" x2="-0.6" y2="-3.0" className="map-wall-interior" />
          <line x1="0.6" y1="-3.0" x2="1.5" y2="-3.0" className="map-wall-interior" />

          <line x1="-9.5" y1="-1.5" x2="-4.5" y2="-1.5" className="map-wall-interior" />
          <line x1="-3.0" y1="-1.5" x2="-2.0" y2="-1.5" className="map-wall-interior" />

          {/* Product Hotspots on Minimap */}
          {SHOWROOM_PRODUCTS.map((prod) => (
            <circle
              key={prod.id}
              cx={prod.position[0]}
              cy={prod.position[2]}
              r={hoveredProductId === prod.id ? '0.7' : '0.45'}
              className={`map-product-dot ${hoveredProductId === prod.id ? 'active' : ''}`}
              onClick={() => onSelectProduct(prod.id)}
            >
              <title>{prod.name}</title>
            </circle>
          ))}

          {/* Real-time Player Position & View Angle Cone */}
          {playerPosition && (
            <g
              transform={`translate(${playerPosition.x}, ${playerPosition.z}) rotate(${
                (-playerPosition.yaw * 180) / Math.PI
              })`}
            >
              <polygon points="0,0 -1.5,-3 1.5,-3" className="player-view-cone" />
              <circle cx="0" cy="0" r="0.6" className="player-marker-core" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
