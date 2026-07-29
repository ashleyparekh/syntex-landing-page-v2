/**
 * Generate globe favicon / apple-touch icons matching the live globe look:
 * navy sphere #0a1628, soft right highlight #1a3a6e, faint country lines.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function globeSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.46;
  const hx = cx + r * 0.28;
  const hy = cy - r * 0.05;
  const stroke = Math.max(0.4, size * 0.012);
  const faint = size >= 64 ? 0.45 : 0.55;

  const lines =
    size >= 32
      ? `
      <g fill="none" stroke="#d0d0d0" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" opacity="${faint}">
        <path d="M ${cx - r * 0.55} ${cy - r * 0.35}
                 C ${cx - r * 0.5} ${cy - r * 0.55}, ${cx - r * 0.15} ${cy - r * 0.5}, ${cx - r * 0.05} ${cy - r * 0.28}
                 C ${cx + r * 0.05} ${cy - r * 0.1}, ${cx - r * 0.05} ${cy + r * 0.05}, ${cx - r * 0.2} ${cy + r * 0.15}
                 C ${cx - r * 0.4} ${cy + r * 0.28}, ${cx - r * 0.55} ${cy + r * 0.1}, ${cx - r * 0.55} ${cy - r * 0.05}
                 Z" />
        <path d="M ${cx - r * 0.35} ${cy + r * 0.2}
                 C ${cx - r * 0.3} ${cy + r * 0.45}, ${cx - r * 0.15} ${cy + r * 0.55}, ${cx - r * 0.22} ${cy + r * 0.7}
                 C ${cx - r * 0.4} ${cy + r * 0.65}, ${cx - r * 0.48} ${cy + r * 0.4}, ${cx - r * 0.35} ${cy + r * 0.2}
                 Z" />
        <path d="M ${cx + r * 0.15} ${cy - r * 0.25}
                 C ${cx + r * 0.35} ${cy - r * 0.35}, ${cx + r * 0.5} ${cy - r * 0.15}, ${cx + r * 0.42} ${cy + r * 0.05}
                 C ${cx + r * 0.3} ${cy + r * 0.2}, ${cx + r * 0.15} ${cy + r * 0.1}, ${cx + r * 0.12} ${cy - r * 0.05}
                 Z" />
        <path d="M ${cx - r * 0.7} ${cy - r * 0.05} Q ${cx - r * 0.75} ${cy + r * 0.15} ${cx - r * 0.55} ${cy + r * 0.05}" />
      </g>`
      : `
      <g fill="none" stroke="#d0d0d0" stroke-width="${stroke}" opacity="0.5">
        <path d="M ${cx - r * 0.4} ${cy - r * 0.25} Q ${cx - r * 0.1} ${cy - r * 0.4} ${cx - r * 0.05} ${cy}
                 Q ${cx - r * 0.2} ${cy + r * 0.35} ${cx - r * 0.45} ${cy + r * 0.15}" />
        <path d="M ${cx + r * 0.15} ${cy - r * 0.2} Q ${cx + r * 0.4} ${cy} ${cx + r * 0.2} ${cy + r * 0.15}" />
      </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="ocean" cx="${(hx / size) * 100}%" cy="${(hy / size) * 100}%" r="65%">
      <stop offset="0%" stop-color="#1a3a6e"/>
      <stop offset="55%" stop-color="#0f2444"/>
      <stop offset="100%" stop-color="#0a1628"/>
    </radialGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#ocean)"/>
  ${lines}
</svg>`;
}

async function writePng(filePath, size) {
  const svg = Buffer.from(globeSvg(size));
  await sharp(svg).png().toFile(filePath);
  console.log("wrote", filePath, size);
}

const outDir = path.join(__dirname, "..", "app");
const publicDir = path.join(__dirname, "..", "public");
fs.mkdirSync(publicDir, { recursive: true });

await writePng(path.join(outDir, "icon.png"), 32);
await writePng(path.join(outDir, "apple-icon.png"), 180);
await writePng(path.join(publicDir, "favicon-16x16.png"), 16);
await writePng(path.join(publicDir, "favicon-32x32.png"), 32);
await writePng(path.join(publicDir, "apple-touch-icon.png"), 180);
await sharp(Buffer.from(globeSvg(32)))
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, "favicon.ico"));

console.log("done");
