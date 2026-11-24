const fs = require('fs');
const { PNG } = require('pngjs');

// Official 1200x630 OG image with new LOGIK LAB identity (#000000 & #075FFF)
const width = 1200;
const height = 630;
const og = new PNG({ width, height });

// Fill with pure pitch black #000000 and subtle #075FFF radial spotlight
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const dx = x - width / 2;
    const dy = y - height * 0.5;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const glow = Math.max(0, 1 - dist / 620);

    // Subtle 64px modular grid (8px base multiple)
    const isGrid = (x % 64 === 0 || y % 64 === 0) ? 1 : 0;

    // #075FFF = RGB(7, 95, 255)
    const r = Math.round(7 * glow * 0.25 + (isGrid ? 4 : 0));
    const g = Math.round(95 * glow * 0.25 + (isGrid ? 10 : 0));
    const b = Math.round(255 * glow * 0.28 + (isGrid ? 24 : 0));

    og.data[idx] = r;
    og.data[idx + 1] = g;
    og.data[idx + 2] = b;
    og.data[idx + 3] = 255;
  }
}

// Overlay the full signature logo (Firma Principal) in the center
const logoData = fs.readFileSync('public/brand/logo-full.png');
const logoPng = PNG.sync.read(logoData);

const targetW = 760;
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
console.log('OG Image created with new LOGIK LAB identity: 1200x630');
