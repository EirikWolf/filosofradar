import React from 'react';
import { SweepBeam } from './components/SweepBeam';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6">
      {/* Header */}
      <header className="text-center mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-dim bg-cosmos-card/80 text-gold text-xs uppercase tracking-widest font-serif mb-3 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
          Observatoriet // Fase 1: Skjelett
        </div>
        <h1 className="text-4xl md:text-5xl font-serif tracking-wider text-star-white drop-shadow-[0_0_20px_rgba(103,232,249,0.4)]">
          FILOSOFRADAREN
        </h1>
        <p className="text-star-dim text-sm md:text-base mt-2 max-w-md mx-auto font-sans">
          Filosofiens historie som et levende stjernekart.
        </p>
      </header>

      {/* Radar med animert sveipestråle */}
      <main className="my-8 flex flex-col items-center justify-center">
        <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] rounded-full bg-cosmos-card border border-gold/40 shadow-[0_0_60px_rgba(11,20,51,0.9),inset_0_0_50px_rgba(103,232,249,0.12)] overflow-hidden flex items-center justify-center">
          {/* Sveipestrålen (komponent) */}
          <SweepBeam durationSeconds={8} />

          {/* Radarens rutenett og årstall (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
            {/* Konsentriske århundre-baner */}
            <circle cx="300" cy="300" r="70" fill="none" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="1" />
            <circle cx="300" cy="300" r="140" fill="none" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="1" />
            <circle cx="300" cy="300" r="210" fill="none" stroke="rgba(246, 200, 95, 0.3)" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="1.5" />

            {/* Akser */}
            <line x1="300" y1="20" x2="300" y2="580" stroke="rgba(147, 197, 253, 0.12)" strokeDasharray="2 3" />
            <line x1="20" y1="300" x2="580" y2="300" stroke="rgba(147, 197, 253, 0.12)" strokeDasharray="2 3" />

            {/* Ur-stjerne i sentrum (ca. 600 f.Kr.) */}
            <circle cx="300" cy="300" r="4" fill="#f6c85f" className="filter drop-shadow-[0_0_8px_#f6c85f]" />
            <text x="300" y="318" textAnchor="middle" fill="#f6c85f" fontSize="10" className="font-serif">
              600 f.Kr.
            </text>

            {/* Årstall-merker */}
            <text x="300" y="226" textAnchor="middle" fill="rgba(147, 197, 253, 0.6)" fontSize="10" className="font-serif">
              År 0
            </text>
            <text x="300" y="156" textAnchor="middle" fill="rgba(147, 197, 253, 0.6)" fontSize="10" className="font-serif">
              1000 e.Kr.
            </text>
            <text x="300" y="86" textAnchor="middle" fill="rgba(147, 197, 253, 0.6)" fontSize="10" className="font-serif">
              2000 e.Kr.
            </text>
          </svg>

          {/* Senter-puls */}
          <div className="z-10 text-center pointer-events-none select-none">
            <span className="text-xs font-serif text-gold tracking-widest block uppercase">Radaren er aktiv</span>
            <span className="text-[10px] text-star-dim">Klar for innhold i Fase 2</span>
          </div>
        </div>
      </main>

      {/* Footer med status */}
      <footer className="w-full max-w-xl text-center py-4 text-xs text-star-dim border-t border-white/5">
        <p>Filosofradaren · Bygget av Olai & Asbjørn · Fase 1 fullført</p>
      </footer>
    </div>
  );
};

export default App;
