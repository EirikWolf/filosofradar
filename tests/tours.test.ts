import { describe, it, expect } from 'vitest';
import { TOURS } from '../src/features/tours/tourData';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];
const philosopherIdSet = new Set(philosophers.map((p) => p.id));

describe('Guidede turer (Tours)', () => {
  it('har minst 5 kuraterte turer', () => {
    expect(TOURS.length).toBeGreaterThanOrEqual(5);
  });

  it('hver tur har gyldige metadata og minst 3 stopp', () => {
    for (const tour of TOURS) {
      expect(tour.id).toBeTruthy();
      expect(tour.title).toBeTruthy();
      expect(tour.tagline).toBeTruthy();
      expect(tour.era).toBeTruthy();
      expect(tour.durationMinutes).toBeGreaterThan(0);
      expect(tour.icon).toBeTruthy();
      expect(tour.description).toBeTruthy();
      expect(tour.stops.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('samtlige stopp peker til eksisterende filosofer i datasettet', () => {
    for (const tour of TOURS) {
      for (const stop of tour.stops) {
        expect(
          philosopherIdSet.has(stop.philosopherId),
          `Filosofen "${stop.philosopherId}" i turen "${tour.title}" finnes ikke i datasettet!`
        ).toBe(true);

        expect(stop.narrativeTitle).toBeTruthy();
        expect(stop.narrativeText.length).toBeGreaterThan(20);
        expect(stop.keyQuestion).toBeTruthy();
      }
    }
  });

  it('inneholder sentrale turer som Akse-alderen, Historiens modige kvinner og Det nordiske sinnelaget', () => {
    const ids = TOURS.map((t) => t.id);
    expect(ids).toContain('akse-alderen');
    expect(ids).toContain('modige-kvinner');
    expect(ids).toContain('nordisk-sinnelag');
    expect(ids).toContain('fornuftens-revolusjon');
    expect(ids).toContain('livskunst-indre-ro');
  });

  it('har unike tur-IDer', () => {
    const ids = TOURS.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
