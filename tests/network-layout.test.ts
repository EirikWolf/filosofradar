import { describe, it, expect } from 'vitest';
import philosophers from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { getNetworkData } from '../src/lib/influence';
import { computeNetworkLayout, settleSimulation, timeAxisX } from '../src/lib/networkLayout';

// YTE-02: nettverket beregnes ferdig på forhånd og tegnes én gang.

const { nodes: rawNodes, links: rawLinks } = getNetworkData(philosophers as Philosopher[]);
const OPTIONS = { width: 900, height: 600, timeForce: 0.22 };

describe('computeNetworkLayout', () => {
  it('gir alle noder en endelig posisjon', () => {
    const { nodes } = computeNetworkLayout(rawNodes, rawLinks, OPTIONS);
    expect(nodes.length).toBe(rawNodes.length);
    expect(nodes.length).toBeGreaterThanOrEqual(80);
    for (const n of nodes) {
      expect(Number.isFinite(n.x), n.id).toBe(true);
      expect(Number.isFinite(n.y), n.id).toBe(true);
    }
  });

  it('kjører simuleringen til den har roet seg', () => {
    const { simulation } = computeNetworkLayout(rawNodes, rawLinks, OPTIONS);
    expect(simulation.alpha()).toBeLessThan(simulation.alphaMin());
    // Et nytt kall har ingenting igjen å gjøre.
    expect(settleSimulation(simulation)).toBe(0);
  });

  it('gir samme oppsett hver gang', () => {
    const a = computeNetworkLayout(rawNodes, rawLinks, OPTIONS).nodes;
    const b = computeNetworkLayout(rawNodes, rawLinks, OPTIONS).nodes;
    expect(a.map((n) => [n.x, n.y])).toEqual(b.map((n) => [n.x, n.y]));
  });

  it('muterer ikke rådataene', () => {
    computeNetworkLayout(rawNodes, rawLinks, OPTIONS);
    expect(rawNodes.every((n) => n.x === undefined && n.y === undefined)).toBe(true);
    expect(rawLinks.every((l) => typeof l.source === 'string')).toBe(true);
  });

  it('legger antikken til venstre for moderne tid når tidsflyten er på', () => {
    const { nodes } = computeNetworkLayout(rawNodes, rawLinks, { ...OPTIONS, timeForce: 0.35 });
    const meanX = (list: typeof nodes) => list.reduce((s, n) => s + n.x!, 0) / list.length;
    const ancient = nodes.filter((n) => n.bornYear < 0);
    const modern = nodes.filter((n) => n.bornYear > 1800);
    expect(ancient.length).toBeGreaterThan(5);
    expect(modern.length).toBeGreaterThan(5);
    expect(meanX(ancient)).toBeLessThan(meanX(modern) - OPTIONS.width / 4);
  });
});

describe('settleSimulation', () => {
  it('roer ned en simulering som er satt i gang igjen, slik en dragning gjør', () => {
    const { simulation } = computeNetworkLayout(rawNodes, rawLinks, OPTIONS);
    simulation.alpha(0.3);
    const ticks = settleSimulation(simulation);
    expect(ticks).toBeGreaterThan(0);
    expect(simulation.alpha()).toBeLessThan(simulation.alphaMin());
  });
});

describe('timeAxisX', () => {
  it('fordeler årstall fra venstre til høyre innenfor marginene', () => {
    expect(timeAxisX(-650, 900)).toBe(90);
    expect(timeAxisX(2025, 900)).toBe(810);
    expect(timeAxisX(0, 900)).toBeGreaterThan(timeAxisX(-400, 900));
  });
});
