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
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = 80 + Math.random() * 200;
    const grad = ctx.createRadialGradient(x, y, 10, x, y, radius);
    grad.addColorStop(0, 'rgba(235, 230, 220, 0.45)');
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

    const steps = 18 + Math.floor(Math.random() * 20);
    for (let s = 0; s < steps; s++) {
      curX += (Math.random() - 0.35) * 85;
      curY += (Math.random() * 0.8 + 0.2) * 65;
      ctx.lineTo(curX, curY);

      // Subtle tributary branch
      if (Math.random() > 0.6) {
        ctx.save();
        ctx.lineWidth = width * 0.4;
        ctx.beginPath();
        ctx.moveTo(curX, curY);
        ctx.lineTo(curX + (Math.random() - 0.5) * 60, curY + Math.random() * 45);
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.stroke();
  };

  // Grey primary veins
  for (let v = 0; v < 8; v++) {
    drawVein(Math.random() * 1024, -50, 'rgba(150, 145, 140, 0.28)', 2.5);
  }
  // Delicate gold/amber secondary veins
  for (let v = 0; v < 6; v++) {
    drawVein(Math.random() * 1024, -50, 'rgba(195, 160, 110, 0.22)', 1.8);
  }

  // Soft faint tile seams for 1200x600 floor layout
  ctx.strokeStyle = 'rgba(190, 185, 175, 0.25)';
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
  for (let y = 0; y < 1024; y += 4) {
    const alpha = 0.05 + Math.random() * 0.12;
    const tone = Math.random() > 0.5 ? '255,255,245' : '185,170,145';
    ctx.fillStyle = `rgba(${tone}, ${alpha})`;
    ctx.fillRect(0, y, 1024, 2 + Math.random() * 4);
  }

  // Porous micro pits
  for (let p = 0; p < 800; p++) {
    const px = Math.random() * 1024;
    const py = Math.random() * 1024;
    const pw = 3 + Math.random() * 12;
    const ph = 1 + Math.random() * 2;
    ctx.fillStyle = 'rgba(150, 135, 115, 0.35)';
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

  // Base wood tone
  ctx.fillStyle = isDark ? '#46372b' : '#c8ad88';
  ctx.fillRect(0, 0, 1024, 1024);

  // Planks
  const plankHeight = 128;
  for (let y = 0; y < 1024; y += plankHeight) {
    // Slight color variation per plank
    const tint = (Math.random() - 0.5) * 15;
    ctx.fillStyle = isDark 
      ? `rgb(${70 + tint}, ${55 + tint}, ${43 + tint})`
      : `rgb(${200 + tint}, ${173 + tint}, ${136 + tint})`;
    ctx.fillRect(0, y, 1024, plankHeight);

    // Fine wood grain lines along plank
    for (let g = 0; g < 45; g++) {
      const gy = y + Math.random() * plankHeight;
      ctx.strokeStyle = isDark ? 'rgba(30, 22, 16, 0.25)' : 'rgba(145, 115, 80, 0.18)';
      ctx.lineWidth = 0.8 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(340, gy + (Math.random() - 0.5) * 8, 680, gy + (Math.random() - 0.5) * 8, 1024, gy);
      ctx.stroke();
    }

    // Seam line
    ctx.strokeStyle = isDark ? 'rgba(20, 15, 10, 0.7)' : 'rgba(100, 80, 55, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Staggered vertical seams
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
    grad.addColorStop(0, '#5a4632');
    grad.addColorStop(0.2, '#c8ab84');
    grad.addColorStop(0.7, '#d8bc95');
    grad.addColorStop(1, '#6b533b');
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

  // Boucle/Linen woven normal map
  ctx.fillStyle = '#8080ff'; // flat normal base
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

export function createStonePaverTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Exterior modern limestone patio pavers
  ctx.fillStyle = '#cdc7be';
  ctx.fillRect(0, 0, 1024, 1024);

  // Micro stone speckles
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const s = Math.random() * 3;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(235, 230, 220, 0.4)' : 'rgba(140, 135, 125, 0.3)';
    ctx.fillRect(x, y, s, s);
  }

  // Paver grid seams (large 600x600 outdoor slabs)
  ctx.strokeStyle = 'rgba(80, 75, 70, 0.5)';
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

  ctx.fillStyle = '#4c6c39';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 8000; i++) {
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

  // Warm ivory Berber wool rug with subtle geometric lozenge lines
  ctx.fillStyle = '#ebe5d8';
  ctx.fillRect(0, 0, 512, 512);

  // Soft pile texture noise
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(200, 190, 175, 0.25)';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }

  // Subtle charcoal diamond lines
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
