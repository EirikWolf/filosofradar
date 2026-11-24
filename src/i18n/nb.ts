/**
 * UI-tekster som står for samme ting flere steder i appen (B-020). Endres en av dem, skal
 * den endres overalt, og da må den stå ett sted. Tekster som bare brukes ett sted, står
 * der de brukes, så de er lette å finne fra skjermen.
 *
 * `tests/ui-texts.test.ts` sier fra når samme faste tekst står i to filer. Maler med tall
 * ser ikke testen, så de er samlet her for hånd.
 */
export const nb = {
  close: 'Lukk (Esc)',
  readPhilosopherCard: 'Les filosofkort ↗',
  openPhilosopherCard: 'Åpne filosofkort',
  openCard: 'Åpne kort ↗',
  compare: 'Sammenlign',
  coreIdeas: 'Kjerneidéer',
  filterByTradition: 'Filtrer etter tradisjon',
  scale: {
    compressed: 'Komprimert skala',
    linear: 'Lineær skala',
  },
  exphil: {
    duels: 'Eksamensdueller',
    flashcards: 'Flashcards (Begrepsdrill)',
    drill: 'Eksamens-drill',
  },
  // Tallene kommer fra dataene, aldri skrevet inn for hånd (ARK-06).
  all: (n: number) => `Alle (${n})`,
  allTraditions: (n: number) => `Alle tradisjoner (${n})`,
  philosophersFound: (n: number) => (n === 1 ? '1 filosof funnet' : `${n} filosofer funnet`),
  questionOf: (current: number, total: number) => `Spørsmål ${current} av ${total}`,
  stories: (n: number) => `${n} Filosofiske Historier`,
} as const;
