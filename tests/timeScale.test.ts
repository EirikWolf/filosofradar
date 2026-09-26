import { describe, it, expect } from 'vitest';
import { createLinearScale, createCompressedScale } from '../src/lib/timeScale';

describe('src/lib/timeScale.ts – Lineær og komprimert tidsskala', () => {
  const width = 1000;

  describe('createLinearScale()', () => {
    const scale = createLinearScale(width, -650, 2025);

    it('plasserer startår på piksel 0 og sluttår på bredde', () => {
      expect(scale.toPixel(-650)).toBe(0);
      expect(scale.toPixel(2025)).toBe(width);
    });

    it('plasserer år monotont økende fra venstre mot høyre', () => {
      const pSokrates = scale.toPixel(-470);
      const pKant = scale.toPixel(1724);
      const pNaess = scale.toPixel(1912);

      expect(pSokrates).toBeLessThan(pKant);
      expect(pKant).toBeLessThan(pNaess);
    });

    it('kan konvertere piksler tilbake til årstall', () => {
      expect(scale.toYear(0)).toBe(-650);
      expect(scale.toYear(width)).toBe(2025);
      const year = 1724;
      const px = scale.toPixel(year);
      expect(Math.abs(scale.toYear(px) - year)).toBeLessThanOrEqual(1);
    });

    it('genererer gyldige århundre-merker', () => {
      const ticks = scale.getTicks();
      expect(ticks.length).toBeGreaterThan(10);
      expect(ticks[0].year).toBe(-600);
      expect(ticks.some((t) => t.year === 2000)).toBe(true);
    });
  });

  describe('createCompressedScale()', () => {
    const scale = createCompressedScale(width, -650, 2025);

    it('plasserer startår på 0 og sluttår på bredde', () => {
      expect(scale.toPixel(-650)).toBe(0);
      expect(scale.toPixel(2025)).toBe(width);
    });

    it('bevarer kronologisk rekkefølge', () => {
      const p1 = scale.toPixel(-500);
      const p2 = scale.toPixel(500);
      const p3 = scale.toPixel(1500);
      const p4 = scale.toPixel(1900);

      expect(p1).toBeLessThan(p2);
      expect(p2).toBeLessThan(p3);
      expect(p3).toBeLessThan(p4);
    });

    it('gir nyere tid (1500-2025) mer plass enn i lineær skala', () => {
      const linear = createLinearScale(width, -650, 2025);
      const compressed = createCompressedScale(width, -650, 2025);

      const linearModernSpan = linear.toPixel(2025) - linear.toPixel(1500);
      const compModernSpan = compressed.toPixel(2025) - compressed.toPixel(1500);

      // Komprimert skala skal allokere mer fysisk plass til nyere tid
      expect(compModernSpan).toBeGreaterThan(linearModernSpan);
    });

    it('kan konvertere piksler tilbake til årstall nøyaktig', () => {
      const year = 1844; // Nietzsche
      const px = scale.toPixel(year);
      expect(Math.abs(scale.toYear(px) - year)).toBeLessThanOrEqual(2);
    });
  });
});
