// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { RadarView } from '../src/features/radar/RadarView';
import { PhilosopherList } from '../src/features/list/PhilosopherList';

// UU-03: søkefelt og filtre har et tilgjengelig navn, så skjermlesere sier hva de er.
// Testen fantes før som et søk i kildeteksten. Den brakk da navnet ble flyttet til
// src/i18n/nb.ts (B-020), selv om skjermleseren hørte det samme.

const philosophers = philosophersData as Philosopher[];

afterEach(cleanup);

describe('UU-03 Skjemafelt med tilgjengelig navn', () => {
  it('radaren har navn på søkefeltet og begge filtrene', () => {
    render(<RadarView philosophers={philosophers} />);
    expect(screen.getByLabelText('Søk etter filosof eller idé').tagName).toBe('INPUT');
    expect(screen.getByLabelText('Filtrer etter tradisjon').tagName).toBe('SELECT');
    expect(screen.getByLabelText('Filtrer etter tema').tagName).toBe('SELECT');
  });

  it('listen har navn på søkefeltet', () => {
    render(<PhilosopherList philosophers={philosophers} onOpenCard={() => {}} />);
    expect(screen.getByLabelText('Søk etter filosof, idé, retning eller verdensdel').tagName).toBe('INPUT');
  });
});
