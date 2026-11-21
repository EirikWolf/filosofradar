import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { dayOfYear, getDailyPhilosopherIndex } from '../src/lib/daily';

// TST-09: «Dagens filosof» byttet kl. 01 om sommeren. Feilen kommer bare til syne i
// en tidssone med sommertid, så testen kjører i Europe/Oslo også når CI går i UTC.
const originalTz = process.env.TZ;
beforeAll(() => {
  process.env.TZ = 'Europe/Oslo';
});
afterAll(() => {
  process.env.TZ = originalTz;
});

describe('dayOfYear', () => {
  it('gir 1 for 1. januar og 32 for 1. februar (vintertid)', () => {
    expect(dayOfYear(new Date(2026, 0, 1, 0, 30))).toBe(1);
    expect(dayOfYear(new Date(2026, 1, 1, 0, 30))).toBe(32);
  });

  it('bytter dag ved midnatt også om sommeren', () => {
    expect(dayOfYear(new Date(2026, 5, 30, 23, 59))).toBe(181);
    expect(dayOfYear(new Date(2026, 6, 1, 0, 30))).toBe(182);
    expect(dayOfYear(new Date(2026, 6, 1, 1, 30))).toBe(182);
  });

  it('gir 365 for 31. desember i et vanlig år og 366 i et skuddår', () => {
    expect(dayOfYear(new Date(2026, 11, 31, 23, 59))).toBe(365);
    expect(dayOfYear(new Date(2028, 11, 31, 23, 59))).toBe(366);
  });

  it('teller 29. februar i et skuddår', () => {
    expect(dayOfYear(new Date(2028, 1, 29, 12))).toBe(60);
    expect(dayOfYear(new Date(2028, 2, 1, 0, 30))).toBe(61);
  });

  it('er det samme hele døgnet, også rundt overgangen til sommertid', () => {
    // Sommertid begynner 29. mars 2026 kl. 02.00.
    const hours = [0, 1, 3, 12, 23].map((h) => dayOfYear(new Date(2026, 2, 29, h, 30)));
    expect(new Set(hours)).toEqual(new Set([88]));
  });
});

describe('getDailyPhilosopherIndex', () => {
  it('velger samme filosof hele dagen og en ny ved midnatt', () => {
    const evening = getDailyPhilosopherIndex(new Date(2026, 5, 30, 23, 59), 80);
    const night = getDailyPhilosopherIndex(new Date(2026, 6, 1, 0, 30), 80);
    const morning = getDailyPhilosopherIndex(new Date(2026, 6, 1, 9, 0), 80);
    expect(night).toBe(morning);
    expect(night).not.toBe(evening);
    expect(morning).toBe(182 % 80);
  });

  it('går rundt når det er færre filosofer enn dager', () => {
    expect(getDailyPhilosopherIndex(new Date(2026, 0, 1), 1)).toBe(0);
    expect(getDailyPhilosopherIndex(new Date(2026, 3, 10), 80)).toBe(100 % 80);
  });

  it('kaster når det ikke er noen filosofer', () => {
    expect(() => getDailyPhilosopherIndex(new Date(2026, 0, 1), 0)).toThrow(RangeError);
  });
});
