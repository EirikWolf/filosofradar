import { test as base, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Røyktest av det bygde nettstedet (B-018, TST-03). Hver test dekker én brukerhistorie
// i docs/user-stories/. Den fanger det jsdom ikke ser: at bunten laster under CSP,
// at kodesplittingen henter dypdykket, at rolig modus faktisk stopper animasjonene,
// og tilgjengelighetsfeil axe-core kan finne.

const PHILOSOPHER_COUNT = 80;
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

type Fixtures = { browserErrors: string[] };

const test = base.extend<Fixtures>({
  // Samler feil fra konsollen og ubehandlede unntak. GoatCounter besvares lokalt,
  // så testene aldri sender noe ut og ikke avhenger av nettet.
  // Parameteren heter ikke «use», fordi React-lintregelen da tar den for en hook.
  browserErrors: async ({ page }, provide) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));
    await page.route(/gc\.zgo\.at|goatcounter\.com/, (route) =>
      route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }),
    );
    await provide(errors);
  },
});

const stars = (page: Page) => page.locator('svg g[role="button"]');

// Funn som er vurdert og godtatt. Hvert unntak gjelder én regel på ett element.
const ACCEPTED_AXE_FINDINGS: Array<{ rule: string; target: string; reason: string }> = [
  {
    rule: 'label-content-name-mismatch',
    target: 'button[aria-label="Om observatoriet og kilder"]',
    // ℹ (U+2139) er en bokstav i Unicode, så axe leser den skjulte ikonteksten som
    // synlig tekst «ℹ Om». Den synlige etiketten «Om» står først i navnet, så
    // talestyring virker. Bytter man ikonet, forsvinner funnet (målt 2026-11-20).
    reason: 'ℹ-ikonet regnes som bokstav av axe',
  },
];

async function seriousAxeViolations(page: Page): Promise<string[]> {
  const result = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  return result.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .flatMap((v) =>
      v.nodes
        .filter(
          (n) => !ACCEPTED_AXE_FINDINGS.some((a) => a.rule === v.id && n.target.join(' ') === a.target),
        )
        .map((n) => `${v.id} (${v.impact}): ${n.target.join(' ')}: ${v.help}`),
    );
}

test('US-001 Forsiden viser radaren med alle filosofene', async ({ page, browserErrors }) => {
  await page.goto('/');
  await expect(stars(page)).toHaveCount(PHILOSOPHER_COUNT);
  expect(browserErrors).toEqual([]);
});

test('US-002 En delt lenke åpner filosofkortet med dypdykket', async ({ page, browserErrors }) => {
  const deepDiveChunk = page.waitForRequest(/\/assets\/DeepDiveSection-[^/]+\.js$/);
  await page.goto('/?f=sokrates');

  const card = page.getByRole('dialog', { name: 'Filosofkort for Sokrates' });
  await expect(card).toBeVisible();
  await deepDiveChunk;
  await expect(card.getByRole('button', { name: /Se idéen på 45 sek/ }).first()).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('US-003 Radaren og filosofkortet kan brukes med tastatur', async ({ page, browserErrors }) => {
  await page.goto('/');
  await expect(stars(page)).toHaveCount(PHILOSOPHER_COUNT);

  // Tab til første stjerne. Taket hindrer en evig løkke om stjernene ikke kan nås.
  const focusedStar = page.locator('svg g[role="button"]:focus');
  for (let i = 0; i < 60 && (await focusedStar.count()) === 0; i++) {
    await page.keyboard.press('Tab');
  }
  await expect(focusedStar).toHaveAttribute('aria-label', /^Ptahhotep \(/);

  await page.keyboard.press('Enter');
  const openCard = page.getByRole('button', { name: /Åpne filosofkort/ });
  await expect(openCard).toBeVisible();

  await openCard.focus();
  await page.keyboard.press('Enter');
  const card = page.getByRole('dialog', { name: 'Filosofkort for Ptahhotep' });
  await expect(card).toBeVisible();
  await expect(card.locator(':focus')).toHaveCount(1);

  await page.keyboard.press('Escape');
  await expect(card).toBeHidden();
  await expect(openCard).toBeFocused();
  expect(browserErrors).toEqual([]);
});

test.describe('i rolig modus', () => {
  test.use({ reducedMotion: 'reduce' });

  test('US-004 Tidsmaskinen virker i rolig modus', async ({ page, browserErrors }) => {
    await page.goto('/');
    await expect(stars(page)).toHaveCount(PHILOSOPHER_COUNT);

    // index.css korter ned alle animasjoner til 0,01 ms. Det kan bare måles i en nettleser.
    const durations = await page.evaluate(() =>
      [...document.querySelectorAll('*')]
        .map((el) => getComputedStyle(el))
        .filter((style) => style.animationName !== 'none')
        .flatMap((style) => style.animationDuration.split(',').map((d) => parseFloat(d))),
    );
    expect(durations.length).toBeGreaterThan(0);
    expect(Math.max(...durations)).toBeLessThanOrEqual(0.001);

    // Tidsmaskinen hopper til 650 f.Kr. og spiller av med en gang den slås på.
    await page.getByRole('button', { name: /Aktiver Tidsmaskin/ }).click();
    await page.getByRole('button', { name: '4×' }).click();
    await expect(page.getByTitle('Pause')).toBeVisible();
    const slider = page.getByRole('slider');
    const start = Number(await slider.inputValue());

    await expect.poll(async () => Number(await slider.inputValue())).toBeGreaterThan(start);
    // Ufødte stjerner har opasitet 0,04. Sokrates (f. 470 f.Kr.) fødes etter ca. 3 s på 4×.
    const sokrates = page.locator('svg g[role="button"][aria-label^="Sokrates ("]');
    await expect(sokrates).not.toHaveAttribute('opacity', '0.04', { timeout: 10_000 });
    expect(browserErrors).toEqual([]);
  });
});

test('US-005 Ingen alvorlige feil i automatisk tilgjengelighetssjekk', async ({ page }) => {
  await page.goto('/');
  await expect(stars(page)).toHaveCount(PHILOSOPHER_COUNT);
  expect(await seriousAxeViolations(page), 'forsiden').toEqual([]);

  await page.goto('/?f=sokrates');
  await expect(page.getByRole('dialog', { name: 'Filosofkort for Sokrates' })).toBeVisible();
  expect(await seriousAxeViolations(page), 'filosofkortet').toEqual([]);
});
