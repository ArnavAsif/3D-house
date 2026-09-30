import * as THREE from 'three';

// Procedural Canvas Texture Generators for Luxury Architectural Materials

export function createMarbleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base luxury ivory cream
  ctx.fillStyle = '#f8f6f0';
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft subtle cloudy shading
  for (let i = 0; i < 45; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = 80 + Math.random() * 220;
    const grad = ctx.createRadialGradient(x, y, 10, x, y, radius);
    grad.addColorStop(0, 'rgba(238, 232, 222, 0.5)');
    grad.addColorStop(1, 'rgba(248, 246, 240, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Delicate Calacatta Grey & Gold Veins
  const drawVein = (startX, startY, strokeStyle, width) => {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    let curX = startX;
    let curY = startY;
    ctx.moveTo(curX, curY);

    const steps = 20 + Math.floor(Math.random() * 22);
    for (let s = 0; s < steps; s++) {
      curX += (Math.random() - 0.35) * 85;
      curY += (Math.random() * 0.8 + 0.2) * 65;
      ctx.lineTo(curX, curY);

      if (Math.random() > 0.6) {
        ctx.save();
        ctx.lineWidth = width * 0.45;
        ctx.beginPath();
        ctx.moveTo(curX, curY);
        ctx.lineTo(curX + (Math.random() - 0.5) * 65, curY + Math.random() * 50);
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.stroke();
  };

  // Primary Calacatta veins
  for (let v = 0; v < 9; v++) {
    drawVein(Math.random() * 1024, -50, 'rgba(145, 140, 134, 0.32)', 2.8);
  }
  // Delicate warm amber / gold secondary veins
  for (let v = 0; v < 7; v++) {
    drawVein(Math.random() * 1024, -50, 'rgba(198, 162, 110, 0.25)', 2.0);
  }

  // 1200x600 Tile grout lines
  ctx.strokeStyle = 'rgba(185, 180, 170, 0.35)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= 1024; x += 512) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += 256) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createTravertineTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Warm Roman beige base
  ctx.fillStyle = '#dfd6c0';
  ctx.fillRect(0, 0, 1024, 1024);

  // Horizontal stratified bands
  for (let y = 0; y < 1024; y += 3) {
    const alpha = 0.06 + Math.random() * 0.14;
    const tone = Math.random() > 0.5 ? '255,255,245' : '185,170,145';
    ctx.fillStyle = `rgba(${tone}, ${alpha})`;
    ctx.fillRect(0, y, 1024, 2 + Math.random() * 4);
  }

  // Porous micro pits
  for (let p = 0; p < 900; p++) {
    const px = Math.random() * 1024;
    const py = Math.random() * 1024;
    const pw = 3 + Math.random() * 14;
    const ph = 1 + Math.random() * 2.5;
    ctx.fillStyle = 'rgba(145, 130, 110, 0.38)';
    ctx.fillRect(px, py, pw, ph);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createWoodTexture(isDark = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = isDark ? '#46372b' : '#c8ad88';
  ctx.fillRect(0, 0, 1024, 1024);

  const plankHeight = 128;
  for (let y = 0; y < 1024; y += plankHeight) {
    const tint = (Math.random() - 0.5) * 16;
    ctx.fillStyle = isDark 
      ? `rgb(${70 + tint}, ${55 + tint}, ${43 + tint})`
      : `rgb(${200 + tint}, ${173 + tint}, ${136 + tint})`;
    ctx.fillRect(0, y, 1024, plankHeight);

    for (let g = 0; g < 48; g++) {
      const gy = y + Math.random() * plankHeight;
      ctx.strokeStyle = isDark ? 'rgba(30, 22, 16, 0.28)' : 'rgba(140, 110, 75, 0.22)';
      ctx.lineWidth = 0.8 + Math.random() * 1.6;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(340, gy + (Math.random() - 0.5) * 8, 680, gy + (Math.random() - 0.5) * 8, 1024, gy);
      ctx.stroke();
    }

    // Chamfered micro-bevel groove
    ctx.strokeStyle = isDark ? 'rgba(20, 15, 10, 0.75)' : 'rgba(95, 75, 50, 0.5)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Staggered vertical joints
  for (let y = 0; y < 1024; y += plankHeight) {
    const xSeam = (y % (plankHeight * 2) === 0) ? 512 : 256;
    ctx.beginPath();
    ctx.moveTo(xSeam, y);
    ctx.lineTo(xSeam, y + plankHeight);
    ctx.stroke();
    if (xSeam === 256) {
      ctx.beginPath();
      ctx.moveTo(768, y);
      ctx.lineTo(768, y + plankHeight);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createFlutedSlatsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#b89c74';
  ctx.fillRect(0, 0, 512, 512);

  const slatWidth = 32;
  for (let x = 0; x < 512; x += slatWidth) {
    const grad = ctx.createLinearGradient(x, 0, x + slatWidth, 0);
    grad.addColorStop(0, '#55422e');
    grad.addColorStop(0.2, '#c8ab84');
    grad.addColorStop(0.7, '#d8bc95');
    grad.addColorStop(1, '#664e37');
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, slatWidth, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createFabricNormalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 4) {
    for (let x = 0; x < 256; x += 4) {
      const isAlt = (x / 4 + y / 4) % 2 === 0;
      ctx.fillStyle = isAlt ? 'rgb(140, 120, 255)' : 'rgb(115, 135, 245)';
      ctx.fillRect(x, y, 4, 4);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createPlasterNormalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Neutral normal map base: RGB(128, 128, 255)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle micro-stucco noise
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 120 + Math.floor(Math.random() * 16);
    const g = 120 + Math.floor(Math.random() * 16);
    ctx.fillStyle = `rgb(${r}, ${g}, 255)`;
    ctx.fillRect(x, y, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createStonePaverTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#cdc7be';
  ctx.fillRect(0, 0, 1024, 1024);

  for (let i = 0; i < 4500; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const s = Math.random() * 3;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(235, 230, 220, 0.4)' : 'rgba(140, 135, 125, 0.3)';
    ctx.fillRect(x, y, s, s);
  }

  // 600x600 paver joint grooves
  ctx.strokeStyle = 'rgba(75, 70, 65, 0.55)';
  ctx.lineWidth = 4;
  for (let x = 0; x <= 1024; x += 256) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += 256) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createGrassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#4a6b37';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const l = 3 + Math.random() * 6;
    ctx.strokeStyle = Math.random() > 0.5 ? '#5d8544' : '#39532a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 3, y - l);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createRugTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ebe5d8';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 3500; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.28)' : 'rgba(195, 185, 170, 0.28)';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }

  ctx.strokeStyle = 'rgba(70, 65, 60, 0.18)';
  ctx.lineWidth = 2.5;
  const grid = 64;
  for (let i = -512; i < 1024; i += grid) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 512);
    ctx.lineTo(i + 512, 0);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createAbstractArtTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm cream raw linen base
  ctx.fillStyle = '#f0ece1';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle linen weave texture
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(215, 205, 190, 0.25)';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }

  // Large organic plaster arch in warm beige
  ctx.fillStyle = '#dfd5c2';
  ctx.beginPath();
  ctx.arc(256, 320, 160, Math.PI, 0);
  ctx.lineTo(416, 440);
  ctx.lineTo(96, 440);
  ctx.closePath();
  ctx.fill();

  // Impasto relief line work
  ctx.strokeStyle = 'rgba(110, 95, 80, 0.35)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(256, 320, 140, Math.PI, 0);
  ctx.stroke();

  // Minimalist charcoal circle
  ctx.fillStyle = '#2b2a28';
  ctx.beginPath();
  ctx.arc(256, 180, 48, 0, Math.PI * 2);
  ctx.fill();

  // Subtle terracotta accent wash
  ctx.fillStyle = 'rgba(180, 105, 75, 0.18)';
  ctx.beginPath();
  ctx.arc(360, 260, 70, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createAbstractArtTexture2() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Raw plaster canvas base
  ctx.fillStyle = '#ece8df';
  ctx.fillRect(0, 0, 512, 512);

  // Textured plaster wash
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.35)' : 'rgba(190, 180, 165, 0.2)';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
  }

  // Minimalist diagonal and vertical architectural lines
  ctx.strokeStyle = '#32312f';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, 100);
  ctx.lineTo(80, 420);
  ctx.moveTo(80, 260);
  ctx.lineTo(420, 260);
  ctx.stroke();

  // Warm sand textured rectangle
  ctx.fillStyle = '#d2c5ae';
  ctx.fillRect(160, 120, 180, 220);

  // Ochre accent bar
  ctx.fillStyle = '#b89458';
  ctx.fillRect(220, 360, 160, 12);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createDoorPlaqueTexture(roomName = 'PRIVATE SUITE', statusText = 'COMING SOON') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background: Deep architectural matte bronze/charcoal with subtle metallic gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
  bgGrad.addColorStop(0, '#1c1d20');
  bgGrad.addColorStop(0.5, '#25262a');
  bgGrad.addColorStop(1, '#18191b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle brushed metal streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
  for (let i = 0; i < 400; i++) {
    const y = Math.random() * 512;
    const h = 1 + Math.random() * 2;
    ctx.fillRect(0, y, 1024, h);
  }

  // Refined double border in champagne gold / brass
  ctx.strokeStyle = 'rgba(212, 175, 110, 0.65)';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, 952, 440);

  ctx.strokeStyle = 'rgba(212, 175, 110, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, 928, 416);

  // Corner accent notches
  ctx.fillStyle = '#d4af6e';
  const cornerSize = 12;
  ctx.fillRect(36, 36, cornerSize, 3);
  ctx.fillRect(36, 36, 3, cornerSize);
  ctx.fillRect(988 - cornerSize, 36, cornerSize, 3);
  ctx.fillRect(985, 36, 3, cornerSize);
  ctx.fillRect(36, 473, cornerSize, 3);
  ctx.fillRect(36, 476 - cornerSize, 3, cornerSize);
  ctx.fillRect(988 - cornerSize, 473, cornerSize, 3);
  ctx.fillRect(985, 476 - cornerSize, 3, cornerSize);

  // Top Category Tag
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(212, 175, 110, 0.8)';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '10px';
  ctx.fillText('VILLA LUMINA  •  SHOWROOM', 512, 120);

  // Room Title
  ctx.font = '600 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#f8f5ee';
  ctx.letterSpacing = '6px';
  ctx.fillText(roomName.toUpperCase(), 512, 215);

  // Decorative Hairline Divider
  const divGrad = ctx.createLinearGradient(260, 260, 764, 260);
  divGrad.addColorStop(0, 'rgba(212, 175, 110, 0)');
  divGrad.addColorStop(0.5, 'rgba(212, 175, 110, 0.7)');
  divGrad.addColorStop(1, 'rgba(212, 175, 110, 0)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(260, 260);
  ctx.lineTo(764, 260);
  ctx.stroke();

  // Status Badge: COMING SOON
  ctx.font = '700 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#e8c88c';
  ctx.letterSpacing = '8px';
  ctx.fillText(statusText.toUpperCase(), 512, 335);

  // Subtitle / Lock note
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(220, 215, 205, 0.6)';
  ctx.letterSpacing = '5px';
  ctx.fillText('GALLERY ACCESS RESTRICTED', 512, 400);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCurtainTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Sheer warm cream base
  ctx.fillStyle = '#f7f4ed';
  ctx.fillRect(0, 0, 512, 512);

  // Vertical wave shading simulation for drapery folds
  for (let x = 0; x < 512; x++) {
    const wave = Math.sin((x / 512) * Math.PI * 12);
    const shadow = 0.08 + 0.06 * wave;
    ctx.fillStyle = `rgba(180, 168, 150, ${shadow})`;
    ctx.fillRect(x, 0, 1, 512);
  }

  // Delicate linen cross-weave
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let y = 0; y < 512; y += 4) {
    ctx.fillRect(0, y, 512, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

