// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { NetworkView, NETWORK_GLIDE_MS } from '../src/features/network/NetworkView';

// YTE-02: nettverket tegnes ferdig utregnet. Første gang glir stjernene inn fra
// midten og kantene tones inn etterpå; med redusert bevegelse vises grafen ferdig.
// En høydeendring (adresselinjen på mobil) skal ikke ordne grafen om.

const philosophers = philosophersData as Philosopher[];

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion: reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

// requestAnimationFrame som testen styrer selv.
let frames = new Map<number, FrameRequestCallback>();
let nextFrame = 1;
function runFrame() {
  const pending = [...frames.values()];
  frames = new Map();
  act(() => pending.forEach((cb) => cb(performance.now())));
}

beforeEach(() => {
  frames = new Map();
  vi.useFakeTimers();
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    const id = nextFrame++;
    frames.set(id, cb);
    return id;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const nodeGroups = (c: HTMLElement) => [...c.querySelectorAll<SVGGElement>('g.nodes > g')];
const edgeLayer = (c: HTMLElement) => c.querySelector<SVGGElement>('g.links')!;
const transforms = (c: HTMLElement) => nodeGroups(c).map((g) => g.style.transform);

describe('Idénettverket', () => {
  it('flyr stjernene inn fra midten og toner inn kantene etterpå', () => {
    mockReducedMotion(false);
    const { container } = render(<NetworkView philosophers={philosophers} />);
    const nodes = nodeGroups(container);
    expect(nodes.length).toBeGreaterThanOrEqual(80);

    // Første bilde: alle står usynlige i midten, og kantene er skjult.
    expect(new Set(transforms(container)).size).toBe(1);
    expect(nodes[0].style.opacity).toBe('0');
    expect(edgeLayer(container).style.opacity).toBe('0');

    runFrame();
    runFrame();
    // Nå glir de til hver sin plass.
    expect(new Set(transforms(container)).size).toBe(nodes.length);
    expect(nodeGroups(container)[0].style.transition).toContain('transform');
    expect(edgeLayer(container).style.opacity).toBe('0');

    act(() => vi.advanceTimersByTime(NETWORK_GLIDE_MS));
    expect(edgeLayer(container).style.opacity).toBe('1');
    expect(nodeGroups(container)[0].style.transition).not.toContain('transform');
  });

  it('viser grafen ferdig med redusert bevegelse', () => {
    mockReducedMotion(true);
    const { container } = render(<NetworkView philosophers={philosophers} />);
    expect(edgeLayer(container).style.opacity).toBe('1');
    expect(new Set(transforms(container)).size).toBe(nodeGroups(container).length);
    expect(nodeGroups(container)[0].style.transition).not.toContain('transform');
  });

  it('ordner ikke grafen om når bare høyden endres', () => {
    mockReducedMotion(true);
    const { container } = render(<NetworkView philosophers={philosophers} />);
    const before = transforms(container);

    vi.stubGlobal('innerHeight', window.innerHeight + 120);
    act(() => {
      fireEvent(window, new Event('resize'));
    });
    expect(transforms(container)).toEqual(before);

    // En ny bredde gir nytt oppsett.
    const spy = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(700);
    act(() => {
      fireEvent(window, new Event('resize'));
    });
    expect(transforms(container)).not.toEqual(before);
    spy.mockRestore();
  });
});
