import type { Philosopher, ThemeId } from '../schemas/philosopher';
import { THEME_IDS } from '../schemas/philosopher';
import type { QuizQuestion } from '../schemas/quiz';
import { getThemeMeta } from './themes';

/**
 * COSINE SIMILARITY (Cosinuslikhet)
 *
 * 💡 Forklaring for nybegynnere:
 * Tenk deg to lyskastere i et mørkt observatorium:
 * Cosinuslikhet måler IKKE hvor sterkt lyskasterne lyser (hvor høye tallene er),
 * men hvilken RETNING de peker i!
 *
 * Hvis du og Sokrates begge prioriterer etikk og logikk like høyt i forhold til andre temaer,
 * peker lyskasterne deres i nøyaktig samme retning på stjernehimmelen.
 * Da blir vinkelen mellom dere 0 grader, og cosinus til 0 grader er 1.0 (100% match!).
 *
 * Matematisk formel:
 *   cos(θ) = (u · v) / (||u|| * ||v||)
 * der (u · v) er prikkproduktet, og ||u|| og ||v|| er lengdene (vektornormene).
 */
export function cosineSimilarity(u: number[], v: number[]): number {
  if (u.length !== v.length || u.length === 0) return 0;

  let dotProduct = 0;
  let magUSq = 0;
  let magVSq = 0;

  for (let i = 0; i < u.length; i++) {
    const ui = u[i];
    const vi = v[i];
    dotProduct += ui * vi;
    magUSq += ui * ui;
    magVSq += vi * vi;
  }

  const magU = Math.sqrt(magUSq);
  const magV = Math.sqrt(magVSq);

  // Unngå divisjon på null hvis en av vektorene er helt tom
  if (magU === 0 || magV === 0) {
    return 0;
  }

  const sim = dotProduct / (magU * magV);
  // Begrens til [0, 1] for å hindre flyttallsunøyaktigheter som 1.0000000002
  return Math.max(0, Math.min(1, sim));
}

/**
 * Henter en filosofs temavektor i fast rekkefølge (THEME_IDS).
 */
export function getPhilosopherThemeVector(philosopher: Philosopher): number[] {
  return THEME_IDS.map((id) => philosopher.themes[id] ?? 0);
}

/**
 * Henter brukerens temavektor i fast rekkefølge (THEME_IDS).
 */
export function getUserThemeVector(scores: Record<ThemeId, number>): number[] {
  return THEME_IDS.map((id) => scores[id] ?? 0);
}

/**
 * Beregner brukerens dynamiske temaprofil (skala 0–5) basert på besvarte spørsmål.
 *
 * For hvert tema akkumuleres poengene fra hvert besvarte spørsmål:
 *   score = (sum(vekt * svar) / max_mulige_poeng_for_temaet) * 5.0
 *
 * Dette gjør at brukerens temaradar gradvis vokser utover for hvert svar!
 */
export function calculateUserThemeScores(
  answers: Record<string, number>,
  questions: QuizQuestion[]
): Record<ThemeId, number> {
  const result = {} as Record<ThemeId, number>;

  // Finn totalt mulige vekter per tema på tvers av alle spørsmål i quizen
  const maxPossiblePoints: Record<ThemeId, number> = {
    ethics: 0,
    metaphysics: 0,
    knowledge: 0,
    politics: 0,
    logic: 0,
    mind: 0,
    meaning: 0,
    beauty: 0,
  };

  for (const q of questions) {
    for (const themeId of THEME_IDS) {
      const weight = q.themeWeights[themeId] ?? 0;
      maxPossiblePoints[themeId] += weight * 5; // svar 5 er maks
    }
  }

  // Regn ut oppnådde poeng for besvarte spørsmål
  for (const themeId of THEME_IDS) {
    let earnedPoints = 0;

    for (const q of questions) {
      const answerVal = answers[q.id];
      if (typeof answerVal === 'number') {
        const weight = q.themeWeights[themeId] ?? 0;
        earnedPoints += weight * answerVal;
      }
    }

    const max = maxPossiblePoints[themeId];
    if (max > 0) {
      const score = (earnedPoints / max) * 5.0;
      result[themeId] = Math.round(score * 10) / 10; // avrund til 1 desimal
    } else {
      result[themeId] = 0;
    }
  }

  return result;
}

