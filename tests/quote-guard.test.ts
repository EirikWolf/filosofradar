import { describe, it, expect } from 'vitest';
import { extractQuotedPhrases, type QuotedPhrase } from '../src/lib/quotes';
import { QuoteRegisterSchema } from '../src/schemas/quoteRegister';
import registerJson from '../content/quotes/quote-register.json';
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';
import {
  EXPHIL_PROFILES,
  EXPHIL_DUELS,
  EXPHIL_FLASHCARDS,
  EXPHIL_QUIZ_QUESTIONS,
} from '../src/features/exphil/exphilData';
import { ETHICAL_DILEMMAS } from '../src/features/ethics/dilemmaData';
import { TOURS } from '../src/features/tours/tourData';

// HEL-01 (revisjon 2026-11-16) og beslutning B-010: sitatregelen i CLAUDE.md
// («Et sitat må ha verk og kilde») gjelder også dypdykk, Ex.phil, dilemmaer og
// turer. Denne testen er vakta: et nytt sitat uten kilde stopper `npm run check`.
//
// Fortellingene (storyData.ts) er foreløpig utenfor: der er diktede replikker
// lov, og hvilke av «…» som er ekte sitater, må avgjøres redaksjonelt først.

/**
 * Øvre grense for sitater som venter på kilde. Senk tallet når du flytter et
 * sitat fra «unsourced» til «sourced». Øk det aldri: et nytt sitat skal ha
 * kilde fra første dag.
 */
const UNSOURCED_CEILING = 0;

const register = QuoteRegisterSchema.parse(registerJson);

const scanned: QuotedPhrase[] = [
  ...extractQuotedPhrases(PHILOSOPHER_DEEP_DIVES, 'deepdive'),
  ...extractQuotedPhrases(EXPHIL_PROFILES, 'exphilProfiles'),
  ...extractQuotedPhrases(EXPHIL_DUELS, 'exphilDuels'),
  ...extractQuotedPhrases(EXPHIL_FLASHCARDS, 'exphilFlashcards'),
  ...extractQuotedPhrases(EXPHIL_QUIZ_QUESTIONS, 'exphilQuiz'),
  ...extractQuotedPhrases(ETHICAL_DILEMMAS, 'dilemmas'),
  ...extractQuotedPhrases(TOURS, 'tours'),
];
const scannedTexts = new Set(scanned.map((q) => q.text));

const sourcedTexts = register.sourced.map((q) => q.text);
const notQuoteTexts = register.notQuotes.map((q) => q.text);
const unsourcedTexts = register.unsourced.map((q) => q.text);
const classified = new Set([...sourcedTexts, ...notQuoteTexts, ...unsourcedTexts]);

describe('Sitatvakt for dypdykk, Ex.phil, dilemmaer og turer (HEL-01)', () => {
  it('fant tekst å kontrollere (vern mot et ødelagt filter)', () => {
    expect(scanned.length).toBeGreaterThan(100);
  });

  it('hver tekst i «…» er klassifisert i content/quotes/quote-register.json', () => {
    const missing = scanned.filter((q) => !classified.has(q.text)).map((q) => `${q.path}: «${q.text}»`);
    expect(
      missing,
      'Nye sitater må ha verk og kilde (legg dem under «sourced»). Er det ikke et sitat, legg det under «notQuotes» med begrunnelse.',
    ).toEqual([]);
  });

  it('ingen tekst står i mer enn én liste i registeret', () => {
    const all = [...sourcedTexts, ...notQuoteTexts, ...unsourcedTexts];
    const duplicates = all.filter((text, i) => all.indexOf(text) !== i);
    expect(duplicates).toEqual([]);
  });

  it('registeret har ingen foreldede oppføringer (teksten finnes fortsatt i innholdet)', () => {
    const stale = [...classified].filter((text) => !scannedTexts.has(text));
    expect(stale, 'Er et sitat skrevet om eller fjernet, skal oppføringen også fjernes.').toEqual([]);
  });

  it(`antall sitater uten kilde er ikke over taket (${UNSOURCED_CEILING})`, () => {
    expect(register.unsourced.length).toBeLessThanOrEqual(UNSOURCED_CEILING);
  });
});
