import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { getStartYear, getEndYear, isLiving, checkOverlap } from '../src/lib/years';

// Mistanke 2 i helhetsrevisjonen 2026-11-16: nålevende filosofer (uten dødsår og
// uten floruit) fikk et påfunnet dødsår (+60 eller +65 år) som var ulikt i ulike
// visninger. Tidslinjen viste Angela Davis som død i 2009.

const philosophers = philosophersData as Philosopher[];
const byId = (id: string) => philosophers.find((p) => p.id === id) as Philosopher;
const CURRENT_YEAR = 2026;

describe('getStartYear', () => {
  it('bruker fødselsår når det finnes', () => {
    expect(getStartYear({ born: { year: -470 } })).toBe(-470);
  });

  it('bruker starten på floruit når fødselsår mangler', () => {
    expect(getStartYear({ floruit: { from: -600, to: -550 } })).toBe(-600);
  });

  it('kaster i stedet for å gjette år 0 når begge mangler (intet år 0, B-003)', () => {
    expect(() => getStartYear({})).toThrow();
  });
});

describe('getEndYear', () => {
  it('bruker dødsår når det finnes', () => {
    expect(getEndYear({ born: { year: -470 }, died: { year: -399 } }, CURRENT_YEAR)).toBe(-399);
  });

  it('bruker slutten på floruit når dødsår mangler', () => {
    expect(getEndYear({ floruit: { from: -600, to: -550 } }, CURRENT_YEAR)).toBe(-550);
  });

  it('lar nålevende leve til inneværende år, ikke et påfunnet dødsår', () => {
    expect(getEndYear({ born: { year: 1944 } }, CURRENT_YEAR)).toBe(CURRENT_YEAR);
  });
});

describe('nålevende filosofer i innholdet', () => {
  const living = philosophers.filter(isLiving).map((p) => p.id).sort();

  it('er nøyaktig de tre uten dødsår og uten floruit', () => {
    expect(living).toEqual(['achille-mbembe', 'angela-davis', 'judith-butler']);
  });

  it('Angela Davis lever fortsatt på tidslinjen og levde samtidig med Judith Butler i dag', () => {
    const davis = byId('angela-davis');
    const butler = byId('judith-butler');
    expect(getEndYear(davis, CURRENT_YEAR)).toBe(CURRENT_YEAR);
    expect(
      checkOverlap(
        { start: getStartYear(davis), end: getEndYear(davis, CURRENT_YEAR) },
        { start: getStartYear(butler), end: getEndYear(butler, CURRENT_YEAR) },
      ),
    ).toBe(true);
  });
});
