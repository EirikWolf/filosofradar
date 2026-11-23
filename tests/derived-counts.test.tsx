// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { App } from '../src/App';
import { Galaxy3DView } from '../src/features/galaxy/Galaxy3DView';
import { EthicsLabView } from '../src/features/ethics/EthicsLabView';
import { ETHICAL_DILEMMAS } from '../src/features/ethics/dilemmaData';

// ARK-06: tall i UI-et som følger av innholdet, var skrevet inn for hånd («32 Historier»,
// «6 moralske prøvelser», «Alle tradisjoner (80)»). Testene gir komponentene et annet
// antall enn det dataene har i dag, så et tall som er skrevet inn igjen, blir rødt.

vi.mock('../src/generated/contentCounts.json', () => ({ default: { stories: 7 } }));
vi.mock('../src/features/ethics/dilemmaData', async (importOriginal) => {
  const original = await importOriginal<typeof import('../src/features/ethics/dilemmaData')>();
  return { ...original, ETHICAL_DILEMMAS: original.ETHICAL_DILEMMAS.slice(0, 2) };
});

const philosophers = philosophersData as Philosopher[];

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
});

describe('Tall som følger av innholdet', () => {
  it('menyen viser antallet fortellinger fra dataene', () => {
    // Undermenyen med historiene vises bare i opplevelsesvisningene.
    window.history.replaceState({}, '', '/?v=quiz');
    render(<App />);
    expect(screen.getByRole('button', { name: /7 Filosofiske Historier/ })).toBeTruthy();
    expect(screen.getByTitle('Åpne de 7 dramatiserte filosofiske historiene med tale')).toBeTruthy();
    expect(screen.getByRole('button', { name: /7 Historier/ })).toBeTruthy();
  });

  it('galaksen teller filosofene den får', () => {
    render(<Galaxy3DView philosophers={philosophers.slice(0, 3)} onOpenCard={() => {}} />);
    expect(screen.getByRole('option', { name: 'Alle tradisjoner (3)' })).toBeTruthy();
  });

  it('Etikk-lab teller dilemmaene brukeren har vært gjennom', () => {
    expect(ETHICAL_DILEMMAS).toHaveLength(2);
    render(<EthicsLabView philosophers={philosophers} onOpenPhilosopherCard={() => {}} />);
    for (const dilemma of ETHICAL_DILEMMAS) {
      fireEvent.click(screen.getByText(dilemma.options[0].title));
      fireEvent.click(screen.getByRole('button', { name: /Neste dilemma|Se ditt Etiske Moralkompass/ }));
    }
    expect(screen.getByText(/Gjennom 2 moralske prøvelser har du/)).toBeTruthy();
  });
});
