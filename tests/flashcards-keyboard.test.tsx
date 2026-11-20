// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ExphilFlashcardsView } from '../src/features/exphil/ExphilFlashcardsView';

// UU-02: Enter og Mellomrom snur kortet, men ikke når fokus står på en knapp eller
// lenke. Da skal knappen gjøre sitt. Testen sjekket før bare at to strenger sto i
// kildekoden (TST-01); nå trykker den på tastene.

afterEach(() => {
  cleanup();
  localStorage.clear();
});

const isFlipped = () => screen.queryByText('Klikk for forside') !== null;

describe('Tastatur på flashcards (UU-02)', () => {
  it('snur kortet med Enter og Mellomrom når fokus ikke står på en kontroll', () => {
    render(<ExphilFlashcardsView />);
    expect(isFlipped()).toBe(false);

    fireEvent.keyDown(document.body, { key: 'Enter' });
    expect(isFlipped()).toBe(true);

    fireEvent.keyDown(document.body, { key: ' ' });
    expect(isFlipped()).toBe(false);
  });

  it.each([
    ['Enter', 'Enter'],
    ['Mellomrom', ' '],
  ])('snur ikke kortet når %s trykkes på en knapp', (_name, key) => {
    render(<ExphilFlashcardsView />);
    const button = screen.getByRole('button', { name: /Neste/ });
    button.focus();

    fireEvent.keyDown(button, { key });
    expect(isFlipped()).toBe(false);
  });
});
