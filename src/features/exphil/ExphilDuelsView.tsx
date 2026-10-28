import React, { useState } from 'react';
import type { ExphilDuel } from './types';
import { EXPHIL_DUELS } from './exphilData';

interface ExphilDuelsViewProps {
  onOpenPhilosopherCard: (id: string) => void;
  onComparePhilosophers: (ids: string[]) => void;
}

export const ExphilDuelsView: React.FC<ExphilDuelsViewProps> = ({
  onOpenPhilosopherCard,
  onComparePhilosophers,
}) => {
  const [activeDuelId, setActiveDuelId] = useState<string>(EXPHIL_DUELS[0].id);

  const activeDuel: ExphilDuel = EXPHIL_DUELS.find((d) => d.id === activeDuelId) || EXPHIL_DUELS[0];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Intro og forklaring */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-star-white drop-shadow-md flex items-center justify-center gap-3">
          <span>⚔️</span> Eksamensduellene
        </h2>
        <p className="text-sm text-star-dim font-sans mt-2">
          Sensor på Examen philosophicum ber nesten alltid om en <strong>sammenligning og drøfting</strong> av to motstridende posisjoner. Her er de 6 klassiske eksamensduellene ferdig analysert:
        </p>
      </div>

      {/* Duel-velger horisontal knapperad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {EXPHIL_DUELS.map((duel) => {
          const isSelected = duel.id === activeDuel.id;
          return (
            <button
              key={duel.id}
              onClick={() => setActiveDuelId(duel.id)}
              className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gold/20 border-gold text-star-white shadow-[0_0_15px_rgba(246,200,95,0.3)]'
                  : 'bg-cosmos-card/80 border-white/10 text-star-dim hover:text-white hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] uppercase font-serif tracking-wider px-2 py-0.5 rounded-full bg-cosmos border border-white/10 text-gold">
                  {duel.topic.split(':')[0]}
                </span>
                {isSelected && <span className="text-gold text-xs">● Aktiv</span>}
              </div>
              <div className="font-serif font-bold text-xs text-star-white line-clamp-1">
                {duel.title.split(':')[0]}
              </div>
              <div className="text-[11px] text-star-dim font-sans mt-0.5 line-clamp-1">
                {duel.sideA.positionName} vs. {duel.sideB.positionName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Aktiv duell: Stor oppgaveløsning */}
      <div className="bg-cosmos-card border border-gold/40 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        {/* Header for duellen */}
        <div className="border-b border-white/10 pb-5">
          <div className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-2">
            {activeDuel.topic}
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-star-white">
            {activeDuel.title}
          </h3>

          {/* Eksamensoppgavetekst */}
          <div className="mt-4 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-serif font-bold uppercase tracking-wider mb-1">
              <span>📝</span> Typisk eksamensoppgave (UiO / NTNU / UiB):
            </div>
            <p className="text-sm font-serif italic text-star-white/95 leading-relaxed">
              «{activeDuel.examPrompt}»
            </p>
          </div>
        </div>

        {/* 1. Begrepsavklaring (hva sensor krever definert) */}
        <div>
          <h4 className="text-xs font-serif uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
            <span>📚</span> 1. Begrepsavklaring (Hva må defineres først i besvarelsen):
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeDuel.clarifications.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-cosmos/80 border border-white/10">
                <div className="text-xs font-serif font-bold text-cyan-glow mb-1">
                  {item.term}
                </div>
                <p className="text-xs text-star-dim font-sans leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Side-by-side duellkammer */}
        <div>
          <h4 className="text-xs font-serif uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
            <span>⚖️</span> 2. Posisjonenes kjerne-argumenter:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Side A */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cosmos/70 border border-amber-400/40 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider">
                    {activeDuel.sideA.positionName}
                  </span>
                  <button
                    onClick={() => onOpenPhilosopherCard(activeDuel.sideA.philosopherId)}
                    className="text-[11px] text-gold hover:underline font-serif"
                  >
                    Profilkort ↗
                  </button>
                </div>
                <h5 className="text-lg font-serif font-bold text-star-white">
                  {activeDuel.sideA.philosopherName}
                </h5>
                <p className="text-xs text-star-white/90 font-sans italic mt-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                  «{activeDuel.sideA.mainThesis}»
                </p>
              </div>

              {/* Argumenter */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-serif uppercase tracking-wider text-star-dim block">
                  Hovedargumenter:
                </span>
                <ul className="space-y-1.5">
                  {activeDuel.sideA.keyArguments.map((arg, idx) => (
                    <li key={idx} className="text-xs text-star-dim font-sans flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">▸</span>
                      <span>{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Klassisk eksempel */}
              <div className="p-3 rounded-xl bg-cosmos border border-white/10">
                <span className="text-[10px] font-serif uppercase tracking-wider text-amber-300 block mb-1">
                  Klassisk eksempel / Tankeeksperiment:
                </span>
                <p className="text-xs text-star-white font-sans">
                  {activeDuel.sideA.classicExample}
                </p>
              </div>

              {/* Sårbarheter / Motargumenter */}
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20">
                <span className="text-[10px] font-serif uppercase tracking-wider text-red-300 block mb-1">
                  Kjente motargumenter & svakheter:
                </span>
                <ul className="space-y-1">
                  {activeDuel.sideA.vulnerabilities.map((vuln, idx) => (
                    <li key={idx} className="text-[11px] text-red-100/80 font-sans flex items-start gap-1">
                      <span>•</span>
                      <span>{vuln}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side B */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cosmos/70 border border-cyan-400/40 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif font-bold text-cyan-300 uppercase tracking-wider">
                    {activeDuel.sideB.positionName}
                  </span>
                  <button
                    onClick={() => onOpenPhilosopherCard(activeDuel.sideB.philosopherId)}
                    className="text-[11px] text-cyan-300 hover:underline font-serif"
                  >
                    Profilkort ↗
                  </button>
                </div>
                <h5 className="text-lg font-serif font-bold text-star-white">
                  {activeDuel.sideB.philosopherName}
                </h5>
                <p className="text-xs text-star-white/90 font-sans italic mt-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                  «{activeDuel.sideB.mainThesis}»
                </p>
              </div>

              {/* Argumenter */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-serif uppercase tracking-wider text-star-dim block">
                  Hovedargumenter:
                </span>
                <ul className="space-y-1.5">
                  {activeDuel.sideB.keyArguments.map((arg, idx) => (
                    <li key={idx} className="text-xs text-star-dim font-sans flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">▸</span>
                      <span>{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Klassisk eksempel */}
              <div className="p-3 rounded-xl bg-cosmos border border-white/10">
                <span className="text-[10px] font-serif uppercase tracking-wider text-cyan-300 block mb-1">
                  Klassisk eksempel / Tankeeksperiment:
                </span>
                <p className="text-xs text-star-white font-sans">
                  {activeDuel.sideB.classicExample}
                </p>
              </div>

              {/* Sårbarheter / Motargumenter */}
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20">
                <span className="text-[10px] font-serif uppercase tracking-wider text-red-300 block mb-1">
                  Kjente motargumenter & svakheter:
                </span>
                <ul className="space-y-1">
                  {activeDuel.sideB.vulnerabilities.map((vuln, idx) => (
                    <li key={idx} className="text-[11px] text-red-100/80 font-sans flex items-start gap-1">
                      <span>•</span>
                      <span>{vuln}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Drøfting & Syntese (Hva skiller dem) */}
        <div className="p-4.5 rounded-2xl bg-cosmos/80 border border-white/10">
          <h4 className="text-xs font-serif uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
            <span>🔍</span> 3. Drøfting: Hva skiller og forener posisjonene?
          </h4>
          <p className="text-xs sm:text-sm text-star-white leading-relaxed font-sans">
            {activeDuel.synthesisAndComparison}
          </p>
        </div>

        {/* 4. Sensors råd for A-besvarelse */}
        <div className="p-4.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cosmos-card to-cosmos border-2 border-emerald-500/40">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-serif font-bold uppercase tracking-wider mb-1.5">
            <span>🎓</span> Sensors vurderingskriterier (Tips for A-besvarelse):
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed">
            {activeDuel.gradingAdvice}
          </p>
        </div>

        {/* Aksjoner nederst */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
          <button
            onClick={() => onComparePhilosophers([activeDuel.sideA.philosopherId, activeDuel.sideB.philosopherId])}
            className="px-4 py-2 rounded-xl bg-gold text-cosmos font-serif font-bold text-xs hover:bg-gold-bright transition-all shadow-[0_0_12px_rgba(246,200,95,0.3)] flex items-center gap-2"
          >
            <span>⚖️</span> Åpne direkte i Sammenligningskammeret
          </button>
          <div className="text-xs text-star-dim font-serif">
            Tips: Bruk gjerne eksemplene aktivt i din egen eksamensbesvarelse.
          </div>
        </div>
      </div>
    </div>
  );
};
