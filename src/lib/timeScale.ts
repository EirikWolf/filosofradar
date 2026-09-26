import { formatYear } from './years';

export type ScaleMode = 'linear' | 'compressed';

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
  minYear = -650,
  maxYear = 2025,
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
 * Epoker:
 * - Antikken (-650 til 500 e.Kr.): 1150 år -> 35 % av bredden
 * - Middelalderen (500 til 1500 e.Kr.): 1000 år -> 20 % av bredden
 * - Nyere tid (1500 til 2025 e.Kr.): 525 år -> 45 % av bredden
 */
export function createCompressedScale(
  width: number,
  minYear = -650,
  maxYear = 2025,
): TimeScale {
  const breakpoints = [
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
    return width;
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
    const importantYears = [
      -600, -500, -400, -300, -200, -100, 1, 200, 500, 800, 1000, 1200, 1400, 1500,
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
