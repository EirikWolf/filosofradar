import React, { useState, useMemo } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import { sound } from '../../lib/sound';

interface DailyPhilosopherProps {
  philosophers: Philosopher[];
  onOpenCard: (id: string) => void;
  onNavigateToRadar: (id: string) => void;
}

export const DailyPhilosopher: React.FC<DailyPhilosopherProps> = ({
  philosophers,
  onOpenCard,
  onNavigateToRadar,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Finn dagens filosof deterministisk basert på kalenderdag
  const { dailyPhilosopher, dateString } = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const p = philosophers[dayOfYear % philosophers.length];

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const dateFormatted = now.toLocaleDateString('no-NO', options);

    return { dailyPhilosopher: p, dateString: dateFormatted };
  }, [philosophers]);

  if (!dailyPhilosopher) return null;

  if (isMinimized) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 mb-2 flex justify-center">
        <button
          onClick={() => {
            sound.playStarSelect();
            setIsMinimized(false);
          }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmos-card/90 border border-gold/30 hover:border-gold text-gold text-xs font-serif transition-all shadow-md hover:scale-105"
        >
          <span>✦</span> Dagens filosof: <strong>{dailyPhilosopher.name}</strong> ({dateString})
        </button>
      </div>
    );
  }

  const bornStr = dailyPhilosopher.born
    ? dailyPhilosopher.born.year < 0
      ? `${Math.abs(dailyPhilosopher.born.year)} f.Kr.`
      : `${dailyPhilosopher.born.year}`
    : 'Ukjent';

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 mb-4 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cosmos-card/95 via-cosmos-card/90 to-cosmos-card/95 border border-gold/40 p-4 sm:p-5 backdrop-blur-md shadow-[0_0_20px_rgba(246,200,95,0.15)]">
        {/* Dekorativ gyllen glød */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        {/* Topplinje */}
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-widest text-gold font-bold">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            ✦ Dagens filosof // {dateString}
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-star-dim hover:text-white text-xs font-serif px-2 py-0.5 rounded hover:bg-white/5 transition-all"
            title="Minimer dagens filosof"
          >
            ✕ Minimer
          </button>
        </div>

        {/* Innhold */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                {dailyPhilosopher.name}
              </h3>
              <span className="text-xs text-star-dim capitalize font-sans">
                {dailyPhilosopher.tradition} · f. {bornStr}
              </span>
            </div>

            {dailyPhilosopher.quote ? (
              <p className="text-xs sm:text-sm text-gold-bright/90 font-serif italic mt-1.5 leading-relaxed">
                «{dailyPhilosopher.quote.text}»
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                {dailyPhilosopher.themeNotes}
              </p>
            )}
          </div>

          {/* Knapper */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sound.playStarSelect();
                onOpenCard(dailyPhilosopher.id);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-serif text-white transition-all active:scale-95"
            >
              Les filosofkort ↗
            </button>
            <button
              onClick={() => {
                sound.playStarSelect();
                onNavigateToRadar(dailyPhilosopher.id);
              }}
              className="px-3.5 py-1.5 rounded-full bg-gold hover:bg-gold-light text-cosmos font-serif font-bold text-xs transition-all shadow-[0_0_10px_rgba(246,200,95,0.4)] active:scale-95"
            >
              Se på radaren ✦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
