import type { Philosopher, TraditionId } from '../schemas/philosopher';
import { getSectorAngles, polarToCartesian, radiusForYear } from './polar';
import type { ScaleMode } from './timeScale';

export interface RadarPoint {
  id: string;
  philosopher: Philosopher;
  x: number;
  y: number;
  radius: number;
  angleDeg: number;
  tradition: TraditionId;
  birthYear: number;
  deathYear?: number;
}

export interface RadarLayoutOptions {
  cx?: number;
  cy?: number;
  minRadius?: number;
  maxRadius?: number;
  scaleMode?: ScaleMode;
  minDistance?: number;
  minYear?: number;
  maxYear?: number;
}

/**
 * Hjelpefunksjon for å hente filosofens fødselsår (eller floruit start).
 */
export function getBirthYear(p: Philosopher): number {
  if (p.born) return p.born.year;
  if (p.floruit) return p.floruit.from;
  return -400;
}

/**
 * Hjelpefunksjon for å hente filosofens dødsår (eller floruit slutt).
 */
export function getDeathYear(p: Philosopher): number | undefined {
  if (p.died) return p.died.year;
  if (p.floruit) return p.floruit.to;
  return undefined;
}

/**
 * Beregner euklidsk avstand mellom to punkter.
 */
function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Beregner radarlayout for en liste med filosofer.
 * Plasseringen er 100 % deterministisk (ingen Math.random()).
 *
 * Algoritme:
 * 1. Beregn radius r basert på fødselsår og valgt tidsskala.
 * 2. Start med sektorens midtvinkel for tradisjonen.
 * 3. Hvis filosofer i samme tradisjon har nærliggende årstall,
 *    spres de vifteformet i vinkel innenfor sektorens grenser.
 * 4. Kjører en deterministisk frastøtning (relaxation) for å garantere
 *    at ingen stjerner havner for tett sammen (< minDistance).
 */
export function computeRadarLayout(
  philosophers: Philosopher[],
  options: RadarLayoutOptions = {},
): RadarPoint[] {
  const {
    cx = 400,
    cy = 400,
    minRadius = 45,
    maxRadius = 365,
    scaleMode = 'compressed',
    minDistance = 16,
    minYear = -650,
    maxYear = 2025,
  } = options;

  // Grupper per tradisjon
  const byTradition = new Map<TraditionId, Philosopher[]>();
  for (const p of philosophers) {
    const list = byTradition.get(p.tradition) || [];
    list.push(p);
    byTradition.set(p.tradition, list);
  }

  const result: RadarPoint[] = [];

  // Behandle hver tradisjonssektor separat
  for (const [tradition, group] of byTradition.entries()) {
    const sector = getSectorAngles(tradition);
    const margin = 3.5; // Sikkerhetsmargin mot nabosektorer i grader
    const minAngle = sector.startAngle + margin;
    const maxAngle = sector.endAngle - margin;

    // Sorter kronologisk etter fødselsår; deterministisk fallback på id
    const sorted = [...group].sort((a, b) => {
      const yearA = getBirthYear(a);
      const yearB = getBirthYear(b);
      if (yearA !== yearB) return yearA - yearB;
      return a.id.localeCompare(b.id);
    });

    // Innledende plassering:
    // Tildel alternerende vinkeloffset for filosofer som er tidsmessig nærme
    const pointsInSector: {
      philosopher: Philosopher;
      birthYear: number;
      deathYear?: number;
      radius: number;
      angleDeg: number;
    }[] = [];

    // Vifte-mønster for alternering (0, -1, +1, -2, +2, ...)
    const offsetMultipliers = [0, -1, 1, -1.8, 1.8, -2.5, 2.5];

    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];
      const birthYear = getBirthYear(p);
      const deathYear = getDeathYear(p);
      const radius = radiusForYear(
        birthYear,
        scaleMode,
        minRadius,
        maxRadius,
        minYear,
        maxYear,
      );

      // Finn hvor mange nylige stjerner som er innen 30px radius
      let clusterIndex = 0;
      for (let j = i - 1; j >= 0; j--) {
        if (Math.abs(pointsInSector[j].radius - radius) < 25) {
          clusterIndex++;
        } else {
          break;
        }
      }

      const spreadStep = Math.min(8, Math.max(3.5, (minDistance / radius) * (180 / Math.PI) * 0.9));
      const mult = offsetMultipliers[clusterIndex % offsetMultipliers.length];
      let initialAngle = sector.midAngle + mult * spreadStep;

      if (initialAngle < minAngle) initialAngle = minAngle;
      if (initialAngle > maxAngle) initialAngle = maxAngle;

      // Svak radial forskyvning når stjerner er i tett klynge for å unngå overlapp i 2D
      const radialOffsets = [0, -5, 5, -9, 9, -12, 12];
      const radialStagger = clusterIndex > 0 ? radialOffsets[clusterIndex % radialOffsets.length] : 0;
      const initialRadius = Math.max(minRadius, Math.min(maxRadius, radius + radialStagger));

      pointsInSector.push({
        philosopher: p,
        birthYear,
        deathYear,
        radius: initialRadius,
        angleDeg: initialAngle,
      });
    }

    // Deterministisk kollisjonsavlastning i 2D (32 iterasjoner)
    for (let iter = 0; iter < 32; iter++) {
      let moved = false;
      for (let i = 0; i < pointsInSector.length; i++) {
        for (let j = i + 1; j < pointsInSector.length; j++) {
          const p1 = pointsInSector[i];
          const p2 = pointsInSector[j];

          const c1 = polarToCartesian(cx, cy, p1.radius, p1.angleDeg);
          const c2 = polarToCartesian(cx, cy, p2.radius, p2.angleDeg);
          const dist = distance(c1.x, c1.y, c2.x, c2.y);

          if (dist < minDistance && dist > 0.001) {
            const neededDist = minDistance - dist;

            // 1. Juster vinkel
            const neededDeg = (neededDist / Math.max(p1.radius, p2.radius)) * (180 / Math.PI) * 0.6;
            if (p1.angleDeg <= p2.angleDeg) {
              p1.angleDeg = Math.max(minAngle, p1.angleDeg - neededDeg);
              p2.angleDeg = Math.min(maxAngle, p2.angleDeg + neededDeg);
            } else {
              p1.angleDeg = Math.min(maxAngle, p1.angleDeg + neededDeg);
              p2.angleDeg = Math.max(minAngle, p2.angleDeg - neededDeg);
            }

            // 2. Juster radius forsiktig i 2D
            const dr = neededDist * 0.45;
            if (p1.radius <= p2.radius) {
              p1.radius = Math.max(minRadius, p1.radius - dr);
              p2.radius = Math.min(maxRadius, p2.radius + dr);
            } else {
              p1.radius = Math.min(maxRadius, p1.radius + dr);
              p2.radius = Math.max(minRadius, p2.radius - dr);
            }

            moved = true;
          }
        }
      }
      if (!moved) break;
    }

    // Bygg ferdige RadarPoints
    for (const item of pointsInSector) {
      const pos = polarToCartesian(cx, cy, item.radius, item.angleDeg);
      result.push({
        id: item.philosopher.id,
        philosopher: item.philosopher,
        x: pos.x,
        y: pos.y,
        radius: item.radius,
        angleDeg: item.angleDeg,
        tradition: item.philosopher.tradition,
        birthYear: item.birthYear,
        deathYear: item.deathYear,
      });
    }
  }

  return result;
}
