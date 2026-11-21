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

/**
 * Startår for en filosof: fødselsår, ellers starten på floruit (aktiv periode).
 * Skjemaet krever at én av dem finnes. Mangler begge, kaster vi i stedet for å
 * gjette, fordi en reserveverdi som 0 eller -400 ville gitt feil plassering stille.
 */
export function getStartYear(p: LifeSpan): number {
  if (p.born) return p.born.year;
  if (p.floruit) return p.floruit.from;
  throw new Error('Filosofen mangler både fødselsår og floruit');
}

/**
 * Nålevende: verken dødsår eller floruit er oppgitt (f.eks. Angela Davis).
 */
export function isLiving(p: LifeSpan): boolean {
  return !p.died && !p.floruit;
}

/**
 * Sluttår for «levde samtidig» og tidslinjen: dødsår, ellers slutten på floruit,
 * og for nålevende inneværende år. Tidligere fikk nålevende et påfunnet dødsår
 * (+60 eller +65 år) som var ulikt i ulike visninger.
 */
/** Inneværende år, lest én gang når appen lastes. */
export const CURRENT_YEAR = new Date().getFullYear();

export function getEndYear(p: LifeSpan, currentYear: number): number {
  if (p.died) return p.died.year;
  if (p.floruit) return p.floruit.to;
  return currentYear;
}

/**
 * Hvor mange år filosofen levde, eller har levd så langt. Går gjennom
 * calculateLifespan, så år 0 ikke telles med (B-003): Seneca (4 f.Kr.–65) ble 68,
 * ikke 69. Uten kjent fødselsår, eller med fødselsår men ukjent dødsår, finnes
 * ingen levealder å vise.
 */
export function lifespanInYears(p: LifeSpan, currentYear: number): number | null {
  if (!p.born) return null;
  if (p.died) return calculateLifespan(p.born.year, p.died.year);
  if (p.floruit) return null;
  return calculateLifespan(p.born.year, currentYear);
}
