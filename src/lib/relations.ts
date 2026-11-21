import { getStartYear, type LifeSpan } from './years';

/** Det valideringen trenger fra en filosof. */
export interface RelationInput extends LifeSpan {
  id: string;
  influencedBy: readonly string[];
}

/**
 * Sjekker påvirkningene mellom filosofene og returnerer én feilmelding per brudd
 * (tom liste når alt er i orden). Ligger her og ikke i build-content.ts, så den kan
 * testes uten å endre innholdsfiler (TST-10).
 *
 * - `influencedBy` må peke på en filosof som finnes.
 * - En filosof kan ikke påvirke seg selv.
 * - Den som påvirket, kan ikke være født etter den som ble påvirket.
 * - Påvirkningene kan ikke gå i sirkel. To filosofer født samme år kan ellers peke
 *   på hverandre, og da krasjet idénettverket (getLongestLineage).
 */
export function validateRelations(philosophers: readonly RelationInput[]): string[] {
  const errors: string[] = [];
  const byId = new Map(philosophers.map((p) => [p.id, p]));

  for (const p of philosophers) {
    for (const inflId of p.influencedBy) {
      const influencer = byId.get(inflId);
      if (!influencer) {
        errors.push(`[${p.id}] "influencedBy" peker til ukjent filosof-ID "${inflId}"`);
        continue;
      }
      if (inflId === p.id) {
        errors.push(`[${p.id}] "influencedBy" peker på filosofen selv`);
        continue;
      }
      const pYear = getStartYear(p);
      const inflYear = getStartYear(influencer);
      if (inflYear > pYear) {
        errors.push(`[${p.id}] Påvirker "${inflId}" (${inflYear}) er født ETTER ${p.id} (${pYear})!`);
      }
    }
  }

  // Sirkler: dybde-først med tre tilstander. En kant til en node som fortsatt er
  // «på stien», lukker en sirkel. Selvreferanser er alt meldt over.
  const state = new Map<string, 'visiting' | 'done'>();
  const reported = new Set<string>();
  const visit = (id: string, path: string[]) => {
    state.set(id, 'visiting');
    for (const parentId of byId.get(id)?.influencedBy ?? []) {
      if (parentId === id || !byId.has(parentId)) continue;
      const parentState = state.get(parentId);
      if (parentState === 'visiting') {
        const cycle = [...path.slice(path.indexOf(parentId)), parentId];
        const key = [...new Set(cycle)].sort().join(',');
        if (!reported.has(key)) {
          reported.add(key);
          errors.push(`Påvirkningene går i sirkel: ${cycle.join(' ← ')}`);
        }
      } else if (parentState === undefined) {
        visit(parentId, [...path, parentId]);
      }
    }
    state.set(id, 'done');
  };
  for (const p of philosophers) {
    if (!state.has(p.id)) visit(p.id, [p.id]);
  }

  return errors;
}
