'use client';

import React from 'react';
import { X } from 'lucide-react';
import { ARCHITECTURAL_SPECS } from '@/data/roomData';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SpecsModal
 * Displays architectural blueprint specifications and dimensions for Villa Lumina.
 */
export default function SpecsModal({ isOpen, onClose }: SpecsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="specs-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="specs-modal-header">
          <h2>Architectural Specifications & Floor Plan</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close specifications">
            <X size={18} />
          </button>
        </div>
        <div className="specs-grid-display">
          <div className="spec-card">
            <h3>Walls & Partitions</h3>
            <p>
              <strong>Exterior:</strong> {ARCHITECTURAL_SPECS.wallThickness.exterior} solid
              insulated assembly.
            </p>
            <p>
              <strong>Interior:</strong> {ARCHITECTURAL_SPECS.wallThickness.interior} dry-wall
              partitions.
            </p>
            <p>
              <strong>Ceiling:</strong> {ARCHITECTURAL_SPECS.ceilingHeight} finished ceiling
              with recessed LED coves.
            </p>
          </div>

          <div className="spec-card">
            <h3>Doors & Openings</h3>
            <p>
              <strong>Front Door:</strong> {ARCHITECTURAL_SPECS.doors.entrance.width} ×{' '}
              {ARCHITECTURAL_SPECS.doors.entrance.height} grand pivot architectural timber
              door.
            </p>
            <p>
              <strong>Interior:</strong> {ARCHITECTURAL_SPECS.doors.interior.width} ×{' '}
              {ARCHITECTURAL_SPECS.doors.interior.height} flush frameless doors with concealed
              hinges.
            </p>
            <p>
              <strong>Patio Sliders:</strong> {ARCHITECTURAL_SPECS.doors.patioSlider.width} ×{' '}
              {ARCHITECTURAL_SPECS.doors.patioSlider.height} multi-panel sliding pocket doors.
            </p>
          </div>

          <div className="spec-card">
            <h3>Design Principles</h3>
            <p>
              <strong>Circulation:</strong> Continuous non-bottlenecked path with {'>'}1.5m
              clearance.
            </p>
            <p>
              <strong>Materiality:</strong> Warm Oak, Roman Travertine, Calacatta Gold Marble,
              and Matte Black metal.
            </p>
            <p>
              <strong>Decoupling:</strong> Meshes carry only IDs (`product-XX`) for dynamic
              Next.js + Supabase hydration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
