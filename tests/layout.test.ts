import { describe, it, expect } from 'vitest';
import { computeRadarLayout } from '../src/lib/layout';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];

describe('layout.ts', () => {
  const options = {
    cx: 400,
    cy: 400,
    minRadius: 50,
    maxRadius: 360,
    scaleMode: 'compressed' as const,
    minDistance: 15,
  };

  it('beregner et punkt for hver filosof i datasettet', () => {
    const points = computeRadarLayout(philosophers, options);
    expect(points.length).toBe(philosophers.length);
  });

  it('alle punkter er innenfor radarens yttergrenser', () => {
    const points = computeRadarLayout(philosophers, options);
    for (const pt of points) {
      expect(pt.x).toBeGreaterThan(0);
      expect(pt.x).toBeLessThan(800);
      expect(pt.y).toBeGreaterThan(0);
      expect(pt.y).toBeLessThan(800);

      const dx = pt.x - options.cx;
      const dy = pt.y - options.cy;
      const r = Math.sqrt(dx * dx + dy * dy);
      expect(r).toBeGreaterThanOrEqual(options.minRadius - 1);
      expect(r).toBeLessThanOrEqual(options.maxRadius + 1);
    }
  });

  it('beregningen er 100 % deterministisk ved gjentatte kjøringer', () => {
    const run1 = computeRadarLayout(philosophers, options);
    const run2 = computeRadarLayout(philosophers, options);

    expect(run1.length).toBe(run2.length);
    for (let i = 0; i < run1.length; i++) {
      expect(run1[i].id).toBe(run2[i].id);
      expect(run1[i].x).toBe(run2[i].x);
      expect(run1[i].y).toBe(run2[i].y);
      expect(run1[i].angleDeg).toBe(run2[i].angleDeg);
    }
  });

  it('ingen filosofer i samme tradisjon krasjer oppå hverandre (minDistance)', () => {
    const points = computeRadarLayout(philosophers, { ...options, minDistance: 14 });
    // Sjekk alle par innenfor samme tradisjon
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        if (p1.tradition === p2.tradition) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          expect(dist).toBeGreaterThanOrEqual(13.5);
        }
      }
    }
  });
});
