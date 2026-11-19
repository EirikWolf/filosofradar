// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import fs from 'node:fs';
import path from 'node:path';
import { cardImage, CARD_IMAGE_WIDTH } from '../src/lib/images';
import { VisualHookCard } from '../src/features/card/VisualHookCard';

// YTE-05: illustrasjonene er 1024–1280 px brede, men vises høyst ca. 460 CSS-px
// brede i kort og galleri. Kortene bruker derfor en 960 px-variant, som dekker
// skjermer opp til DPR 2 på nettbrett og DPR 3 på mobil uten å bli uskarp.

const HOOKS_DIR = path.join(__dirname, '..', 'public', 'images', 'hooks');
const VARIANT_SUFFIX = `-${CARD_IMAGE_WIDTH}w.webp`;

afterEach(() => cleanup());

describe('cardImage', () => {
  it('peker illustrasjoner til 960 px-varianten', () => {
    expect(cardImage('/images/hooks/kant-morderen-ved-doren.webp')).toBe(
      '/images/hooks/kant-morderen-ved-doren-960w.webp',
    );
  });

  it('lar andre bilder være som de er', () => {
    expect(cardImage('/images/portraits/sokrates.webp')).toBe('/images/portraits/sokrates.webp');
  });
});

describe('Bildevarianter i public/images/hooks', () => {
  const originals = fs
    .readdirSync(HOOKS_DIR)
    .filter((f) => f.endsWith('.webp') && !f.endsWith(VARIANT_SUFFIX));

  it('finner illustrasjonene', () => {
    // Vakt mot et tomt filter: et tomt resultat skal ikke gi grønt.
    expect(originals.length).toBeGreaterThanOrEqual(48);
  });

  it('har en mindre 960 px-variant for hver illustrasjon (kjør `npm run images` etter nye bilder)', () => {
    const missing = originals.filter((f) => {
      const variant = path.join(HOOKS_DIR, f.replace(/\.webp$/, VARIANT_SUFFIX));
      return !fs.existsSync(variant) || fs.statSync(variant).size >= fs.statSync(path.join(HOOKS_DIR, f)).size;
    });
    expect(missing).toEqual([]);
  });
});

describe('VisualHookCard', () => {
  it('viser 960 px-varianten', () => {
    const { container } = render(
      <VisualHookCard
        philosopherId="kant"
        philosopherName="Immanuel Kant"
        experiment={{
          title: 'Morderen ved døren',
          description: 'Tankeeksperiment om løgn og plikt.',
          takeaway: 'Plikten til å si sannheten gjelder uansett følger.',
          image: '/images/hooks/kant-morderen-ved-doren.webp',
        }}
      />,
    );
    expect(container.querySelector('img')?.getAttribute('src')).toBe('/images/hooks/kant-morderen-ved-doren-960w.webp');
  });
});
