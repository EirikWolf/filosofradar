// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { RadarView } from '../src/features/radar/RadarView';
import { TimelineView } from '../src/features/timeline/TimelineView';

// TST-04 / B-019: i lineær skala står filosofer født før 650 f.Kr. ved aksens start.
// De skal merkes, så ingen tror Ptahhotep levde i 650 f.Kr.

const philosophers = philosophersData as Philosopher[];
afterEach(() => cleanup());

const markers = () => [...document.querySelectorAll('text')].filter((t) => t.textContent?.includes('← eldre'));

describe('Merking av filosofer eldre enn aksen', () => {
  it('radaren merker to stjerner i lineær skala og ingen i komprimert', () => {
    render(<RadarView philosophers={philosophers} />);
    expect(markers()).toHaveLength(0);
    expect(screen.getByText('2400 f.Kr.')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Lineær' }));
    expect(markers()).toHaveLength(2);
    expect(screen.getAllByText('650 f.Kr.').length).toBeGreaterThan(0);
  });

  it('tidslinjen merker Ptahhotep og Gargi i lineær skala og ingen i komprimert', () => {
    render(<TimelineView philosophers={philosophers} />);
    expect(markers()).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: /Ærlig lineær/ }));
    const marked = markers().map((t) => t.textContent);
    expect(marked).toHaveLength(2);
    expect(marked.some((t) => t?.startsWith('Ptahhotep'))).toBe(true);
    expect(marked.some((t) => t?.startsWith('Gargi'))).toBe(true);
  });
});
