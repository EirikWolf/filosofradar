// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { RadarView } from '../src/features/radar/RadarView';
import { TimelineView } from '../src/features/timeline/TimelineView';
import { sound } from '../src/lib/sound';

// TST-07: Kant ble født to ganger når glideren ble flyttet ett år av gangen.
// TST-08: År 0 viste seg i tidsmaskinen, og tidslinjen ga Seneca 69 år i stedet for 68.

const philosophers = philosophersData as Philosopher[];
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function openPausedTimeMachine() {
  render(<RadarView philosophers={philosophers} />);
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /Aktiver Tidsmaskin/ }));
  });
  await act(async () => {
    fireEvent.click(screen.getByTitle('Pause'));
  });
  return screen.getByRole('slider', { name: 'Tidsmaskin: velg år' });
}

async function moveTo(slider: HTMLElement, year: number) {
  await act(async () => {
    fireEvent.change(slider, { target: { value: String(year) } });
  });
}

const shownYear = () => screen.getByText('Historisk tid:').nextElementSibling?.textContent;

describe('Tidsmaskinen', () => {
  it('føder Kant én gang når glideren flyttes 1723 → 1724 → 1725', async () => {
    const slider = await openPausedTimeMachine();
    await moveTo(slider, 1723);
    const birth = vi.spyOn(sound, 'playSupernovaBirth').mockImplementation(() => {});

    await moveTo(slider, 1724);
    await moveTo(slider, 1725);
    // Kant (1724) er den eneste filosofen født 1720–1728.
    expect(birth).toHaveBeenCalledTimes(1);
  });

  it('hopper fra 1 e.Kr. til 1 f.Kr. og tilbake uten å vise år 0', async () => {
    const slider = await openPausedTimeMachine();
    await moveTo(slider, 1);
    expect(shownYear()).toBe('1');

    await moveTo(slider, 0);
    expect(shownYear()).toBe('1 f.Kr.');
    expect(slider.getAttribute('aria-valuetext')).toBe('1 f.Kr.');

    await moveTo(slider, 0);
    expect(shownYear()).toBe('1');
    expect(slider.getAttribute('aria-valuetext')).toBe('1 e.Kr.');
  });
});

describe('Avspilling forbi Kristi fødsel', () => {
  it('viser 1 e.Kr. rett etter 1 f.Kr., aldri år 0', async () => {
    // Styrt requestAnimationFrame: hvert kall til frame() kjører ett bilde.
    const queue: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => queue.push(cb));
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    const frame = async (now: number) => {
      const callbacks = queue.splice(0);
      await act(async () => callbacks.forEach((cb) => cb(now)));
    };

    const slider = await openPausedTimeMachine();
    await moveTo(slider, -1);
    expect(shownYear()).toBe('1 f.Kr.');

    await act(async () => {
      fireEvent.click(screen.getByTitle('Spill av'));
    });
    await frame(0);
    // 1× er 12 år i sekundet, så 1000/12 ms er nøyaktig ett år: fra -1 til 0.
    await frame(1000 / 12);
    expect(shownYear()).toBe('1');
  });
});

describe('Tidslinjen', () => {
  it('gir Seneca (4 f.Kr.–65) 68 år, ikke 69', () => {
    render(<TimelineView philosophers={philosophers} />);
    const seneca = document.querySelector('svg g[role="button"][aria-label^="Seneca ("]');
    if (!seneca) throw new Error('Fant ikke Seneca');
    fireEvent.click(seneca);
    expect(screen.getByText(/Levetid:/).textContent).toContain('(68 år)');
  });
});
