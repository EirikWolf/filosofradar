import { describe, it, expect } from 'vitest';
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];
const philosopherIdSet = new Set(philosophers.map((p) => p.id));

describe('Dypdykk: Historisk kontekst & Hovedverker', () => {
  it('har dypdykk for minst 20 sentrale filosofer', () => {
    const keys = Object.keys(PHILOSOPHER_DEEP_DIVES);
    expect(keys.length).toBeGreaterThanOrEqual(20);
  });

  it('samtlige filosofer i PHILOSOPHER_DEEP_DIVES finnes i datasettet', () => {
    for (const id of Object.keys(PHILOSOPHER_DEEP_DIVES)) {
      expect(
        philosopherIdSet.has(id),
        `Filosofen "${id}" i deepDiveData finnes ikke i philosophers.json!`
      ).toBe(true);
    }
  });

  it('hvert dypdykk har grundig historisk kontekst, minst ett hovedverk og ettertidskritikk', () => {
    for (const [id, dive] of Object.entries(PHILOSOPHER_DEEP_DIVES)) {
      expect(dive.philosopherId).toBe(id);
      expect(dive.historicalContext.length).toBeGreaterThan(40);
      expect(dive.majorWorks.length).toBeGreaterThanOrEqual(1);

      for (const work of dive.majorWorks) {
        expect(work.title).toBeTruthy();
        expect(work.description.length).toBeGreaterThan(15);
      }

      expect(dive.receptionAndCritique.length).toBeGreaterThan(40);

      if (dive.thoughtExperiments) {
        for (const exp of dive.thoughtExperiments) {
          expect(exp.title).toBeTruthy();
          expect(exp.description.length).toBeGreaterThan(15);
          expect(exp.takeaway.length).toBeGreaterThan(10);
        }
      }
    }
  });

  it('dekker de største klassiske tenkerne med tankeeksperimenter', () => {
    const sokrates = PHILOSOPHER_DEEP_DIVES['sokrates'];
    expect(sokrates).toBeDefined();
    expect(sokrates.thoughtExperiments?.some((t) => t.title.includes('Maieutikk'))).toBe(true);

    const platon = PHILOSOPHER_DEEP_DIVES['platon'];
    expect(platon).toBeDefined();
    expect(platon.thoughtExperiments?.some((t) => t.title.includes('Hulelignelsen'))).toBe(true);

    const descartes = PHILOSOPHER_DEEP_DIVES['descartes'];
    expect(descartes).toBeDefined();
    expect(descartes.thoughtExperiments?.some((t) => t.title.includes('demonen'))).toBe(true);

    const hume = PHILOSOPHER_DEEP_DIVES['hume'];
    expect(hume).toBeDefined();
    expect(hume.thoughtExperiments?.some((t) => t.title.includes('Biljardkulene'))).toBe(true);

    const kant = PHILOSOPHER_DEEP_DIVES['kant'];
    expect(kant).toBeDefined();
    expect(kant.majorWorks.some((w) => w.title.includes('Kritikk av den rene fornuft'))).toBe(true);
  });
});
