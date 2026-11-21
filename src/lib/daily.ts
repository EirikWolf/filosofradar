// Utvalg av «Dagens filosof». Ren funksjon, så den kan testes uten å rendre
// komponenten (TST-09).

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Dagnummeret i året for den lokale kalenderdatoen: 1. januar er 1, 31. desember
 * er 365 eller 366. Regnes fra datoen alene (via UTC), ikke fra lokale
 * millisekunder: med sommertid er døgnet mellom vintertidens nyttår og en
 * sommerdato én time kortere, og da byttet filosofen først kl. 01.
 */
export function dayOfYear(date: Date): number {
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const dayBeforeNewYear = Date.UTC(date.getFullYear(), 0, 0);
  return Math.round((today - dayBeforeNewYear) / MS_PER_DAY);
}

/** Hvilken filosof som vises på en gitt dag. Samme dato gir alltid samme filosof. */
export function getDailyPhilosopherIndex(date: Date, count: number): number {
  if (count <= 0) throw new RangeError('Ingen filosofer å velge mellom');
  return dayOfYear(date) % count;
}
