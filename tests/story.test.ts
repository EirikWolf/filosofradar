import { describe, it, expect } from 'vitest';
import { getStoryScript, BESPOKE_STORIES } from '../src/features/story/storyData';
import type { ThoughtExperiment } from '../src/features/deepdive/types';
import { storySpeech } from '../src/features/story/storySpeech';

describe('Story-modus: Idéen på 45 sekunder', () => {
  // Alle kuraterte fortellinger, slått opp med nøkkelen slik filosofkortet og galleriet
  // gjør (ARK-02). Før ble 16 av dem slått opp på tittel, som ikke lenger brukes.
  const curated = Object.entries(BESPOKE_STORIES).map(([key, story]) => ({
    key,
    id: story.philosopherId,
    name: story.philosopherName,
    title: story.experimentTitle,
  }));

  it('har minst 15 kuraterte bespoke stories i databasen', () => {
    expect(Object.keys(BESPOKE_STORIES).length).toBeGreaterThanOrEqual(15);
  });

  curated.forEach(({ key, id, name, title }) => {
    it(`genererer et komplett 4-slide manus for ${name} (${title})`, () => {
      const dummyExp: ThoughtExperiment = {
        title,
        storyKey: key,
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
