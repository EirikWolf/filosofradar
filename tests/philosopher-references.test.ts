import { describe, it, expect } from 'vitest';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';
import { BESPOKE_STORIES } from '../src/features/story/storyData';
import { EXPHIL_PROFILES, EXPHIL_DUELS, EXPHIL_FLASHCARDS, EXPHIL_QUIZ_QUESTIONS } from '../src/features/exphil/exphilData';
import { ETHICAL_DILEMMAS, calculateEthicsProfile } from '../src/features/ethics/dilemmaData';
import { TOURS } from '../src/features/tours/tourData';
import { NOT_IN_RADAR, isKnownPhilosopherId } from '../src/lib/philosopherIndex';

// ARK-01 (revisjon 2026-11-17): referanser i TS-innholdet pekte på filosofer som
// ikke finnes (f.eks. «mill»), eller på feil person (Kuhn-kortene åpnet Foucault
// og Popper). Denne testen krever at hver philosopherId enten finnes i content/
// eller står på lista over personer som omtales, men ikke er med i radaren.

const philosophers = philosophersData as Philosopher[];
const nameById = new Map(philosophers.map((p) => [p.id, p.name]));

interface Ref {
  path: string;
  id: string;
  name?: string;
}

function collect(value: unknown, path: string, out: Ref[]): void {
  if (Array.isArray(value)) {
    value.forEach((v, i) => collect(v, `${path}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.philosopherId === 'string') {
      out.push({
        path,
        id: obj.philosopherId,
        name: typeof obj.philosopherName === 'string' ? obj.philosopherName : undefined,
      });
    }
    for (const [k, v] of Object.entries(obj)) collect(v, `${path}.${k}`, out);
  }
}

const refs: Ref[] = [];
collect(PHILOSOPHER_DEEP_DIVES, 'deepdive', refs);
collect(BESPOKE_STORIES, 'stories', refs);
collect(EXPHIL_PROFILES, 'exphilProfiles', refs);
collect(EXPHIL_DUELS, 'exphilDuels', refs);
collect(EXPHIL_FLASHCARDS, 'exphilFlashcards', refs);
collect(EXPHIL_QUIZ_QUESTIONS, 'exphilQuiz', refs);
collect(ETHICAL_DILEMMAS, 'dilemmas', refs);
collect(TOURS, 'tours', refs);

describe('Filosof-referanser i innholdet (ARK-01)', () => {
  it('fant referanser å kontrollere (vern mot et ødelagt filter)', () => {
    expect(refs.length).toBeGreaterThan(150);
  });

  it('hver philosopherId finnes i content/ eller står på NOT_IN_RADAR', () => {
    const unknown = refs.filter((r) => !nameById.has(r.id) && !(r.id in NOT_IN_RADAR)).map((r) => `${r.path}: ${r.id}`);
    expect(unknown).toEqual([]);
  });

  it('philosopherName stemmer med personen ID-en peker på', () => {
    const wrong = refs
      .filter((r) => r.name !== undefined)
      .filter((r) => {
        const expected = nameById.get(r.id) ?? NOT_IN_RADAR[r.id];
        // Tåler ulik bruk av mellomrom («G.W.F.» / «G. W. F.») og lengre navneformer
        // («Augustin av Hippo»), men ikke en annen person.
        const norm = (s: string) => s.replace(/[\s.]/g, '').toLowerCase();
        return expected !== undefined && !norm(r.name as string).startsWith(norm(expected));
      })
      .map((r) => `${r.path}: ${r.id} = «${nameById.get(r.id) ?? NOT_IN_RADAR[r.id]}», men teksten sier «${r.name}»`);
    expect(wrong).toEqual([]);
  });

  it('NOT_IN_RADAR inneholder bare personer som ikke finnes i content/ og som faktisk omtales', () => {
    const inContent = Object.keys(NOT_IN_RADAR).filter((id) => nameById.has(id));
    const unused = Object.keys(NOT_IN_RADAR).filter((id) => !refs.some((r) => r.id === id) && id !== 'mill');
    expect(inContent).toEqual([]);
    expect(unused).toEqual([]);
  });

  it('etikk-tvillingen er en kjent filosof eller står på NOT_IN_RADAR', () => {
    const twin = calculateEthicsProfile({}).philosopherTwinId;
    expect(isKnownPhilosopherId(twin) || twin in NOT_IN_RADAR).toBe(true);
  });

  it('isKnownPhilosopherId skiller filosofer i radaren fra andre', () => {
    expect(isKnownPhilosopherId('kant')).toBe(true);
    expect(isKnownPhilosopherId('mill')).toBe(false);
    expect(isKnownPhilosopherId(undefined)).toBe(false);
  });
});
