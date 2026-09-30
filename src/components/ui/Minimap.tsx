'use client';

import React, { useState, useEffect } from 'react';
import { Navigation, Maximize2, Minimize2 } from 'lucide-react';
import { playerStore, PlayerSpatialState } from '@/lib/store/playerStore';

interface MinimapProps {
  playerPosition?: { x: number; z: number; yaw: number };
  hoveredProductId?: string | null;
  onSelectProduct?: (productId: string) => void;
}

/**
 * Minimap
 * 2D Architectural SVG Floor Plan Radar HUD.
 * Reflects the realistic open-plan Villa Lumina layout:
 * - Exterior landscaped front approach & entrance pathway.
 * - Grand continuous open-plan Living, Dining & Foyer hall.
 * - Closed private wings: Master Bedroom Suite & Spa Bathroom (COMING SOON).
 * - Real-time player coordinate positioning & viewing angle cone.
 */
export default function Minimap({ playerPosition: propPosition }: MinimapProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pos, setPos] = useState<PlayerSpatialState>(() => playerStore.get());

  useEffect(() => {
    return playerStore.subscribe((state) => {
      setPos(state);
    });
  }, []);

  const activePos = propPosition || pos;

  return (
    <div className={`minimap-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="minimap-header">
        <div className="minimap-title-row">
          <Navigation size={13} />
          <span>Villa Floor Plan</span>
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
        <svg viewBox="-14 -9 28 24" className="minimap-svg">
          {/* Villa Main Floor Slab */}
          <rect x="-10" y="-8" width="20" height="14.5" className="map-house-floor" />

          {/* Exterior Front Approach & Pathway */}
          <rect
            x="-2.0"
            y="6.5"
            width="4.0"
            height="7.0"
            fill="rgba(212, 175, 110, 0.2)"
            stroke="rgba(212, 175, 110, 0.5)"
            strokeWidth="0.1"
          />
          <text x="0" y="10.5" className="map-room-label" style={{ fontSize: '0.65px', fill: '#d4af6e' }}>
            Main Entrance
          </text>

          {/* Open-Plan Continuous Living Space */}
          <rect
            x="-9.6"
            y="-1.5"
            width="17.6"
            height="7.8"
            fill="rgba(212, 175, 110, 0.08)"
            stroke="rgba(212, 175, 110, 0.5)"
            strokeWidth="0.12"
          />
          <text x="-5.5" y="2.2" className="map-room-label" style={{ fontWeight: '700', fill: '#f6f3ed' }}>
            Living Room
          </text>
          <text x="4.5" y="2.2" className="map-room-label" style={{ fontWeight: '600', fill: '#e6ded2', opacity: 0.8 }}>
            Dining & Kitchen
          </text>
          <text x="-0.5" y="3.2" className="map-room-label" style={{ fontSize: '0.6px', fill: '#4ade80' }}>
            ● OPEN LIVING AREA
          </text>

          {/* Closed Inaccessible Wings (Coming Soon) */}
          {/* 1. Master Bedroom Suite */}
          <rect x="-9.6" y="-7.6" width="7.6" height="6.1" className="map-room-zone" fill="rgba(0,0,0,0.4)" />
          <text x="-5.8" y="-4.6" className="map-room-label" style={{ opacity: 0.6 }}>Bedroom Suite</text>
          <text x="-5.8" y="-3.7" className="map-room-label" style={{ fontSize: '0.55px', fill: '#d4af6e', opacity: 0.85 }}>
            COMING SOON
          </text>

          {/* 2. Spa Bathroom */}
          <rect x="-2.0" y="-7.6" width="3.5" height="4.6" className="map-room-zone" fill="rgba(0,0,0,0.4)" />
          <text x="-0.25" y="-5.5" className="map-room-label" style={{ opacity: 0.6 }}>Bathroom</text>
          <text x="-0.25" y="-4.6" className="map-room-label" style={{ fontSize: '0.5px', fill: '#d4af6e', opacity: 0.85 }}>
            COMING SOON
          </text>

          {/* Exterior Walls */}
          {/* South Facade with Main Entrance Door */}
          <line x1="-10" y1="6.5" x2="-0.9" y2="6.5" className="map-wall-solid" />
          <line x1="0.9" y1="6.5" x2="10" y2="6.5" className="map-wall-solid" />
          {/* Main Entrance Doorway Gap */}
          <line x1="-0.9" y1="6.5" x2="0.9" y2="6.5" stroke="#4ade80" strokeWidth="0.25" />

          {/* West & North & East Exterior Walls */}
          <line x1="-9.84" y1="-7.8" x2="-9.84" y2="6.5" className="map-wall-glass" />
          <line x1="-10" y1="-7.8" x2="10" y2="-7.8" className="map-wall-solid" />
          <line x1="9.84" y1="-7.8" x2="9.84" y2="6.5" className="map-wall-solid" />

          {/* Closed Bedroom Partition Wall & Door at Z = -1.5 */}
          <line x1="-9.84" y1="-1.5" x2="-4.5" y2="-1.5" className="map-wall-interior" strokeWidth="0.2" />
          <line x1="-4.5" y1="-1.5" x2="-3.0" y2="-1.5" stroke="#d4af6e" strokeWidth="0.18" />
          <line x1="-3.0" y1="-1.5" x2="-2.0" y2="-1.5" className="map-wall-interior" strokeWidth="0.2" />

          {/* Closed Bathroom Partition Wall & Door at Z = -3.0 */}
          <line x1="-2.0" y1="-1.5" x2="-2.0" y2="-7.6" className="map-wall-interior" strokeWidth="0.2" />
          <line x1="-2.0" y1="-3.0" x2="-0.5" y2="-3.0" className="map-wall-interior" strokeWidth="0.2" />
          <line x1="-0.5" y1="-3.0" x2="0.5" y2="-3.0" stroke="#d4af6e" strokeWidth="0.18" />
          <line x1="0.5" y1="-3.0" x2="1.5" y2="-3.0" className="map-wall-interior" strokeWidth="0.2" />
          <line x1="1.5" y1="-3.0" x2="1.5" y2="-7.6" className="map-wall-interior" strokeWidth="0.2" />

          {/* Real-time Player Position & View Angle Cone */}
          {activePos && (
            <g
              transform={`translate(${activePos.x}, ${activePos.z}) rotate(${
                (-activePos.yaw * 180) / Math.PI
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
