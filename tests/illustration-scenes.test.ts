import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';

// B-017: hvert tankeeksperiment i dypdykkene har nøyaktig én scene i
// content/illustrations/scenes.json, som genereringsskriptet på kitor lager bildet fra.
// Testen fanger et nytt tankeeksperiment uten scene, og en scene som peker på et
// eksperiment som er omdøpt eller fjernet.

type Scene = {
  file: string;
  replaces?: string;
  philosopherId: string;
  experiment: string;
  prompt: string;
};

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'content', 'illustrations', 'scenes.json'), 'utf8'),
) as { style: string; negative: string; width: number; height: number; scenes: Scene[] };

const experiments = Object.values(PHILOSOPHER_DEEP_DIVES).flatMap((dd) =>
  (dd.thoughtExperiments ?? []).map((t) => ({ philosopherId: dd.philosopherId, title: t.title, image: t.image })),
);

const key = (philosopherId: string, title: string) => `${philosopherId} / ${title}`;

describe('Illustrasjonsmanifestet', () => {
  it('finner tankeeksperimentene', () => {
    // Vakt mot et tomt filter: et tomt resultat skal ikke gi grønt.
    expect(experiments.length).toBeGreaterThanOrEqual(107);
  });

  it('har nøyaktig én scene per tankeeksperiment', () => {
    const sceneKeys = manifest.scenes.map((s) => key(s.philosopherId, s.experiment));
    const experimentKeys = experiments.map((e) => key(e.philosopherId, e.title));
    expect([...sceneKeys].sort()).toEqual([...experimentKeys].sort());
  });

  it('har unike filnavn i kebab-case', () => {
    const files = manifest.scenes.map((s) => s.file);
    expect(new Set(files).size).toBe(files.length);
    for (const f of files) expect(f).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('beholder filnavnet til illustrasjoner som finnes, eller sier hvilken den erstatter', () => {
    const byKey = new Map(manifest.scenes.map((s) => [key(s.philosopherId, s.experiment), s]));
    const mismatches = experiments
      .filter((e) => e.image)
      .filter((e) => {
        const scene = byKey.get(key(e.philosopherId, e.title));
        const current = e.image!.replace(/^\/images\/hooks\//, '').replace(/\.webp$/, '');
        return scene && scene.file !== current && scene.replaces !== current;
      })
      .map((e) => key(e.philosopherId, e.title));
    expect(mismatches).toEqual([]);
  });

  it('har prompter som beskriver et motiv uten sitater som kan bli tekst i bildet', () => {
    for (const s of manifest.scenes) {
      expect(s.prompt.length, s.file).toBeGreaterThan(150);
      expect(s.prompt.length, s.file).toBeLessThan(700);
      expect(s.prompt, s.file).not.toMatch(/["«»“”]/);
    }
  });
});
