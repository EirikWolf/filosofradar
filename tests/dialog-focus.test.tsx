// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';
import type { ThoughtExperiment } from '../src/features/deepdive/types';
import { TourSelectModal } from '../src/features/tours/TourSelectModal';
import { PhilosopherComparison } from '../src/features/comparison/PhilosopherComparison';
import { StoryModal } from '../src/features/story/StoryModal';
import { StoryGalleryModal } from '../src/features/story/StoryGalleryModal';
import { PhilosopherCard } from '../src/features/card/PhilosopherCard';

// HEL-02 (revisjon 2026-11-16): Alle dialoger med aria-modal="true" skal
// (1) flytte fokus inn ved åpning, (2) holde Tab inne i dialogen og
// (3) gi fokus tilbake til knappen som åpnet dem. WCAG 2.4.3 Fokusrekkefølge.

const philosophers = philosophersData as Philosopher[];
const noop = () => {};

const platonExperiment = (PHILOSOPHER_DEEP_DIVES['platon'].thoughtExperiments ?? [])[0] as ThoughtExperiment;

const dialogs: Array<{ name: string; element: () => React.ReactElement }> = [
  {
    name: 'TourSelectModal (Guidede turer)',
    element: () => <TourSelectModal philosophers={philosophers} onSelectTour={noop} onClose={noop} />,
  },
  {
    name: 'PhilosopherComparison (Sammenligning)',
    element: () => (
      <PhilosopherComparison
        initialIds={['platon', 'aristoteles']}
        allPhilosophers={philosophers}
        onClose={noop}
        onOpenPhilosopherCard={noop}
      />
    ),
  },
  {
    name: 'StoryModal (Historie)',
    element: () => (
      <StoryModal philosopherId="platon" philosopherName="Platon" experiment={platonExperiment} onClose={noop} />
    ),
  },
  {
    name: 'StoryGalleryModal (Historiegalleri)',
    element: () => <StoryGalleryModal onSelectStory={noop} onClose={noop} />,
  },
  {
    name: 'PhilosopherCard (Filosofkort, regresjon for UU-01)',
    element: () => (
      <PhilosopherCard
        philosopher={philosophers.find((p) => p.id === 'platon') as Philosopher}
        allPhilosophers={philosophers}
        onClose={noop}
        onSelectPhilosopher={noop}
        onStartCompare={noop}
      />
    ),
  },
];

function getModalDialog(): HTMLElement {
  const dialog = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]');
  if (!dialog) throw new Error('Fant ingen dialog med aria-modal="true"');
  return dialog;
}

/** Lager en knapp utenfor dialogen som spiller rollen som utløser. */
function createTrigger(): HTMLButtonElement {
  const trigger = document.createElement('button');
  trigger.textContent = 'Åpne dialog';
  document.body.appendChild(trigger);
  trigger.focus();
  return trigger;
}

// Fokus kan flyttes med en kort forsinkelse (animasjon), så vi venter litt.
async function settle(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
  });
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

describe.each(dialogs)('Fokushåndtering i $name', ({ element }) => {
  it('flytter fokus inn i dialogen ved åpning', async () => {
    createTrigger();
    render(element());
    await settle();

    expect(getModalDialog().contains(document.activeElement)).toBe(true);
  });

  it('holder fokus inne i dialogen når man tabber forbi siste element', async () => {
    const user = userEvent.setup();
    createTrigger();
    render(element());
    await settle();

    const dialog = getModalDialog();
    const focusableCount = dialog.querySelectorAll('button, [href], input, select, textarea').length;
    for (let i = 0; i < focusableCount + 2; i++) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it('holder fokus inne i dialogen med Shift+Tab', async () => {
    const user = userEvent.setup();
    createTrigger();
    render(element());
    await settle();

    const dialog = getModalDialog();
    await user.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('gir fokus tilbake til utløseren når dialogen lukkes', async () => {
    const trigger = createTrigger();
    const { unmount } = render(element());
    await settle();
    // Uten denne sjekken ville testen vært grønn selv om fokus aldri forlot utløseren.
    expect(getModalDialog().contains(document.activeElement)).toBe(true);

    unmount();
    expect(document.activeElement).toBe(trigger);
  });
});

describe('Nestede dialoger: historie åpnet fra Filosofkortet', () => {
  function renderCard() {
    return render(
      <PhilosopherCard
        philosopher={philosophers.find((p) => p.id === 'platon') as Philosopher}
        allPhilosophers={philosophers}
        onClose={noop}
        onSelectPhilosopher={noop}
        onStartCompare={noop}
      />,
    );
  }

  function getStoryDialog(): HTMLElement {
    const story = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"][aria-modal="true"]')).find(
      (d) => (d.getAttribute('aria-label') ?? '').startsWith('Story:'),
    );
    if (!story) throw new Error('Fant ingen historie-dialog');
    return story;
  }

  it('bare den øverste dialogen (historien) fanger Tab', async () => {
    const user = userEvent.setup();
    createTrigger();
    renderCard();
    await settle();

    // Dypdykket og historien lastes først når de trengs (kodesplitting), så vi
    // venter til de faktisk er på plass i stedet for en fast tid.
    const playButton = await waitFor(() => {
      const button = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Se idéen på 45 sek'),
      );
      if (!button) throw new Error('Fant ingen «Se idéen på 45 sek»-knapp i kortet');
      return button;
    });
    await user.click(playButton);

    const story = await waitFor(() => getStoryDialog());
    await waitFor(() => expect(story.contains(document.activeElement)).toBe(true));
    expect(story.contains(document.activeElement)).toBe(true);
    // Fokus skal både bli i historien OG bevege seg. Kjemper to fokusfeller,
    // blir fokus stående fast på historiens første knapp.
    const visited = new Set<Element | null>();
    for (let i = 0; i < 15; i++) {
      await user.tab();
      expect(story.contains(document.activeElement)).toBe(true);
      visited.add(document.activeElement);
    }
    expect(visited.size).toBeGreaterThan(1);
  });
});
