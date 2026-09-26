import React from 'react';
import { THEME_IDS, type Philosopher, type ThemeId } from '../schemas/philosopher';
import { getThemeMeta } from '../lib/themes';
import { degToRad } from '../lib/polar';

export interface ThemeRadarItem {
  id: string;
  name: string;
  themes: Record<ThemeId, number>;
}

export interface ThemeRadarProps {
  philosophers: (Philosopher | ThemeRadarItem)[];
  size?: number;
  colors?: string[];
  showLegend?: boolean;
}

const DEFAULT_COLORS = ['#f6c85f', '#67e8f9', '#f472b6'];

/**
 * ThemeRadar (Temaradar / Edderkoppdiagram)
 * Gjenbrukbar 8-akset radarchart for filosofiske temaer (skala 0–5).
 * Støtter overlagring av 1, 2 eller 3 filosofer for direkte visuell sammenligning.
 */
export const ThemeRadar: React.FC<ThemeRadarProps> = ({
  philosophers,
  size = 280,
  colors = DEFAULT_COLORS,
  showLegend = true,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.36;
  const numAxes = THEME_IDS.length; // 8 akser

  // Vinkel per akse (45 grader)
  const angleStep = 360 / numAxes;

  // Hjelpefunksjon for å finne koordinat for en akse og en verdi (0–5)
  const getCoordinates = (axisIndex: number, value: number) => {
    const angleDeg = axisIndex * angleStep;
    const r = (value / 5) * maxRadius;
    const rad = degToRad(angleDeg);
    const x = cx + r * Math.sin(rad);
    const y = cy - r * Math.cos(rad);
    return { x, y };
  };

  // Konsentriske åttkanter for verdiene 1 til 5
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible select-none"
      >
        {/* Konsentriske oktagonale baner (nivå 1–5) */}
        {levels.map((lvl) => {
          const points = THEME_IDS.map((_, i) => {
            const { x, y } = getCoordinates(i, lvl);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={lvl}
              points={points}
              fill={lvl === 5 ? 'rgba(8, 14, 34, 0.4)' : 'none'}
              stroke={lvl === 5 ? 'rgba(246, 200, 95, 0.3)' : 'rgba(147, 197, 253, 0.12)'}
              strokeWidth={lvl === 5 ? 1.2 : 0.8}
              strokeDasharray={lvl === 5 ? undefined : '2 3'}
            />
          );
        })}

        {/* Akser fra sentrum og utover */}
        {THEME_IDS.map((themeId, i) => {
          const outer = getCoordinates(i, 5);
          const meta = getThemeMeta(themeId);

          // Posisjon for etikett (litt utenfor nivå 5)
          const angleDeg = i * angleStep;
          const rad = degToRad(angleDeg);
          const labelDist = maxRadius + 18;
          const lx = cx + labelDist * Math.sin(rad);
          const ly = cy - labelDist * Math.cos(rad);

          return (
            <g key={themeId}>
              {/* Eikelinje */}
              <line
                x1={cx}
                y1={cy}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(147, 197, 253, 0.18)"
                strokeWidth="1"
              />

              {/* Akse-etikett */}
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#93c5fd"
                fontSize="9"
                fontWeight="500"
                className="font-serif pointer-events-none drop-shadow"
              >
                {meta.name}
              </text>
            </g>
          );
        })}

        {/* Polygon for hver filosof som vises */}
        {philosophers.map((p, pIdx) => {
          const color = colors[pIdx % colors.length];
          const points = THEME_IDS.map((themeId, i) => {
            const val = p.themes[themeId] ?? 0;
            const { x, y } = getCoordinates(i, val);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={p.id} className="transition-all duration-500">
              {/* Fylt overflate */}
              <polygon
                points={points}
                fill={color}
                fillOpacity={philosophers.length > 1 ? 0.25 : 0.35}
                stroke={color}
                strokeWidth={philosophers.length > 1 ? 2 : 2.5}
                className="filter drop-shadow-[0_0_8px_rgba(246,200,95,0.3)] transition-all duration-500"
              />

              {/* Nodepunkter på hver akse */}
              {THEME_IDS.map((themeId, i) => {
                const val = p.themes[themeId] ?? 0;
                const { x, y } = getCoordinates(i, val);
                return (
                  <circle
                    key={themeId}
                    cx={x}
                    cy={y}
                    r={val > 0 ? 3.5 : 2}
                    fill={color}
                    stroke="#040714"
                    strokeWidth="1"
                    className="filter drop-shadow-[0_0_4px_currentColor]"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Forklarende fargenøkkel (Legend) ved sammenligning */}
      {showLegend && philosophers.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
          {philosophers.map((p, pIdx) => {
            const color = colors[pIdx % colors.length];
            return (
              <div key={p.id} className="flex items-center gap-1.5 text-xs font-serif">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-star-white">{p.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
