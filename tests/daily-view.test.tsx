// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { DailyPhilosopher } from '../src/features/daily/DailyPhilosopher';

// TST-09: kortet skal vise filosofen for kalenderdatoen på forsiden, også i
// timen etter midnatt om sommeren.

const philosophers = philosophersData as Philosopher[];
const originalTz = process.env.TZ;
beforeAll(() => {
  process.env.TZ = 'Europe/Oslo';
});
afterAll(() => {
  process.env.TZ = originalTz;
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function shownAt(date: Date): Philosopher {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(date);
  render(<DailyPhilosopher philosophers={philosophers} onOpenCard={() => {}} onNavigateToRadar={() => {}} />);
  const shown = philosophers.find((p) => screen.queryAllByText(p.name).length > 0);
  cleanup();
  if (!shown) throw new Error('Fant ingen filosof i kortet');
  return shown;
}

describe('Dagens filosof', () => {
  it('viser den samme filosofen kl. 00.30 og kl. 09.00 en sommerdag', () => {
    const night = shownAt(new Date(2026, 6, 1, 0, 30));
    const morning = shownAt(new Date(2026, 6, 1, 9, 0));
    expect(night.id).toBe(morning.id);
    expect(morning.id).toBe(philosophers[182 % philosophers.length].id);
  });

  it('bytter filosof ved midnatt', () => {
    const evening = shownAt(new Date(2026, 5, 30, 23, 30));
    const night = shownAt(new Date(2026, 6, 1, 0, 30));
    expect(evening.id).not.toBe(night.id);
  });
});
