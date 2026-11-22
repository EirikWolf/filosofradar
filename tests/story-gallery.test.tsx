// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { StoryGalleryModal } from '../src/features/story/StoryGalleryModal';

// ARK-02: galleriet fant tankeeksperimentet med en egen tittelregel, ulik den
// filosofkortet brukte. Nå bruker begge storyKey.

afterEach(() => cleanup());

function launch(experimentTitle: string) {
  const onSelectStory = vi.fn();
  render(<StoryGalleryModal onSelectStory={onSelectStory} onClose={() => {}} />);
  const card = screen.getByAltText(experimentTitle).closest('div.group');
  if (!card) throw new Error(`Fant ikke kortet for ${experimentTitle}`);
  fireEvent.click(card);
  return onSelectStory.mock.calls[0][0];
}

describe('Historiegalleriet', () => {
  it('starter Descartes-fortellingen med tankeeksperimentet fra dypdykket', () => {
    const selected = launch('Det onde demon-eksperimentet');
    expect(selected.philosopherId).toBe('descartes');
    expect(selected.experiment.title).toBe('Den onde demonen (Malin génie)');
    expect(selected.experiment.storyKey).toBe('descartes:det onde demon-eksperimentet');
  });

  it('starter Foot-fortellingen, som ikke har noe tankeeksperiment, med nøkkelen sin', () => {
    const selected = launch('Sporvognsproblemet (Trolley Problem)');
    expect(selected.philosopherId).toBe('foot');
    expect(selected.experiment.storyKey).toBe('foot:sporvognsproblemet (trolley problem)');
  });
});
