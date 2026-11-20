import fs from 'node:fs';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

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
  plugins: [react()],
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
