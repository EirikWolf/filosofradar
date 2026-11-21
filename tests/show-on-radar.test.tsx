// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import { App } from '../src/App';

// Feil meldt 2026-11-21: «✦ Radaren» på Sokrates i Ex.phil-huben åpnet
// filosofkortet i stedet for å vise ham på radaren, og Tilbake viste filosofen
// som sist var markert fra «Dagens filosof» (Amo), ikke Ex.phil-huben.

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});
afterEach(() => cleanup());

const selectedOnRadar = () => document.querySelector('#radar-hurtigkort h3')?.firstChild?.textContent ?? null;
const cardFor = (name: string) => screen.queryByRole('dialog', { name: `Filosofkort for ${name}` });

async function goBack() {
  await act(async () => {
    window.history.back();
    await new Promise((resolve) => window.addEventListener('popstate', resolve, { once: true }));
  });
}

async function openExphilAndShow(name: string, url = '/?v=exphil') {
  await act(async () => {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  // Pensumfilosofene står under «Pensumliste» i toppmenyen (fanen i huben lastes senere).
  fireEvent.click(await screen.findByRole('button', { name: /^📚 Pensumliste$/ }, { timeout: 5000 }));
  // Ex.phil-huben lastes lat; første gang tar det over ett sekund i jsdom.
  const heading = await screen.findByRole('heading', { name, level: 4 }, { timeout: 5000 });
  // Gå opp til kortet som har både navnet og «✦ Radaren».
  let card: HTMLElement | null = heading;
  while (card && ![...card.querySelectorAll('button')].some((b) => b.textContent?.includes('✦ Radaren'))) {
    card = card.parentElement;
  }
  const radarButton = [...(card?.querySelectorAll('button') ?? [])].find((b) => b.textContent?.includes('✦ Radaren'));
  if (!radarButton) throw new Error(`Fant ikke «✦ Radaren» for ${name}`);
  fireEvent.click(radarButton);
}

describe('«Vis på radaren»', () => {
  it('viser Sokrates på radaren i stedet for å åpne kortet, og Tilbake går til Ex.phil-huben', async () => {
    render(<App />);
    await openExphilAndShow('Sokrates');

    await waitFor(() => expect(selectedOnRadar()).toBe('Sokrates'));
    expect(cardFor('Sokrates')).toBeNull();
    expect(new URL(window.location.href).searchParams.get('f')).toBeNull();

    await goBack();
    expect(new URL(window.location.href).searchParams.get('v')).toBe('exphil');
    await waitFor(() => expect(document.querySelector('#radar-hurtigkort')).toBeNull());
  });

  it('lukker et åpent kort og fjerner det fra adressen', async () => {
    render(<App />);
    await openExphilAndShow('Sokrates', '/?v=exphil&f=platon');

    await waitFor(() => expect(selectedOnRadar()).toBe('Sokrates'));
    expect(cardFor('Platon')).toBeNull();
    expect(new URL(window.location.href).searchParams.get('f')).toBeNull();
  });

  it('husker ikke en gammel markering når man går til radaren på vanlig måte', async () => {
    render(<App />);
    await openExphilAndShow('Sokrates');
    await waitFor(() => expect(selectedOnRadar()).toBe('Sokrates'));

    await act(async () => {
      window.history.pushState({}, '', '/?v=list');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await act(async () => {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await waitFor(() => expect(document.querySelector('svg g[role="button"]')).not.toBeNull());
    expect(selectedOnRadar()).toBeNull();
  });

  it('husker ikke markeringen når man bytter visning i menyen', async () => {
    render(<App />);
    await openExphilAndShow('Sokrates');
    await waitFor(() => expect(selectedOnRadar()).toBe('Sokrates'));

    fireEvent.click(screen.getByRole('button', { name: /Tidslinjen$/ }));
    fireEvent.click(await screen.findByRole('button', { name: /^✦ Radaren$/ }));
    await waitFor(() => expect(document.querySelector('svg g[role="button"]')).not.toBeNull());
    expect(selectedOnRadar()).toBeNull();
  });
});
