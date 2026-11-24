import { test, expect } from '@playwright/test';
import { contentCounts } from './contentCounts';

// Beskrivelsen for søkemotorer, delingsforhåndsvisningen og manifestet skal ha tallene
// fra innholdet i det bygde nettstedet, ikke plassholderne (ARK-06).

const { philosophers, traditions } = contentCounts;

test('Søkemotor- og delingsbeskrivelsen har tallene fra innholdet', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).not.toContain('_COUNT%');
  expect(html).toContain(`Utforsk ${philosophers} filosofer fra ${traditions} globale tradisjoner.`);
  expect(html).toContain(`content="${philosophers} filosofer, ${traditions} tradisjoner,`);
});

test('Manifestet har tallene fra innholdet', async ({ request }) => {
  const res = await request.get('/manifest.webmanifest');
  expect(res.status()).toBe(200);
  const manifest = (await res.json()) as { description: string };
  expect(manifest.description).toContain(`${philosophers} filosofer, ${traditions} tradisjoner`);
});
