import type { Philosopher, TraditionId } from '../schemas/philosopher';
import { TRADITION_SECTOR_ORDER, getSectorAngles } from './polar';
import { getStartYear } from './years';

// Tidsrommet galaksen spenner over. Eldre filosofer havner i kjernen, nyere i armene.
const GALAXY_MIN_YEAR = -800;
const GALAXY_MAX_YEAR = 2025;
/** Avstanden fra sentrum til den eldste stjernen. */
export const GALAXY_CORE_RADIUS = 80;
/** Hvor mye lenger ut den nyeste stjernen ligger enn den eldste. */
export const GALAXY_ARM_LENGTH = 260;
// Under 1 gir tettere kjerne og lengre armer: de mange nyere filosofene får mer plass.
const RADIUS_CURVE = 0.85;
/** Hvor mye galaksen vrir seg (radianer) fra eldste til nyeste filosof, som spiralarmer. */
const SPIRAL_TWIST_RAD = 1.8;
/** Største høyde over eller under galakseplanet. */
export const GALAXY_MAX_HEIGHT = 38;
// Vilkårlig faktor som sprer høyden; bare stabilitet betyr noe.
const HEIGHT_SEED_FACTOR = 13.37;

export interface GalaxyPosition {
  x: number;
  y: number;
  z: number;
  birthYear: number;
}

const sectorMidAngles = new Map<TraditionId, number>(
  TRADITION_SECTOR_ORDER.map((t) => [t, getSectorAngles(t).midAngle]),
);

/**
 * Filosofens plass i 3D-galaksen. Tradisjonen gir retningen ut fra sentrum, fødselsåret
 * avstanden og vridningen, og fødselsåret gir også en fast høyde over planet, så
 * galaksen ser lik ut ved hvert besøk.
 */
export function galaxyPosition(p: Philosopher): GalaxyPosition {
  const birthYear = getStartYear(p);
  const t = Math.max(0, Math.min(1, (birthYear - GALAXY_MIN_YEAR) / (GALAXY_MAX_YEAR - GALAXY_MIN_YEAR)));
  const radius = GALAXY_CORE_RADIUS + Math.pow(t, RADIUS_CURVE) * GALAXY_ARM_LENGTH;
  const theta = ((sectorMidAngles.get(p.tradition) ?? 0) * Math.PI) / 180 + t * SPIRAL_TWIST_RAD;
  return {
    x: Math.cos(theta) * radius,
    y: Math.sin(birthYear * HEIGHT_SEED_FACTOR) * GALAXY_MAX_HEIGHT,
    z: Math.sin(theta) * radius,
    birthYear,
  };
}
