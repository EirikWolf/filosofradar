import React from 'react';
import type { RadarPoint } from '../../lib/layout';
import { getTraditionMeta } from '../../lib/traditions';
import { formatLifeSpan } from '../../lib/years';
import { sound } from '../../lib/sound';

interface RadarStarLayerProps {
  /** Alle stjerner i kronologisk rekkefølge (DOM-rekkefølgen er tastaturrekkefølgen, UU-04). */
  points: RadarPoint[];
  matchingIds: Set<string>;
  contemporaryIds: Set<string>;
  bornRecently: Set<string>;
  /** Stjerner som ikke er født ennå i tidsmaskinen. */
  unbornIds: Set<string>;
  /** Stjerner som er døde i tidsmaskinen. */
  deceasedIds: Set<string>;
  selectedId: string | null;
  hoveredId: string | null;
  hasActivePoint: boolean;
  /** Den sist fødte filosofen i tidsmaskinen («Historiens lyskaster»), ellers null. */
  arrivalId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
}

/**
 * Stjernelaget på radaren. Skilt ut og memoisert (YTE-01) slik at tidsmaskinen ikke
 * tegner alle 80 stjernene på nytt for hvert år: lagets props endres bare når noen
 * fødes eller dør, eller når brukeren velger, peker eller filtrerer.
 */
export const RadarStarLayer = React.memo(function RadarStarLayer({
  points,
  matchingIds,
  contemporaryIds,
  bornRecently,
  unbornIds,
  deceasedIds,
  selectedId,
  hoveredId,
  hasActivePoint,
  arrivalId,
  onHover,
  onSelect,
}: RadarStarLayerProps) {
  return (
    <>
      {points.map((pt) => {
        const p = pt.philosopher;
        const meta = getTraditionMeta(pt.tradition);

        const isMatches = matchingIds.has(pt.id);
        const isSelected = selectedId === pt.id;
        const isHovered = hoveredId === pt.id;
        const isContemporary = contemporaryIds.has(pt.id);
        const isBornSupernova = bornRecently.has(pt.id);

        // Tidsmaskin livsstatus
        const isUnborn = unbornIds.has(pt.id);
        const isDeceased = !isUnborn && deceasedIds.has(pt.id);
        const isAlive = !isUnborn && !isDeceased;

        // Opasitet basert på filter og tidsmaskin
        let opacity = 1;
        if (!isMatches) {
          opacity = 0.12;
        } else if (isUnborn) {
          opacity = 0.04;
        } else if (isDeceased) {
          opacity = 0.5;
        } else if (hasActivePoint && !isSelected && !isHovered && !isContemporary) {
          opacity = 0.35;
        }

        // Star size
        const baseRadius = 4.5;
        const starRadius = isSelected || isHovered ? baseRadius * 1.5 : baseRadius;

        return (
          <g
            key={pt.id}
            tabIndex={isUnborn ? -1 : 0}
            role="button"
            aria-label={`${p.name} (${formatLifeSpan(p)})`}
            transform={`translate(${pt.x}, ${pt.y})`}
            opacity={opacity}
            className={`cursor-pointer transition-opacity duration-300 focus:outline-hidden group`}
            onMouseEnter={() => onHover(pt.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => {
              sound.playStarSelect();
              onSelect(selectedId === pt.id ? null : pt.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                sound.playStarSelect();
                onSelect(selectedId === pt.id ? null : pt.id);
              } else if (e.key === 'Escape') {
                onSelect(null);
                onHover(null);
              }
            }}
          >
            {/* Usynlig treffsone (forhindrer flimring/jitter på stjernekanten) */}
            <circle r="14" fill="transparent" />

            {/* Myk oppgløding ved ankomst i tidsmaskinen (erstatter snøball-effekt) */}
            {isBornSupernova && (
              <circle r={starRadius * 2.2} fill={meta.color} opacity="0.4" className="animate-pulse pointer-events-none" />
            )}

            {/* Historiens Lyskaster aktiv stjerne */}
            {arrivalId === pt.id && (
              <circle
                r={starRadius * 2.5}
                fill="none"
                stroke="#67e8f9"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="animate-spin pointer-events-none"
                style={{ animationDuration: '6s' }}
              />
            )}

            {/* Diskret, rolig samtids-ring hvis samtidig med fokusert filosof (statisk) */}
            {isContemporary && (
              <circle
                r={starRadius * 1.9}
                fill="none"
                stroke="#f6c85f"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                opacity="0.65"
                className="pointer-events-none"
              />
            )}

            {/* Ytre tradisjons-aura */}
            <circle
              r={starRadius * 1.8}
              fill={meta.color}
              opacity={isAlive ? 0.35 : 0.15}
              className="transition-transform group-hover:scale-125 pointer-events-none"
            />

            {/* Glød rundt stjernen (gradient i stedet for drop-shadow, se starGlow i RadarView) */}
            <circle r={starRadius * 2.3} fill="url(#starGlow)" className="pointer-events-none" />

            {/* Hovedstjerne */}
            <circle
              r={starRadius}
              fill={isSelected ? '#f6c85f' : '#ffffff'}
              stroke={meta.color}
              strokeWidth={isSelected ? 2 : 1}
              className="pointer-events-none"
            />

            {/* Navnelapp og levetid på radaren ved hover eller når valgt */}
            {(isHovered || isSelected) && (
              <g className="pointer-events-none select-none">
                <text
                  y={pt.y > 730 ? -starRadius - 16 : starRadius + 14}
                  textAnchor="middle"
                  fill={isSelected ? '#f6c85f' : '#ffffff'}
                  fontSize="11"
                  fontWeight={isSelected ? 'bold' : '600'}
                  className="font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                >
                  {p.name}
                </text>
                <text
                  y={pt.y > 730 ? -starRadius - 5 : starRadius + 26}
                  textAnchor="middle"
                  fill="#ffd79e"
                  fontSize="9"
                  className="font-serif opacity-90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                >
                  {formatLifeSpan(p)}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </>
  );
});
