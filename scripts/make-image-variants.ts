/**
 * Lager 960 px-varianter av illustrasjonene i public/images/hooks (YTE-05).
 *
 * Kort og galleri viser illustrasjonene høyst ca. 460 CSS-px brede, så de trenger
 * ikke originalene på 1024–1280 px. Se CARD_IMAGE_WIDTH i src/lib/images.ts.
 *
 * Kjør etter at nye illustrasjoner er lagt til: `npm run images`.
 * Eksisterende varianter hoppes over, med mindre originalen er nyere.
 * `tests/hook-images.test.tsx` feiler hvis en variant mangler.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { CARD_IMAGE_WIDTH } from '../src/lib/images';

const HOOKS_DIR = path.join(import.meta.dirname, '..', 'public', 'images', 'hooks');
/** WebP-kvalitet for variantene. Kontrollert visuelt mot originalene ved DPR 2,6. */
const WEBP_QUALITY = 75;
const VARIANT_SUFFIX = `-${CARD_IMAGE_WIDTH}w.webp`;

const originals = fs
  .readdirSync(HOOKS_DIR)
  .filter((f) => f.endsWith('.webp') && !f.endsWith(VARIANT_SUFFIX))
  .sort();

let made = 0;
let skipped = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for (const file of originals) {
  const source = path.join(HOOKS_DIR, file);
  const target = path.join(HOOKS_DIR, file.replace(/\.webp$/, VARIANT_SUFFIX));
  bytesBefore += fs.statSync(source).size;

  if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= fs.statSync(source).mtimeMs) {
    skipped++;
    bytesAfter += fs.statSync(target).size;
    continue;
  }

  await sharp(source)
    .resize({ width: CARD_IMAGE_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(target);
  made++;
  bytesAfter += fs.statSync(target).size;
}

const kb = (n: number) => Math.round(n / 1024).toLocaleString('nb-NO');
process.stdout.write(
  `${originals.length} illustrasjoner: ${made} varianter laget, ${skipped} fantes fra før. ` +
    `${kb(bytesBefore)} kB → ${kb(bytesAfter)} kB.\n`,
);
