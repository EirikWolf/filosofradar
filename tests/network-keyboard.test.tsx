// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { getStartYear } from '../src/lib/years';
import { NetworkView } from '../src/features/network/NetworkView';

// Idénettverket kunne bare brukes med mus: nodene var <g onClick> uten tabIndex,
// rolle eller tastaturhåndtering (TST-05 nevnte det, DESIGN.md §7 krever det).

const philosophers = philosophersData as Philosopher[];

beforeEach(() => {
  // Rolig modus: grafen står ferdig med en gang, uten glidning.
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('prefers-reduced-motion: reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const nodes = () => [...document.querySelectorAll<SVGGElement>('g.nodes > g[role="button"]')];
const node = (name: string) => {
  const el = nodes().find((n) => n.getAttribute('aria-label')?.startsWith(`${name}, `));
  if (!el) throw new Error(`Fant ikke noden for ${name}`);
  return el;
};
const tooltipName = () => document.querySelector('.absolute.bottom-4.left-4 .text-gold')?.textContent ?? null;

describe('Idénettverket med tastatur', () => {
  it('lar alle nodene nås med Tab, i tidsrekkefølge, med navn og koblinger', () => {
    render(<NetworkView philosophers={philosophers} />);
    const all = nodes();
    expect(all).toHaveLength(philosophers.length);
    expect(all.every((n) => n.getAttribute('tabindex') === '0')).toBe(true);

    const years = all.map((n) => {
      const p = philosophers.find((x) => n.getAttribute('aria-label')?.startsWith(`${x.name}, `));
      if (!p) throw new Error(`Ukjent node: ${n.getAttribute('aria-label')}`);
      return getStartYear(p);
    });
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(node('Platon').getAttribute('aria-label')).toMatch(
      /^Platon, \d+ koblinger \(.+\): påvirket av \d+, inspirerte \d+$/,
    );
  });

  it('lar navnet begynne med teksten som står synlig i noden (WCAG 2.5.3)', () => {
    render(<NetworkView philosophers={philosophers} />);
    for (const n of nodes()) {
      // Som axe: tekstnodene settes sammen uten skilletegn, og begge sider sammenlignes
      // uten tegnsetting og med små bokstaver. «Sokrates14» ville ikke stått i navnet.
      const curate = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
      const visible = curate([...n.querySelectorAll('text')].map((t) => t.textContent).join(''));
      expect(curate(n.getAttribute('aria-label') ?? '').startsWith(visible), visible).toBe(true);
    }
  });

  it('viser koblingene når en node får fokus, og skjuler dem med Escape', () => {
    render(<NetworkView philosophers={philosophers} />);
    fireEvent.focus(node('Platon'));
    expect(tooltipName()).toContain('Platon');

    fireEvent.keyDown(node('Platon'), { key: 'Escape' });
    expect(tooltipName()).toBeNull();
  });

  it('åpner filosofkortet med Enter og Mellomrom', () => {
    const onOpenCard = vi.fn();
    render(<NetworkView philosophers={philosophers} onOpenCard={onOpenCard} />);
    fireEvent.keyDown(node('Platon'), { key: 'Enter' });
    fireEvent.keyDown(node('Immanuel Kant'), { key: ' ' });
    expect(onOpenCard.mock.calls).toEqual([['platon'], ['kant']]);
  });
});
