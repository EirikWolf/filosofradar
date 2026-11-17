// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

// YTE-04 (revisjon 2026-11-17): dypdykket kom ca. 1 s etter at kortet åpnet på
// mobil, fordi innholdet først ble hentet ved klikk. Kortets innhold skal hentes
// så snart brukeren viser at hun er på vei til et kort.

const preload = vi.fn();
vi.mock('../src/features/card/cardContent', async (orig) => ({
  ...(await orig<typeof import('../src/features/card/cardContent')>()),
  preloadCardContent: () => preload(),
}));

const { RadarView } = await import('../src/features/radar/RadarView');
const { PhilosopherList } = await import('../src/features/list/PhilosopherList');
const { DailyPhilosopher } = await import('../src/features/daily/DailyPhilosopher');

const philosophers = philosophersData as Philosopher[];
const noop = () => {};

beforeEach(() => preload.mockClear());
afterEach(() => cleanup());

describe('Forhåndslasting av filosofkortets innhold (YTE-04)', () => {
  it('starter når en stjerne velges på radaren', async () => {
    const user = userEvent.setup();
    render(<RadarView philosophers={philosophers} onOpenCard={noop} />);
    expect(preload).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: /^Sokrates/ }));
    expect(preload).toHaveBeenCalled();
  });

  it('starter når en rad foldes ut i tabellen', async () => {
    const user = userEvent.setup();
    render(<PhilosopherList philosophers={philosophers} onOpenCard={noop} />);
    expect(preload).not.toHaveBeenCalled();
    await user.click(screen.getAllByText('Sokrates')[0]);
    expect(preload).toHaveBeenCalled();
  });

  it('starter når «Les filosofkort» i Dagens filosof får fokus eller pekeren', () => {
    render(<DailyPhilosopher philosophers={philosophers} onOpenCard={noop} onNavigateToRadar={noop} />);
    expect(preload).not.toHaveBeenCalled();
    fireEvent.pointerEnter(screen.getByRole('button', { name: /Les filosofkort/ }));
    expect(preload).toHaveBeenCalled();
  });
});
