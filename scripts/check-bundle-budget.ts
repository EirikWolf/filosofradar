/**
 * Ytelsesbudsjett for første side (global CLAUDE.md: klient-JS første side < 200 kB gzip).
 * Summerer gzip-størrelsen av JS som index.html laster med en gang: inngangsskriptet og
 * forhåndslastede moduler (modulepreload). Stilark og HTML vises, men teller ikke mot
 * budsjettet, fordi regelen gjelder JS. Kjøres etter `vite build`.
 *
 * kB = 1000 byte, samme enhet som Vite skriver ut.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const FIRST_PAGE_JS_BUDGET_KB = 200;
const DIST = path.resolve(import.meta.dirname, '../dist');

const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
const assets = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1]);

const gzipKb = (file: string) => zlib.gzipSync(fs.readFileSync(path.join(DIST, file))).length / 1000;
const row = (kb: number, label: string) => `  ${kb.toFixed(1).padStart(6)} kB  ${label}`;

let jsTotal = 0;
let otherTotal = gzipKb('index.html');
const rows = [row(otherTotal, 'index.html')];
for (const asset of assets) {
  const kb = gzipKb(asset);
  if (asset.endsWith('.js')) jsTotal += kb;
  else otherTotal += kb;
  rows.push(row(kb, asset));
}
rows.push(row(jsTotal, `JS totalt (budsjett ${FIRST_PAGE_JS_BUDGET_KB} kB)`));
rows.push(row(jsTotal + otherTotal, 'alt totalt, inkl. CSS og HTML'));

process.stdout.write(`Første side (gzip):\n${rows.join('\n')}\n`);

if (jsTotal > FIRST_PAGE_JS_BUDGET_KB) {
  process.stderr.write(
    `❌ JS på første side er ${jsTotal.toFixed(1)} kB gzip, over budsjettet på ${FIRST_PAGE_JS_BUDGET_KB} kB.\n`,
  );
  process.exit(1);
}
process.stdout.write('✅ Innenfor budsjett.\n');
