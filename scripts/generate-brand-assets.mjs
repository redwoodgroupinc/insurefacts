// Regenerates the PNG icons, favicon.ico and the default Open Graph image from
// public/favicon.svg. You only need this if you change the logo.
//
// It is not part of the normal build. To run it:
//   npm install --no-save playwright sharp
//   node scripts/generate-brand-assets.mjs
// (Playwright needs a Chromium browser: `npx playwright install chromium`.)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { chromium } from 'playwright';

const root = process.cwd();
const pub = (...p) => join(root, 'public', ...p);
const svg = readFileSync(pub('favicon.svg'));

// Square PNG icons. The maskable icon gets padding and a solid background so
// Android's circular crop doesn't cut into the shield.
const sizes = { 'icon-192.png': 192, 'icon-512.png': 512, 'apple-touch-icon.png': 180 };
for (const [name, size] of Object.entries(sizes)) {
  const inner = Math.round(size * 0.8);
  const icon = await sharp(svg, { density: 1200 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toFile(pub('icons', name));
}
{
  const size = 512;
  const inner = Math.round(size * 0.6);
  const icon = await sharp(svg, { density: 1200 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#0b1f44' } })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toFile(pub('icons', 'icon-maskable-512.png'));
}

// favicon.ico containing 16, 32 and 48px PNG images (PNG-in-ICO is supported by all current browsers).
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((s) => sharp(svg, { density: 1200 }).resize(s, s).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(icoSizes[i], entry);
  header.writeUInt8(icoSizes[i], entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
writeFileSync(pub('favicon.ico'), Buffer.concat([header, ...pngs]));

// Open Graph image (1200×630), rendered in Chromium with the self-hosted Inter font.
const font = pathToFileURL(
  join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
).href;
const flag = (code) =>
  `data:image/svg+xml;base64,${readFileSync(pub('flags', `${code}.svg`)).toString('base64')}`;
const html = `<!doctype html><html><head><style>
@font-face { font-family: Inter; src: url(${font}) format('woff2'); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; font-family: Inter, sans-serif; color: #fff;
  background: radial-gradient(circle at 85% 15%, rgba(45,212,191,.28), transparent 45%),
              radial-gradient(circle at 10% 110%, rgba(45,212,191,.18), transparent 40%), #0b1f44;
  padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 28px; }
.brand svg { width: 120px; height: 120px; }
.word { font-size: 96px; font-weight: 750; letter-spacing: -0.03em; }
.word span { color: #5eead4; }
h1 { font-size: 58px; font-weight: 650; letter-spacing: -0.02em; line-height: 1.15; margin-top: 8px; }
p { font-size: 30px; color: #c6d2e3; margin-top: 18px; }
.row { display: flex; align-items: center; justify-content: space-between; font-size: 28px; color: #c6d2e3; }
.flags { display: flex; gap: 14px; }
.flags img { width: 52px; height: 39px; border-radius: 4px; }
.domain { font-weight: 600; color: #fff; }
</style></head><body>
<div class="brand">${svg.toString()}<div class="word">Insure<span>Facts</span></div></div>
<div><h1>Insurance, explained with facts</h1>
<p>Free, sourced guides for the US, UK, Canada and Australia</p></div>
<div class="row"><div class="flags">${['us', 'gb', 'ca', 'au'].map((c) => `<img src="${flag(c)}" alt="">`).join('')}</div>
<div class="domain">insurefacts.net</div></div>
</body></html>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: 'png' });
await browser.close();
await sharp(shot)
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(pub('og-default.png'));

console.log('Brand assets written to public/.');
