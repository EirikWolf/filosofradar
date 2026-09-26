import { describe, it, expect } from 'vitest';
import {
  cosineSimilarity,
  calculateUserThemeScores,
  findTopMatches,
  generateMatchExplanation,
  getUserThemeVector,
  getPhilosopherThemeVector,
} from '../src/lib/similarity';
import type { Philosopher, ThemeId } from '../src/schemas/philosopher';
import type { QuizQuestion } from '../src/schemas/quiz';
import testQuestions from '../src/generated/quizQuestions.json';
import testPhilosophers from '../src/generated/philosophers.json';

describe('Cosine Similarity (cosinuslikhet)', () => {
  it('gir 1.0 for to identiske vektorer', () => {
    const v1 = [5, 4, 3, 2, 1, 0, 4, 2];
    const v2 = [5, 4, 3, 2, 1, 0, 4, 2];
    expect(cosineSimilarity(v1, v2)).toBeCloseTo(1.0, 5);
  });

  it('gir 1.0 for proporsjonale/skalerte vektorer (peker i nøyaktig samme retning)', () => {
    const v1 = [1, 2, 3, 4, 5, 0, 0, 0];
    const v2 = [2, 4, 6, 8, 10, 0, 0, 0];
    expect(cosineSimilarity(v1, v2)).toBeCloseTo(1.0, 5);
  });

  it('gir 0.0 for vinkelrette (ortogonale) vektorer uten felles interesser', () => {
    const v1 = [5, 5, 0, 0, 0, 0, 0, 0];
    const v2 = [0, 0, 5, 5, 0, 0, 0, 0];
    expect(cosineSimilarity(v1, v2)).toBe(0);
  });

  it('håndterer nullvektorer trygt uten å kaste feil eller dele på null', () => {
    const zero = [0, 0, 0, 0, 0, 0, 0, 0];
    const normal = [5, 3, 2, 1, 4, 2, 1, 5];
    expect(cosineSimilarity(zero, normal)).toBe(0);
    expect(cosineSimilarity(zero, zero)).toBe(0);
  });

  it('håndterer tomme vektorer eller ulike lengder trygt', () => {
    expect(cosineSimilarity([], [])).toBe(0);
    expect(cosineSimilarity([1, 2], [1, 2, 3])).toBe(0);
  });
});

describe('calculateUserThemeScores (dynamisk voksende radar)', () => {
  const sampleQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'Etikk-spørsmål',
      themeWeights: { ethics: 2, politics: 1 },
    },
    {
      id: 'q2',
      question: 'Metafysikk-spørsmål',
      themeWeights: { metaphysics: 2 },
    },
  ];

  it('gir 0 for alle temaer når ingen spørsmål er besvart', () => {
    const scores = calculateUserThemeScores({}, sampleQuestions);
    expect(scores.ethics).toBe(0);
    expect(scores.metaphysics).toBe(0);
  });

  it('øker kun de relevante temaene når et spørsmål besvares', () => {
    const scores = calculateUserThemeScores({ q1: 5 }, sampleQuestions);
    expect(scores.ethics).toBe(5);
    expect(scores.politics).toBe(5);
    expect(scores.metaphysics).toBe(0);
  });

  it('skalerer riktig ved maks svar på hele quizen', () => {
    const allAnswers: Record<string, number> = {};
    for (const q of (testQuestions as QuizQuestion[])) {
      allAnswers[q.id] = 5;
    }
    const scores = calculateUserThemeScores(allAnswers, testQuestions as QuizQuestion[]);
    // Alle temaer bør ha maks skår (5.0)
    for (const val of Object.values(scores)) {
      expect(val).toBe(5.0);
    }
  });

  it('skalerer riktig ved minimumsvar (1) på hele quizen', () => {
    const allAnswers: Record<string, number> = {};
    for (const q of (testQuestions as QuizQuestion[])) {
      allAnswers[q.id] = 1;
    }
    const scores = calculateUserThemeScores(allAnswers, testQuestions as QuizQuestion[]);
    for (const val of Object.values(scores)) {
      expect(val).toBe(1.0);
    }
  });
});

describe('findTopMatches og forklaringer', () => {
  const philosophers = testPhilosophers as Philosopher[];

  it('finner nøyaktig 3 matcher sortert synkende etter likhet', () => {
    const userScores: Record<ThemeId, number> = {
      ethics: 5,
      metaphysics: 1,
      knowledge: 5,
      politics: 4,
      logic: 4,
      mind: 3,
      meaning: 2,
      beauty: 1,
    };

    const matches = findTopMatches(userScores, philosophers, 3);
    expect(matches).toHaveLength(3);
    expect(matches[0].similarity).toBeGreaterThanOrEqual(matches[1].similarity);
    expect(matches[1].similarity).toBeGreaterThanOrEqual(matches[2].similarity);
    expect(matches[0].percentage).toBeGreaterThanOrEqual(matches[1].percentage);
  });

  it('matcher Sokrates som topp-kandidat ved en ren sokratisk profil (etikk og erkjennelse)', () => {
    const sokrates = philosophers.find((p) => p.id === 'sokrates')!;
    const userScores = { ...sokrates.themes };

    const matches = findTopMatches(userScores, philosophers, 3);
    expect(matches[0].philosopher.id).toBe('sokrates');
    expect(matches[0].percentage).toBe(100);
    expect(matches[0].explanation).toContain('etikk');
  });

  it('genererer en meningsfull forklaring med delte temaer', () => {
    const sokrates = philosophers.find((p) => p.id === 'sokrates')!;
    const explanation = generateMatchExplanation(
      { ethics: 5, knowledge: 5, metaphysics: 0, politics: 0, logic: 0, mind: 0, meaning: 0, beauty: 0 },
      sokrates
    );
    expect(explanation).toBeTruthy();
    expect(explanation.length).toBeGreaterThan(20);
  });

  it('henter riktige temavektorer', () => {
    const sokrates = philosophers.find((p) => p.id === 'sokrates')!;
    const vec = getPhilosopherThemeVector(sokrates);
    expect(vec).toHaveLength(8);
    expect(getUserThemeVector(sokrates.themes)).toEqual(vec);
  });
});
