import React, { useState, useEffect, useCallback } from 'react';
import type { ExphilPillar } from './types';
import { EXPHIL_FLASHCARDS } from './exphilData';
import { sound } from '../../lib/sound';

interface ExphilFlashcardsViewProps {
  onOpenPhilosopherCard?: (id: string) => void;
}

const STORAGE_KEY = 'filosofradar_exphil_mastered';

export const ExphilFlashcardsView: React.FC<ExphilFlashcardsViewProps> = ({
  onOpenPhilosopherCard,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<ExphilPillar | 'alle'>('alle');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Filtrerte kort
  const filteredCards = EXPHIL_FLASHCARDS.filter((card) => {
    if (selectedPillar === 'alle') return true;
    return card.pillar === selectedPillar;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  // Nullstill index og snu kort hvis filter endres
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedPillar]);

  // Lagre mestring i localStorage
  const toggleMastered = useCallback((id: string, mastered: boolean) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (mastered) {
        next.add(id);
      } else {
        next.delete(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // Ignorer feil
      }
      return next;
    });

    if (mastered) {
      sound.playStarSelect();
    }

    // Gå automatisk til neste kort hvis ikke siste
    if (currentIndex < filteredCards.length - 1) {
      setTimeout(() => {
        setIsFlipped(false);
        setCurrentIndex((i) => i + 1);
      }, 300);
    }
  }, [currentIndex, filteredCards.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((i) => i + 1);
      sound.playTimeTick();
    }
  }, [currentIndex, filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((i) => i - 1);
      sound.playTimeTick();
    }
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped((f) => !f);
    sound.playStarSelect();
  }, []);

  // Tastatursnarveier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        if (activeCard) toggleMastered(activeCard.id, false);
      } else if (e.key === '2') {
        if (activeCard) toggleMastered(activeCard.id, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, activeCard, toggleMastered]);

  const masteredCount = EXPHIL_FLASHCARDS.filter((c) => masteredIds.has(c.id)).length;
  const progressPercent = Math.round((masteredCount / EXPHIL_FLASHCARDS.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      {/* Tittel & beskrivelse */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-star-white drop-shadow-md flex items-center justify-center gap-2">
          <span>🃏</span> Ex.phil Flashcards (Begrepsdrill)
        </h2>
        <p className="text-sm text-star-dim font-sans mt-1">
          Aktiv gjenkalling (Active Recall) er vitenskapelig bevist å være den raskeste måten å spikre fagbegreper før eksamen.
        </p>
      </div>

      {/* Fremdriftslinje */}
      <div className="w-full bg-cosmos-card border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-lg">
        <div className="flex items-center justify-between text-xs font-serif">
          <span className="text-star-dim">
            Fremdrift: <strong className="text-gold">{masteredCount}</strong> av {EXPHIL_FLASHCARDS.length} begreper mestret
          </span>
          <span className="text-emerald-400 font-bold">{progressPercent}% fullført</span>
        </div>
        <div className="w-full h-2.5 bg-cosmos rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-gold to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filterknapper for pilar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedPillar('alle')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all border ${
            selectedPillar === 'alle'
              ? 'bg-gold text-cosmos font-bold border-gold shadow-[0_0_10px_rgba(246,200,95,0.4)]'
              : 'bg-cosmos-card border-white/10 text-star-dim hover:text-white'
          }`}
        >
          Alle pilarer ({EXPHIL_FLASHCARDS.length})
        </button>
        <button
          onClick={() => setSelectedPillar('etikk')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all border ${
            selectedPillar === 'etikk'
              ? 'bg-amber-400 text-cosmos font-bold border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]'
              : 'bg-cosmos-card border-white/10 text-star-dim hover:text-white'
          }`}
        >
          Etikk & Politikk
        </button>
        <button
          onClick={() => setSelectedPillar('erkjennelse')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all border ${
            selectedPillar === 'erkjennelse'
              ? 'bg-cyan-400 text-cosmos font-bold border-cyan-400 shadow-[0_0_10px_rgba(103,232,249,0.4)]'
              : 'bg-cosmos-card border-white/10 text-star-dim hover:text-white'
          }`}
        >
          Erkjennelse & Vitenskap
        </button>
        <button
          onClick={() => setSelectedPillar('menneskesyn')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all border ${
            selectedPillar === 'menneskesyn'
              ? 'bg-purple-400 text-cosmos font-bold border-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.4)]'
              : 'bg-cosmos-card border-white/10 text-star-dim hover:text-white'
          }`}
        >
          Menneskesyn & Eksistens
        </button>
      </div>

      {/* Selve Flashcardet */}
      {activeCard && (
        <div className="w-full flex flex-col items-center">
          <div
            onClick={handleFlip}
            className="w-full min-h-[340px] sm:min-h-[380px] bg-cosmos-card border-2 border-gold/40 rounded-3xl p-6 sm:p-8 cursor-pointer shadow-2xl relative flex flex-col justify-between hover:border-gold transition-all duration-200 select-none group"
            style={{ perspective: 1000 }}
          >
            {/* Merke / Pilar i toppen */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-serif tracking-widest text-gold font-bold">
                  Kort {currentIndex + 1} av {filteredCards.length}
                </span>
                {masteredIds.has(activeCard.id) && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ✓ Mestret
                  </span>
                )}
              </div>
              <span className="text-xs text-star-dim font-serif">
                {isFlipped ? 'Klikk for forside' : 'Klikk for svar (eller Mellomrom)'}
              </span>
            </div>

            {/* Innhold: Forside eller Bakside */}
            {!isFlipped ? (
              // FORSIDE
              <div className="my-auto text-center py-6">
                <span className="text-xs font-serif uppercase tracking-widest text-gold/80 block mb-2">
                  Begrep & Eksamensnøkkel
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-star-white drop-shadow-md mb-4">
                  {activeCard.concept}
                </h3>
                {activeCard.philosopherName && (
                  <div className="inline-block px-3 py-1 rounded-full bg-cosmos border border-white/15 text-gold-bright text-xs font-serif">
                    Knyttet til: <strong>{activeCard.philosopherName}</strong>
                  </div>
                )}
                <div className="mt-8 text-xs text-star-dim italic flex items-center justify-center gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
                  <span>💡</span> Trykk hvor som helst for å snu kortet og se definisjon og eksamenstips
                </div>
              </div>
            ) : (
              // BAKSIDE
              <div className="my-auto py-2 space-y-3.5 text-left animate-in fade-in duration-200">
                <div>
                  <span className="text-[10px] font-serif uppercase tracking-wider text-gold font-bold block mb-0.5">
                    1. Definisjon:
                  </span>
                  <p className="text-sm font-serif font-semibold text-star-white leading-relaxed">
                    {activeCard.definition}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-serif uppercase tracking-wider text-cyan-300 font-bold block mb-0.5">
                    2. Hvorfor er dette sentralt i ex.phil?
                  </span>
                  <p className="text-xs text-star-dim font-sans leading-relaxed">
                    {activeCard.explanation}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30">
                  <span className="text-[10px] font-serif uppercase tracking-wider text-amber-300 font-bold block mb-0.5 flex items-center gap-1">
                    <span>⚠️</span> Sensors råd / Typisk eksamensfelle:
                  </span>
                  <p className="text-xs text-amber-100 font-sans leading-relaxed">
                    {activeCard.examTip}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-cosmos border border-white/10">
                  <span className="text-[10px] font-serif uppercase tracking-wider text-gold block mb-0.5">
                    Eksempel:
                  </span>
                  <p className="text-xs text-star-white font-sans italic">
                    {activeCard.example}
                  </p>
                </div>
              </div>
            )}

            {/* Bunn med filosof-lenke hvis aktuelt */}
            {activeCard.philosopherId && onOpenPhilosopherCard && (
              <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs">
                <span className="text-[11px] text-star-dim font-serif">
                  Tilhørende filosof:
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeCard.philosopherId) {
                      onOpenPhilosopherCard(activeCard.philosopherId);
                    }
                  }}
                  className="text-gold hover:underline font-serif text-xs flex items-center gap-1"
                >
                  Åpne {activeCard.philosopherName} ↗
                </button>
              </div>
            )}
          </div>

          {/* Navigasjon og mestringsknapper */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-4">
            {/* Forrige / Neste */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 rounded-xl bg-cosmos-card border border-white/15 text-star-white text-xs font-serif disabled:opacity-40 hover:border-gold transition-colors"
                title="Forrige (Venstre piltast)"
              >
                ← Forrige
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredCards.length - 1}
                className="px-3.5 py-2 rounded-xl bg-cosmos-card border border-white/15 text-star-white text-xs font-serif disabled:opacity-40 hover:border-gold transition-colors"
                title="Neste (Høyre piltast)"
              >
                Neste →
              </button>
            </div>

            {/* Mestringsknapper (1 og 2) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleMastered(activeCard.id, false)}
                className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-serif hover:bg-red-900/50 transition-colors flex items-center gap-1.5"
                title="Tast 1"
              >
                <span>❌</span> Må repeteres <span className="opacity-60 text-[10px]">(1)</span>
              </button>
              <button
                onClick={() => toggleMastered(activeCard.id, true)}
                className="px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-serif hover:bg-emerald-900/50 transition-colors flex items-center gap-1.5 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                title="Tast 2"
              >
                <span>✓</span> Kan dette! <span className="opacity-60 text-[10px]">(2)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
