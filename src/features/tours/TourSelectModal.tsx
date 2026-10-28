import React from 'react';
import type { Tour } from './types';
import { TOURS } from './tourData';
import type { Philosopher } from '../../schemas/philosopher';
import { sound } from '../../lib/sound';

interface TourSelectModalProps {
  philosophers: Philosopher[];
  onSelectTour: (tour: Tour) => void;
  onClose: () => void;
}

export const TourSelectModal: React.FC<TourSelectModalProps> = ({
  philosophers,
  onSelectTour,
  onClose,
}) => {
  const pMap = new Map(philosophers.map((p) => [p.id, p]));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-cosmos-darkest/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-cosmos-card/95 border border-gold/40 rounded-3xl shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/10 bg-cosmos-card">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs uppercase tracking-widest font-serif mb-2">
              ✦ Observatoriet // Guidede Turer
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              Velg en Historisk Idéreise
            </h2>
            <p className="text-xs sm:text-sm text-star-dim mt-1 max-w-2xl font-sans">
              La radaren ta deg med på en kuratert reise gjennom historiens viktigste idéstrømninger.
              Hvert stopp belyser en filosof og deres svar på et evig spørsmål.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/15 hover:border-gold/50 text-star-dim hover:text-white flex items-center justify-center text-sm transition-all"
            title="Lukk"
          >
            ✕
          </button>
        </div>

        {/* Liste over turer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {TOURS.map((tour) => {
            const stopPhilosophers = tour.stops
              .map((s) => pMap.get(s.philosopherId))
              .filter(Boolean) as Philosopher[];

            return (
              <div
                key={tour.id}
                className="group p-5 rounded-2xl bg-cosmos/60 hover:bg-cosmos/90 border border-white/10 hover:border-gold/60 transition-all shadow-md hover:shadow-[0_0_25px_rgba(246,200,95,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-2xl">{tour.icon}</span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-gold transition-colors">
                      {tour.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gold-bright/90 font-serif italic mb-2">
                    «{tour.tagline}»
                  </p>

                  <p className="text-xs text-star-dim leading-relaxed mb-3 font-sans">
                    {tour.description}
                  </p>

                  {/* Stopp-sekvens */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                    <span className="text-star-dim font-serif text-[11px] uppercase tracking-wider mr-1">
                      Stopp:
                    </span>
                    {stopPhilosophers.map((p, idx) => (
                      <React.Fragment key={p.id}>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white">
                          {p.name}
                        </span>
                        {idx < stopPhilosophers.length - 1 && (
                          <span className="text-gold/50 text-[10px]">➔</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Info og start-knapp */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                  <div className="text-left md:text-right text-[11px] text-star-dim">
                    <span className="text-gold font-serif">{tour.stops.length} stopp</span> · ca.{' '}
                    {tour.durationMinutes} min
                    <div className="text-[10px] text-star-dim/70">{tour.era}</div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playStarSelect();
                      onSelectTour(tour);
                    }}
                    className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-bright text-cosmos font-serif font-bold text-xs tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Start reise</span>
                    <span>➔</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
