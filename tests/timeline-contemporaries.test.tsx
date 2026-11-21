// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { TimelineView } from '../src/features/timeline/TimelineView';

// Panelet «Hvem levde samtidig?» sa «Ingen andre av de 21 filosofene» lenge etter at
// det ble 80. Antallet skal komme fra dataene.

const philosophers = philosophersData as Philosopher[];
afterEach(() => cleanup());

function select(name: string) {
  const bar = document.querySelector(`svg g[role="button"][aria-label^="${name} ("]`);
  if (!bar) throw new Error(`Fant ikke stolpen for ${name}`);
  fireEvent.click(bar);
}

describe('Hvem levde samtidig?', () => {
  it('oppgir det faktiske antallet filosofer når ingen levde samtidig', () => {
    render(<TimelineView philosophers={philosophers} />);
    // Ptahhotep (ca. 2400 f.Kr.) er den eneste som levde så tidlig.
    select('Ptahhotep');
    expect(screen.getByText(`Ingen andre av de ${philosophers.length} filosofene hadde overlappende levetid.`)).toBeTruthy();
  });

  it('følger antallet i dataene, ikke et fast tall', () => {
    const few = philosophers.filter((p) => ['ptahhotep', 'sokrates', 'platon'].includes(p.id));
    render(<TimelineView philosophers={few} />);
    select('Ptahhotep');
    expect(screen.getByText('Ingen andre av de 3 filosofene hadde overlappende levetid.')).toBeTruthy();
  });
});
