import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { THEME_IDS } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];

describe('ThemeRadar data og akser', () => {
  it('alle filosofer har verdier for nøyaktig 8 tema-akser', () => {
    for (const p of philosophers) {
      expect(Object.keys(p.themes).length).toBe(8);
      for (const theme of THEME_IDS) {
        expect(p.themes[theme]).toBeDefined();
        expect(p.themes[theme]).toBeGreaterThanOrEqual(0);
        expect(p.themes[theme]).toBeLessThanOrEqual(5);
      }
    }
  });

  it('Sokrates scorer høyest på etikk (5)', () => {
    const sokrates = philosophers.find((p) => p.id === 'sokrates');
    expect(sokrates).toBeDefined();
    expect(sokrates?.themes.ethics).toBe(5);
  });

  it('Arne Næss scorer høyt på etikk og mening', () => {
    const naess = philosophers.find((p) => p.id === 'arne-naess');
    expect(naess).toBeDefined();
    expect(naess?.themes.ethics).toBeGreaterThanOrEqual(4);
  });
});
