import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { bornBetween, historicalYear, skipYearZero } from '../src/lib/timeMachine';
import { lifespanInYears } from '../src/lib/years';

const philosophers = philosophersData as Philosopher[];
const byId = (id: string) => {
  const p = philosophers.find((x) => x.id === id);
  if (!p) throw new Error(id);
  return p;
};
const points = [
  { id: 'a', birthYear: 1723 },
  { id: 'kant', birthYear: 1724 },
  { id: 'b', birthYear: 1725 },
];

describe('bornBetween (TST-07)', () => {
  it('tar med fødsler i (fra, til]', () => {
    expect(bornBetween(points, 1723, 1724).map((p) => p.id)).toEqual(['kant']);
    expect(bornBetween(points, 1722.5, 1725).map((p) => p.id)).toEqual(['a', 'kant', 'b']);
  });

  it('føder hver filosof én gang når tiden går ett år av gangen', () => {
    const born = [1722, 1723, 1724, 1725, 1726].flatMap((year, i, years) =>
      i === 0 ? [] : bornBetween(points, years[i - 1], year).map((p) => p.id),
    );
    expect(born).toEqual(['a', 'kant', 'b']);
  });

  it('føder ingen når tiden står stille eller går bakover', () => {
    expect(bornBetween(points, 1724, 1724)).toEqual([]);
    expect(bornBetween(points, 1726, 1722)).toEqual([]);
  });
});

describe('År 0 i tidsmaskinen (TST-08)', () => {
  it('viser aldri år 0', () => {
    expect(historicalYear(0)).toBe(1);
    expect(historicalYear(-0.4)).toBe(1);
    expect(historicalYear(0.4)).toBe(1);
    expect(historicalYear(-0.6)).toBe(-1);
    expect(historicalYear(-430)).toBe(-430);
    expect(historicalYear(1724.4)).toBe(1724);
  });

  it('hopper over 0 i den retningen glideren går', () => {
    expect(skipYearZero(0, 1)).toBe(-1);
    expect(skipYearZero(0, -1)).toBe(1);
    expect(skipYearZero(0, 5)).toBe(-1);
    expect(skipYearZero(0, -5)).toBe(1);
    expect(skipYearZero(-1, 1)).toBe(-1);
    expect(skipYearZero(1800, 0)).toBe(1800);
  });
});

describe('lifespanInYears (TST-08)', () => {
  it('teller ikke år 0 for Seneca (4 f.Kr.–65)', () => {
    const seneca = byId('seneca');
    expect(seneca.born?.year).toBe(-4);
    expect(seneca.died?.year).toBe(65);
    expect(lifespanInYears(seneca, 2026)).toBe(68);
  });

  it('regner alder så langt for nålevende', () => {
    expect(lifespanInYears(byId('angela-davis'), 2026)).toBe(2026 - 1944);
  });

  it('gir ingen alder når fødselsåret er ukjent', () => {
    const p = { ...byId('platon'), born: undefined, floruit: { from: -400, to: -350 } } as Philosopher;
    expect(lifespanInYears(p, 2026)).toBeNull();
  });
});
