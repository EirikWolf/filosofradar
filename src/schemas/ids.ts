// Temaer og tradisjoner som rene konstanter, uten Zod. Holdes adskilt fra
// skjemaene slik at appen kan bruke dem uten å laste Zod i nettleseren
// (Zod brukes bare til innholdsvalidering ved bygging).
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
