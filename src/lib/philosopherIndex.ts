import philosophersData from '../generated/philosophers.json';

const PHILOSOPHER_IDS = new Set((philosophersData as { id: string }[]).map((p) => p.id));

/**
 * Personer som omtales i innholdet (dilemmaer, dueller, fortellinger), men som ikke
 * er filosofer i radaren. De har ingen filosofkort, så knapper til kortet skjules.
 * Kommer en av dem inn i content/, skal den fjernes herfra (testen krever det).
 */
export const NOT_IN_RADAR: Record<string, string> = {
  foot: 'Philippa Foot',
  singer: 'Peter Singer',
  logstrup: 'K.E. Løgstrup',
  hippokrates: 'Hippokrates',
  jonas: 'Hans Jonas',
};

/** Sann bare for ID-er som har et filosofkort (finnes i content/philosophers). */
export function isKnownPhilosopherId(id: string | null | undefined): id is string {
  return typeof id === 'string' && PHILOSOPHER_IDS.has(id);
}
