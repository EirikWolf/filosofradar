import { describe, it, expect } from 'vitest';
import { getStoryScript, BESPOKE_STORIES } from '../src/features/story/storyData';
import type { ThoughtExperiment } from '../src/features/deepdive/types';
import { storySpeech } from '../src/features/story/storySpeech';

describe('Story-modus: Idéen på 45 sekunder', () => {
  const targetPhilosophers = [
    { id: 'platon', name: 'Platon', title: 'Hulelignelsen' },
    { id: 'descartes', name: 'René Descartes', title: 'Det onde demon-eksperimentet' },
    { id: 'ibn-sina', name: 'Ibn Sina (Avicenna)', title: 'Den flyvende mannen' },
    { id: 'russell', name: 'Bertrand Russell', title: 'Russells tekanne' },
    { id: 'foot', name: 'Philippa Foot', title: 'Sporvognsproblemet (Trolley Problem)' },
    { id: 'aristoteles', name: 'Aristoteles', title: 'De fire årsakene (Marmorstatuen)' },
    { id: 'hume', name: 'David Hume', title: 'Biljardkulene (Årsak og virkning)' },
    { id: 'kant', name: 'Immanuel Kant', title: 'Morderen ved døren' },
    { id: 'nietzsche', name: 'Friedrich Nietzsche', title: 'Det gale mennesket med lykten' },
    { id: 'sartre', name: 'Jean-Paul Sartre', title: 'Kelneren på kaféen (Ond tro)' },
    { id: 'popper', name: 'Karl Popper', title: 'Svaneproblemet (Asymmetrien)' },
    { id: 'wittgenstein', name: 'Ludwig Wittgenstein', title: 'Bille i esken (Privatspråkargumentet)' },
    { id: 'foucault', name: 'Michel Foucault', title: 'Panoptikon' },
    { id: 'hobbes', name: 'Thomas Hobbes', title: 'Naturtilstanden (Alles krig mot alle)' },
    { id: 'zhuangzi', name: 'Zhuangzi', title: 'Sommerfugldrømmen' },
    { id: 'zhuangzi', name: 'Zhuangzi', title: 'Kokken Ding som parterer oksen' },
  ];

  it('har minst 15 kuraterte bespoke stories i databasen', () => {
    expect(Object.keys(BESPOKE_STORIES).length).toBeGreaterThanOrEqual(15);
  });

  targetPhilosophers.forEach(({ id, name, title }) => {
    it(`genererer et komplett 4-slide manus for ${name} (${title})`, () => {
      const dummyExp: ThoughtExperiment = {
        title,
        description: 'Testbeskrivelse av eksperimentet',
        takeaway: 'Eksamensfasit her',
      };

      const story = getStoryScript(id, name, dummyExp);

      expect(story).toBeDefined();
      expect(story.experimentTitle).toBe(title);
      expect(story.philosopherName).toBe(name);
      expect(story.slides).toHaveLength(4);

      // Sjekk de 4 kapitlene
      expect(story.slides[0].chapter).toBe('krok');
      expect(story.slides[1].chapter).toBe('konflikt');
      expect(story.slides[2].chapter).toBe('fasit');
      expect(story.slides[3].chapter).toBe('refleksjon');

      // Sjekk at hver slide har innhold
      story.slides.forEach((s, idx) => {
        expect(s.headline.length).toBeGreaterThan(3);
        expect(s.body.length).toBeGreaterThan(20);
        expect(s.durationSeconds).toBeGreaterThan(0);
        expect(s.chapterNumber).toBe(idx + 1);
      });

      // Total varighet skal være ca 45 sekunder
      const sumDuration = story.slides.reduce((acc, s) => acc + s.durationSeconds, 0);
      expect(sumDuration).toBeGreaterThanOrEqual(40);
      expect(sumDuration).toBeLessThanOrEqual(50);
    });
  });

  it('håndterer ukjente tankeeksperimenter via automatisk 4-slide fallback-generator', () => {
    const unknownExp: ThoughtExperiment = {
      title: 'Et ukjent tankeeksperiment',
      description: 'Dette er et eksperiment som ikke har ferdigskrevet manus.',
      takeaway: 'Viktig lærdom for studenten.',
    };

    const story = getStoryScript('ukjent-id', 'Ukjent Filosof', unknownExp);

    expect(story).toBeDefined();
    expect(story.slides).toHaveLength(4);
    expect(story.slides[0].headline).toBe('Et ukjent tankeeksperiment');
    expect(story.slides[1].headline).toContain('Ukjent Filosof');
    expect(story.slides[2].body).toContain('Viktig lærdom for studenten.');
    expect(story.slides[3].chapter).toBe('refleksjon');
  });

  it('håndterer fortellerstemme (storySpeech) trygt', () => {
    // Sjekk at storySpeech modulen kan importeres og kalles uten feil
    expect(typeof storySpeech.toggle).toBe('function');
    expect(typeof storySpeech.stop).toBe('function');
    const initial = storySpeech.enabled;
    const toggled = storySpeech.toggle();
    expect(toggled).toBe(!initial);
    // Tilbakestill
    storySpeech.toggle();
  });
});
