/**
 * Generate app icon assets for Claro.
 *
 * Run: node scripts/generate-icons.js
 * Requires: npm install sharp (dev dependency, not bundled in app)
 *
 * Creates:
 *   assets/icon.png (1024×1024)
 *   assets/adaptive-icon.png (1024×1024 foreground)
 *   assets/splash-icon.png (200×200)
 *   assets/favicon.png (48×48)
 */
const sharp = require('sharp');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');
const BG = '#1B4965';   // Deep trust blue
const FG = '#F6EFE2';   // Warm sand

function iconSvg(size) {
  const docW = size * 0.38;
  const docH = size * 0.50;
  const docX = (size - docW) / 2;
  const docY = size * 0.18;
  const fold = size * 0.10;
  const lensR = size * 0.14;
  const lensX = size * 0.62;
  const lensY = size * 0.58;
  const handleLen = size * 0.10;
  const lineY1 = docY + docH * 0.35;
  const lineY2 = docY + docH * 0.50;
  const lineY3 = docY + docH * 0.65;
  const lineX1 = docX + docW * 0.15;
  const lineX2 = docX + docW * 0.75;
  const strokeW = Math.max(2, size * 0.025);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${BG}"/>
  <!-- Document -->
  <path d="M${docX},${docY + fold} L${docX},${docY + docH} L${docX + docW},${docY + docH} L${docX + docW},${docY} L${docX + docW - fold},${docY} L${docX},${docY + fold} Z"
        fill="none" stroke="${FG}" stroke-width="${strokeW}" stroke-linejoin="round"/>
  <path d="M${docX},${docY + fold} L${docX + docW - fold},${docY + fold} L${docX + docW - fold},${docY}"
        fill="none" stroke="${FG}" stroke-width="${strokeW * 0.7}" stroke-linejoin="round"/>
  <!-- Text lines -->
  <line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY1}" stroke="${FG}" stroke-width="${strokeW}" stroke-linecap="round" opacity="0.7"/>
  <line x1="${lineX1}" y1="${lineY2}" x2="${lineX2 - docW * 0.15}" y2="${lineY2}" stroke="${FG}" stroke-width="${strokeW}" stroke-linecap="round" opacity="0.7"/>
  <line x1="${lineX1}" y1="${lineY3}" x2="${lineX2}" y2="${lineY3}" stroke="${FG}" stroke-width="${strokeW}" stroke-linecap="round" opacity="0.7"/>
  <!-- Magnifying glass -->
  <circle cx="${lensX}" cy="${lensY}" r="${lensR}" fill="none" stroke="${FG}" stroke-width="${strokeW * 1.3}"/>
  <line x1="${lensX + lensR * 0.7}" y1="${lensY + lensR * 0.7}" x2="${lensX + lensR * 0.7 + handleLen}" y2="${lensY + lensR * 0.7 + handleLen}" stroke="${FG}" stroke-width="${strokeW * 1.5}" stroke-linecap="round"/>
</svg>`;
}

function splashSvg() {
  // Full-screen branded splash: logo + "Claro" wordmark + tagline
  const w = 1284;
  const h = 2778;
  const iconSize = 160;
  const iconX = (w - iconSize) / 2;
  const iconY = h * 0.33;
  const fold = iconSize * 0.10;
  const lensR = iconSize * 0.14;
  const lensX = iconX + iconSize * 0.62;
  const lensY = iconY + iconSize * 0.58;
  const handleLen = iconSize * 0.10;
  const docW = iconSize * 0.38;
  const docH = iconSize * 0.50;
  const docX = iconX + (iconSize - docW) / 2;
  const docY = iconY + iconSize * 0.18;
  const lineY1 = docY + docH * 0.35;
  const lineY2 = docY + docH * 0.50;
  const lineY3 = docY + docH * 0.65;
  const lineX1 = docX + docW * 0.15;
  const lineX2 = docX + docW * 0.75;
  const strokeW = 4;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${BG}"/>
  <!-- Document icon -->
  <path d="M${docX},${docY + fold} L${docX},${docY + docH} L${docX + docW},${docY + docH} L${docX + docW},${docY} L${docX + docW - fold},${docY} L${docX},${docY + fold} Z"
        fill="none" stroke="${FG}" stroke-width="${strokeW}" stroke-linejoin="round"/>
  <path d="M${docX},${docY + fold} L${docX + docW - fold},${docY + fold} L${docX + docW - fold},${docY}"
        fill="none" stroke="${FG}" stroke-width="${strokeW * 0.7}" stroke-linejoin="round"/>
  <line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY1}" stroke="${FG}" stroke-width="${strokeW}" stroke-linecap="round" opacity="0.7"/>
  <line x1="${lineX1}" y1="${lineY2}" x2="${lineX2 - docW * 0.15}" y2="${lineY2}" stroke="${FG}" stroke-width="${strokeW}" stroke-linecap="round" opacity="0.7"/>
  <line x1="${lineX1}" y1="${lineY3}" x2="${lineX2}" y2="${lineY3}" stroke="${FG}" stroke-width="${strokeW}" stroke-linecap="round" opacity="0.7"/>
  <circle cx="${lensX}" cy="${lensY}" r="${lensR}" fill="none" stroke="${FG}" stroke-width="${strokeW * 1.3}"/>
  <line x1="${lensX + lensR * 0.7}" y1="${lensY + lensR * 0.7}" x2="${lensX + lensR * 0.7 + handleLen}" y2="${lensY + lensR * 0.7 + handleLen}" stroke="${FG}" stroke-width="${strokeW * 1.5}" stroke-linecap="round"/>
  <!-- Wordmark -->
  <text x="${w / 2}" y="${iconY + iconSize + 80}" fill="${FG}" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="800" text-anchor="middle" letter-spacing="4">Claro</text>
  <!-- Tagline -->
  <text x="${w / 2}" y="${iconY + iconSize + 130}" fill="${FG}" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400" text-anchor="middle" opacity="0.7">Understand your documents</text>
</svg>`;
}

async function main() {
  // Main icon (1024×1024)
  await sharp(Buffer.from(iconSvg(1024)))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(ASSETS, 'icon.png'));

  // Adaptive icon foreground (1024×1024, no rounded corners for adaptive)
  const adaptiveSvg = iconSvg(1024).replace(/rx="[^"]*"/, 'rx="0"');
  await sharp(Buffer.from(adaptiveSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(ASSETS, 'adaptive-icon.png'));

  // Splash screen (1284×2778 — iPhone 14 Pro Max native res, scales well for all devices)
  await sharp(Buffer.from(splashSvg()))
    .resize(1284, 2778)
    .png()
    .toFile(path.join(ASSETS, 'splash.png'));

  // Splash icon fallback (200×200)
  await sharp(Buffer.from(iconSvg(200)))
    .resize(200, 200)
    .png()
    .toFile(path.join(ASSETS, 'splash-icon.png'));

  // Favicon (48×48)
  await sharp(Buffer.from(iconSvg(48)))
    .resize(48, 48)
    .png()
    .toFile(path.join(ASSETS, 'favicon.png'));

  console.log('Icons generated in assets/');
}

main().catch(console.error);
