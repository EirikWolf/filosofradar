import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { validateRelations, type RelationInput } from '../src/lib/relations';
import { getLongestLineage, getNetworkData } from '../src/lib/influence';

// TST-10: en sirkel i influencedBy slapp gjennom valideringen og krasjet
// idénettverket med «Maximum call stack size exceeded».

const philosophers = philosophersData as Philosopher[];
const node = (id: string, year: number, influencedBy: string[] = []): RelationInput => ({
  id,
  born: { year },
  influencedBy,
});

describe('validateRelations', () => {
  it('godtar dagens innhold', () => {
    expect(validateRelations(philosophers)).toEqual([]);
  });

  it('melder ukjent ID', () => {
    expect(validateRelations([node('a', 1, ['finnes-ikke'])])).toEqual([
      '[a] "influencedBy" peker til ukjent filosof-ID "finnes-ikke"',
    ]);
  });

  it('melder selvreferanse', () => {
    expect(validateRelations([node('kant', 1724, ['kant'])])).toEqual([
      '[kant] "influencedBy" peker på filosofen selv',
    ]);
  });

  it('melder en påvirker som er født etter den påvirkede', () => {
    const errors = validateRelations([node('eldre', 1700, ['yngre']), node('yngre', 1800)]);
    expect(errors).toEqual(['[eldre] Påvirker "yngre" (1800) er født ETTER eldre (1700)!']);
  });

  it('melder to filosofer født samme år som peker på hverandre', () => {
    const errors = validateRelations([node('a', 1813, ['b']), node('b', 1813, ['a'])]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/^Påvirkningene går i sirkel: /);
    expect(errors[0]).toContain('a');
    expect(errors[0]).toContain('b');
  });

  it('melder en lengre sirkel én gang', () => {
    const errors = validateRelations([node('a', 1, ['c']), node('b', 1, ['a']), node('c', 1, ['b'])]);
    expect(errors.filter((e) => e.includes('sirkel'))).toHaveLength(1);
  });

  it('godtar en ruteformet graf uten sirkel', () => {
    // d er påvirket av b og c, som begge er påvirket av a.
    const graph = [node('a', 1), node('b', 2, ['a']), node('c', 2, ['a']), node('d', 3, ['b', 'c'])];
    expect(validateRelations(graph)).toEqual([]);
  });
});

describe('getLongestLineage', () => {
  const asPhilosophers = (nodes: Array<{ id: string; influences: string[] }>): Philosopher[] =>
    nodes.map((n) => ({ ...philosophers[0], id: n.id, influencedBy: [], influences: n.influences }));

  it('tåler en sirkel i påvirkningene i stedet for å sprenge stakken', () => {
    const cyclic = asPhilosophers([
      { id: 'a', influences: ['b'] },
      { id: 'b', influences: ['a'] },
    ]);
    expect(getLongestLineage(cyclic).path).toEqual(['a', 'b']);
  });

  it('velger den første av to like lange kjeder (M15)', () => {
    const tie = asPhilosophers([
      { id: 'rot', influences: ['venstre', 'hoyre'] },
      { id: 'venstre', influences: [] },
      { id: 'hoyre', influences: [] },
    ]);
    expect(getLongestLineage(tie).path).toEqual(['rot', 'venstre']);
  });
});

describe('getNetworkData', () => {
  it('lager bare én kant når samme påvirkning står to ganger (M16)', () => {
    const laerer = { ...philosophers[0], id: 'laerer', influencedBy: [] };
    const elev = { ...philosophers[1], id: 'elev', influencedBy: ['laerer', 'laerer'] };
    expect(getNetworkData([laerer, elev]).links).toHaveLength(1);
  });
});
