import { z } from 'zod';
import type { ThemeId } from './philosopher';

export const QuizThemeWeightSchema = z.object({
  ethics: z.number().min(0).max(5).optional(),
  metaphysics: z.number().min(0).max(5).optional(),
  knowledge: z.number().min(0).max(5).optional(),
  politics: z.number().min(0).max(5).optional(),
  logic: z.number().min(0).max(5).optional(),
  mind: z.number().min(0).max(5).optional(),
  meaning: z.number().min(0).max(5).optional(),
  beauty: z.number().min(0).max(5).optional(),
});

export const QuizQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(5),
  context: z.string().optional(),
  themeWeights: QuizThemeWeightSchema.refine(
    (weights) => Object.values(weights).some((val) => typeof val === 'number' && val > 0),
    { message: 'Minst ett tema må ha en positiv vekt' }
  ),
});

export const QuizQuestionsSchema = z.array(QuizQuestionSchema).min(10).max(25);

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type QuizQuestions = z.infer<typeof QuizQuestionsSchema>;
export type QuizThemeWeights = Partial<Record<ThemeId, number>>;
