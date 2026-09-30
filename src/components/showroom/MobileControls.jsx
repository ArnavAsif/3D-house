'use client';

import React, { useState, useRef } from 'react';
import { Move } from 'lucide-react';

/**
 * MobileControls
 * Touch virtual joystick controller for mobile first-person walkthroughs.
 * Provides intuitive dual-axis directional vector mapping for thumb navigation.
 */
export default function MobileControls({
  currentMode,
  onJoystickMove
}) {
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const baseRef = useRef();

  if (currentMode !== 'FIRST_PERSON') return null;

  const updateFromPointer = (e) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const maxRadius = 45;

    const distance = Math.hypot(dx, dy);
    const clampedDist = Math.min(distance, maxRadius);
    const angle = Math.atan2(dy, dx);

    const clampedX = Math.cos(angle) * clampedDist;
    const clampedY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: clampedX, y: clampedY });

    if (onJoystickMove) {
      onJoystickMove({
        x: clampedX / maxRadius,
        y: -(clampedY / maxRadius)
      });
    }
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsActive(true);
    updateFromPointer(e);
  };

  const handlePointerMove = (e) => {
    if (!isActive) return;
    e.stopPropagation();
    updateFromPointer(e);
  };

  const handlePointerUp = () => {
    setIsActive(false);
    setKnobPos({ x: 0, y: 0 });
    if (onJoystickMove) {
      onJoystickMove({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={baseRef}
      className="virtual-joystick-base"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        className="virtual-joystick-knob"
        style={{
          transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
        }}
      >
        <Move size={16} />
      </div>
      <div className="joystick-hint-label">WALK JOYSTICK</div>
    </div>
  );
}
