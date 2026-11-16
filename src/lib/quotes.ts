/**
 * Sitatvakt (HEL-01): finner tekst i «…» i innholdsdata som ikke går gjennom
 * Zod-skjemaet i content/ (dypdykk, Ex.phil, dilemmaer, turer).
 *
 * Grensen på tre ord er valgt etter gjennomgang 2026-11-16: alle 38 unike
 * «…»-strenger på to ord var begreper, kallenavn eller titler («ond tro»,
 * «troens sprang»), mens korte sitater som «Gud er død» har tre.
 */
export const QUOTE_MIN_WORDS = 3;

export interface QuotedPhrase {
  text: string;
  /** Hvor teksten står, f.eks. `deepdive.hobbes.thoughtExperiments[0].takeaway`. */
  path: string;
}

const GUILLEMET_PATTERN = /«([^»]+)»/g;

function normalize(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function extractQuotedPhrases(value: unknown, path: string): QuotedPhrase[] {
  if (typeof value === 'string') {
    const phrases: QuotedPhrase[] = [];
    for (const match of value.matchAll(GUILLEMET_PATTERN)) {
      const text = normalize(match[1]);
      if (text.split(' ').length >= QUOTE_MIN_WORDS) {
        phrases.push({ text, path });
      }
    }
    return phrases;
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => extractQuotedPhrases(item, `${path}[${i}]`));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => extractQuotedPhrases(item, `${path}.${key}`));
  }
  return [];
}
