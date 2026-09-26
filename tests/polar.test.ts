import { describe, it, expect } from 'vitest';
import {
  polarToCartesian,
  cartesianToPolar,
  getSectorAngles,
  radiusForYear,
  TRADITION_SECTOR_ORDER,
} from '../src/lib/polar';

describe('polar.ts', () => {
  const cx = 400;
  const cy = 400;

  it('polarToCartesian plasserer 0° rett opp (Nord / kl 12)', () => {
    const { x, y } = polarToCartesian(cx, cy, 100, 0);
    expect(x).toBeCloseTo(400, 1);
    expect(y).toBeCloseTo(300, 1);
  });

  it('polarToCartesian plasserer 90° til høyre (Øst / kl 3)', () => {
    const { x, y } = polarToCartesian(cx, cy, 100, 90);
    expect(x).toBeCloseTo(500, 1);
    expect(y).toBeCloseTo(400, 1);
  });

  it('polarToCartesian plasserer 180° rett ned (Sør / kl 6)', () => {
    const { x, y } = polarToCartesian(cx, cy, 100, 180);
    expect(x).toBeCloseTo(400, 1);
    expect(y).toBeCloseTo(500, 1);
  });

  it('polarToCartesian plasserer 270° til venstre (Vest / kl 9)', () => {
    const { x, y } = polarToCartesian(cx, cy, 100, 270);
    expect(x).toBeCloseTo(300, 1);
    expect(y).toBeCloseTo(400, 1);
  });

  it('cartesianToPolar gir nøyaktig samme vinkel og radius tilbake', () => {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    for (const angle of angles) {
      const { x, y } = polarToCartesian(cx, cy, 150, angle);
      const polar = cartesianToPolar(cx, cy, x, y);
      expect(polar.r).toBeCloseTo(150, 1);
      expect(polar.angleDeg).toBeCloseTo(angle, 1);
    }
  });

  it('deler 360 grader i 9 like sektorer på 40 grader', () => {
    expect(TRADITION_SECTOR_ORDER.length).toBe(9);
    for (let i = 0; i < TRADITION_SECTOR_ORDER.length; i++) {
      const tradition = TRADITION_SECTOR_ORDER[i];
      const sector = getSectorAngles(tradition);
      expect(sector.width).toBe(40);
      expect(sector.startAngle).toBe(i * 40);
      expect(sector.endAngle).toBe((i + 1) * 40);
      expect(sector.midAngle).toBe(i * 40 + 20);
    }
  });

  it('radiusForYear øker monotonisk fra eldste år til nyeste år', () => {
    const rAncient = radiusForYear(-500, 'compressed', 50, 350);
    const rMiddle = radiusForYear(1000, 'compressed', 50, 350);
    const rModern = radiusForYear(2000, 'compressed', 50, 350);

    expect(rAncient).toBeGreaterThanOrEqual(50);
    expect(rMiddle).toBeGreaterThan(rAncient);
    expect(rModern).toBeGreaterThan(rMiddle);
    expect(rModern).toBeLessThanOrEqual(350);
  });
});
