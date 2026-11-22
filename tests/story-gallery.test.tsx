// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoryGalleryModal } from '../src/features/story/StoryGalleryModal';

// ARK-02: galleriet fant tankeeksperimentet med en egen tittelregel, ulik den
// filosofkortet brukte. Nå bruker begge storyKey.

afterEach(() => cleanup());

function launch(experimentTitle: string) {
  const onSelectStory = vi.fn();
  render(<StoryGalleryModal onSelectStory={onSelectStory} onClose={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: experimentTitle }));
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

  it('lar en fortelling startes med tastaturet', async () => {
    // Kortene var <div onClick> og kunne bare startes med mus.
    const user = userEvent.setup();
    const onSelectStory = vi.fn();
    render(<StoryGalleryModal onSelectStory={onSelectStory} onClose={() => {}} />);
    const button = screen.getByRole('button', { name: 'Hulelignelsen' });
    button.focus();
    await user.keyboard('{Enter}');
    expect(onSelectStory).toHaveBeenCalledTimes(1);
    expect(onSelectStory.mock.calls[0][0].experiment.storyKey).toBe('platon:hulelignelsen');
  });

  it('har én knapp per fortelling, med fortellingens tittel som navn', () => {
    render(<StoryGalleryModal onSelectStory={() => {}} onClose={() => {}} />);
    for (const title of ['Det onde demon-eksperimentet', 'Sporvognsproblemet (Trolley Problem)', 'Panoptikon']) {
      expect(screen.getAllByRole('button', { name: title })).toHaveLength(1);
    }
  });
});
