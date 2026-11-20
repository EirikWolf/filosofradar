// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { getStartYear } from '../src/lib/years';
import { TimelineView } from '../src/features/timeline/TimelineView';
import { RadarView } from '../src/features/radar/RadarView';

// TST-05: Stolpene på tidslinjen kunne bare velges med mus, og glideren i
// tidsmaskinen hadde ikke noe navn. WCAG 2.1.1 Tastatur og 4.1.2 Navn, rolle, verdi.

const philosophers = philosophersData as Philosopher[];
afterEach(() => cleanup());

const bars = () => [...document.querySelectorAll<SVGGElement>('svg g[role="button"]')];
const bar = (name: string) => {
  const el = bars().find((b) => b.getAttribute('aria-label')?.startsWith(`${name} (`));
  if (!el) throw new Error(`Fant ikke stolpen for ${name}`);
  return el;
};
const selectedName = () =>
  screen.queryByText('Valgt filosof:')?.closest('div')?.parentElement?.querySelector('h3')?.textContent ?? null;

describe('Tidslinjen med tastatur', () => {
  it('lar alle stolpene nås med Tab, i tidsrekkefølge', () => {
    render(<TimelineView philosophers={philosophers} />);
    const all = bars();
    expect(all).toHaveLength(philosophers.length);
    expect(all.every((b) => b.getAttribute('tabindex') === '0')).toBe(true);

    const years = all.map((b) => {
      const p = philosophers.find((x) => b.getAttribute('aria-label')?.startsWith(`${x.name} (`));
      if (!p) throw new Error(`Ukjent stolpe: ${b.getAttribute('aria-label')}`);
      return getStartYear(p);
    });
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it('velger en filosof med Enter, velger bort med Mellomrom og Escape', () => {
    render(<TimelineView philosophers={philosophers} />);
    const sokrates = bar('Sokrates');

    fireEvent.keyDown(sokrates, { key: 'Enter' });
    expect(selectedName()).toBe('Sokrates');
    expect(sokrates.getAttribute('aria-pressed')).toBe('true');

    fireEvent.keyDown(sokrates, { key: ' ' });
    expect(selectedName()).toBeNull();

    fireEvent.keyDown(bar('Platon'), { key: 'Enter' });
    expect(selectedName()).toBe('Platon');
    fireEvent.keyDown(bar('Platon'), { key: 'Escape' });
    expect(selectedName()).toBeNull();
  });
});

describe('Tidslinjens filter', () => {
  it('har et navn på tradisjonsvelgeren (axe: select-name)', () => {
    render(<TimelineView philosophers={philosophers} />);
    expect(screen.getByRole('combobox', { name: 'Filtrer etter tradisjon' })).toBeTruthy();
  });
});

describe('Glideren i tidsmaskinen', () => {
  it('har et navn og leser opp året som tekst', async () => {
    render(<RadarView philosophers={philosophers} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Aktiver Tidsmaskin/ }));
    });
    // Tidsmaskinen spiller av med en gang; pause, så året står stille.
    await act(async () => {
      fireEvent.click(screen.getByTitle('Pause'));
    });

    const slider = screen.getByRole('slider', { name: 'Tidsmaskin: velg år' });
    await act(async () => {
      fireEvent.change(slider, { target: { value: '-430' } });
    });
    expect(slider.getAttribute('aria-valuetext')).toBe('430 f.Kr.');

    await act(async () => {
      fireEvent.change(slider, { target: { value: '1800' } });
    });
    expect(slider.getAttribute('aria-valuetext')).toBe('1800 e.Kr.');
  });
});
