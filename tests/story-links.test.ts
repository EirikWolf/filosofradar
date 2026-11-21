import { describe, it, expect } from 'vitest';
import { BESPOKE_STORIES, getStoryScript } from '../src/features/story/storyData';
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';

// ARK-02: fortellinger ble koblet til tankeeksperimenter på tittel og delstreng.
// «Den onde demonen» og «Det onde demon-eksperimentet» traff ikke hverandre, så
// Descartes' kuraterte fortelling ble aldri vist fra filosofkortet. Nå peker hvert
// tankeeksperiment på fortellingen sin med storyKey.

// Fortellinger som bare finnes i galleriet, fordi personen ikke er på radaren (B-014).
const GALLERY_ONLY_STORIES = new Set(['foot:sporvognsproblemet (trolley problem)']);

const experiments = Object.values(PHILOSOPHER_DEEP_DIVES).flatMap((dd) =>
  (dd.thoughtExperiments ?? []).map((te) => ({ philosopherId: dd.philosopherId, te })),
);

describe('Koblingen mellom tankeeksperimenter og fortellinger', () => {
  it('peker bare på fortellinger som finnes, og som hører til samme filosof', () => {
    const wrong = experiments
      .filter(({ te }) => te.storyKey !== undefined)
      .filter(({ philosopherId, te }) => {
        const story = BESPOKE_STORIES[te.storyKey as string];
        return !story || story.philosopherId !== philosopherId;
      })
      .map(({ philosopherId, te }) => `${philosopherId} / ${te.title} → ${te.storyKey}`);
    expect(wrong).toEqual([]);
  });

  it('gir hver kuratert fortelling nøyaktig ett tankeeksperiment, eller står i galleriet alene', () => {
    const uses = new Map<string, number>();
    for (const { te } of experiments) {
      if (te.storyKey) uses.set(te.storyKey, (uses.get(te.storyKey) ?? 0) + 1);
    }
    const problems = Object.keys(BESPOKE_STORIES)
      .filter((key) => !GALLERY_ONLY_STORIES.has(key))
      .filter((key) => uses.get(key) !== 1)
      .map((key) => `${key}: ${uses.get(key) ?? 0} tankeeksperimenter`);
    expect(problems).toEqual([]);
    for (const key of GALLERY_ONLY_STORIES) expect(BESPOKE_STORIES[key], key).toBeDefined();
  });

  it.each([
    ['descartes', 'Den onde demonen (Malin génie)', 'Det onde demon-eksperimentet'],
    ['ibn-sina', 'Den flytende mannen (Bevissthetens uavhengighet)', 'Den flyvende mannen'],
  ])('viser den kuraterte fortellingen fra filosofkortet: %s', (id, experimentTitle, storyTitle) => {
    const te = PHILOSOPHER_DEEP_DIVES[id].thoughtExperiments?.find((t) => t.title === experimentTitle);
    if (!te) throw new Error(`Fant ikke ${experimentTitle}`);
    const story = getStoryScript(id, 'Navn', te);
    expect(story.experimentTitle).toBe(storyTitle);
  });

  it('bruker ikke tittelen til å koble: et tankeeksperiment uten storyKey får den genererte fortellingen', () => {
    const story = getStoryScript('platon', 'Platon', {
      title: 'Hulelignelsen',
      description: 'Beskrivelse',
      takeaway: 'Poeng',
    });
    expect(story.slides[0].subheadline).toBe('Et berømt tankeeksperiment fra Platon');
  });
});
