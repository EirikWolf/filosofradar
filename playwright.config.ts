import { defineConfig, devices } from '@playwright/test';

// Røyktest av det bygde nettstedet (B-018). Kjøres mot `vite preview` av dist/,
// som sender de samme sikkerhetsheaderne som Firebase Hosting (se vite.config.ts).
// Bygg først: `npm run build`, deretter `npm run e2e`.
const PORT = 4173;

export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Ingen nye forsøk: en røyktest som bare er grønn av og til, skal synes.
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
