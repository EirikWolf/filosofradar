import fs from 'node:fs';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fillContentCounts, type SiteCounts } from './src/lib/siteCounts.ts';

// Beskrivelsen for søkemotorer og deling i index.html og manifestet sier hvor mange
// filosofer og tradisjoner appen har. Tallene telles av scripts/build-content.ts og
// fylles inn her, så de ikke glir når innholdet vokser (ARK-06). Manifestmalen ligger i
// src/site/, ikke i public/, fordi Vite kopierer public/ urørt.
const MANIFEST = 'manifest.webmanifest';

function readSiteCounts(): SiteCounts {
  const file = new URL('./src/generated/contentCounts.json', import.meta.url);
  if (!fs.existsSync(file)) {
    throw new Error('src/generated/contentCounts.json mangler. Kjør `npx tsx scripts/build-content.ts` først.');
  }
  return JSON.parse(fs.readFileSync(file, 'utf8')) as SiteCounts;
}

function contentCountsInMetadata(): Plugin {
  const manifest = () =>
    fillContentCounts(fs.readFileSync(new URL(`./src/site/${MANIFEST}`, import.meta.url), 'utf8'), readSiteCounts());
  return {
    name: 'content-counts-in-metadata',
    transformIndexHtml: (html) => fillContentCounts(html, readSiteCounts()),
    configureServer(server) {
      server.middlewares.use(`/${MANIFEST}`, (_req, res) => {
        res.setHeader('Content-Type', 'application/manifest+json');
        res.end(manifest());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: MANIFEST, source: manifest() });
    },
  };
}

// `vite preview` sender de samme headerne som Firebase Hosting gir alle sider, med CSP.
// Da ser røyktesten (e2e/) en CSP som stopper egne skript før produksjonen gjør det.
type FirebaseHeaders = { hosting: { headers: Array<{ source: string; headers: Array<{ key: string; value: string }> }> } };
function firebaseHeadersForAllPages(): Record<string, string> {
  const config = JSON.parse(fs.readFileSync(new URL('./firebase.json', import.meta.url), 'utf8')) as FirebaseHeaders;
  const all = config.hosting.headers.find((h) => h.source === '**');
  return Object.fromEntries((all?.headers ?? []).map((h) => [h.key, h.value]));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), contentCountsInMetadata()],
  preview: {
    headers: firebaseHeadersForAllPages(),
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-v2-[hash].js',
        chunkFileNames: 'assets/[name]-v2-[hash].js',
        assetFileNames: 'assets/[name]-v2-[hash].[ext]',
        // Vite 8 (Rolldown) tar bare funksjonsformen av manualChunks.
        // Samme oppdeling som før: react og d3-force i hver sin chunk.
        manualChunks(id) {
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'vendor';
          if (/[\\/]node_modules[\\/]d3-[^\\/]+[\\/]/.test(id)) return 'd3';
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'node',
    pool: 'forks',
  },
});
