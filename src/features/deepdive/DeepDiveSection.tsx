import React, { useState } from 'react';
import type { PhilosopherDeepDive } from './types';
import { PHILOSOPHER_DEEP_DIVES } from './deepDiveData';
import { formatYear } from '../../lib/years';
import { sound } from '../../lib/sound';

interface DeepDiveSectionProps {
  philosopherId: string;
}

export const DeepDiveSection: React.FC<DeepDiveSectionProps> = ({ philosopherId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deepDive: PhilosopherDeepDive | undefined = PHILOSOPHER_DEEP_DIVES[philosopherId];

  if (!deepDive) {
    return null;
  }

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      sound.playStarSelect();
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-gold/40 bg-gradient-to-b from-cosmos-card/90 to-cosmos/95 overflow-hidden shadow-xl transition-all">
      {/* Toggle-knapp i toppen */}
      <button
        onClick={handleToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gold/10 transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">📖</span>
          <div>
            <div className="text-xs font-serif font-bold uppercase tracking-wider text-gold group-hover:text-gold-bright">
              Dypdykk: Historisk kontekst & Hovedverker
            </div>
            <div className="text-[11px] text-star-dim font-sans">
              {deepDive.majorWorks.length} verk · {deepDive.thoughtExperiments ? `${deepDive.thoughtExperiments.length} tankeeksperiment · ` : ''}Kritikk & ettertid
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-serif text-gold-bright hidden sm:inline">
            {isOpen ? 'Skjul' : 'Les mer'}
          </span>
          <span className="text-gold text-sm transform transition-transform duration-200">
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {/* Utfoldet innhold */}
      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-white/10 space-y-6 animate-in fade-in duration-200">
          {/* 1. Historisk kontekst & tidsånd */}
          <div>
            <h4 className="text-xs font-serif uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
              <span>🕰️</span> 1. Historisk bakteppe & Tidsånd:
            </h4>
            <p className="text-xs sm:text-sm text-star-white font-sans leading-relaxed p-3.5 rounded-xl bg-cosmos/80 border border-white/10">
              {deepDive.historicalContext}
            </p>
          </div>

          {/* 2. Sentrale hovedverker */}
          <div>
            <h4 className="text-xs font-serif uppercase tracking-widest text-gold mb-2.5 flex items-center gap-2">
              <span>📚</span> 2. Sentrale hovedverker:
            </h4>
            <div className="space-y-2.5">
              {deepDive.majorWorks.map((work, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-cosmos/80 border border-white/10 hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-serif font-bold text-xs text-star-white">
                      {work.title}
                    </span>
                    {work.year !== undefined && (
                      <span className="text-[10px] text-gold font-mono px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 shrink-0">
                        {formatYear(work.year)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-star-dim font-sans leading-relaxed">
                    {work.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Kjente tankeeksperimenter & allegorier */}
          {deepDive.thoughtExperiments && deepDive.thoughtExperiments.length > 0 && (
            <div>
              <h4 className="text-xs font-serif uppercase tracking-widest text-gold mb-2.5 flex items-center gap-2">
                <span>🧪</span> 3. Kjente tankeeksperimenter & Allegorier:
              </h4>
              <div className="space-y-3">
                {deepDive.thoughtExperiments.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2"
                  >
                    <div className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                      <span>▸</span> {exp.title}
                    </div>
                    <p className="text-xs text-star-white/95 font-sans leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="p-2.5 rounded-lg bg-cosmos border border-amber-500/20 text-xs text-amber-100 font-sans italic">
                      <strong className="not-italic text-amber-300 font-serif">Poeng: </strong>
                      {exp.takeaway}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Resepsjon og kritikk fra ettertiden */}
          <div>
            <h4 className="text-xs font-serif uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
              <span>⚡</span> 4. Ettertid & Kjente motargumenter:
            </h4>
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-xs sm:text-sm text-red-100/90 font-sans leading-relaxed">
              {deepDive.receptionAndCritique}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
