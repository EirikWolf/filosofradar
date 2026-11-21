import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { YearSchema, FloruitSchema } from '../src/schemas/philosopher';
import {
  calculateLifespan,
  checkOverlap,
  formatLifeSpan,
  formatYear,
  getEndYear,
  getStartYear,
} from '../src/lib/years';
import { AXIS_START_YEAR, createCompressedScale, createLinearScale } from '../src/lib/timeScale';
import { computeRadarLayout } from '../src/lib/layout';

// TST-06: kanttilfeller i src/lib som mutasjonsprøven i revisjonen 2026-11-17 viste
// at ingen test fanget (M03, M04, M06, M09, M11 og flere uten nummer).

const philosophers = philosophersData as Philosopher[];
const byId = (id: string) => {
  const p = philosophers.find((x) => x.id === id);
  if (!p) throw new Error(id);
  return p;
};

describe('År 0 (B-003)', () => {
  it('formatYear kaster for år 0 (M03)', () => {
    expect(() => formatYear(0)).toThrow(RangeError);
    expect(formatYear(-1)).toBe('1 f.Kr.');
    expect(formatYear(1)).toBe('1');
  });

  it('skjemaet avviser år 0 i fødsel, død og floruit', () => {
    expect(YearSchema.safeParse({ year: 0 }).success).toBe(false);
    expect(YearSchema.safeParse({ year: -1 }).success).toBe(true);
    expect(FloruitSchema.safeParse({ from: -10, to: 0 }).success).toBe(false);
    expect(FloruitSchema.safeParse({ from: 0, to: 10 }).success).toBe(false);
  });

  it('har ikke noe merke på år 0 i noen av skalaene (M09)', () => {
    for (const scale of [createLinearScale(1000), createCompressedScale(1000)]) {
      expect(scale.getTicks().map((t) => t.year)).not.toContain(0);
    }
  });
});

describe('formatLifeSpan', () => {
  it('viser nålevende som «f. 1944», ikke med tom dødsdato (M04)', () => {
    expect(formatLifeSpan(byId('angela-davis'))).toBe('f. 1944');
    expect(formatLifeSpan({ born: { year: 1944, approx: true } })).toBe('f. ca. 1944');
  });

  it('merker usikkert dødsår med «ca.»', () => {
    expect(formatLifeSpan({ born: { year: -470 }, died: { year: -399, approx: true } })).toBe(
      '470 f.Kr. – ca. 399 f.Kr.',
    );
  });

  it('sier fra når verken fødsel eller floruit er kjent', () => {
    expect(formatLifeSpan({})).toBe('ukjent levetid');
  });
});

describe('Start- og sluttår', () => {
  it('bruker fødselsåret når både fødsel og floruit finnes', () => {
    expect(getStartYear({ born: { year: -500 }, floruit: { from: -480, to: -450 } })).toBe(-500);
  });

  it('bruker slutten på floruit som sluttår når dødsår mangler', () => {
    expect(getEndYear({ floruit: { from: -480, to: -450 } }, 2026)).toBe(-450);
  });

  it('gir 0 år for en som døde samme år', () => {
    expect(calculateLifespan(-1, -1)).toBe(0);
    expect(calculateLifespan(1, 1)).toBe(0);
  });

  it('regner to som møtes i samme år som samtidige', () => {
    expect(checkOverlap({ start: 1, end: 5 }, { start: 5, end: 9 })).toBe(true);
    expect(checkOverlap({ start: 1, end: 4 }, { start: 5, end: 9 })).toBe(false);
  });
});

describe('Knekkpunktene i den komprimerte skalaen (M06)', () => {
  it('gir 35 % til antikken og 20 % til middelalderen når skalaen starter i 650 f.Kr.', () => {
    const scale = createCompressedScale(1000, AXIS_START_YEAR);
    expect(scale.toPixel(500)).toBeCloseTo(350, 6);
    expect(scale.toPixel(1500)).toBeCloseTo(550, 6);
  });
});

describe('Radaroppsett med fasit (M11)', () => {
  // Fasiten er dagens oppsett for de tre greske filosofene alene, regnet ut
  // 2026-11-21. Determinismetesten i layout.test sammenligner bare to kjøringer
  // med hverandre; denne fanger at sorteringen i sektoren snus eller endres.
  it('plasserer Sokrates, Platon og Aristoteles på kjente punkter', () => {
    const trio = philosophers.filter((p) => ['sokrates', 'platon', 'aristoteles'].includes(p.id));
    const points = computeRadarLayout(trio, {
      cx: 400,
      cy: 400,
      minRadius: 45,
      maxRadius: 365,
      minDistance: 16,
      scaleMode: 'compressed',
    });
    const at = Object.fromEntries(points.map((p) => [p.id, [+p.x.toFixed(1), +p.y.toFixed(1)]]));
    expect(at).toEqual({
      sokrates: [448.2, 460.1],
      platon: [455.7, 445.8],
      aristoteles: [445.8, 477.1],
    });
  });
});
