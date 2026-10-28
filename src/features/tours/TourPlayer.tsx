import React, { useEffect } from 'react';
import type { Tour } from './types';
import type { Philosopher } from '../../schemas/philosopher';
import { getTraditionMeta } from '../../lib/traditions';
import { formatLifeSpan } from '../../lib/years';
import { sound } from '../../lib/sound';

interface TourPlayerProps {
  tour: Tour;
  currentStopIndex: number;
  philosopher: Philosopher;
  onNextStop: () => void;
  onPrevStop: () => void;
  onSelectStopIndex: (index: number) => void;
  onOpenPhilosopherCard: (id: string) => void;
  onExitTour: () => void;
}

export const TourPlayer: React.FC<TourPlayerProps> = ({
  tour,
  currentStopIndex,
  philosopher,
  onNextStop,
  onPrevStop,
  onSelectStopIndex,
  onOpenPhilosopherCard,
  onExitTour,
}) => {
  const currentStop = tour.stops[currentStopIndex];
  const isFirst = currentStopIndex === 0;
  const isLast = currentStopIndex === tour.stops.length - 1;
  const tradMeta = getTraditionMeta(philosopher.tradition);

  // Tastatursnarveier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isLast) {
        sound.playStarSelect();
        onNextStop();
      } else if (e.key === 'ArrowLeft' && !isFirst) {
        sound.playStarSelect();
        onPrevStop();
      } else if (e.key === 'Escape') {
        onExitTour();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFirst, isLast, onNextStop, onPrevStop, onExitTour]);

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:w-[480px] z-40 bg-cosmos-card/95 border border-gold/50 rounded-2xl shadow-[0_0_35px_rgba(0,0,0,0.85)] backdrop-blur-md overflow-hidden animate-slideUp">
      {/* Topplinje med tittel, progresjon og lukk-knapp */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-cosmos border-b border-white/10">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-lg">{tour.icon}</span>
          <span className="text-xs font-serif font-bold text-gold truncate">
            {tour.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Progresjons-prikker */}
          <div className="flex items-center gap-1.5">
            {tour.stops.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playStarSelect();
                  onSelectStopIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentStopIndex
                    ? 'bg-gold ring-2 ring-gold/40 scale-125'
                    : idx < currentStopIndex
                      ? 'bg-cyan-glow/80'
                      : 'bg-white/20 hover:bg-white/40'
                }`}
                title={`Gå til stopp ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-[11px] text-star-dim font-mono">
            {currentStopIndex + 1}/{tour.stops.length}
          </span>

          <button
            onClick={onExitTour}
            className="text-star-dim hover:text-white text-xs p-1 rounded hover:bg-white/5 transition-colors"
            title="Avslutt tur (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Innholdsseksjon */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
        {/* Filosofens tittel & tradisjon */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: tradMeta.color }}
              />
              <span className="text-[11px] uppercase tracking-wider font-serif text-star-dim">
                {tradMeta.name} · {formatLifeSpan(philosopher)}
              </span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white tracking-wide">
              {philosopher.name}
            </h3>
          </div>

          <button
            onClick={() => onOpenPhilosopherCard(philosopher.id)}
            className="text-[11px] font-serif text-gold hover:underline whitespace-nowrap self-start mt-1 flex items-center gap-1"
            title="Les fullstendig biografi og temaradar"
          >
            <span>📖</span> Se profil
          </button>
        </div>

        {/* Historiens stopp og fortelling */}
        <div className="p-3.5 rounded-xl bg-cosmos/80 border border-white/10 flex flex-col gap-2">
          <h4 className="text-xs font-serif font-bold text-gold-bright tracking-wide">
            {currentStop.narrativeTitle}
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            {currentStop.narrativeText}
          </p>

          {/* Nøkkelspørsmål */}
          <div className="mt-1 pt-2 border-t border-white/10 flex items-start gap-2 text-xs">
            <span className="text-gold font-bold">❓</span>
            <p className="text-gold-light/95 italic font-serif leading-snug">
              {currentStop.keyQuestion}
            </p>
          </div>
        </div>

        {/* Filosofens eget sitat hvis tilgjengelig */}
        {philosopher.quote && (
          <p className="text-[11px] text-star-dim italic font-serif line-clamp-2 px-1">
            «{philosopher.quote.text}»
          </p>
        )}

        {/* Navigasjonsknapper for turen */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => {
              sound.playStarSelect();
              onPrevStop();
            }}
            disabled={isFirst}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all flex items-center gap-1.5 ${
              isFirst
                ? 'opacity-30 cursor-not-allowed text-star-dim'
                : 'text-star-white hover:text-gold hover:bg-white/5 border border-white/15'
            }`}
          >
            <span>◀</span> Forrige
          </button>

          <span className="text-[10px] text-star-dim/70 hidden sm:inline font-mono">
            Bruk piltaster [◀ / ▶]
          </span>

          {isLast ? (
            <button
              onClick={() => {
                sound.playSupernovaBirth();
                onExitTour();
              }}
              className="px-4 py-1.5 rounded-xl bg-gold hover:bg-gold-bright text-cosmos font-serif font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>Fullfør reisen</span>
              <span>🎉</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playStarSelect();
                onNextStop();
              }}
              className="px-4 py-1.5 rounded-xl bg-gold hover:bg-gold-bright text-cosmos font-serif font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>Neste stopp</span>
              <span>▶</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
