import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { matchesSearch, normalizeQuery, rankSearchMatches, SEARCH_DROPDOWN_LIMIT } from '../src/lib/search';

const philosophers = philosophersData as Philosopher[];
const byId = (id: string): Philosopher => {
  const p = philosophers.find((x) => x.id === id);
  if (!p) throw new Error(`Fant ikke ${id}`);
  return p;
};
const ids = (list: Philosopher[]) => list.map((p) => p.id);

// Søkerangeringen lå tidligere inne i RadarView, og testen sjekket en kopi av den (TST-01).
describe('Hurtigsøket på radaren', () => {
  it('finner Sokrates øverst når man søker på navnet hans', () => {
    expect(rankSearchMatches(philosophers, 'sokrates')[0].id).toBe('sokrates');
  });

  it('setter navn som begynner med søket foran eldre filosofer som bare nevner det', () => {
    // Gargi er eldst og har «ar» inne i navnet, men tre andre begynner med det.
    const result = ids(rankSearchMatches(philosophers, 'ar', 50));
    expect(result.slice(0, 3)).toEqual(['aristoteles', 'schopenhauer', 'arne-naess']);
    expect(result).toContain('gargi');
  });

  it('setter eksakt navn foran navn som bare begynner med søket', () => {
    // Laget for testen: «Kant» er eldst, men «Immanuel Kant» er ikke eksakt treff.
    const kant = { ...byId('kant'), id: 'kant-eksakt', name: 'Kant' };
    const kantianer = { ...byId('platon'), id: 'kantianer', name: 'Kantianeren' };
    const result = ids(rankSearchMatches([kantianer, byId('kant'), kant], 'kant'));
    expect(result).toEqual(['kant-eksakt', 'kantianer', 'kant']);
  });

  it('sorterer treff på lik linje etter når filosofen levde', () => {
    const result = rankSearchMatches(philosophers, 'platon', 50);
    expect(result[0].id).toBe('platon');
    const rest = result.slice(1).map((p) => p.born?.year ?? p.floruit?.from ?? 0);
    expect(rest).toEqual([...rest].sort((a, b) => a - b));
    expect(rest.length).toBeGreaterThan(1);
  });

  it(`viser høyst ${SEARCH_DROPDOWN_LIMIT} treff`, () => {
    expect(rankSearchMatches(philosophers, 'e').length).toBe(SEARCH_DROPDOWN_LIMIT);
  });

  it('gir ingen treff for tomt søk eller bare mellomrom', () => {
    expect(rankSearchMatches(philosophers, '')).toEqual([]);
    expect(rankSearchMatches(philosophers, '   ')).toEqual([]);
  });

  it('bryr seg ikke om store bokstaver og mellomrom i endene', () => {
    expect(rankSearchMatches(philosophers, '  SoKrAtEs ')[0].id).toBe('sokrates');
  });

  it('finner æ, ø og å i navn', () => {
    expect(rankSearchMatches(philosophers, 'næss')[0].id).toBe('arne-naess');
    expect(rankSearchMatches(philosophers, 'søren')[0].id).toBe('kierkegaard');
  });
});

describe('matchesSearch', () => {
  it('finner Platon på en idé, ikke bare på navnet', () => {
    expect(matchesSearch(byId('platon'), normalizeQuery('Hulelignelsen'))).toBe(true);
  });

  it('finner en filosof på retning', () => {
    const p = byId('platon');
    expect(matchesSearch(p, normalizeQuery(p.schools[0]))).toBe(true);
  });

  it('slipper alle gjennom når søket er tomt', () => {
    expect(philosophers.every((p) => matchesSearch(p, ''))).toBe(true);
  });

  it('avviser en filosof som ikke nevner søket', () => {
    expect(matchesSearch(byId('sokrates'), 'zzzz')).toBe(false);
  });
});
