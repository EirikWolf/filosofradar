import React, { useState, useMemo, useRef } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import { createLinearScale, createCompressedScale, type ScaleMode } from '../../lib/timeScale';
import { formatLifeSpan, checkOverlap } from '../../lib/years';
import { getTraditionMeta } from '../../lib/traditions';

interface TimelineViewProps {
  philosophers: Philosopher[];
}

interface PhilosopherSpan {
  philosopher: Philosopher;
  startYear: number;
  endYear: number;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ philosophers }) => {
  const [scaleMode, setScaleMode] = useState<ScaleMode>('compressed');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [selectedTradition, setSelectedTradition] = useState<string>('all');

  const containerRef = useRef<HTMLDivElement>(null);

  // Forbered data med start- og sluttår
  const spans: PhilosopherSpan[] = useMemo(() => {
    return philosophers.map((p) => {
      const start = p.born?.year ?? p.floruit?.from ?? -400;
      const end = p.died?.year ?? p.floruit?.to ?? (start + 65);
      return {
        philosopher: p,
        startYear: start,
        endYear: Math.max(start + 5, end),
      };
    });
  }, [philosophers]);

  // Filtrer etter tradisjon hvis valgt
  const filteredSpans = useMemo(() => {
    if (selectedTradition === 'all') return spans;
    return spans.filter((s) => s.philosopher.tradition === selectedTradition);
  }, [spans, selectedTradition]);

  // Sorter kronologisk
  const sortedSpans = useMemo(() => {
    return [...filteredSpans].sort((a, b) => a.startYear - b.startYear);
  }, [filteredSpans]);

  // Basebredde multiplisert med zoom
  const baseWidth = 1400;
  const totalWidth = Math.round(baseWidth * zoomLevel);

  // Bygg tidsskala
  const scale = useMemo(() => {
    return scaleMode === 'compressed'
      ? createCompressedScale(totalWidth, -650, 2025)
      : createLinearScale(totalWidth, -650, 2025);
  }, [scaleMode, totalWidth]);

  // Pakk stolpene inn i rader slik at de ikke overlapper vertikalt (Lane Packing)
  const lanes = useMemo(() => {
    const laneList: PhilosopherSpan[][] = [];

    for (const span of sortedSpans) {
      const x1 = scale.toPixel(span.startYear);
      let placed = false;

      for (const lane of laneList) {
        const lastInLane = lane[lane.length - 1];
        const lastX2 = scale.toPixel(lastInLane.endYear) + 30; // 30px sikkerhetsmargin

        if (x1 >= lastX2) {
          lane.push(span);
          placed = true;
          break;
        }
      }

      if (!placed) {
        laneList.push([span]);
      }
    }

    return laneList;
  }, [sortedSpans, scale]);

  const selectedSpan = useMemo(() => {
    if (!selectedId) return null;
    return spans.find((s) => s.philosopher.id === selectedId) || null;
  }, [spans, selectedId]);

  // Finn alle som levde samtidig med den valgte filosofen
  const contemporaries = useMemo(() => {
    if (!selectedSpan) return [];
    return spans
      .filter((s) => {
        if (s.philosopher.id === selectedSpan.philosopher.id) return false;
        return checkOverlap(
          { start: s.startYear, end: s.endYear },
          { start: selectedSpan.startYear, end: selectedSpan.endYear },
        );
      })
      .map((s) => s.philosopher);
  }, [spans, selectedSpan]);

  const rowHeight = 38;
  const headerHeight = 50;
  const svgHeight = Math.max(380, headerHeight + lanes.length * rowHeight + 40);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-5 animate-fade-in">
      {/* Kontrollpanel over tidslinjen */}
      <div className="bg-cosmos-card/90 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur shadow-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Skala- og tradisjonsvalg */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-cosmos rounded-xl border border-white/10 text-xs font-serif">
            <button
              onClick={() => setScaleMode('compressed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                scaleMode === 'compressed'
                  ? 'bg-gold text-cosmos font-bold shadow-md'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              ✦ Komprimert skala
            </button>
            <button
              onClick={() => setScaleMode('linear')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                scaleMode === 'linear'
                  ? 'bg-gold text-cosmos font-bold shadow-md'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              📏 Ærlig lineær
            </button>
          </div>

          {/* Tradisjon-filter */}
          <select
            value={selectedTradition}
            onChange={(e) => setSelectedTradition(e.target.value)}
            className="bg-cosmos border border-white/15 rounded-xl px-3 py-2 text-xs font-serif text-star-white focus:outline-none focus:border-gold"
          >
            <option value="all">Alle tradisjoner ({philosophers.length})</option>
            <option value="greek-roman">Gresk og romersk</option>
            <option value="chinese">Kinesisk</option>
            <option value="indian">Indisk</option>
            <option value="islamic-jewish">Islamsk og jødisk</option>
            <option value="european">Europeisk</option>
            <option value="nordic">Nordisk</option>
          </select>
        </div>

        {/* Zoom-knapper */}
        <div className="flex items-center gap-2 text-xs text-star-dim font-serif self-end md:self-auto">
          <span>Zoom:</span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, Number((z - 0.2).toFixed(1))))}
            className="w-7 h-7 rounded-lg bg-cosmos border border-white/10 text-star-white hover:border-gold flex items-center justify-center font-bold"
            title="Zoom ut"
          >
            -
          </button>
          <span className="w-12 text-center text-star-white font-mono">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.2).toFixed(1))))}
            className="w-7 h-7 rounded-lg bg-cosmos border border-white/10 text-star-white hover:border-gold flex items-center justify-center font-bold"
            title="Zoom inn"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(1.2)}
            className="px-2.5 py-1 rounded-lg bg-cosmos border border-white/10 hover:text-white text-[11px]"
          >
            Nullstill
          </button>
        </div>
      </div>

      {/* Skala-forklaring */}
      <div className="px-3 text-xs text-star-dim flex items-center justify-between">
        <p>
          {scaleMode === 'compressed' ? (
            <span>
              💡 <strong className="text-gold">Komprimert skala:</strong> Gir antikken, middelalderen og nyere tid god plass, slik at moderne filosofer ikke klumper seg sammen.
            </span>
          ) : (
            <span>
              💡 <strong className="text-cyan-glow">Lineær skala:</strong> Viser historiens eksakte proporsjoner. Merk hvor tett filosofene er konsentrert på 1800- og 1900-tallet!
            </span>
          )}
        </p>
        <span className="text-[11px] text-star-dim/70 hidden sm:inline">
          Dra eller rull sidelengs for å navigere
        </span>
      </div>

      {/* Selve den horisontale tidslinjen */}
      <div
        ref={containerRef}
        className="w-full bg-cosmos-card/80 border border-white/10 rounded-2xl overflow-x-auto shadow-2xl relative select-none scrollbar-thin scrollbar-thumb-gold/30"
        style={{ cursor: 'grab' }}
      >
        <div style={{ width: totalWidth, height: svgHeight, position: 'relative' }}>
          <svg width={totalWidth} height={svgHeight} className="absolute inset-0">
            {/* Vertikale århundre-linjer */}
            {scale.getTicks().map((tick) => (
              <g key={tick.year} transform={`translate(${tick.pixel}, 0)`}>
                <line
                  x1="0"
                  y1={headerHeight}
                  x2="0"
                  y2={svgHeight}
                  stroke={tick.major ? 'rgba(246, 200, 95, 0.25)' : 'rgba(147, 197, 253, 0.08)'}
                  strokeWidth={tick.major ? 1.5 : 1}
                  strokeDasharray={tick.major ? undefined : '3 4'}
                />
                {/* Årstall øverst */}
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fill={tick.major ? '#f6c85f' : 'rgba(147, 197, 253, 0.6)'}
                  fontSize={tick.major ? 12 : 10}
                  fontWeight={tick.major ? 'bold' : 'normal'}
                  className="font-serif"
                >
                  {tick.label}
                </text>
              </g>
            ))}

            {/* Skillelinje under tidsakse-header */}
            <line
              x1="0"
              y1={headerHeight}
              x2={totalWidth}
              y2={headerHeight}
              stroke="rgba(246, 200, 95, 0.3)"
              strokeWidth="1.5"
            />

            {/* Samtidig-tidsspenn bakgrunnsbånd når en filosof er valgt */}
            {selectedSpan && (
              <rect
                x={scale.toPixel(selectedSpan.startYear)}
                y={headerHeight}
                width={Math.max(4, scale.toPixel(selectedSpan.endYear) - scale.toPixel(selectedSpan.startYear))}
                height={svgHeight - headerHeight}
                fill="rgba(246, 200, 95, 0.12)"
                stroke="rgba(246, 200, 95, 0.3)"
                strokeDasharray="4 2"
              />
            )}

            {/* Levetidsstolper for filosofene */}
            {lanes.map((lane, laneIdx) => {
              const y = headerHeight + 15 + laneIdx * rowHeight;

              return lane.map((span) => {
                const p = span.philosopher;
                const x1 = scale.toPixel(span.startYear);
                const x2 = scale.toPixel(span.endYear);
                const barWidth = Math.max(14, x2 - x1);
                const tradMeta = getTraditionMeta(p.tradition);

                const isSelected = selectedId === p.id;
                const isHovered = hoveredId === p.id;

                // Er denne personen samtidig med den valgte?
                const isContemporary =
                  selectedSpan &&
                  p.id !== selectedSpan.philosopher.id &&
                  checkOverlap(
                    { start: span.startYear, end: span.endYear },
                    { start: selectedSpan.startYear, end: selectedSpan.endYear },
                  );

                // Skal denne stolpen tones ned?
                const isDimmed = selectedSpan && !isSelected && !isContemporary;

                return (
                  <g
                    key={p.id}
                    transform={`translate(${x1}, ${y})`}
                    className="cursor-pointer transition-opacity duration-300"
                    opacity={isDimmed ? 0.2 : 1}
                    onClick={() => setSelectedId(isSelected ? null : p.id)}
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Bakgrunnsglød ved hover eller valg */}
                    {(isSelected || isHovered || isContemporary) && (
                      <rect
                        x="-4"
                        y="-4"
                        width={barWidth + 8}
                        height="26"
                        rx="13"
                        fill={isSelected ? '#f6c85f' : tradMeta.color}
                        opacity={isSelected ? 0.4 : isHovered ? 0.3 : 0.2}
                        filter="blur(4px)"
                      />
                    )}

                    {/* Selve levetids-stolpen */}
                    <rect
                      x="0"
                      y="0"
                      width={barWidth}
                      height="18"
                      rx="9"
                      fill={isSelected ? '#f6c85f' : tradMeta.color}
                      stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.3)'}
                      strokeWidth={isSelected ? 2 : 1}
                      className="transition-all duration-200"
                    />

                    {/* Fødsels- og dødsstjerner i endene */}
                    <circle cx="3" cy="9" r="2.5" fill="#ffffff" />
                    <circle cx={barWidth - 3} cy="9" r="2.5" fill="#ffffff" />

                    {/* Navn på filosofen ved siden av eller over stolpen */}
                    <text
                      x={barWidth + 8}
                      y="13"
                      fill={isSelected ? '#f6c85f' : '#ffffff'}
                      fontSize="12"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="font-serif select-none pointer-events-none drop-shadow-[0_1px_3px_#000000]"
                    >
                      {p.name}
                      {isSelected && ' ★'}
                    </text>
                  </g>
                );
              });
            })}
          </svg>
        </div>
      </div>

      {/* Detaljboks: Hvem levde samtidig? */}
      {selectedSpan ? (
        <div className="bg-cosmos-card border border-gold/50 rounded-2xl p-5 shadow-2xl backdrop-blur animate-fade-in flex flex-col md:flex-row gap-5 items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-serif text-gold font-bold">
                Valgt filosof:
              </span>
              <span className="text-xs text-star-dim">
                ({getTraditionMeta(selectedSpan.philosopher.tradition).name})
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-star-white">
              {selectedSpan.philosopher.name}
            </h3>
            <p className="text-sm text-cyan-glow font-sans mt-0.5">
              Levetid: {formatLifeSpan(selectedSpan.philosopher)} ({selectedSpan.endYear - selectedSpan.startYear} år)
            </p>
            <p className="text-xs text-star-bright/80 mt-2 font-sans max-w-xl">
              {selectedSpan.philosopher.themeNotes}
            </p>
          </div>

          {/* Samtidige filosofer */}
          <div className="w-full md:w-80 bg-cosmos/80 border border-white/10 rounded-xl p-4">
            <h4 className="text-xs font-serif text-gold uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Hvem levde samtidig?</span>
              <span className="text-star-white font-bold">{contemporaries.length} tenkere</span>
            </h4>

            {contemporaries.length === 0 ? (
              <p className="text-xs text-star-dim italic">
                Ingen andre av de 21 filosofene hadde overlappende levetid.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {contemporaries.map((c) => {
                  const meta = getTraditionMeta(c.tradition);
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className="text-xs px-2.5 py-1 rounded-full border bg-white/5 hover:bg-gold/20 hover:border-gold transition-all text-star-white flex items-center gap-1.5"
                      style={{ borderColor: `${meta.color}50` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-xs text-star-dim font-serif border border-white/5 rounded-xl bg-cosmos-card/40">
          💡 Klikk på en levetidsstolpe på tidslinjen for å finne ut nøyaktig hvem som levde samtidig!
        </div>
      )}
    </div>
  );
};
