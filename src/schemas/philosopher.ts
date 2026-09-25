import { z } from 'zod';

export const THEME_IDS = [
  'ethics',
  'metaphysics',
  'knowledge',
  'politics',
  'logic',
  'mind',
  'meaning',
  'beauty',
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const TRADITION_IDS = [
  'chinese',
  'japanese-korean',
  'indian',
  'greek-roman',
  'islamic-jewish',
  'european',
  'nordic',
  'americas',
  'african',
] as const;

export type TraditionId = (typeof TRADITION_IDS)[number];

export const YearSchema = z.object({
  year: z.number().int(),
  approx: z.boolean().default(false),
});

export const FloruitSchema = z.object({
  from: z.number().int(),
  to: z.number().int(),
});

export const KeyIdeaSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(10).max(450),
});

export const QuoteSchema = z.object({
  text: z.string().min(1),
  work: z.string().min(1),
  source: z.string().min(1),
  translator: z.string().optional(),
});

export const ImageSchema = z.object({
  file: z.string().min(1),
  author: z.string().min(1),
  license: z.string().min(1),
  sourceUrl: z.string().url(),
});

export const LinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

const themeScoreSchema = z.number().int().min(0).max(5);

export const ThemesSchema = z.object({
  ethics: themeScoreSchema,
  metaphysics: themeScoreSchema,
  knowledge: themeScoreSchema,
  politics: themeScoreSchema,
  logic: themeScoreSchema,
  mind: themeScoreSchema,
  meaning: themeScoreSchema,
  beauty: themeScoreSchema,
});

export const PhilosopherSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/, 'ID må bestå av små bokstaver, tall og bindestrek'),
    name: z.string().min(1),
    nameOriginal: z.string().optional(),
    born: YearSchema.optional(),
    died: YearSchema.optional(),
    floruit: FloruitSchema.optional(),
    tradition: z.enum(TRADITION_IDS),
    schools: z.array(z.string()).default([]),
    themes: ThemesSchema,
    themeNotes: z.string().min(1),
    keyIdeas: z.array(KeyIdeaSchema).min(1).max(3),
    quote: QuoteSchema.optional(),
    thinkAbout: z.string().min(1),
    influencedBy: z.array(z.string()).default([]),
    wikidata: z.string().regex(/^Q\d+$/, 'Wikidata må være på formen Q-nummer, f.eks. Q913'),
    links: z.array(LinkSchema).default([]),
    image: ImageSchema.optional(),
    gender: z.enum(['kvinne', 'mann', 'annet']).optional(),
    reviewed: z.boolean().default(false),
  })
  .refine(
    (data) => {
      // Minst én av born eller floruit må finnes
      return Boolean(data.born || data.floruit);
    },
    {
      message: 'Minst én av "born" eller "floruit" må være oppgitt',
      path: ['born'],
    },
  )
  .refine(
    (data) => {
      if (data.born && data.died) {
        return data.died.year >= data.born.year;
      }
      return true;
    },
    {
      message: 'Dødsår må være etter eller lik fødselsår',
      path: ['died'],
    },
  );

export type PhilosopherInput = z.infer<typeof PhilosopherSchema>;

/** En fullverdig filosof-node med avledet 'influences' (hvem filosofen påvirket) */
export interface Philosopher extends PhilosopherInput {
  influences: string[];
}
