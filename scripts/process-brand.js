const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const uploadedDir = 'C:/Users/Juan David/.gemini/antigravity/brain/52559815-565c-44bf-91c3-5689204d3879/.user_uploaded';
const fullSignatureSrc = path.join(uploadedDir, 'media_1795542941549_94927b3e.png'); // 1.png (2048x1152, black bg)
const isotypeSrc = path.join(uploadedDir, 'media_1795542941549_368fed04.png'); // 2(2).png (2048x1152, black bg)
const wordmarkSrc = path.join(uploadedDir, 'media_1795542941550_28522f70.png'); // LOGIK.png (2048x591, transparent bg)

/**
 * Extracts a clean transparent PNG from an image with pure black (#000000) background,
 * or crops an existing transparent PNG cleanly to its visible bounding box + padding.
 */
function processAsset(inputPath, outputPath, options = {}) {
  const data = fs.readFileSync(inputPath);
  const png = PNG.sync.read(data);
  const { width, height } = png;

  const removeBlackBg = options.removeBlackBg || false;
  const padding = options.padding !== undefined ? options.padding : 24;
  const makeSquare = options.makeSquare || false;
  const bgFill = options.bgFill || null; // e.g. [0,0,0,255]

  // 1. Convert black background to transparent if requested
  if (removeBlackBg) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = png.data[idx];
        const g = png.data[idx + 1];
        const b = png.data[idx + 2];

        // Calculate brightness / distance from black (0, 0, 0)
        // Note: LOGIK Blue is RGB(7, 95, 255), White is RGB(255, 255, 255), Gray is RGB(180, 180, 180)
        const maxChannel = Math.max(r, g, b);
        if (maxChannel < 12) {
          png.data[idx + 3] = 0;
        } else if (maxChannel < 60) {
          // Smooth anti-aliased edge feathering
          // Recover original color and set proportional alpha
          const alpha = Math.min(255, Math.round(((maxChannel - 12) / 48) * 255));
          const scale = 255 / maxChannel;
          png.data[idx] = Math.min(255, Math.round(r * scale));
          png.data[idx + 1] = Math.min(255, Math.round(g * scale));
          png.data[idx + 2] = Math.min(255, Math.round(b * scale));
          png.data[idx + 3] = alpha;
        }
      }
    }
  }

  // 2. Find visible bounding box
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const a = png.data[idx + 3];
      if (a > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  minX = Math.max(0, minX - padding);
  maxX = Math.min(width - 1, maxX + padding);
  minY = Math.max(0, minY - padding);
  maxY = Math.min(height - 1, maxY + padding);

  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;

  let outW = contentW;
  let outH = contentH;
  if (makeSquare) {
    const side = Math.max(contentW, contentH);
    outW = side;
    outH = side;
  }

  const outPng = new PNG({ width: outW, height: outH });

  // Optional background fill
  if (bgFill) {
    for (let i = 0; i < outPng.data.length; i += 4) {
      outPng.data[i] = bgFill[0];
      outPng.data[i + 1] = bgFill[1];
      outPng.data[i + 2] = bgFill[2];
      outPng.data[i + 3] = bgFill[3];
    }
  }

  const offsetX = Math.floor((outW - contentW) / 2);
  const offsetY = Math.floor((outH - contentH) / 2);

  for (let y = 0; y < contentH; y++) {
    for (let x = 0; x < contentW; x++) {
      const srcIdx = (width * (minY + y) + (minX + x)) << 2;
      const dstIdx = (outW * (offsetY + y) + (offsetX + x)) << 2;

      const sr = png.data[srcIdx];
      const sg = png.data[srcIdx + 1];
      const sb = png.data[srcIdx + 2];
      const sa = png.data[srcIdx + 3];

      if (bgFill) {
        const alpha = sa / 255;
        outPng.data[dstIdx] = Math.round(sr * alpha + bgFill[0] * (1 - alpha));
        outPng.data[dstIdx + 1] = Math.round(sg * alpha + bgFill[1] * (1 - alpha));
        outPng.data[dstIdx + 2] = Math.round(sb * alpha + bgFill[2] * (1 - alpha));
        outPng.data[dstIdx + 3] = 255;
      } else {
        outPng.data[dstIdx] = sr;
        outPng.data[dstIdx + 1] = sg;
        outPng.data[dstIdx + 2] = sb;
        outPng.data[dstIdx + 3] = sa;
      }
    }
  }

  fs.writeFileSync(outputPath, PNG.sync.write(outPng));
  console.log(`Saved ${outputPath} (${outW}x${outH})`);
}

// 1. Copy raw master isotype with black frame for optional framed usage
fs.copyFileSync(isotypeSrc, 'public/brand/isotype-black.png');

// 2. Process Logotipo abreviado (Logik) -> public/brand/wordmark.png & public/brand/logo.png
processAsset(wordmarkSrc, 'public/brand/wordmark.png', { removeBlackBg: false, padding: 16 });
processAsset(wordmarkSrc, 'public/brand/logo.png', { removeBlackBg: false, padding: 16 });

// 3. Process Firma completa (Logik SOFTWARE ENGINEERING LAB) -> public/brand/logo-full.png
processAsset(fullSignatureSrc, 'public/brand/logo-full.png', { removeBlackBg: true, padding: 24 });

// 4. Process Isotipo autónomo (K) -> public/brand/isotype.png, favicon.png, icon.png
processAsset(isotypeSrc, 'public/brand/isotype.png', { removeBlackBg: true, padding: 24, makeSquare: true });
processAsset(isotypeSrc, 'public/favicon.png', { removeBlackBg: false, padding: 48, makeSquare: true, bgFill: [0, 0, 0, 255] });
processAsset(isotypeSrc, 'public/icon.png', { removeBlackBg: false, padding: 48, makeSquare: true, bgFill: [0, 0, 0, 255] });
