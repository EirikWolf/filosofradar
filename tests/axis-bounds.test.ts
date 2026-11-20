import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { computeRadarLayout } from '../src/lib/layout';
import { getStartYear } from '../src/lib/years';
import {
  AXIS_EARLIEST_YEAR,
  AXIS_END_YEAR,
  AXIS_START_YEAR,
  createCompressedScale,
  createLinearScale,
} from '../src/lib/timeScale';

// TST-04 / B-019: aksen starter i 650 f.Kr., men Ptahhotep (ca. 2400 f.Kr.) og Gargi
// (ca. 700 f.Kr.) er eldre. Før ble begge klemt inn til 650 f.Kr. uten at noe sa fra.
// Nå har den komprimerte skalaen et kort forsegment, og den lineære merker dem.

const philosophers = philosophersData as Philosopher[];
const byId = (id: string) => {
  const p = philosophers.find((x) => x.id === id);
  if (!p) throw new Error(`Fant ikke ${id}`);
  return p;
};
const WIDTH = 1000;

describe('Aksens grenser', () => {
  it('har ingen filosof født før aksens tidligste år', () => {
    // Kommer det en eldre filosof, må AXIS_EARLIEST_YEAR flyttes, ellers klemmes hen.
    const older = philosophers.filter((p) => getStartYear(p) < AXIS_EARLIEST_YEAR).map((p) => p.id);
    expect(older).toEqual([]);
    expect(Math.min(...philosophers.map(getStartYear))).toBe(AXIS_EARLIEST_YEAR);
  });

  it('har ingen filosof født etter aksens siste år', () => {
    expect(philosophers.filter((p) => getStartYear(p) > AXIS_END_YEAR).map((p) => p.id)).toEqual([]);
  });
});

describe('Komprimert skala med forsegment', () => {
  const scale = createCompressedScale(WIDTH);

  it('starter ved den eldste filosofen og gir tiden før 650 f.Kr. 5 % av bredden', () => {
    expect(scale.minYear).toBe(AXIS_EARLIEST_YEAR);
    expect(scale.toPixel(AXIS_EARLIEST_YEAR)).toBe(0);
    expect(scale.toPixel(AXIS_START_YEAR)).toBeCloseTo(WIDTH * 0.05, 6);
    expect(scale.toPixel(500)).toBeCloseTo(WIDTH * 0.35, 6);
    expect(scale.toPixel(1500)).toBeCloseTo(WIDTH * 0.55, 6);
    expect(scale.toPixel(AXIS_END_YEAR)).toBe(WIDTH);
  });

  it('skiller Ptahhotep og Gargi fra hverandre og fra 650 f.Kr.', () => {
    const ptahhotep = scale.toPixel(getStartYear(byId('ptahhotep')));
    const gargi = scale.toPixel(getStartYear(byId('gargi')));
    const start = scale.toPixel(AXIS_START_YEAR);
    expect(ptahhotep).toBeLessThan(gargi);
    expect(gargi).toBeLessThan(start);
  });

  it('kan regne piksler tilbake til år i forsegmentet', () => {
    expect(Math.abs(scale.toYear(scale.toPixel(-2000)) - -2000)).toBeLessThanOrEqual(20);
  });

  it('legger et år før aksen innerst, aldri ytterst', () => {
    expect(scale.toPixel(-5000)).toBe(0);
    expect(createLinearScale(WIDTH).toPixel(-5000)).toBe(0);
  });

  it('lar en skala som starter i 650 f.Kr. være som før, uten forsegment', () => {
    const old = createCompressedScale(WIDTH, AXIS_START_YEAR, AXIS_END_YEAR);
    expect(old.toPixel(AXIS_START_YEAR)).toBe(0);
    expect(old.toPixel(500)).toBeCloseTo(WIDTH * 0.35, 6);
  });
});

describe('Radaren', () => {
  const options = { cx: 400, cy: 400, minRadius: 45, maxRadius: 365, minDistance: 14.5 };
  const radiusOf = (points: ReturnType<typeof computeRadarLayout>, id: string) => {
    const pt = points.find((p) => p.id === id);
    if (!pt) throw new Error(id);
    return pt.radius;
  };

  it('setter Ptahhotep innenfor Gargi og Gargi innenfor Sokrates i komprimert skala', () => {
    const points = computeRadarLayout(philosophers, { ...options, scaleMode: 'compressed' });
    expect(radiusOf(points, 'ptahhotep')).toBeLessThan(radiusOf(points, 'gargi'));
    expect(radiusOf(points, 'gargi')).toBeLessThan(radiusOf(points, 'sokrates'));
    expect(points.filter((p) => p.beforeAxis)).toEqual([]);
  });

  it('merker bare Ptahhotep og Gargi som eldre enn aksen i lineær skala', () => {
    const points = computeRadarLayout(philosophers, { ...options, scaleMode: 'linear' });
    expect(points.filter((p) => p.beforeAxis).map((p) => p.id).sort()).toEqual(['gargi', 'ptahhotep']);
  });
});
