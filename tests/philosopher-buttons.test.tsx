// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExphilDuelsView } from '../src/features/exphil/ExphilDuelsView';
import { ExphilFlashcardsView } from '../src/features/exphil/ExphilFlashcardsView';

// ARK-01: knapper til filosofkort skal bare finnes for filosofer som har et kort.
// Før rettingen åpnet Kuhn-sidens «Filosofkort» Michel Foucault, og «Åpne Thomas
// Kuhn» åpnet Karl Popper.

afterEach(() => cleanup());

describe('Kuhn har ikke filosofkort (ARK-01)', () => {
  it('duellen Popper vs. Kuhn har bare filosofkort for Popper, og ingen sammenligning', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onCompare = vi.fn();
    render(<ExphilDuelsView onOpenPhilosopherCard={onOpen} onComparePhilosophers={onCompare} />);

    await user.click(screen.getByRole('button', { name: /Popper vs\. Kuhn/ }));

    const cardButtons = screen.getAllByRole('button', { name: /Filosofkort/ });
    expect(cardButtons).toHaveLength(1);
    await user.click(cardButtons[0]);
    expect(onOpen).toHaveBeenCalledWith('popper');
    expect(screen.queryByRole('button', { name: /Sammenligningskammeret/ })).toBeNull();
  });

  it('flashcardet om Kuhn tilbyr ikke å åpne et filosofkort', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<ExphilFlashcardsView onOpenPhilosopherCard={onOpen} />);

    // Bla til kortet som er knyttet til Thomas Kuhn
    for (let i = 0; i < 20 && !screen.queryByText('Thomas Kuhn'); i++) {
      await user.click(screen.getByRole('button', { name: /Neste/ }));
    }
    expect(screen.getByText('Thomas Kuhn')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Åpne Thomas Kuhn/ })).toBeNull();
  });
});
