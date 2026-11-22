// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import { App } from '../src/App';

// ARK-03: Hjem kalte changeView (én pushState) og pushet så én gang til. Tilbake
// etter Hjem ga en mellomtilstand brukeren aldri hadde sett: filosofkortet åpent over
// radaren. Hver brukerhandling skal gi nøyaktig ett nytt historikkpunkt.

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Teller pushState direkte. history.length er upålitelig her: etter Tilbake i en
// tidligere test erstatter neste push et punkt framover, så lengden står stille.
const countPushes = () => vi.spyOn(window.history, 'pushState');

const params = () => new URL(window.location.href).searchParams;

async function goTo(url: string) {
  await act(async () => {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}

async function goBack() {
  await act(async () => {
    window.history.back();
    await new Promise((resolve) => window.addEventListener('popstate', resolve, { once: true }));
  });
}

describe('Navigasjon og historikk', () => {
  it('lager ett historikkpunkt for Hjem, og Tilbake går til siden man kom fra', async () => {
    render(<App />);
    await goTo('/?v=about&f=sokrates');
    await screen.findByRole('dialog', { name: 'Filosofkort for Sokrates' }, { timeout: 5000 });

    const pushes = countPushes();
    fireEvent.click(screen.getByRole('button', { name: 'Gå til forsiden av Filosofradaren' }));
    expect(pushes).toHaveBeenCalledTimes(1);
    expect(window.location.search).toBe('');

    await goBack();
    expect(params().get('v')).toBe('about');
    expect(params().get('f')).toBe('sokrates');
  });

  it('lager ett historikkpunkt når man bytter visning i menyen', async () => {
    render(<App />);
    await waitFor(() => expect(document.querySelector('svg g[role="button"]')).not.toBeNull());
    const pushes = countPushes();
    fireEvent.click(screen.getByRole('button', { name: /Tidslinjen$/ }));
    expect(pushes).toHaveBeenCalledTimes(1);
    expect(params().get('v')).toBe('timeline');
  });

  it('godtar ikke en ukjent visning i adressen, men viser radaren', async () => {
    render(<App />);
    await goTo('/?v=finnes-ikke');
    await waitFor(() => expect(document.querySelector('svg g[role="button"]')).not.toBeNull());
  });
});
