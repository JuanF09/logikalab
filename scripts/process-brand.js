const fs = require('fs');
const { PNG } = require('pngjs');

function processImage(inputPath, outputPath, cropOptions = {}) {
  const data = fs.readFileSync(inputPath);
  const png = PNG.sync.read(data);

  const { width, height } = png;
  console.log(`Processing ${inputPath}: ${width}x${height}`);

  // Find bounding box of content (excluding top 15% where "LOGOTIPO"/"ISOTIPO" watermark is)
  const topCut = Math.floor(height * 0.18);
  let minX = width, maxX = 0, minY = height, maxY = 0;

  // Blue background is around R:17, G:84, B:255
  for (let y = topCut; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const r = png.data[idx];
      const g = png.data[idx + 1];
      const b = png.data[idx + 2];

      // Check if it's not the pure blue background
      const isBlueBg = (r < 60 && g < 120 && b > 200);
      if (!isBlueBg) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add padding
  const padding = 20;
  minX = Math.max(0, minX - padding);
  maxX = Math.min(width - 1, maxX + padding);
  minY = Math.max(topCut, minY - padding);
  maxY = Math.min(height - 1, maxY + padding);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  console.log(`Cropped bounds: ${minX}, ${minY} to ${maxX}, ${maxY} (${cropW}x${cropH})`);

  const outputPng = new PNG({ width: cropW, height: cropH });

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = (width * (minY + y) + (minX + x)) << 2;
      const dstIdx = (cropW * y + x) << 2;

      const r = png.data[srcIdx];
      const g = png.data[srcIdx + 1];
      const b = png.data[srcIdx + 2];

      // Detect blue background with smooth alpha feathering
      // Distance from #1154FF (17, 84, 255)
      const dist = Math.sqrt(
        Math.pow(r - 17, 2) + Math.pow(g - 84, 2) + Math.pow(b - 255, 2)
      );

      if (dist < 40) {
        // Pure blue background -> full transparency
        outputPng.data[dstIdx] = 0;
        outputPng.data[dstIdx + 1] = 0;
        outputPng.data[dstIdx + 2] = 0;
        outputPng.data[dstIdx + 3] = 0;
      } else if (dist < 90) {
        // Edge feathering
        const alpha = Math.min(255, Math.max(0, Math.round(((dist - 40) / 50) * 255)));
        outputPng.data[dstIdx] = 255;
        outputPng.data[dstIdx + 1] = 255;
        outputPng.data[dstIdx + 2] = 255;
        outputPng.data[dstIdx + 3] = alpha;
      } else {
        // Foreground element:
        // If it was black text (like 'SOFTWARE ENGINEERING'), in dark mode we convert it to crisp white/light gray
        const isDark = (r < 70 && g < 70 && b < 70);
        if (isDark) {
          outputPng.data[dstIdx] = 217;
          outputPng.data[dstIdx + 1] = 217;
          outputPng.data[dstIdx + 2] = 217;
          outputPng.data[dstIdx + 3] = 255;
        } else {
          // White letter/bracket
          outputPng.data[dstIdx] = 255;
          outputPng.data[dstIdx + 1] = 255;
          outputPng.data[dstIdx + 2] = 255;
          outputPng.data[dstIdx + 3] = 255;
        }
      }
    }
  }

  const buffer = PNG.sync.write(outputPng);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Saved: ${outputPath}`);
}

processImage('BRAND LOGIKA LAB/2.png', 'public/brand/logo.png');
processImage('BRAND LOGIKA LAB/4.png', 'public/brand/logo-tall.png');
processImage('BRAND LOGIKA LAB/5.png', 'public/brand/isotype.png');
processImage('BRAND LOGIKA LAB/6.png', 'public/brand/isotype-clean.png');

// Also create favicon from isotype
const isoData = fs.readFileSync('public/brand/isotype.png');
fs.writeFileSync('public/favicon.png', isoData);
fs.writeFileSync('public/icon.png', isoData);