export interface QuizMatch {
  philosopher: Philosopher;
  similarity: number; // 0.0 til 1.0
  percentage: number; // 0 til 100%
  explanation: string;
  sharedTopThemes: ThemeId[];
}

/**
 * Genererer en engasjerende, personlig setning som forklarer hvorfor brukeren matcher filosofen.
 */
export function generateMatchExplanation(
  userScores: Record<ThemeId, number>,
  philosopher: Philosopher
): string {
  // Finn temaer hvor begge har høy skår (produktet er størst)
  const themeOverlap = THEME_IDS.map((id) => {
    const userVal = userScores[id] ?? 0;
    const philVal = philosopher.themes[id] ?? 0;
    return {
      id,
      overlap: userVal * philVal,
      userVal,
      philVal,
    };
  }).sort((a, b) => b.overlap - a.overlap);

  const top1 = themeOverlap[0];
  const top2 = themeOverlap[1];

  const top1Meta = getThemeMeta(top1.id);
  const top2Meta = top2 ? getThemeMeta(top2.id) : null;

  // Skreddersydde, filosofiske forklaringer for vanlige temakombinasjoner
  const pairKey = [top1.id, top2?.id].sort().join('+');

  switch (pairKey) {
    case 'ethics+knowledge':
      return 'Dere deler et brennende engasjement for etikk og erkjennelse: Dere søker sannheten og vil finne ut hvordan vi best bør handle mot andre.';
    case 'ethics+politics':
      return 'Dere brenner begge for etikk og samfunn: dere ønsker et rettferdig fellesskap med likeverd og omsorg for de svakeste.';
    case 'meaning+metaphysics':
      return 'Dere søker begge metafysikk og mening: dere vil forstå de store, usynlige sannhetene bak tilværelsen.';
    case 'knowledge+logic':
      return 'Dere setter begge erkjennelse og logikk i høysetet: kritisk tenkning og grundige bevis er deres rettesnor.';
    case 'meaning+mind':
      return 'Dere er opptatt av sinn og mening: dere søker indre ro, sjelelig balanse og personlig frihet.';
    case 'ethics+mind':
      return 'Dere forener etikk og sinn: dere er opptatt av menneskets samvittighet og moralske integritet.';
    case 'beauty+mind':
      return 'Dere forener kunst og sinn: dere finner dyp mening i skjønnhet, estetikk og sjelens opplevelser.';
    case 'beauty+knowledge':
      return 'Dere forener skjønnhet og erkjennelse: dere ser at ekte visdom og estetisk harmoni henger uløselig sammen.';
    case 'logic+politics':
      return 'Dere brenner for logikk og samfunn: dere mener rasjonell dialog og saklige argumenter må styre samfunnet.';
    default:
      if (top2Meta && top2.overlap > 4) {
        return `Dere har begge et spesielt sterkt engasjement for ${top1Meta.name.toLowerCase()} og ${top2Meta.name.toLowerCase()}.`;
      }
      return `Dere møtes særlig i en felles lidenskap for ${top1Meta.name.toLowerCase()} og hvordan vi forstår verden.`;
  }
}

/**
 * Finner topp N matcher blant alle filosofer ved hjelp av cosinuslikhet.
 */
export function findTopMatches(
  userScores: Record<ThemeId, number>,
  philosophers: Philosopher[],
  count = 3
): QuizMatch[] {
  const userVec = getUserThemeVector(userScores);

  const scoredMatches = philosophers.map((p) => {
    const philVec = getPhilosopherThemeVector(p);
    const sim = cosineSimilarity(userVec, philVec);
    const percentage = Math.round(sim * 100);

    // Finn de to temaene med størst overlapp
    const sharedTopThemes = THEME_IDS.map((id) => ({
      id,
      score: (userScores[id] ?? 0) * (p.themes[id] ?? 0),
    }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((t) => t.id);

    const explanation = generateMatchExplanation(userScores, p);

    return {
      philosopher: p,
      similarity: sim,
      percentage,
      explanation,
      sharedTopThemes,
    };
  });

  // Sorter synkende etter likhet
  scoredMatches.sort((a, b) => b.similarity - a.similarity);

  return scoredMatches.slice(0, count);
}
