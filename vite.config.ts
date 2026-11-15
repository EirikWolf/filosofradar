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
        manualChunks: {
          vendor: ['react', 'react-dom'],
          d3: ['d3-force'],
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
