import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { getSectorAngles } from '../src/lib/polar';
import { galaxyPosition, GALAXY_ARM_LENGTH, GALAXY_CORE_RADIUS, GALAXY_MAX_HEIGHT } from '../src/lib/galaxy';

const philosophers = philosophersData as Philosopher[];
const byId = (id: string): Philosopher => {
  const p = philosophers.find((x) => x.id === id);
  if (!p) throw new Error(`Fant ikke ${id}`);
  return p;
};
const distance = (p: Philosopher) => {
  const { x, z } = galaxyPosition(p);
  return Math.hypot(x, z);
};

// Formelen lå inne i Galaxy3DView, og testen regnet med en kopi som allerede
// hadde glidd fra originalen (TST-01).
describe('Galaksens 3D-plassering', () => {
  it('gir endelige koordinater innenfor galaksen for alle filosofer', () => {
    for (const p of philosophers) {
      const { x, y, z } = galaxyPosition(p);
      expect([x, y, z].every(Number.isFinite), p.id).toBe(true);
      expect(distance(p)).toBeGreaterThanOrEqual(GALAXY_CORE_RADIUS - 1e-9);
      expect(distance(p)).toBeLessThanOrEqual(GALAXY_CORE_RADIUS + GALAXY_ARM_LENGTH + 1e-9);
      expect(Math.abs(y)).toBeLessThanOrEqual(GALAXY_MAX_HEIGHT);
    }
  });

  it('legger eldre filosofer nærmere kjernen enn nyere', () => {
    expect(distance(byId('sokrates'))).toBeLessThan(distance(byId('kant')));
    expect(distance(byId('kant'))).toBeLessThan(distance(byId('angela-davis')));
  });

  it('bruker floruit når fødselsåret mangler', () => {
    // Laget for testen: ingen i dagens datasett har bare floruit, men skjemaet tillater det.
    const p = { ...byId('platon'), born: undefined, floruit: { from: -400, to: -350 } } as Philosopher;
    expect(galaxyPosition(p).birthYear).toBe(-400);
  });

  it('peker ut fra sentrum i tradisjonens retning for de eldste', () => {
    // Før 800 f.Kr. er det ingen vridning, så vinkelen er sektorens midtvinkel.
    const old = { ...byId('sokrates'), born: { year: -900 } } as Philosopher;
    const { x, z } = galaxyPosition(old);
    const angle = (Math.atan2(z, x) * 180) / Math.PI;
    const expected = getSectorAngles(old.tradition).midAngle;
    expect(((angle - expected + 540) % 360) - 180).toBeCloseTo(0, 6);
    expect(Math.hypot(x, z)).toBeCloseTo(GALAXY_CORE_RADIUS, 6);
  });

  it('gir samme plassering hver gang', () => {
    expect(galaxyPosition(byId('platon'))).toEqual(galaxyPosition(byId('platon')));
  });
});
