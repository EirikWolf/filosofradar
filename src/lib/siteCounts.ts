/**
 * Tall om innholdet som står i tekst utenfor appen: beskrivelsen for søkemotorer og
 * delingsforhåndsvisning i index.html, og manifestet. Byggeskriptet teller, og
 * Vite-tillegget i vite.config.ts fyller inn plassholderne (ARK-06).
 */

export interface SiteCounts {
  philosophers: number;
  traditions: number;
}

export function countContent(philosophers: ReadonlyArray<{ tradition: string }>): SiteCounts {
  return {
    philosophers: philosophers.length,
    traditions: new Set(philosophers.map((p) => p.tradition)).size,
  };
}

const PLACEHOLDERS: Record<string, keyof SiteCounts> = {
  '%PHILOSOPHER_COUNT%': 'philosophers',
  '%TRADITION_COUNT%': 'traditions',
};

/** Fyller inn plassholderne. En ukjent `%…_COUNT%` stopper bygget i stedet for å bli stående. */
export function fillContentCounts(text: string, counts: SiteCounts): string {
  const filled = text.replace(/%[A-Z_]+_COUNT%/g, (placeholder) => {
    const key = PLACEHOLDERS[placeholder];
    if (!key) throw new Error(`Ukjent plassholder ${placeholder}. Kjente: ${Object.keys(PLACEHOLDERS).join(', ')}`);
    return String(counts[key]);
  });
  return filled;
}
