/**
 * Håndtering av historiske årstall for Filosofradaren.
 *
 * Merk:
 * - Negative tall representerer år f.Kr. (-470 = 470 f.Kr.).
 * - Det finnes IKKE år 0 i den gregorianske/julianske historiske kalenderen:
 *   Året før 1 e.Kr. er 1 f.Kr. (-1).
 */

export interface YearInfo {
  year: number;
  approx?: boolean;
}

export interface LifeSpan {
  born?: YearInfo;
  died?: YearInfo;
  floruit?: { from: number; to: number };
}

/**
 * Formaterer et årstall til en pen lesbar tekst (f.eks. «470 f.Kr.» eller «1724»).
 */
export function formatYear(year: number, approx = false): string {
  const prefix = approx ? 'ca. ' : '';
  if (year < 0) {
    return `${prefix}${Math.abs(year)} f.Kr.`;
  }
  return `${prefix}${year}`;
}

/**
 * Formaterer en filosofs levetid (f.eks. «ca. 470 – 399 f.Kr.» eller «1912 – 2004»).
 */
export function formatLifeSpan(lifespan: LifeSpan): string {
  if (lifespan.floruit) {
    return `virket ca. ${formatYear(lifespan.floruit.from)} – ${formatYear(lifespan.floruit.to)}`;
  }

  if (lifespan.born && lifespan.died) {
    const bornStr = formatYear(lifespan.born.year, lifespan.born.approx);
    const diedStr = formatYear(lifespan.died.year, lifespan.died.approx);
    return `${bornStr} – ${diedStr}`;
  }

  if (lifespan.born && !lifespan.died) {
    return `f. ${formatYear(lifespan.born.year, lifespan.born.approx)}`;
  }

  return 'ukjent levetid';
}

/**
 * Beregner antall år en person levde.
 *
 * KRITISK REGEL:
 * Når born < 0 og died > 0 krysses overgangen mellom 1 f.Kr. (-1) og 1 e.Kr. (+1).
 * Siden det ikke finnes noe år 0, må vi trekke fra 1!
 * Eksempel: Født 1 f.Kr. (-1) og død 1 e.Kr. (1) betyr at man fylte 1 år, ikke 2 år:
 * 1 - (-1) - 1 = 1.
 */
export function calculateLifespan(bornYear: number, diedYear: number): number {
  if (diedYear < bornYear) {
    throw new Error(`Dødsår (${diedYear}) kan ikke være før fødselsår (${bornYear})`);
  }

  if (bornYear === 0 || diedYear === 0) {
    throw new Error('År 0 eksisterer ikke i historisk tidsregning');
  }

  if (bornYear < 0 && diedYear > 0) {
    return diedYear - bornYear - 1;
  }

  return diedYear - bornYear;
}

/**
 * Sjekker om to tidsintervaller overlapper (levde samtidig).
 */
export function checkOverlap(
  span1: { start: number; end: number },
  span2: { start: number; end: number },
): boolean {
  return span1.start <= span2.end && span2.start <= span1.end;
}
