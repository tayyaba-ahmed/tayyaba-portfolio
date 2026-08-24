import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logo = readFileSync(join(root, "public", "logo-ta.png"));

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="18%" cy="22%" r="42%">
      <stop offset="0%" stop-color="#7aa2f7" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#7aa2f7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="82%" cy="78%" r="38%">
      <stop offset="0%" stop-color="#7aa2f7" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#7aa2f7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7aa2f7"/>
      <stop offset="100%" stop-color="#7aa2f7" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0d0f12"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect x="88" y="88" width="72" height="1" fill="url(#line)"/>
  <text x="88" y="132" fill="#7aa2f7" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="6">04 — PORTFOLIO</text>
  <text x="88" y="228" fill="#f1f2f4" font-family="Segoe UI, Arial, sans-serif" font-size="78" font-weight="700" letter-spacing="-2">Tayyaba Ahmed</text>
  <text x="88" y="292" fill="#7aa2f7" font-family="Georgia, Times New Roman, serif" font-size="34" font-style="italic">— software developer</text>
  <text x="88" y="372" fill="#9b9ea6" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="400">I create unconventional yet functional</text>
  <text x="88" y="412" fill="#9b9ea6" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="400">interfaces for the web.</text>
  <rect x="88" y="468" width="220" height="52" rx="26" fill="#f1f2f4"/>
  <text x="118" y="501" fill="#0d0f12" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="3">VIEW PORTFOLIO</text>
  <rect x="326" y="468" width="196" height="52" rx="26" fill="none" stroke="#f1f2f4" stroke-opacity="0.18"/>
  <text x="356" y="501" fill="#f1f2f4" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="3">DOWNLOAD CV</text>
</svg>`;

const base = await sharp(Buffer.from(svg)).png().toBuffer();
const logoBuf = await sharp(logo).resize(120, 120, { fit: "contain" }).png().toBuffer();

const out = join(root, "public", "og-share.jpg");
await sharp(base)
  .composite([{ input: logoBuf, top: 88, left: 980 }])
  .jpeg({ quality: 88 })
  .toFile(out);

writeFileSync(join(root, "public", "og.jpg"), await sharp(out).jpeg({ quality: 88 }).toBuffer());
console.log(`Wrote ${out} and refreshed public/og.jpg`);
