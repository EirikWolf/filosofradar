// Ren logikk for tidsmaskinen på radaren, uten DOM, så den kan testes direkte (TST-07).

/**
 * Hvem som fødes når tiden flyttes fra `fromYear` til `toYear`, altså født i
 * (fromYear, toYear]. Nedre grense er eksklusiv: den som fødes nøyaktig i et år,
 * ble født da tiden kom dit, og skal ikke fødes igjen når tiden går videre derfra.
 * Med begge grensene inklusive fikk Kant to supernovaer når glideren ble flyttet
 * 1723 → 1724 → 1725.
 */
export function bornBetween<T extends { birthYear: number }>(
  points: readonly T[],
  fromYear: number,
  toYear: number,
): T[] {
  if (toYear <= fromYear) return [];
  return points.filter((p) => p.birthYear > fromYear && p.birthYear <= toYear);
}

/**
 * Året tidsmaskinen viser. År 0 finnes ikke (B-003), så etter 1 f.Kr. kommer 1 e.Kr.
 * Et nøyaktig årstall rett rundt vendepunktet vises som 1 e.Kr.
 */
export function historicalYear(year: number): number {
  const rounded = Math.round(year);
  return rounded === 0 ? 1 : rounded;
}

/**
 * Når glideren havner på 0 (piltast eller dra), går den videre i samme retning:
 * fra 1 e.Kr. til 1 f.Kr., og fra 1 f.Kr. til 1 e.Kr.
 */
export function skipYearZero(value: number, previousYear: number): number {
  if (value !== 0) return value;
  return previousYear >= 1 ? -1 : 1;
}
