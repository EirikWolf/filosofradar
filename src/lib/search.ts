import type { Philosopher } from '../schemas/philosopher';
import { getStartYear } from './years';

/** Hvor mange treff hurtigsøket på radaren viser. */
export const SEARCH_DROPDOWN_LIMIT = 6;

/** Søketekst slik den sammenlignes: uten mellomrom i endene, med små bokstaver. */
export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

/**
 * Om filosofen treffer søket på navn, opprinnelig navn, retning eller en nøkkelidé.
 * Tar en allerede normalisert søketekst (se `normalizeQuery`).
 */
export function matchesSearch(p: Philosopher, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  return (
    p.name.toLowerCase().includes(normalizedQuery) ||
    (p.nameOriginal?.toLowerCase().includes(normalizedQuery) ?? false) ||
    p.schools.some((s) => s.toLowerCase().includes(normalizedQuery)) ||
    p.keyIdeas.some(
      (k) => k.title.toLowerCase().includes(normalizedQuery) || k.text.toLowerCase().includes(normalizedQuery),
    )
  );
}

/**
 * Treffene i hurtigsøket, best først: eksakt navn, så navn som begynner med søket,
 * så alle andre treff etter når de levde. Den som søker «sokrates», skal finne
 * Sokrates øverst, ikke Platon fordi han nevner læreren sin.
 */
export function rankSearchMatches(
  philosophers: readonly Philosopher[],
  query: string,
  limit = SEARCH_DROPDOWN_LIMIT,
): Philosopher[] {
  const q = normalizeQuery(query);
  if (!q) return [];
  const rank = (p: Philosopher): number => {
    const name = p.name.toLowerCase();
    if (name === q) return 0;
    if (name.startsWith(q)) return 1;
    return 2;
  };
  return philosophers
    .filter((p) => matchesSearch(p, q))
    .sort((a, b) => rank(a) - rank(b) || getStartYear(a) - getStartYear(b))
    .slice(0, limit);
}
