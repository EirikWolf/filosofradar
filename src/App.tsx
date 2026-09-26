import React, { useState } from 'react';
import { SweepBeam } from './components/SweepBeam';
import { PhilosopherList } from './features/list/PhilosopherList';
import { TimelineView } from './features/timeline/TimelineView';
import type { Philosopher } from './schemas/philosopher';
import philosophersData from './generated/philosophers.json';

const philosophers = philosophersData as Philosopher[];

export const App: React.FC = () => {
  const [view, setView] = useState<'radar' | 'timeline' | 'list'>('radar');
  const [speed, setSpeed] = useState<number>(8);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 bg-cosmos selection:bg-gold/30">
      {/* Header */}
      <header className="text-center mt-2 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-dim bg-cosmos-card/90 text-gold text-xs uppercase tracking-widest font-serif mb-3 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
          Observatoriet // {philosophers.length} stjerner lastet
        </div>
        <h1 className="text-4xl md:text-5xl font-serif tracking-wider text-star-white drop-shadow-[0_0_25px_rgba(103,232,249,0.45)]">
          FILOSOFRADAREN
        </h1>
        <p className="text-star-dim text-sm md:text-base mt-2 max-w-md mx-auto font-sans">
          Filosofiens historie som et levende stjernekart.
        </p>

        {/* Visnings-velger (Radaren vs Tidslinjen vs Listevisning) */}
        <nav className="flex items-center gap-2 mt-5 p-1 bg-cosmos-card/90 border border-white/10 rounded-full shadow-xl">
          <button
            onClick={() => setView('radar')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'radar'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>✦</span> Radaren
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'timeline'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>⏳</span> Tidslinjen
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'list'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>📋</span> Listevisning ({philosophers.length})
          </button>
        </nav>
      </header>

      {/* Hovedinnhold: Enten Radaren eller Listevisning */}
      <main className="my-6 w-full flex flex-col items-center justify-center">
        {view === 'radar' ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] rounded-full bg-cosmos-card border border-gold/40 shadow-[0_0_60px_rgba(11,20,51,0.9),inset_0_0_50px_rgba(103,232,249,0.15)] overflow-hidden flex items-center justify-center">
              {/* Sveipestrålen */}
              <SweepBeam durationSeconds={speed} isPaused={isPaused} />

              {/* Radarens rutenett og årstall */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
                {/* Konsentriske baner */}
                <circle cx="300" cy="300" r="70" fill="none" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="1" />
                <circle cx="300" cy="300" r="140" fill="none" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="1" />
                <circle cx="300" cy="300" r="210" fill="none" stroke="rgba(246, 200, 95, 0.3)" strokeWidth="1" strokeDasharray="3 4" />
                <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(147, 197, 253, 0.25)" strokeWidth="1.5" />

                {/* Himmelekser */}
                <line x1="300" y1="20" x2="300" y2="580" stroke="rgba(147, 197, 253, 0.12)" strokeDasharray="2 3" />
                <line x1="20" y1="300" x2="580" y2="300" stroke="rgba(147, 197, 253, 0.12)" strokeDasharray="2 3" />

                {/* Ur-stjerne i sentrum (ca. 600 f.Kr.) */}
                <circle cx="300" cy="300" r="6" fill="#f6c85f" className="filter drop-shadow-[0_0_12px_#f6c85f]" />
                <circle cx="300" cy="300" r="12" fill="none" stroke="#f6c85f" strokeWidth="0.8" opacity="0.4" className="animate-pulse" />

                {/* Årstall-merker */}
                <text x="300" y="324" textAnchor="middle" fill="#f6c85f" fontSize="11" fontWeight="bold" className="font-serif">
                  600 f.Kr.
                </text>
                <text x="300" y="224" textAnchor="middle" fill="rgba(147, 197, 253, 0.7)" fontSize="10" className="font-serif">
                  År 0
                </text>
                <text x="300" y="154" textAnchor="middle" fill="rgba(147, 197, 253, 0.7)" fontSize="10" className="font-serif">
                  1000 e.Kr.
                </text>
                <text x="300" y="84" textAnchor="middle" fill="rgba(147, 197, 253, 0.7)" fontSize="10" className="font-serif">
                  2000 e.Kr.
                </text>
              </svg>
            </div>

            {/* Interaktive kontroller for sveipen */}
            <div className="flex flex-wrap items-center justify-center gap-3 bg-cosmos-card/80 border border-white/10 rounded-full px-5 py-2 backdrop-blur shadow-lg">
              <span className="text-xs text-star-dim font-serif mr-1">Sveip-fart:</span>
              <button
                onClick={() => setSpeed(14)}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                  speed === 14 ? 'bg-gold text-cosmos font-bold shadow-[0_0_8px_#f6c85f]' : 'text-star-dim hover:text-white'
                }`}
              >
                Rolig (14s)
              </button>
              <button
                onClick={() => setSpeed(8)}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                  speed === 8 ? 'bg-gold text-cosmos font-bold shadow-[0_0_8px_#f6c85f]' : 'text-star-dim hover:text-white'
                }`}
              >
                Normal (8s)
              </button>
              <button
                onClick={() => setSpeed(3)}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                  speed === 3 ? 'bg-gold text-cosmos font-bold shadow-[0_0_8px_#f6c85f]' : 'text-star-dim hover:text-white'
                }`}
              >
                Rask (3s)
              </button>
              <span className="w-[1px] h-4 bg-white/20 mx-1" />
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1 rounded-full text-xs font-serif border border-white/20 text-star-white hover:border-gold hover:text-gold transition-all"
              >
                {isPaused ? '▶ Start' : '⏸ Pause'}
              </button>
            </div>
          </div>
        ) : view === 'timeline' ? (
          <TimelineView philosophers={philosophers} />
        ) : (
          <PhilosopherList philosophers={philosophers} />
        )}
      </main>

      {/* Footer med status */}
      <footer className="w-full max-w-xl text-center py-4 text-xs text-star-dim border-t border-white/5">
        <p>Filosofradaren · Bygget av Olai & Asbjørn · Fase 3</p>
      </footer>
    </div>
  );
};

export default App;
