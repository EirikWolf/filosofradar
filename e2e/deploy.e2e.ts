import { test, expect } from '@playwright/test';

// US-006: etter en ny publisering finnes ikke de gamle filene lenger, og Firebase
// Hosting svarer på dem med index.html og status 200 (målt mot produksjon
// 2026-11-24). Testen etterligner det for tidslinjen og sjekker at appen henter seg
// inn igjen i stedet for å vise reservesiden.

test('US-006 En visning åpnes også etter at en ny versjon er publisert', async ({ page }) => {
  await page.route(/gc\.zgo\.at|goatcounter\.com/, (route) =>
    route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }),
  );
  await page.goto('/');
  await expect(page.getByRole('button', { name: /Tidslinjen/ })).toBeVisible();

  // Første forespørsel etter «publiseringen» får HTML, slik Firebase svarer på et
  // filnavn som ikke finnes. Etter ny innlasting finnes filen igjen.
  let staleResponses = 0;
  await page.route(/\/assets\/TimelineView-v2-[\w-]+\.js$/, async (route) => {
    if (staleResponses === 0) {
      staleResponses++;
      await route.fulfill({
        status: 200,
        contentType: 'text/html; charset=utf-8',
        body: '<!doctype html><html><head></head><body><div id="root"></div></body></html>',
      });
      return;
    }
    await route.continue();
  });

  await page.getByRole('button', { name: /Tidslinjen/ }).click();

  await expect(page.getByText('Ærlig lineær')).toBeVisible();
  await expect(page.getByText('Kosmisk forstyrrelse oppsto')).toHaveCount(0);
  expect(staleResponses).toBe(1);
  expect(new URL(page.url()).searchParams.get('v')).toBe('timeline');
});
