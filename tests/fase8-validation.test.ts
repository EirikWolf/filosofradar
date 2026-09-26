import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import { TRADITION_IDS, type Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];

describe('Fase 8 Kvalitetskrav og Innholdsvalidering', () => {
  it('har minst 70 filosofer (aktuelt mål: 70+)', () => {
    expect(philosophers.length).toBeGreaterThanOrEqual(70);
  });

  it('har representasjon fra alle 9 globale tradisjoner', () => {
    const traditionSet = new Set(philosophers.map((p) => p.tradition));
    for (const tid of TRADITION_IDS) {
      expect(traditionSet.has(tid)).toBe(true);
    }
    expect(traditionSet.size).toBe(9);
  });

  it('har minst 10 kvinnelige tenkere', () => {
    const women = philosophers.filter((p) => p.gender === 'kvinne');
    expect(women.length).toBeGreaterThanOrEqual(10);
  });

  it('har minst 5 nordiske filosofer', () => {
    const nordic = philosophers.filter((p) => p.tradition === 'nordic');
    expect(nordic.length).toBeGreaterThanOrEqual(5);
  });

  it('alle filosofer er gjennomgått og merket med reviewed: true', () => {
    const unreviewed = philosophers.filter((p) => !p.reviewed);
    expect(unreviewed).toHaveLength(0);
  });

  it('alle påvirkningslenker er kronologisk gyldige (ingen tidsreiser)', () => {
    const idMap = new Map<string, Philosopher>();
    for (const p of philosophers) {
      idMap.set(p.id, p);
    }

    for (const p of philosophers) {
      const pYear = p.born?.year ?? p.floruit?.from ?? 0;
      for (const inflId of p.influencedBy) {
        const influencer = idMap.get(inflId);
        expect(influencer).toBeDefined();
        if (influencer) {
          const inflYear = influencer.born?.year ?? influencer.floruit?.from ?? 0;
          expect(inflYear).toBeLessThanOrEqual(pYear);
        }
      }
    }
  });

  it('alle filosofer har gyldig Wikidata Q-nummer', () => {
    for (const p of philosophers) {
      expect(p.wikidata).toMatch(/^Q\d+$/);
    }
  });

  it('alle filosofer har nøyaktig 8 temaer med poeng mellom 0 og 5', () => {
    for (const p of philosophers) {
      expect(p.themes).toBeDefined();
      for (const val of Object.values(p.themes)) {
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(5);
      }
    }
  });
});
