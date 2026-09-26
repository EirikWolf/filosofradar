import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import {
  getAncestors,
  getDescendants,
  getLongestLineage,
  getNetworkData,
} from '../src/lib/influence';

const philosophers = philosophersData as Philosopher[];
const map = new Map<string, Philosopher>();
for (const p of philosophers) {
  map.set(p.id, p);
}

describe('influence.ts', () => {
  it('finner forfedre (ancestors) for Simone de Beauvoir', () => {
    const ancestors = getAncestors('de-beauvoir', map);
    expect(ancestors).toContain('kierkegaard');
    expect(ancestors).toContain('kant');
    expect(ancestors).toContain('descartes');
    expect(ancestors).toContain('sokrates');
  });

  it('finner etterfølgere (descendants) for Sokrates', () => {
    const descendants = getDescendants('sokrates', map);
    expect(descendants).toContain('platon');
    expect(descendants).toContain('aristoteles');
    expect(descendants).toContain('kierkegaard');
    expect(descendants).toContain('nietzsche');
    expect(descendants).toContain('arne-naess');
  });

  it('getLongestLineage finner en meningsfull idé-kjede', () => {
    const lineage = getLongestLineage(philosophers);
    expect(lineage.length).toBeGreaterThanOrEqual(4);
    expect(lineage.path[0]).toBe('sokrates');
    expect(lineage.path[1]).toBe('platon');
    expect(lineage.path[2]).toBe('aristoteles');
  });

  it('getNetworkData genererer noder og over 40 kanter', () => {
    const { nodes, links } = getNetworkData(philosophers);
    expect(nodes.length).toBe(philosophers.length);
    expect(links.length).toBeGreaterThanOrEqual(40);
  });
});
