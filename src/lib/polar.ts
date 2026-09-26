import type { TraditionId } from '../schemas/philosopher';
import { createLinearScale, createCompressedScale, type ScaleMode } from './timeScale';

/**
 * Rekkefølge på tradisjonssektorene på radaren.
 * Sortert slik at naboer har mest mulig historisk kontakt og geografisk flyt:
 * Kinesisk -> Japansk/Koreansk -> Indisk -> Gresk/Romersk -> Islamsk/Jødisk ->
 * Europeisk -> Nordisk -> Amerikansk -> Afrikansk.
 */
export const TRADITION_SECTOR_ORDER: TraditionId[] = [
  'chinese',
  'japanese-korean',
  'indian',
  'greek-roman',
  'islamic-jewish',
  'european',
  'nordic',
  'americas',
  'african',
];

export interface SectorAngles {
  startAngle: number;
  midAngle: number;
  endAngle: number;
  width: number;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Konverterer polare koordinater (radius og vinkel i grader) til kartesiske (x, y).
 *
 * Radar-standard:
 * - 0° er rett opp (Nord / kl 12: x = cx, y = cy - r).
 * - Vinkelen øker med klokken (90° = Øst/kl 3, 180° = Sør/kl 6, 270° = Vest/kl 9).
 */
export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = degToRad(angleDeg);
  const x = cx + r * Math.sin(rad);
  const y = cy - r * Math.cos(rad);
  return {
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
  };
}

/**
 * Konverterer kartesiske koordinater (x, y) tilbake til polare koordinater (r, angleDeg).
 */
export function cartesianToPolar(
  cx: number,
  cy: number,
  x: number,
  y: number,
): { r: number; angleDeg: number } {
  const dx = x - cx;
  const dy = y - cy;
  const r = Math.sqrt(dx * dx + dy * dy);

  // dx = r * sin(theta), -dy = r * cos(theta)
  const angleRad = Math.atan2(dx, -dy);
  let angleDeg = radToDeg(angleRad);
  if (angleDeg < 0) {
    angleDeg += 360;
  }

  return {
    r: Math.round(r * 100) / 100,
    angleDeg: Math.round(angleDeg * 100) / 100,
  };
}

/**
 * Henter vinkelgrensene for en gitt filosofisk tradisjon.
 */
export function getSectorAngles(tradition: TraditionId): SectorAngles {
  const index = TRADITION_SECTOR_ORDER.indexOf(tradition);
  const safeIndex = index >= 0 ? index : 0;
  const width = 360 / TRADITION_SECTOR_ORDER.length; // 40 grader per sektor
  const startAngle = safeIndex * width;
  const endAngle = startAngle + width;
  const midAngle = startAngle + width / 2;

  return {
    startAngle,
    midAngle,
    endAngle,
    width,
  };
}

/**
 * Beregner radien fra sentrum til et gitt årstall.
 * Støtter både komprimert og lineær skala.
 */
export function radiusForYear(
  year: number,
  scaleMode: ScaleMode,
  minRadius: number,
  maxRadius: number,
  minYear = -650,
  maxYear = 2025,
): number {
  const span = maxRadius - minRadius;
  const scale =
    scaleMode === 'compressed'
      ? createCompressedScale(span, minYear, maxYear)
      : createLinearScale(span, minYear, maxYear);

  return minRadius + scale.toPixel(year);
}
