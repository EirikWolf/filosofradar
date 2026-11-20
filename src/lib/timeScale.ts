import { formatYear } from './years';

export type ScaleMode = 'linear' | 'compressed';

/** Første år på hovedaksen. Den lineære skalaen og tidsmaskinen starter her. */
export const AXIS_START_YEAR = -650;
/**
 * Den eldste filosofen (Ptahhotep, ca. 2400 f.Kr.). Den komprimerte skalaen har et
 * kort forsegment hit, så filosofer før 650 f.Kr. står der de hører hjemme (B-019).
 * `tests/axis-bounds.test.ts` feiler om en filosof er født før dette.
 */
export const AXIS_EARLIEST_YEAR = -2400;
/** Siste år på aksen. */
export const AXIS_END_YEAR = 2025;
// Andel av den komprimerte skalaen som går til tiden før AXIS_START_YEAR. Liten,
// fordi bare to filosofer lever der, men stor nok til at de skilles fra hverandre.
const DEEP_PAST_SHARE = 0.05;

/** Første år på aksen for hver skala, når ikke noe annet er oppgitt. */
export function axisStartYear(mode: ScaleMode): number {
  return mode === 'compressed' ? AXIS_EARLIEST_YEAR : AXIS_START_YEAR;
}

export interface Tick {
  year: number;
  pixel: number;
  label: string;
  major: boolean;
}

export interface TimeScale {
  mode: ScaleMode;
  minYear: number;
  maxYear: number;
  width: number;
  toPixel: (year: number) => number;
  toYear: (pixel: number) => number;
  getTicks: () => Tick[];
}

/**
 * Oppretter en lineær tidsskala der hvert år har nøyaktig like mange piksler.
 */
export function createLinearScale(
  width: number,
  minYear = AXIS_START_YEAR,
  maxYear = AXIS_END_YEAR,
): TimeScale {
  const span = maxYear - minYear;

  const toPixel = (year: number): number => {
    const clamped = Math.max(minYear, Math.min(maxYear, year));
    const ratio = (clamped - minYear) / span;
    return ratio * width;
  };

  const toYear = (pixel: number): number => {
    const clampedPx = Math.max(0, Math.min(width, pixel));
    const ratio = clampedPx / width;
    return Math.round(minYear + ratio * span);
  };

  const getTicks = (): Tick[] => {
    // Århundre-merker
    const ticks: Tick[] = [];
    // Start på -600 og gå oppover i steg på 100 år
    for (let yr = -600; yr <= 2000; yr += 100) {
      if (yr === 0) continue; // År 0 eksisterer ikke
      const isMajor = yr === -500 || yr === 1 || yr === 500 || yr === 1000 || yr === 1500 || yr === 2000;
      ticks.push({
        year: yr,
        pixel: toPixel(yr),
        label: formatYear(yr),
        major: isMajor,
      });
    }
    return ticks;
  };

  return {
    mode: 'linear',
    minYear,
    maxYear,
    width,
    toPixel,
    toYear,
    getTicks,
  };
}

/**
 * Oppretter en komprimert (stykkevis) tidsskala.
 * Fordeler plassen slik at antikken, middelalderen og nyere tid får god plass,
 * og moderne filosofer ikke klumper seg sammen.
 *
 * Epoker (standard, fra 2400 f.Kr.):
 * - Før aksen (2400 til 650 f.Kr.): 1750 år -> 5 % av bredden (B-019)
 * - Antikken (650 f.Kr. til 500 e.Kr.): 1150 år -> 30 % av bredden
 * - Middelalderen (500 til 1500 e.Kr.): 1000 år -> 20 % av bredden
 * - Nyere tid (1500 til 2025 e.Kr.): 525 år -> 45 % av bredden
 *
 * Starter skalaen ved 650 f.Kr. eller senere, er det ikke noe forsegment, og
 * antikken får 35 %.
 */
export function createCompressedScale(
  width: number,
  minYear = AXIS_EARLIEST_YEAR,
  maxYear = AXIS_END_YEAR,
): TimeScale {
  const breakpoints =
    minYear < AXIS_START_YEAR
      ? [
          { year: minYear, pct: 0 },
          { year: AXIS_START_YEAR, pct: DEEP_PAST_SHARE },
          { year: 500, pct: 0.35 },
          { year: 1500, pct: 0.55 },
          { year: maxYear, pct: 1.0 },
        ]
      : [
          { year: minYear, pct: 0 },
          { year: 500, pct: 0.35 },
          { year: 1500, pct: 0.55 },
          { year: maxYear, pct: 1.0 },
        ];

  const toPixel = (year: number): number => {
    const yr = Math.max(minYear, Math.min(maxYear, year));

    for (let i = 0; i < breakpoints.length - 1; i++) {
      const b1 = breakpoints[i];
      const b2 = breakpoints[i + 1];
      if (yr >= b1.year && yr <= b2.year) {
        const segRatio = (yr - b1.year) / (b2.year - b1.year);
        const totalRatio = b1.pct + segRatio * (b2.pct - b1.pct);
        return totalRatio * width;
      }
    }
    // Bare mulig om klemmingen over fjernes. Et år før aksen skal da havne innerst,
    // ikke ytterst blant nålevende (M07 i revisjonen 2026-11-17).
    return yr < minYear ? 0 : width;
  };

  const toYear = (pixel: number): number => {
    const px = Math.max(0, Math.min(width, pixel));
    const totalRatio = px / width;

    for (let i = 0; i < breakpoints.length - 1; i++) {
      const b1 = breakpoints[i];
      const b2 = breakpoints[i + 1];
      if (totalRatio >= b1.pct && totalRatio <= b2.pct) {
        const segRatio = (totalRatio - b1.pct) / (b2.pct - b1.pct);
        return Math.round(b1.year + segRatio * (b2.year - b1.year));
      }
    }
    return maxYear;
  };

  const getTicks = (): Tick[] => {
    const ticks: Tick[] = [];
    // Med forsegment får 1500 f.Kr. et merke, som viser at det er et annet tidsrom enn
    // resten (B-019). 600 f.Kr. sløyfes da, fordi antikken er smalere og etiketten
    // ellers kolliderer med 500 f.Kr.
    const firstYears = minYear < AXIS_START_YEAR ? [-1500] : [-600];
    const importantYears = [
      ...firstYears, -500, -400, -300, -200, -100, 1, 200, 500, 800, 1000, 1200, 1400, 1500,
      1600, 1700, 1800, 1900, 2000,
    ];

    for (const yr of importantYears) {
      const isMajor = yr === -500 || yr === 1 || yr === 500 || yr === 1500 || yr === 2000;
      ticks.push({
        year: yr,
        pixel: toPixel(yr),
        label: formatYear(yr),
        major: isMajor,
      });
    }

    return ticks;
  };

  return {
    mode: 'compressed',
    minYear,
    maxYear,
    width,
    toPixel,
    toYear,
    getTicks,
  };
}
