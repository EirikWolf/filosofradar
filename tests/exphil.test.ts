import { describe, it, expect } from 'vitest';
import {
  EXPHIL_PHILOSOPHER_IDS,
  EXPHIL_PROFILES,
  EXPHIL_DUELS,
  EXPHIL_FLASHCARDS,
  EXPHIL_QUIZ_QUESTIONS,
} from '../src/features/exphil/exphilData';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];
const philosopherIdSet = new Set(philosophers.map((p) => p.id));

describe('Examen Philosophicum (Ex.phil) Modul', () => {
  describe('Pensumliste & Idé-dekning', () => {
    it('har minst 20 sentrale tenkere på ex.phil-pensum', () => {
      expect(EXPHIL_PHILOSOPHER_IDS.size).toBeGreaterThanOrEqual(20);
    });

    it('samtlige tenkere i EXPHIL_PHILOSOPHER_IDS finnes i datasettet', () => {
      for (const id of EXPHIL_PHILOSOPHER_IDS) {
        expect(
          philosopherIdSet.has(id),
          `Filosofen "${id}" på ex.phil-pensum finnes ikke i philosophers.json!`
        ).toBe(true);
      }
    });

    it('dekker de tre klassiske pilarene: etikk, erkjennelse og menneskesyn', () => {
      const pillars = new Set(Object.values(EXPHIL_PROFILES).map((p) => p.pillar));
      expect(pillars.has('etikk')).toBe(true);
      expect(pillars.has('erkjennelse')).toBe(true);
      expect(pillars.has('menneskesyn')).toBe(true);
    });

    it('hver profil har sensors nøkkelord, eksamensfelle og kjernepoeng', () => {
      for (const [id, profile] of Object.entries(EXPHIL_PROFILES)) {
        expect(profile.philosopherId).toBe(id);
        expect(profile.coreTakeaway.length).toBeGreaterThan(15);
        expect(profile.examKeywords.length).toBeGreaterThanOrEqual(2);
        expect(profile.commonPitfall.length).toBeGreaterThan(15);
      }
    });
  });

  describe('Eksamensduellene', () => {
    it('har minst 5 klassiske eksamensdueller', () => {
      expect(EXPHIL_DUELS.length).toBeGreaterThanOrEqual(5);
    });

    it('alle dueller refererer til eksisterende filosofer i datasettet', () => {
      for (const duel of EXPHIL_DUELS) {
        expect(philosopherIdSet.has(duel.sideA.philosopherId)).toBe(true);
        expect(philosopherIdSet.has(duel.sideB.philosopherId)).toBe(true);
        expect(duel.examPrompt.length).toBeGreaterThan(20);
        expect(duel.clarifications.length).toBeGreaterThanOrEqual(1);
        expect(duel.gradingAdvice.length).toBeGreaterThan(20);
        expect(duel.sideA.keyArguments.length).toBeGreaterThanOrEqual(2);
        expect(duel.sideB.keyArguments.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('inkluderer klassikere som Kant vs. Aristoteles og Descartes vs. Hume', () => {
      const duelIds = EXPHIL_DUELS.map((d) => d.id);
      expect(duelIds).toContain('kant-vs-aristoteles');
      expect(duelIds).toContain('descartes-vs-hume');
      expect(duelIds).toContain('popper-vs-kuhn');
    });
  });

  describe('Flashcards (Begrepsdrill)', () => {
    it('har minst 10 essensielle begrepskort', () => {
      expect(EXPHIL_FLASHCARDS.length).toBeGreaterThanOrEqual(10);
    });

    it('hvert flashcard har konsept, definisjon, forklaring og eksamenstips', () => {
      for (const card of EXPHIL_FLASHCARDS) {
        expect(card.id).toBeTruthy();
        expect(card.concept).toBeTruthy();
        expect(card.definition.length).toBeGreaterThan(15);
        expect(card.explanation.length).toBeGreaterThan(15);
        expect(card.examTip.length).toBeGreaterThan(15);
        if (card.philosopherId) {
          expect(philosopherIdSet.has(card.philosopherId)).toBe(true);
        }
      }
    });
  });

  describe('Eksamens-quiz', () => {
    it('inneholder minst 5 flervalgsspørsmål med fire alternativer og begrunnelse', () => {
      expect(EXPHIL_QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(5);
      for (const q of EXPHIL_QUIZ_QUESTIONS) {
        expect(q.options.length).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        expect(q.explanation.length).toBeGreaterThan(20);
        if (q.relatedPhilosopherId) {
          expect(philosopherIdSet.has(q.relatedPhilosopherId)).toBe(true);
        }
      }
    });
  });
});
