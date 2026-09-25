import { describe, it, expect } from 'vitest';
import {
  formatYear,
  formatLifeSpan,
  calculateLifespan,
  checkOverlap,
} from '../src/lib/years';

describe('src/lib/years.ts – Historisk tidsregning og formatering', () => {
  describe('formatYear()', () => {
    it('formaterer år f.Kr. med negativt fortegn', () => {
      expect(formatYear(-470)).toBe('470 f.Kr.');
      expect(formatYear(-1)).toBe('1 f.Kr.');
    });

    it('formaterer år e.Kr. med positivt fortegn', () => {
      expect(formatYear(1724)).toBe('1724');
      expect(formatYear(2026)).toBe('2026');
    });

    it('støtter ca. for usikre årstall', () => {
      expect(formatYear(-470, true)).toBe('ca. 470 f.Kr.');
      expect(formatYear(360, true)).toBe('ca. 360');
    });
  });

  describe('formatLifeSpan()', () => {
    it('formaterer levetid med fødsel og død', () => {
      expect(
        formatLifeSpan({
          born: { year: -470, approx: true },
          died: { year: -399, approx: false },
        }),
      ).toBe('ca. 470 f.Kr. – 399 f.Kr.');

      expect(
        formatLifeSpan({
          born: { year: 1724, approx: false },
          died: { year: 1804, approx: false },
        }),
      ).toBe('1724 – 1804');
    });

    it('håndterer floruit (virkeperiode)', () => {
      expect(
        formatLifeSpan({
          floruit: { from: -500, to: -450 },
        }),
      ).toBe('virket ca. 500 f.Kr. – 450 f.Kr.');
    });
  });

  describe('calculateLifespan() – Ingen år 0 overgang', () => {
    it('beregner levetid f.Kr.', () => {
      // Sokrates: -470 til -399
      expect(calculateLifespan(-470, -399)).toBe(71);
    });

    it('beregner levetid e.Kr.', () => {
      // Kant: 1724 til 1804
      expect(calculateLifespan(1724, 1804)).toBe(80);
    });

    it('trekker fra 1 når levetiden krysser år 0 (intet år 0)', () => {
      // Fra 1 f.Kr. (-1) til 1 e.Kr. (1) er nøyaktig 1 år, IKKE 2 år
      expect(calculateLifespan(-1, 1)).toBe(1);

      // Fra 10 f.Kr. (-10) til 10 e.Kr. (10) er 19 år (10 - (-10) - 1)
      expect(calculateLifespan(-10, 10)).toBe(19);
    });

    it('kaster feil hvis år 0 oppgis', () => {
      expect(() => calculateLifespan(0, 100)).toThrow('År 0 eksisterer ikke');
      expect(() => calculateLifespan(-100, 0)).toThrow('År 0 eksisterer ikke');
    });

    it('kaster feil hvis dødsår er før fødselsår', () => {
      expect(() => calculateLifespan(1900, 1800)).toThrow('Dødsår (1800) kan ikke være før fødselsår (1900)');
    });
  });

  describe('checkOverlap() – Hvem levde samtidig?', () => {
    it('bekrefter at Sokrates og Platon levde samtidig', () => {
      // Sokrates: -470 til -399, Platon: -427 til -347
      expect(checkOverlap({ start: -470, end: -399 }, { start: -427, end: -347 })).toBe(true);
    });

    it('bekrefter at Buddha og Konfucius levde omtrent samtidig', () => {
      // Buddha: -563 til -483, Konfucius: -551 til -479
      expect(checkOverlap({ start: -563, end: -483 }, { start: -551, end: -479 })).toBe(true);
    });

    it('bekrefter at Sokrates og Descartes IKKE levde samtidig', () => {
      expect(checkOverlap({ start: -470, end: -399 }, { start: 1596, end: 1650 })).toBe(false);
    });
  });
});
