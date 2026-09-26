import type { ThemeId } from '../schemas/philosopher';

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  question: string;
}

export const THEMES: Record<ThemeId, ThemeMeta> = {
  ethics: { id: 'ethics', name: 'Etikk', question: 'Hvordan bør vi leve og handle?' },
  metaphysics: { id: 'metaphysics', name: 'Metafysikk', question: 'Hva finnes egentlig?' },
  knowledge: { id: 'knowledge', name: 'Erkjennelse', question: 'Hva kan vi vite, og hvordan?' },
  politics: { id: 'politics', name: 'Samfunn og politikk', question: 'Hvordan bør vi leve sammen?' },
  logic: { id: 'logic', name: 'Logikk og språk', question: 'Hvordan tenker og argumenterer vi riktig?' },
  mind: { id: 'mind', name: 'Sinn og bevissthet', question: 'Hva er et jeg?' },
  meaning: { id: 'meaning', name: 'Mening og det hellige', question: 'Hva er meningen, og finnes Gud?' },
  beauty: { id: 'beauty', name: 'Kunst og skjønnhet', question: 'Hva er vakkert, og hvorfor betyr det noe?' },
};

export const THEME_LIST = Object.values(THEMES);

export function getThemeMeta(id: ThemeId): ThemeMeta {
  return THEMES[id] || { id, name: id, question: '' };
}
