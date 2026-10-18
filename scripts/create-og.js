const fs = require('fs');
const { PNG } = require('pngjs');

// Simple, elegant 1200x630 OG image generation
const width = 1200;
const height = 630;
const og = new PNG({ width, height });

// Fill with pitch black #000000 and subtle dark gradient
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    // Radial glow in the center top: #1154FF
    const dx = x - width / 2;
    const dy = y - height * 0.45;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const glow = Math.max(0, 1 - dist / 550);
    
    // Grid lines every 60px
    const isGrid = (x % 60 === 0 || y % 60 === 0) ? 1 : 0;
    
    const r = Math.round(17 * glow * 0.4 + (isGrid ? 8 : 0));
    const g = Math.round(84 * glow * 0.4 + (isGrid ? 12 : 0));
    const b = Math.round(255 * glow * 0.45 + (isGrid ? 25 : 0));
    
    og.data[idx] = r;
    og.data[idx + 1] = g;
    og.data[idx + 2] = b;
    og.data[idx + 3] = 255;
  }
}

// Overlay the logo in the center
const logoData = fs.readFileSync('public/brand/logo.png');
const logoPng = PNG.sync.read(logoData);

// Scale logo to fit nicely in the center (around 700px width)
const targetW = 740;
const scale = targetW / logoPng.width;
const targetH = Math.round(logoPng.height * scale);

const startX = Math.round((width - targetW) / 2);
const startY = Math.round((height - targetH) / 2);

for (let y = 0; y < targetH; y++) {
  const srcY = Math.min(logoPng.height - 1, Math.floor(y / scale));
  for (let x = 0; x < targetW; x++) {
    const srcX = Math.min(logoPng.width - 1, Math.floor(x / scale));
    const srcIdx = (logoPng.width * srcY + srcX) << 2;
    const alpha = logoPng.data[srcIdx + 3] / 255;

    if (alpha > 0.05) {
      const dstIdx = (width * (startY + y) + (startX + x)) << 2;
      const lr = logoPng.data[srcIdx];
      const lg = logoPng.data[srcIdx + 1];
      const lb = logoPng.data[srcIdx + 2];

      og.data[dstIdx] = Math.round(lr * alpha + og.data[dstIdx] * (1 - alpha));
      og.data[dstIdx + 1] = Math.round(lg * alpha + og.data[dstIdx + 1] * (1 - alpha));
      og.data[dstIdx + 2] = Math.round(lb * alpha + og.data[dstIdx + 2] * (1 - alpha));
    }
  }
}

fs.writeFileSync('public/images/og-image.png', PNG.sync.write(og));
console.log('OG Image created: 1200x630');
