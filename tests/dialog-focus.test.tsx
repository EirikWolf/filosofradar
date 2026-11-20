// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
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
// TST-02 (revisjon 2026-11-17): testene sjekker også HVOR fokus havner etter
// Tab og Shift+Tab, og at Escape lukker dialogen.

const philosophers = philosophersData as Philosopher[];
const noop = () => {};

const platonExperiment = (PHILOSOPHER_DEEP_DIVES['platon'].thoughtExperiments ?? [])[0] as ThoughtExperiment;

const dialogs: Array<{ name: string; element: (onClose: () => void) => React.ReactElement }> = [
  {
    name: 'TourSelectModal (Guidede turer)',
    element: (onClose) => <TourSelectModal philosophers={philosophers} onSelectTour={noop} onClose={onClose} />,
  },
  {
    name: 'PhilosopherComparison (Sammenligning)',
    element: (onClose) => (
      <PhilosopherComparison
        initialIds={['platon', 'aristoteles']}
        allPhilosophers={philosophers}
        onClose={onClose}
        onOpenPhilosopherCard={noop}
      />
    ),
  },
  {
    name: 'StoryModal (Historie)',
    element: (onClose) => (
      <StoryModal philosopherId="platon" philosopherName="Platon" experiment={platonExperiment} onClose={onClose} />
    ),
  },
  {
    name: 'StoryGalleryModal (Historiegalleri)',
    element: (onClose) => <StoryGalleryModal onSelectStory={noop} onClose={onClose} />,
  },
  {
    name: 'PhilosopherCard (Filosofkort, regresjon for UU-01)',
    element: (onClose) => (
      <PhilosopherCard
        philosopher={philosophers.find((p) => p.id === 'platon') as Philosopher}
        allPhilosophers={philosophers}
        onClose={onClose}
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

// Samme utvalg som useDialogFocus. jsdom bruker ikke Tailwind, så alt regnes som synlig.
function focusableIn(dialog: HTMLElement): HTMLElement[] {
  return Array.from(
    dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
  ).filter((el) => !el.hasAttribute('disabled') && !el.closest('[hidden], [inert]'));
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
    render(element(noop));
    await settle();

    expect(getModalDialog().contains(document.activeElement)).toBe(true);
  });

  it('holder fokus inne i dialogen når man tabber forbi siste element', async () => {
    const user = userEvent.setup();
    createTrigger();
    render(element(noop));
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
    render(element(noop));
    await settle();

    const dialog = getModalDialog();
    await user.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('går fra siste til første element med Tab', async () => {
    const user = userEvent.setup();
    createTrigger();
    render(element(noop));
    await settle();

    const elements = focusableIn(getModalDialog());
    expect(elements.length).toBeGreaterThan(1);
    elements[elements.length - 1].focus();
    await user.tab();
    expect(document.activeElement).toBe(elements[0]);
  });

  it('går fra første til siste element med Shift+Tab', async () => {
    const user = userEvent.setup();
    createTrigger();
    render(element(noop));
    await settle();

    const elements = focusableIn(getModalDialog());
    expect(document.activeElement).toBe(elements[0]);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(elements[elements.length - 1]);
  });

  it('lukkes med Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    createTrigger();
    render(element(onClose));
    await settle();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('gir fokus tilbake til utløseren når dialogen lukkes', async () => {
    const trigger = createTrigger();
    const { unmount } = render(element(noop));
    await settle();
    // Uten denne sjekken ville testen vært grønn selv om fokus aldri forlot utløseren.
    expect(getModalDialog().contains(document.activeElement)).toBe(true);

    unmount();
    expect(document.activeElement).toBe(trigger);
  });
});

describe('Nestede dialoger: historie åpnet fra Filosofkortet', () => {
  function renderCard(onClose: () => void = noop) {
    return render(
      <PhilosopherCard
        philosopher={philosophers.find((p) => p.id === 'platon') as Philosopher}
        allPhilosophers={philosophers}
        onClose={onClose}
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

  async function findPlayButton(): Promise<HTMLButtonElement> {
    return waitFor(() => {
      const button = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Se idéen på 45 sek'),
      );
      if (!button) throw new Error('Fant ingen «Se idéen på 45 sek»-knapp i kortet');
      return button;
    });
  }

  it('Escape lukker først historien og så kortet', async () => {
    // Kortet og historien lytter begge på Escape. Ett trykk skal bare lukke
    // den øverste, ellers mister brukeren kortet når hen lukker historien.
    const user = userEvent.setup();
    const onCloseCard = vi.fn();
    createTrigger();
    renderCard(onCloseCard);
    await settle();

    await user.click(await findPlayButton());
    await waitFor(() => getStoryDialog());

    await user.keyboard('{Escape}');
    await waitFor(() => expect(() => getStoryDialog()).toThrow());
    expect(onCloseCard).not.toHaveBeenCalled();

    await user.keyboard('{Escape}');
    expect(onCloseCard).toHaveBeenCalledTimes(1);
  });

  it('bare den øverste dialogen (historien) fanger Tab', async () => {
    const user = userEvent.setup();
    createTrigger();
    renderCard();
    await settle();

    // Dypdykket og historien lastes først når de trengs (kodesplitting), så vi
    // venter til de faktisk er på plass i stedet for en fast tid.
    const playButton = await findPlayButton();
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
