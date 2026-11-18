// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { RadarView } from '../src/features/radar/RadarView';

// YTE-01: stjernelaget skal bare rendres på nytt når noen fødes eller dør i
// tidsmaskinen. Denne testen låser hvordan livsstatusen vises, så refaktoreringen
// ikke endrer oppførselen: ufødt 0,04, levende 1, død 0,5.

const philosophers = philosophersData as Philosopher[];
afterEach(() => cleanup());

function star(name: string): Element {
  const el = document.querySelector(`g[role="button"][aria-label^="${name} ("]`);
  if (!el) throw new Error(`Fant ikke stjernen ${name}`);
  return el;
}

async function moveTo(year: number) {
  await act(async () => {
    fireEvent.change(screen.getByRole('slider'), { target: { value: String(year) } });
  });
}

describe('Livsstatus i tidsmaskinen', () => {
  it('viser ufødt, levende og død riktig når tiden flyttes med glideren', async () => {
    render(<RadarView philosophers={philosophers} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Aktiver Tidsmaskin/ }));
    });

    await moveTo(-500);
    expect(star('Sokrates').getAttribute('opacity')).toBe('0.04');

    await moveTo(-430);
    expect(star('Sokrates').getAttribute('opacity')).toBe('1');

    await moveTo(0);
    expect(star('Sokrates').getAttribute('opacity')).toBe('0.5');
    expect(star('Immanuel Kant').getAttribute('opacity')).toBe('0.04');

    await moveTo(1800);
    expect(star('Immanuel Kant').getAttribute('opacity')).toBe('1');

    await moveTo(1900);
    expect(star('Immanuel Kant').getAttribute('opacity')).toBe('0.5');
    expect(star('Angela Davis').getAttribute('opacity')).toBe('0.04');

    await moveTo(2025);
    expect(star('Angela Davis').getAttribute('opacity')).toBe('1');
  });

  it('rendrer i steg ved 4× og viser nøyaktig år når den pauses', async () => {
    // Styr animasjonsbildene selv, så testen ikke avhenger av klokka.
    const frames = new Map<number, FrameRequestCallback>();
    let nextId = 0;
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      frames.set(++nextId, cb);
      return nextId;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
    const runFrame = async (ms: number) => {
      const due = [...frames.values()];
      frames.clear();
      await act(async () => due.forEach((cb) => cb(ms)));
    };

    try {
      render(<RadarView philosophers={philosophers} />);
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /Aktiver Tidsmaskin/ }));
      });
      await moveTo(100);
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: '4×' }));
        fireEvent.click(screen.getByTitle('Spill av'));
      });

      // 4× er 60 år/s: 3 år per 50 ms. År 106 krysser steget ved 105 og rendres,
      // år 109 er i samme steg og rendres ikke.
      await runFrame(0);
      await runFrame(50);
      await runFrame(100);
      expect(screen.getByRole('slider')).toHaveProperty('value', '106');
      await runFrame(150);
      expect(screen.getByRole('slider')).toHaveProperty('value', '106');

      // Pause synker visningen til det nøyaktige årstallet.
      await act(async () => {
        fireEvent.click(screen.getByTitle('Pause'));
      });
      expect(screen.getByRole('slider')).toHaveProperty('value', '109');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('lar alle stjerner være synlige når tidsmaskinen er av', () => {
    render(<RadarView philosophers={philosophers} />);
    expect(star('Sokrates').getAttribute('opacity')).toBe('1');
    expect(star('Angela Davis').getAttribute('opacity')).toBe('1');
  });
});
