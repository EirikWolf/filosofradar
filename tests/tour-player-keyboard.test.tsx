// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { TOURS } from '../src/features/tours/tourData';
import { TourPlayer } from '../src/features/tours/TourPlayer';

// TST-02: Escape avslutter den guidede turen, og piltastene blar mellom stoppene.
// Ingen test trykket på disse tastene før.

const philosophers = philosophersData as Philosopher[];
afterEach(() => cleanup());

function renderPlayer(stopIndex: number) {
  const tour = TOURS[0];
  const handlers = { onNextStop: vi.fn(), onPrevStop: vi.fn(), onExitTour: vi.fn() };
  const philosopher = philosophers.find((p) => p.id === tour.stops[stopIndex].philosopherId);
  if (!philosopher) throw new Error('Fant ikke filosofen i turen');
  render(
    <TourPlayer
      tour={tour}
      currentStopIndex={stopIndex}
      philosopher={philosopher}
      onSelectStopIndex={() => {}}
      onOpenPhilosopherCard={() => {}}
      {...handlers}
    />,
  );
  return { tour, ...handlers };
}

describe('Tastatur i den guidede turen', () => {
  it('avslutter turen med Escape', async () => {
    const user = userEvent.setup();
    const { onExitTour } = renderPlayer(0);
    await user.keyboard('{Escape}');
    expect(onExitTour).toHaveBeenCalledTimes(1);
  });

  it('blar fram med høyre pil, men ikke tilbake fra første stopp', async () => {
    const user = userEvent.setup();
    const { onNextStop, onPrevStop } = renderPlayer(0);
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowLeft}');
    expect(onNextStop).toHaveBeenCalledTimes(1);
    expect(onPrevStop).not.toHaveBeenCalled();
  });

  it('blar ikke forbi siste stopp', async () => {
    const user = userEvent.setup();
    const { onNextStop, onPrevStop } = renderPlayer(TOURS[0].stops.length - 1);
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowLeft}');
    expect(onNextStop).not.toHaveBeenCalled();
    expect(onPrevStop).toHaveBeenCalledTimes(1);
  });
});
