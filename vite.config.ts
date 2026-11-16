import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
