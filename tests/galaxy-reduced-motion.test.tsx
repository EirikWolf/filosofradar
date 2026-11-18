// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { Galaxy3DView } from '../src/features/galaxy/Galaxy3DView';

// YTE-07 / UU-05: CSS-overstyringen for redusert bevegelse stopper ikke
// canvas-rotasjonen, så galaksen må selv starte uten spinn når brukeren har bedt
// om redusert bevegelse.

const philosophers = philosophersData as Philosopher[];

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion: reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('3D-galaksen og redusert bevegelse', () => {
  it('starter uten spinn når brukeren har bedt om redusert bevegelse', () => {
    mockReducedMotion(true);
    render(<Galaxy3DView philosophers={philosophers} onOpenCard={() => {}} />);
    expect(screen.getByRole('button', { name: /Roter/ })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Stopp spinn/ })).toBeNull();
  });

  it('spinner som før ellers', () => {
    mockReducedMotion(false);
    render(<Galaxy3DView philosophers={philosophers} onOpenCard={() => {}} />);
    expect(screen.getByRole('button', { name: /Stopp spinn/ })).toBeTruthy();
  });
});
