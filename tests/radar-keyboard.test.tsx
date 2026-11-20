// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { getStartYear } from '../src/lib/years';
import { RadarView } from '../src/features/radar/RadarView';

// UU-04: stjernene skal komme i kronologisk rekkefølge når man tabber seg gjennom
// radaren. Testen sjekket før en sortering den gjorde selv (TST-01); nå leser den
// rekkefølgen i den tegnede radaren. Alle stjernene har tabIndex 0, så Tab følger
// rekkefølgen i dokumentet.

const philosophers = philosophersData as Philosopher[];
afterEach(() => cleanup());

function tabbableStars(): Element[] {
  return [...document.querySelectorAll('svg g[role="button"][tabindex="0"]')].filter((el) =>
    philosophers.some((p) => el.getAttribute('aria-label')?.startsWith(`${p.name} (`)),
  );
}

function philosopherFor(el: Element): Philosopher {
  const label = el.getAttribute('aria-label') ?? '';
  const p = philosophers.find((x) => label.startsWith(`${x.name} (`));
  if (!p) throw new Error(`Ukjent stjerne: ${label}`);
  return p;
}

describe('Tastaturrekkefølge på radaren (UU-04)', () => {
  it('lar Tab gå gjennom alle stjernene fra den eldste til den yngste', () => {
    render(<RadarView philosophers={philosophers} />);
    const stars = tabbableStars().map(philosopherFor);

    expect(stars).toHaveLength(philosophers.length);
    expect(stars[0].id).toBe('ptahhotep');
    const years = stars.map(getStartYear);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });
});
